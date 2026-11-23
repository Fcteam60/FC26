/* ==========================================================================
   FC 27 Grup Ligi — Canlı Menajer Düellosu (VS) & Firebase REST Eşitleme (duel.js · v20.34)
   - Sıfır harici SDK: doğrudan fetch() ile Firebase Realtime Database REST API kullanır.
   - Çevrimdışı öncelikli: ana veriler IndexedDB'de kalır, yalnızca ~1.5 KB özet eşitlenir.
   - Yedek olarak çevrimdışı Kıyas Kodu (kopyala / yapıştır) desteği içerir.
   ========================================================================== */
const DUEL_DEFAULT_URL="https://fc27ligvs-default-rtdb.europe-west1.firebasedatabase.app";
const DUEL_CFG_K="fc27lig_duel_cfg";
const DUEL_CACHE_K="fc27lig_duel_cache";

function duelUid(){
  const a=[];
  try{
    if(typeof crypto!=="undefined"&&crypto.getRandomValues){
      const b=new Uint8Array(8);crypto.getRandomValues(b);
      b.forEach(x=>a.push(x.toString(16).padStart(2,"0")));
      return "u_"+a.join("");
    }
  }catch(e){}
  return "u_"+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4);
}
function duelNormRoom(raw){
  return String(raw||"").trim().toLocaleLowerCase("tr")
    .replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c")
    .replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40);
}
function duelBaseUrl(cfg){
  const u=String((cfg&&cfg.url)||DUEL_DEFAULT_URL).trim().replace(/\/+$/,"");
  return /^https:\/\/[a-z0-9.-]+/i.test(u)?u:DUEL_DEFAULT_URL;
}
function duelLoadCfg(){
  let c=null;
  try{c=JSON.parse(localStorage.getItem(DUEL_CFG_K)||"null")}catch(e){}
  if(!c||typeof c!=="object")c={};
  if(!c.uid||c.uid.length<6){c.uid=duelUid();try{localStorage.setItem(DUEL_CFG_K,JSON.stringify(c))}catch(e){}}
  if(c.auto===undefined)c.auto=true;
  return c;
}
function duelSaveCfg(c){
  try{localStorage.setItem(DUEL_CFG_K,JSON.stringify(c))}catch(e){}
}
function duelLoadCache(){
  let d=null;
  try{d=JSON.parse(localStorage.getItem(DUEL_CACHE_K)||"null")}catch(e){}
  if(!d||typeof d!=="object")d={peers:{},lastSync:0,sel:""};
  if(!d.peers||typeof d.peers!=="object")d.peers={};
  return d;
}
function duelSaveCache(d){
  try{localStorage.setItem(DUEL_CACHE_K,JSON.stringify(d))}catch(e){}
}
function duelRelTime(ts){
  if(!ts)return "Henüz eşitlenmedi";
  const s=Math.max(0,Math.floor((Date.now()-ts)/1000));
  if(s<45)return "Az önce";
  if(s<3600)return Math.floor(s/60)+" dk önce";
  if(s<86400)return Math.floor(s/3600)+" sa önce";
  return Math.floor(s/86400)+" gün önce";
}

// Mevcut cihazdaki tüm sezonlardan ~1.5 KB'lık kompakt Menajer Düellosu özeti üretir
function buildDuelSummary(){
  const cfg=duelLoadCfg();
  const d=careerData("all");
  const totM=(d.t.w||0)+(d.t.d||0)+(d.t.l||0);
  const pts=(d.t.w||0)*3+(d.t.d||0);
  const wr=totM?Math.round(d.t.w/totM*1000)/10:0;
  const ppm=totM?Math.round(pts/totM*100)/100:0;
  const gpm=totM?Math.round(d.t.gf/totM*100)/100:0;
  const gapm=totM?Math.round(d.t.ga/totM*100)/100:0;

  const xpL=typeof xpData==="function"?xpData("all"):[];
  const xpAvgG=xpL.length?Math.round(xpL.reduce((a,o)=>a+o.g,0)/xpL.length*10)/10:0;
  const xpTotD=xpL.length?xpL.reduce((a,o)=>a+o.d,0):0;
  const xpAvgD=xpL.length?Math.round(xpTotD/xpL.length*100)/100:0;
  const xpUp=xpL.filter(o=>o.d>0).length;

  const dnaRaw=typeof calcTacticalDNA==="function"?calcTacticalDNA(null,{career:true}):null;
  let dna=null;
  if(dnaRaw){
    const allM=store.seasons.flatMap(x=>x.mt||[]).filter(m=>m&&m.stats);
    const xa=allM.filter(m=>m.stats.myXg!=null&&m.stats.oppXg!=null);
    let xPtsSum=0,actPtsSum=0;
    xa.forEach(m=>{
      const xp=calcMatchXpts(m.stats.myXg,m.stats.oppXg);
      if(xp)xPtsSum+=xp.xPts;
      const r=mres(m);actPtsSum+=r=="w"?3:r=="d"?1:0;
    });
    const gkM=allM.filter(m=>m.stats.oppSot!=null);
    const totOSot=gkM.reduce((a,m)=>a+Math.max(0,+m.stats.oppSot||0),0);
    const totSav=gkM.reduce((a,m)=>a+Math.max(0,(+m.stats.oppSot||0)-(+m.ga||0)),0);
    const gkPct=totOSot>0?Math.round(totSav/totOSot*100):null;
    dna={
      n:dnaRaw.n,
      title:dnaRaw.title,
      subTag:dnaRaw.subTag||"",
      atk:dnaRaw.atk,ctrl:dnaRaw.ctrl,aggr:dnaRaw.aggr,eff:dnaRaw.eff,
      mPos:Math.round(dnaRaw.mPos),
      mPass:Math.round(dnaRaw.mPass),
      mXg:Math.round(dnaRaw.mXg*100)/100,
      oXg:Math.round(dnaRaw.oXg*100)/100,
      xgDiff:Math.round(dnaRaw.xgDiff*100)/100,
      xgPairCnt:xa.length,
      xPtsDiff:xa.length?Math.round((actPtsSum-xPtsSum)*10)/10:0,
      gkPct,
      des:dnaRaw.deservedCnt,st:dnaRaw.stealCnt,un:dnaRaw.unluckyCnt
    };
  }

  const cs=cur();
  let active=null;
  if(cs){
    const tm=cs.my!=null&&T[cs.my]?T[cs.my]:null;
    const g=cs.ts||{};
    const last5=(cs.mt||[]).slice(-5).map(m=>mres(m));
    active={
      sName:cs.name||"",
      team:tm?tm.n:"",
      teamG:tm?tm.g:0,
      stage:cs.res?rlb(cs.res,cs.cfg,cs.grk):(typeof autoStage==="function"?autoStage(cs):"Devam ediyor"),
      w:g.w||0,d:g.d||0,l:g.l||0,gf:g.gf||0,ga:g.ga||0,
      form:last5
    };
  }

  const nm=(cfg.name||store.owner||"Menajer").replace(/\s+/g," ").trim().slice(0,32)||"Menajer";
  return{
    v:1,
    uid:cfg.uid,
    name:nm,
    ut:Date.now(),
    ver:VER,
    car:{n:d.n,finN:d.finN,ch:d.ch,fin:d.fin,pod:d.pod,w:d.t.w||0,d:d.t.d||0,l:d.t.l||0,gf:d.t.gf||0,ga:d.t.ga||0,m:totM,wr,ppm,gpm,gapm},
    xp:{n:xpL.length,avgG:xpAvgG,totD:xpTotD,avgD:xpAvgD,up:xpUp},
    dna,
    cur:active,
    star:d.ga?{n:d.ga.n,v:d.ga.v}:null
  };
}

let duelPushTimer=null;
async function duelPush(silent){
  const cfg=duelLoadCfg();
  if(!cfg.room||cfg.room.length<6)return false;
  if(typeof navigator!=="undefined"&&navigator.onLine===false)return false;
  const payload=buildDuelSummary();
  const url=`${duelBaseUrl(cfg)}/rooms/${encodeURIComponent(cfg.room)}/${encodeURIComponent(cfg.uid)}.json`;
  try{
    const r=await fetch(url,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(payload)
    });
    if(!r.ok)throw new Error("HTTP "+r.status);
    const cache=duelLoadCache();
    cache.peers[cfg.uid]=payload;
    cache.lastSync=Date.now();
    duelSaveCache(cache);
    st.duelErr="";
    return true;
  }catch(e){
    if(!silent)st.duelErr="Sunucuya gönderilemedi ("+(e&&e.message?e.message:"ağ hatası")+"). İnternetini ve Firebase kurallarını kontrol et.";
    return false;
  }
}

async function duelPull(silent){
  const cfg=duelLoadCfg();
  if(!cfg.room||cfg.room.length<6)return false;
  if(typeof navigator!=="undefined"&&navigator.onLine===false){
    if(!silent)st.duelErr="Çevrimdışısın — son kaydedilen veriler gösteriliyor.";
    return false;
  }
  const url=`${duelBaseUrl(cfg)}/rooms/${encodeURIComponent(cfg.room)}.json`;
  try{
    const r=await fetch(url,{cache:"no-store"});
    if(!r.ok)throw new Error("HTTP "+r.status);
    const data=await r.json();
    const cache=duelLoadCache();
    // Buluttan gelenleri güncelle, manuel eklenen çevrimdışı rakipleri koru
    const nextPeers={};
    Object.entries(cache.peers||{}).forEach(([k,v])=>{if(v&&v.manual)nextPeers[k]=v});
    if(data&&typeof data==="object"){
      Object.entries(data).forEach(([k,v])=>{
        if(v&&typeof v==="object"&&v.name&&v.car){
          v.uid=v.uid||k;
          nextPeers[k]=v;
        }
      });
    }
    cache.peers=nextPeers;
    cache.lastSync=Date.now();
    duelSaveCache(cache);
    st.duelErr="";
    return true;
  }catch(e){
    if(!silent)st.duelErr="Odadan veri çekilemedi ("+(e&&e.message?e.message:"ağ hatası")+").";
    return false;
  }
}

async function duelSyncNow(silent){
  if(st.duelBusy)return;
  const cfg=duelLoadCfg();
  if(!cfg.room||cfg.room.length<6)return;
  st.duelBusy=true;
  if(!silent)render();
  const ok1=await duelPush(silent);
  const ok2=await duelPull(silent);
  st.duelBusy=false;
  if(!silent){
    if(ok1&&ok2)ntf("Düello odası eşitlendi");
    else if(ok2)ntf("Oda verileri güncellendi");
  }
  render();
}

function duelSchedulePush(){
  const cfg=duelLoadCfg();
  if(!cfg.room||cfg.room.length<6||cfg.auto===false)return;
  if(duelPushTimer)clearTimeout(duelPushTimer);
  duelPushTimer=setTimeout(()=>{duelPush(true)},2000);
}

// Çift Renkli Taktiksel DNA Radarı (Sen: Zümrüt Yeşili #2dd496, Rakip: Altın #e8be54)
function duelRadarSvg(me,opp){
  const W=260,H=226,cx=130,cy=112,R=72;
  const ax=[[0,-1,"HÜCUM","atk"],[1,0,"KONTROL","ctrl"],[0,1,"DİRENÇ","aggr"],[-1,0,"BİTİRİCİLİK","eff"]];
  const rings=[0.25,0.5,0.75,1].map(k=>{
    const r=R*k;
    return `<polygon points="${cx},${cy-r} ${cx+r},${cy} ${cx},${cy+r} ${cx-r},${cy}" fill="none" stroke="var(--bd)" stroke-width="${k==1?1.5:1}" stroke-dasharray="${k<1?"2 2":"0"}"/>`;
  }).join("");
  const axes=`<line x1="${cx}" y1="${cy-R}" x2="${cx}" y2="${cy+R}" stroke="var(--bd)" stroke-width="1"/><line x1="${cx-R}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="var(--bd)" stroke-width="1"/>`;
  const polyOf=d=>ax.map(([dx,dy,,k])=>{const r=R*((d&&d[k]||0)/100);return `${(cx+dx*r).toFixed(1)},${(cy+dy*r).toFixed(1)}`}).join(" ");
  const dotsOf=(d,col)=>ax.map(([dx,dy,,k])=>{const r=R*((d&&d[k]||0)/100);return `<circle cx="${(cx+dx*r).toFixed(1)}" cy="${(cy+dy*r).toFixed(1)}" r="4" fill="${col}" stroke="var(--card)" stroke-width="1.4"/>`}).join("");
  const pMe=me?`<polygon points="${polyOf(me)}" fill="rgba(45,212,150,.24)" stroke="#2dd496" stroke-width="2.4"/>${dotsOf(me,"#2dd496")}`:"";
  const pOp=opp?`<polygon points="${polyOf(opp)}" fill="rgba(232,190,84,.22)" stroke="#e8be54" stroke-width="2.4"/>${dotsOf(opp,"#e8be54")}`:"";
  const lb=(k)=>((me?me[k]:"—")+" / "+(opp?opp[k]:"—"));
  const labels=`
    <text x="${cx}" y="${cy-R-16}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--mut)">HÜCUM (${lb("atk")})</text>
    <text x="${cx+R+8}" y="${cy+4}" text-anchor="start" font-size="10" font-weight="700" fill="var(--mut)">KONTROL (${lb("ctrl")})</text>
    <text x="${cx}" y="${cy+R+20}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--mut)">DİRENÇ (${lb("aggr")})</text>
    <text x="${cx-R-8}" y="${cy+4}" text-anchor="end" font-size="10" font-weight="700" fill="var(--mut)">BİTİR. (${lb("eff")})</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Çift renkli Taktiksel DNA Düello Radarı">${rings}${axes}${pOp}${pMe}${labels}</svg>`;
}

function duelCompareRow(label,v1,v2,fmt1,fmt2,lowerBetter){
  const n1=Number.isFinite(+v1)?+v1:0,n2=Number.isFinite(+v2)?+v2:0;
  const w1=lowerBetter?(n1<n2):(n1>n2),w2=lowerBetter?(n2<n1):(n2>n1);
  const absMax=Math.max(0.01,Math.abs(n1),Math.abs(n2));
  const p1=Math.max(8,Math.min(100,Math.round(Math.abs(n1)/absMax*100)));
  const p2=Math.max(8,Math.min(100,Math.round(Math.abs(n2)/absMax*100)));
  return `<div class="dl-row">`+
    `<div class="dl-top"><b class="dl-v me${w1?" win":""}">${fmt1}</b><span class="dl-lbl">${label}</span><b class="dl-v op${w2?" win":""}">${fmt2}</b></div>`+
    `<div class="dl-bars"><div class="dl-bL"><i style="width:${p1}%"></i></div><div class="dl-bR"><i style="width:${p2}%"></i></div></div>`+
  `</div>`;
}

function duelScoreboard(me,opp){
  let s1=0,s2=0;
  const cmp=(a,b,low)=>{if(a==null||b==null)return;if(low){if(a<b)s1++;else if(b<a)s2++}else{if(a>b)s1++;else if(b>a)s2++}};
  cmp(me.car.ch,opp.car.ch,false);
  cmp(me.car.fin,opp.car.fin,false);
  cmp(me.car.wr,opp.car.wr,false);
  cmp(me.car.ppm,opp.car.ppm,false);
  cmp(me.car.gpm,opp.car.gpm,false);
  cmp(me.car.gapm,opp.car.gapm,true);
  if(me.xp.n&&opp.xp.n)cmp(me.xp.avgD,opp.xp.avgD,false);
  if(me.dna&&opp.dna){
    cmp(me.dna.atk+me.dna.ctrl+me.dna.aggr+me.dna.eff,opp.dna.atk+opp.dna.ctrl+opp.dna.aggr+opp.dna.eff,false);
  }
  return{s1,s2};
}

function duelCodeEncode(){
  return b64Enc("FC27D1:"+JSON.stringify(buildDuelSummary()));
}
function duelCodeDecode(raw){
  try{
    const s=b64Dec(String(raw||"").trim());
    if(!s||!s.startsWith("FC27D1:"))return null;
    const o=JSON.parse(s.slice(7));
    if(!o||typeof o!=="object"||!o.name||!o.car)return null;
    if(!o.uid)o.uid="m_"+nz(o.name).replace(/[^a-z0-9]/g,"").slice(0,12)+"_"+(o.ut||Date.now());
    o.manual=true;
    return o;
  }catch(e){return null}
}

function duelView(){
  const cfg=duelLoadCfg(),cache=duelLoadCache();
  const me=buildDuelSummary();
  const hasRoom=!!(cfg.room&&cfg.room.length>=6);
  const allPeers=Object.values(cache.peers||{}).filter(p=>p&&p.uid&&p.uid!==cfg.uid);
  const rivals=allPeers.sort((a,b)=>(b.car.ch-a.car.ch)||(b.car.ppm-a.car.ppm)||(b.ut-a.ut));
  const selUid=(cache.sel&&rivals.some(r=>r.uid===cache.sel))?cache.sel:(rivals[0]?rivals[0].uid:"");
  const opp=rivals.find(r=>r.uid===selUid)||null;

  // 1) Oda Bağlantı / Durum Kartı
  let connHtml="";
  if(!hasRoom||st.duelEdit){
    connHtml=psetCard("duo","emr",hasRoom?"Düello Odası Ayarları":"Canlı Menajer Düellosu","Arkadaşınla aynı oda kodunu gir, sezonlarınız otomatik kıyaslansın",hasRoom?cfg.room:"Hazır",
      `<div class="note" style="margin:0 0 10px">İkiniz de aynı <b>Oda Kodu</b>’nu girdiğinizde maç kaydettikçe yalnızca 1–2 KB’lık özetiniz eşitlenir; ana kayıtlarınız telefonunuzda kalır.</div>`+
      `<div class="su-fgrid" style="margin-bottom:10px">`+
        `<div class="su-fld"><label>Menajer Adın</label><input id="dl_nm" class="f" maxlength="32" placeholder="Adın" value="${esc(cfg.name||store.owner||"")}"></div>`+
        `<div class="su-fld"><label>Ortak Oda Kodu (min 6)</label><input id="dl_rm" class="f" maxlength="40" placeholder="örn: fc27-duello-2026" value="${esc(cfg.room||"")}" autocapitalize="none" autocorrect="off"></div>`+
      `</div>`+
      `<div class="bar" style="margin:0">`+
        `<button class="btn p pset-pri" data-a="dljoin" style="flex:1">${st.duelBusy?"Bağlanıyor…":"Odaya Bağlan ve Eşitle"}</button>`+
        (hasRoom?`<button class="btn pset-sec" data-a="dlcancel">Vazgeç</button>`:"")+
      `</div>`+
      (hasRoom?`<div class="bar" style="margin:8px 0 0"><button class="btn pset-sec" data-a="dlleave" style="width:100%;color:var(--wr)">Odadan Ayrıl</button></div>`:"")
    );
  }else{
    connHtml=`<div class="card pglass dl-barcard">`+
      `<div class="dl-barh">`+
        `<div class="dl-binfo"><span class="ph-ey"><i class="ph-dot"></i>CANLI ODA · ${esc(cfg.room)}</span><small>Son eşitleme: ${esc(duelRelTime(cache.lastSync))} · ${rivals.length+1} menajer</small></div>`+
        `<div class="dl-bacts">`+
          `<button class="btn p pset-pri" data-a="dlsync" ${st.duelBusy?"disabled":""}>${st.duelBusy?"Eşitleniyor…":"Şimdi Eşitle"}</button>`+
          `<button class="mb sc-ic" data-a="dledit" aria-label="Oda ayarları" title="Oda ayarları">${UICO.sliders}</button>`+
        `</div>`+
      `</div>`+
      (st.duelErr?`<div class="note wr" style="margin:8px 0 0">${esc(st.duelErr)}</div>`:"")+
    `</div>`;
  }

  // 2) Oda Sıralaması (3+ kişi) veya Rakip Seçici
  let lbHtml="";
  if(rivals.length>=2){
    const board=[me,...rivals].sort((a,b)=>(b.car.ch-a.car.ch)||(b.car.ppm-a.car.ppm)||(b.car.wr-a.car.wr));
    lbHtml=psetCard("trophy","gold","Oda Sıralaması","Kıyaslamak için bir rakibe dokun",`${board.length} menajer`,
      `<div class="dl-lb">${board.map((p,idx)=>{
        const isMe=p.uid===cfg.uid,isSel=p.uid===selUid;
        const inner=`<span class="dl-rk">${idx+1}</span><span class="dl-pnm"><b>${esc(p.name)}${isMe?" (Sen)":""}</b><small>${p.car.n} sezon · ${p.car.m} maç · %${Math.round(p.car.wr)}G</small></span><span class="dl-pkpi"><b>${p.car.ch}🏆</b><small>${fx(p.car.ppm)} P/M</small></span>`;
        return isMe?`<div class="dl-lbr me">${inner}</div>`:`<button class="dl-lbr${isSel?" sel":""}" data-a="dlsel" data-v="${esc(p.uid)}">${inner}</button>`;
      }).join("")}</div>`
    );
  }

  // 3) Rakip yoksa bekleme kartı
  let vsHtml="";
  if(!opp){
    vsHtml=psetCard("duo","sky",hasRoom?"Arkadaşın Bekleniyor":"Henüz Rakip Yok",hasRoom?"Oda kodunu arkadaşına gönder":"Odaya bağlan veya manuel kıyas kodu yapıştır",null,
      hasRoom
        ? `<div class="note" style="margin:0 0 10px">Senin özetin <b>${esc(cfg.room)}</b> odasına hazırlandı. Arkadaşın da uygulamada <b>Geçmiş › Düello</b> sekmesinden aynı oda kodunu girdiğinde karşılaştırma burada otomatik açılacak.</div>`+
          `<button class="btn pset-sec ui-btn" data-a="dlcpcode" style="width:100%">${UICO.backup}<span>Oda Kodunu Kopyala (${esc(cfg.room)})</span></button>`
        : `<div class="note" style="margin:0">Yukarıdan ortak bir oda koduyla bağlanabilir veya aşağıdaki <b>Manuel Kıyas Kodu</b> alanından çevrimdışı karşılaştırma yapabilirsin.</div>`
    );
  }else{
    const sb=duelScoreboard(me,opp);
    const shIc='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>';
    const hero=`<div class="card pglass dl-hero">`+
      `<div class="dl-vshead">`+
        `<div class="dl-side me"><span class="dl-dot me"></span><b>${esc(me.name)}</b><small>${me.car.n} sezon · ${me.car.m} maç</small></div>`+
        `<div class="dl-mid"><span class="dl-vs">VS</span><div class="dl-sc"><b class="me">${sb.s1}</b><span>–</span><b class="op">${sb.s2}</b></div></div>`+
        `<div class="dl-side op"><span class="dl-dot op"></span><b>${esc(opp.name)}</b><small>${opp.car.n} sezon · ${opp.car.m} maç</small></div>`+
      `</div>`+
      `<div class="dl-meta"><span>Senin son kaydın: Güncel</span><span>${esc(opp.name)}: ${esc(duelRelTime(opp.ut))}${opp.manual?" (Manuel)":""}</span></div>`+
      `<div class="bar" style="margin:10px 0 0"><button class="btn p pset-pri ui-btn" data-a="dlposter" style="flex:1">${shIc}<span>1v1 Düello Posterini Paylaş (PNG)</span></button>${opp.manual?`<button class="btn pset-sec" data-a="dldel" data-v="${esc(opp.uid)}" style="color:var(--wr)">Kaldır</button>`:""}</div>`+
    `</div>`;

    const carRows=
      duelCompareRow("Şampiyonluk",me.car.ch,opp.car.ch,me.car.ch+"🏆",opp.car.ch+"🏆",false)+
      duelCompareRow("Final / İlk 2",me.car.fin,opp.car.fin,me.car.fin,opp.car.fin,false)+
      duelCompareRow("Galibiyet Oranı",me.car.wr,opp.car.wr,"%"+Math.round(me.car.wr),"%"+Math.round(opp.car.wr),false)+
      duelCompareRow("Maç Başı Puan",me.car.ppm,opp.car.ppm,fx(me.car.ppm),fx(opp.car.ppm),false)+
      duelCompareRow("Atılan Gol / Maç",me.car.gpm,opp.car.gpm,fx(me.car.gpm),fx(opp.car.gpm),false)+
      duelCompareRow("Yenilen Gol / Maç",me.car.gapm,opp.car.gapm,fx(me.car.gapm),fx(opp.car.gapm),true);
    const carCard=psetCard("trophy","emr","Kariyer & Kupa Düellosu","Tüm sezonlar toplamı",`${sb.s1}–${sb.s2}`,carRows);

    let fairCard="";
    if(me.xp.n||opp.xp.n){
      const dFmt=v=>(v>0?"+":"")+fx(v);
      fairCard=psetCard("radar","gold","Adil Güç Kıyaslaması","Ortalama takım gücü (GEN) ve beklenti üstü performans",null,
        duelCompareRow("Ortalama Takım GEN",me.xp.avgG,opp.xp.avgG,me.xp.n?fx(me.xp.avgG):"—",opp.xp.n?fx(opp.xp.avgG):"—",false)+
        duelCompareRow("Beklenti Üstü (Sezon/Tur)",me.xp.avgD,opp.xp.avgD,me.xp.n?dFmt(me.xp.avgD):"—",opp.xp.n?dFmt(opp.xp.avgD):"—",false)+
        `<div class="note" style="margin:6px 0 0">Daha düşük GEN takımla beklentinin üstüne çıkan menajer adil kıyaslamada öne geçer.</div>`
      );
    }

    let dnaCard="";
    if(me.dna||opp.dna){
      const md=me.dna,od=opp.dna;
      const xgRows=(md&&od)?(
        duelCompareRow("Bitiricilik (Gol − xG)",md.xgDiff,od.xgDiff,xgS2(md.xgDiff),xgS2(od.xgDiff),false)+
        duelCompareRow("Puan − xPts (Pragmatizm)",md.xPtsDiff,od.xPtsDiff,xgS1(md.xPtsDiff),xgS1(od.xPtsDiff),false)+
        duelCompareRow("Rakip xG / Maç (Savunma)",md.oXg,od.oXg,xgN2(md.oXg),xgN2(od.oXg),true)+
        (md.gkPct!=null&&od.gkPct!=null?duelCompareRow("Kaleci Kurtarış %",md.gkPct,od.gkPct,"%"+md.gkPct,"%"+od.gkPct,false):"")
      ):`<div class="note" style="margin:6px 0 0">Tam xG kıyaslaması için iki menajerin de gelişmiş maç istatistiği girmesi gerekir.</div>`;
      dnaCard=psetCard("dna","sky","Taktiksel DNA & xG Düellosu","Çift renkli radar ve menajer kimlikleri",null,
        `<div class="dl-leg"><span><i class="me"></i>${esc(me.name)}${md?` (${md.n}M)`:""}</span><span><i class="op"></i>${esc(opp.name)}${od?` (${od.n}M)`:""}</span></div>`+
        `<div class="dl-radar">${duelRadarSvg(md,od)}</div>`+
        `<div class="dl-ids">`+
          `<div class="dl-id me"><small>${esc(me.name)}</small><b>${esc(md?md.title:"Veri yok")}</b>${md&&md.subTag?`<em>${esc(md.subTag)}</em>`:""}</div>`+
          `<div class="dl-id op"><small>${esc(opp.name)}</small><b>${esc(od?od.title:"Veri yok")}</b>${od&&od.subTag?`<em>${esc(od.subTag)}</em>`:""}</div>`+
        `</div>`+
        `<div style="margin-top:10px">${xgRows}</div>`
      );
    }

    const formDots=arr=>(arr&&arr.length)?`<div class="dl-form">${arr.map(r=>`<i class="${r}">${r=="w"?"G":r=="d"?"B":"M"}</i>`).join("")}</div>`:`<div class="note" style="margin:4px 0 0">Maç yok</div>`;
    const curSide=(p,cls)=>{
      const c=p.cur;if(!c)return `<div class="dl-cs ${cls}"><small>${esc(p.name)}</small><b>Aktif sezon yok</b></div>`;
      const ti=c.team&&IX[c.team]!=null?IX[c.team]:null;
      return `<div class="dl-cs ${cls}"><div class="dl-csh">${ti!=null?badge(ti,24):""}<div><small>${esc(p.name)}</small><b>${esc(c.team||"Takım seçilmedi")}</b></div></div><div class="dl-csm">${esc(c.stage||"")} · ${c.w}G ${c.d}B ${c.l}M</div>${formDots(c.form)}</div>`;
    };
    const pulseCard=psetCard("flame","org","Canlı Sezon Nabzı","Aktif sezondaki takım ve son 5 maç formu",null,
      `<div class="dl-curgrid">${curSide(me,"me")}${curSide(opp,"op")}</div>`
    );

    vsHtml=hero+carCard+fairCard+dnaCard+pulseCard;
  }

  // 4) Yedek: Çevrimdışı Manuel Kıyas Kodu
  const manCard=`<details class="xfold" style="margin-top:12px"><summary class="xsh"><span class="xshl"><span class="xshi">${UICO.backup}</span><span class="xsht"><b>Çevrimdışı Manuel Kıyas Kodu</b><small>Oda kullanmadan tek seferlik kodla kıyasla</small></span></span><span class="xshr"><span class="xfc" aria-hidden="true">${UICO.chev}</span></span></summary><div class="xfb">`+
    `<div class="bar" style="margin:0 0 8px"><button class="btn pset-sec" data-a="dlmycode" style="flex:1">Kendi Kıyas Kodumu Kopyala</button></div>`+
    `<textarea id="dl_imp" class="f" rows="2" placeholder="Arkadaşının kıyas kodunu buraya yapıştır…"></textarea>`+
    `<div class="bar" style="margin:8px 0 0"><button class="btn p pset-pri" data-a="dladdcode" style="flex:1">Koddan Rakip Ekle</button></div>`+
  `</div></details>`;

  return connHtml+lbHtml+vsHtml+manCard;
}

// Düello aksiyon yönlendiricisi (app.js click listener içinden çağrılır)
async function handleDuelAction(a,dv){
  if(a=="dljoin"){
    const nmEl=$("dl_nm"),rmEl=$("dl_rm");
    const nm=(nmEl?nmEl.value:"").replace(/\s+/g," ").trim().slice(0,32)||(store.owner||"Menajer");
    const rm=duelNormRoom(rmEl?rmEl.value:"");
    if(rm.length<6){ask("Oda kodu en az 6 karakter olmalı (örn: fc27-duello-2026).");render();return true}
    const cfg=duelLoadCfg();
    cfg.name=nm;cfg.room=rm;cfg.auto=true;
    duelSaveCfg(cfg);
    st.duelEdit=false;st.duelErr="";
    await duelSyncNow(false);
    return true;
  }
  if(a=="dlsync"){await duelSyncNow(false);return true}
  if(a=="dledit"){st.duelEdit=true;render();return true}
  if(a=="dlcancel"){st.duelEdit=false;render();return true}
  if(a=="dlleave"){
    ask("Bu düello odasından ayrılmak istiyor musun? Telefonundaki sezon kayıtların etkilenmez.",()=>{
      const cfg=duelLoadCfg();cfg.room="";duelSaveCfg(cfg);
      const cache=duelLoadCache();cache.peers={};cache.sel="";cache.lastSync=0;duelSaveCache(cache);
      st.duelEdit=false;st.duelErr="";
      return "Düello odasından ayrıldın";
    });
    render();return true;
  }
  if(a=="dlsel"){
    const cache=duelLoadCache();cache.sel=dv||"";duelSaveCache(cache);
    render();return true;
  }
  if(a=="dldel"){
    const cache=duelLoadCache();if(dv&&cache.peers[dv])delete cache.peers[dv];
    if(cache.sel===dv)cache.sel="";
    duelSaveCache(cache);ntf("Manuel rakip kaldırıldı");render();return true;
  }
  if(a=="dlcpcode"){
    const cfg=duelLoadCfg();
    if(cfg.room){
      try{await navigator.clipboard.writeText(cfg.room);ntf("Oda kodu kopyalandı: "+cfg.room)}
      catch(e){ntf("Oda kodu: "+cfg.room)}
    }
    return true;
  }
  if(a=="dlmycode"){
    const code=duelCodeEncode();
    try{await navigator.clipboard.writeText(code);ntf("Kıyas kodun kopyalandı — WhatsApp’tan gönderebilirsin")}
    catch(e){const el=$("dl_imp");if(el){el.value=code;el.select()}ntf("Kod kutuya yazıldı, kopyalayabilirsin")}
    return true;
  }
  if(a=="dladdcode"){
    const el=$("dl_imp"),raw=el?el.value:"";
    const obj=duelCodeDecode(raw);
    if(!obj){ask("Geçersiz kıyas kodu. Arkadaşının «Kendi Kıyas Kodumu Kopyala» ile aldığı metni yapıştır.");render();return true}
    const cache=duelLoadCache();
    cache.peers[obj.uid]=obj;cache.sel=obj.uid;
    duelSaveCache(cache);
    if(el)el.value="";
    ntf(obj.name+" kıyaslamaya eklendi");
    render();return true;
  }
  if(a=="dlposter"){
    const cfg=duelLoadCfg(),cache=duelLoadCache();
    const me=buildDuelSummary();
    const rivals=Object.values(cache.peers||{}).filter(p=>p&&p.uid&&p.uid!==cfg.uid);
    const opp=(cache.sel&&rivals.find(r=>r.uid===cache.sel))||rivals[0];
    if(!opp){ask("Poster için önce bir rakip olmalı.");render();return true}
    mkImg("duello",{name:me.name+"-vs-"+opp.name,me,opp});
    return true;
  }
  return false;
}

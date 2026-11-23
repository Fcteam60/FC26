/* ==========================================================================
   FC 27 Grup Ligi — Canlı Menajer Düellosu (VS), Canlı Sezon İnceleme & Firebase REST (duel.js · v20.36)
   - Sıfır harici SDK: doğrudan fetch() ile Firebase Realtime Database REST API kullanır.
   - Çevrimdışı öncelikli: ana veriler IndexedDB'de kalır, yalnızca ~2 KB özet eşitlenir.
   - Tümü / Kupa / Lig kırılımı, Temiz Kasa %, Galibiyet Serisi, Averaj, Kariyer Yıldızı ve
     negatif/verisiz uç durum korumalı kıyaslama motoru.
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

// Belirli bir mod (all / cup / lg) için kariyer, temiz kasa, galibiyet serisi ve beklenti üstü metrikleri
function duelModeStats(mode){
  const d=careerData(mode);
  const S=store.seasons.filter(x=>!mode||mode=="all"||(mode=="lg"?isLg(x.cfg):!isLg(x.cfg)));
  const totM=(d.t.w||0)+(d.t.d||0)+(d.t.l||0);
  const pts=(d.t.w||0)*3+(d.t.d||0);
  const gf=d.t.gf||0,ga=d.t.ga||0,gd=gf-ga;
  const wr=totM?Math.round(d.t.w/totM*1000)/10:null;
  const ppm=totM?Math.round(pts/totM*100)/100:null;
  const gpm=totM?Math.round(gf/totM*100)/100:null;
  const gapm=totM?Math.round(ga/totM*100)/100:null;
  const chRate=d.finN?Math.round(d.ch/d.finN*1000)/10:null;

  // Maç bazlı: temiz kasa (clean sheet %) ve en uzun galibiyet serisi
  const mtAll=S.flatMap(x=>x.mt||[]);
  let csCnt=0,curW=0,maxW=0;
  mtAll.forEach(m=>{
    if((+m.ga||0)===0)csCnt++;
    if(mres(m)==="w"){curW++;if(curW>maxW)maxW=curW}else curW=0;
  });
  const csPct=mtAll.length?Math.round(csCnt/mtAll.length*1000)/10:null;

  const xpL=typeof xpData==="function"?xpData(mode):[];
  const xpAvgG=xpL.length?Math.round(xpL.reduce((a,o)=>a+o.g,0)/xpL.length*10)/10:null;
  const xpTotD=xpL.length?xpL.reduce((a,o)=>a+o.d,0):0;
  const xpAvgD=xpL.length?Math.round(xpTotD/xpL.length*100)/100:null;
  const xpUp=xpL.filter(o=>o.d>0).length;

  return{
    car:{n:d.n,finN:d.finN,ch:d.ch,chRate,fin:d.fin,pod:d.pod,w:d.t.w||0,d:d.t.d||0,l:d.t.l||0,gf,ga,gd,m:totM,wr,ppm,gpm,gapm,csPct,maxW:mtAll.length?maxW:null},
    xp:{n:xpL.length,avgG:xpAvgG,totD:xpTotD,avgD:xpAvgD,up:xpUp},
    star:d.ga?{n:d.ga.n,v:d.ga.v,g:d.g?d.g.v:null,gn:d.g?d.g.n:""}:null
  };
}

// Aktif sezona ait kompakt canlı veri paketi (Puan durumu, Maçlar/Fikstür, Eleme yolu, Sezon yıldızları & Sezon DNA)
function buildDuelLiveSeason(cs){
  if(!cs||!cs.cfg)return null;
  const lg=isLg(cs.cfg)?1:0,q=lg?0:(cs.cfg.q||0),my=cs.my;
  let gName="",tbl=[],rem=[];
  if(cs.G&&cs.G.length&&(cs.cfg.gs||lg)){
    const gi=lg?0:(my!=null?cs.G.findIndex(g=>g.includes(my)):-1);
    if(gi>=0&&cs.G[gi]){
      gName=typeof gname==="function"?gname(cs,gi):(lg?"Lig Tablosu":"Grup "+GL(gi));
      if(typeof calcGroupTable==="function"){
        const rows=calcGroupTable(cs,gi);
        tbl=rows.map(r=>[T[r.ti]?T[r.ti].n:"?",r.o,r.w,r.d,r.l,r.gf,r.ga,r.pts,r.ti===my?1:0]);
      }
      // Kalan grup/lig rakipleri
      if(my!=null){
        const maxGl=cs.cfg.gl||1,played=nob();
        (cs.mt||[]).filter(m=>m.rd==="Grup"&&m.opp!=null).forEach(m=>{played[m.opp]=(played[m.opp]||0)+1});
        cs.G[gi].forEach(ti=>{
          if(ti===my)return;
          const left=maxGl-(played[ti]||0);
          if(left>0&&T[ti])rem.push([T[ti].n,left]);
        });
      }
    }
  }
  const mt=(cs.mt||[]).slice(-46).map(m=>{
    const st0=m.stats||{};
    const mx=st0.myXg!=null?Math.round(+st0.myXg*100)/100:null;
    const ox=st0.oppXg!=null?Math.round(+st0.oppXg*100)/100:null;
    return [m.on||(m.opp!=null&&T[m.opp]?T[m.opp].n:"Rakip"),+m.gf||0,+m.ga||0,m.rd||"Grup",m.et?1:0,m.pf!=null?+m.pf:null,m.pa!=null?+m.pa:null,mx,ox];
  });
  let ko=[];
  if(!lg&&cs.sim&&cs.sim.ko&&typeof rds==="function"){
    const RDs=rds(cs.cfg).filter(r=>r!=="Grup");
    RDs.forEach(rd=>{
      const ps=cs.sim.ko[rd];
      if(!Array.isArray(ps)||!ps.length)return;
      const list=ps.map(p=>{
        const n1=p.t1!=null&&T[p.t1]?T[p.t1].n:"?";
        const n2=p.t2!=null&&T[p.t2]?T[p.t2].n:"?";
        const wi=p.w==null?0:(p.w===p.t1?1:(p.w===p.t2?2:0));
        const mine=(my!=null&&(p.t1===my||p.t2===my))?1:0;
        return [n1,n2,p.g1!=null?+p.g1:null,p.g2!=null?+p.g2:null,wi,p.pf!=null?+p.pf:null,p.pa!=null?+p.pa:null,p.et?1:0,mine];
      });
      ko.push([rd,list]);
    });
  }
  const pls=(cs.pl||[]).slice();
  const top3=(k,k2)=>pls.filter(p=>(p[k]||0)>0).sort((a,b)=>(b[k]||0)-(a[k]||0)||(b[k2]||0)-(a[k2]||0)).slice(0,3).map(p=>[p.n,p[k]||0,p[k2]||0]);
  const stars={g:top3("g","a"),a:top3("a","g"),m:top3("mom","g")};
  let sDna=null;
  const sdRaw=typeof calcTacticalDNA==="function"?calcTacticalDNA(cs,true):null;
  if(sdRaw){
    sDna={
      n:sdRaw.n,title:sdRaw.title,subTag:sdRaw.subTag||"",
      atk:sdRaw.atk,ctrl:sdRaw.ctrl,aggr:sdRaw.aggr,eff:sdRaw.eff,
      mPos:Math.round(sdRaw.mPos),mPass:Math.round(sdRaw.mPass),
      mXg:Math.round(sdRaw.mXg*100)/100,oXg:Math.round(sdRaw.oXg*100)/100,
      xgDiff:Math.round(sdRaw.xgDiff*100)/100
    };
  }
  return{fmt:typeof fmt==="function"?fmt(cs.cfg):"",lg,q,gName,tbl,mt,rem,ko,stars,dna:sDna};
}

// Mevcut cihazdaki tüm sezonlardan ~4-5 KB'lık kompakt Menajer Düellosu + Canlı Sezon özeti üretir (v:3)
function buildDuelSummary(){
  const cfg=duelLoadCfg();
  const allS=duelModeStats("all"),cupS=duelModeStats("cup"),lgS=duelModeStats("lg");

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
      xPtsDiff:xa.length?Math.round((actPtsSum-xPtsSum)*10)/10:null,
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
    v:3,
    uid:cfg.uid,
    name:nm,
    ut:Date.now(),
    ver:VER,
    car:allS.car,
    xp:allS.xp,
    star:allS.star,
    modes:{cup:{car:cupS.car,xp:cupS.xp},lg:{car:lgS.car,xp:lgS.xp}},
    dna,
    cur:active,
    live:buildDuelLiveSeason(cs)
  };
}

// Eski (v1) veya yeni (v2) özetlerden seçili moda göre güvenli veri okuma
function duelPickMode(p,mode){
  if(!p)return{car:{n:0,finN:0,ch:0,fin:0,pod:0,m:0},xp:{n:0},compat:true};
  if(mode=="cup"||mode=="lg"){
    if(p.modes&&p.modes[mode])return{car:p.modes[mode].car,xp:p.modes[mode].xp,compat:true};
    return{car:{n:0,finN:0,ch:0,fin:0,pod:0,m:0},xp:{n:0},compat:false};
  }
  const c=p.car||{},m=c.m||0;
  // v1 geri uyumluluk: 0 maçlı eski kayıtlarda rate alanlarını null yap ki haksız puan almasın
  const normCar=Object.assign({},c,{
    gd:c.gd!=null?c.gd:((c.gf||0)-(c.ga||0)),
    chRate:c.chRate!=null?c.chRate:(c.finN?Math.round((c.ch||0)/c.finN*1000)/10:null),
    wr:m>0?c.wr:null,
    ppm:m>0?c.ppm:null,
    gpm:m>0?c.gpm:null,
    gapm:m>0?c.gapm:null,
    csPct:c.csPct!=null?c.csPct:null,
    maxW:c.maxW!=null?c.maxW:null
  });
  const x=p.xp||{n:0};
  const normXp={n:x.n||0,avgG:x.n?x.avgG:null,totD:x.totD||0,avgD:x.n?x.avgD:null,up:x.up||0};
  return{car:normCar,xp:normXp,compat:true};
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

async function duelDeleteRemote(cfg){
  if(!cfg||!cfg.room||cfg.room.length<6||!cfg.uid)return false;
  if(typeof navigator!=="undefined"&&navigator.onLine===false)return false;
  const url=`${duelBaseUrl(cfg)}/rooms/${encodeURIComponent(cfg.room)}/${encodeURIComponent(cfg.uid)}.json`;
  try{
    const r=await fetch(url,{method:"DELETE"});
    return r.ok;
  }catch(e){return false}
}

async function duelSyncNow(silent){
  if(st.duelBusy)return;
  const cfg=duelLoadCfg();
  if(!cfg.room||cfg.room.length<6)return;
  // Otomatik sekme geçişlerinde 10 saniye içinde gereksiz tekrar isteği engelle
  if(silent&&Date.now()-(st.duelLastAuto||0)<10000)return;
  st.duelBusy=true;
  st.duelLastAuto=Date.now();
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

// Negatif / null / 0-maç korumalı bar genişliği ve kazanan hesabı
function duelBarCalc(v1,v2,lowerBetter){
  const h1=v1!=null&&Number.isFinite(+v1),h2=v2!=null&&Number.isFinite(+v2);
  if(!h1&&!h2)return{p1:0,p2:0,w1:false,w2:false};
  if(!h1)return{p1:0,p2:65,w1:false,w2:false};
  if(!h2)return{p1:65,p2:0,w1:false,w2:false};
  const n1=+v1,n2=+v2;
  const w1=lowerBetter?(n1<n2):(n1>n2),w2=lowerBetter?(n2<n1):(n2>n1);
  if(n1===n2)return{p1:n1===0?14:55,p2:n2===0?14:55,w1:false,w2:false};
  if(n1<0||n2<0){
    const a=lowerBetter?-n1:n1,b=lowerBetter?-n2:n2;
    if(a>0&&b<=0)return{p1:100,p2:10,w1,w2};
    if(b>0&&a<=0)return{p1:10,p2:100,w1,w2};
    const lo=Math.min(a,b),hi=Math.max(a,b),sp=Math.max(0.01,hi-lo),pad=sp*0.25;
    return{
      p1:Math.max(10,Math.min(100,Math.round((a-lo+pad)/(sp+pad)*100))),
      p2:Math.max(10,Math.min(100,Math.round((b-lo+pad)/(sp+pad)*100))),
      w1,w2
    };
  }
  const mx=Math.max(0.01,n1,n2);
  return{
    p1:n1>0?Math.max(8,Math.min(100,Math.round(n1/mx*100))):6,
    p2:n2>0?Math.max(8,Math.min(100,Math.round(n2/mx*100))):6,
    w1,w2
  };
}

function duelCompareRow(label,v1,v2,fmt1,fmt2,lowerBetter){
  const b=duelBarCalc(v1,v2,lowerBetter);
  return `<div class="dl-row">`+
    `<div class="dl-top"><b class="dl-v me${b.w1?" win":""}">${fmt1}</b><span class="dl-lbl">${label}</span><b class="dl-v op${b.w2?" win":""}">${fmt2}</b></div>`+
    `<div class="dl-bars"><div class="dl-bL"><i style="width:${b.p1}%"></i></div><div class="dl-bR"><i style="width:${b.p2}%"></i></div></div>`+
  `</div>`;
}

// Sadece iki tarafın da geçerli verisi olan kategorilerde puan verir (0 maçlıya haksız puan yok)
function duelScoreboard(me,opp,mode){
  const m1=duelPickMode(me,mode||"all"),m2=duelPickMode(opp,mode||"all");
  const c1=m1.car,c2=m2.car;
  let s1=0,s2=0;
  const cmp=(a,b,low)=>{
    if(a==null||b==null||!Number.isFinite(+a)||!Number.isFinite(+b))return;
    if(low){if(+a<+b)s1++;else if(+b<+a)s2++}else{if(+a>+b)s1++;else if(+b>+a)s2++}
  };
  if(c1.n>0&&c2.n>0){
    cmp(c1.ch,c2.ch,false);
    cmp(c1.fin,c2.fin,false);
    cmp(c1.pod,c2.pod,false);
  }
  if(c1.m>0&&c2.m>0){
    cmp(c1.wr,c2.wr,false);
    cmp(c1.ppm,c2.ppm,false);
    cmp(c1.gpm,c2.gpm,false);
    cmp(c1.gapm,c2.gapm,true);
    cmp(c1.csPct,c2.csPct,false);
    cmp(c1.maxW,c2.maxW,false);
  }
  if(m1.xp.n>0&&m2.xp.n>0)cmp(m1.xp.avgD,m2.xp.avgD,false);
  if((!mode||mode=="all")&&me.dna&&opp.dna){
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
  const mode=st.dlmod||"all";
  const hasRoom=!!(cfg.room&&cfg.room.length>=6);
  const allPeers=Object.values(cache.peers||{}).filter(p=>p&&p.uid&&p.uid!==cfg.uid);
  const rivals=allPeers.sort((a,b)=>(b.car.ch-a.car.ch)||((b.car.ppm||0)-(a.car.ppm||0))||(b.ut-a.ut));
  const selUid=(cache.sel&&rivals.some(r=>r.uid===cache.sel))?cache.sel:(rivals[0]?rivals[0].uid:"");
  const opp=rivals.find(r=>r.uid===selUid)||null;

  // 1) Oda Bağlantı / Durum Kartı
  let connHtml="";
  if(!hasRoom||st.duelEdit){
    connHtml=psetCard("duo","emr",hasRoom?"Düello Odası Ayarları":"Canlı Menajer Düellosu","Arkadaşınla aynı oda kodunu gir, sezonlarınız otomatik kıyaslansın",hasRoom?cfg.room:"Hazır",
      `<div class="note" style="margin:0 0 10px">İkiniz de aynı <b>Oda Kodu</b>’nu girdiğinizde maç kaydettikçe yalnızca ~2 KB’lık özetiniz eşitlenir; ana kayıtlarınız telefonunuzda kalır.</div>`+
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

  // 2) Oda Sıralaması (3+ kişi)
  let lbHtml="";
  if(rivals.length>=2){
    const board=[me,...rivals].sort((a,b)=>(b.car.ch-a.car.ch)||((b.car.ppm||0)-(a.car.ppm||0))||((b.car.wr||0)-(a.car.wr||0)));
    lbHtml=psetCard("trophy","gold","Oda Sıralaması","Kıyaslamak için bir rakibe dokun",`${board.length} menajer`,
      `<div class="dl-lb">${board.map((p,idx)=>{
        const isMe=p.uid===cfg.uid,isSel=p.uid===selUid;
        const wrTxt=p.car.m?`%${Math.round(p.car.wr||0)}G`:"0 maç";
        const ppmTxt=p.car.m?`${fx(p.car.ppm||0)} P/M`:"—";
        const inner=`<span class="dl-rk">${idx+1}</span><span class="dl-pnm"><b>${esc(p.name)}${isMe?" (Sen)":""}</b><small>${p.car.n} sezon · ${p.car.m} maç · ${wrTxt}</small></span><span class="dl-pkpi"><b>${p.car.ch}🏆</b><small>${ppmTxt}</small></span>`;
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
    const m1=duelPickMode(me,mode),m2=duelPickMode(opp,mode);
    const c1=m1.car,c2=m2.car;
    const sb=duelScoreboard(me,opp,mode);
    const shIc='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>';
    const modeLbl=mode=="cup"?"Kupa":mode=="lg"?"Lig":"Tüm Sezonlar";

    const modeBar=`<div class="stabs seg3" style="margin:10px 0" role="tablist" aria-label="Düello filtresi">${[["all","Tümü"],["cup","Kupa"],["lg","Lig"]].map(([k,l])=>`<button class="chip ${mode==k?"on":""}" role="tab" aria-selected="${mode==k}" data-a="dlmod" data-v="${k}">${l}</button>`).join("")}</div>`;
    const compatNote=(!m2.compat&&mode!="all")?`<div class="note wr" style="margin:0 0 10px">${esc(opp.name)} henüz önceki sürümde eşitleme yaptı; Kupa/Lig ayrımı için uygulamayı güncelleyip bir kez eşitlemesi gerekir.</div>`:"";

    const hero=`<div class="card pglass dl-hero">`+
      `<div class="dl-vshead">`+
        `<div class="dl-side me"><span class="dl-dot me"></span><b>${esc(me.name)}</b><small>${c1.n} sezon · ${c1.m} maç</small></div>`+
        `<div class="dl-mid"><span class="dl-vs">VS</span><div class="dl-sc"><b class="me">${sb.s1}</b><span>–</span><b class="op">${sb.s2}</b></div></div>`+
        `<div class="dl-side op"><span class="dl-dot op"></span><b>${esc(opp.name)}</b><small>${c2.n} sezon · ${c2.m} maç</small></div>`+
      `</div>`+
      `<div class="dl-meta"><span>Senin son kaydın: Güncel</span><span>${esc(opp.name)}: ${esc(duelRelTime(opp.ut))}${opp.manual?" (Manuel)":""}</span></div>`+
      `<div class="bar" style="margin:10px 0 0"><button class="btn p pset-pri ui-btn" data-a="dlposter" style="flex:1">${shIc}<span>1v1 Düello Posterini Paylaş (PNG)</span></button>${opp.manual?`<button class="btn pset-sec" data-a="dldel" data-v="${esc(opp.uid)}" style="color:var(--wr)">Kaldır</button>`:""}</div>`+
    `</div>`;

    const sgnI=v=>v==null?"—":(v>0?"+"+v:v<0?"−"+Math.abs(v):"0");
    const pctF=v=>v==null?"—":"%"+Math.round(v);
    const fxF=v=>v==null?"—":fx(v);
    const carRows=
      duelCompareRow("Şampiyonluk",c1.n?c1.ch:null,c2.n?c2.ch:null,c1.n?c1.ch+"🏆":"—",c2.n?c2.ch+"🏆":"—",false)+
      duelCompareRow("Kupa Oranı",c1.chRate,c2.chRate,pctF(c1.chRate),pctF(c2.chRate),false)+
      duelCompareRow(mode=="lg"?"İlk 2":"Final / İlk 2",c1.n?c1.fin:null,c2.n?c2.fin:null,c1.n?c1.fin:"—",c2.n?c2.fin:"—",false)+
      duelCompareRow(mode=="lg"?"İlk 3 (Podyum)":"Yarı Final+",c1.n?c1.pod:null,c2.n?c2.pod:null,c1.n?c1.pod:"—",c2.n?c2.pod:"—",false)+
      duelCompareRow("Galibiyet Oranı",c1.wr,c2.wr,pctF(c1.wr),pctF(c2.wr),false)+
      duelCompareRow("Maç Başı Puan",c1.ppm,c2.ppm,fxF(c1.ppm),fxF(c2.ppm),false)+
      duelCompareRow("Atılan Gol / Maç",c1.gpm,c2.gpm,fxF(c1.gpm),fxF(c2.gpm),false)+
      duelCompareRow("Yenilen Gol / Maç",c1.gapm,c2.gapm,fxF(c1.gapm),fxF(c2.gapm),true)+
      duelCompareRow("Toplam Averaj",c1.m?c1.gd:null,c2.m?c2.gd:null,c1.m?sgnI(c1.gd):"—",c2.m?sgnI(c2.gd):"—",false)+
      duelCompareRow("Temiz Kasa (Clean Sheet)",c1.csPct,c2.csPct,pctF(c1.csPct),pctF(c2.csPct),false)+
      duelCompareRow("En Uzun Galibiyet Serisi",c1.maxW,c2.maxW,c1.maxW!=null?c1.maxW+" maç":"—",c2.maxW!=null?c2.maxW+" maç":"—",false);
    const carCard=psetCard("trophy","emr","Kariyer & Kupa Düellosu",`${modeLbl} · ${c1.m} vs ${c2.m} maç`,`${sb.s1}–${sb.s2}`,carRows);

    let fairCard="";
    if(m1.xp.n||m2.xp.n){
      const dFmt=v=>v==null?"—":(v>0?"+":"")+fx(v);
      fairCard=psetCard("radar","gold","Adil Güç Kıyaslaması","Ortalama takım gücü (GEN) ve beklenti üstü performans",modeLbl,
        duelCompareRow("Ortalama Takım GEN",m1.xp.avgG,m2.xp.avgG,fxF(m1.xp.avgG),fxF(m2.xp.avgG),false)+
        duelCompareRow("Beklenti Üstü (Sezon/Tur)",m1.xp.avgD,m2.xp.avgD,dFmt(m1.xp.avgD),dFmt(m2.xp.avgD),false)+
        `<div class="note" style="margin:6px 0 0">Daha düşük GEN takımla beklentinin üstüne çıkan menajer adil kıyaslamada öne geçer.</div>`
      );
    }

    let starCard="";
    if(me.star||opp.star){
      const sBox=(p,cls)=>{
        const st0=p.star;
        return `<div class="dl-id ${cls}"><small>${esc(p.name)}</small><b>${st0?esc(st0.n):"Veri yok"}</b>${st0?`<em>${st0.v} G+A${st0.g!=null&&st0.gn&&nz(st0.gn)===nz(st0.n)?` · ${st0.g} Gol`:""}</em>`:""}</div>`;
      };
      starCard=psetCard("spark","gold","Kariyer Yıldızı Düellosu","Tüm sezonlarda en çok skor katkısı (G+A) üreten yıldızlar",null,
        `<div class="dl-ids" style="margin-top:0">${sBox(me,"me")}${sBox(opp,"op")}</div>`
      );
    }

    let dnaCard="";
    if(me.dna||opp.dna){
      const md=me.dna,od=opp.dna;
      const luckVal=d=>d&&d.xgPairCnt?((d.st||0)-(d.un||0)):null;
      const luckFmt=d=>d&&d.xgPairCnt?`${d.st||0}Ş / ${d.un||0}Şs`:"—";
      const xgRows=(md&&od)?(
        duelCompareRow("Topla Oynama %",md.mPos,od.mPos,"%"+md.mPos,"%"+od.mPos,false)+
        duelCompareRow("Pas İsabeti %",md.mPass,od.mPass,"%"+md.mPass,"%"+od.mPass,false)+
        duelCompareRow("Üretilen xG / Maç",md.mXg,od.mXg,xgN2(md.mXg),xgN2(od.mXg),false)+
        duelCompareRow("Rakip xG / Maç (Savunma)",md.oXg,od.oXg,xgN2(md.oXg),xgN2(od.oXg),true)+
        duelCompareRow("Bitiricilik (Gol − xG)",md.xgDiff,od.xgDiff,xgS2(md.xgDiff),xgS2(od.xgDiff),false)+
        duelCompareRow("Puan − xPts (Pragmatizm)",md.xPtsDiff,od.xPtsDiff,md.xPtsDiff!=null?xgS1(md.xPtsDiff):"—",od.xPtsDiff!=null?xgS1(od.xPtsDiff):"—",false)+
        (md.gkPct!=null||od.gkPct!=null?duelCompareRow("Kaleci Kurtarış %",md.gkPct,od.gkPct,pctF(md.gkPct),pctF(od.gkPct),false):"")+
        duelCompareRow("Hak Ediş (Şanslı / Şanssız)",luckVal(md),luckVal(od),luckFmt(md),luckFmt(od),false)
      ):`<div class="note" style="margin:6px 0 0">Tam xG kıyaslaması için iki menajerin de gelişmiş maç istatistiği girmesi gerekir.</div>`;
      dnaCard=psetCard("dna","sky","Taktiksel DNA & xG Düellosu","Çift renkli radar, oyun tarzı ve xG metrikleri",null,
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
      const gTag=c.teamG?`<span class="dl-gen">${c.teamG}</span>`:"";
      const gd=(c.gf||0)-(c.ga||0),gdS=(gd>0?"+"+gd:gd<0?"−"+Math.abs(gd):"0");
      return `<div class="dl-cs ${cls}"><div class="dl-csh">${ti!=null?badge(ti,24):""}<div style="min-width:0;flex:1"><small>${esc(p.name)}</small><b>${esc(c.team||"Takım seçilmedi")}</b></div>${gTag}</div><div class="dl-csm">${esc(c.stage||"")} · ${c.w}G ${c.d}B ${c.l}M</div><div class="dl-csm">Gol: ${c.gf||0}:${c.ga||0} (Av ${gdS})</div>${formDots(c.form)}</div>`;
    };
    const pulseCard=psetCard("flame","org","Canlı Sezon Nabzı","Aktif sezondaki kulüp, GEN, averaj ve son 5 maç formu",null,
      `<div class="dl-curgrid">${curSide(me,"me")}${curSide(opp,"op")}</div>`+
      `<div class="bar" style="margin:10px 0 0"><button class="btn p pset-pri ui-btn" data-a="dllive" data-v="${esc(opp.uid)}" style="flex:1">${UICO.radar}<span>${esc(opp.name)} · Canlı Sezonu İncele (Tablo · Fikstür)</span></button></div>`
    );

    vsHtml=modeBar+compatNote+hero+carCard+fairCard+starCard+dnaCard+pulseCard;
  }

  // 4) Yedek: Çevrimdışı Manuel Kıyas Kodu
  const manCard=`<details class="xfold" style="margin-top:12px"><summary class="xsh"><span class="xshl"><span class="xshi">${UICO.backup}</span><span class="xsht"><b>Çevrimdışı Manuel Kıyas Kodu</b><small>Oda kullanmadan tek seferlik kodla kıyasla</small></span></span><span class="xshr"><span class="xfc" aria-hidden="true">${UICO.chev}</span></span></summary><div class="xfb">`+
    `<div class="bar" style="margin:0 0 8px"><button class="btn pset-sec" data-a="dlmycode" style="flex:1">Kendi Kıyas Kodumu Kopyala</button></div>`+
    `<textarea id="dl_imp" class="f" rows="2" placeholder="Arkadaşının kıyas kodunu buraya yapıştır…"></textarea>`+
    `<div class="bar" style="margin:8px 0 0"><button class="btn p pset-pri" data-a="dladdcode" style="flex:1">Koddan Rakip Ekle</button></div>`+
  `</div></details>`;

  return connHtml+lbHtml+vsHtml+manCard;
}

// Canlı Sezon İnceleme Modalı (4 Sekmeli: Puan Durumu · Maçlar/Fikstür · Eleme Yolu · Yıldızlar & DNA)
function duelLiveDlg(){
  if(!st.dlLive)return "";
  const cfg=duelLoadCfg(),cache=duelLoadCache();
  const me=buildDuelSummary();
  const rivals=Object.values(cache.peers||{}).filter(p=>p&&p.uid&&p.uid!==cfg.uid);
  const targetUid=st.dlLive.uid||"";
  const isMe=targetUid===cfg.uid;
  const p=isMe?me:(rivals.find(r=>r.uid===targetUid)||rivals[0]||me);
  const other=isMe?(rivals.find(r=>r.uid===cache.sel)||rivals[0]||null):me;
  const tab=st.dlLive.tab||"tbl";
  const c=p.cur||{},lv=p.live||null;
  const ti=c.team&&IX[c.team]!=null?IX[c.team]:null;
  const gd=(c.gf||0)-(c.ga||0),gdS=(gd>0?"+"+gd:gd<0?"−"+Math.abs(gd):"0");

  // Üst kişi değiştirici (Sen / Rakip)
  const whoSwitch=other?`<div class="stabs seg2" style="margin:0 0 10px">`+
    `<button class="chip ${p.uid===me.uid?"on":""}" data-a="dllivewho" data-v="${esc(me.uid)}">${esc(me.name)} (Sen)</button>`+
    `<button class="chip ${p.uid!==me.uid?"on":""}" data-a="dllivewho" data-v="${esc((p.uid!==me.uid?p:other).uid)}">${esc((p.uid!==me.uid?p:other).name)}</button>`+
  `</div>`:"";

  const headCard=`<div class="dl-lvhead ${p.uid===me.uid?"me":"op"}">`+
    `<div class="dl-csh">${ti!=null?badge(ti,36):""}<div style="min-width:0;flex:1"><b>${esc(c.team||"Takım seçilmedi")}</b><small>${esc(c.sName||"Aktif Sezon")}${c.stage?" · "+esc(c.stage):""}</small></div>${c.teamG?`<span class="dl-gen">${c.teamG} GEN</span>`:""}</div>`+
    `<div class="dl-lvkpi"><span><b>${c.w||0}G ${c.d||0}B ${c.l||0}M</b><em>Karne</em></span><span><b>${c.gf||0}:${c.ga||0}</b><em>Gol (Av ${gdS})</em></span><span><b>${lv&&lv.mt?lv.mt.length:((c.w||0)+(c.d||0)+(c.l||0))}</b><em>Maç</em></span></div>`+
    (lv&&lv.fmt?`<div class="note" style="margin:6px 0 0;font-size:11.5px">${esc(lv.fmt)}</div>`:"")+
  `</div>`;

  let body="";
  if(!lv){
    body=`<div class="note wr" style="margin:8px 0"><b>${esc(p.name)}</b> henüz <b>v20.36</b> sürümüne geçip eşitleme yapmadığı için detaylı canlı sezon verisi (puan durumu, fikstür, eleme yolu) henüz paylaşılmadı. Güncelleyip <b>Şimdi Eşitle</b> dediğinde burada otomatik görünecek.</div>`;
  }else{
    const nav=`<div class="stabs dl-lvtbs" role="tablist" aria-label="Canlı sezon bölümleri">${[["tbl","Puan Durumu"],["mt","Maçlar"],["ko","Eleme"],["st","Yıldız & DNA"]].map(([k,l])=>`<button class="chip ${tab==k?"on":""}" role="tab" aria-selected="${tab==k}" data-a="dllivetab" data-v="${k}">${l}</button>`).join("")}</div>`;
    let content="";
    if(tab=="tbl"){
      if(lv.tbl&&lv.tbl.length){
        const qCut=!lv.lg&&lv.q>0?lv.q:0;
        const rowsHtml=lv.tbl.map((r,idx)=>{
          const [nm,o,w,d,l,gf,ga,pts,mine]=r;
          const rti=IX[nm]!=null?IX[nm]:null,av=gf-ga,avS=av>0?"+"+av:av<0?"−"+Math.abs(av):"0";
          const isCut=qCut>0&&idx===qCut-1&&idx<lv.tbl.length-1;
          return `<tr class="${mine?"me":""}${isCut?" qcut":""}">`+
            `<td class="rk">${idx+1}</td>`+
            `<td class="tm">${rti!=null?badge(rti,18):""}<span>${esc(nm)}</span></td>`+
            `<td>${o}</td><td>${w}</td><td>${d}</td><td>${l}</td>`+
            `<td class="${av>0?"pos":av<0?"neg":""}">${avS}</td>`+
            `<td class="pt"><b>${pts}</b></td>`+
          `</tr>`;
        }).join("");
        content=`<div class="dl-lvsec"><div class="dl-lvsh"><b>${esc(lv.gName||"Puan Durumu")}</b>${qCut?`<span class="xfpill emr">İlk ${qCut} çıkar</span>`:""}</div>`+
          `<div class="dl-tblwrap"><table class="ptbl dl-ptbl"><thead><tr><th>#</th><th class="tm">Takım</th><th>O</th><th>G</th><th>B</th><th>M</th><th>Av</th><th>P</th></tr></thead><tbody>${rowsHtml}</tbody></table></div></div>`;
      }else{
        content=`<div class="note">Bu sezonda henüz kura/puan tablosu oluşmamış (veya direkt eleme formatında).</div>`;
      }
    }else if(tab=="mt"){
      const remHtml=(lv.rem&&lv.rem.length)?`<div class="dl-lvsec"><div class="dl-lvsh"><b>Kalan Grup / Lig Rakipleri</b><span class="xfpill sky">${lv.rem.reduce((a,x)=>a+x[1],0)} maç kaldı</span></div><div class="dl-remwrap">${lv.rem.map(([nm,cnt])=>{const rti=IX[nm]!=null?IX[nm]:null;return `<span class="dl-remchip">${rti!=null?badge(rti,16):""}<span>${esc(nm)}</span>${cnt>1?`<em>×${cnt}</em>`:""}</span>`}).join("")}</div></div>`:"";
      if(lv.mt&&lv.mt.length){
        const mHtml=lv.mt.slice().reverse().map(m=>{
          const [on,gf,ga,rd,et,pf,pa,mx,ox]=m;
          const r=gf>ga?"w":gf<ga?"l":(pf!=null&&pa!=null&&pf!==pa?(pf>pa?"w":"l"):"d");
          const sc=`${gf}–${ga}${pf!=null&&pa!=null?` (P ${pf}–${pa})`:et?" (UZ)":""}`;
          const rti=IX[on]!=null?IX[on]:null;
          const xgTag=(mx!=null&&ox!=null)?`<span class="dl-mxg">xG ${xgN2(mx)}–${xgN2(ox)}</span>`:"";
          return `<div class="dl-mrow ${r}">`+
            `<span class="dl-mres ${r}">${r=="w"?"G":r=="d"?"B":"M"}</span>`+
            `<div class="dl-mmain"><div class="dl-mtop">${rti!=null?badge(rti,20):""}<b>${esc(on)}</b><span class="dl-mrd">${esc(rd)}</span></div>${xgTag}</div>`+
            `<span class="dl-msc ${r}">${sc}</span>`+
          `</div>`;
        }).join("");
        content=remHtml+`<div class="dl-lvsec"><div class="dl-lvsh"><b>Oynanan Maçlar</b><span class="xfpill">${lv.mt.length} maç</span></div><div class="dl-mlist">${mHtml}</div></div>`;
      }else{
        content=remHtml+`<div class="note">Bu sezonda henüz oynanmış maç yok.</div>`;
      }
    }else if(tab=="ko"){
      if(lv.lg){
        content=`<div class="note">Bu sezon <b>Puan Usulü Lig</b> formatında oynandığı için eleme turu bulunmuyor.</div>`;
      }else if(lv.ko&&lv.ko.length){
        content=lv.ko.map(([rd,pairs])=>{
          const rows=pairs.map(pr=>{
            const [n1,n2,g1,g2,wi,pf,pa,et,mine]=pr;
            const sc=(g1!=null&&g2!=null)?`${g1}–${g2}${pf!=null&&pa!=null?` (P ${pf}–${pa})`:et?" (UZ)":""}`:"—";
            return `<div class="dl-kor${mine?" mine":""}"><span class="dl-kot l${wi===1?" w":""}">${esc(n1)}</span><span class="dl-kosc">${sc}</span><span class="dl-kot r${wi===2?" w":""}">${esc(n2)}</span></div>`;
          }).join("");
          return `<div class="dl-lvsec"><div class="dl-lvsh"><b>${esc(rd)}</b><span class="xfpill">${pairs.length} eşleşme</span></div><div class="dl-kolist">${rows}</div></div>`;
        }).join("");
      }else{
        content=`<div class="note">Eleme ağacı henüz oluşmadı (grup aşaması devam ediyor).</div>`;
      }
    }else if(tab=="st"){
      const stBlk=(ttl,arr,unit,subU)=>{
        if(!arr||!arr.length)return "";
        return `<div class="dl-lvsec"><div class="dl-lvsh"><b>${ttl}</b></div>`+
          `<div class="dl-stlist">${arr.map(([nm,v1,v2],i)=>`<div class="dl-str"><span class="dl-rk">${i+1}</span><b class="dl-stn">${esc(nm)}</b><span class="dl-stv">${v1} ${unit}${v2?` <small>· ${v2} ${subU}</small>`:""}</span></div>`).join("")}</div></div>`;
      };
      const sG=lv.stars?stBlk("Gol Krallığı (Bu Sezon)",lv.stars.g,"G","A"):"";
      const sA=lv.stars?stBlk("Asist Liderleri (Bu Sezon)",lv.stars.a,"A","G"):"";
      const sM=lv.stars?stBlk("Maçın Adamı (MOTM)",lv.stars.m,"★","G"):"";
      let dnaHtml="";
      if(lv.dna){
        const d=lv.dna;
        const bar=(lbl,val)=>`<div class="dl-sdrow"><span>${lbl}</span><div class="dl-sdbar"><i style="width:${val}%"></i></div><b>${val}</b></div>`;
        dnaHtml=`<div class="dl-lvsec"><div class="dl-lvsh"><b>Bu Sezonun Menajer DNA’sı</b><span class="xfpill emr">${d.n} maç</span></div>`+
          `<div class="dl-id ${p.uid===me.uid?"me":"op"}" style="margin-bottom:8px"><b>${esc(d.title)}</b>${d.subTag?`<em>İkincil tarz: ${esc(d.subTag)}</em>`:""}</div>`+
          bar("Hücum Tehdidi",d.atk)+bar("Top & Pas Kontrolü",d.ctrl)+bar("Savunma Direnci",d.aggr)+bar("Bitiricilik Verimi",d.eff)+
          `<div class="dnamets" style="margin-top:8px"><span class="dnam"><b>%${d.mPos}</b><em>Top</em></span><span class="dnam"><b>%${d.mPass}</b><em>Pas</em></span><span class="dnam"><b>${xgN2(d.mXg)}</b><em>xG/M</em></span><span class="dnam"><b>${xgN2(d.oXg)}</b><em>Rakip xG</em></span><span class="dnam ${d.xgDiff>=0?"pos":"neg"}"><b>${xgS2(d.xgDiff)}</b><em>Gol−xG</em></span></div>`+
        `</div>`;
      }
      content=(sG||sA||sM||dnaHtml)?(sG+sA+sM+dnaHtml):`<div class="note">Bu sezonda henüz oyuncu veya gelişmiş maç istatistiği girilmemiş.</div>`;
    }
    body=nav+content;
  }

  return `<div class="dlg ti"><button class="tibk" data-a="no" aria-label="Kapat"></button><div class="dbox tisheet dl-lvbox" role="dialog" aria-modal="true" aria-label="Canlı Sezon İnceleme">`+
    `<div class="tots-dlg-hd"><div><b>${esc(p.name)} · Canlı Sezon</b><small>Son eşitleme: ${esc(duelRelTime(p.ut))}</small></div><button class="mb sc-ic" data-a="no" aria-label="Kapat">✕</button></div>`+
    whoSwitch+headCard+body+
    `<div class="bar" style="margin:12px 0 0"><button class="btn p pset-pri" data-a="no" style="flex:1">Kapat</button></div>`+
  `</div></div>`;
}

// Düello aksiyon yönlendiricisi (app.js click listener içinden çağrılır)
async function handleDuelAction(a,dv){
  if(a=="dlmod"){
    st.dlmod=dv||"all";render();return true;
  }
  if(a=="dllive"){
    st.dlLive={uid:dv||"",tab:"tbl"};render();return true;
  }
  if(a=="dllivetab"){
    if(st.dlLive){st.dlLive.tab=dv||"tbl";render()}return true;
  }
  if(a=="dllivewho"){
    if(st.dlLive){st.dlLive.uid=dv||"";render()}return true;
  }
  if(a=="dljoin"){
    const nmEl=$("dl_nm"),rmEl=$("dl_rm");
    const nm=(nmEl?nmEl.value:"").replace(/\s+/g," ").trim().slice(0,32)||(store.owner||"Menajer");
    const rm=duelNormRoom(rmEl?rmEl.value:"");
    if(rm.length<6){ask("Oda kodu en az 6 karakter olmalı (örn: fc27-duello-2026).");render();return true}
    const cfg=duelLoadCfg();
    cfg.name=nm;cfg.room=rm;cfg.auto=true;
    duelSaveCfg(cfg);
    st.duelEdit=false;st.duelErr="";st.duelLastAuto=0;
    await duelSyncNow(false);
    return true;
  }
  if(a=="dlsync"){await duelSyncNow(false);return true}
  if(a=="dledit"){st.duelEdit=true;render();return true}
  if(a=="dlcancel"){st.duelEdit=false;render();return true}
  if(a=="dlleave"){
    ask("Bu düello odasından ayrılmak istiyor musun? Odadaki özet kaydın silinir, telefonundaki sezonların etkilenmez.",async()=>{
      const cfg=duelLoadCfg();
      await duelDeleteRemote(cfg);
      cfg.room="";duelSaveCfg(cfg);
      const cache=duelLoadCache();cache.peers={};cache.sel="";cache.lastSync=0;duelSaveCache(cache);
      st.duelEdit=false;st.duelErr="";st.duelLastAuto=0;
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
    const cfg=duelLoadCfg();
    if(obj.uid===cfg.uid){ask("Bu senin kendi kıyas kodun. Arkadaşının gönderdiği kodu yapıştırmalısın.");render();return true}
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
    mkImg("duello",{name:me.name+"-vs-"+opp.name,me,opp,mode:st.dlmod||"all"});
    return true;
  }
  return false;
}

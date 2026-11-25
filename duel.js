/* ==========================================================================
   FC 27 Grup Ligi — Flagship Broadcast Menajer Düellosu (duel.js · v24.3)
   - Obsidian Broadcast Arena, 4 sekmeli Düello Stüdyosu (Genel · Sezonlar · Takımlar · DNA & xG)
   - Sıfır harici SDK: Firebase Realtime Database REST API + çevrimdışı IndexedDB uyumu
   - Canlı Sezon İnceleme (Puan Durumu, Maçlar, Eleme, Sezon DNA) & Yedek Manuel Kıyas Kodu
   ========================================================================== */
const DUEL_DEFAULT_URL="https://fc27ligvs-default-rtdb.europe-west1.firebasedatabase.app";
const DUEL_CFG_K="fc27lig_duel_cfg";
const DUEL_CACHE_K="fc27lig_duel_cache";

const DLI={
  crown:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h18l-1.5-9.5L15 12l-3-6-3 6-4.5-3.5L3 18z" fill="currentColor" stroke="none"/><rect x="4" y="19.5" width="16" height="1.8" rx=".9" fill="currentColor" stroke="none"/></svg>',
  trophy:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5v1.5A3 3 0 0 0 8 10.5M16 6h3v1.5a3 3 0 0 1-3 3M12 13v4M8.5 20h7"/></svg>',
  sync:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14.6-4.5M4 4v4.5h4.5M4 13a8 8 0 0 0 14.6 4.5M20 20v-4.5h-4.5"/></svg>',
  sliders:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="11" cy="17" r="2"/></svg>',
  share:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.8"/><circle cx="6" cy="12" r="2.8"/><circle cx="18" cy="19" r="2.8"/><path d="M8.5 13.4l7 4.2M15.5 6.4l-7 4.2"/></svg>',
  eye:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  ov:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.8"/></svg>',
  se:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>',
  cl:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6L12 3z"/></svg>',
  dn:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 3 21 12 12 21 3 12"/><circle cx="12" cy="12" r="2.5"/></svg>',
  star:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 5.4 6 .8-4.3 4.2 1 6L12 16.5 6.7 19.4l1-6L3.4 9.2l6-.8L12 3z"/></svg>',
  check:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  warn:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l9 16H3L12 4zM12 10v4.5M12 17.5h.01"/></svg>',
  swap:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h11M14 4l4 3-4 3M17 17H6M10 14l-4 3 4 3"/></svg>',
  flame:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c2.5 3.2 5 5.6 5 9.2A5 5 0 0 1 7 12.2c0-2.2 1.2-4 2.5-5.6.2 1.5 1.1 2.4 2.2 2.4-.5-2-.3-4 .3-6z"/></svg>',
  copy:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  trash:'<svg class="dl-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>'
};

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
let _duelSumCache=null,_duelSumKey="",_duelSumRev=0;
function duelInvalidateSummary(){
  _duelSumRev++;
  _duelSumCache=null;
  _duelSumKey="";
}
function duelSaveCfg(c){
  try{localStorage.setItem(DUEL_CFG_K,JSON.stringify(c))}catch(e){}
  duelInvalidateSummary();
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

  const actN=S.filter(x=>x.res||(x.mt&&x.mt.length)||(x.ts&&((x.ts.w||0)+(x.ts.d||0)+(x.ts.l||0)))).length;
  return{
    car:{n:actN,finN:d.finN,ch:d.ch,chRate,fin:d.fin,pod:d.pod,w:d.t.w||0,d:d.t.d||0,l:d.t.l||0,gf,ga,gd,m:totM,wr,ppm,gpm,gapm,csPct,maxW:mtAll.length?maxW:null},
    xp:{n:xpL.length,avgG:xpAvgG,totD:xpTotD,avgD:xpAvgD,up:xpUp},
    star:d.ga?{n:d.ga.n,v:d.ga.v,g:d.g?d.g.v:null,gn:d.g?d.g.n:""}:null
  };
}

// Aktif sezona ait kompakt canlı veri paketi
function buildDuelLiveSeason(cs){
  if(!cs||!cs.cfg)return null;
  const lg=isLg(cs.cfg)?1:0,ucl=isUcl(cs.cfg)?1:0,q=lg?0:(ucl?24:(cs.cfg.q||0)),my=cs.my;
  let gName="",tbl=[],rem=[];
  if(cs.G&&cs.G.length&&(cs.cfg.gs||lg)){
    const gi=lg?0:(my!=null?cs.G.findIndex(g=>g.includes(my)):-1);
    if(gi>=0&&cs.G[gi]){
      gName=typeof gname==="function"?gname(cs,gi):(lg?"Lig Tablosu":"Grup "+GL(gi));
      if(typeof calcGroupTable==="function"){
        const rows=calcGroupTable(cs,gi);
        tbl=rows.map(r=>[T[r.ti]?T[r.ti].n:"?",r.o,r.w,r.d,r.l,r.gf,r.ga,r.pts,r.ti===my?1:0]);
      }
      if(my!=null){
        if(isUcl(cs.cfg)&&typeof uclMySchedule==="function"){
          const pl=new Set((cs.mt||[]).filter(m=>m.rd==="Grup"&&m.opp!=null).map(m=>m.opp));
          uclMySchedule(cs).forEach(x=>{if(!pl.has(x.opp)&&T[x.opp])rem.push([T[x.opp].n,1])});
        }else{
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
  }
  const mt=(cs.mt||[]).slice(-46).map(m=>{
    const st0=m.stats||{};
    const mx=st0.myXg!=null?Math.round(+st0.myXg*100)/100:null;
    const ox=st0.oppXg!=null?Math.round(+st0.oppXg*100)/100:null;
    const rdL=m.rd==="Grup"?(ucl?"Lig Aşaması":lg?"Lig":"Grup"):(m.rd||"Grup");
    return [m.on||(m.opp!=null&&T[m.opp]?T[m.opp].n:"Rakip"),+m.gf||0,+m.ga||0,rdL,m.et?1:0,m.pf!=null?+m.pf:null,m.pa!=null?+m.pa:null,mx,ox];
  });
  let ko=[];
  if(!lg&&cs.sim&&cs.sim.ko&&typeof rds==="function"){
    const RDs=rds(cs.cfg).filter(r=>r!=="Grup");
    RDs.forEach(rd=>{
      const ps=cs.sim.ko[rd];
      if(!Array.isArray(ps)||!ps.length)return;
      const list=ps.map(p=>{
        const n1=p.t1!=null&&T[p.t1]?T[p.t1].n:(p.l1||"Bekleniyor");
        const n2=p.t2!=null&&T[p.t2]?T[p.t2].n:(p.l2||"Bekleniyor");
        const wi=p.w==null?0:(p.w===p.t1?1:(p.w===p.t2?2:0));
        const mine=(my!=null&&(p.t1===my||p.t2===my))?1:0;
        const l1=Array.isArray(p.leg1)&&p.leg1.length>=2?[+p.leg1[0]||0,+p.leg1[1]||0]:null;
        const l2=Array.isArray(p.leg2)&&p.leg2.length>=2?[+p.leg2[0]||0,+p.leg2[1]||0]:null;
        return [n1,n2,p.g1!=null?+p.g1:null,p.g2!=null?+p.g2:null,wi,p.pf!=null?+p.pf:null,p.pa!=null?+p.pa:null,p.et?1:0,mine,l1,l2];
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
  return{fmt:typeof fmt==="function"?fmt(cs.cfg):"",lg,ucl,q,gName,tbl,mt,rem,ko,stars,dna:sDna};
}

// Tüm sezonların kompakt özet listesi (Sezon vs. Sezon ve Alınan Takımlara Göre Kıyaslama için)
function buildDuelSeasonList(){
  const xpMap=nob();
  if(typeof xpData==="function"){
    xpData("all").forEach(o=>{if(o&&o.x&&o.x.id!=null)xpMap[o.x.id]=o.d});
  }
  return store.seasons.slice().reverse().slice(0,100).map(x=>{
    const tm=x.my!=null&&T[x.my]?T[x.my]:null;
    const t=x.ts||{},w=+t.w||0,d=+t.d||0,l=+t.l||0,m=w+d+l,gf=+t.gf||0,ga=+t.ga||0;
    const pts=w*3+d;
    const wr=m?Math.round(w/m*1000)/10:null;
    const ppm=m?Math.round(pts/m*100)/100:null;
    const gpm=m?Math.round(gf/m*100)/100:null;
    const gapm=m?Math.round(ga/m*100)/100:null;
    const xgMs=(x.mt||[]).filter(q=>q&&q.stats&&q.stats.myXg!=null);
    const xgM=xgMs.length?Math.round(xgMs.reduce((a,q)=>a+(+q.stats.myXg||0),0)/xgMs.length*100)/100:null;
    const oxMs=(x.mt||[]).filter(q=>q&&q.stats&&q.stats.oppXg!=null);
    const oXgM=oxMs.length?Math.round(oxMs.reduce((a,q)=>a+(+q.stats.oppXg||0),0)/oxMs.length*100)/100:null;
    const xgDiff=xgMs.length?Math.round(xgMs.reduce((a,q)=>a+((+q.gf||0)-(+q.stats.myXg||0)),0)*100)/100:null;
    const topGA=(x.pl||[]).filter(p=>p&&!isKK(p.n)&&((p.g||0)+(p.a||0))>0)
      .sort((a,b)=>((b.g||0)+(b.a||0))-((a.g||0)+(a.a||0))||(b.g||0)-(a.g||0))[0]||null;
    const mvp=(x.res&&x.res.mvp&&x.res.mvp.n)?x.res.mvp.n:(topGA?`${topGA.n} (${(topGA.g||0)+(topGA.a||0)} G+A)`:"");
    return{
      id:String(x.id),
      n:x.name||"Sezon",
      lg:isLg(x.cfg)?1:0,
      tm:tm?tm.n:"",
      g:tm?tm.g:0,
      fin:x.res?1:0,
      st:x.res?x.res.st:-1,
      res:x.res?duelShortRes(rlb(x.res,x.cfg,x.grk),x.res.st):"Devam ediyor",
      xpD:xpMap[x.id]!=null?xpMap[x.id]:null,
      w,d,l,gf,ga,m,wr,ppm,gpm,gapm,xgM,oXgM,xgDiff,mvp
    };
  });
}

function duelFilterSeasons(p,mode){
  const list=Array.isArray(p&&p.seasons)?p.seasons:[];
  if(!mode||mode=="all")return list;
  return list.filter(s=>mode=="lg"?!!s.lg:!s.lg);
}

// Alınan takımlara göre GEN kademeleri, ortak kulüpler ve kulüp bazlı toplu istatistikler
function duelClubAnalytics(me,opp,mode){
  const s1=(Array.isArray(me&&me.seasons)?me.seasons:[]).filter(s=>!mode||mode=="all"||(mode=="lg"?!!s.lg:!s.lg));
  const s2=(Array.isArray(opp&&opp.seasons)?opp.seasons:[]).filter(s=>!mode||mode=="all"||(mode=="lg"?!!s.lg:!s.lg));
  const has1=Array.isArray(me&&me.seasons);
  const has2=Array.isArray(opp&&opp.seasons);

  const agg=arr=>{
    let n=arr.length,finN=0,ch=0,fin=0,pod=0,m=0,w=0,d=0,l=0,gf=0,ga=0,bestSt=-1,bestRes="";
    arr.forEach(s=>{
      if(s.fin){
        finN++;
        if(s.st==7)ch++;
        if(s.st>=6)fin++;
        if(s.st>=5)pod++;
        if(s.st>bestSt){bestSt=s.st;bestRes=s.res||""}
      }else if(bestSt<0){bestRes=s.res||"Devam ediyor"}
      m+=(+s.m||0);w+=(+s.w||0);d+=(+s.d||0);l+=(+s.l||0);gf+=(+s.gf||0);ga+=(+s.ga||0);
    });
    const pts=w*3+d;
    return{
      n,finN,ch,fin,pod,m,w,d,l,gf,ga,gd:gf-ga,
      gdpm:m?Math.round((gf-ga)/m*100)/100:null,
      wr:m?Math.round(w/m*1000)/10:null,
      ppm:m?Math.round(pts/m*100)/100:null,
      gpm:m?Math.round(gf/m*100)/100:null,
      gapm:m?Math.round(ga/m*100)/100:null,
      bestSt,bestRes
    };
  };

  const tierDefs=[
    {k:"elit",title:"Elit Devler",sub:"83+ GEN",tone:"gold",fn:s=>s.g>=83},
    {k:"strong",title:"Güçlü Kadrolar",sub:"79–82 GEN",tone:"emr",fn:s=>s.g>=79&&s.g<=82},
    {k:"mid",title:"Orta & Sürpriz",sub:"78 ve altı",tone:"sky",fn:s=>s.g>0&&s.g<=78}
  ];
  const tiers=tierDefs.map(td=>({
    k:td.k,title:td.title,sub:td.sub,tone:td.tone,
    a:agg(s1.filter(td.fn)),
    b:agg(s2.filter(td.fn))
  })).filter(t=>t.a.n>0||t.b.n>0);

  const grpByClub=arr=>{
    const map=nob();
    arr.forEach(s=>{
      if(!s.tm)return;
      if(!map[s.tm])map[s.tm]={tm:s.tm,g:s.g||0,list:[]};
      if((s.g||0)>map[s.tm].g)map[s.tm].g=s.g;
      map[s.tm].list.push(s);
    });
    return Object.values(map).map(o=>Object.assign({tm:o.tm,g:o.g},agg(o.list)))
      .sort((a,b)=>(b.ch-a.ch)||((b.ppm||0)-(a.ppm||0))||(b.m-a.m));
  };

  const clubs1=grpByClub(s1),clubs2=grpByClub(s2);
  const shared=[];
  clubs1.forEach(c1=>{
    const c2=clubs2.find(x=>x.tm===c1.tm);
    if(c2)shared.push({tm:c1.tm,g:Math.max(c1.g,c2.g),a:c1,b:c2});
  });

  return{has1,has2,tiers,shared,clubs1,clubs2};
}

// Mevcut cihazdaki tüm sezonlardan kompakt Menajer Düellosu + Sezon Arşivi + Canlı Sezon özeti üretir (v:4 · önbellekli)
function buildDuelSummary(force){
  const cfg=duelLoadCfg();
  const csRef=cur();
  const key=`${_duelSumRev}|${cfg.uid}|${cfg.name||""}|${store.owner||""}|${store.cur}|${store.seasons.length}|${csRef?(csRef.ut||0):0}|${csRef&&csRef.mt?csRef.mt.length:0}|${typeof lastSavedRaw==="string"?lastSavedRaw.length:0}`;
  if(!force&&_duelSumCache&&_duelSumKey===key)return _duelSumCache;
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
      stage:cs.res?duelShortRes(rlb(cs.res,cs.cfg,cs.grk),cs.res.st):(typeof autoStage==="function"?autoStage(cs):"Devam ediyor"),
      w:g.w||0,d:g.d||0,l:g.l||0,gf:g.gf||0,ga:g.ga||0,
      form:last5
    };
  }

  const nm=(cfg.name||store.owner||"Menajer").replace(/\s+/g," ").trim().slice(0,32)||"Menajer";
  const res={
    v:4,
    uid:cfg.uid,
    name:nm,
    ut:Date.now(),
    ver:VER,
    car:allS.car,
    xp:allS.xp,
    star:allS.star,
    modes:{cup:{car:cupS.car,xp:cupS.xp},lg:{car:lgS.car,xp:lgS.xp}},
    seasons:buildDuelSeasonList(),
    dna,
    cur:active,
    live:buildDuelLiveSeason(cs)
  };
  _duelSumCache=res;
  _duelSumKey=key;
  return res;
}

// Eski (v1) veya yeni özetlerden seçili moda göre güvenli veri okuma
function duelPickMode(p,mode){
  if(!p)return{car:{n:0,finN:0,ch:0,fin:0,pod:0,m:0},xp:{n:0},compat:true};
  const actFromSeasons=Array.isArray(p.seasons)?p.seasons.filter(s=>(!mode||mode=="all"||(mode=="lg"?!!s.lg:!s.lg))&&(s.fin||s.m>0)).length:0;
  if(mode=="cup"||mode=="lg"){
    if(p.modes&&p.modes[mode]){
      const mc=p.modes[mode].car||{};
      const fixedCar=actFromSeasons>(mc.n||0)?Object.assign({},mc,{n:actFromSeasons}):mc;
      return{car:fixedCar,xp:p.modes[mode].xp,compat:true};
    }
    return{car:{n:0,finN:0,ch:0,fin:0,pod:0,m:0},xp:{n:0},compat:false};
  }
  const c=p.car||{},m=c.m||0;
  const normCar=Object.assign({},c,{
    n:Math.max(c.n||0,actFromSeasons),
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
const DUEL_FETCH_MS=8000;
async function duelFetch(url,opts,ms){
  const limit=ms||DUEL_FETCH_MS;
  if(typeof AbortController==="undefined")return fetch(url,opts);
  const ctrl=new AbortController();
  const tid=setTimeout(()=>ctrl.abort(),limit);
  try{
    return await fetch(url,Object.assign({},opts,{signal:ctrl.signal}));
  }catch(e){
    if(e&&e.name==="AbortError")throw new Error("zaman aşımı ("+Math.round(limit/1000)+" sn)");
    throw e;
  }finally{
    clearTimeout(tid);
  }
}
async function duelPush(silent){
  const cfg=duelLoadCfg();
  if(!cfg.room||cfg.room.length<6)return false;
  if(typeof navigator!=="undefined"&&navigator.onLine===false){
    st.duelPendingPush=true;
    if(!silent)st.duelPushErr="Çevrimdışısın — bağlantı gelince otomatik gönderilecek.";
    return false;
  }
  try{
    const payload=buildDuelSummary(true);
    if(!payload.name)payload.name="Menajer";
    if(!payload.ut)payload.ut=Date.now();
    const url=`${duelBaseUrl(cfg)}/rooms/${encodeURIComponent(cfg.room)}/${encodeURIComponent(cfg.uid)}.json`;
    const r=await duelFetch(url,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(payload)
    });
    if(!r.ok){
      let detail="";
      try{detail=String(await r.text()).slice(0,120)}catch(_){}
      throw new Error("HTTP "+r.status+(detail?" · "+detail:""));
    }
    const cache=duelLoadCache();
    cache.peers[cfg.uid]=payload;
    cache.lastSync=Date.now();
    cache.lastPush=Date.now();
    duelSaveCache(cache);
    st.duelPushErr="";st.duelPendingPush=false;
    return true;
  }catch(e){
    const msg="Verin sunucuya gönderilemedi ("+(e&&e.message?e.message:"ağ hatası")+").";
    st.duelPushErr=msg;
    if(!silent)st.duelErr=msg;
    st.duelPendingPush=true;
    elog("duelPush",e&&e.message?e.message:String(e));
    return false;
  }
}

async function duelPull(silent){
  const cfg=duelLoadCfg();
  if(!cfg.room||cfg.room.length<6)return false;
  if(typeof navigator!=="undefined"&&navigator.onLine===false){
    if(!silent)st.duelPullErr="Çevrimdışısın — son kaydedilen veriler gösteriliyor.";
    return false;
  }
  const url=`${duelBaseUrl(cfg)}/rooms/${encodeURIComponent(cfg.room)}.json?t=${Date.now()}`;
  try{
    const r=await duelFetch(url,{cache:"no-store"});
    if(!r.ok){
      let detail="";
      try{detail=String(await r.text()).slice(0,120)}catch(_){}
      throw new Error("HTTP "+r.status+(detail?" · "+detail:""));
    }
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
    st.duelPullErr="";
    return true;
  }catch(e){
    const msg="Odadan veri çekilemedi ("+(e&&e.message?e.message:"ağ hatası")+").";
    st.duelPullErr=msg;
    if(!silent)st.duelErr=msg;
    elog("duelPull",e&&e.message?e.message:String(e));
    return false;
  }
}

async function duelDeleteRemote(cfg){
  if(!cfg||!cfg.room||cfg.room.length<6||!cfg.uid)return false;
  if(typeof navigator!=="undefined"&&navigator.onLine===false)return false;
  const url=`${duelBaseUrl(cfg)}/rooms/${encodeURIComponent(cfg.room)}/${encodeURIComponent(cfg.uid)}.json`;
  try{
    const r=await duelFetch(url,{method:"DELETE"});
    return r.ok;
  }catch(e){return false}
}

async function duelSyncNow(silent){
  if(st.duelBusy)return;
  const cfg=duelLoadCfg();
  if(!cfg.room||cfg.room.length<6)return;
  if(silent&&Date.now()-(st.duelLastAuto||0)<10000)return;
  st.duelBusy=true;
  st.duelLastAuto=Date.now();
  if(!silent){st.duelErr="";render()}
  const ok1=await duelPush(silent);
  const ok2=await duelPull(silent);
  st.duelBusy=false;
  if(!ok1&&st.duelPushErr)st.duelErr=st.duelPushErr;
  else if(!ok2&&st.duelPullErr)st.duelErr=st.duelPullErr;
  else if(ok1&&ok2)st.duelErr="";
  if(!silent){
    if(ok1&&ok2)ntf("Düello odası eşitlendi");
    else if(!ok1&&ok2)ntf("Dikkat: Verin sunucuya gönderilemedi");
    else if(ok1&&!ok2)ntf("Verin gönderildi ama oda çekilemedi");
  }
  render();
}

function duelSchedulePush(){
  const cfg=duelLoadCfg();
  if(!cfg.room||cfg.room.length<6||cfg.auto===false)return;
  if(duelPushTimer)clearTimeout(duelPushTimer);
  duelPushTimer=setTimeout(()=>{duelPush(true)},2000);
}

// Obsidian Broadcast Çift Renkli Taktiksel DNA Radarı
function duelRadarSvg(me,opp){
  const W=344,H=240,cx=172,cy=120,R=72;
  const ax=[[0,-1,"HÜCUM","atk"],[1,0,"KONTROL","ctrl"],[0,1,"DİRENÇ","aggr"],[-1,0,"BİTİRİCİLİK","eff"]];
  const rings=[0.25,0.5,0.75,1].map(k=>{
    const r=R*k;
    return `<polygon points="${cx},${cy-r} ${cx+r},${cy} ${cx},${cy+r} ${cx-r},${cy}" fill="${k==1?"rgba(255,255,255,.02)":"none"}" stroke="rgba(255,255,255,${k==1?.16:.08})" stroke-width="${k==1?1.3:1}" stroke-dasharray="${k<1?"2 3":"0"}"/>`;
  }).join("");
  const axes=`<line x1="${cx}" y1="${cy-R}" x2="${cx}" y2="${cy+R}" stroke="rgba(255,255,255,.10)" stroke-width="1"/><line x1="${cx-R}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="rgba(255,255,255,.10)" stroke-width="1"/><circle cx="${cx}" cy="${cy}" r="2.2" fill="rgba(255,255,255,.28)"/>`;
  const polyOf=d=>ax.map(([dx,dy,,k])=>{const r=R*((d&&d[k]||0)/100);return `${(cx+dx*r).toFixed(1)},${(cy+dy*r).toFixed(1)}`}).join(" ");
  const dotsOf=(d,col)=>ax.map(([dx,dy,,k])=>{const r=R*((d&&d[k]||0)/100);return `<circle cx="${(cx+dx*r).toFixed(1)}" cy="${(cy+dy*r).toFixed(1)}" r="4.2" fill="${col}" stroke="#0b1118" stroke-width="1.8"/>`}).join("");
  const pOp=opp?`<polygon points="${polyOf(opp)}" fill="rgba(240,194,75,.20)" stroke="#f0c24b" stroke-width="2.4" stroke-linejoin="round"/>${dotsOf(opp,"#f0c24b")}`:"";
  const pMe=me?`<polygon points="${polyOf(me)}" fill="rgba(46,229,157,.22)" stroke="#2ee59d" stroke-width="2.4" stroke-linejoin="round"/>${dotsOf(me,"#2ee59d")}`:"";
  const labels=`
    <text x="${cx}" y="${cy-R-14}" text-anchor="middle" font-size="10" font-weight="800" letter-spacing="1" fill="rgba(226,232,240,.86)">HÜCUM</text>
    <text x="${cx+R+10}" y="${cy+3.5}" text-anchor="start" font-size="10" font-weight="800" letter-spacing="1" fill="rgba(226,232,240,.86)">KONTROL</text>
    <text x="${cx}" y="${cy+R+22}" text-anchor="middle" font-size="10" font-weight="800" letter-spacing="1" fill="rgba(226,232,240,.86)">DİRENÇ</text>
    <text x="${cx-R-10}" y="${cy+3.5}" text-anchor="end" font-size="10" font-weight="800" letter-spacing="1" fill="rgba(226,232,240,.86)">BİTİRİCİLİK</text>`;
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

// Flagship Telemetri Kıyaslama Satırı (neutral=true: bağlam bilgisi, kazanan puanı/vurgusu yok)
function duelCompareRow(label,v1,v2,fmt1,fmt2,lowerBetter,neutral){
  const b=duelBarCalc(v1,v2,lowerBetter);
  const w1=!neutral&&b.w1,w2=!neutral&&b.w2;
  return `<div class="dl-trow${neutral?" neu":(w1?" w1":w2?" w2":"")}">`+
    `<div class="dl-ttop">`+
      `<span class="dl-tv me${w1?" win":""}">${w1?`<i class="dl-wdot me"></i>`:""}<b>${fmt1}</b></span>`+
      `<span class="dl-tlbl">${label}</span>`+
      `<span class="dl-tv op${w2?" win":""}"><b>${fmt2}</b>${w2?`<i class="dl-wdot op"></i>`:""}</span>`+
    `</div>`+
    `<div class="dl-ttrack"><div class="dl-tbL"><i style="width:${b.p1}%"></i></div><span class="dl-tmid"></span><div class="dl-tbR"><i style="width:${b.p2}%"></i></div></div>`+
  `</div>`;
}

// Bespoke Flagship Panel Sarmalayıcı
function duelPanel(icoKey,tone,title,sub,pill,body){
  return `<section class="dl-panel ${tone||"emr"}">`+
    `<header class="dl-ph">`+
      `<span class="dl-pico ${tone||"emr"}">${DLI[icoKey]||DLI.trophy}</span>`+
      `<div class="dl-pt"><b>${title}</b>${sub?`<small>${sub}</small>`:""}</div>`+
      (pill?`<span class="dl-ppill ${tone||"emr"}">${pill}</span>`:"")+
    `</header>`+
    `<div class="dl-pb">${body}</div>`+
  `</section>`;
}

// Kısa, tarafsız ve kesilmeyen derece etiketi (eski 2. tekil şahıs metinleri de temizler)
function duelShortRes(raw,stCode){
  const t=String(raw||"").split(" · ")[0].trim();
  if(!t)return stCode===7?"Şampiyon":"Devam ediyor";
  const gm=t.match(/Grupta\s+(\d+)\./i);
  if(gm)return `Grup ${gm[1]}. Sıra`;
  if(/Lig Şampiyonu/i.test(t))return "Lig Şampiyonu";
  if(/Şampiyon/i.test(t))return "Şampiyon";
  if(/Finalde/i.test(t))return "Finalist";
  if(/Yarı final/i.test(t))return "Yarı Final";
  if(/Çeyrek final/i.test(t))return "Çeyrek Final";
  if(/Son 16/i.test(t))return "Son 16";
  if(/Play-Off/i.test(t))return "Play-Off";
  if(/Lig aşama/i.test(t))return "Lig Aşaması";
  if(/Son 32/i.test(t))return "Son 32";
  if(/Son 64/i.test(t))return "Son 64";
  if(/Grup aşama/i.test(t))return "Grup Aşaması";
  if(/Ligi 2\./i.test(t))return "Lig 2.si";
  if(/Ligi 3\./i.test(t))return "Lig 3.sü";
  if(/orta sıra/i.test(t))return "Orta Sıralar";
  if(/alt sıra/i.test(t))return "Alt Sıralar";
  return t;
}

// TEK KAYNAK: Kariyer & Kupa 10 Kriteri + Nötr GEN Bağlam Satırı (Hero, Ekran ve 1v1 Poster birebir aynı)
function duelCareerCriteria(me,opp,mode){
  const m1=duelPickMode(me,mode||"all"),m2=duelPickMode(opp,mode||"all");
  const c1=m1.car,c2=m2.car;
  const pctF=v=>v==null?"—":"%"+Math.round(v);
  const fxF=v=>v==null?"—":fx(v);
  const dFmt=v=>v==null?"—":(v>0?"+":"")+fx(v);
  const rows=[
    {grp:"cup",lbl:"Şampiyonluk",v1:c1.n?c1.ch:null,v2:c2.n?c2.ch:null,f1:c1.n?String(c1.ch):"—",f2:c2.n?String(c2.ch):"—",low:false,neu:false},
    {grp:"cup",lbl:"Kupa Oranı",v1:c1.chRate,v2:c2.chRate,f1:pctF(c1.chRate),f2:pctF(c2.chRate),low:false,neu:false},
    {grp:"cup",lbl:mode=="lg"?"İlk 2":"Final / İlk 2",v1:c1.n?c1.fin:null,v2:c2.n?c2.fin:null,f1:c1.n?String(c1.fin):"—",f2:c2.n?String(c2.fin):"—",low:false,neu:false},
    {grp:"perf",lbl:"Galibiyet Oranı",v1:c1.wr,v2:c2.wr,f1:pctF(c1.wr),f2:pctF(c2.wr),low:false,neu:false},
    {grp:"perf",lbl:"Maç Başı Puan",v1:c1.ppm,v2:c2.ppm,f1:fxF(c1.ppm),f2:fxF(c2.ppm),low:false,neu:false},
    {grp:"perf",lbl:"Atılan Gol / Maç",v1:c1.gpm,v2:c2.gpm,f1:fxF(c1.gpm),f2:fxF(c2.gpm),low:false,neu:false},
    {grp:"perf",lbl:"Yenilen Gol / Maç",v1:c1.gapm,v2:c2.gapm,f1:fxF(c1.gapm),f2:fxF(c2.gapm),low:true,neu:false},
    {grp:"perf",lbl:"Temiz Kasa (CS %)",v1:c1.csPct,v2:c2.csPct,f1:pctF(c1.csPct),f2:pctF(c2.csPct),low:false,neu:false},
    {grp:"perf",lbl:"En Uzun Galibiyet Serisi",v1:c1.maxW,v2:c2.maxW,f1:c1.maxW!=null?c1.maxW+" maç":"—",f2:c2.maxW!=null?c2.maxW+" maç":"—",low:false,neu:false},
    {grp:"perf",lbl:"Beklenti Üstü (Ort.)",v1:m1.xp.avgD,v2:m2.xp.avgD,f1:dFmt(m1.xp.avgD),f2:dFmt(m2.xp.avgD),low:false,neu:false},
    {grp:"perf",lbl:"Ort. Takım GEN",v1:m1.xp.avgG,v2:m2.xp.avgG,f1:fxF(m1.xp.avgG),f2:fxF(m2.xp.avgG),low:false,neu:true}
  ];
  let s1=0,s2=0;
  rows.forEach(r=>{
    if(r.neu)return;
    const b=duelBarCalc(r.v1,r.v2,r.low);
    if(b.w1)s1++;else if(b.w2)s2++;
  });
  return{rows,s1,s2,m1,m2,c1,c2};
}

// TEK KAYNAK: Sezon vs. Sezon Kriterleri (Maç Başı Averaj + Nötr GEN; Ekran ve Sezon Posteri birebir aynı)
function duelSeasonCriteria(s1,s2){
  const pctF=v=>v==null?"—":"%"+Math.round(v);
  const fxF=v=>v==null?"—":fx(v);
  const sgnF=v=>v==null?"—":(v>0?"+"+fx(v):v<0?"−"+fx(Math.abs(v)):fx(0));
  const gdpm1=s1.m?Math.round((s1.gf-s1.ga)/s1.m*100)/100:null;
  const gdpm2=s2.m?Math.round((s2.gf-s2.ga)/s2.m*100)/100:null;
  const rows=[
    {grp:"main",lbl:"Takım Gücü (GEN)",v1:s1.g||null,v2:s2.g||null,f1:s1.g?s1.g+" GEN":"—",f2:s2.g?s2.g+" GEN":"—",low:false,neu:true}
  ];
  if(s1.xpD!=null||s2.xpD!=null){
    rows.push({grp:"main",lbl:"Beklenti Üstü",v1:s1.xpD,v2:s2.xpD,f1:sgnF(s1.xpD),f2:sgnF(s2.xpD),low:false,neu:false});
  }
  rows.push(
    {grp:"main",lbl:"Galibiyet Oranı",v1:s1.wr,v2:s2.wr,f1:pctF(s1.wr),f2:pctF(s2.wr),low:false,neu:false},
    {grp:"main",lbl:"Maç Başı Puan",v1:s1.ppm,v2:s2.ppm,f1:fxF(s1.ppm),f2:fxF(s2.ppm),low:false,neu:false},
    {grp:"main",lbl:"Atılan Gol / Maç",v1:s1.gpm,v2:s2.gpm,f1:fxF(s1.gpm),f2:fxF(s2.gpm),low:false,neu:false},
    {grp:"main",lbl:"Yenilen Gol / Maç",v1:s1.gapm,v2:s2.gapm,f1:fxF(s1.gapm),f2:fxF(s2.gapm),low:true,neu:false},
    {grp:"main",lbl:"Maç Başı Averaj",v1:gdpm1,v2:gdpm2,f1:sgnF(gdpm1),f2:sgnF(gdpm2),low:false,neu:false}
  );
  if(s1.xgM!=null||s2.xgM!=null)rows.push({grp:"xg",lbl:"Üretilen xG / Maç",v1:s1.xgM,v2:s2.xgM,f1:s1.xgM!=null?xgN2(s1.xgM):"—",f2:s2.xgM!=null?xgN2(s2.xgM):"—",low:false,neu:false});
  if(s1.oXgM!=null||s2.oXgM!=null)rows.push({grp:"xg",lbl:"Rakip xG / Maç",v1:s1.oXgM,v2:s2.oXgM,f1:s1.oXgM!=null?xgN2(s1.oXgM):"—",f2:s2.oXgM!=null?xgN2(s2.oXgM):"—",low:true,neu:false});
  if(s1.xgDiff!=null||s2.xgDiff!=null)rows.push({grp:"xg",lbl:"Bitiricilik (Gol − xG)",v1:s1.xgDiff,v2:s2.xgDiff,f1:s1.xgDiff!=null?xgS2(s1.xgDiff):"—",f2:s2.xgDiff!=null?xgS2(s2.xgDiff):"—",low:false,neu:false});

  let sc1=0,sc2=0;
  rows.forEach(r=>{
    if(r.neu)return;
    const b=duelBarCalc(r.v1,r.v2,r.low);
    if(b.w1)sc1++;else if(b.w2)sc2++;
  });
  return{rows,sc1,sc2};
}

function duelDnaScore(md,od){
  if(!md||!od)return null;
  let d1=0,d2=0;
  ["atk","ctrl","aggr","eff"].forEach(k=>{
    const a=+md[k]||0,b=+od[k]||0;
    if(a>b)d1++;else if(b>a)d2++;
  });
  return{d1,d2,t1:(+md.atk||0)+(+md.ctrl||0)+(+md.aggr||0)+(+md.eff||0),t2:(+od.atk||0)+(+od.ctrl||0)+(+od.aggr||0)+(+od.eff||0)};
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

// =========================================================================
// STÜDYO SEKME 2: SEZON vs. SEZON STÜDYOSU
// =========================================================================
function duelSeasonStudio(me,opp,mode){
  const modeLbl=mode=="cup"?"Kupa":mode=="lg"?"Lig":"Tüm Sezonlar";
  if(!Array.isArray(opp&&opp.seasons)){
    return duelPanel("se","sky","Sezon vs. Sezon Stüdyosu","Sezon arşivleri bekleniyor",null,
      `<div class="note" style="margin:0"><b>${esc(opp.name)}</b> henüz güncel sürüme geçip eşitleme yapmadığı için sezon listesi paylaşılmadı. Güncelleyip <b>Eşitle</b> dediğinde tüm sezonları burada açılacak.</div>`
    );
  }
  const l1=duelFilterSeasons(me,mode),l2=duelFilterSeasons(opp,mode);
  if(!l1.length||!l2.length){
    const who=!l1.length&&!l2.length?"İki tarafta da":(!l1.length?"Senin arşivinde":`<b>${esc(opp.name)}</b> arşivinde`);
    return duelPanel("se","sky","Sezon vs. Sezon Stüdyosu",`${modeLbl} kategorisinde eşleşme yok`,modeLbl,
      `<div class="note" style="margin:0">${who} henüz <b>${esc(modeLbl)}</b> kategorisinde sezon bulunmuyor. Üstten başka bir turnuva filtresi seçebilirsin.</div>`
    );
  }
  const s1=l1.find(x=>x.id===st.dlS1)||l1[0];
  const s2=l2.find(x=>x.id===st.dlS2)||l2[0];
  if(!s1||!s2)return "";

  const optHtml=(arr,curId)=>arr.map(x=>`<option value="${esc(x.id)}" ${x.id===curId?"selected":""}>${esc(x.n)}${x.tm?" · "+esc(x.tm):""}${x.g?" ("+x.g+")":""}</option>`).join("");
  const selBar=`<div class="dl-seldock">`+
    `<div class="dl-selcol me"><label for="dl_s1">${esc(me.name)}</label><select id="dl_s1" class="sel">${optHtml(l1,s1.id)}</select></div>`+
    `<button class="dl-swbtn" data-a="dlslatest" aria-label="Son sezonlara dön" title="Son sezonlara dön">${DLI.sync}</button>`+
    `<div class="dl-selcol op"><label for="dl_s2">${esc(opp.name)}</label><select id="dl_s2" class="sel">${optHtml(l2,s2.id)}</select></div>`+
  `</div>`;

  const sc=duelSeasonCriteria(s1,s2),sc1=sc.sc1,sc2=sc.sc2;

  const sideStage=(mgr,s,cls)=>{
    const ti=s.tm&&IX[s.tm]!=null?IX[s.tm]:null;
    const rCls=s.st==7?"gold":(s.fin&&s.st>=5?"emr":"");
    return `<div class="dl-mside ${cls}">`+
      `<div class="dl-mcrest ${cls}${ti!=null?" has-b":""}">${ti!=null?badge(ti,38):`<span class="dl-av sm">${esc((s.tm||mgr).slice(0,1).toLocaleUpperCase("tr"))}</span>`}</div>`+
      `<small class="dl-msnm">${esc(mgr)} · ${esc(s.n)}</small>`+
      `<b class="dl-mtm">${esc(s.tm||"Takım seçilmedi")}${s.g?` <em>${s.g}</em>`:""}</b>`+
      `<span class="dl-msres ${rCls}">${s.st==7?`<i class="dl-mini-ic">${DLI.trophy}</i>`:""}${esc(duelShortRes(s.res,s.st))}</span>`+
      `<span class="dl-mgbm">${s.w}G ${s.d}B ${s.l}M · ${s.gf}:${s.ga}</span>`+
    `</div>`;
  };

  const miniStage=`<div class="dl-ministage">`+
    sideStage(me.name,s1,"me")+
    `<div class="dl-mmid"><span class="dl-vsp">VS</span><div class="dl-msscore"><b class="me${sc1>sc2?" dlhi":""}">${sc1}</b><span>–</span><b class="op${sc2>sc1?" dlhi":""}">${sc2}</b></div></div>`+
    sideStage(opp.name,s2,"op")+
  `</div>`;

  const rows=sc.rows.filter(r=>r.grp==="main").map(r=>duelCompareRow(r.lbl,r.v1,r.v2,r.f1,r.f2,r.low,r.neu)).join("");
  const xgList=sc.rows.filter(r=>r.grp==="xg");
  const xgBlock=xgList.length?`<div class="dl-grp">Gelişmiş xG Metrikleri</div>`+xgList.map(r=>duelCompareRow(r.lbl,r.v1,r.v2,r.f1,r.f2,r.low,r.neu)).join(""):"";

  const mvpCard=(s,cls)=>{
    const raw=String(s.mvp||"").trim();
    const m=raw.match(/^(.+?)\s*\(([^)]+)\)$/);
    const nm=m?m[1]:(raw||"—"),stTxt=m?m[2]:"";
    return `<div class="dl-starcard ${cls}"><span class="dl-stic ${cls}">${DLI.star}</span><div class="dl-sttxt"><small>${esc(s.n)} Yıldızı</small><b>${esc(nm)}</b>${stTxt?`<em>${esc(stTxt)}</em>`:""}</div></div>`;
  };
  const mvpHtml=(s1.mvp||s2.mvp)?`<div class="dl-stargrid" style="margin-top:12px">${mvpCard(s1,"me")}${mvpCard(s2,"op")}</div>`:"";

  const pBtn=`<button class="dl-livego sec" data-a="dlsposter" style="margin-top:12px">${DLI.share}<span>Sezon vs. Sezon Posterini Paylaş (PNG)</span></button>`;
  return duelPanel("se","sky","Sezon vs. Sezon Stüdyosu","Seçtiğin iki sezonu tüm verileriyle çarpıştır",`${sc1}–${sc2}`,
    selBar+miniStage+`<div class="dl-tlist">${rows}${xgBlock}</div>`+mvpHtml+pBtn
  );
}

// =========================================================================
// STÜDYO SEKME 3: TAKIMLAR & KADEME STÜDYOSU
// =========================================================================
function duelClubStudio(me,opp,mode){
  const m1=duelPickMode(me,mode),m2=duelPickMode(opp,mode);
  const ca=duelClubAnalytics(me,opp,mode);
  const modeLbl=mode=="cup"?"Kupa":mode=="lg"?"Lig":"Tüm Sezonlar";
  const fxF=v=>v==null?"—":fx(v),pctF=v=>v==null?"—":"%"+Math.round(v),dFmt=v=>v==null?"—":(v>0?"+":"")+fx(v),sgnI=v=>v>0?"+"+v:v<0?"−"+Math.abs(v):"0";

  // 1. Adil Güç Endeksi
  let fairHtml="";
  if(m1.xp.n||m2.xp.n){
    fairHtml=duelPanel("trophy","gold","Adil Güç Endeksi","Ortalama takım gücü (GEN) ve beklenti üstü performans",modeLbl,
      `<div class="dl-tlist">`+
        duelCompareRow("Ortalama Takım GEN",m1.xp.avgG,m2.xp.avgG,fxF(m1.xp.avgG),fxF(m2.xp.avgG),false,true)+
        duelCompareRow("Beklenti Üstü (Sezon/Tur)",m1.xp.avgD,m2.xp.avgD,dFmt(m1.xp.avgD),dFmt(m2.xp.avgD),false)+
      `</div>`+
      `<div class="dl-hint">Daha düşük GEN ortalamasıyla beklentinin üzerine çıkan menajer adil güç kıyaslamasında öne geçer.</div>`
    );
  }

  if(!ca.has2){
    return fairHtml+duelPanel("cl","gold","Alınan Takımlara Göre Kıyas","Kulüp arşivi bekleniyor",null,
      `<div class="note" style="margin:0"><b>${esc(opp.name)}</b> henüz güncel sürüme geçip eşitleme yapmadığı için yönettiği kulüpler listelenemedi. Güncelleyip <b>Eşitle</b> dediğinde aktif olacak.</div>`
    );
  }

  // 2. GEN Kademelerine Göre Dossier
  let tierPanel="";
  if(ca.tiers.length){
    const cards=ca.tiers.map(t=>{
      const b=duelBarCalc(t.a.ppm,t.b.ppm,false);
      const cell=(mgr,o,cls,win)=>o.n
        ? `<div class="dl-tcell ${cls}${win?" win":""}"><div class="dl-tcname">${esc(mgr)}</div><div class="dl-tcmain"><b>${o.m?fx(o.ppm):"—"}</b>${o.m?`<em>P/M</em>`:""}</div><div class="dl-tcsub">${o.n}S · ${o.ch} kupa · ${o.m?`%${Math.round(o.wr)}G`:"0 maç"}</div></div>`
        : `<div class="dl-tcell ${cls} empty"><div class="dl-tcname">${esc(mgr)}</div><div class="dl-tcmain"><b>—</b></div><div class="dl-tcsub">Bu kademede sezon yok</div></div>`;
      return `<div class="dl-tiercard">`+
        `<div class="dl-tierhd"><b>${esc(t.title)}</b><span class="dl-tierpill ${t.tone}">${esc(t.sub)}</span></div>`+
        `<div class="dl-tiervs">${cell(me.name,t.a,"me",b.w1)}${cell(opp.name,t.b,"op",b.w2)}</div>`+
        `<div class="dl-ttrack" style="margin-top:8px"><div class="dl-tbL"><i style="width:${b.p1}%"></i></div><span class="dl-tmid"></span><div class="dl-tbR"><i style="width:${b.p2}%"></i></div></div>`+
      `</div>`;
    }).join("");
    tierPanel=duelPanel("cl","emr","GEN Kademelerine Göre Performans","Elit, güçlü ve sürpriz kadrolarla verimlilik",modeLbl,`<div class="dl-tierlist">${cards}</div>`);
  }

  // 3. Ortak Alınan Kulüpler
  let sharedPanel="";
  if(ca.shared.length){
    const rows=ca.shared.map(sh=>{
      const ti=IX[sh.tm]!=null?IX[sh.tm]:null;
      const b=duelBarCalc(sh.a.ppm,sh.b.ppm,false);
      return `<div class="dl-shcard">`+
        `<div class="dl-shhd">${ti!=null?badge(ti,26):""}<b>${esc(sh.tm)}</b>${sh.g?`<span class="dl-gen">${sh.g} GEN</span>`:""}</div>`+
        `<div class="dl-tiervs">`+
          `<div class="dl-tcell me${b.w1?" win":""}"><div class="dl-tcname">${esc(me.name)}</div><div class="dl-tcmain"><b>${sh.a.m?fx(sh.a.ppm):"—"}</b>${sh.a.m?`<em>P/M</em>`:""}</div><div class="dl-tcsub">${sh.a.n}S · ${sh.a.ch} kupa · ${sh.a.m?`%${Math.round(sh.a.wr)}G · Av ${sgnI(sh.a.gd)}`:"0 maç"}</div></div>`+
          `<div class="dl-tcell op${b.w2?" win":""}"><div class="dl-tcname">${esc(opp.name)}</div><div class="dl-tcmain"><b>${sh.b.m?fx(sh.b.ppm):"—"}</b>${sh.b.m?`<em>P/M</em>`:""}</div><div class="dl-tcsub">${sh.b.n}S · ${sh.b.ch} kupa · ${sh.b.m?`%${Math.round(sh.b.wr)}G · Av ${sgnI(sh.b.gd)}`:"0 maç"}</div></div>`+
        `</div>`+
      `</div>`;
    }).join("");
    sharedPanel=duelPanel("star","gold","Ortak Alınan Kulüpler","Aynı takımla kim daha dominant?",`${ca.shared.length} kulüp`,`<div class="dl-tierlist">${rows}</div>`);
  }

  // 4. Özel Kulüp vs. Kulüp Stüdyosu
  let customPanel="";
  if(ca.clubs1.length&&ca.clubs2.length){
    const c1=ca.clubs1.find(x=>x.tm===st.dlC1)||ca.clubs1[0];
    const c2=ca.clubs2.find(x=>x.tm===st.dlC2)||ca.clubs2[0];
    const optC1=ca.clubs1.map(x=>`<option value="${esc(x.tm)}" ${x.tm===c1.tm?"selected":""}>${esc(x.tm)}${x.g?" ("+x.g+")":""} · ${x.n}S</option>`).join("");
    const optC2=ca.clubs2.map(x=>`<option value="${esc(x.tm)}" ${x.tm===c2.tm?"selected":""}>${esc(x.tm)}${x.g?" ("+x.g+")":""} · ${x.n}S</option>`).join("");
    const ti1=IX[c1.tm]!=null?IX[c1.tm]:null,ti2=IX[c2.tm]!=null?IX[c2.tm]:null;

    const selBar=`<div class="dl-seldock">`+
      `<div class="dl-selcol me"><label for="dl_c1">${esc(me.name)} Kulübü</label><select id="dl_c1" class="sel">${optC1}</select></div>`+
      `<span class="dl-swsep">VS</span>`+
      `<div class="dl-selcol op"><label for="dl_c2">${esc(opp.name)} Kulübü</label><select id="dl_c2" class="sel">${optC2}</select></div>`+
    `</div>`;

    let cs1=0,cs2=0;
    const cmpC=(a,b,low)=>{if(a==null||b==null||!Number.isFinite(+a)||!Number.isFinite(+b))return;if(low){if(+a<+b)cs1++;else if(+b<+a)cs2++}else{if(+a>+b)cs1++;else if(+b>+a)cs2++}};
    cmpC(c1.ch,c2.ch,false);
    if(c1.m>0&&c2.m>0){cmpC(c1.wr,c2.wr,false);cmpC(c1.ppm,c2.ppm,false);cmpC(c1.gpm,c2.gpm,false);cmpC(c1.gapm,c2.gapm,true);cmpC(c1.gdpm,c2.gdpm,false)}

    const face=`<div class="dl-ministage">`+
      `<div class="dl-mside me"><div class="dl-mcrest me${ti1!=null?" has-b":""}">${ti1!=null?badge(ti1,38):`<span class="dl-av sm">${esc(c1.tm.slice(0,1).toLocaleUpperCase("tr"))}</span>`}</div><small class="dl-msnm">${esc(me.name)}</small><b class="dl-mtm">${esc(c1.tm)}${c1.g?` <em>${c1.g}</em>`:""}</b><span class="dl-mgbm">${c1.n} sezon · ${c1.m} maç</span></div>`+
      `<div class="dl-mmid"><span class="dl-vsp">VS</span><div class="dl-msscore"><b class="me${cs1>cs2?" dlhi":""}">${cs1}</b><span>–</span><b class="op${cs2>cs1?" dlhi":""}">${cs2}</b></div></div>`+
      `<div class="dl-mside op"><div class="dl-mcrest op${ti2!=null?" has-b":""}">${ti2!=null?badge(ti2,38):`<span class="dl-av sm">${esc(c2.tm.slice(0,1).toLocaleUpperCase("tr"))}</span>`}</div><small class="dl-msnm">${esc(opp.name)}</small><b class="dl-mtm">${esc(c2.tm)}${c2.g?` <em>${c2.g}</em>`:""}</b><span class="dl-mgbm">${c2.n} sezon · ${c2.m} maç</span></div>`+
    `</div>`;

    const rows=
      duelCompareRow("Şampiyonluk",c1.ch,c2.ch,String(c1.ch),String(c2.ch),false)+
      duelCompareRow("Galibiyet Oranı",c1.wr,c2.wr,pctF(c1.wr),pctF(c2.wr),false)+
      duelCompareRow("Maç Başı Puan",c1.ppm,c2.ppm,fxF(c1.ppm),fxF(c2.ppm),false)+
      duelCompareRow("Atılan Gol / Maç",c1.gpm,c2.gpm,fxF(c1.gpm),fxF(c2.gpm),false)+
      duelCompareRow("Yenilen Gol / Maç",c1.gapm,c2.gapm,fxF(c1.gapm),fxF(c2.gapm),true)+
      duelCompareRow("Maç Başı Averaj",c1.gdpm,c2.gdpm,c1.gdpm!=null?dFmt(c1.gdpm):"—",c2.gdpm!=null?dFmt(c2.gdpm):"—",false);

    const cBtn=`<button class="dl-livego sec" data-a="dlcposter" style="margin-top:12px">${DLI.share}<span>Kulüp vs. Kulüp Posterini Paylaş (PNG)</span></button>`;
    customPanel=duelPanel("cl","sky","Kulüp vs. Kulüp Düellosu","İstediğin iki kulüp performansını kıyasla",`${cs1}–${cs2}`,
      selBar+face+`<div class="dl-tlist">${rows}</div>`+cBtn
    );
  }

  const out=fairHtml+tierPanel+sharedPanel+customPanel;
  return out||duelPanel("cl","gold","Alınan Takımlara Göre Kıyas",`${modeLbl} kategorisinde henüz takım kaydı yok`,modeLbl,
    `<div class="note" style="margin:0">İki tarafta da <b>${esc(modeLbl)}</b> kategorisinde takım seçilmiş sezon oluştuğunda GEN kademeleri, ortak kulüpler ve Kulüp vs. Kulüp düellosu burada görünecek.</div>`
  );
}

// =========================================================================
// STÜDYO SEKME 4: TAKTİKSEL DNA & xG LABORATUVARI
// =========================================================================
function duelDnaStudio(me,opp){
  const md=me.dna,od=opp.dna;
  if(!md&&!od){
    return duelPanel("dn","sky","Taktiksel DNA & xG Laboratuvarı","Gelişmiş maç verisi bekleniyor",null,
      `<div class="note" style="margin:0">Maç girişlerinde <b>5 Altın Veri</b> (Topla Oynama, Şut, Pas, xG) girildiğinde çift renkli radar ve menajer kimliği kıyaslaması burada açılır.</div>`
    );
  }
  const dsc=duelDnaScore(md,od);
  const pctF=v=>v==null?"—":"%"+Math.round(v);
  const axChip=(lbl,k)=>{
    const a=md?md[k]:null,b=od?od[k]:null;
    const w1=a!=null&&b!=null&&a>b,w2=a!=null&&b!=null&&b>a;
    return `<div class="dl-axchip"><small>${lbl}</small><div><b class="me${w1?" win":""}">${a!=null?a:"—"}</b><span>/</span><b class="op${w2?" win":""}">${b!=null?b:"—"}</b></div></div>`;
  };

  const stage=`<div class="dl-dnastage">`+
    `<div class="dl-stage-hd"><span class="dl-htag">TAKTİKSEL DNA LABORATUVARI</span>${dsc?`<span class="dl-dnapill">DNA ${dsc.d1}–${dsc.d2}</span>`:""}</div>`+
    `<div class="dl-dnaleg"><span><i class="me"></i>${esc(me.name)}${md?` · ${md.n}M`:""}</span><span><i class="op"></i>${esc(opp.name)}${od?` · ${od.n}M`:""}</span></div>`+
    `<div class="dl-radarbox">${duelRadarSvg(md,od)}</div>`+
    `<div class="dl-axgrid">${axChip("HÜCUM","atk")}${axChip("KONTROL","ctrl")}${axChip("DİRENÇ","aggr")}${axChip("BİTİRİCİLİK","eff")}</div>`+
    `<div class="dl-idgrid">`+
      `<div class="dl-idcard me"><small>${esc(me.name)}</small><b>${esc(md?md.title:"Veri yok")}</b>${md&&md.subTag?`<em>${esc(md.subTag)}</em>`:""}</div>`+
      `<div class="dl-idcard op"><small>${esc(opp.name)}</small><b>${esc(od?od.title:"Veri yok")}</b>${od&&od.subTag?`<em>${esc(od.subTag)}</em>`:""}</div>`+
    `</div>`+
  `</div>`;

  const luckVal=d=>d&&d.xgPairCnt?((d.st||0)-(d.un||0)):null;
  const luckFmt=d=>d&&d.xgPairCnt?`${d.st||0}Ş / ${d.un||0}Şs`:"—";
  const xgBody=(md&&od)?`<div class="dl-tlist">`+
    `<div class="dl-grp">Oyun Hakimiyeti & Üretim</div>`+
    duelCompareRow("Topla Oynama %",md.mPos,od.mPos,"%"+md.mPos,"%"+od.mPos,false)+
    duelCompareRow("Pas İsabeti %",md.mPass,od.mPass,"%"+md.mPass,"%"+od.mPass,false)+
    duelCompareRow("Üretilen xG / Maç",md.mXg,od.mXg,xgN2(md.mXg),xgN2(od.mXg),false)+
    duelCompareRow("Rakip xG / Maç (Savunma)",md.oXg,od.oXg,xgN2(md.oXg),xgN2(od.oXg),true)+
    `<div class="dl-grp">Bitiricilik, Kaleci & Hak Ediş</div>`+
    duelCompareRow("Bitiricilik (Gol − xG)",md.xgDiff,od.xgDiff,xgS2(md.xgDiff),xgS2(od.xgDiff),false)+
    duelCompareRow("Puan − xPts (Pragmatizm)",md.xPtsDiff,od.xPtsDiff,md.xPtsDiff!=null?xgS1(md.xPtsDiff):"—",od.xPtsDiff!=null?xgS1(od.xPtsDiff):"—",false)+
    (md.gkPct!=null||od.gkPct!=null?duelCompareRow("Kaleci Kurtarış %",md.gkPct,od.gkPct,pctF(md.gkPct),pctF(od.gkPct),false):"")+
    duelCompareRow("Hak Ediş (Şanslı / Şanssız)",luckVal(md),luckVal(od),luckFmt(md),luckFmt(od),false)+
  `</div>`:`<div class="note" style="margin:0">Tam xG kıyaslaması için iki menajerin de gelişmiş maç istatistiği girmesi gerekir.</div>`;

  return stage+duelPanel("dn","sky","xG, Bitiricilik & Hak Ediş Telemetrisi","Gelişmiş istatistik girilen tüm maçlar",null,xgBody);
}

// Son 5 Sezon Form & Trend Kıyaslaması (uzun kariyerlerde güncel momentum)
function duelRecentFormPanel(me,opp,mode){
  const l1=duelFilterSeasons(me,mode).filter(s=>s.fin||s.m>0).slice(0,5),l2=duelFilterSeasons(opp,mode).filter(s=>s.fin||s.m>0).slice(0,5);
  if(!l1.length&&!l2.length)return "";
  const modeLbl=mode=="cup"?"Kupa":mode=="lg"?"Lig":"Tüm Sezonlar";
  const calc=arr=>{
    let ch=0,m=0,w=0,d=0;
    arr.forEach(s=>{if(s.fin&&s.st==7)ch++;m+=(+s.m||0);w+=(+s.w||0);d+=(+s.d||0)});
    return{n:arr.length,ch,m,wr:m?Math.round(w/m*1000)/10:null,ppm:m?Math.round((w*3+d)/m*100)/100:null};
  };
  const r1=calc(l1),r2=calc(l2);
  const pctF=v=>v==null?"—":"%"+Math.round(v),fxF=v=>v==null?"—":fx(v);

  // 5 sezonluk P/M trend sparkline SVG (eski -> yeni soldan sağa)
  const s1=l1.slice().reverse(),s2=l2.slice().reverse();
  const maxN=Math.max(s1.length,s2.length,2);
  const W=290,H=76,px=16,py=12,pw=W-px*2,ph=H-py*2;
  const xAt=(i,len)=>len<=1?W/2:(px+(i/(maxN-1))*pw);
  const yAt=v=>py+ph-(Math.max(0,Math.min(3,+v||0))/3)*ph;
  const mkPath=(arr,col)=>{
    const pts=arr.map((s,i)=>s.ppm!=null?[xAt(i,arr.length),yAt(s.ppm)]:null).filter(Boolean);
    if(!pts.length)return "";
    const line=pts.length>1?`<polyline points="${pts.map(p=>p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ")}" fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`:"";
    const dots=pts.map(p=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.4" fill="${col}" stroke="#0b1118" stroke-width="1.4"/>`).join("");
    return line+dots;
  };
  const grid=[0,1.5,3].map(v=>`<line x1="${px}" y1="${yAt(v).toFixed(1)}" x2="${W-px}" y2="${yAt(v).toFixed(1)}" stroke="rgba(148,163,184,.22)" stroke-dasharray="2 3" stroke-width="1"/>`).join("");
  const svg=`<div class="dl-trendbox"><div class="dl-trendleg"><span><i class="me"></i>${esc(me.name)} (${r1.n}S)</span><span>Puan / Maç Trendi</span><span><i class="op"></i>${esc(opp.name)} (${r2.n}S)</span></div><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Son 5 sezon puan ortalaması trendi">${grid}${mkPath(s2,"#f0c24b")}${mkPath(s1,"#2ee59d")}</svg></div>`;

  const pills=arr=>arr.slice().reverse().map(s=>{
    const cls=s.st==7?"ch":s.st>=5?"hi":s.fin?"fn":"lv";
    const snm=String(s.n||"").replace(/^Sezon\s*/i,"S").slice(0,5)||"S";
    const tag=s.st==7?"🏆":s.st==6?"Final":s.st==5?"YF":s.fin?"Bitti":"Devam";
    return `<span class="dl-trp ${cls}" title="${esc(s.n)} · ${esc(s.tm||"")} · ${esc(s.res)}"><b>${esc(snm)}</b><em>${tag}</em></span>`;
  }).join("");

  const strip=`<div class="dl-trstrip"><div class="dl-trs me"><small>${esc(me.name)}</small><div>${pills(l1)||"<em>—</em>"}</div></div><div class="dl-trs op"><small>${esc(opp.name)}</small><div>${pills(l2)||"<em>—</em>"}</div></div></div>`;

  const rows=
    duelCompareRow("Son 5S Kupa",r1.n?r1.ch:null,r2.n?r2.ch:null,r1.n?String(r1.ch):"—",r2.n?String(r2.ch):"—",false)+
    duelCompareRow("Son 5S Galibiyet",r1.wr,r2.wr,pctF(r1.wr),pctF(r2.wr),false)+
    duelCompareRow("Son 5S Puan / Maç",r1.ppm,r2.ppm,fxF(r1.ppm),fxF(r2.ppm),false);

  return duelPanel("flame","sky","Son Dönem Formu","Son 5 sezonluk güncel ivme ve P/M trendi",modeLbl,
    svg+strip+`<div class="dl-tlist" style="margin-top:10px">${rows}</div>`
  );
}

// =========================================================================
// ANA DÜELLO EKRANI (Broadcast Arena + 4 Sekmeli Stüdyo)
// =========================================================================
function duelView(){
  const cfg=duelLoadCfg(),cache=duelLoadCache();
  const me=buildDuelSummary();
  const mode=st.dlmod||"all";
  const dtab=st.dltab||"ov";
  const hasRoom=!!(cfg.room&&cfg.room.length>=6);
  const allPeers=Object.values(cache.peers||{}).filter(p=>p&&p.uid&&p.uid!==cfg.uid);
  const rivals=allPeers.sort((a,b)=>(b.car.ch-a.car.ch)||((b.car.ppm||0)-(a.car.ppm||0))||(b.ut-a.ut));
  const selUid=(cache.sel&&rivals.some(r=>r.uid===cache.sel))?cache.sel:(rivals[0]?rivals[0].uid:"");
  const opp=rivals.find(r=>r.uid===selUid)||null;

  // 1) Kompakt Canlı Oda Telemetri Şeridi (veya Kurulum Kartı)
  let connHtml="";
  if(!hasRoom||st.duelEdit){
    connHtml=duelPanel("sliders","emr",hasRoom?"Düello Odası Ayarları":"Canlı Menajer Düellosu","Ortak oda koduyla kariyer ve sezonlarınızı canlı eşitleyin",hasRoom?cfg.room:"Kurulum",
      `<div class="note" style="margin:0 0 12px">İkiniz de aynı <b>Oda Kodu</b>’nu girdiğinizde maç kaydettikçe özetiniz arka planda eşitlenir; ana kayıtlarınız tamamen cihazınızda kalır.</div>`+
      `<div class="dl-fgrid" style="margin-bottom:12px">`+
        `<div class="su-fld"><label>Menajer Adın</label><input id="dl_nm" class="f" maxlength="32" placeholder="Adın" value="${esc(cfg.name||store.owner||"")}"></div>`+
        `<div class="su-fld"><label>Ortak Oda Kodu (en az 6 karakter)</label><input id="dl_rm" class="f" maxlength="40" placeholder="örn: fc27-duello-2026" value="${esc(cfg.room||"")}" autocapitalize="none" autocorrect="off"></div>`+
      `</div>`+
      `<div class="bar" style="margin:0">`+
        `<button class="btn p pset-pri" data-a="dljoin" style="flex:1">${st.duelBusy?"Bağlanıyor…":"Odaya Bağlan ve Eşitle"}</button>`+
        (hasRoom?`<button class="btn pset-sec" data-a="dlcancel">Vazgeç</button>`:"")+
      `</div>`+
      (hasRoom?`<div class="bar" style="margin:8px 0 0"><button class="btn pset-sec" data-a="dlleave" style="width:100%;color:var(--wr)">Odadan Ayrıl</button></div>`:"")
    );
  }else{
    const synced=!!cache.peers[cfg.uid];
    const regCnt=rivals.length+(synced?1:0);
    connHtml=`<div class="dl-strip">`+
      `<div class="dl-strip-l">`+
        `<span class="dl-beacon${synced?"":" warn"}"></span>`+
        `<div class="dl-strip-t">`+
          `<div class="dl-strip-top"><b class="dl-roomcode">${esc(cfg.room)}</b><span class="dl-sbadge ${synced?"ok":"wr"}">${synced?DLI.check:DLI.warn}${synced?"Eşit":"Bekliyor"}</span></div>`+
          `<small>${regCnt} menajer · ${esc(duelRelTime(cache.lastSync))}</small>`+
        `</div>`+
      `</div>`+
      `<div class="dl-strip-r">`+
        `<button class="dl-syncbtn${st.duelBusy?" busy":""}" data-a="dlsync" ${st.duelBusy?"disabled":""}>${DLI.sync}<span>${st.duelBusy?"Eşitleniyor":"Eşitle"}</span></button>`+
        `<button class="dl-icbtn" data-a="dledit" aria-label="Oda ayarları" title="Oda ayarları">${DLI.sliders}</button>`+
      `</div>`+
    `</div>`+
    (st.duelErr?`<div class="dl-errbar">${DLI.warn}<span>${esc(st.duelErr)}</span></div>`:"");
  }

  // 2) Oda Sıralaması (3+ kişi varsa kompakt seçici)
  let lbHtml="";
  if(rivals.length>=2){
    const board=[me,...rivals].sort((a,b)=>(b.car.ch-a.car.ch)||((b.car.ppm||0)-(a.car.ppm||0))||((b.car.wr||0)-(a.car.wr||0)));
    lbHtml=duelPanel("trophy","gold","Oda Sıralaması","Kıyaslamak için bir rakibe dokun",`${board.length} menajer`,
      `<div class="dl-lb">${board.map((p,idx)=>{
        const isMe=p.uid===cfg.uid,isSel=p.uid===selUid;
        const wrTxt=p.car.m?`%${Math.round(p.car.wr||0)}G`:"0 maç";
        const ppmTxt=p.car.m?`${fx(p.car.ppm||0)} P/M`:"—";
        const inner=`<span class="dl-rk${idx===0?" r1":""}">${idx+1}</span><span class="dl-pnm"><b>${esc(p.name)}${isMe?" (Sen)":""}</b><small>${p.car.n} sezon · ${p.car.m} maç · ${wrTxt}</small></span><span class="dl-pkpi"><b>${p.car.ch} kupa</b><small>${ppmTxt}</small></span>`;
        return isMe?`<div class="dl-lbr me">${inner}</div>`:`<button class="dl-lbr${isSel?" sel":""}" data-a="dlsel" data-v="${esc(p.uid)}">${inner}</button>`;
      }).join("")}</div>`
    );
  }

  // 3) Rakip yoksa bekleme ekranı
  let arenaHtml="";
  if(!opp){
    arenaHtml=duelPanel("cl","sky",hasRoom?"Rakip Bekleniyor":"Henüz Rakip Yok",hasRoom?"Oda kodunu arkadaşına gönder":"Odaya bağlan veya manuel kıyas kodu yapıştır",hasRoom?cfg.room:null,
      hasRoom
        ? `<div class="note" style="margin:0 0 12px">Özetin <b>${esc(cfg.room)}</b> odasına hazırlandı. Arkadaşın <b>Geçmiş › Düello</b> ekranından aynı oda kodunu girdiğinde Broadcast Arena otomatik açılacak.</div>`+
          `<button class="btn p pset-pri ui-btn" data-a="dlcpcode" style="width:100%">${DLI.copy}<span>Oda Kodunu Kopyala (${esc(cfg.room)})</span></button>`
        : `<div class="note" style="margin:0">Yukarıdan ortak bir oda koduyla bağlanabilir veya aşağıdaki <b>Çevrimdışı Manuel Kıyas Kodu</b> alanından tek seferlik karşılaştırma yapabilirsin.</div>`
    );
  }else{
    const crit=duelCareerCriteria(me,opp,mode);
    const m1=crit.m1,m2=crit.m2,c1=crit.c1,c2=crit.c2;
    const sb={s1:crit.s1,s2:crit.s2};
    const modeLbl=mode=="cup"?"Kupa":mode=="lg"?"Lig":"Tüm Sezonlar";
    const tiMe=me.cur&&me.cur.team&&IX[me.cur.team]!=null?IX[me.cur.team]:null;
    const tiOp=opp.cur&&opp.cur.team&&IX[opp.cur.team]!=null?IX[opp.cur.team]:null;
    const totPts=Math.max(1,sb.s1+sb.s2);
    const dom1=sb.s1+sb.s2>0?Math.round(sb.s1/totPts*100):50;
    const dom2=100-dom1;
    const lead1=sb.s1>sb.s2,lead2=sb.s2>sb.s1;

    const pctF=v=>v==null?"—":"%"+Math.round(v);
    const fxF=v=>v==null?"—":fx(v);
    const sgnI=v=>v==null?"—":(v>0?"+"+v:v<0?"−"+Math.abs(v):"0");

    // OBSIDIAN STADIUM BROADCAST HERO STAGE
    const hero=`<section class="dl-stage" aria-label="Menajer Düellosu Skor Tabelası">`+
      `<div class="dl-stage-bg" aria-hidden="true"></div>`+
      `<div class="dl-stage-hd">`+
        `<span class="dl-htag">FC 27 · ${esc(modeLbl.toLocaleUpperCase("tr"))}</span>`+
        (lead1?`<span class="dl-lead me">${DLI.crown}<span>${esc(me.name)} ÖNDE</span></span>`:lead2?`<span class="dl-lead op">${DLI.crown}<span>${esc(opp.name)} ÖNDE</span></span>`:`<span class="dl-lead eq"><span>BERABERLİK</span></span>`)+
      `</div>`+
      `<div class="dl-stage-vs">`+
        `<div class="dl-fighter me">`+
          `<div class="dl-fcrest me${tiMe!=null?" has-b":""}">${tiMe!=null?badge(tiMe,42):`<span class="dl-av">${esc(me.name.slice(0,1).toLocaleUpperCase("tr"))}</span>`}</div>`+
          `<b class="dl-fname">${esc(me.name)}</b>`+
          `<small class="dl-fsub">${c1.n} sezon · ${c1.m} maç</small>`+
          (me.cur&&me.cur.team?`<span class="dl-fclub me">${esc(me.cur.team)}${me.cur.teamG?" · "+me.cur.teamG:""}</span>`:"")+
        `</div>`+
        `<div class="dl-center">`+
          `<span class="dl-vsp">VS</span>`+
          `<div class="dl-score"><b class="me${lead1?" dlhi":""}">${sb.s1}</b><span>–</span><b class="op${lead2?" dlhi":""}">${sb.s2}</b></div>`+
          `<small class="dl-scnote">${sb.s1+sb.s2} kategori</small>`+
        `</div>`+
        `<div class="dl-fighter op">`+
          `<div class="dl-fcrest op${tiOp!=null?" has-b":""}">${tiOp!=null?badge(tiOp,42):`<span class="dl-av">${esc(opp.name.slice(0,1).toLocaleUpperCase("tr"))}</span>`}</div>`+
          `<b class="dl-fname">${esc(opp.name)}</b>`+
          `<small class="dl-fsub">${c2.n} sezon · ${c2.m} maç</small>`+
          (opp.cur&&opp.cur.team?`<span class="dl-fclub op">${esc(opp.cur.team)}${opp.cur.teamG?" · "+opp.cur.teamG:""}</span>`:"")+
        `</div>`+
      `</div>`+
      `<div class="dl-dom">`+
        `<div class="dl-domlbl"><b class="me">%${dom1}</b><span>KATEGORİ HAKİMİYETİ</span><b class="op">%${dom2}</b></div>`+
        `<div class="dl-dombar"><i class="me" style="width:${dom1}%"></i><i class="op" style="width:${dom2}%"></i></div>`+
      `</div>`+
      `<div class="dl-hkpi">`+
        `<div class="dl-hk"><small>ŞAMPİYONLUK</small><div><b class="me${c1.n&&c2.n&&c1.ch>c2.ch?" dlhi":""}">${c1.n?c1.ch:"—"}</b><span>:</span><b class="op${c1.n&&c2.n&&c2.ch>c1.ch?" dlhi":""}">${c2.n?c2.ch:"—"}</b></div></div>`+
        `<div class="dl-hk"><small>GALİBİYET</small><div><b class="me${c1.wr!=null&&c2.wr!=null&&c1.wr>c2.wr?" dlhi":""}">${pctF(c1.wr)}</b><span>:</span><b class="op${c1.wr!=null&&c2.wr!=null&&c2.wr>c1.wr?" dlhi":""}">${pctF(c2.wr)}</b></div></div>`+
        `<div class="dl-hk"><small>PUAN / MAÇ</small><div><b class="me${c1.ppm!=null&&c2.ppm!=null&&c1.ppm>c2.ppm?" dlhi":""}">${fxF(c1.ppm)}</b><span>:</span><b class="op${c1.ppm!=null&&c2.ppm!=null&&c2.ppm>c1.ppm?" dlhi":""}">${fxF(c2.ppm)}</b></div></div>`+
      `</div>`+
      `<div class="dl-hacts">`+
        `<button class="dl-hbtn pri" data-a="dllive" data-v="${esc(opp.uid)}">${DLI.eye}<span>Canlı Sezon</span></button>`+
        `<button class="dl-hbtn sec" data-a="dlposter">${DLI.share}<span>1v1 Poster</span></button>`+
        (opp.manual?`<button class="dl-hbtn dgr" data-a="dldel" data-v="${esc(opp.uid)}" aria-label="Manuel rakibi kaldır" title="Kaldır">${DLI.trash}</button>`:"")+
      `</div>`+
      `<div class="dl-hfoot"><span>Sen: Güncel</span><span>${esc(opp.name)}: ${esc(duelRelTime(opp.ut))}${opp.manual?" · Manuel":""}</span></div>`+
    `</section>`;

    // KONTROL ŞERİDİ: 4 Sekmeli Düello Stüdyosu + Kompakt Mod Filtresi
    const studioNav=`<div class="dl-nav" role="tablist" aria-label="Düello stüdyosu">${[
      ["ov","Genel",DLI.ov],
      ["se","Sezonlar",DLI.se],
      ["cl","Takımlar",DLI.cl],
      ["dn","DNA & xG",DLI.dn]
    ].map(([k,l,ic])=>`<button class="dl-ntab${dtab==k?" on":""}" role="tab" aria-selected="${dtab==k}" data-a="dltab" data-v="${k}">${ic}<span>${l}</span></button>`).join("")}</div>`;

    const modeBar=dtab!=="dn"?`<div class="dl-mbar" role="tablist" aria-label="Turnuva filtresi">${[["all","Tümü"],["cup","Kupa"],["lg","Lig"]].map(([k,l])=>`<button class="dl-mbtn${mode==k?" on":""}" role="tab" aria-selected="${mode==k}" data-a="dlmod" data-v="${k}">${l}</button>`).join("")}</div>`:"";
    const compatNote=(!m2.compat&&mode!="all"&&dtab!=="dn")?`<div class="dl-errbar warn">${DLI.warn}<span>${esc(opp.name)} önceki sürümde eşitleme yaptı; Kupa/Lig kırılımı için güncelleyip eşitlemesi gerekir.</span></div>`:"";

    // AKTİF STÜDYO SEKMESİ İÇERİĞİ
    let tabBody="";
    if(dtab=="ov"){
      const cupRows=crit.rows.filter(r=>r.grp==="cup").map(r=>duelCompareRow(r.lbl,r.v1,r.v2,r.f1,r.f2,r.low,r.neu)).join("");
      const perfRows=crit.rows.filter(r=>r.grp==="perf").map(r=>duelCompareRow(r.lbl,r.v1,r.v2,r.f1,r.f2,r.low,r.neu)).join("");
      const carRows=`<div class="dl-grp">Kupalar & Dereceler</div>${cupRows}<div class="dl-grp">Maç Performansı & Adil Verim</div>${perfRows}`;

      const carPanel=duelPanel("trophy","emr","Kariyer & Kupa Karnesi",`${modeLbl} · 10 kriter · ${c1.m} vs ${c2.m} maç`,`${sb.s1}–${sb.s2}`,`<div class="dl-tlist">${carRows}</div>`);

      let starPanel="";
      if(me.star||opp.star){
        const sBox=(p,cls)=>{
          const st0=p.star;
          return `<div class="dl-starcard ${cls}"><span class="dl-stic ${cls}">${DLI.star}</span><div class="dl-sttxt"><small>${esc(p.name)}</small><b>${st0?esc(st0.n):"Veri yok"}</b>${st0?`<em>${st0.v} G+A${st0.g!=null&&st0.gn&&nz(st0.gn)===nz(st0.n)?` · ${st0.g} Gol`:""}</em>`:""}</div></div>`;
        };
        starPanel=duelPanel("star","gold","Kariyer Yıldızları","Tüm sezonlarda en yüksek skor katkısı (G+A)",null,`<div class="dl-stargrid">${sBox(me,"me")}${sBox(opp,"op")}</div>`);
      }

      const formDots=arr=>(arr&&arr.length)?`<div class="dl-form">${arr.map(r=>`<i class="${r}">${r=="w"?"G":r=="d"?"B":"M"}</i>`).join("")}</div>`:`<div class="dl-csm">Henüz maç yok</div>`;
      const curSide=(p,cls)=>{
        const c=p.cur;if(!c)return `<div class="dl-cs ${cls}"><small>${esc(p.name)}</small><b>Aktif sezon yok</b></div>`;
        const ti=c.team&&IX[c.team]!=null?IX[c.team]:null;
        const gTag=c.teamG?`<span class="dl-gen">${c.teamG}</span>`:"";
        const gd=(c.gf||0)-(c.ga||0),gdS=(gd>0?"+"+gd:gd<0?"−"+Math.abs(gd):"0");
        return `<div class="dl-cs ${cls}"><div class="dl-csh">${ti!=null?badge(ti,26):""}<div style="min-width:0;flex:1"><small>${esc(p.name)}</small><b>${esc(c.team||"Takım seçilmedi")}</b></div>${gTag}</div><div class="dl-csm">${esc(duelShortRes(c.stage||""))} · ${c.w}G ${c.d}B ${c.l}M</div><div class="dl-csm">Gol ${c.gf||0}:${c.ga||0} · Av ${gdS}</div>${formDots(c.form)}</div>`;
      };
      const pulsePanel=duelPanel("flame","org","Canlı Sezon Nabzı","Aktif sezondaki kulüp, averaj ve son 5 maç formu",null,
        `<div class="dl-curgrid">${curSide(me,"me")}${curSide(opp,"op")}</div>`+
        `<button class="dl-livego" data-a="dllive" data-v="${esc(opp.uid)}">${DLI.eye}<span>${esc(opp.name)} · Puan Durumu, Fikstür ve Eleme Yolunu Aç</span></button>`
      );

      const trendPanel=duelRecentFormPanel(me,opp,mode);
      tabBody=carPanel+trendPanel+starPanel+pulsePanel;
    }else if(dtab=="se"){
      tabBody=duelSeasonStudio(me,opp,mode);
    }else if(dtab=="cl"){
      tabBody=duelClubStudio(me,opp,mode);
    }else if(dtab=="dn"){
      tabBody=duelDnaStudio(me,opp);
    }

    arenaHtml=hero+studioNav+modeBar+compatNote+tabBody;
  }

  // 4) Yedek: Çevrimdışı Manuel Kıyas Kodu
  const manCard=`<details class="xfold dl-manfold"><summary class="xsh"><span class="xshl"><span class="xshi">${UICO.backup}</span><span class="xsht"><b>Çevrimdışı Manuel Kıyas Kodu</b><small>Oda kullanmadan tek seferlik kodla kıyasla</small></span></span><span class="xshr"><span class="xfc" aria-hidden="true">${UICO.chev}</span></span></summary><div class="xfb">`+
    `<div class="bar" style="margin:0 0 8px"><button class="btn pset-sec" data-a="dlmycode" style="flex:1">Kendi Kıyas Kodumu Kopyala</button></div>`+
    `<textarea id="dl_imp" class="f" rows="2" placeholder="Arkadaşının kıyas kodunu buraya yapıştır…"></textarea>`+
    `<div class="bar" style="margin:8px 0 0"><button class="btn p pset-pri" data-a="dladdcode" style="flex:1">Koddan Rakip Ekle</button></div>`+
  `</div></details>`;

  return `<div class="dl-wrap">${connHtml}${lbHtml}${arenaHtml}${manCard}</div>`;
}

// =========================================================================
// CANLI SEZON İNCELEME MODALI (4 Sekmeli: Puan Durumu · Maçlar · Eleme · Yıldız & DNA)
// =========================================================================
function duelLiveDlg(){
  if(!st.dlLive)return "";
  const cfg=duelLoadCfg(),cache=duelLoadCache();
  const me=buildDuelSummary();
  const rivals=Object.values(cache.peers||{}).filter(p=>p&&p.uid&&p.uid!==cfg.uid);
  const targetUid=st.dlLive.uid||"";
  const isMe=targetUid===cfg.uid;
  const oppRef=rivals.find(r=>r.uid===(st.dlLive.oppUid||(!isMe?targetUid:cache.sel)))||rivals[0]||null;
  const p=isMe?me:(oppRef||me);
  const c=p.cur||{},lv=p.live||null;
  const defTab=lv?(lv.tbl&&lv.tbl.length?"tbl":(lv.ko&&lv.ko.length?"ko":"mt")):"tbl";
  const tab=st.dlLive.tab||defTab;
  const ti=c.team&&IX[c.team]!=null?IX[c.team]:null;
  const gd=(c.gf||0)-(c.ga||0),gdS=(gd>0?"+"+gd:gd<0?"−"+Math.abs(gd):"0");

  const whoSwitch=oppRef?`<div class="stabs seg2" style="margin:0 0 10px">`+
    `<button class="chip ${p.uid===me.uid?"on":""}" data-a="dllivewho" data-v="${esc(me.uid)}">${esc(me.name)} (Sen)</button>`+
    `<button class="chip ${p.uid!==me.uid?"on":""}" data-a="dllivewho" data-v="${esc(oppRef.uid)}">${esc(oppRef.name)}</button>`+
  `</div>`:"";

  const headCard=`<div class="dl-lvhead ${p.uid===me.uid?"me":"op"}">`+
    `<div class="dl-csh">${ti!=null?`<span class="dl-lvcrest">${badge(ti,32)}</span>`:""}<div style="min-width:0;flex:1"><b>${esc(c.team||"Takım seçilmedi")}</b><small>${esc(c.sName||"Aktif Sezon")}${c.stage?" · "+esc(duelShortRes(c.stage)):""}</small></div>${c.teamG?`<span class="dl-lvgen">${c.teamG} GEN</span>`:""}</div>`+
    `<div class="dl-lvkpi"><span><b>${c.w||0}G ${c.d||0}B ${c.l||0}M</b><em>Karne</em></span><span><b>${c.gf||0}:${c.ga||0}</b><em>Gol (Av ${gdS})</em></span><span><b>${lv&&lv.mt?lv.mt.length:((c.w||0)+(c.d||0)+(c.l||0))}</b><em>Maç</em></span></div>`+
    (lv&&lv.fmt?`<div class="dl-lvfmt">${esc(lv.fmt)}</div>`:"")+
  `</div>`;

  let body="";
  if(!lv){
    body=`<div class="note wr" style="margin:8px 0"><b>${esc(p.name)}</b> henüz <b>güncel sürüme</b> geçip eşitleme yapmadığı için detaylı canlı sezon verisi (puan durumu, fikstür, eleme yolu) henüz paylaşılmadı. Güncelleyip <b>Eşitle</b> dediğinde burada otomatik görünecek.</div>`;
  }else{
    const nav=`<div class="stabs dl-lvtbs" role="tablist" aria-label="Canlı sezon bölümleri">${[["tbl","Puan Durumu"],["mt","Maçlar"],["ko","Eleme"],["st","Yıldız & DNA"]].map(([k,l])=>`<button class="chip ${tab==k?"on":""}" role="tab" aria-selected="${tab==k}" data-a="dllivetab" data-v="${k}">${l}</button>`).join("")}</div>`;
    let content="";
    if(tab=="tbl"){
      if(lv.tbl&&lv.tbl.length){
        const isU=!!(lv.ucl||(lv.tbl.length===36&&lv.q===24));
        const qCut=!lv.lg&&lv.q>0?lv.q:0;
        const rowsHtml=lv.tbl.map((r,idx)=>{
          const [nm,o,w,d,l,gf,ga,pts,mine]=r;
          const rti=IX[nm]!=null?IX[nm]:null,av=gf-ga,avS=av>0?"+"+av:av<0?"−"+Math.abs(av):"0";
          const isCut=isU?(idx===7||idx===23):(qCut>0&&idx===qCut-1&&idx<lv.tbl.length-1);
          const cutCls=isU&&idx===23?" qcut qcut-po":(isCut?" qcut":"");
          return `<tr class="${mine?"me":""}${cutCls}">`+
            `<td class="rk">${idx+1}</td>`+
            `<td class="tm"><div class="dl-tmcell">${rti!=null?badge(rti,18):""}<span>${esc(nm)}</span></div></td>`+
            `<td>${o}</td><td>${w}</td><td>${d}</td><td>${l}</td>`+
            `<td class="${av>0?"pos":av<0?"neg":""}">${avS}</td>`+
            `<td class="pt"><b>${pts}</b></td>`+
          `</tr>`;
        }).join("");
        content=`<div class="dl-lvsec"><div class="dl-lvsh"><b>${esc(lv.gName||"Puan Durumu")}</b>${isU?`<span class="xfpill emr">İlk 8 S16 · 9–24 PO</span>`:qCut?`<span class="xfpill emr">İlk ${qCut} çıkar</span>`:""}</div>`+
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
            const [n1,n2,g1,g2,wi,pf,pa,et,mine,l1,l2]=pr;
            const sc=(g1!=null&&g2!=null)?`${g1}–${g2}${pf!=null&&pa!=null?` (P ${pf}–${pa})`:et?" (UZ)":""}`:"—";
            const legSub=(Array.isArray(l1)&&Array.isArray(l2))?`<div class="dl-koleg">1.M: ${l1[0]}–${l1[1]} · 2.M: ${l2[0]}–${l2[1]}</div>`:"";
            return `<div class="dl-kor${mine?" mine":""}"><div class="dl-komain"><span class="dl-kot l${wi===1?" w":""}">${esc(n1)}</span><span class="dl-kosc">${sc}</span><span class="dl-kot r${wi===2?" w":""}">${esc(n2)}</span></div>${legSub}</div>`;
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
          `<div class="dl-idcard dark ${p.uid===me.uid?"me":"op"}" style="margin-bottom:8px"><b>${esc(d.title)}</b>${d.subTag?`<em>İkincil tarz: ${esc(d.subTag)}</em>`:""}</div>`+
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
  if(a=="dltab"){
    st.dltab=dv||"ov";render();return true;
  }
  if(a=="dlmod"){
    st.dlmod=dv||"all";st.dlS1="";st.dlS2="";st.dlC1="";st.dlC2="";render();return true;
  }
  if(a=="dlslatest"){
    st.dlS1="";st.dlS2="";ntf("Son sezonlara dönüldü");render();return true;
  }
  if(a=="dllive"){
    st.dlLive={uid:dv||"",oppUid:dv||"",tab:""};render();return true;
  }
  if(a=="dllivetab"){
    if(st.dlLive){st.dlLive.tab=dv||"tbl";render()}return true;
  }
  if(a=="dllivewho"){
    if(st.dlLive){st.dlLive.uid=dv||"";st.dlLive.tab="";render()}return true;
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
      const cache=duelLoadCache();const keep={};Object.entries(cache.peers||{}).forEach(([k,v])=>{if(v&&v.manual)keep[k]=v});cache.peers=keep;cache.sel=keep[cache.sel]?cache.sel:(Object.keys(keep)[0]||"");cache.lastSync=0;duelSaveCache(cache);
      st.duelEdit=false;st.duelErr="";st.duelLastAuto=0;
      return "Düello odasından ayrıldın";
    });
    render();return true;
  }
  if(a=="dlsel"){
    const cache=duelLoadCache();cache.sel=dv||"";duelSaveCache(cache);
    st.dlS1="";st.dlS2="";st.dlC1="";st.dlC2="";
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
  if(a=="dlsposter"){
    const cfg=duelLoadCfg(),cache=duelLoadCache();
    const me=buildDuelSummary(),mode=st.dlmod||"all";
    const rivals=Object.values(cache.peers||{}).filter(p=>p&&p.uid&&p.uid!==cfg.uid);
    const opp=(cache.sel&&rivals.find(r=>r.uid===cache.sel))||rivals[0];
    if(!opp){ask("Poster için önce bir rakip olmalı.");render();return true}
    const l1=duelFilterSeasons(me,mode),l2=duelFilterSeasons(opp,mode);
    const s1=l1.find(x=>x.id===st.dlS1)||l1[0],s2=l2.find(x=>x.id===st.dlS2)||l2[0];
    if(!s1||!s2){ask("Sezon posteri için iki tarafta da seçilebilir sezon olmalı.");render();return true}
    mkImg("duello-sezon",{name:`${me.name}-${s1.n}-vs-${opp.name}-${s2.n}`,me,opp,s1,s2,mode});
    return true;
  }
  if(a=="dlcposter"){
    const cfg=duelLoadCfg(),cache=duelLoadCache();
    const me=buildDuelSummary(),mode=st.dlmod||"all";
    const rivals=Object.values(cache.peers||{}).filter(p=>p&&p.uid&&p.uid!==cfg.uid);
    const opp=(cache.sel&&rivals.find(r=>r.uid===cache.sel))||rivals[0];
    if(!opp){ask("Poster için önce bir rakip olmalı.");render();return true}
    const ca=duelClubAnalytics(me,opp,mode);
    const c1=ca.clubs1.find(x=>x.tm===st.dlC1)||ca.clubs1[0],c2=ca.clubs2.find(x=>x.tm===st.dlC2)||ca.clubs2[0];
    if(!c1||!c2){ask("Kulüp posteri için iki tarafta da seçilebilir kulüp olmalı.");render();return true}
    mkImg("duello-kulup",{name:`${c1.tm}-vs-${c2.tm}`,me,opp,c1,c2,mode});
    return true;
  }
  return false;
}

if(typeof window!=="undefined"&&window.addEventListener){
  window.addEventListener("online",()=>{
    const cfg=duelLoadCfg();
    if(cfg.room&&cfg.room.length>=6&&(st.duelPendingPush||cfg.auto!==false)){
      duelPush(true).then(ok=>{if(ok&&st.tab==5&&st.ht=="d")duelPull(true).then(()=>render())});
    }
  });
}

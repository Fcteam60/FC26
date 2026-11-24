/* ==========================================================================
   FC 27 Grup Ligi — coop.js · v23.7
   İzole 2 Kişilik Online Ortak Turnuva (Co-op Oda) Modülü
   - Tek kişilik IndexedDB / JSON yedeğe hiç dokunmaz
   - Çakışmasız 2 düğümlü Firebase mimarisi (/rooms/{room}/host.json & guest.json)
   - 4 Format: Gruplu, 36T Şampiyonlar Ligi, Puan Ligi, Direkt Eleme
   - Yan yana detaylı kıyas, TOTS, Puan Durumu, Eleme Ağacı & Ortak Kupa Geçmişi
   ========================================================================== */

const COOP_CFG_K="fc27lig_coop_cfg";
const COOP_HOST_UID="u_cphost01";
const COOP_GUEST_UID="u_cpguest1";
const coopRoomKey=r=>String(r||"").trim().toLowerCase().replace(/[^a-z0-9_-]/g,"");
const COOP_CACHE_K="fc27lig_coop_cache";
const COOP_TPL=[
  ["Dünya Kupası","32 takım · 8×4",{N:32,gs:4,q:2,gl:1,kl:1,fl:1}],
  ["Klasik 64","64 takım · 8×8",{N:64,gs:8,q:2,gl:1,kl:1,fl:1}],
  ["Mini Lig","16 takım · 4×4",{N:16,gs:4,q:2,gl:1,kl:1,fl:1}],
  ["Şampiyonlar Ligi","36 takım · 8 maç + PO",{N:36,gs:36,q:24,gl:1,kl:2,fl:1,ucl:1}],
  ["Puan Ligi","16 takım · Tek/Çift devre",{N:16,gs:16,q:0,gl:1,kl:1,fl:1,lg:1}],
  ["Direkt Eleme","16 takım · Eleme",{N:16,gs:0,q:0,gl:1,kl:1,fl:1}]
];

function coopLoadCfg(){
  let c=null;
  try{c=JSON.parse(localStorage.getItem(COOP_CFG_K)||"null")}catch(e){}
  if(!c||typeof c!=="object")c={};
  const dcfg=typeof duelLoadCfg==="function"?duelLoadCfg():{};
  return{
    room:String(c.room||"").trim().toUpperCase().replace(/[^A-Z0-9-]/g,"").slice(0,16),
    role:c.role==="guest"?"guest":c.role==="host"?"host":"",
    name:String(c.name||dcfg.name||"").trim().slice(0,20)
  };
}
function coopSaveCfg(c){
  try{localStorage.setItem(COOP_CFG_K,JSON.stringify({room:c.room||"",role:c.role||"",name:c.name||""}))}catch(e){}
}
function coopLoadCache(){
  let c=null;
  try{c=JSON.parse(localStorage.getItem(COOP_CACHE_K)||"null")}catch(e){}
  if(!c||typeof c!=="object")return{room:"",host:null,guest:null,lastSync:0};
  return{room:String(c.room||""),host:c.host||null,guest:c.guest||null,lastSync:+c.lastSync||0};
}
function coopSaveCache(c){
  try{localStorage.setItem(COOP_CACHE_K,JSON.stringify(c))}catch(e){}
}
function coopHasRoom(){
  const c=coopLoadCfg();
  return !!(c.room&&c.room.length>=5&&c.role);
}
function coopBaseUrl(){
  const dcfg=typeof duelLoadCfg==="function"?duelLoadCfg():{};
  return typeof duelBaseUrl==="function"?duelBaseUrl(dcfg):"https://fc27ligvs-default-rtdb.europe-west1.firebasedatabase.app";
}
function coopNormRoom(raw){
  let s=String(raw||"").trim().toUpperCase().replace(/[^A-Z0-9-]/g,"");
  if(!s)return "";
  if(!s.startsWith("CP-"))s="CP-"+s.replace(/^CP-?/,"");
  return s.slice(0,14);
}
function coopGenCode(){
  const ch="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out="CP-";
  for(let i=0;i<6;i++)out+=ch[(Math.random()*ch.length)|0];
  return out;
}
function coopMkTour(no,prev){
  const cfg=prev&&prev.cfg?cp(prev.cfg):{N:32,gs:4,q:2,gl:1,kl:1,fl:1};
  const rl=prev&&prev.rl?cp(prev.rl):{rg:"all",xc:[],gmin:0,gmax:99,amin:0,mmin:0,dmin:0,cap:0,gcap:1,pick:"top",dm:"pot"};
  fixC(cfg);
  return{
    id:Date.now(),no:no||1,name:"Ortak Sezon "+(no||1),date:today(),
    phase:"setup",cfg,rl,P:null,G:null,ucl:null,
    hTi:null,gTi:null,
    sim:{m:0,w:0,gm:nob(),ko:nob(),sc:nob(),as:nob(),mom:nob()},
    gqs:nob(),hMt:[],res:null
  };
}

/* ---------- FIREBASE SYNC (Düello kuralıyla %100 uyumlu 2 düğüm: u_cphost01 & u_cpguest1) ---------- */
async function coopPushHost(hostObj){
  const cfg=coopLoadCfg();
  if(!cfg.room||cfg.role!=="host")return false;
  if(typeof navigator!=="undefined"&&navigator.onLine===false){
    st.cpErr="Çevrimdışısın — ortak oda sunucuya yazılamadı.";return false;
  }
  hostObj.uid=COOP_HOST_UID;
  if(!hostObj.name)hostObj.name=cfg.name||"Kurucu";
  hostObj.ut=Date.now();
  if(!hostObj.car||typeof hostObj.car!=="object")hostObj.car={n:0,m:0};
  const rk=coopRoomKey(cfg.room);
  const url=`${coopBaseUrl()}/rooms/${encodeURIComponent(rk)}/${COOP_HOST_UID}.json`;
  try{
    const r=await duelFetch(url,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(hostObj)});
    if(!r.ok)throw new Error("HTTP "+r.status);
    const cache=coopLoadCache();cache.room=cfg.room;cache.host=hostObj;cache.lastSync=Date.now();coopSaveCache(cache);
    st.cpErr="";return true;
  }catch(e){
    st.cpErr="Sunucuya yazılamadı ("+(e&&e.message?e.message:"ağ hatası")+").";
    return false;
  }
}
async function coopPushGuest(guestObj){
  const cfg=coopLoadCfg();
  if(!cfg.room||cfg.role!=="guest")return false;
  if(typeof navigator!=="undefined"&&navigator.onLine===false){
    st.cpErr="Çevrimdışısın — verin sunucuya yazılamadı.";return false;
  }
  guestObj.uid=COOP_GUEST_UID;
  if(!guestObj.name)guestObj.name=cfg.name||"Misafir";
  guestObj.ut=Date.now();
  if(!guestObj.car||typeof guestObj.car!=="object")guestObj.car={n:0,m:0};
  const rk=coopRoomKey(cfg.room);
  const url=`${coopBaseUrl()}/rooms/${encodeURIComponent(rk)}/${COOP_GUEST_UID}.json`;
  try{
    const r=await duelFetch(url,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(guestObj)});
    if(!r.ok)throw new Error("HTTP "+r.status);
    const cache=coopLoadCache();cache.room=cfg.room;cache.guest=guestObj;cache.lastSync=Date.now();coopSaveCache(cache);
    st.cpErr="";return true;
  }catch(e){
    st.cpErr="Sunucuya yazılamadı ("+(e&&e.message?e.message:"ağ hatası")+").";
    return false;
  }
}
async function coopPull(silent){
  const cfg=coopLoadCfg();
  if(!cfg.room)return false;
  if(typeof navigator!=="undefined"&&navigator.onLine===false){
    if(!silent)st.cpErr="Çevrimdışısın — önbellekteki son durum gösteriliyor.";
    return false;
  }
  if(!silent){st.cpBusy=true;render()}
  const rk=coopRoomKey(cfg.room);
  const url=`${coopBaseUrl()}/rooms/${encodeURIComponent(rk)}.json?t=${Date.now()}`;
  try{
    const r=await duelFetch(url,{cache:"no-store"});
    if(!r.ok)throw new Error("HTTP "+r.status);
    const data=await r.json();
    const hData=data&&(data[COOP_HOST_UID]||data.host)||null;
    const gData=data&&(data[COOP_GUEST_UID]||data.guest)||null;
    if(!hData){
      if(!silent)st.cpErr="Bu oda kodu bulunamadı. Kodu kontrol et.";
      st.cpBusy=false;return false;
    }
    const cache={room:cfg.room,host:hData,guest:gData,lastSync:Date.now()};
    coopSaveCache(cache);
    st.cpErr="";st.cpBusy=false;st.cpLastAuto=Date.now();
    return true;
  }catch(e){
    if(!silent)st.cpErr="Oda güncellenemedi ("+(e&&e.message?e.message:"ağ hatası")+").";
    st.cpBusy=false;return false;
  }
}

/* ---------- FIREBASE RTDB SEYREK/BOŞ DİZİ NORMALİZASYONU (v23.2) ---------- */
function coopToArr(v){
  if(Array.isArray(v))return v;
  if(!v||typeof v!=="object")return [];
  const out=[],ks=Object.keys(v).map(k=>+k).filter(n=>Number.isInteger(n)&&n>=0);
  if(!ks.length)return [];
  const mx=Math.max(...ks);
  for(let i=0;i<=mx;i++)out[i]=v[i]!==undefined?v[i]:null;
  return out;
}
function coopDenseArr(v){
  return coopToArr(v).filter(x=>x!=null);
}
function coopNormMt(list){
  return coopDenseArr(list).map(m=>{
    if(!m||typeof m!=="object")return null;
    m.gls=coopDenseArr(m.gls);
    m.og=coopDenseArr(m.og);
    return m;
  }).filter(Boolean);
}
function coopNormSim(t){
  if(!t||typeof t!=="object")return;
  if(t.P)t.P=coopDenseArr(t.P);
  if(t.G)t.G=coopDenseArr(t.G).map(g=>coopDenseArr(g));
  if(t.ucl&&typeof t.ucl==="object"){
    t.ucl.pots=coopDenseArr(t.ucl.pots).map(pt=>coopDenseArr(pt));
    t.ucl.fx=coopToArr(t.ucl.fx).map(rnd=>coopDenseArr(rnd).map(pr=>coopDenseArr(pr)).filter(pr=>pr.length>=2));
  }
  if(!t.gqs||typeof t.gqs!=="object")t.gqs=nob();
  else{
    const ng=nob();
    Object.keys(t.gqs).forEach(k=>{ng[k]=coopDenseArr(t.gqs[k])});
    t.gqs=ng;
  }
  const sim=t.sim&&typeof t.sim==="object"?t.sim:{m:0,w:0,gm:nob(),ko:nob(),sc:nob(),as:nob(),mom:nob()};
  sim.m=+sim.m||0;sim.w=+sim.w||0;
  // Normalize sim.gm (Firebase strips empty weeks [] and turns sparse weeks into objects {"1":[...]})
  const ngm=nob();
  if(sim.gm&&typeof sim.gm==="object"){
    Object.keys(sim.gm).forEach(gi=>{
      const rawWks=coopToArr(sim.gm[gi]);
      ngm[gi]=rawWks.map(wk=>{
        if(!wk)return [];
        return coopDenseArr(wk).map(m=>{
          const a=coopToArr(m);
          if(a.length<4)return null;
          return [a[0],a[1],+a[2]||0,+a[3]||0,coopDenseArr(a[4]),coopDenseArr(a[5]),coopDenseArr(a[6]),coopDenseArr(a[7])];
        }).filter(Boolean);
      });
    });
  }
  sim.gm=ngm;
  // Normalize sim.ko (restore s1, s2, a1, a2, leg1, leg2 stripped by Firebase)
  const nko=nob();
  if(sim.ko&&typeof sim.ko==="object"){
    Object.keys(sim.ko).forEach(rd=>{
      nko[rd]=coopDenseArr(sim.ko[rd]).map(p=>{
        if(!p||typeof p!=="object")return null;
        p.s1=coopDenseArr(p.s1);p.s2=coopDenseArr(p.s2);
        p.a1=coopDenseArr(p.a1);p.a2=coopDenseArr(p.a2);
        p.leg1=p.leg1?coopToArr(p.leg1):null;
        p.leg2=p.leg2?coopToArr(p.leg2):null;
        return p;
      }).filter(Boolean);
    });
  }
  sim.ko=nko;
  if(!sim.sc||typeof sim.sc!=="object")sim.sc=nob();
  if(!sim.as||typeof sim.as!=="object")sim.as=nob();
  if(!sim.mom||typeof sim.mom!=="object")sim.mom=nob();
  t.sim=sim;
  t.hMt=coopNormMt(t.hMt);
}

/* ---------- MERGED CO-OP STATE & DETERMINISTIC 2-PLAYER SCHEDULE ---------- */
function coopState(){
  const cfg=coopLoadCfg(),cache=coopLoadCache();
  if(!cfg.room||!cache.host||cache.room!==cfg.room)return null;
  const host=cache.host,guest=cache.guest||null,t=host.cur;
  if(!t)return null;
  coopNormSim(t);
  if(guest&&guest.mt)guest.mt=coopNormMt(guest.mt);
  if(host.hist&&!Array.isArray(host.hist))host.hist=coopDenseArr(host.hist);
  const role=cfg.role||"host";
  const hName=host.name||"Kurucu";
  const gName=(guest&&guest.name)||"Misafir";
  const validGuest=!!(guest&&guest.tourId===t.id);
  const hTi=t.hTi!=null&&T[t.hTi]?t.hTi:null;
  const gTi=(t.gTi!=null&&T[t.gTi])?t.gTi:(validGuest&&guest.ti!=null&&T[guest.ti]&&(!Array.isArray(t.P)||t.P.includes(guest.ti))?guest.ti:null);
  const myTi=role==="host"?hTi:gTi;
  const opTi=role==="host"?gTi:hTi;
  const hMt=t.hMt;
  const gMtRaw=validGuest&&Array.isArray(guest.mt)?guest.mt:[];
  const gMt=gMtRaw.filter(m=>m&&!m.h2h);
  if(hTi!=null&&gTi!=null){
    hMt.filter(m=>m&&m.h2h).forEach(m=>{
      const st0=m.stats||{};
      const mirSt=m.stats?{
        myPos:st0.oppPos,oppPos:st0.myPos,myPass:st0.oppPass,oppPass:st0.myPass,
        myShots:st0.oppShots,oppShots:st0.myShots,mySot:st0.oppSot,oppSot:st0.mySot,
        myXg:st0.oppXg,oppXg:st0.myXg
      }:null;
      gMt.push({
        id:m.id,rd:m.rd,w:m.w,lg:m.lg||0,opp:hTi,on:T[hTi].n,
        gf:+m.ga||0,ga:+m.gf||0,et:m.et?1:0,
        pf:m.pa!=null?+m.pa:null,pa:m.pf!=null?+m.pf:null,
        gls:Array.isArray(m.og)?m.og.map(o=>({sc:o.sc,as:o.as||""})):[],
        og:Array.isArray(m.gls)?m.gls.map(g=>({sc:g.sc,as:g.as||""})):[],
        mom:m.gMom||"",omom:m.mom||"",stats:mirSt,h2h:1,dt:m.dt||""
      });
    });
  }
  const sim=t.sim||{m:0,w:0,gm:nob(),ko:nob(),sc:nob(),as:nob(),mom:nob()};
  if(!sim.gm)sim.gm=nob();if(!sim.ko)sim.ko=nob();if(!sim.sc)sim.sc=nob();if(!sim.as)sim.as=nob();if(!sim.mom)sim.mom=nob();
  t.sim=sim;
  return{cfg,host,guest,t,role,hName,gName,hTi,gTi,myTi,opTi,hMt,gMt,myMt:role==="host"?hMt:gMt,hist:Array.isArray(host.hist)?host.hist:[],lastSync:cache.lastSync||0};
}

function coopRoundPairs(t,gi,w){
  if(!t||!t.G)return [];
  if(isUcl(t.cfg)&&t.ucl&&Array.isArray(t.ucl.fx))return Array.isArray(t.ucl.fx[w-1])?t.ucl.fx[w-1]:[];
  const g=t.G[gi];if(!g||g.length<2)return [];
  const rnds=circleRounds(g,t.cfg.gl===2);
  return rnds[w-1]||[];
}
function coopTeamSched(t,ti){
  if(!t||!t.G||ti==null)return [];
  const totW=totWeeks(t.cfg);
  if(!totW)return [];
  if(isUcl(t.cfg)&&t.ucl&&Array.isArray(t.ucl.fx)){
    const out=[];
    t.ucl.fx.forEach((rnd,wi)=>{
      const pr=(rnd||[]).find(p=>p[0]===ti||p[1]===ti);
      if(pr)out.push({w:wi+1,gi:0,opp:pr[0]===ti?pr[1]:pr[0],home:pr[0]===ti});
    });
    return out;
  }
  const gi=t.G.findIndex(g=>g.includes(ti));
  if(gi<0)return [];
  const rnds=circleRounds(t.G[gi],t.cfg.gl===2),out=[];
  for(let wi=0;wi<rnds.length;wi++){
    const pr=(rnds[wi]||[]).find(p=>p[0]===ti||p[1]===ti);
    if(pr)out.push({w:wi+1,gi,opp:pr[0]===ti?pr[1]:pr[0],home:pr[0]===ti});
  }
  return out;
}
function coopFindGrpMatch(mt,w,opp){
  return (mt||[]).find(m=>m&&m.rd==="Grup"&&((m.w!=null&&m.w===w)||(m.w==null&&m.opp===opp)))||null;
}

function coopCalcTable(S,gi){
  const t=S.t,g=(t.G&&t.G[gi])||[],tbl=nob();
  g.forEach(ti=>{tbl[ti]={ti,o:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0}});
  const addM=(t1,t2,g1,g2)=>{
    const r1=tbl[t1],r2=tbl[t2];
    if(r1){r1.o++;r1.gf+=g1;r1.ga+=g2;r1.gd=r1.gf-r1.ga;if(g1>g2){r1.w++;r1.pts+=3}else if(g1===g2){r1.d++;r1.pts+=1}else r1.l++}
    if(r2){r2.o++;r2.gf+=g2;r2.ga+=g1;r2.gd=r2.gf-r2.ga;if(g2>g1){r2.w++;r2.pts+=3}else if(g1===g2){r2.d++;r2.pts+=1}else r2.l++}
  };
  if(S.hTi!=null&&g.includes(S.hTi)){
    S.hMt.filter(m=>m&&m.rd==="Grup"&&m.opp!=null&&g.includes(m.opp)).forEach(m=>{addM(S.hTi,m.opp,+m.gf||0,+m.ga||0)});
  }
  if(S.gTi!=null&&g.includes(S.gTi)){
    S.gMt.filter(m=>m&&m.rd==="Grup"&&!m.h2h&&m.opp!=null&&m.opp!==S.hTi&&g.includes(m.opp)).forEach(m=>{addM(S.gTi,m.opp,+m.gf||0,+m.ga||0)});
  }
  const gSim=coopToArr(t.sim&&t.sim.gm&&t.sim.gm[gi]);
  gSim.forEach(wkList=>{
    if(Array.isArray(wkList))wkList.forEach(arr=>{
      if(Array.isArray(arr)&&arr.length>=4)addM(arr[0],arr[1],+arr[2]||0,+arr[3]||0);
    });
  });
  return g.map(ti=>tbl[ti]).sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf||(isUcl(t.cfg)?(b.w-a.w):0)||V(T[b.ti])-V(T[a.ti]));
}

function coopSyncKo(S){
  const t=S.t;if(isLg(t.cfg)||!t.G)return;
  const ko=t.sim.ko||(t.sim.ko=nob()),RDs=rds(t.cfg).filter(r=>r!=="Grup");
  const getMsFor=(ti,opp,rd)=>{
    const src=ti===S.hTi?S.hMt:(ti===S.gTi?S.gMt:[]);
    return src.filter(m=>m&&m.rd===rd&&m.opp===opp).sort((a,b)=>(+a.lg||0)-(+b.lg||0)||(a.id||0)-(b.id||0));
  };
  for(let rIdx=0;rIdx<RDs.length;rIdx++){
    const rd=RDs[rIdx],pairs=ko[rd];
    if(!Array.isArray(pairs)||!pairs.length)break;
    const needLegs=lgs(t.cfg,rd);
    pairs.forEach(p=>{
      const hasH=S.hTi!=null&&(p.t1===S.hTi||p.t2===S.hTi);
      const hasG=S.gTi!=null&&(p.t1===S.gTi||p.t2===S.gTi);
      if(!hasH&&!hasG)return;
      const actor=hasH?S.hTi:S.gTi;
      const opp=p.t1===actor?p.t2:p.t1,isT1=p.t1===actor;
      if(opp==null||!T[opp])return;
      const ms=getMsFor(actor,opp,rd);
      const uSc=[],uAs=[],oSc=[],oAs=[];
      ms.forEach(m=>{
        (m.gls||[]).forEach(g=>{if(g&&g.sc&&!isKK(g.sc)){uSc.push(g.sc);uAs.push(g.as&&!isKK(g.as)?g.as:"")}});
        (m.og||[]).forEach(o=>{if(o&&o.sc&&!isKK(o.sc)){oSc.push(o.sc);oAs.push(o.as&&!isKK(o.as)?o.as:"")}});
      });
      p.s1=isT1?uSc:oSc;p.s2=isT1?oSc:uSc;
      p.a1=isT1?uAs:oAs;p.a2=isT1?oAs:uAs;
      if(needLegs===2){
        const m1=ms[0],m2=ms[1];
        p.leg1=m1?(isT1?[+m1.gf||0,+m1.ga||0]:[+m1.ga||0,+m1.gf||0]):null;
        p.leg2=m2?(isT1?[+m2.gf||0,+m2.ga||0]:[+m2.ga||0,+m2.gf||0]):null;
      }
      if(ms.length>=needLegs){
        const myGf=ms.reduce((a,m)=>a+(+m.gf||0),0),myGa=ms.reduce((a,m)=>a+(+m.ga||0),0);
        const last=ms[ms.length-1];
        p.g1=isT1?myGf:myGa;p.g2=isT1?myGa:myGf;p.et=last.et?1:0;
        if(myGf===myGa&&last.pf!=null&&last.pa!=null&&last.pf!==last.pa){
          p.pf=isT1?last.pf:last.pa;p.pa=isT1?last.pa:last.pf;
          p.w=last.pf>last.pa?actor:opp;
        }else if(myGf!==myGa){
          p.pf=null;p.pa=null;p.w=myGf>myGa?actor:opp;
        }else{p.pf=null;p.pa=null;p.w=null}
      }else if(p.w!=null||p.g1!=null||p.g2!=null){
        p.g1=null;p.g2=null;p.et=0;p.pf=null;p.pa=null;p.w=null;
      }
    });
    if(isUcl(t.cfg)&&rd==="Play-Off"&&rIdx+1<RDs.length){
      const r16=ko[RDs[rIdx+1]];
      if(Array.isArray(r16)&&r16.length===pairs.length){
        for(let i=0;i<pairs.length;i++)if(r16[i]&&r16[i].w==null)r16[i].t2=pairs[i].w!=null?pairs[i].w:null;
      }
      continue;
    }
    if(!pairs.every(p=>p.w!=null)){
      for(let k=rIdx+1;k<RDs.length;k++){
        const nxt=ko[RDs[k]];
        if(Array.isArray(nxt)&&nxt.every(x=>x&&x.w==null))delete ko[RDs[k]];
      }
    }
    if(pairs.every(p=>p.w!=null)&&rIdx+1<RDs.length){
      const nextRd=RDs[rIdx+1];
      if(!Array.isArray(ko[nextRd])||!ko[nextRd].length){
        const nextP=[];
        for(let i=0;i<pairs.length;i+=2)if(pairs[i+1])nextP.push({t1:pairs[i].w,t2:pairs[i+1].w,l1:"",l2:"",g1:null,g2:null,et:0,pf:null,pa:null,w:null,s1:[],s2:[],a1:[],a2:[]});
        if(nextP.length)ko[nextRd]=nextP;
      }else{
        for(let i=0;i<pairs.length;i+=2){
          const np=ko[nextRd][i/2];
          if(np&&pairs[i+1]&&np.w==null){np.t1=pairs[i].w;np.t2=pairs[i+1].w}
        }
      }
    }
  }
}

function coopInitKo(S,forceReset){
  const t=S.t;if(isLg(t.cfg)||!t.G)return;
  if(forceReset)t.sim.ko=nob();
  if(isUcl(t.cfg)){
    if(!Array.isArray(t.sim.ko["Play-Off"])||!t.sim.ko["Play-Off"].length){
      const ub=buildUclBracket(t);
      if(ub){t.sim.ko["Play-Off"]=ub.po;t.sim.ko["Son 16"]=ub.r16}
    }
  }else{
    const RDs=rds(t.cfg).filter(r=>r!=="Grup"),firstRd=RDs[0];
    if(firstRd&&(!Array.isArray(t.sim.ko[firstRd])||!t.sim.ko[firstRd].length)){
      const initP=buildInitialKoPairs(t);
      if(initP.length)t.sim.ko[firstRd]=initP;
    }
  }
  coopSyncKo(S);
}

function coopHasKo(t){
  return !!(t&&t.sim&&t.sim.ko&&Object.values(t.sim.ko).some(a=>Array.isArray(a)&&a.length>0));
}

function coopPendingGrpFor(S,ti){
  const t=S.t;if(!t||!t.G||ti==null)return [];
  const totW=totWeeks(t.cfg);if(!totW)return [];
  const mt=ti===S.hTi?S.hMt:S.gMt;
  const other=ti===S.hTi?S.gTi:S.hTi;
  return coopTeamSched(t,ti)
    .filter(sc=>!coopFindGrpMatch(mt,sc.w,sc.opp))
    .map(sc=>({rd:"Grup",w:sc.w,opp:sc.opp,home:sc.home,lg:0,L:1,h2h:sc.opp===other}));
}

function coopAllHumanGrpDone(S){
  const totW=totWeeks(S.t.cfg);
  if(!totW)return true;
  return coopPendingGrpFor(S,S.hTi).length===0&&coopPendingGrpFor(S,S.gTi).length===0;
}

function coopMaybeFinalizeGrp(S){
  const t=S.t,totW=totWeeks(t.cfg);
  if(totW<=0||isLg(t.cfg)||(t.sim.w||0)<totW||!coopAllHumanGrpDone(S)||coopHasKo(t))return false;
  const qMax=isUcl(t.cfg)?24:(t.cfg.q||2);
  t.gqs=nob();
  (t.G||[]).forEach((g,gi)=>{t.gqs[gi]=coopCalcTable(S,gi).slice(0,qMax).map(r=>r.ti)});
  coopInitKo(S,true);
  return true;
}

function coopNextActionFor(S,ti,reqW){
  const t=S.t;if(!t.G||ti==null)return null;
  const mt=ti===S.hTi?S.hMt:S.gMt;
  const totW=totWeeks(t.cfg);
  if(totW>0&&!coopHasKo(t)){
    const pend=coopPendingGrpFor(S,ti);
    if(pend.length){
      if(reqW){const f=pend.find(x=>x.w===+reqW);if(f)return f}
      // Prefer a playable non-H2H match by default if user is Guest (or if H2H is postponed)
      if(ti===S.gTi){return pend.find(x=>!x.h2h)||pend[0]}
      return pend[0];
    }
    if(!coopAllHumanGrpDone(S)||(t.sim.w||0)<totW)return null;
  }
  if(isLg(t.cfg))return null;
  if(totW>0&&!coopHasKo(t))return null;
  coopSyncKo(S);
  const RDs=rds(t.cfg).filter(r=>r!=="Grup");
  for(const rd of RDs){
    const pairs=(t.sim.ko&&t.sim.ko[rd])||[];
    const p=pairs.find(x=>x&&(x.t1===ti||x.t2===ti));
    if(!p)continue;
    if(p.w!=null){
      if(p.w!==ti)return null;
      continue;
    }
    const opp=p.t1===ti?p.t2:p.t1;
    if(opp==null||!T[opp])return{rd,waitPo:true};
    const L=lgs(t.cfg,rd);
    const doneMs=mt.filter(m=>m&&m.rd===rd&&m.opp===opp);
    if(doneMs.length<L){
      return{rd,w:0,opp,home:p.t1===ti,lg:L>1?doneMs.length+1:0,L,pv:doneMs,h2h:opp===(ti===S.hTi?S.gTi:S.hTi)};
    }
    return null;
  }
  return null;
}

// Can current user undo their very last match? (Safe in async mode as long as KO hasn't started / next KO round isn't played!)
function coopCanUndoLast(S){
  const t=S.t;if(!t||t.phase!=="play")return null;
  const rawList=S.role==="host"?S.hMt:((S.guest&&S.guest.tourId===t.id&&Array.isArray(S.guest.mt))?S.guest.mt:[]);
  if(!rawList.length)return null;
  const last=rawList[rawList.length-1];
  if(!last)return null;
  if(last.rd==="Grup"){
    if(coopHasKo(t))return null;
    return last;
  }
  const RDs=rds(t.cfg).filter(r=>r!=="Grup"),ri=RDs.indexOf(last.rd);
  if(ri>=0&&RDs.slice(ri+1).some(rd=>Array.isArray(t.sim.ko[rd])&&t.sim.ko[rd].some(p=>p&&p.w!=null)))return null;
  return last;
}


function coopIsEliminated(S,ti){
  const t=S.t;if(!t||!t.G||ti==null||isLg(t.cfg)||!coopHasKo(t))return false;
  coopSyncKo(S);
  const RDs=rds(t.cfg).filter(r=>r!=="Grup");
  let seen=false;
  for(const rd of RDs){
    const pairs=(t.sim.ko&&t.sim.ko[rd])||[];
    const p=pairs.find(x=>x&&(x.t1===ti||x.t2===ti));
    if(!p)continue;
    seen=true;
    if(p.w!=null&&p.w!==ti)return true;
  }
  return !seen;
}

function coopOutcome(S){
  const t=S.t;if(!t.G)return null;
  const totW=totWeeks(t.cfg);
  if(isLg(t.cfg)){
    if((t.sim.w||0)<totW||!coopAllHumanGrpDone(S))return null;
    const rows=coopCalcTable(S,0);if(!rows.length)return null;
    const ch=rows[0].ti,ru=rows[1]?rows[1].ti:null;
    const stOf=ti=>{
      const rk=rows.findIndex(r=>r.ti===ti)+1;
      const pts=rk>0?rows[rk-1].pts:0;
      const stv=rk===1?7:rk===2?6:rk===3?5:rk<=Math.ceil(t.cfg.N/2)?4:0;
      return{rk,pts,st:stv};
    };
    const h=stOf(S.hTi),g=stOf(S.gTi);
    return{done:true,lg:true,ch,ru,hSt:h.st,gSt:g.st,hRk:h.rk,gRk:g.rk,hPts:h.pts,gPts:g.pts};
  }
  coopSyncKo(S);
  const RDs=rds(t.cfg).filter(r=>r!=="Grup");
  const finalRd=RDs[RDs.length-1],fp=t.sim.ko&&t.sim.ko[finalRd]&&t.sim.ko[finalRd][0];
  if(!fp||fp.w==null)return null;
  const ch=fp.w,ru=fp.w===fp.t1?fp.t2:fp.t1;
  const stOf=ti=>{
    let rk=null,pts=null,stv=0;
    if(t.cfg.gs&&ti!=null){
      const gi=t.G.findIndex(grp=>grp.includes(ti));
      if(gi>=0){const rows=coopCalcTable(S,gi),ix=rows.findIndex(r=>r.ti===ti);if(ix>=0){rk=ix+1;pts=rows[ix].pts}}
    }
    if(ch===ti)stv=7;
    else if(ru===ti)stv=6;
    else{
      for(const rd of RDs){
        const m=(t.sim.ko[rd]||[]).find(p=>p&&(p.t1===ti||p.t2===ti));
        if(m&&m.w!=null&&m.w!==ti){
          if(rd==="Play-Off"){stv=2;break}
          const kNum=+Object.keys(RN).find(k=>RN[k]===rd);
          stv=RKM[kNum]||0;break;
        }
      }
    }
    return{rk,pts,st:stv};
  };
  const h=stOf(S.hTi),g=stOf(S.gTi);
  return{done:true,lg:false,ch,ru,hSt:h.st,gSt:g.st,hRk:h.rk,gRk:g.rk,hPts:h.pts,gPts:g.pts};
}

/* ---------- CO-OP UNIFIED STATS, TOTS, MANAGER COMPARISON & POSTER ADAPTER ---------- */
function coopTourneyStats(S){
  const t=S.t,sim=t.sim,P=nob(),TM=nob(),matches=[];
  const ent=(n,ti)=>{if(!n||isKK(n)||ti==null||!T[ti])return null;const k=nz(n)+"|"+ti;return P[k]=P[k]||{n,ti,g:0,a:0,mom:0,ht:0,mine:ti===S.hTi,guest:ti===S.gTi}};
  const tm=ti=>TM[ti]=TM[ti]||{ti,o:0,w:0,d:0,l:0,gf:0,ga:0,cs:0};
  const addM=(t1,t2,g1,g2,rd)=>{
    if(!T[t1]||!T[t2])return;
    const a=tm(t1),b=tm(t2);a.o++;b.o++;a.gf+=g1;a.ga+=g2;b.gf+=g2;b.ga+=g1;
    if(g2===0)a.cs++;if(g1===0)b.cs++;
    if(g1>g2){a.w++;b.l++}else if(g1<g2){b.w++;a.l++}else{a.d++;b.d++}
    matches.push({t1,t2,g1,g2,rd});
  };
  const hat=(names,ti)=>{const c=nob();names.forEach(n=>{if(n&&!isKK(n))c[n]=(c[n]||0)+1});Object.entries(c).forEach(([n,v])=>{if(v>=3){const e=ent(n,ti);if(e)e.ht++}})};
  const nmOf=(ti,list)=>{const sq=squadOf(ti);return (Array.isArray(list)?list:[]).map(v=>typeof v==="number"?(sq[v]&&sq[v].n):v)};

  Object.values(sim.gm||{}).forEach(wk=>Array.isArray(wk)&&wk.forEach(ms=>Array.isArray(ms)&&ms.forEach(m=>{
    if(!Array.isArray(m)||m.length<4)return;
    addM(m[0],m[1],+m[2]||0,+m[3]||0,isUcl(t.cfg)?"Lig Aşaması":isLg(t.cfg)?"Lig":"Grup");
    if(m.length>=6){
      const n1=nmOf(m[0],m[4]),n2=nmOf(m[1],m[5]),a1=nmOf(m[0],m[6]),a2=nmOf(m[1],m[7]);
      n1.forEach(n=>{const e=ent(n,m[0]);if(e)e.g++});n2.forEach(n=>{const e=ent(n,m[1]);if(e)e.g++});
      a1.forEach(n=>{const e=ent(n,m[0]);if(e)e.a++});a2.forEach(n=>{const e=ent(n,m[1]);if(e)e.a++});
      hat(n1,m[0]);hat(n2,m[1]);
      const mk=pickSimMom(m[0],m[1],+m[2]||0,+m[3]||0,m[4],m[5],m[6],m[7]);
      if(mk){const sp=mk.lastIndexOf("|");const e=ent(mk.slice(0,sp),+mk.slice(sp+1));if(e)e.mom++}
    }
  })));
  Object.entries(sim.ko||{}).forEach(([rd,pairs])=>Array.isArray(pairs)&&pairs.forEach(p=>{
    if(!p||p.w==null||p.t1===S.hTi||p.t2===S.hTi||p.t1===S.gTi||p.t2===S.gTi)return;
    const n1=nmOf(p.t1,p.s1),n2=nmOf(p.t2,p.s2),a1=nmOf(p.t1,p.a1),a2=nmOf(p.t2,p.a2);
    n1.forEach(n=>{const e=ent(n,p.t1);if(e)e.g++});n2.forEach(n=>{const e=ent(n,p.t2);if(e)e.g++});
    a1.forEach(n=>{const e=ent(n,p.t1);if(e)e.a++});a2.forEach(n=>{const e=ent(n,p.t2);if(e)e.a++});
    if(Array.isArray(p.leg1)&&Array.isArray(p.leg2)&&p.leg1.length>=2&&p.leg2.length>=2){
      const l1a=+p.leg1[0]||0,l1b=+p.leg1[1]||0;
      addM(p.t1,p.t2,l1a,l1b,rd+" (1. Maç)");addM(p.t1,p.t2,+p.leg2[0]||0,+p.leg2[1]||0,rd+" (2. Maç)");
      hat(n1.slice(0,l1a),p.t1);hat(n1.slice(l1a),p.t1);hat(n2.slice(0,l1b),p.t2);hat(n2.slice(l1b),p.t2);
      const ps1=Array.isArray(p.s1)?p.s1:[],ps2=Array.isArray(p.s2)?p.s2:[],pa1=Array.isArray(p.a1)?p.a1:[],pa2=Array.isArray(p.a2)?p.a2:[];
      const m1=pickSimMom(p.t1,p.t2,l1a,l1b,ps1.slice(0,l1a),ps2.slice(0,l1b),pa1.slice(0,l1a),pa2.slice(0,l1b));
      const m2=pickSimMom(p.t1,p.t2,+p.leg2[0]||0,+p.leg2[1]||0,ps1.slice(l1a),ps2.slice(l1b),pa1.slice(l1a),pa2.slice(l1b));
      [m1,m2].forEach(mk=>{if(mk){const sp=mk.lastIndexOf("|");const e=ent(mk.slice(0,sp),+mk.slice(sp+1));if(e)e.mom++}});
    }else{
      addM(p.t1,p.t2,+p.g1||0,+p.g2||0,rd);hat(n1,p.t1);hat(n2,p.t2);
      const mk=pickSimMom(p.t1,p.t2,+p.g1||0,+p.g2||0,p.s1,p.s2,p.a1,p.a2);
      if(mk){const sp=mk.lastIndexOf("|");const e=ent(mk.slice(0,sp),+mk.slice(sp+1));if(e)e.mom++}
    }
  }));
  const addHumanMatch=(meTi,m)=>{
    if(meTi==null||m.opp==null||!T[meTi]||!T[m.opp])return;
    const rLbl=m.rd==="Grup"?(isUcl(t.cfg)?"Lig Aşaması":isLg(t.cfg)?"Lig":"Grup"):m.rd;
    addM(meTi,m.opp,+m.gf||0,+m.ga||0,rLbl+(m.lg?" ("+m.lg+". Maç)":""));
    const gls=Array.isArray(m.gls)?m.gls:[];
    gls.forEach(g=>{if(!g||!g.sc)return;const e=ent(g.sc,meTi);if(e)e.g++;if(g.as){const a=ent(g.as,meTi);if(a)a.a++}});
    hat(gls.map(g=>g&&g.sc),meTi);
    const og=Array.isArray(m.og)?m.og:[];
    og.forEach(o=>{if(!o||!o.sc)return;const e=ent(o.sc,m.opp);if(e)e.g++;if(o.as){const a=ent(o.as,m.opp);if(a)a.a++}});
    hat(og.map(o=>o&&o.sc),m.opp);
    if(m.mom){const e=ent(m.mom,meTi);if(e)e.mom++}
    else if(m.gMom&&m.h2h){const e=ent(m.gMom,m.opp);if(e)e.mom++}
    else if(m.h2h){
      const gf=+m.gf||0,ga=+m.ga||0;
      const winH=gf>ga||(gf===ga&&m.pf!=null&&m.pa!=null&&m.pf>m.pa);
      const winG=ga>gf||(gf===ga&&m.pf!=null&&m.pa!=null&&m.pa>m.pf);
      const pTi=winH?meTi:winG?m.opp:(gls.length>=og.length?meTi:m.opp);
      const pGls=pTi===meTi?gls:og;
      const om=pickOppMom(pTi,pGls,pTi===meTi?ga:gf,pTi===meTi?gf:ga);
      if(om){const e=ent(om,pTi);if(e)e.mom++}
    }else{
      const om=m.omom||pickOppMom(m.opp,og,+m.gf||0,+m.ga||0);
      if(om){const e=ent(om,m.opp);if(e)e.mom++}
    }
  };
  S.hMt.forEach(m=>addHumanMatch(S.hTi,m));
  S.gMt.filter(m=>m&&!m.h2h&&m.opp!==S.hTi).forEach(m=>addHumanMatch(S.gTi,m));

  const players=Object.values(P);
  players.forEach(p=>{p.ga=p.g+p.a;p.mvp=+(p.g*3+p.a*2+p.mom*4+p.ht*1.5).toFixed(1)});
  const teams=Object.values(TM),totG=matches.reduce((a,m)=>a+m.g1+m.g2,0);
  const by=(fn,n)=>players.filter(p=>fn(p)>0).sort((a,b)=>fn(b)-fn(a)||b.g-a.g||b.a-a.a||TR_CMP(a.n,b.n)).slice(0,n||10);
  const topScore=matches.slice().sort((a,b)=>(b.g1+b.g2)-(a.g1+a.g2)||Math.abs(b.g1-b.g2)-Math.abs(a.g1-a.g2))[0]||null;
  return{
    mCnt:matches.length,totG,avgG:matches.length?totG/matches.length:0,players,teams,
    scorers:by(p=>p.g,12),assists:by(p=>p.a,12),gaList:by(p=>p.ga,12),moms:by(p=>p.mom,10),
    mvpList:players.filter(p=>p.mvp>0).sort((a,b)=>b.mvp-a.mvp||b.g-a.g||b.a-a.a).slice(0,10),
    hatTricks:players.filter(p=>p.ht>0).sort((a,b)=>b.ht-a.ht||b.g-a.g),
    bestAtk:teams.filter(x=>x.o>0).sort((a,b)=>b.gf/b.o-a.gf/a.o||b.gf-a.gf)[0]||null,
    bestDef:teams.filter(x=>x.o>0).sort((a,b)=>a.ga/a.o-b.ga/b.o||b.cs-a.cs)[0]||null,
    topScore
  };
}

function coopMgrStats(mt){
  let w=0,d=0,l=0,gf=0,ga=0,cs=0,xg=0,oxg=0,xgN=0,pos=0,posN=0,sh=0,shN=0;
  (mt||[]).forEach(m=>{
    if(!m)return;
    const r=mres(m);if(r==="w")w++;else if(r==="d")d++;else l++;
    gf+=+m.gf||0;ga+=+m.ga||0;if((+m.ga||0)===0)cs++;
    const st0=m.stats;
    if(st0){
      if(st0.myXg!=null&&st0.oppXg!=null){xg+=+st0.myXg;oxg+=+st0.oppXg;xgN++}
      if(st0.myPos!=null){pos+=+st0.myPos;posN++}
      if(st0.myShots!=null){sh+=+st0.myShots;shN++}
    }
  });
  const m=w+d+l,pts=w*3+d;
  return{
    m,w,d,l,gf,ga,gd:gf-ga,cs,pts,
    wr:m?Math.round(w/m*1000)/10:null,
    ppm:m?Math.round(pts/m*100)/100:null,
    gpm:m?Math.round(gf/m*100)/100:null,
    gapm:m?Math.round(ga/m*100)/100:null,
    csPct:m?Math.round(cs/m*1000)/10:null,
    xgM:xgN?Math.round(xg/xgN*100)/100:null,
    oxgM:xgN?Math.round(oxg/xgN*100)/100:null,
    xg,oxg,xgN,
    posM:posN?Math.round(pos/posN):null,
    shM:shN?Math.round(sh/shN*10)/10:null,
    dna:typeof calcTacticalDNA==="function"?calcTacticalDNA(null,{career:true,matches:mt}):null
  };
}

function coopAsPosterSeason(S){
  coopSyncKo(S);
  const t=S.t,st2=coopTourneyStats(S);
  const hGrp=S.hMt.filter(m=>m&&m.rd==="Grup").length;
  const gGrp=S.gMt.filter(m=>m&&m.rd==="Grup").length;
  const hasTbl=(t.sim&&t.sim.w>0)||hGrp>0||gGrp>0;
  const maxW=Math.max((t.sim&&t.sim.w)||0,hGrp,gGrp);
  return Object.assign({},t,{
    my:S.hTi,
    mt:S.hMt,
    _coop:true,
    _gTi:S.gTi,
    _gMt:S.gMt,
    _hName:S.hName,
    _gName:S.gName,
    _st2:st2,
    _hasTbl:hasTbl,
    _maxW:maxW,
    _out:coopOutcome(S),
    _calcTbl:gi=>coopCalcTable(S,gi)
  });
}

function coopHistSummary(S){
  const hist=S.hist||[];
  let hCh=0,gCh=0,aiCh=0,hw=0,hd=0,gw=0,hgf=0,ggf=0;
  let hm=0,hwTot=0,hdTot=0,hlTot=0,hgfTot=0,hgaTot=0,hcs=0;
  let gm=0,gwTot=0,gdTot=0,glTot=0,ggfTot=0,ggaTot=0,gcs=0;
  const scorers=nob(),mvps=nob();
  hist.forEach(x=>{
    if(x.ch===x.hTi&&x.hSt===7)hCh++;
    else if(x.ch===x.gTi&&x.gSt===7)gCh++;
    else if(x.ch!=null)aiCh++;
    if(x.h2h){hw+=x.h2h.hw||0;hd+=x.h2h.d||0;gw+=x.h2h.gw||0;hgf+=x.h2h.hgf||0;ggf+=x.h2h.ggf||0}
    if(x.hStat){const a=x.hStat;hwTot+=a.w||0;hdTot+=a.d||0;hlTot+=a.l||0;hm+=(a.w||0)+(a.d||0)+(a.l||0);hgfTot+=a.gf||0;hgaTot+=a.ga||0;hcs+=a.cs||0}
    if(x.gStat){const b=x.gStat;gwTot+=b.w||0;gdTot+=b.d||0;glTot+=b.l||0;gm+=(b.w||0)+(b.d||0)+(b.l||0);ggfTot+=b.gf||0;ggaTot+=b.ga||0;gcs+=b.cs||0}
    if(x.topG&&x.topG.n){const k=nz(x.topG.n);const o=scorers[k]=scorers[k]||{n:x.topG.n,cnt:0,g:0,ti:x.topG.ti};o.cnt++;o.g+=+x.topG.g||0}
    if(x.mvp&&x.mvp.n){const k=nz(x.mvp.n);const o=mvps[k]=mvps[k]||{n:x.mvp.n,cnt:0,ti:x.mvp.ti};o.cnt++}
  });
  const topS=Object.values(scorers).sort((a,b)=>b.cnt-a.cnt||b.g-a.g)[0]||null;
  const topM=Object.values(mvps).sort((a,b)=>b.cnt-a.cnt)[0]||null;
  return{
    cnt:hist.length,hName:S.hName,gName:S.gName,room:S.cfg.room,
    hCh,gCh,aiCh,
    h2h:{hw,d:hd,gw,hgf,ggf,tot:hw+hd+gw},
    h:{m:hm,w:hwTot,d:hdTot,l:hlTot,gf:hgfTot,ga:hgaTot,cs:hcs,wr:hm?Math.round(hwTot/hm*1000)/10:null,ppm:hm?Math.round((hwTot*3+hdTot)/hm*100)/100:null,gpm:hm?Math.round(hgfTot/hm*100)/100:null,gapm:hm?Math.round(hgaTot/hm*100)/100:null},
    g:{m:gm,w:gwTot,d:gdTot,l:glTot,gf:ggfTot,ga:ggaTot,cs:gcs,wr:gm?Math.round(gwTot/gm*1000)/10:null,ppm:gm?Math.round((gwTot*3+gdTot)/gm*100)/100:null,gpm:gm?Math.round(ggfTot/gm*100)/100:null,gapm:gm?Math.round(ggaTot/gm*100)/100:null},
    topS,topM,hist:hist.slice().reverse()
  };
}

/* ---------- CO-OP MATCH ENTRY MODAL (HOST & GUEST) ---------- */
function coopOpenMatchModal(act){
  st.cpErr="";
  st.cpM={
    rd:act.rd,w:act.w||0,opp:act.opp,home:!!act.home,lg:act.lg||0,L:act.L||1,
    h2h:!!act.h2h,pv:act.pv||[],gf:0,ga:0,mu:0,mp:0,mpf:0,mpa:0,
    gls:[],og:[],mom:"",gMom:"",adv:false,mst:defMst()
  };
}
function coopEnsureArr(arr,n){
  while(arr.length<n)arr.push({sc:"",as:""});
  if(arr.length>n)arr.length=n;
}
function coopMatchDlg(S){
  const m=st.cpM;if(!S||!m||S.myTi==null||m.opp==null||!T[m.opp])return "";
  const meTi=S.myTi,opTi=m.opp,isKO=m.rd!=="Grup";
  const totF=(m.pv||[]).reduce((a,x)=>a+(+x.gf||0),0)+m.gf;
  const totA=(m.pv||[]).reduce((a,x)=>a+(+x.ga||0),0)+m.ga;
  const isDeciding=isKO&&(m.L===1||(m.L>1&&m.lg===m.L&&(m.pv||[]).length>=m.L-1));
  const canP=isDeciding&&(m.L===1?m.gf===m.ga:totF===totA);
  if(!isDeciding&&m.mu)m.mu=0;
  if(!canP&&m.mp){m.mp=0;m.mpf=0;m.mpa=0}
  coopEnsureArr(m.gls,m.gf);
  if(m.h2h)coopEnsureArr(m.og,m.ga);
  const sqOpts=(ti,curV)=>{
    const L=squadOf(ti);
    return `<option value="">Seçiniz</option><option value="KK" ${curV==="KK"?"selected":""}>Kendi Kalesine (KK)</option>`+
      ["F","M","D","K"].map(g=>{const G=L.filter(p=>p.g==g);return G.length?`<optgroup label="${SQL[g]}">${G.map(p=>`<option value="${esc(p.n)}" ${curV===p.n?"selected":""}>${esc(p.n)} · ${p.p}</option>`).join("")}</optgroup>`:""}).join("");
  };
  const asOpts=(ti,curV,scV)=>{
    const L=squadOf(ti);
    return `<option value="">Asist yok</option>`+
      ["F","M","D","K"].map(g=>{const G=L.filter(p=>p.g==g&&nz(p.n)!==nz(scV||""));return G.length?`<optgroup label="${SQL[g]}">${G.map(p=>`<option value="${esc(p.n)}" ${curV===p.n?"selected":""}>${esc(p.n)} · ${p.p}</option>`).join("")}</optgroup>`:""}).join("");
  };
  const glBlock=(label,ti,arr,side)=>{
    if(!arr.length)return "";
    return `<div class="cp-gblk"><div class="pset-lbl">${label} (${arr.length})</div>`+arr.map((g,idx)=>
      `<div class="cp-grow"><span>${idx+1}.</span><select class="sel" data-cpgs="${side}:${idx}">${sqOpts(ti,g.sc)}</select>`+
      (g.sc&&!isKK(g.sc)?`<select class="sel" data-cpga="${side}:${idx}">${asOpts(ti,g.as,g.sc)}</select>`:"")+`</div>`
    ).join("")+`</div>`;
  };
  const momSel=()=>{
    if(m.h2h){
      const curKey=m.mom?("h:"+m.mom):m.gMom?("g:"+m.gMom):"";
      const tmOpts=(ti,pref)=>{
        const L=squadOf(ti);
        return `<optgroup label="${esc(T[ti].n)}">${L.map(p=>`<option value="${pref}:${esc(p.n)}" ${curKey===pref+":"+p.n?"selected":""}>${esc(p.n)} · ${p.p}</option>`).join("")}</optgroup>`;
      };
      return `<div class="rr" style="margin-top:6px"><span class="lb">Maçın Adamı (MOTM)</span><select id="cpmom" class="sel" style="flex:1"><option value="">Otomatik</option>${tmOpts(meTi,"h")}${tmOpts(opTi,"g")}</select></div>`;
    }
    const L=squadOf(meTi);
    const opts=["F","M","D","K"].map(g=>{const G=L.filter(p=>p.g==g);return G.length?`<optgroup label="${SQL[g]}">${G.map(p=>`<option value="h:${esc(p.n)}" ${m.mom===p.n?"selected":""}>${esc(p.n)} · ${p.p}</option>`).join("")}</optgroup>`:""}).join("");
    return `<div class="rr" style="margin-top:6px"><span class="lb">Maçın Adamı (MOTM)</span><select id="cpmom" class="sel" style="flex:1"><option value="">Otomatik</option>${opts}</select></div>`;
  };
  const rdTitle=m.rd==="Grup"?(isUcl(S.t.cfg)?`ŞL ${m.w}. Hafta`:isLg(S.t.cfg)?`Lig ${m.w}. Hafta`:`Grup ${m.w}. Hafta`):(m.rd+(m.lg?` · ${m.lg}. Maç`:""));
  const mst=m.mst||defMst();
  const advHtml=m.adv?`<div class="cp-adv">`+
    [["myPos","oppPos","Topla Oynama (%)","50"],["myShots","oppShots","Toplam Şut","10"],["mySot","oppSot","İsabetli Şut","5"],["myXg","oppXg","Gol Beklentisi (xG)","1.4"]].map(([k1,k2,lb,ph])=>
      `<div class="cp-arow"><input id="cpmst_${k1}" class="f" type="text" inputmode="decimal" placeholder="${ph}" data-cpmst="${k1}" value="${esc(mst[k1]||"")}"><span>${lb}</span><input id="cpmst_${k2}" class="f" type="text" inputmode="decimal" placeholder="${ph}" data-cpmst="${k2}" value="${esc(mst[k2]||"")}"></div>`
    ).join("")+`</div>`:"";

  return `<div class="dlg"><button class="tibk" data-a="cpclose" aria-label="Kapat"></button><div class="sheet tisheet" role="dialog" aria-modal="true">`+
    `<div class="qh"><span class="rs">${m.h2h?"🤝 Doğrudan Düello · ":""}${esc(rdTitle)}</span><button class="mb sc-ic" data-a="cpclose" aria-label="Kapat">✕</button></div>`+(st.cpErr?`<div class="pgmath dead" style="margin:6px 0 8px">${esc(st.cpErr)}</div>`:"")+
    `<div class="msc" style="margin:8px 0 10px">`+
      `<div><div class="lb">${badge(meTi,24)} ${esc(T[meTi].n)}</div><div class="ct"><button class="mb" data-a="cpmg" data-d="-1">−</button><b class="sc2">${m.gf}</b><button class="mb" data-a="cpmg" data-d="1">+</button></div></div>`+
      `<b>–</b>`+
      `<div><div class="lb">${badge(opTi,24)} ${esc(T[opTi].n)}</div><div class="ct"><button class="mb" data-a="cpmo" data-d="-1">−</button><b class="sc2">${m.ga}</b><button class="mb" data-a="cpmo" data-d="1">+</button></div></div>`+
    `</div>`+
    (isKO&&m.L>1&&(m.pv||[]).length?`<div class="cp-agg"><span>1. Maç: <b>${(m.pv[0].gf||0)}–${(m.pv[0].ga||0)}</b></span><i>·</i><span>Toplam: <b>${totF}–${totA}</b></span></div>`:"")+
    (isDeciding?`<div class="cw" style="justify-content:center;margin:4px 0 8px"><button class="chip ${m.mu?"on":""}" data-a="cpmu">Uzatma (UZ)</button>${canP?`<button class="chip ${m.mp?"on":""}" data-a="cpmp">Penaltılar (P)</button>`:""}</div>`:"")+
    (isKO&&canP&&m.mp?`<div class="gq" style="margin:0 0 10px"><div class="lb" style="text-align:center;margin-bottom:4px">Penaltı skoru</div><div class="msc" style="margin:4px 0"><div><div class="lb">${esc(T[meTi].n)}</div><div class="ct"><button class="mb" data-a="cpmpf" data-d="-1">−</button><b style="font-size:26px;font-family:var(--num);min-width:26px">${m.mpf||0}</b><button class="mb" data-a="cpmpf" data-d="1">+</button></div></div><b>P</b><div><div class="lb">${esc(T[opTi].n)}</div><div class="ct"><button class="mb" data-a="cpmpa" data-d="-1">−</button><b style="font-size:26px;font-family:var(--num);min-width:26px">${m.mpa||0}</b><button class="mb" data-a="cpmpa" data-d="1">+</button></div></div></div></div>`:"")+
    glBlock(T[meTi].n+" Golleri",meTi,m.gls,"h")+
    (m.h2h?glBlock(T[opTi].n+" Golleri",opTi,m.og,"g"):"")+
    momSel()+
    `<button class="pset-link" data-a="cpmadv" style="margin-top:8px"><span>${m.adv?"xG ve Maç İstatistiklerini Gizle":"xG, Şut ve Topla Oynama Ekle (Opsiyonel)"}</span><span>${m.adv?"▴":"▾"}</span></button>`+
    advHtml+
    `<div class="bar" style="margin-top:12px"><button class="btn p pset-pri" data-a="cpmsave" style="flex:1">Maçı Kaydet ve Gönder</button><button class="btn pset-sec" data-a="cpclose">Vazgeç</button></div>`+
  `</div></div>`;
}

/* ---------- CO-OP SCREENS ---------- */
function coopLobbyView(){
  const cfg=coopLoadCfg();
  const dname=cfg.name||(typeof duelLoadCfg==="function"?duelLoadCfg().name:"");
  const hVal=st.cpHName!==undefined?st.cpHName:dname;
  const gVal=st.cpGName!==undefined?st.cpGName:dname;
  const cVal=st.cpCode||"";
  return `<div class="su-hero cp-hero"><div class="su-htop"><span class="ph-ey"><i class="ph-dot"></i>2 KİŞİLİK ORTAK TURNUVA</span><button class="chip backpill" data-a="cpexit">‹ Bireysel Mod</button></div><h2>Arkadaşınla Aynı Turnuvada Oyna</h2><p>İkiniz aynı grupta, ligde ya da 36 takımlı Şampiyonlar Ligi’nde yarışın. Herkes kendi maçını girsin, kalan maçları simülasyon oynatsın.</p></div>`+
  (st.cpErr?`<div class="pgmath dead" style="margin-bottom:10px">${esc(st.cpErr)}</div>`:"")+
  psetCard("trophy","emr","1 · Yeni Ortak Oda Kur","Kurucu olarak turnuvayı aç ve oda kodunu arkadaşına gönder","Kurucu",
    `<div class="su-fld" style="margin-bottom:10px"><label for="cp_hname">Senin Adın</label><input id="cp_hname" class="f" maxlength="20" placeholder="Örn: Emre" value="${esc(hVal)}"></div>`+
    `<button class="btn p pset-pri" data-a="cpcreate" style="width:100%">${UICO.spark}<span>Ortak Oda Oluştur</span></button>`
  )+
  psetCard("radar","sky","2 · Mevcut Odaya Katıl","Arkadaşının oda kodunu gir veya Kurucu olarak odana geri dön",st.cpJoinRole==="host"?"Kurucu":"Misafir",
    `<div class="stabs seg2" style="margin-bottom:10px" role="tablist" aria-label="Katılım rolü">`+
      `<button class="chip ${st.cpJoinRole!=="host"?"on":""}" role="tab" aria-selected="${st.cpJoinRole!=="host"}" data-a="cpjrole" data-v="guest">Misafir Katıl</button>`+
      `<button class="chip ${st.cpJoinRole==="host"?"on":""}" role="tab" aria-selected="${st.cpJoinRole==="host"}" data-a="cpjrole" data-v="host">Kurucu Geri Dön</button>`+
    `</div>`+
    `<div class="su-fgrid" style="margin-bottom:10px">`+
      `<div class="su-fld"><label for="cp_gname">Senin Adın</label><input id="cp_gname" class="f" maxlength="20" placeholder="${st.cpJoinRole==="host"?"Örn: Emre":"Örn: Bekir"}" value="${esc(gVal)}"></div>`+
      `<div class="su-fld"><label for="cp_code">Oda Kodu</label><input id="cp_code" class="f" maxlength="14" placeholder="CP-XXXXXX" value="${esc(cVal)}" style="text-transform:uppercase"></div>`+
    `</div>`+
    `<button class="btn p" data-a="cpjoin" style="width:100%">${st.cpJoinRole==="host"?"Kurucu Olarak Odama Bağlan":"Odaya Misafir Olarak Katıl"}</button>`
  )+
  `<div class="note">Ortak Turnuva verileri bireysel kariyerinden tamamen ayrı tutulur; cihazındaki yerel sezonlara ve yedeklere hiç dokunmaz.</div>`;
}

function coopSetupView(S){
  const t=S.t,c=t.cfg,r=t.rl;
  if(S.role!=="host"){
    return psetCard("sliders","sky","Turnuva Kurulumu Bekleniyor",`${esc(S.hName)} turnuva formatını seçiyor`,"Misafir",
      `<div class="note" style="margin:0 0 10px">Kurucu (${esc(S.hName)}) turnuva formatını onayladığında buradan takımını seçebileceksin.</div>`+
      `<button class="btn p pset-pri" data-a="cpref" style="width:100%">Durumu Yenile</button>`
    );
  }
  const tplMatch=p=>{const q=p[2];return !!q.ucl===isUcl(c)&&!!q.lg===isLg(c)&&(isUcl(c)||isLg(c)||(c.N===q.N&&(c.gs||0)===(q.gs||0)))};
  const segBtn=(k,v,l,on)=>`<button class="chip ${on?"on":""}" data-a="cpcfg" data-k="${k}" data-v="${v}">${l}</button>`;
  const A=avail(t),ok=A>=c.N;
  const tplHtml=`<div class="su-tpl">${COOP_TPL.map((p,idx)=>`<button class="su-tcard${p[2].ucl?" ucl":""}${tplMatch(p)?" on":""}" data-a="cptpl" data-v="${idx}"><span class="su-tic">${TPLI[idx%TPLI.length]}</span><span class="su-tm"><b>${p[0]}</b><small>${p[1]}</small></span></button>`).join("")}</div>`;
  let extra="";
  if(isLg(c)){
    extra=`<div class="su-mgrid" style="margin-top:10px"><div class="su-mrow"><span>Takım</span><div class="stabs" style="grid-template-columns:repeat(4,1fr)">${[8,12,16,20].map(n=>segBtn("N",n,n,c.N===n)).join("")}</div></div><div class="su-mrow"><span>Devre</span><div class="stabs seg2">${segBtn("gl",1,"1 Devre",c.gl===1)}${segBtn("gl",2,"2 Devre",c.gl===2)}</div></div></div>`;
  }else if(isUcl(c)){
    extra=`<div class="ucl-note" style="margin-top:10px"><b>Gerçek 36 Takımlı UEFA Formatı:</b> 4 torba, 8 maç (4 EV / 4 DEP), İlk 8 doğrudan Son 16, 9–24 Play-Off.</div>`+
      `<div class="su-mgrid"><div class="su-mrow"><span>Play-Off & Eleme</span><div class="stabs seg2">${segBtn("kl",1,"Tek maç",c.kl===1)}${segBtn("kl",2,"Çift maç",c.kl===2)}</div></div><div class="su-mrow"><span>Final</span><div class="stabs seg2">${segBtn("fl",1,"Tek maç",c.fl===1)}${segBtn("fl",2,"Çift maç",c.fl===2)}</div></div></div>`;
  }else if(!c.gs){
    extra=`<div class="su-mgrid" style="margin-top:10px"><div class="su-mrow"><span>Takım</span><div class="stabs seg3">${[8,16,32].map(n=>segBtn("N",n,n,c.N===n)).join("")}</div></div><div class="su-mrow"><span>Eleme</span><div class="stabs seg2">${segBtn("kl",1,"Tek maç",c.kl===1)}${segBtn("kl",2,"Çift maç",c.kl===2)}</div></div><div class="su-mrow"><span>Final</span><div class="stabs seg2">${segBtn("fl",1,"Tek maç",c.fl===1)}${segBtn("fl",2,"Çift maç",c.fl===2)}</div></div></div>`;
  }else{
    extra=`<div class="su-mgrid" style="margin-top:10px"><div class="su-mrow"><span>Grup</span><div class="stabs seg2">${segBtn("gl",1,"Tek maç",c.gl===1)}${segBtn("gl",2,"Çift maç",c.gl===2)}</div></div><div class="su-mrow"><span>Eleme</span><div class="stabs seg2">${segBtn("kl",1,"Tek maç",c.kl===1)}${segBtn("kl",2,"Çift maç",c.kl===2)}</div></div><div class="su-mrow"><span>Final</span><div class="stabs seg2">${segBtn("fl",1,"Tek maç",c.fl===1)}${segBtn("fl",2,"Çift maç",c.fl===2)}</div></div></div>`;
  }
  const poolBar=`<div class="su-mgrid" style="margin-top:10px"><div class="su-mrow"><span>Bölge</span><div class="stabs seg2"><button class="chip ${r.rg==="all"?"on":""}" data-a="cprl" data-k="rg" data-v="all">Tümü</button><button class="chip ${r.rg==="eu"?"on":""}" data-a="cprl" data-k="rg" data-v="eu">Avrupa</button></div></div></div>`;
  return psetCard("sliders","emr",`${esc(t.name)} · Kurulum`,"4 formattan birini seç ve arkadaşınla takım seçimine geç",`${c.N} takım`,
    tplHtml+extra+poolBar+
    `<div class="note" style="margin:10px 0">${fmt(c)} · Havuz: <b>${A}/${c.N}</b> kulüp</div>`+
    `<button class="btn p pset-pri" data-a="cplock" ${ok?"":"disabled"} style="width:100%">Kurulumu Onayla ve Takım Seçimine Geç ›</button>`
  );
}

function coopPickView(S){
  const t=S.t,P=(t.P||[]).slice().sort((a,b)=>V(T[b])-V(T[a]));
  const opPick=S.opTi;
  const bothReady=S.hTi!=null&&S.gTi!=null;
  const statusCard=`<div class="cp-pstatus">`+
    `<div class="cp-ps me${S.hTi!=null?" ok":""}"><span>${esc(S.hName)} (Kurucu)</span><b>${S.hTi!=null?`${badge(S.hTi,20)} ${esc(T[S.hTi].n)}`:"Seçmedi"}</b></div>`+
    `<div class="cp-ps op${S.gTi!=null?" ok":""}"><span>${esc(S.gName)} (Misafir)</span><b>${S.gTi!=null?`${badge(S.gTi,20)} ${esc(T[S.gTi].n)}`:"Seçmedi"}</b></div>`+
  `</div>`;
  const q=nz(st.cpQ||"");
  const filtered=q?P.filter(i=>nz(T[i].n).includes(q)||nz(CN[T[i].c][0]).includes(q)):P;
  const grid=`<div class="cp-tgrid">${filtered.map(i=>{
    const isH=i===S.hTi,isG=i===S.gTi,takenByOp=i===opPick;
    return `<button class="cp-tbtn${isH?" is-h":""}${isG?" is-g":""}${takenByOp?" dis":""}" data-a="cppick" data-i="${i}" ${takenByOp?"disabled":""}>`+
      `${badge(i,26)}<span class="n">${esc(T[i].n)}</span>${isH?`<em class="cp-tg h">K</em>`:isG?`<em class="cp-tg g">M</em>`:""}${rb(T[i].g)}`+
    `</button>`;
  }).join("")}</div>`;
  const actions=S.role==="host"
    ? `<div class="bar" style="margin:10px 0 0"><button class="btn p pset-pri" data-a="cpdraw" ${bothReady?"":"disabled"} style="flex:1">${UICO.spark}<span>${bothReady?"Kurayı Çek ve Turnuvayı Başlat":"İki Oyuncunun Seçimi Bekleniyor"}</span></button><button class="btn pset-sec" data-a="cpref">Yenile</button></div><button class="btn pset-sec" data-a="cpbacksetup" style="width:100%;margin-top:7px">‹ Kuruluma Dön (Formatı Değiştir)</button>`
    : `<div class="bar" style="margin:10px 0 0"><button class="btn p pset-pri" data-a="cpref" style="flex:1">Kurayı Kontrol Et / Yenile</button></div>`;
  return psetCard("shield","gold","Takım Seçimi",`${esc(t.name)} · İkiniz de kendi takımınızı seçin`,`${P.length} kulüp`,
    statusCard+
    `<div class="bar" style="margin:8px 0"><input id="cp_q" class="f" placeholder="Takım ara..." value="${esc(st.cpQ||"")}" style="flex:1"><button class="btn pset-sec" data-a="cprnd">🎲 Rastgele</button></div>`+
    actions+`<div style="margin-top:10px">${grid}</div>`
  );
}

function coopPlayView(S){
  const t=S.t,sub=st.cpTab||"genel";
  if(S.hTi==null||S.gTi==null||!T[S.hTi]||!T[S.gTi]){
    return psetCard("sliders","sky","Oda Verisi Eksik","Takım bilgileri henüz tam senkronize olmadı","Bekleniyor",
      `<div class="note" style="margin:0 0 10px">Oda durumunu yenilemek için aşağıdaki düğmeye dokun.</div>`+
      `<button class="btn p pset-pri" data-a="cpref" style="width:100%">↻ Durumu Yenile</button>`
    );
  }
  const totW=totWeeks(t.cfg),simW=t.sim.w||0,lg=isLg(t.cfg),ucl=isUcl(t.cfg);
  const out=coopOutcome(S);
  const inGrpStage=totW>0&&!coopHasKo(t);
  const hPend=inGrpStage?coopPendingGrpFor(S,S.hTi):[],gPend=inGrpStage?coopPendingGrpFor(S,S.gTi):[];
  const myPend=S.role==="host"?hPend:gPend;
  const reqW=inGrpStage&&st.cpPickW?st.cpPickW:0;
  const myAct=coopNextActionFor(S,S.myTi,reqW);
  const hAct=coopNextActionFor(S,S.hTi),gAct=coopNextActionFor(S,S.gTi);

  const tabs=[["genel","Genel"],["tablo",!t.cfg.gs?"Eşleşmeler":"Tablo"],["fikstur","Fikstür"],["kiyas","Kıyas & TOTS"],["gecmis","Kupa Geçmişi"]];
  const tabBar=`<div class="ptabs htabs6" style="margin:0 0 10px" role="tablist">${tabs.map(([k,l])=>`<button class="chip ${sub===k?"on":""}" role="tab" aria-selected="${sub===k}" data-a="cptab" data-v="${k}">${l}</button>`).join("")}</div>`;

  let body="";
  if(sub==="genel"){
    let heroBody="";
    if(out&&out.done){
      const endAction=S.role==="host"
        ? (t.phase!=="done"
            ? `<button class="btn p cta" data-a="cpfin" style="width:100%;margin-top:10px">${UICO.trophy}<span>Turnuvayı Sonlandır ve Ortak Arşive Kaydet</span></button>`
            : `<button class="btn p pset-pri" data-a="cpnew" style="width:100%;margin-top:10px">${UICO.spark}<span>Yeni Ortak Sezon Başlat</span></button>`)
        : (t.phase!=="done"
            ? `<div class="pgmath info" style="margin-top:10px">Kurucu (${esc(S.hName)}) turnuvayı ortak arşive kaydettiğinde yeni sezona geçilecek.</div><button class="btn pset-sec" data-a="cpref" style="width:100%;margin-top:6px">↻ Durumu Yenile</button>`
            : `<div class="pgmath ok" style="margin-top:10px">✓ Ortak arşive kaydedildi · Kurucu (${esc(S.hName)}) yeni sezonu açtığında burada görünecek.</div><button class="btn pset-sec" data-a="cpref" style="width:100%;margin-top:6px">↻ Yeni Sezonu Kontrol Et</button>`);
      heroBody=`<div class="cp-done"><span class="cp-trp">${UICO.trophy}</span><div><b>Şampiyon: ${esc(T[out.ch].n)}</b><small>${out.ch===S.hTi?`${esc(S.hName)} kupayı kaldırdı!`:out.ch===S.gTi?`${esc(S.gName)} kupayı kaldırdı!`:"Yapay zekâ kulübü şampiyon oldu."}</small></div></div>`+endAction;
    }else{
      let readyStrip="";
      if(inGrpStage){
        const hDoneCnt=totW-hPend.length,gDoneCnt=totW-gPend.length;
        readyStrip=`<div class="cp-ready">`+
          `<span class="cp-rd${hPend.length===0?" ok":""}">${esc(S.hName)}: ${hDoneCnt}/${totW} Maç${hPend.length===0?" ✓":""}</span>`+
          `<span class="cp-rd${gPend.length===0?" ok":""}">${esc(S.gName)}: ${gDoneCnt}/${totW} Maç${gPend.length===0?" ✓":""}</span>`+
        `</div>`;
      }else{
        const hEl=coopIsEliminated(S,S.hTi),gEl=coopIsEliminated(S,S.gTi);
        const hReady=!hEl&&(!hAct||hAct.waitPo),gReady=!gEl&&(!gAct||gAct.waitPo);
        readyStrip=`<div class="cp-ready">`+
          `<span class="cp-rd${hReady?" ok":""}">${esc(S.hName)}: ${hEl?"Elendi":hReady?"✓ Hazır":hAct.h2h?"🤝 H2H Maçı":"Maç bekliyor"}</span>`+
          `<span class="cp-rd${gReady?" ok":""}">${esc(S.gName)}: ${gEl?"Elendi":gReady?"✓ Hazır":gAct.h2h?"🤝 Kurucu girecek":"Maç bekliyor"}</span>`+
        `</div>`;
      }
      // Flexible Schedule Picker (only in Group/League/UCL stage when player has 2+ remaining matches!)
      let pickStrip="";
      if(inGrpStage&&myPend.length>1){
        const curW=myAct?myAct.w:0;
        pickStrip=`<div class="cp-fpick"><div class="cp-fph"><span>İstediğin sırayla oyna (müsait olmayan H2H maçını erteleyebilirsin)</span></div><div class="cp-fprow">${myPend.map(m=>`<button class="cp-fpbtn${m.w===curW?" on":""}${m.h2h?" h2h":""}" data-a="cppickw" data-v="${m.w}"><b>H${m.w}</b><span>${m.h2h?"🤝 ":""}${esc(T[m.opp].n)}</span></button>`).join("")}</div></div>`;
      }
      let myCard="";
      if(myAct&&!myAct.waitPo){
        const rdL=myAct.rd==="Grup"?`${myAct.w}. Hafta`:(myAct.rd+(myAct.lg?` · ${myAct.lg}. Maç`:""));
        if(myAct.h2h&&S.role==="guest"){
          myCard=`<div class="pgmath info" style="margin:8px 0">🤝 <b>${esc(rdL)} · Doğrudan Karşılaşma:</b> ${esc(T[S.hTi].n)} vs ${esc(T[S.gTi].n)} maçını müsait olduğunuzda Kurucu (${esc(S.hName)}) girecek.${myPend.some(x=>!x.h2h)?" Bu arada yukarıdan diğer maçlarını oynayabilirsin!":""}</div>`;
        }else{
          myCard=`<div class="cp-vs"><div class="cp-vtm">${badge(S.myTi,40)}<b>${esc(T[S.myTi].n)}</b><small>${T[S.myTi].g} GEN</small></div><div class="cp-vmid"><span>${esc(rdL)}</span><b>VS</b></div><div class="cp-vtm">${badge(myAct.opp,40)}<b>${esc(T[myAct.opp].n)}</b><small>${T[myAct.opp].g} GEN</small></div></div>`+
            `<button class="btn p pset-pri" data-a="cpmopen" data-v="${myAct.w||0}" style="width:100%;margin-top:8px">${uiIco("ball")}<span>${myAct.h2h?"🤝 Doğrudan Düello Skorunu Gir":`${rdL} Skorunu Gir`}</span></button>`;
        }
      }else if(myAct&&myAct.waitPo){
        myCard=`<div class="pgmath info" style="margin:8px 0">✓ İlk 8’desin · Play-Off rakibin bekleniyor.</div>`;
      }else if(inGrpStage&&!coopAllHumanGrpDone(S)){
        const remOp=S.role==="host"?gPend.length:hPend.length;
        myCard=`<div class="pgmath ok" style="margin:8px 0">✓ Tüm grup/lig maçlarını tamamladın · ${esc(S.role==="host"?S.gName:S.hName)} için kalan ${remOp} maç bekleniyor.</div>`;
      }else if(inGrpStage&&simW>=totW&&!lg){
        myCard=`<div class="pgmath ok" style="margin:8px 0">✓ Tüm lig/grup maçları tamamlandı · Eleme ağacı kurulmaya hazır!</div>`;
      }else if(coopIsEliminated(S,S.myTi)){
        myCard=`<div class="pgmath warn" style="margin:8px 0">${uiIco("trophy")}<span>Elendin · Turnuva devam ediyor, kalan turları Fikstür’den takip edebilirsin.</span></div>`;
      }else{
        myCard=`<div class="pgmath ok" style="margin:8px 0">✓ Bu turdaki maçın tamamlandı.</div>`;
      }
      const undoM=coopCanUndoLast(S);
      const undoBtn=undoM?`<button class="btn pset-sec" data-a="cpmundo" style="width:100%;margin-top:6px">↩ Son Girdiğim Maçı Sil (${esc(undoM.on)} ${undoM.gf}–${undoM.ga})</button>`:"";
      let hostSim="";
      if(S.role==="host"){
        if(inGrpStage&&simW<totW){
          hostSim=`<button class="btn p" data-a="cpsimw" style="width:100%;margin-top:8px">${UICO.bolt}<span>${simW+1}. Hafta Diğer (YZ) Maçlarını Simüle Et</span></button>`;
        }else if(inGrpStage&&simW>=totW&&!lg){
          if(coopAllHumanGrpDone(S)){
            hostSim=`<button class="btn p cta" data-a="cpbuildko" style="width:100%;margin-top:8px">${UICO.trophy}<span>Eleme Ağacını Kur</span></button>`;
          }else{
            const totRem=hPend.length+gPend.length-hPend.filter(x=>x.h2h).length;
            hostSim=`<div class="pgmath info" style="margin-top:8px">Diğer tüm YZ maçları simüle edildi (${totW}/${totW}) · Eleme ağacı kalan ${totRem} oyuncu maçı girilince otomatik kurulacak.</div>`;
          }
        }else if(!lg){
          coopInitKo(S,false);
          const RDs=rds(t.cfg).filter(r=>r!=="Grup");
          const activeRd=RDs.find(rd=>Array.isArray(t.sim.ko[rd])&&t.sim.ko[rd].some(p=>p.w==null));
          if(activeRd){
            const pairs=t.sim.ko[activeRd]||[];
            const blocked=pairs.some(p=>p.w==null&&((p.t1===S.hTi||p.t2===S.hTi)||(p.t1===S.gTi||p.t2===S.gTi))&&p.t1!=null&&p.t2!=null);
            const bothElim=![S.hTi,S.gTi].some(ti=>RDs.some(rd=>(t.sim.ko[rd]||[]).some(p=>p.w==null&&(p.t1===ti||p.t2===ti))));
            hostSim=`<div class="bar" style="margin:8px 0 0"><button class="btn p" data-a="cpsimko" ${blocked?"disabled":""} style="flex:1">${UICO.bolt}<span>${blocked?`${activeRd} İnsan Maçları Bekleniyor`:`${activeRd} Turunu Simüle Et`}</span></button>`+
              (bothElim&&RDs.indexOf(activeRd)<RDs.length-1?`<button class="btn" data-a="cpsimall" style="flex:1">${uiIco("ff")}<span>Finale Kadar</span></button>`:"")+`</div>`;
          }
        }
      }
      heroBody=readyStrip+pickStrip+myCard+undoBtn+hostSim;
    }
    const heroCard=psetCard("trophy","emr",esc(t.name),fmt(t.cfg),totW>0?`${simW}/${totW} Hafta`:"Eleme",heroBody);

    const hs=coopMgrStats(S.hMt),gs=coopMgrStats(S.gMt);
    const glance=`<div class="cp-gl">`+
      `<div class="cp-glc h"><div class="cp-glh">${badge(S.hTi,26)}<div><b>${esc(S.hName)}</b><small>${esc(T[S.hTi].n)}</small></div></div><div class="cp-gln"><b>${hs.w}G ${hs.d}B ${hs.l}M</b><span>${hs.gf}:${hs.ga} · ${hs.pts}P</span></div></div>`+
      `<div class="cp-glc g"><div class="cp-glh">${badge(S.gTi,26)}<div><b>${esc(S.gName)}</b><small>${esc(T[S.gTi].n)}</small></div></div><div class="cp-gln"><b>${gs.w}G ${gs.d}B ${gs.l}M</b><span>${gs.gf}:${gs.ga} · ${gs.pts}P</span></div></div>`+
    `</div>`;

    const pBar=`<div class="cp-pbar">`+
      `<button class="btn pset-sec" data-a="cppos" data-v="kura">📊 Puan / Kura Posteri</button>`+
      (!lg&&Object.keys(t.sim.ko||{}).length?`<button class="btn pset-sec" data-a="cppos" data-v="ko">🏆 Eleme Ağacı Posteri</button>`:"")+
      `<button class="btn pset-sec" data-a="cppos" data-v="tots">⭐ En İyi 11 (TOTS) Posteri</button>`+
    `</div>`;

    body=heroCard+glance+pBar;
  }else if(sub==="tablo"){
    const pBtn=`<div class="bar" style="margin:0 0 10px"><button class="btn pset-sec" data-a="cppos" data-v="kura" style="width:100%">📊 ${ucl?"ŞL 36’lı Puan Durumu Posterini Paylaş":lg?"Lig Puan Durumu Posterini Paylaş":"Puan Durumu / Kura Posterini Paylaş"}</button></div>`;
    if(!t.cfg.gs&&!lg&&!ucl){
      body=pBtn+`<div class="note">Direkt Eleme formatında grup tablosu yoktur; tüm eşleşmeleri Fikstür sekmesinde görebilirsin.</div>`;
    }else{
      const cards=(t.G||[]).map((g,gi)=>{
        const rows=coopCalcTable(S,gi),qMax=ucl?8:(t.cfg.q||2);
        const rHtml=rows.map((r,idx)=>{
          const rk=idx+1,isH=r.ti===S.hTi,isG=r.ti===S.gTi,isPo=ucl&&rk>=9&&rk<=24,isQ=ucl?rk<=8:(!lg&&idx<qMax);
          const avStr=(r.gd>0?"+":r.gd<0?"−":"")+Math.abs(r.gd);
          const cut=ucl?(rk===8?" qcut":rk===24?" qcut qcut-po":""):(!lg&&idx===qMax-1&&idx<rows.length-1?" qcut":"");
          return `<button class="gtbl row tb pt-r${isQ?" qrow t2":isPo?" tpo":""}${isH?" myrow cp-rh":""}${isG?" cp-rg":""}${cut}" data-a="tinfo" data-i="${r.ti}">`+
            `<span class="grk2${isQ?" q":""}${isPo?" qpo":""}${rk===1?" q1":""}">${rk}</span>`+
            `<span class="gnm">${badge(r.ti,20)}<span class="n">${isH?`<i class="pt-st">★</i> `:isG?`<i class="cp-gst">◆</i> `:""}${esc(T[r.ti].n)}</span></span>`+
            `<span class="pt-n">${r.o}</span><span class="pt-n">${r.w}</span><span class="pt-n mut">${r.d}</span><span class="pt-n mut">${r.l}</span><span class="pt-n pt-ag">${r.gf}</span><span class="pt-n mut pt-ag">${r.ga}</span><span class="pt-av${r.gd>0?" pos":r.gd<0?" neg":""}">${avStr}</span><b class="gpts">${r.pts}</b>`+
          `</button>`;
        }).join("");
        return `<div class="card kgc ptbl${st.ptdet?" ptdet":""}"><div class="pt-hd"><span class="kgl">${ucl||lg?"★":GL(gi)}</span><div class="kgt"><b>${gname(t,gi)}</b><small>${ucl?"İlk 8 Son 16 · 9–24 Play-Off":lg?"Puan Ligi":`İlk ${qMax} çıkar`}</small></div></div>`+
          `<div class="gtbl hd pt-col"><span class="grk2">#</span><span class="gnm">TAKIM</span><span title="Oynanan">O</span><span title="Galibiyet">G</span><span title="Beraberlik">B</span><span title="Mağlubiyet">M</span><span class="pt-ag" title="Attığı Gol">AG</span><span class="pt-ag" title="Yediği Gol">YG</span><span title="Averaj">AV</span><span class="gpts" title="Puan">P</span></div>`+
          `<div class="pt-rows">${rHtml}</div>`+
          (ucl?`<div class="gleg pt-leg"><span><i class="lg1"></i>1. Lider</span><span><i class="lg2"></i>2–8 Son 16</span><span><i class="lgpo"></i>9–24 Play-Off</span><span><i class="cp-lgh"></i>★ ${esc(S.hName)}</span><span><i class="cp-lgg"></i>◆ ${esc(S.gName)}</span><button class="pt-dtog" data-a="ptdet" aria-pressed="${!!st.ptdet}">${st.ptdet?"AG·YG Gizle":"+ AG·YG"}</button></div>`:`<div class="gleg pt-leg">${!lg?`<span><i class="lg1"></i>1.</span><span><i class="lg2"></i>Çıkar</span>`:""}<span><i class="cp-lgh"></i>★ ${esc(S.hName)}</span><span><i class="cp-lgg"></i>◆ ${esc(S.gName)}</span><button class="pt-dtog" data-a="ptdet" aria-pressed="${!!st.ptdet}">${st.ptdet?"AG·YG Gizle":"+ AG·YG"}</button></div>`)+`</div>`;
      }).join("");
      body=pBtn+`<div class="grid tblgrid">${cards}</div>`;
    }
  }else if(sub==="fikstur"){
    let koHtml="";
    if(!lg){
      coopInitKo(S,false);
      const RDs=rds(t.cfg).filter(r=>r!=="Grup");
      if(RDs.some(rd=>Array.isArray(t.sim.ko[rd])&&t.sim.ko[rd].length)){
        koHtml=`<div class="bar" style="margin:0 0 10px"><button class="btn pset-sec" data-a="cppos" data-v="ko" style="width:100%">🏆 Eleme Ağacı Posterini Paylaş (PNG)</button></div>`+
          `<div class="card pglass" style="padding:12px;margin:0 0 12px"><div class="pset-lbl" style="margin:0 0 8px">Eleme Ağacı</div>`+
          RDs.map(rd=>{
            const ps=t.sim.ko[rd]||[];if(!ps.length)return "";
            return `<div class="bksec"><div class="bkrh"><b>${rd}</b><small>${ps.filter(p=>p.w!=null).length}/${ps.length}</small></div>`+ps.map(p=>{
              const done=p.w!=null,sc=done?`${p.g1}–${p.g2}${p.pf!=null?` (P ${p.pf}–${p.pa})`:""}`:"vs";
              const hasLegs=Array.isArray(p.leg1)&&p.leg1.length>=2&&Array.isArray(p.leg2)&&p.leg2.length>=2;
              const legSub=hasLegs?`<div class="note" style="margin:2px 0 0;text-align:center;font-size:10.5px">Ayaklar: ${p.leg1[0]}–${p.leg1[1]} · ${p.leg2[0]}–${p.leg2[1]}</div>`:"";
              const nm1=p.t1!=null&&T[p.t1]?`${p.t1===S.hTi?"★ ":p.t1===S.gTi?"◆ ":""}${esc(T[p.t1].n)}`:(p.l1||"Bekleniyor");
              const nm2=p.t2!=null&&T[p.t2]?`${p.t2===S.hTi?"★ ":p.t2===S.gTi?"◆ ":""}${esc(T[p.t2].n)}`:(p.l2||"Bekleniyor");
              return `<div class="bktie${done?" dn":""}"><span class="bktm hm${done&&p.w===p.t1?" w":""}"><span class="n">${nm1}</span>${p.t1!=null&&T[p.t1]?badge(p.t1,18):""}</span><b class="bksc">${sc}</b><span class="bktm aw${done&&p.w===p.t2?" w":""}">${p.t2!=null&&T[p.t2]?badge(p.t2,18):""}<span class="n">${nm2}</span></span></div>${legSub}`;
            }).join("")+`</div>`;
          }).join("")+`</div>`;
      }
    }
    let wkHtml="";
    if(totW>0){
      const selW=(st.cpFxw>=1&&st.cpFxw<=totW)?st.cpFxw:Math.max(1,Math.min(totW,simW||1));
      const wkTabs=`<div class="wktabs" style="margin-bottom:8px">${rg(totW).map(i=>`<button class="chip ${selW===i+1?"on":""}" data-a="cpfxw" data-v="${i+1}">${i+1}. Hafta</button>`).join("")}</div>`;
      const mkRow=(t1,t2,done,g1,g2,tag)=>{
        if(!T[t1]||!T[t2])return "";
        const isH1=t1===S.hTi,isH2=t2===S.hTi,isG1=t1===S.gTi,isG2=t2===S.gTi;
        const mine=isH1||isH2||isG1||isG2;
        return `<div class="fxm${mine?" mine":""}"><div class="fmt"><button class="ftm h" data-a="tinfo" data-i="${t1}">${badge(t1,28)}<span class="nm">${isH1?"★ ":isG1?"◆ ":""}${esc(T[t1].n)}</span></button><div class="fsc${done?"":" vs"}">${done?`<span>${g1}</span><i></i><span>${g2}</span>`:"<span>vs</span>"}</div><button class="ftm a" data-a="tinfo" data-i="${t2}">${badge(t2,28)}<span class="nm">${isH2?"★ ":isG2?"◆ ":""}${esc(T[t2].n)}</span></button></div>${tag?`<div class="note" style="margin:4px 0 0;font-size:11px">${tag}</div>`:""}</div>`;
      };
      const hSc=coopTeamSched(t,S.hTi).find(x=>x.w===selW);
      const gSc=coopTeamSched(t,S.gTi).find(x=>x.w===selW);
      const multiGrp=(t.G||[]).length>1;
      let innerHtml="";
      if(multiGrp){
        const secs=[];
        (t.G||[]).forEach((g,gi)=>{
          const gRows=[];
          if(hSc&&hSc.gi===gi){
            const m=coopFindGrpMatch(S.hMt,selW,hSc.opp);
            gRows.push(mkRow(hSc.home?S.hTi:hSc.opp,hSc.home?hSc.opp:S.hTi,!!m,m?(hSc.home?m.gf:m.ga):0,m?(hSc.home?m.ga:m.gf):0,hSc.opp===S.gTi?"🤝 Doğrudan Düello":""));
          }
          if(gSc&&gSc.gi===gi&&gSc.opp!==S.hTi){
            const m=coopFindGrpMatch(S.gMt,selW,gSc.opp);
            gRows.push(mkRow(gSc.home?S.gTi:gSc.opp,gSc.home?gSc.opp:S.gTi,!!m,m?(gSc.home?m.gf:m.ga):0,m?(gSc.home?m.ga:m.gf):0,""));
          }
          const wkM=t.sim.gm[gi]&&t.sim.gm[gi][selW-1];
          if(Array.isArray(wkM)&&wkM.length)wkM.forEach(a=>gRows.push(mkRow(a[0],a[1],true,a[2],a[3],"")));
          else coopRoundPairs(t,gi,selW).filter(([a,b])=>a!==S.hTi&&b!==S.hTi&&a!==S.gTi&&b!==S.gTi).forEach(([a,b])=>gRows.push(mkRow(a,b,false,0,0,"")));
          const clean=gRows.filter(Boolean);
          if(clean.length)secs.push(`<div class="pset-lbl" style="margin:${secs.length?10:2}px 0 6px">${esc(gname(t,gi))}</div>`+clean.join(""));
        });
        innerHtml=secs.join("");
      }else{
        const rows=[];
        if(hSc){
          const m=coopFindGrpMatch(S.hMt,selW,hSc.opp);
          rows.push(mkRow(hSc.home?S.hTi:hSc.opp,hSc.home?hSc.opp:S.hTi,!!m,m?(hSc.home?m.gf:m.ga):0,m?(hSc.home?m.ga:m.gf):0,hSc.opp===S.gTi?"🤝 Doğrudan Düello":""));
        }
        if(gSc&&gSc.opp!==S.hTi){
          const m=coopFindGrpMatch(S.gMt,selW,gSc.opp);
          rows.push(mkRow(gSc.home?S.gTi:gSc.opp,gSc.home?gSc.opp:S.gTi,!!m,m?(gSc.home?m.gf:m.ga):0,m?(gSc.home?m.ga:m.gf):0,""));
        }
        const wkM=t.sim.gm[0]&&t.sim.gm[0][selW-1];
        if(Array.isArray(wkM)&&wkM.length)wkM.forEach(a=>rows.push(mkRow(a[0],a[1],true,a[2],a[3],"")));
        else coopRoundPairs(t,0,selW).filter(([a,b])=>a!==S.hTi&&b!==S.hTi&&a!==S.gTi&&b!==S.gTi).forEach(([a,b])=>rows.push(mkRow(a,b,false,0,0,"")));
        innerHtml=rows.filter(Boolean).join("");
      }
      wkHtml=wkTabs+`<div class="card pglass" style="padding:10px">${innerHtml||emp("Bu hafta maçı yok.")}</div>`;
    }
    body=koHtml+wkHtml;
  }else if(sub==="kiyas"){
    const hs=coopMgrStats(S.hMt),gs=coopMgrStats(S.gMt);
    const h2hMs=S.hMt.filter(m=>m&&m.h2h);
    let h2hHtml="";
    if(h2hMs.length){
      let hw=0,hd=0,gw=0,hgf=0,ggf=0;
      h2hMs.forEach(m=>{const r=mres(m);if(r==="w")hw++;else if(r==="d")hd++;else gw++;hgf+=+m.gf||0;ggf+=+m.ga||0});
      h2hHtml=psetCard("trophy","gold","Bu Turnuvadaki Doğrudan H2H",`${esc(S.hName)} vs ${esc(S.gName)}`,`${h2hMs.length} maç`,
        `<div class="cp-h2h"><b>${hw}G</b><span>${hd}B</span><b class="g">${gw}G</b><em>Gol: ${hgf}–${ggf}</em></div>`
      );
    }
    const pctF=v=>v==null?"—":"%"+Math.round(v),fxF=v=>v==null?"—":fx(v);
    const cmpRows=[
      ["Galibiyet Oranı",hs.wr,gs.wr,pctF(hs.wr),pctF(gs.wr),false],
      ["Maç Başı Puan",hs.ppm,gs.ppm,fxF(hs.ppm),fxF(gs.ppm),false],
      ["Atılan Gol / Maç",hs.gpm,gs.gpm,fxF(hs.gpm),fxF(gs.gpm),false],
      ["Yenilen Gol / Maç",hs.gapm,gs.gapm,fxF(hs.gapm),fxF(gs.gapm),true],
      ["Temiz Kasa %",hs.csPct,gs.csPct,pctF(hs.csPct),pctF(gs.csPct),false],
      ...(hs.xgM!=null||gs.xgM!=null?[["xG / Maç",hs.xgM,gs.xgM,fxF(hs.xgM),fxF(gs.xgM),false],["Rakip xG / Maç",hs.oxgM,gs.oxgM,fxF(hs.oxgM),fxF(gs.oxgM),true]]:[]),
      ...(hs.posM!=null||gs.posM!=null?[["Topla Oynama %",hs.posM,gs.posM,pctF(hs.posM),pctF(gs.posM),false]]:[])
    ].map(([l,v1,v2,f1,f2,low])=>typeof duelCompareRow==="function"?duelCompareRow(l,v1,v2,f1,f2,low,false):"").join("");
    const dnaRow=(hs.dna||gs.dna)?`<div class="cp-dnas"><div><small>${esc(S.hName)} DNA</small><b>${esc(hs.dna?hs.dna.title:"—")}</b></div><div><small>${esc(S.gName)} DNA</small><b>${esc(gs.dna?gs.dna.title:"—")}</b></div></div>`:"";
    const cmpHead=`<div class="cp-cmphd"><span class="h">${badge(S.hTi,20)}<b>★ ${esc(S.hName)}</b></span><small>VS</small><span class="g"><b>◆ ${esc(S.gName)}</b>${badge(S.gTi,20)}</span></div>`;
    const cmpCard=psetCard("chart","sky","Turnuva İçi Menajer Kıyası",`${esc(T[S.hTi].n)} vs ${esc(T[S.gTi].n)}`,`${hs.m} / ${gs.m} maç`,
      cmpHead+`<div class="dl-tlist">${cmpRows}</div>`+dnaRow
    );

    const st2=coopTourneyStats(S);
    const vSeason=coopAsPosterSeason(S);
    const xi=tourneyTots(vSeason,st2);
    let totsCard="";
    if(xi){
      const mvpP=totsFindMvp(xi);
      const pitchRow=(arr,cls)=>`<div class="tots-row ${cls}">${arr.map(p=>{
        const isMvp=mvpP&&p.n===mvpP.n&&p.ti===mvpP.ti,isH=p.ti===S.hTi,isG=p.ti===S.gTi;
        const stTxt=[p.g?p.g+"G":"",p.a?p.a+"A":"",p.mom?p.mom+"★":""].filter(Boolean).join(" · ")||(p.ovr+" GEN");
        return `<div class="tots-pl${isMvp?" mvp":""}${isH?" mine":""}${isG?" cp-gpl":""}">${isMvp?`<span class="tots-mvp">MVP</span>`:""}<span class="tots-bdg">${badge(p.ti,34)}<i class="tots-pos p-${p.grp}">${esc(p.pos)}</i></span><span class="tots-nm">${esc(totsDispName(p.n,arr.length))}</span><span class="tots-st">${stTxt}</span></div>`;
      }).join("")}</div>`;
      totsCard=psetCard("trophy","gold","Turnuvanın En İyi 11’i (TOTS)",`★ ${esc(S.hName)} · ◆ ${esc(S.gName)}`,totsFmtOf(xi),
        `<div class="tots-pitch">${pitchRow(totsOrderLine(xi.F,"F"),"r"+xi.F.length)}${pitchRow(totsOrderLine(xi.M,"M"),"r"+xi.M.length)}${pitchRow(totsOrderLine(xi.D,"D"),"r"+xi.D.length)}${pitchRow(xi.K,"r1")}</div>`+
        `<button class="btn p pset-pri" data-a="cppos" data-v="tots" style="width:100%;margin-top:10px">⭐ TOTS Posterini Paylaş (PNG)</button>`
      );
    }
    const leadRow=(list,k,unit)=>list.slice(0,8).map((p,idx)=>`<div class="row"><span class="grk2${idx===0?" q1":""}">${idx+1}</span>${badge(p.ti,20)}<span class="n">${p.ti===S.hTi?"★ ":p.ti===S.gTi?"◆ ":""}${esc(p.n)} <small class="lb">${esc(T[p.ti].n)}</small></span><b>${p[k]}${unit}</b></div>`).join("");
    const leadersCard=st2.scorers.length?psetCard("list","emr","Gol & Asist Krallığı","Ortak turnuva istatistikleri",`${st2.totG} gol`,
      `<div class="pset-lbl">Gol Krallığı</div>${leadRow(st2.scorers,"g","G")}`+
      (st2.assists.length?`<div class="pset-lbl" style="margin-top:10px">Asist Krallığı</div>${leadRow(st2.assists,"a","A")}`:"")
    ):"";

    body=h2hHtml+cmpCard+totsCard+leadersCard;
  }else if(sub==="gecmis"){
    body=coopHistCard(S);
  }
  return tabBar+body;
}

function coopHistCard(S){
  const hs=coopHistSummary(S);
  if(!hs.cnt){
    return psetCard("trophy","gold","Ortak Kupa Geçmişi","Bitirdiğiniz tüm ortak sezonlar burada birikir","0 sezon",
      emp("İlk ortak turnuvayı tamamladığınızda kupa sayacı, toplam H2H bilançonuz, kronoloji ve paylaşılabilir Ortak Kupa Geçmişi Posteri burada oluşacak.")
    );
  }
  const kpi=`<div class="car-kpi" style="margin-bottom:10px">`+
    `<div class="ck emr"><b>${hs.hCh}</b><span>${esc(hs.hName)} 🏆</span></div>`+
    `<div class="ck sky"><b>${hs.gCh}</b><span>${esc(hs.gName)} 🏆</span></div>`+
    `<div class="ck gold"><b>${hs.aiCh}</b><span>YZ 🏆</span></div>`+
  `</div>`;
  const h2hBar=hs.h2h.tot?`<div class="cp-h2h" style="margin-bottom:10px"><b>${esc(hs.hName)} ${hs.h2h.hw}G</b><span>${hs.h2h.d}B</span><b class="g">${hs.h2h.gw}G ${esc(hs.gName)}</b><em>Toplam Gol: ${hs.h2h.hgf}–${hs.h2h.ggf}</em></div>`:"";
  const tl=hs.hist.map(x=>`<div class="cp-tl">`+
    `<div class="cp-tlh"><b>${esc(x.name)}</b><small>${esc(x.date||"")}</small></div>`+
    `<div class="cp-tlc">🏆 <b>${x.ch!=null&&T[x.ch]?esc(T[x.ch].n):"?"}</b>${x.ch===x.hTi&&x.hSt===7?` (${esc(hs.hName)})`:x.ch===x.gTi&&x.gSt===7?` (${esc(hs.gName)})`:" (YZ)"}</div>`+
    `<div class="cp-tls"><span>★ ${esc(hs.hName)}: ${x.hTi!=null&&T[x.hTi]?esc(T[x.hTi].n):"?"}</span><span>◆ ${esc(hs.gName)}: ${x.gTi!=null&&T[x.gTi]?esc(T[x.gTi].n):"?"}</span></div>`+
  `</div>`).join("");
  return psetCard("trophy","gold","Ortak Kupa Geçmişi",`${esc(hs.hName)} vs ${esc(hs.gName)} · Tüm Zamanlar`,`${hs.cnt} sezon`,
    kpi+h2hBar+
    `<button class="btn p pset-pri" data-a="cppos" data-v="hist" style="width:100%;margin-bottom:12px">🏆 Ortak Kupa Geçmişi Posterini Paylaş (PNG)</button>`+
    tl
  );
}

function coopView(){
  const cfg=coopLoadCfg();
  if(!cfg.room||!cfg.role)return coopLobbyView();
  const S=coopState();
  if(!S){
    return `<div class="cp-top"><span class="xfpill emr">${esc(cfg.room)}</span><button class="btn pset-sec" data-a="cpref">Yenile</button><button class="btn pset-sec" data-a="cpleave">Ayrıl</button><button class="chip backpill" data-a="cpexit">‹ Bireysel</button></div>`+
      (st.cpErr?`<div class="pgmath dead" style="margin-bottom:10px">${esc(st.cpErr)}</div>`:"")+
      psetCard("sliders","sky","Odaya Bağlanılıyor…","Ortak turnuva verisi çekiliyor",cfg.room,
        `<button class="btn p pset-pri" data-a="cpref" style="width:100%">Tekrar Dene</button>`
      );
  }
  const syncAge=S.lastSync?Math.max(0,Math.round((Date.now()-S.lastSync)/1000)):null;
  const syncLbl=syncAge==null?"":syncAge<60?`${syncAge} sn önce`:`${Math.round(syncAge/60)} dk önce`;
  const inBetween=(S.t.phase==="setup"||S.t.phase==="pick")&&S.hist.length>0;
  if(!inBetween&&st.cpShowHist)st.cpShowHist=false;
  const histBtn=inBetween?`<button class="btn pset-sec cp-sm${st.cpShowHist?" on":""}" data-a="cphisttog" title="Ortak Kupa Geçmişi">${st.cpShowHist?"‹ Dön":"🏆 Geçmiş"}</button>`:"";
  const topBar=`<div class="cp-top">`+
    `<button class="cp-code" data-a="cpcopy" title="Oda kodunu kopyala">${esc(cfg.room)} 📋</button>`+
    `<span class="xfpill ${S.role==="host"?"gold":"sky"}">${S.role==="host"?"Kurucu":"Misafir"}</span>`+
    histBtn+
    `<button class="btn pset-sec cp-sm" data-a="cpref" ${st.cpBusy?"disabled":""}>${st.cpBusy?"…":"↻ Yenile"}</button>`+
    `<button class="btn pset-sec cp-sm" data-a="cpleave" title="Odadan ayrıl">✕</button>`+
    `<button class="chip backpill" data-a="cpexit">‹ Bireysel</button>`+
  `</div>`+
  (syncLbl?`<div class="note" style="margin:0 0 8px;font-size:11.5px">Son güncelleme: ${syncLbl} · ${esc(S.hName)} & ${esc(S.gName)}</div>`:"")+
  (st.cpErr?`<div class="pgmath dead" style="margin-bottom:10px">${esc(st.cpErr)}</div>`:"");

  let content="";
  if(inBetween&&st.cpShowHist)content=coopHistCard(S);
  else if(S.t.phase==="setup")content=coopSetupView(S);
  else if(S.t.phase==="pick")content=coopPickView(S);
  else content=coopPlayView(S);
  return topBar+content;
}

/* ---------- CO-OP ACTION HANDLER (All data-a="cp...") ---------- */
const COOP_NET_ACTS=new Set(["cpcreate","cpjoin","cptpl","cpcfg","cprl","cplock","cpbacksetup","cppick","cprnd","cpdraw","cpmsave","cpsimw","cpbuildko","cpsimko","cpsimall","cpfin","cpnew"]);
async function handleCoopAction(a,dv,dk,i,b){
  if(COOP_NET_ACTS.has(a)){
    if(st.cpLock)return true;
    st.cpLock=true;
    try{return await handleCoopActionInner(a,dv,dk,i,b)}finally{st.cpLock=false}
  }
  return await handleCoopActionInner(a,dv,dk,i,b);
}
async function handleCoopActionInner(a,dv,dk,i,b){
  if(a==="cpjrole"){if($("cp_hname"))st.cpHName=$("cp_hname").value;if($("cp_gname"))st.cpGName=$("cp_gname").value;if($("cp_code"))st.cpCode=$("cp_code").value;st.cpJoinRole=dv==="host"?"host":"guest";render();return true}
  if(a==="cpopen"){
    st.coopMode=!st.coopMode;
    if(st.coopMode&&coopHasRoom()&&(Date.now()-(st.cpLastAuto||0)>12000)){
      render();await coopPull(true);render();return true;
    }
    render();return true;
  }
  if(a==="cpexit"){st.coopMode=false;st.cpM=null;render();return true}
  if(a==="cpclose"){st.cpM=null;st.cpErr="";render();return true}
  if(a==="cphisttog"){st.cpShowHist=!st.cpShowHist;render();return true}
  if(a==="cptab"){st.cpTab=dv||"genel";render();return true}
  if(a==="cpfxw"){st.cpFxw=+dv||1;render();return true}
  if(a==="cppickw"){st.cpPickW=+dv||0;render();return true}
  if(a==="cpcopy"){
    const c=coopLoadCfg();
    try{await navigator.clipboard.writeText(c.room);ntf("Oda kodu kopyalandı: "+c.room)}catch(e){ntf("Oda kodu: "+c.room)}
    return true;
  }
  if(a==="cpref"){await coopPull(false);render();return true}
  if(a==="cpleave"){
    ask("Bu ortak odadan ayrılmak istiyor musun? (Oda sunucuda kalır, kodla tekrar katılabilirsin.)",()=>{
      coopSaveCfg({room:"",role:"",name:coopLoadCfg().name});
      coopSaveCache({room:"",host:null,guest:null,lastSync:0});
      st.cpM=null;st.cpTab="genel";st.cpErr="";st.cpCode="";st.cpShowHist=false;st.cpQ="";st.cpPickW=0;st.cpFxw=0;
      return "Ortak odadan ayrıldın";
    });if(st.ask)st.ask.coop=1;
    render();return true;
  }
  if(a==="cpcreate"){
    const nm=($("cp_hname")&&$("cp_hname").value.trim().slice(0,20))||"Kurucu";
    const room=coopGenCode();
    const hostObj={v:1,ut:Date.now(),name:nm,code:room,cur:coopMkTour(1,null),hist:[]};
    coopSaveCfg({room,role:"host",name:nm});
    const ok=await coopPushHost(hostObj);
    if(ok){st.cpTab="genel";st.cpShowHist=false;st.cpQ="";st.cpPickW=0;st.cpFxw=0;ntf("Ortak oda oluşturuldu: "+room)}
    else coopSaveCfg({room:"",role:"",name:nm});
    render();return true;
  }
  if(a==="cpjoin"){
    const wantRole=st.cpJoinRole==="host"?"host":"guest";
    const nmIn=($("cp_gname")&&$("cp_gname").value.trim().slice(0,20))||"";
    const raw=($("cp_code")&&$("cp_code").value)||"";
    const room=coopNormRoom(raw);
    if(room.length<6){st.cpErr="Geçerli bir oda kodu gir (ör. CP-ABC123).";render();return true}
    coopSaveCfg({room,role:wantRole,name:nmIn||(wantRole==="host"?"Kurucu":"Misafir")});
    const ok=await coopPull(false);
    if(!ok){coopSaveCfg({room:"",role:"",name:nmIn});render();return true}
    const cache=coopLoadCache();
    if(wantRole==="host"){
      const hNm=(cache.host&&cache.host.name)||nmIn||"Kurucu";
      coopSaveCfg({room,role:"host",name:hNm});
      st.cpTab="genel";st.cpShowHist=false;st.cpQ="";st.cpPickW=0;st.cpFxw=0;st.cpJoinRole="guest";ntf("Kurucu olarak odaya geri döndün: "+room);render();return true;
    }
    const gNm=nmIn||"Misafir",tId=cache.host&&cache.host.cur?cache.host.cur.id:0;
    const prevG=cache.guest&&cache.guest.tourId===tId?cache.guest:null;
    const gOk=await coopPushGuest({v:1,ut:Date.now(),name:gNm,tourId:tId,ti:prevG?prevG.ti:null,mt:prevG?coopNormMt(prevG.mt):[]});
    if(!gOk){coopSaveCfg({room:"",role:"",name:nmIn});render();return true}
    await coopPull(true);
    st.cpTab="genel";st.cpShowHist=false;st.cpQ="";st.cpPickW=0;st.cpFxw=0;ntf("Odaya katıldın: "+room);render();return true;
  }

  const S=coopState();
  if(!S){render();return true}

  if(a==="cptpl"&&S.role==="host"&&S.t.phase==="setup"){
    const p=COOP_TPL[+dv],wasUcl=isUcl(S.t.cfg);if(!p)return true;
    S.t.cfg=cp(p[2]);fixC(S.t.cfg);
    if(isUcl(S.t.cfg)){S.t.rl.rg="eu";S.t.rl.cap=4;S.t.rl.gcap=1}
    else{S.t.rl.cap=0;if(wasUcl&&S.t.rl.rg==="eu")S.t.rl.rg="all"}
    await coopPushHost(S.host);render();return true;
  }
  if(a==="cpcfg"&&S.role==="host"&&S.t.phase==="setup"){
    S.t.cfg[dk]=+dv;if(isLg(S.t.cfg)&&dk==="N")S.t.cfg.gs=S.t.cfg.N;fixC(S.t.cfg);
    await coopPushHost(S.host);render();return true;
  }
  if(a==="cprl"&&S.role==="host"&&S.t.phase==="setup"){
    S.t.rl[dk]=dv;
    await coopPushHost(S.host);render();return true;
  }
  if(a==="cplock"&&S.role==="host"&&S.t.phase==="setup"){
    if(avail(S.t)<S.t.cfg.N){ask("Yeterli takım yok; bölge veya kuralı gevşet.");render();return true}
    S.t.P=chooseP(S.t);S.t.phase="pick";S.t.hTi=null;S.t.gTi=null;
    const ok=await coopPushHost(S.host);if(ok)ntf("Kurulum onaylandı · şimdi takımlarınızı seçin");render();return true;
  }
  if(a==="cpbacksetup"&&S.role==="host"&&S.t.phase==="pick"){
    await coopPull(true);
    const S2=coopState();if(!S2||S2.t.phase!=="pick")return true;
    S2.t.id=Date.now();S2.t.phase="setup";S2.t.P=null;S2.t.hTi=null;S2.t.gTi=null;
    const ok=await coopPushHost(S2.host);
    if(ok)ntf("Kuruluma dönüldü · formatı değiştirebilirsin");render();return true;
  }
  if((a==="cppick"||a==="cprnd")&&S.t.phase==="pick"){
    await coopPull(true);
    const S2=coopState();
    if(!S2||S2.t.id!==S.t.id||S2.t.phase!=="pick"){ntf("Turnuva aşaması değişti, ekran yenilendi.");render();return true}
    let pick=i;
    if(a==="cprnd"){
      const availP=(S2.t.P||[]).filter(x=>x!==S2.opTi);
      if(!availP.length)return true;
      pick=availP[(Math.random()*availP.length)|0];
    }
    if(pick===S2.opTi){ntf(T[pick].n+" az önce arkadaşın tarafından seçildi, başka bir takım seç.");render();return true}
    if(!(S2.t.P||[]).includes(pick))return true;
    let ok=false;
    if(S2.role==="host"){
      S2.t.hTi=pick;
      ok=await coopPushHost(S2.host);
    }else{
      const gObj={v:1,ut:Date.now(),name:S2.cfg.name||S2.gName,tourId:S2.t.id,ti:pick,mt:[]};
      ok=await coopPushGuest(gObj);
    }
    if(!ok){render();return true}
    await coopPull(true);
    ntf("Takımın seçildi: "+T[pick].n);render();return true;
  }
  if(a==="cpdraw"&&S.role==="host"&&S.t.phase==="pick"){
    await coopPull(true);
    const S2=coopState();if(!S2||S2.hTi==null||S2.gTi==null){ask("İki oyuncu da takımını seçmeden kura çekilemez.");render();return true}
    if(S2.hTi===S2.gTi){ask(`İkiniz de aynı takımı (${T[S2.hTi].n}) seçmişsiniz. Kuradan önce biriniz farklı bir takım seçmeli.`);render();return true}
    const t=S2.t;t.gTi=S2.gTi;
    const tmpS=Object.assign({},t,{my:S2.hTi,mt:[]});
    if(isUcl(t.cfg)){
      const d=genUclDraw(tmpS);
      t.G=d.G;t.ucl={pots:d.pots,fx:d.rounds};
    }else if(isLg(t.cfg)){
      t.G=[sh(t.P)];
    }else{
      const d=genDraw(tmpS,2500,0.6,1200)||genDraw(tmpS,1500,1,900);
      if(!d){ask("Kura üretilemedi, tekrar dene.");render();return true}
      t.G=d.G.map(g=>sh(g));
    }
    t.phase="play";
    if(!t.cfg.gs&&!isLg(t.cfg)&&!isUcl(t.cfg))coopInitKo(S2,true);
    const ok=await coopPushHost(S2.host);
    if(!ok){render();return true}
    ntf("Kura çekildi · ortak turnuva başladı!");render();return true;
  }

  if(a==="cpmopen"){
    const wPick=+dv||st.cpPickW||0;
    const act=coopNextActionFor(S,S.myTi,wPick);
    if(!act||act.waitPo){ntf("Şu an girilecek maçın yok.");render();return true}
    if(act.h2h&&S.role==="guest"){ask("Doğrudan karşılaşma skorunu Kurucu girer.");render();return true}
    coopOpenMatchModal(act);render();return true;
  }
  if(a==="cpmundo"){
    const lm=coopCanUndoLast(S);
    if(!lm){ntf("Bu maç geri alınamaz (hafta/tur simüle edilmiş).");render();return true}
    const origTid=S.t.id;
    ask(`Son girdiğin maç (${lm.on} ${lm.gf}–${lm.ga}) silinsin mi?`,async()=>{
      await coopPull(true);
      const S2=coopState();
      if(!S2||S2.t.id!==origTid||S2.t.phase!=="play")return "Turnuva durumu değişti, maç silinemedi";
      const curLm=coopCanUndoLast(S2);
      if(!curLm||curLm.id!==lm.id)return "Bu maç artık geri alınamaz (sonraki aşama başlamış)";
      let ok=false;
      if(S2.role==="host"){
        S2.t.hMt=(S2.t.hMt||[]).filter(x=>x.id!==lm.id);
        S2.hMt=S2.t.hMt;
        coopSyncKo(S2);
        ok=await coopPushHost(S2.host);
      }else{
        const gMtClean=((S2.guest&&S2.guest.tourId===S2.t.id&&Array.isArray(S2.guest.mt))?S2.guest.mt:[]).filter(x=>x.id!==lm.id);
        ok=await coopPushGuest({v:1,ut:Date.now(),name:S2.cfg.name||S2.gName,tourId:S2.t.id,ti:S2.gTi,mt:gMtClean});
      }
      if(!ok)return st.cpErr||"Sunucuya ulaşılamadı, maç silinemedi";
      await coopPull(true);
      return "Son maç silindi";
    });if(st.ask)st.ask.coop=1;
    render();return true;
  }
  if(a==="cpmg"&&st.cpM){st.cpM.gf=Math.max(0,(st.cpM.gf||0)+ +b.dataset.d);render();return true}
  if(a==="cpmo"&&st.cpM){st.cpM.ga=Math.max(0,(st.cpM.ga||0)+ +b.dataset.d);render();return true}
  if(a==="cpmu"&&st.cpM){st.cpM.mu=st.cpM.mu?0:1;render();return true}
  if(a==="cpmp"&&st.cpM){st.cpM.mp=st.cpM.mp?0:1;if(st.cpM.mp)st.cpM.mu=1;render();return true}
  if(a==="cpmpf"&&st.cpM){st.cpM.mpf=Math.max(0,(st.cpM.mpf||0)+ +b.dataset.d);render();return true}
  if(a==="cpmpa"&&st.cpM){st.cpM.mpa=Math.max(0,(st.cpM.mpa||0)+ +b.dataset.d);render();return true}
  if(a==="cpmadv"&&st.cpM){st.cpM.adv=!st.cpM.adv;render();return true}
  if(a==="cpmsave"&&st.cpM){
    const m=st.cpM,isKO=m.rd!=="Grup";
    const totF=(m.pv||[]).reduce((a,x)=>a+(+x.gf||0),0)+m.gf;
    const totA=(m.pv||[]).reduce((a,x)=>a+(+x.ga||0),0)+m.ga;
    const isDeciding=isKO&&(m.L===1||(m.L>1&&m.lg===m.L&&(m.pv||[]).length>=m.L-1));
    if(isDeciding&&totF===totA&&(!m.mp||(m.mpf||0)===(m.mpa||0))){
      ask(`Eleme turunda toplam skor eşit (${totF}–${totA}). Penaltılar (P) skorunu girmelisin.`);render();return true;
    }
    const allowP=isDeciding&&totF===totA&&!!m.mp;
    const csr=cleanStatsW(m.mst);
    const cleanGls=(m.gls||[]).slice(0,m.gf).filter(g=>g&&g.sc).map(g=>({sc:g.sc,as:isKK(g.sc)?"":(g.as||"")}));
    let cleanOg=[];
    if(m.h2h){
      cleanOg=(m.og||[]).slice(0,m.ga).filter(g=>g&&g.sc).map(g=>({sc:g.sc,as:isKK(g.sc)?"":(g.as||"")}));
    }else if(m.ga>0){
      const sqO=squadOf(m.opp);
      if(sqO.length){const ix=simGoalAssign(m.opp,m.ga),as=simAssistsFor(m.opp,ix);ix.forEach((v,k)=>cleanOg.push({sc:sqO[v].n,as:as[k]>=0&&sqO[as[k]]?sqO[as[k]].n:""}))}
    }
    const rec={
      id:Date.now(),rd:m.rd,w:m.w||0,lg:m.lg||0,opp:m.opp,on:T[m.opp].n,
      gf:m.gf,ga:m.ga,et:isDeciding&&(m.mu||allowP)?1:0,
      pf:allowP?(m.mpf||0):null,pa:allowP?(m.mpa||0):null,
      gls:cleanGls,og:cleanOg,
      mom:m.mom||"",gMom:m.h2h?(m.gMom||""):"",
      omom:m.h2h?"":(m.mom?"":(pickOppMom(m.opp,cleanOg,m.gf,m.ga)||"")),
      stats:csr.s,h2h:m.h2h?1:0,dt:today()
    };
    let koBuilt=false;
    await coopPull(true);
    const S2=coopState();
    if(!S2||S2.t.id!==S.t.id||S2.t.phase!=="play"){
      st.cpM=null;ntf("Turnuva durumu değiştiği için maç kaydedilmedi, ekran yenilendi.");render();return true;
    }
    if(m.rd==="Grup"&&coopHasKo(S2.t)){
      st.cpM=null;ntf("Eleme aşaması başladığı için grup/lig maçı eklenemez.");render();return true;
    }
    let ok=false;
    if(S2.role==="host"){
      S2.t.hMt=S2.t.hMt||[];
      const dup=m.rd==="Grup"?coopFindGrpMatch(S2.t.hMt,m.w,m.opp):(S2.t.hMt.filter(x=>x.rd===m.rd&&x.opp===m.opp).length>=m.L);
      if(dup){st.cpM=null;ntf("Bu maç zaten kaydedilmiş.");render();return true}
      S2.t.hMt.push(rec);
      S2.hMt=S2.t.hMt;
      koBuilt=coopMaybeFinalizeGrp(S2);
      coopSyncKo(S2);
      ok=await coopPushHost(S2.host);
    }else{
      const gMtClean=(S2.guest&&S2.guest.tourId===S2.t.id&&Array.isArray(S2.guest.mt))?S2.guest.mt.slice():[];
      const dup=m.rd==="Grup"?coopFindGrpMatch(gMtClean,m.w,m.opp):(gMtClean.filter(x=>x.rd===m.rd&&x.opp===m.opp).length>=m.L);
      if(dup){st.cpM=null;ntf("Bu maç zaten kaydedilmiş.");render();return true}
      gMtClean.push(rec);
      ok=await coopPushGuest({v:1,ut:Date.now(),name:S2.cfg.name||S2.gName,tourId:S2.t.id,ti:S2.gTi,mt:gMtClean});
    }
    if(!ok){render();return true}
    st.cpM=null;st.cpPickW=0;await coopPull(true);
    ntf(koBuilt?`Maç kaydedildi · Eleme ağacı kuruldu 🏆`:`Maç kaydedildi: ${T[m.opp].n} ${m.gf}–${m.ga}`);render();return true;
  }

  if(a==="cpsimw"&&S.role==="host"){
    await coopPull(true);
    const S2=coopState();if(!S2)return true;
    const t=S2.t,totW=totWeeks(t.cfg),targetW=(t.sim.w||0)+1;
    if(targetW>totW)return true;
    const tmpS=Object.assign({},t,{my:S2.hTi,mt:S2.hMt});
    (t.G||[]).forEach((g,gi)=>{
      t.sim.gm[gi]=Array.isArray(t.sim.gm[gi])?t.sim.gm[gi]:[];
      const pairs=coopRoundPairs(t,gi,targetW).filter(([a0,b0])=>a0!==S2.hTi&&b0!==S2.hTi&&a0!==S2.gTi&&b0!==S2.gTi);
      t.sim.gm[gi][targetW-1]=pairs.map(([t1,t2])=>{
        const [g1,g2]=simMatchScore(tmpS,t1,t2,t.sim.m||0);
        const s1=simGoalAssign(t1,g1),s2=simGoalAssign(t2,g2);
        return [t1,t2,g1,g2,s1,s2,simAssistsFor(t1,s1),simAssistsFor(t2,s2)];
      });
    });
    t.sim.w=targetW;
    const koDone=coopMaybeFinalizeGrp(S2);
    const ok=await coopPushHost(S2.host);
    if(!ok){render();return true}
    ntf(koDone?`${targetW}. hafta simüle edildi · Eleme ağacı kuruldu 🏆`:(t.sim.w>=totW&&!coopAllHumanGrpDone(S2)?`${targetW}. hafta YZ maçları bitti · kalan oyuncu maçları bekleniyor`:`${targetW}. hafta diğer maçları simüle edildi`));
    render();return true;
  }
  if(a==="cpbuildko"&&S.role==="host"){
    await coopPull(true);
    const S2=coopState();if(!S2)return true;
    if(coopMaybeFinalizeGrp(S2)){
      const ok=await coopPushHost(S2.host);
      if(ok)ntf("Eleme ağacı kuruldu 🏆");
    }else{
      ask("Eleme ağacının kurulması için tüm oyuncu maçları ve YZ haftaları tamamlanmalı.");
    }
    render();return true;
  }

  if((a==="cpsimko"||a==="cpsimall")&&S.role==="host"){
    await coopPull(true);
    const S2=coopState();if(!S2)return true;
    const t=S2.t;coopInitKo(S2,false);
    const RDs=rds(t.cfg).filter(r=>r!=="Grup"),onlyOne=a==="cpsimko";
    const tmpS=Object.assign({},t,{my:S2.hTi,mt:S2.hMt});
    let simmed="";
    for(const rd of RDs){
      coopSyncKo(S2);
      const pairs=t.sim.ko[rd];
      if(!Array.isArray(pairs)||!pairs.length)break;
      if(pairs.every(p=>p.w!=null))continue;
      if(pairs.some(p=>p.t1==null||p.t2==null))break;
      const blocked=pairs.some(p=>p.w==null&&((p.t1===S2.hTi||p.t2===S2.hTi)||(p.t1===S2.gTi||p.t2===S2.gTi)));
      if(blocked)break;
      pairs.forEach(p=>{if(p.w==null&&p.t1!=null&&p.t2!=null)simOneKoTie(tmpS,p,rd)});
      simmed=rd;coopSyncKo(S2);
      if(onlyOne)break;
    }
    if(simmed){const ok=await coopPushHost(S2.host);if(ok)ntf(simmed+" simüle edildi")}
    else ntf("Önce oyuncuların maçları tamamlanmalı.");
    render();return true;
  }

  if(a==="cpfin"&&S.role==="host"){
    await coopPull(true);
    const S2=coopState();if(!S2)return true;
    const out=coopOutcome(S2);if(!out||!out.done){ask("Önce tüm turları tamamla.");render();return true}
    const st2=coopTourneyStats(S2),vS=coopAsPosterSeason(S2),xi=tourneyTots(vS,st2);
    const topG=st2.scorers[0]?{n:st2.scorers[0].n,ti:st2.scorers[0].ti,g:st2.scorers[0].g}:null;
    const mvp=st2.mvpList[0]?{n:st2.mvpList[0].n,ti:st2.mvpList[0].ti,g:st2.mvpList[0].g,a:st2.mvpList[0].a}:null;
    const hs=coopMgrStats(S2.hMt),gs=coopMgrStats(S2.gMt);
    const h2hMs=S2.hMt.filter(m=>m&&m.h2h);
    let hw=0,hd=0,gw=0,hgf=0,ggf=0;
    h2hMs.forEach(m=>{const r=mres(m);if(r==="w")hw++;else if(r==="d")hd++;else gw++;hgf+=+m.gf||0;ggf+=+m.ga||0});
    S2.t.res={ch:out.ch,ru:out.ru,hSt:out.hSt,gSt:out.gSt,hRk:out.hRk,gRk:out.gRk,hPts:out.hPts,gPts:out.gPts,topG,mvp,tots:xi,date:today()};
    S2.t.phase="done";
    S2.host.hist=Array.isArray(S2.host.hist)?S2.host.hist:[];
    if(!S2.host.hist.some(x=>x.id===S2.t.id)){
      S2.host.hist.push({
        id:S2.t.id,no:S2.t.no,name:S2.t.name,date:today(),fmt:fmt(S2.t.cfg),
        lg:isLg(S2.t.cfg)?1:0,ucl:isUcl(S2.t.cfg)?1:0,
        hTi:S2.hTi,gTi:S2.gTi,ch:out.ch,ru:out.ru,hSt:out.hSt,gSt:out.gSt,
        hStat:{w:hs.w,d:hs.d,l:hs.l,gf:hs.gf,ga:hs.ga,cs:hs.cs,xg:hs.xg,oxg:hs.oxg,xgN:hs.xgN},
        gStat:{w:gs.w,d:gs.d,l:gs.l,gf:gs.gf,ga:gs.ga,cs:gs.cs,xg:gs.xg,oxg:gs.oxg,xgN:gs.xgN},
        h2h:{hw,d:hd,gw,hgf,ggf},topG,mvp
      });
    }
    const ok=await coopPushHost(S2.host);
    if(!ok){render();return true}
    st.cel=(out.ch===S2.hTi||out.ch===S2.gTi)?1:0;
    ntf("Ortak sezon arşive kaydedildi 🏆");render();return true;
  }

  if(a==="cpnew"&&S.role==="host"){
    await coopPull(true);
    const S2=coopState()||S;
    const nextNo=(S2.t.no||1)+1;
    S2.host.cur=coopMkTour(nextNo,S2.t);
    const ok=await coopPushHost(S2.host);
    if(!ok){render();return true}
    st.cpTab="genel";st.cpShowHist=false;st.cpQ="";st.cpPickW=0;st.cpFxw=0;
    ntf("Yeni ortak sezon açıldı: "+S2.host.cur.name);render();return true;
  }

  if(a==="cppos"){
    if(dv==="hist"){
      const hs=coopHistSummary(S);
      if(!hs.cnt){ask("Ortak kupa geçmişi posteri için en az 1 tamamlanmış ortak sezon gerekir.");render();return true}
      await mkImg("coop-hist",Object.assign({name:S.cfg.room+"-kupa-gecmisi"},hs));
      return true;
    }
    const vS=coopAsPosterSeason(S);
    if(dv==="kura")await mkImg("kura",vS);
    else if(dv==="ko")await mkImg("ko",vS);
    else if(dv==="tots")await mkImg("tots",vS);
    return true;
  }
  return true;
}

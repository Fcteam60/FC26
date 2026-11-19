/* FC 27 Grup Ligi — Simülasyon, Canlı Puan Tablosu ve Eleme Ağacı Motoru (sim.js · v20.0) */
/* ---------- AŞAMA 1, 2 & 3: HAFTALIK SİMÜLASYON, ELEME AĞACI (BRACKET), GOL KRALLIĞI VE TURNUVA BİTİŞİ ---------- */
const SIM_MODES=[[0,"Gerçekçi","Güç farkı ve gerçek futbol skorları (1-0, 2-1, 1-1 ağırlıklı)"],[1,"Dengeli","Standart güç ve günlük form dengesi"],[2,"Sürprizli","Yüksek şans faktörü, kupa sürprizlerine açık"]];
function ensureSim(s){
  if(!s.sim||typeof s.sim!=="object")s.sim={m:0,w:0,gm:nob(),ko:nob(),sc:nob(),as:nob(),mom:nob()};
  if(![0,1,2].includes(s.sim.m))s.sim.m=0;
  if(!Number.isInteger(s.sim.w)||s.sim.w<0)s.sim.w=0;
  s.sim.gm=toNob(s.sim.gm);
  s.sim.ko=toNob(s.sim.ko);
  s.sim.sc=toNob(s.sim.sc);
  s.sim.as=toNob(s.sim.as);
  s.sim.mom=toNob(s.sim.mom);
  return s.sim}
function poissonSample(lam){const L=Math.exp(-lam);let k=0,p=1;do{k++;p*=Math.random()}while(p>L&&k<12);return k-1}
// Takımın İlk 11 ortalaması, en iyi 3 hücum yıldızı ve kaleci gücünü birleştiren gerçekçi güç profili
const SIM_PWC=Object.create(null);
function squadMetricsOf(i){
  if(SIM_PWC[i])return SIM_PWC[i];
  const sq=squadOf(i),t=T[i]||{g:75,a:75,o:75,d:75};
  if(!sq||!sq.length)return SIM_PWC[i]={xi:t.g,star:t.a,gk:t.d};
  const xiL=sq.filter(p=>p.t==="S");
  const xi=xiL.length?xiL.reduce((a,p)=>a+p.o,0)/xiL.length:t.g;
  const atks=sq.filter(p=>(p.g==="F"||p.g==="M")&&p.t!=="R").map(p=>p.o).sort((a,b)=>b-a).slice(0,3);
  const star=atks.length?atks.reduce((a,v)=>a+v,0)/atks.length:t.a;
  const gkP=sq.find(p=>p.g==="K"&&p.t==="S")||sq.find(p=>p.g==="K");
  const gk=gkP?gkP.o:t.d;
  return SIM_PWC[i]={xi,star,gk}}

function simPowerOf(s,i){
  const t=RT(s,i),m=squadMetricsOf(i);
  const dOvr=t.g-(T[i]?T[i].g:t.g);
  const xi=m.xi+dOvr,star=m.star+dOvr,gk=m.gk+dOvr;
  return{
    g:t.g*0.45+xi*0.40+star*0.15,
    a:t.a*0.50+star*0.35+xi*0.15,
    o:t.o*0.60+xi*0.40,
    d:t.d*0.55+gk*0.25+xi*0.20,
    gk,star,xi
  }}

function simMatchScore(s,i1,i2,mode,seedAdv){
  const p1=simPowerOf(s,i1),p2=simPowerOf(s,i2);
  const sAdv=(seedAdv||0)*1.15;
  const gap=(p1.g-p2.g)+sAdv;
  const ad1=(p1.a-p2.d)*0.032+(p1.o-p2.o)*0.022+gap*0.038;
  const ad2=(p2.a-p1.d)*0.032+(p2.o-p1.o)*0.022-gap*0.038;
  let dom1=0,dom2=0;
  if(Math.abs(gap)>2.5){
    const nl=Math.pow(Math.abs(gap)-2.5,1.35)*0.035;
    if(gap>0){dom1+=nl;dom2-=nl*1.25}
    else{dom2+=nl;dom1-=nl*1.25}
  }
  const gkSup1=Math.max(0,(p1.d-78)*0.018);
  const gkSup2=Math.max(0,(p2.d-78)*0.018);
  const scale=mode===0?1.0:mode===1?0.72:0.42;
  const jitter=mode===0?0.08:mode===1?0.22:0.42;
  let l1=1.22*Math.exp((ad1+dom1-gkSup2)*scale)*(1+(Math.random()*2-1)*jitter);
  let l2=1.22*Math.exp((ad2+dom2-gkSup1)*scale)*(1+(Math.random()*2-1)*jitter);
  if(mode===0){
    if(l1>2.35)l1=2.35+(l1-2.35)*0.38;
    if(l2>2.35)l2=2.35+(l2-2.35)*0.38;
  }
  l1=Math.max(0.15,Math.min(3.6,l1));
  l2=Math.max(0.15,Math.min(3.6,l2));
  return [Math.min(6,poissonSample(l1)),Math.min(6,poissonSample(l2))]}

// Yapay zeka maçlarında atılan golleri kadrodaki oyunculara gerçekçi ağırlıklarla dağıtır (hafıza tasarrufu için kadro sıra indisi döndürür)
function pickSimScorer(ti){
  const sq=squadOf(ti);if(!sq||!sq.length)return null;
  const cands=[];
  sq.forEach((p,idx)=>{if(p.g!=="K"&&p.t!=="R")cands.push([p,idx])});
  if(!cands.length)sq.forEach((p,idx)=>{if(p.g!=="K")cands.push([p,idx])});
  if(!cands.length)return null;
  const weights=cands.map(([p])=>{
    const posW=p.g==="F"?5.2:p.g==="M"?2.1:0.45;
    const stW=p.t==="S"?1.65:p.t==="B"?0.85:0.35;
    const ovrW=Math.pow(1.06,Math.max(0,(p.o||75)-72));
    return posW*stW*ovrW;
  });
  const tot=weights.reduce((a,b)=>a+b,0);
  let r=Math.random()*tot;
  for(let i=0;i<cands.length;i++){
    r-=weights[i];
    if(r<=0)return cands[i][1];
  }
  return cands[0][1]}

// Her gol için asist yapan oyuncunun kadro indisini (veya -1: asistsiz) seçer; golü atan hariç, orta saha/forvet ağırlıklı
function simAssistsFor(ti,scorers){
  const sq=squadOf(ti);if(!sq||!sq.length||!Array.isArray(scorers))return [];
  return scorers.map(sc=>{
    if(Math.random()>0.78)return -1;
    const cands=[];sq.forEach((p,idx)=>{if(idx!==sc&&p.g!=="K"&&p.t!=="R")cands.push([p,idx])});
    if(!cands.length)return -1;
    const w=cands.map(([p])=>(p.g==="M"?3.4:p.g==="F"?2.6:1.0)*(p.t==="S"?1.65:0.85)*Math.pow(1.06,Math.max(0,(p.o||75)-72)));
    let r=Math.random()*w.reduce((a,b)=>a+b,0);
    for(let i=0;i<cands.length;i++){r-=w[i];if(r<=0)return cands[i][1]}
    return cands[0][1]})}
function simGoalAssign(ti,goals){
  const out=[];if(!goals||goals<=0||ti==null||!T[ti])return out;
  for(let g=0;g<goals;g++){
    const idx=pickSimScorer(ti);
    if(idx!=null)out.push(idx);
  }
  return out}

// Simüle edilen bir maçta en çok katkı veren (3×gol + 2×asist, eşitlikte galip takım / gol sayısı / OVR) oyuncuyu Maçın Adamı (MA) seçer
function pickSimMom(t1,t2,g1,g2,s1,s2,a1,a2){
  if(t1==null||t2==null||!T[t1]||!T[t2])return null;
  const cand=nob(),win=g1>g2?t1:g2>g1?t2:-1;
  const addP=(ti,v,pts,isG)=>{
    const sq=squadOf(ti);
    const p=typeof v==="number"?(v>=0?sq[v]:null):(v?sq.find(x=>x.n===v)||{n:v,o:75}:null);
    if(!p||!p.n||isKK(p.n))return;
    const k=p.n+"|"+ti;
    if(!cand[k])cand[k]={k,ti,g:0,a:0,pts:0,ovr:p.o||75,w:ti===win?1:0};
    cand[k].pts+=pts;if(isG)cand[k].g++;else cand[k].a++;
  };
  (Array.isArray(s1)?s1:[]).forEach(v=>addP(t1,v,3,true));
  (Array.isArray(s2)?s2:[]).forEach(v=>addP(t2,v,3,true));
  (Array.isArray(a1)?a1:[]).forEach(v=>addP(t1,v,2,false));
  (Array.isArray(a2)?a2:[]).forEach(v=>addP(t2,v,2,false));
  const list=Object.values(cand);
  if(list.length){
    list.sort((a,b)=>(b.pts+b.w*0.5)-(a.pts+a.w*0.5)||b.g-a.g||b.w-a.w||b.ovr-a.ovr);
    return list[0].k;
  }
  const ti=win>=0?win:t2,sq=squadOf(ti);
  if(!sq.length)return null;
  const gk=sq.find(p=>p.g==="K"&&p.t==="S")||sq[0];
  return gk&&gk.n?gk.n+"|"+ti:null}

// Kullanıcının maçında kullanıcı kendi takımından Maçın Adamı seçmediyse rakipten en çok katkı veren oyuncuyu seçer
function pickOppMom(opp,og,gf,ga){
  if(opp==null||!T[opp])return "";
  const sq=squadOf(opp);
  if(Array.isArray(og)&&og.length){
    const cand=nob();
    og.forEach(o=>{
      if(!o||!o.sc||isKK(o.sc))return;
      const p=sq.find(x=>nz(x.n)===nz(o.sc));
      const n=p?p.n:o.sc;
      if(!cand[n])cand[n]={n,g:0,a:0,pts:0,ovr:p?p.o:75};
      cand[n].g++;cand[n].pts+=3;
      if(o.as&&!isKK(o.as)){
        const pa=sq.find(x=>nz(x.n)===nz(o.as));
        const na=pa?pa.n:o.as;
        if(!cand[na])cand[na]={n:na,g:0,a:0,pts:0,ovr:pa?pa.o:75};
        cand[na].a++;cand[na].pts+=2;
      }
    });
    const list=Object.values(cand);
    if(list.length){
      list.sort((a,b)=>b.pts-a.pts||b.g-a.g||b.ovr-a.ovr);
      return list[0].n;
    }
  }
  if(!sq.length)return "";
  if((+gf||0)===0||(+ga||0)===0){
    const gk=sq.find(p=>p.g==="K"&&p.t==="S")||sq.find(p=>p.g==="K");
    if(gk)return gk.n;
  }
  const stL=sq.filter(p=>p.t==="S").sort((a,b)=>b.o-a.o);
  return (stL[0]||sq[0]).n}


function fmtGoalList(ti,sL,aL){
  if(!Array.isArray(sL)||!sL.length)return "";
  const sq=squadOf(ti),out=[];
  sL.forEach((v,idx)=>{
    const sc=typeof v==="number"?(sq[v]&&sq[v].n):v;
    if(!sc)return;
    const av=Array.isArray(aL)?aL[idx]:null;
    const as=typeof av==="number"?(av>=0&&sq[av]?sq[av].n:""):(typeof av==="string"?av:"");
    out.push(isKK(sc)?"KK":`${esc(sc)}${as&&!isKK(as)?` (${esc(as)})`:""}`);
  });
  return out.join(", ")}

function simMetaLine(t1,t2,g1,g2,s1,s2,a1,a2,leg1,leg2){
  const parts=[];
  if(Array.isArray(leg1)&&Array.isArray(leg2)&&leg1.length>=2&&leg2.length>=2){
    parts.push(`1.M: ${leg1[0]}–${leg1[1]} · 2.M: ${leg2[0]}–${leg2[1]}`);
  }
  const gStr1=fmtGoalList(t1,s1,a1),gStr2=fmtGoalList(t2,s2,a2);
  if(gStr1)parts.push(`⚽ ${esc(T[t1].n)}: ${gStr1}`);
  if(gStr2)parts.push(`⚽ ${esc(T[t2].n)}: ${gStr2}`);
  if((Array.isArray(s1)&&s1.length)||(Array.isArray(s2)&&s2.length)){
    const mk=pickSimMom(t1,t2,g1,g2,s1,s2,a1,a2);
    if(mk){const sp=mk.lastIndexOf("|");parts.push(`★ ${esc(sp>0?mk.slice(0,sp):mk)}`)}
  }
  return parts.join(" · ")}

// v18.24: Fikstür maç detaylarını yapılandırılmış (sütunlu) olarak üretir
function fxGoalItems(ti,sL,aL){
  if(!Array.isArray(sL)||!sL.length)return [];
  const sq=squadOf(ti),out=[];
  sL.forEach((v,idx)=>{
    const sc=typeof v==="number"?(sq[v]&&sq[v].n):v;
    if(!sc)return;
    const av=Array.isArray(aL)?aL[idx]:null;
    const as=typeof av==="number"?(av>=0&&sq[av]?sq[av].n:""):(typeof av==="string"?av:"");
    const kk=isKK(sc);
    out.push({n:sc,as:as&&!isKK(as)?as:"",kk});
  });
  return out}
const fxCol=(items,side)=>`<ul class="fxg ${side}">${items.map(g=>`<li><i class="fxb${g.kk?" kk":""}" aria-hidden="true"></i><span class="fxt"><span class="fxn">${g.kk?"Kendi kalesine":esc(g.n)}</span>${g.as?` <span class="fxa">${esc(g.as)}</span>`:""}</span></li>`).join("")}</ul>`;
function fxDet(hi,ai,mom){
  if(!hi.length&&!ai.length&&!mom)return "";
  return `<div class="fdet">${hi.length||ai.length?`<div class="fgl">${fxCol(hi,"h")}${fxCol(ai,"a")}</div>`:""}${mom?`<div class="fmom"><span class="st" aria-hidden="true">★</span><span>Maçın adamı</span><b>${esc(mom)}</b></div>`:""}</div>`}
function fxSimDet(t1,t2,g1,g2,s1,s2,a1,a2){
  let mom="";
  if((Array.isArray(s1)&&s1.length)||(Array.isArray(s2)&&s2.length)){
    const mk=pickSimMom(t1,t2,g1,g2,s1,s2,a1,a2);
    if(mk){const sp=mk.lastIndexOf("|");mom=sp>0?mk.slice(0,sp):mk}
  }
  return fxDet(fxGoalItems(t1,s1,a1),fxGoalItems(t2,s2,a2),mom)}
function fxUserDet(s,m){
  const conv=l=>(Array.isArray(l)?l:[]).filter(g=>g&&g.sc).map(g=>({n:g.sc,as:g.as||"",kk:isKK(g.sc)}));
  const mom=m.mom||(m.omom||(m.opp!=null?pickOppMom(m.opp,m.og,m.gf,m.ga):""));
  return fxDet(conv(m.gls),conv(m.og),mom)}

// Tüm simüle edilen maçlardan (grup + eleme) Turnuva Gol/Asist/MOTM Krallığını hesaplar
function rebuildSimScorers(s){
  const sim=ensureSim(s),sc=nob(),as=nob(),mom=nob();
  let hasMatchScorers=false;
  const addA=(ti,list)=>{
    if(ti==null||!T[ti]||!Array.isArray(list))return;
    const sq=squadOf(ti);
    list.forEach(v=>{const n=typeof v==="number"&&v>=0&&sq[v]?sq[v].n:(typeof v==="string"&&v?v:null);if(!n||isKK(n))return;const key=n+"|"+ti;as[key]=(as[key]||0)+1});
  };
  const add=(ti,list)=>{
    if(ti==null||!T[ti]||!Array.isArray(list)||!list.length)return;
    hasMatchScorers=true;
    const sq=squadOf(ti);
    list.forEach(v=>{
      const n=typeof v==="number"?(sq[v]&&sq[v].n):v;
      if(!n||isKK(n))return;
      const key=n+"|"+ti;
      sc[key]=(sc[key]||0)+1;
    });
  };
  const addM=(t1,t2,g1,g2,s1,s2,a1,a2)=>{
    const mk=pickSimMom(t1,t2,g1,g2,s1,s2,a1,a2);
    if(mk)mom[mk]=(mom[mk]||0)+1;
  };
  Object.values(sim.gm||{}).forEach(wkList=>{
    if(!Array.isArray(wkList))return;
    wkList.forEach(matches=>{
      if(!Array.isArray(matches))return;
      matches.forEach(m=>{
        if(Array.isArray(m)&&m.length>=6){
          add(m[0],m[4]);add(m[1],m[5]);addA(m[0],m[6]);addA(m[1],m[7]);
          addM(m[0],m[1],+m[2]||0,+m[3]||0,m[4],m[5],m[6],m[7]);
        }
      });
    });
  });
  Object.values(sim.ko||{}).forEach(pairs=>{
    if(!Array.isArray(pairs))return;
    pairs.forEach(p=>{
      if(p&&p.w!=null&&p.t1!==s.my&&p.t2!==s.my){
        add(p.t1,p.s1);add(p.t2,p.s2);addA(p.t1,p.a1);addA(p.t2,p.a2);
        if(Array.isArray(p.s1)&&Array.isArray(p.s2)){
          if(Array.isArray(p.leg1)&&Array.isArray(p.leg2)&&p.leg1.length>=2&&p.leg2.length>=2){
            const l1a=+p.leg1[0]||0,l1b=+p.leg1[1]||0;
            addM(p.t1,p.t2,l1a,l1b,p.s1.slice(0,l1a),p.s2.slice(0,l1b),(p.a1||[]).slice(0,l1a),(p.a2||[]).slice(0,l1b));
            addM(p.t1,p.t2,+p.leg2[0]||0,+p.leg2[1]||0,p.s1.slice(l1a),p.s2.slice(l1b),(p.a1||[]).slice(l1a),(p.a2||[]).slice(l1b));
          }else{
            addM(p.t1,p.t2,+p.g1||0,+p.g2||0,p.s1,p.s2,p.a1,p.a2);
          }
        }
      }
    });
  });
  // Eğer sezon bitip maç bazlı golcü dizileri budandıysa mevcut özet haritalarını koru
  if(hasMatchScorers||!Object.keys(sim.sc||{}).length||sim.w===0){sim.sc=sc;sim.as=as;sim.mom=mom}
  return sim.sc}

// Bitmiş sezonlarda s.sim.sc özeti oluştuktan sonra alt maçlardaki golcü dizilerini budayarak JSON/IndexedDB boyutunu ~%70 küçültür
function pruneSimDetails(s){
  if(!s||!s.sim)return;
  rebuildSimScorers(s);
  Object.values(s.sim.gm||{}).forEach(wkList=>{
    if(!Array.isArray(wkList))return;
    wkList.forEach(matches=>{
      if(!Array.isArray(matches))return;
      matches.forEach(m=>{if(Array.isArray(m)&&m.length>4)m.length=4});
    });
  });
  Object.values(s.sim.ko||{}).forEach(pairs=>{
    if(!Array.isArray(pairs))return;
    pairs.forEach(p=>{if(p){delete p.s1;delete p.s2;delete p.a1;delete p.a2}});
  });
}

function tourneyTopScorers(s,limit){
  const sim=ensureSim(s);
  const scObj=(sim.sc&&Object.keys(sim.sc).length)?sim.sc:{};
  const map=nob();
  Object.entries(scObj).forEach(([key,g])=>{
    if(!g||g<=0)return;
    const sp=key.lastIndexOf("|"),n=sp>0?key.slice(0,sp):key,ti=sp>0?+key.slice(sp+1):-1;
    if(ti===s.my||!T[ti])return;
    const k=nz(n)+"|"+ti;
    map[k]={n,ti,g:+g,a:0,mine:false};
  });
  (s.mt||[]).forEach(m=>{
    if(m.opp==null||!T[m.opp]||!Array.isArray(m.og))return;
    m.og.forEach(o=>{
      if(!o||!o.sc||isKK(o.sc))return;
      const k=nz(o.sc)+"|"+m.opp;
      if(!map[k])map[k]={n:o.sc,ti:m.opp,g:0,a:0,mine:false};
      map[k].g+=1;
      if(o.as&&!isKK(o.as)){
        const ak=nz(o.as)+"|"+m.opp;
        if(map[ak])map[ak].a=(map[ak].a||0)+1;
      }
    });
  });
  if(s.my!=null&&T[s.my]){
    (s.pl||[]).forEach(p=>{
      if(!p||!p.n||isKK(p.n)||!(p.g>0))return;
      const k=nz(p.n)+"|"+s.my;
      map[k]={n:p.n,ti:s.my,g:+p.g,a:+(p.a||0),mine:true};
    });
  }
  const list=Object.values(map).sort((a,b)=>b.g-a.g||(b.mine?1:0)-(a.mine?1:0)||(b.a||0)-(a.a||0)||TR_CMP(a.n,b.n));
  return limit?list.slice(0,limit):list}


// Turnuva geneli istatistikler: simüle maçlar + senin maçların (rakip golcüleri otomatik üretilmiş m.og)
function tourneyStats(s){
  const sim=ensureSim(s),P=nob(),TM=nob(),matches=[];
  if(!Object.keys(sim.mom||{}).length&&(sim.w>0||Object.keys(sim.ko||{}).length))rebuildSimScorers(s);
  const ent=(n,ti)=>{if(!n||isKK(n)||ti==null||!T[ti])return null;const k=nz(n)+"|"+ti;return P[k]=P[k]||{n,ti,g:0,a:0,mom:0,ht:0,mine:ti===s.my}};
  const pk=key=>{const sp=key.lastIndexOf("|");return sp>0?[key.slice(0,sp),+key.slice(sp+1)]:[key,-1]};
  Object.entries(sim.sc||{}).forEach(([k,v])=>{const[n,ti]=pk(k);if(ti===s.my)return;const e=ent(n,ti);if(e)e.g+=+v||0});
  Object.entries(sim.as||{}).forEach(([k,v])=>{const[n,ti]=pk(k);if(ti===s.my)return;const e=ent(n,ti);if(e)e.a+=+v||0});
  Object.entries(sim.mom||{}).forEach(([k,v])=>{const[n,ti]=pk(k);if(ti===s.my)return;const e=ent(n,ti);if(e)e.mom+=+v||0});
  if(s.my!=null)(s.pl||[]).forEach(p=>{if(!p||!p.n||isKK(p.n))return;const e=ent(p.n,s.my);if(e){e.g+=+p.g||0;e.a+=+p.a||0;e.mom+=+p.mom||0}});
  const hat=(names,ti)=>{const c=nob();names.forEach(n=>{if(n&&!isKK(n))c[n]=(c[n]||0)+1});Object.entries(c).forEach(([n,v])=>{if(v>=3){const e=ent(n,ti);if(e)e.ht++}})};
  const tm=ti=>TM[ti]=TM[ti]||{ti,o:0,w:0,d:0,l:0,gf:0,ga:0,cs:0};
  const addM=(t1,t2,g1,g2,rd)=>{
    if(!T[t1]||!T[t2]||!Number.isFinite(g1)||!Number.isFinite(g2))return;
    const a=tm(t1),b=tm(t2);a.o++;b.o++;a.gf+=g1;a.ga+=g2;b.gf+=g2;b.ga+=g1;
    if(g2===0)a.cs++;if(g1===0)b.cs++;
    if(g1>g2){a.w++;b.l++}else if(g1<g2){b.w++;a.l++}else{a.d++;b.d++}
    matches.push({t1,t2,g1,g2,rd})};
  const nmOf=(ti,list)=>{const sq=squadOf(ti);return (Array.isArray(list)?list:[]).map(v=>typeof v==="number"?(sq[v]&&sq[v].n):v)};
  Object.values(sim.gm||{}).forEach(wk=>Array.isArray(wk)&&wk.forEach(ms=>Array.isArray(ms)&&ms.forEach(m=>{
    if(!Array.isArray(m))return;addM(m[0],m[1],m[2],m[3],"Grup");
    if(m.length>=6){hat(nmOf(m[0],m[4]),m[0]);hat(nmOf(m[1],m[5]),m[1])}})));
  Object.entries(sim.ko||{}).forEach(([rd,pairs])=>Array.isArray(pairs)&&pairs.forEach(p=>{
    if(!p||p.w==null||p.t1===s.my||p.t2===s.my)return;
    const n1=nmOf(p.t1,p.s1),n2=nmOf(p.t2,p.s2);
    if(Array.isArray(p.leg1)&&Array.isArray(p.leg2)&&p.leg1.length>=2&&p.leg2.length>=2){
      const l1a=+p.leg1[0]||0,l1b=+p.leg1[1]||0;
      addM(p.t1,p.t2,l1a,l1b,rd+" (1. Maç)");
      addM(p.t1,p.t2,+p.leg2[0]||0,+p.leg2[1]||0,rd+" (2. Maç)");
      hat(n1.slice(0,l1a),p.t1);hat(n1.slice(l1a),p.t1);
      hat(n2.slice(0,l1b),p.t2);hat(n2.slice(l1b),p.t2);
    }else{
      addM(p.t1,p.t2,p.g1,p.g2,rd);
      hat(n1,p.t1);hat(n2,p.t2);
    }}));
  (s.mt||[]).forEach(m=>{
    if(s.my==null||m.opp==null)return;addM(s.my,m.opp,m.gf,m.ga,m.rd+(m.lg?" ("+m.lg+". Maç)":""));
    const mSc=Array.isArray(m.gls)&&m.gls.length?m.gls.map(g=>g.sc):Object.entries(m.sc||{}).flatMap(([n,c])=>Array.from({length:+c||0},()=>n));
    hat(mSc,s.my);
    const og=m.og||[];hat(og.map(o=>o.sc),m.opp);
    og.forEach(o=>{const e=ent(o.sc,m.opp);if(e)e.g++;if(o.as){const a=ent(o.as,m.opp);if(a)a.a++}});
    if(!m.mom){
      const om=m.omom||pickOppMom(m.opp,og,m.gf,m.ga);
      if(om){const em=ent(om,m.opp);if(em)em.mom++}
    }});
  const players=Object.values(P);players.forEach(e=>{e.mvp=3*e.g+2*e.a+2*e.mom});
  return{players,teams:Object.values(TM),matches}}

function circleRounds(teams,doubleLeg){
  const n=teams.length;if(n<2||n%2!==0)return [];
  const fixed=teams[0];let rot=teams.slice(1);const rounds=[];
  for(let r=0;r<n-1;r++){
    const cur=[fixed,...rot],pairs=[];
    for(let i=0;i<n/2;i++){const a=cur[i],b=cur[n-1-i];pairs.push(r%2===1&&i===0?[b,a]:[a,b])}
    rounds.push(pairs);rot=[rot[rot.length-1],...rot.slice(0,-1)];
  }
  if(doubleLeg){const rev=rounds.map(rnd=>rnd.map(([a,b])=>[b,a]));return rounds.concat(rev)}
  return rounds}
function simWeekPairs(s,gi,w){
  const g=s.G&&s.G[gi];if(!g||g.length<2)return [];
  const gl=s.cfg.gl||1,hasMe=s.my!=null&&g.includes(s.my);
  if(!hasMe){const rnds=circleRounds(g,gl===2);return rnds[w-1]||[]}
  const myGm=(s.mt||[]).filter(m=>m.rd==="Grup"),m=myGm[w-1];
  const opp=m&&m.opp!=null&&g.includes(m.opp)?m.opp:null;
  const ord=[s.my,...g.filter(x=>x!==s.my)],baseRnds=circleRounds(ord,false);
  const half=g.length-1,isSec=w>half;
  if(opp!=null){
    const fnd=baseRnds.find(rnd=>rnd.some(([a,b])=>(a===s.my&&b===opp)||(b===s.my&&a===opp)));
    if(fnd)return fnd.filter(([a,b])=>a!==s.my&&b!==s.my).map(([a,b])=>isSec?[b,a]:[a,b]);
  }
  const fallback=baseRnds[(w-1)%half]||[];
  return fallback.filter(([a,b])=>a!==s.my&&b!==s.my).map(([a,b])=>isSec?[b,a]:[a,b])}
function calcGroupTable(s,gi){
  const g=(s.G&&s.G[gi])||[],tbl=nob();
  g.forEach(ti=>{tbl[ti]={ti,o:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0}});
  const addM=(t1,t2,g1,g2)=>{
    const r1=tbl[t1],r2=tbl[t2];
    if(r1){r1.o++;r1.gf+=g1;r1.ga+=g2;r1.gd=r1.gf-r1.ga;if(g1>g2){r1.w++;r1.pts+=3}else if(g1===g2){r1.d++;r1.pts+=1}else r1.l++}
    if(r2){r2.o++;r2.gf+=g2;r2.ga+=g1;r2.gd=r2.gf-r2.ga;if(g2>g1){r2.w++;r2.pts+=3}else if(g1===g2){r2.d++;r2.pts+=1}else r2.l++}
  };
  if(s.my!=null&&g.includes(s.my)){
    const maxGl=s.cfg.gl||1,oppCnt=nob();
    (s.mt||[]).filter(m=>m.rd==="Grup"&&m.opp!=null&&g.includes(m.opp)).forEach(m=>{
      oppCnt[m.opp]=(oppCnt[m.opp]||0)+1;
      if(oppCnt[m.opp]<=maxGl)addM(s.my,m.opp,+m.gf||0,+m.ga||0);
    });
  }
  const sim=ensureSim(s),gSim=sim.gm[gi]||[];
  gSim.forEach(wkList=>{if(Array.isArray(wkList))wkList.forEach(arr=>{if(Array.isArray(arr)&&arr.length>=4)addM(arr[0],arr[1],+arr[2]||0,+arr[3]||0)})});
  return g.map(ti=>tbl[ti]).sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf||V(RT(s,b.ti))-V(RT(s,a.ti)))}
function simNextWeek(s){
  if(!s.G||(!s.cfg.gs&&!isLg(s.cfg)))return null;
  const sim=ensureSim(s),totW=((s.cfg.gs||s.cfg.N)-1)*(s.cfg.gl||1);
  if(sim.w>=totW)return "Tüm grup/lig haftaları zaten simüle edildi";
  const myGm=(s.mt||[]).filter(m=>m.rd==="Grup").length,targetW=sim.w+1;
  if(!s.res&&s.my!=null&&myGm<targetW)return `Önce kendi ${targetW}. hafta maçını girmelisin`;
  s.G.forEach((g,gi)=>{
    sim.gm[gi]=Array.isArray(sim.gm[gi])?sim.gm[gi]:[];
    const pairs=simWeekPairs(s,gi,targetW);
    sim.gm[gi][targetW-1]=pairs.map(([t1,t2])=>{
      const [g1,g2]=simMatchScore(s,t1,t2,sim.m);
      const s1=simGoalAssign(t1,g1),s2=simGoalAssign(t2,g2);
      return [t1,t2,g1,g2,s1,s2,simAssistsFor(t1,s1),simAssistsFor(t2,s2)];
    });
  });
  sim.w=targetW;
  rebuildSimScorers(s);
  if(sim.w>=totW){
    const lg=isLg(s.cfg),qMax=s.cfg.q||2;
    if(!lg&&s.cfg.gs){
      s.gqs=s.gqs||nob();
      s.G.forEach((g,gi)=>{
        const rows=calcGroupTable(s,gi);
        s.gqs[gi]=rows.slice(0,qMax).map(r=>r.ti);
        if(s.my!=null&&g.includes(s.my)){
          const myRk=rows.findIndex(r=>r.ti===s.my)+1;
          if(myRk>0){
            s.grk=myRk;st.grk=myRk;
            if(myRk<=qMax)s.gq=1;
          }
        }
      });
      initKoBracket(s,true);
    }else if(lg&&s.my!=null){
      const rows=calcGroupTable(s,0),myRk=rows.findIndex(r=>r.ti===s.my)+1;
      if(myRk>0){s.grk=myRk;st.grk=myRk}
    }
    return `${targetW}. hafta simüle edildi · ${lg?"Lig":"Grup"} aşaması tamamlandı!`;
  }
  return `${targetW}. hafta maçları simüle edildi`}
function simUndoWeek(s){
  const sim=ensureSim(s);if(sim.w<=0)return null;
  const w=sim.w,totW=((s.cfg.gs||s.cfg.N)-1)*(s.cfg.gl||1);
  Object.keys(sim.gm).forEach(gi=>{if(Array.isArray(sim.gm[gi]))sim.gm[gi].splice(w-1,1)});
  sim.w=w-1;
  sim.ko=nob();
  if(sim.w<totW){s.gqs=nob();s.gq=null;s.grk=null;st.grk=null}
  rebuildSimScorers(s);
  return `${w}. hafta simülasyonu geri alındı`}

/* ---------- AŞAMA 2: ELEME AĞACI (BRACKET) VE TUR SİMÜLASYONU ---------- */
function buildInitialKoPairs(s){
  if(isLg(s.cfg)||!s.G)return [];
  const mkP=(t1,t2,l1,l2,sa)=>({t1,t2,l1,l2,sa:sa||0,g1:null,g2:null,et:0,pf:null,pa:null,w:null,s1:[],s2:[],a1:[],a2:[]});
  if(!s.cfg.gs){
    return s.G.filter(g=>g.length>=2).map((g,idx)=>mkP(g[0],g[1],`E${idx+1}`,`E${idx+1}`,0));
  }
  const G=s.G.length,q=s.cfg.q||2,gqs=s.gqs||{};
  for(let gi=0;gi<G;gi++){
    if(!Array.isArray(gqs[gi])||gqs[gi].length<q)return [];
  }
  if(G>=2&&G%2===0&&q===2){
    const topHalf=[],botHalf=[];
    for(let gi=0;gi<G;gi+=2){
      topHalf.push(mkP(gqs[gi][0],gqs[gi+1][1],`${GL(gi)}1`,`${GL(gi+1)}2`,1));
      botHalf.push(mkP(gqs[gi+1][0],gqs[gi][1],`${GL(gi+1)}1`,`${GL(gi)}2`,1));
    }
    return topHalf.concat(botHalf);
  }
  if(G>=2&&G%2===0&&q===4){
    // 4'er çıkanlı gruplarda (örn. 4 grup × 8 takım) 1.'ler çeyrek finalde birbirine düşmesin ve aynı grup takımları 4 ayrı çeyreğe dağılsın:
    const q1=[],q2=[],q3=[],q4=[];
    for(let gi=0;gi<G;gi+=2){
      const nxt=(gi+2)%G;
      q1.push(mkP(gqs[gi][0],gqs[gi+1][3],`${GL(gi)}1`,`${GL(gi+1)}4`,1.2));
      q1.push(mkP(gqs[nxt][1],gqs[nxt+1][2],`${GL(nxt)}2`,`${GL(nxt+1)}3`,0.5));
      q3.push(mkP(gqs[gi+1][0],gqs[gi][3],`${GL(gi+1)}1`,`${GL(gi)}4`,1.2));
      q3.push(mkP(gqs[nxt+1][1],gqs[nxt][2],`${GL(nxt+1)}2`,`${GL(nxt)}3`,0.5));
    }
    return q1.concat(q2,q3,q4);
  }
  // Genel çapraz eşleşme: 1 vs sonuncu ile 2 vs sondan ikinciyi yan yana diz ki üst turda iki grup lideri hemen çarpışmasın
  const seeds=[];
  for(let rk=0;rk<q;rk++){
    for(let gi=0;gi<G;gi++){
      seeds.push({ti:gqs[gi][rk],lbl:`${GL(gi)}${rk+1}`,rk});
    }
  }
  const half=Math.floor(seeds.length/2),rawP=[];
  for(let i=0;i<half;i++){
    const a=seeds[i],b=seeds[seeds.length-1-i];
    rawP.push(mkP(a.ti,b.ti,a.lbl,b.lbl,a.rk<b.rk?1:0));
  }
  const out=[];
  for(let i=0;i<Math.ceil(rawP.length/2);i++){
    out.push(rawP[i]);
    const revIdx=rawP.length-1-i;
    if(revIdx>i)out.push(rawP[revIdx]);
  }
  return out}

function initKoBracket(s,forceReset){
  if(isLg(s.cfg)||!s.G)return null;
  const sim=ensureSim(s),RDs=rds(s.cfg).filter(r=>r!=="Grup");
  if(!RDs.length)return null;
  const firstRd=RDs[0];
  if(forceReset)sim.ko=nob();
  if(!Array.isArray(sim.ko[firstRd])||!sim.ko[firstRd].length){
    const initP=buildInitialKoPairs(s);
    if(initP.length)sim.ko[firstRd]=initP;
  }
  syncUserMatchesToBracket(s);
  return sim.ko}

function syncUserMatchesToBracket(s){
  if(isLg(s.cfg)||!s.G)return;
  const sim=ensureSim(s),ko=sim.ko,RDs=rds(s.cfg).filter(r=>r!=="Grup");
  for(let rIdx=0;rIdx<RDs.length;rIdx++){
    const rd=RDs[rIdx],pairs=ko[rd];
    if(!Array.isArray(pairs)||!pairs.length)break;
    const needLegs=lgs(s.cfg,rd);
    pairs.forEach(p=>{
      if(p.t1===s.my||p.t2===s.my){
        const opp=p.t1===s.my?p.t2:p.t1,isT1=p.t1===s.my;
        const myMs=(s.mt||[]).filter(m=>m.rd===rd&&m.opp===opp);
        const uSc=[],uAs=[],oSc=[],oAs=[];
        myMs.forEach(m=>{
          if(Array.isArray(m.gls)&&m.gls.length){
            m.gls.forEach(g=>{if(g&&g.sc&&!isKK(g.sc)){uSc.push(g.sc);uAs.push(g.as&&!isKK(g.as)?g.as:"")}});
          }else{
            const asL=Object.entries(m.as||{}).flatMap(([n,c])=>!isKK(n)?Array.from({length:+c||0},()=>n):[]);
            Object.entries(m.sc||{}).forEach(([n,c])=>{
              if(isKK(n))return;
              for(let k=0;k<(+c||0);k++){uSc.push(n);uAs.push(asL.length?asL.shift():"")}
            });
          }
          (m.og||[]).forEach(o=>{if(o&&o.sc&&!isKK(o.sc)){oSc.push(o.sc);oAs.push(o.as&&!isKK(o.as)?o.as:"")}});
        });
        p.s1=isT1?uSc:oSc;p.s2=isT1?oSc:uSc;
        p.a1=isT1?uAs:oAs;p.a2=isT1?oAs:uAs;
        if(needLegs===2){
          const m1=myMs[0],m2=myMs[1];
          p.leg1=m1?(isT1?[+m1.gf||0,+m1.ga||0]:[+m1.ga||0,+m1.gf||0]):null;
          p.leg2=m2?(isT1?[+m2.gf||0,+m2.ga||0]:[+m2.ga||0,+m2.gf||0]):null;
        }
        if(myMs.length>=needLegs){
          const myGf=myMs.reduce((a,m)=>a+(+m.gf||0),0);
          const myGa=myMs.reduce((a,m)=>a+(+m.ga||0),0);
          const last=myMs[myMs.length-1];
          p.g1=isT1?myGf:myGa;
          p.g2=isT1?myGa:myGf;
          p.et=last.et?1:0;
          if(last.pf!=null&&last.pa!=null&&last.pf!==last.pa){
            p.pf=isT1?last.pf:last.pa;
            p.pa=isT1?last.pa:last.pf;
            p.w=last.pf>last.pa?s.my:opp;
          }else if(myGf!==myGa){
            p.pf=null;p.pa=null;
            p.w=myGf>myGa?s.my:opp;
          }
        }
      }
    });
    if(pairs.every(p=>p.w!=null)&&rIdx+1<RDs.length){
      const nextRd=RDs[rIdx+1];
      if(!Array.isArray(ko[nextRd])||!ko[nextRd].length){
        const nextP=[];
        for(let i=0;i<pairs.length;i+=2){
          if(pairs[i+1]){
            nextP.push({t1:pairs[i].w,t2:pairs[i+1].w,l1:"",l2:"",g1:null,g2:null,et:0,pf:null,pa:null,w:null,s1:[],s2:[],a1:[],a2:[]});
          }
        }
        if(nextP.length)ko[nextRd]=nextP;
      }else{
        for(let i=0;i<pairs.length;i+=2){
          const np=ko[nextRd][i/2];
          if(np&&pairs[i+1]&&np.w==null){
            np.t1=pairs[i].w;np.t2=pairs[i+1].w;
          }
        }
      }
    }
  }
}

function getAutoKoOpponent(s,rdName){
  const rd=rdName||st.mrd;
  if(!rd||rd==="Grup"||isLg(s.cfg))return null;
  initKoBracket(s,false);
  const ko=ensureSim(s).ko,pairs=ko[rd];
  if(!Array.isArray(pairs))return null;
  const m=pairs.find(p=>p.t1===s.my||p.t2===s.my);
  if(!m)return null;
  return m.t1===s.my?m.t2:m.t1}

function simOneKoTie(s,p,rd){
  const sim=ensureSim(s),legs=lgs(s.cfg,rd),sa=p.sa||0;
  let g1=0,g2=0,s1=[],s2=[],a1=[],a2=[],et=0,pf=null,pa=null;
  if(legs===2){
    const [l1a,l1b]=simMatchScore(s,p.t1,p.t2,sim.m,0.35);
    const [l2b,l2a]=simMatchScore(s,p.t2,p.t1,sim.m,0.35-sa*0.5);
    g1=l1a+l2a;g2=l1b+l2b;
    p.leg1=[l1a,l1b];p.leg2=[l2a,l2b];
    const s1_1=simGoalAssign(p.t1,l1a),a1_1=simAssistsFor(p.t1,s1_1);
    const s2_1=simGoalAssign(p.t2,l1b),a2_1=simAssistsFor(p.t2,s2_1);
    const s1_2=simGoalAssign(p.t1,l2a),a1_2=simAssistsFor(p.t1,s1_2);
    const s2_2=simGoalAssign(p.t2,l2b),a2_2=simAssistsFor(p.t2,s2_2);
    s1=s1_1.concat(s1_2);a1=a1_1.concat(a1_2);
    s2=s2_1.concat(s2_2);a2=a2_1.concat(a2_2);
  }else{
    const [l1a,l1b]=simMatchScore(s,p.t1,p.t2,sim.m,sa);
    g1=l1a;g2=l1b;
    s1=simGoalAssign(p.t1,g1);a1=simAssistsFor(p.t1,s1);
    s2=simGoalAssign(p.t2,g2);a2=simAssistsFor(p.t2,s2);
  }
  if(g1===g2){
    et=1;
    const pw1=simPowerOf(s,p.t1),pw2=simPowerOf(s,p.t2);
    const diff=(pw1.g-pw2.g)+sa*0.8;
    const scale=sim.m===0?1.0:sim.m===1?0.72:0.42;
    const p1=Math.min(0.55,0.25*Math.exp(diff*0.055*scale));
    const p2=Math.min(0.55,0.25*Math.exp(-diff*0.055*scale));
    const eg1=Math.random()<p1?1:0,eg2=Math.random()<p2?1:0;
    if(eg1){
      g1+=eg1;if(legs===2&&Array.isArray(p.leg2))p.leg2[0]+=eg1;
      const es1=simGoalAssign(p.t1,eg1);s1.push(...es1);a1.push(...simAssistsFor(p.t1,es1));
    }
    if(eg2){
      g2+=eg2;if(legs===2&&Array.isArray(p.leg2))p.leg2[1]+=eg2;
      const es2=simGoalAssign(p.t2,eg2);s2.push(...es2);a2.push(...simAssistsFor(p.t2,es2));
    }
    if(g1===g2){
      let k1=0,k2=0;
      const pkAdv=((pw1.gk-pw2.gk)*0.008+(pw1.g-pw2.g)*0.006)*scale;
      const r1=Math.max(0.62,Math.min(0.86,0.75+pkAdv));
      const r2=Math.max(0.62,Math.min(0.86,0.75-pkAdv));
      for(let k=0;k<5;k++){if(Math.random()<r1)k1++;if(Math.random()<r2)k2++}
      let sd=0;
      while(k1===k2&&sd<15){sd++;const m1=Math.random()<r1,m2=Math.random()<r2;if(m1!==m2){if(m1)k1++;else k2++}}
      if(k1===k2){if(Math.random()<0.5)k1++;else k2++}
      pf=k1;pa=k2;
    }
  }
  p.g1=g1;p.g2=g2;p.et=et;p.pf=pf;p.pa=pa;p.s1=s1;p.s2=s2;p.a1=a1;p.a2=a2;
  p.w=g1>g2?p.t1:g2>g1?p.t2:(pf>pa?p.t1:p.t2)}

function isUserEliminated(s){
  if(s.my==null||isLg(s.cfg))return false;
  if(s.res&&s.res.st<7)return true;
  const g=grpState(s);
  const sim=ensureSim(s),totW=s.cfg.gs?(s.cfg.gs-1)*(s.cfg.gl||1):0;
  if(s.cfg.gs&&g&&g.done&&sim.w>=totW){
    const gi=s.G.findIndex(grp=>grp.includes(s.my));
    const qL=(s.gqs&&s.gqs[gi])||[];
    if(qL.length>=(s.cfg.q||2)&&!qL.includes(s.my)&&!s.gq)return true;
  }
  syncUserMatchesToBracket(s);
  const ko=sim.ko,RDs=rds(s.cfg).filter(r=>r!=="Grup");
  for(const rd of RDs){
    const pairs=ko[rd];
    if(!Array.isArray(pairs))continue;
    const m=pairs.find(p=>p.t1===s.my||p.t2===s.my);
    if(m&&m.w!=null&&m.w!==s.my)return true;
  }
  return false}

function simKoStage(s,onlyCurrentRd){
  if(isLg(s.cfg))return "Lig modunda eleme turu yoktur";
  if(s.cfg.gs){
    const sim=ensureSim(s),totW=(s.cfg.gs-1)*(s.cfg.gl||1);
    const qCnt=Object.values(s.gqs||{}).reduce((a,l)=>a+(l?l.length:0),0),totQ=s.G.length*(s.cfg.q||2);
    if(sim.w<totW&&qCnt<totQ)return "Önce grup aşaması maçlarını tamamlamalısın";
  }
  initKoBracket(s,false);
  const sim=ensureSim(s),ko=sim.ko,RDs=rds(s.cfg).filter(r=>r!=="Grup");
  if(!RDs.length)return "Eleme turu bulunamadı";
  let lastSimRd="";
  for(let rIdx=0;rIdx<RDs.length;rIdx++){
    const rd=RDs[rIdx];
    syncUserMatchesToBracket(s);
    const pairs=ko[rd];
    if(!Array.isArray(pairs)||!pairs.length)break;
    if(pairs.every(p=>p.w!=null))continue;
    const userTie=pairs.find(p=>p.t1===s.my||p.t2===s.my);
    if(userTie&&userTie.w==null&&!s.res){
      return `Önce ${rd} turundaki kendi maçını (${T[userTie.t1===s.my?userTie.t2:userTie.t1].n}) oynamalısın`;
    }
    pairs.forEach(p=>{
      if(p.w==null)simOneKoTie(s,p,rd);
    });
    lastSimRd=rd;
    syncUserMatchesToBracket(s);
    if(onlyCurrentRd)break;
  }
  rebuildSimScorers(s);
  const finalRd=RDs[RDs.length-1],finalPairs=ko[finalRd];
  if(finalPairs&&finalPairs[0]&&finalPairs[0].w!=null){
    const ch=finalPairs[0].w;
    return `${lastSimRd||"Final"} simüle edildi · Turnuva tamamlandı! Şampiyon: ${T[ch].n} 🏆`;
  }
  return lastSimRd?`${lastSimRd} turu maçları simüle edildi`:"Tüm eleme turları zaten tamamlandı"}

/* ---------- AŞAMA 3: TURNUVAYI SONLANDIR, OTOMATİK DERECE & GOL KRALLIĞI KARTI ---------- */
function getTourneyOutcome(s){
  if(!s.G)return null;
  const lg=isLg(s.cfg),sim=ensureSim(s);
  if(lg){
    const totW=(s.cfg.N-1)*(s.cfg.gl||1);
    const myGm=(s.mt||[]).filter(m=>m.rd==="Grup").length;
    if(sim.w<totW||myGm<totW)return null;
    const rows=calcGroupTable(s,0);
    if(!rows.length)return null;
    const ch=rows[0].ti,ru=rows[1]?rows[1].ti:null;
    const myIdx=rows.findIndex(r=>r.ti===s.my),myRk=myIdx>=0?myIdx+1:null;
    const myRow=myIdx>=0?rows[myIdx]:null;
    let stVal=0;
    if(myRk===1)stVal=7;
    else if(myRk===2)stVal=6;
    else if(myRk===3)stVal=5;
    else if(myRk&&myRk<=Math.ceil(s.cfg.N/2))stVal=4;
    return{done:true,lg:true,ch,ru,myRk,pts:myRow?myRow.pts:grpPts(s),st:stVal};
  }
  syncUserMatchesToBracket(s);
  const RDs=rds(s.cfg).filter(r=>r!=="Grup");
  if(!RDs.length)return null;
  const finalRd=RDs[RDs.length-1],fp=sim.ko&&sim.ko[finalRd]&&sim.ko[finalRd][0];
  if(!fp||fp.w==null)return null;
  const ch=fp.w,ru=fp.w===fp.t1?fp.t2:fp.t1;
  let stVal=0,myRk=s.grk||null,pts=null;
  if(s.cfg.gs&&s.my!=null){
    const gi=s.G.findIndex(g=>g.includes(s.my));
    if(gi>=0){
      const rows=calcGroupTable(s,gi),ix=rows.findIndex(r=>r.ti===s.my);
      if(ix>=0){myRk=ix+1;pts=rows[ix].pts}
    }
  }
  if(ch===s.my){stVal=7;pts=null}
  else if(ru===s.my){stVal=6;pts=null}
  else{
    for(const rd of RDs){
      const pairs=sim.ko[rd]||[];
      const m=pairs.find(p=>p.t1===s.my||p.t2===s.my);
      if(m&&m.w!=null&&m.w!==s.my){
        const kNum=+Object.keys(RN).find(k=>RN[k]===rd);
        stVal=RKM[kNum]||0;pts=null;break;
      }
    }
  }
  return{done:true,lg:false,ch,ru,myRk,pts,st:stVal}}

function finishTournament(s){
  const out=getTourneyOutcome(s);
  if(!out)return "Turnuvayı sonlandırmak için önce tüm turları/haftaları tamamla";
  const wasChamp=s.res&&s.res.st===7;
  const st2=tourneyStats(s);
  const topS=tourneyTopScorers(s,1)[0]||null;
  const mvpP=st2.players.filter(o=>o.mvp>0).sort((a,b)=>b.mvp-a.mvp||b.g-a.g||b.a-a.a||TR_CMP(a.n,b.n))[0]||null;
  const xiRaw=tourneyTots(s,st2);
  const slim=p=>({n:p.n,ti:p.ti,pos:p.pos,grp:p.grp,ovr:p.ovr,g:p.g||0,a:p.a||0,mom:p.mom||0,cs:p.cs||0,mine:!!p.mine});
  const totsSnap=xiRaw?{F:xiRaw.F.map(slim),M:xiRaw.M.map(slim),D:xiRaw.D.map(slim),K:xiRaw.K.map(slim)}:null;
  if(out.myRk)s.grk=out.myRk;
  let autoNote="";
  if(out.ch===s.my){
    autoNote=out.lg?"Lig Şampiyonu 🏆":"Turnuva Şampiyonu 🏆";
  }else{
    autoNote=`Şampiyon: ${T[out.ch].n}${out.ru!=null?` · İkinci: ${T[out.ru].n}`:""}`;
  }
  if(topS)autoNote+=` · Gol Kralı: ${topS.n} (${topS.g}G)`;
  s.res={
    st:out.st,
    grk:out.st===0&&!out.lg?out.myRk:null,
    pts:(out.st===0||out.lg)&&out.pts!==null?out.pts:null,
    ch:out.ch,
    ru:out.ru,
    topG:topS?{n:topS.n,ti:topS.ti,g:topS.g}:null,
    mvp:mvpP?{n:mvpP.n,ti:mvpP.ti,g:mvpP.g,a:mvpP.a,mom:mvpP.mom,mvp:mvpP.mvp}:null,
    tots:totsSnap,
    note:s.res&&s.res.note?s.res.note:autoNote.slice(0,200),
    date:today()
  };
  pruneSimDetails(s);
  if(out.st===7&&!wasChamp){st.cel=1;st.tab=7}
  else st.tab=7;
  return `Turnuva sonlandırıldı! 🏆 Şampiyon: ${T[out.ch].n}`}

function koTreeHtml(s,ko,RDs){
  const firstCnt=(ko[RDs[0]]&&ko[RDs[0]].length)||Math.max(1,Math.floor(adv(s.cfg)/2));
  const cols=RDs.map((rd,rIdx)=>{
    const expCnt=Math.max(1,Math.round(firstCnt/Math.pow(2,rIdx)));
    const pairs=Array.isArray(ko[rd])?ko[rd]:[];
    const isFirst=rIdx===0,isLast=rIdx===RDs.length-1;
    const slots=rg(expCnt).map(pIdx=>{
      const p=pairs[pIdx]||null;
      const done=!!(p&&p.w!=null),mine=!!(p&&(p.t1===s.my||p.t2===s.my));
      const w1=done&&p.w===p.t1,w2=done&&p.w===p.t2;
      const sideCls=isLast?"":(pIdx%2===0?" top":" bot");
      const armCls=mine?" mine":done?" dn":"";
      const tmRow=(ti,g,isW,isL)=>{
        if(ti==null||!T[ti])return `<div class="bkt-tm tbd"><span class="bkt-ph">?</span><span class="n">Bekleniyor</span><b>—</b></div>`;
        return `<button class="bkt-tm${isW?" w":isL?" l":""}${ti===s.my?" me":""}" data-a="tinfo" data-i="${ti}" aria-label="${esc(T[ti].n)} kadrosunu incele">${badge(ti,16)}<span class="n">${esc(T[ti].n)}</span><b>${done?g:"·"}</b></button>`;
      };
      let meta="";
      if(done){
        const parts=[];
        if(Array.isArray(p.leg1)&&Array.isArray(p.leg2)&&p.leg1.length>=2&&p.leg2.length>=2)parts.push(`${p.leg1[0]}-${p.leg1[1]} · ${p.leg2[0]}-${p.leg2[1]}`);
        if(p.pf!=null&&p.pa!=null)parts.push(`P ${p.pf}-${p.pa}`);
        else if(p.et)parts.push("UZ");
        if(parts.length)meta=`<div class="bkt-ft">${parts.join(" · ")}</div>`;
      }
      const node=`<div class="bkt-node${mine?" mine":""}${done?" dn":""}${isLast?" fin":""}">`+
        tmRow(p?p.t1:null,p?p.g1:null,w1,done&&!w1)+
        tmRow(p?p.t2:null,p?p.g2:null,w2,done&&!w2)+
        meta+`</div>`;
      return `<div class="bkt-slot${isFirst?" fst":""}${isLast?" lst":""}${sideCls}${armCls}">${node}${!isLast?`<i class="bkt-arm" aria-hidden="true"></i>`:""}</div>`;
    }).join("");
    return `<div class="bkt-col${isLast?" fin":""}"><div class="bkt-chd">${isLast?"🏆 ":""}${esc(rd)}</div><div class="bkt-colb">${slots}</div></div>`;
  }).join("");
  return `<div class="bkt-wrap" role="region" aria-label="Eleme ağacı diyagramı"><div class="bkt-tree">${cols}</div></div><div class="note" style="margin:6px 0 0">Yatay kaydırarak tüm eleme turlarını takip edebilir, gol detayları için «Liste» görünümüne geçebilirsin.</div>`;
}
function koBracketCard(s){
  if(isLg(s.cfg)||!s.G)return "";
  initKoBracket(s,false);
  const sim=ensureSim(s),ko=sim.ko,RDs=rds(s.cfg).filter(r=>r!=="Grup");
  if(!RDs.some(rd=>Array.isArray(ko[rd])&&ko[rd].length))return "";
  const out=getTourneyOutcome(s),userElim=isUserEliminated(s);
  let activeRd=RDs.find(rd=>Array.isArray(ko[rd])&&ko[rd].some(p=>p.w==null));
  let simBtns="";
  if(activeRd){
    const pairs=ko[activeRd]||[];
    const userTie=pairs.find(p=>p.t1===s.my||p.t2===s.my);
    const needUser=userTie&&userTie.w==null&&!s.res;
    if(needUser){
      const opp=userTie.t1===s.my?userTie.t2:userTie.t1;
      simBtns=`<div class="bar" style="margin:0 0 10px"><button class="btn p qgo" data-a="qs" style="flex:1">⚽ ${activeRd} Maçını Gir (Rakip: ${esc(T[opp].n)})</button></div>`;
    }else{
      simBtns=`<div class="bar" style="margin:0 0 10px"><button class="btn p" data-a="simko" style="flex:1">⚡ ${activeRd} Turunu Simüle Et</button>${RDs.indexOf(activeRd)<RDs.length-1?`<button class="btn" data-a="simallko" style="flex:1">⏩ Finale Kadar Simüle Et</button>`:""}</div>`;
    }
  }else if(out&&out.done&&!s.res){
    simBtns=`<div class="gq" style="margin:0 0 10px;border-color:var(--gold)"><b>🏆 Turnuva Maçları Tamamlandı!</b><div class="note" style="margin:3px 0 8px">Şampiyon: <b>${esc(T[out.ch].n)}</b>${out.ru!=null?` · Finalist: <b>${esc(T[out.ru].n)}</b>`:""}. Turnuvayı sonlandırıp geçmişe ve karneye kaydedebilirsin.</div><button class="btn p cta" data-a="fintrn">🏆 Turnuvayı Sonlandır ve Kaydet</button></div>`;
  }
  const canTree=RDs.length>=2,bkv=canTree?(st.bkv==="list"?"list":"tree"):"list";
  const viewSw=canTree?`<div class="stabs seg2" style="margin:0 0 10px" role="tablist" aria-label="Eleme görünümü"><button class="chip ${bkv==="tree"?"on":""}" role="tab" aria-selected="${bkv==="tree"}" data-a="bkv" data-v="tree">🌳 Ağaç Görünümü</button><button class="chip ${bkv==="list"?"on":""}" role="tab" aria-selected="${bkv==="list"}" data-a="bkv" data-v="list">📋 Detaylı Liste</button></div>`:"";
  let content="";
  if(bkv==="tree"){
    content=koTreeHtml(s,ko,RDs);
  }else{
    content=RDs.filter(rd=>Array.isArray(ko[rd])&&ko[rd].length).map(rd=>{
      const pairs=ko[rd];
      const items=pairs.map(p=>{
        const mine=p.t1===s.my||p.t2===s.my,done=p.w!=null;
        const w1=p.w===p.t1,w2=p.w===p.t2,isFin=rd===RDs[RDs.length-1],isTwo=Array.isArray(p.leg1)&&Array.isArray(p.leg2)&&p.leg1.length>=2&&p.leg2.length>=2;
        const ck='<i class="bkck" role="img" aria-label="Turu geçti" title="Turu geçti">✓</i>';
        const scStr=done?`${p.g1}–${p.g2}${p.pf!=null?` <small>(P ${p.pf}-${p.pa})</small>`:p.et?` <small>(UZ)</small>`:""}${isTwo?` <small class="bkleg" title="1.M ${p.leg1[0]}–${p.leg1[1]} · 2.M ${p.leg2[0]}–${p.leg2[1]}">RÖVANŞLI</small>`:""}`:"vs";
        const det=done?simMetaLine(p.t1,p.t2,p.g1,p.g2,p.s1,p.s2,p.a1,p.a2,p.leg1,p.leg2):"";
        return `<div class="bktie${mine?" mine":""}${done?" dn":""}${isFin?" fin":""}">`+
          `<span class="bktm hm${w1?" w":""}">${w1?ck:""}${p.l1?`<small class="bksd">${p.l1}</small>`:""}<span class="n">${nm(p.t1)}</span>${badge(p.t1,18)}</span>`+
          `<b class="bksc">${scStr}</b>`+
          `<span class="bktm aw${w2?" w":""}">${badge(p.t2,18)}<span class="n">${nm(p.t2)}</span>${p.l2?`<small class="bksd">${p.l2}</small>`:""}${w2?ck:""}</span>`+
          (det?`<div class="simdet">${det}</div>`:"")+
          `</div>`;
      }).join("");
      const isF=rd===RDs[RDs.length-1],cntTx=`${pairs.filter(p=>p.w!=null).length}/${pairs.length} eşleşme`;
      return `<div class="bkrd${isF?" fin":""}">${isF?`<div class="bkfh"><b>🏆 FİNAL</b><small>${cntTx}</small></div>`:`<div class="rt" style="margin:6px 0 4px"><b>${rd}</b> <small>${cntTx}</small></div>`}<div class="bkgrid">${items}</div></div>`;
    }).join("");
  }
  const shBtn=`<div class="bar" style="margin:10px 0 0"><button class="btn pset-sec" data-a="kog" style="width:100%"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg><span>Eleme Ağacını Görsel Olarak Paylaş</span></button></div>`;
  return `<div class="card pglass pko" style="margin:0 0 12px"><h3>🏆 Eleme Ağacı (Bracket)<small>${out&&out.done?`Şampiyon: ${esc(T[out.ch].n)}`:(userElim?"Elendin · Turnuva devam ediyor":koPath(s.cfg))}</small></h3>${simBtns}${viewSw}${content}${shBtn}</div>`}

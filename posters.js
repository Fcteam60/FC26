/* FC 27 Grup Ligi — Broadcast PNG Poster Motoru (posters.js · v20.0) */
/* ---------- PAYLAŞILABİLİR GÖRSELLER ---------- */
const NUMF='"FC Sayi","Barlow Condensed","Oswald","Bahnschrift","Avenir Next Condensed","Roboto Condensed","Arial Narrow",sans-serif';
const TCOL={1:["#fbeaa8","#e0b43a","#2b2000"],2:["#f3f6f8","#b9c3cb","#1b2328"],3:["#f0c9a2","#be7f47","#2a1500"],0:["#ffffff","#dfeee6","#12211a"]};
const tierOf=v=>v>=85?1:v>=80?2:v>=75?3:0;
const flagCache=Object.create(null);
const flagImg=k=>flagCache[k]||(flagCache[k]=new Promise(res=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>res(null);i.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" width="72" height="48">${FLG[k]||""}</svg>`)}));
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
const tx=(c,t,x,y,sz,col,al,wt)=>{c.font=(wt||700)+" "+sz+"px "+NUMF;c.fillStyle=col;c.textAlign=al||"left";c.textBaseline="middle";c.fillText(String(t),x,y)};
const fit=(c,t,w)=>{if(c.measureText(t).width<=w)return t;while(t.length>2&&c.measureText(t+"…").width>w)t=t.slice(0,-1);return t+"…"};
const grad=(c,x0,x1,a,b)=>{const g=c.createLinearGradient(x0,0,x1,0);g.addColorStop(0,a);g.addColorStop(1,b);return g};
const mkCv=(w,h)=>{const cv=document.createElement("canvas");cv.width=w;cv.height=h;return cv};
async function kuraCv(s){
  if(typeof preloadLogos==="function"&&s&&s.G)await preloadLogos(s.G.flat());
  const G=s.G,gs=G[0].length,n=G.length,cols=n<=1?1:n<=8?2:3,W=1080,P=40,gap=20;
  const cw=(W-2*P-gap*(cols-1))/cols,fs=cols==3?23:29,rh=cols==3?46:54,hh=68,ch=hh+gs*rh+18;
  const rows=Math.ceil(n/cols),HH=184,H=HH+rows*ch+(rows-1)*gap+96;
  const cv=mkCv(W,H),c=cv.getContext("2d");
  const cb=s.my!=null&&T[s.my]?bspec(s.my):null;
  dkBg(c,W,H,cb?cb.c1:"#38bdf8",cb?cb.c2:"#f0c24b",false);

  // Header cleanly positioned above y=154 divider
  const lg=isLg(s.cfg);
  drawPill(c,lg?"LİG TABLOSU":"KURA SONUCU",44,40,176,38,"rgba(240,194,75,.16)","rgba(240,194,75,.06)","rgba(240,194,75,.48)","#fbeaa8",20);
  tx(c,s.name.toUpperCase()+(lg?"":" · GRUPLAR"),44,114,52,"#f8fafc","left",700);
  tx(c,s.date,W-44,66,25,"#94a3b8","right",600);
  c.font="600 22px "+NUMF;tx(c,fit(c,fmt(s.cfg),520),W-44,112,22,"#3ee6a8","right",600);

  const myg=s.my!=null?G.findIndex(g=>g.includes(s.my)):-1,imgs=nob();
  await Promise.all([...new Set(G.flat().map(i=>T[i].c))].map(async k=>{imgs[k]=await flagImg(k)}));
  withSn(s,()=>G.forEach((g,gi)=>{
    const x=P+(gi%cols)*(cw+gap),y=HH+Math.floor(gi/cols)*(ch+gap),mine=gi==myg;
    glassBox(c,x,y,cw,ch,22,mine?"rgba(240,194,75,.65)":"rgba(255,255,255,.12)",mine?"#f0c24b":null);
    // Group letter badge
    const gl=lg?"★":s.cfg.gs?GL(gi):String(gi+1);
    c.fillStyle=mine?grad(c,x+14,x+56,"#f8e08a","#d4a017"):grad(c,x+14,x+56,"#12b886","#0a7c56");
    rr(c,x+14,y+15,40,40,11);c.fill();
    tx(c,gl,x+34,y+36,24,mine?"#2b2000":"#fff","center",700);
    tx(c,gname(s,gi).toUpperCase(),x+64,y+36,cols==3?25:30,mine?"#fbeaa8":"#f8fafc","left",700);
    drawPill(c,"ORT "+fx(avg(g,"g")),x+cw-104,y+21,90,28,mine?"rgba(240,194,75,.18)":"rgba(255,255,255,.07)",null,mine?"rgba(240,194,75,.45)":"rgba(255,255,255,.14)",mine?"#fbeaa8":"#cbd5e1",17);
    g.slice().sort((a,b)=>V(T[b])-V(T[a])).forEach((i,r)=>{
      const ry=y+hh+r*rh,yy=ry+rh/2,t=T[i],tc=TCOL[tierOf(t.g)],im=imgs[t.c],bw=46,bx=x+cw-14-bw;
      const isMe=i===s.my;
      c.fillStyle=isMe?"rgba(240,194,75,.14)":"rgba(255,255,255,.032)";
      rr(c,x+12,ry+3,cw-24,rh-6,10);c.fill();
      if(isMe){c.lineWidth=1.2;c.strokeStyle="rgba(240,194,75,.45)";c.stroke()}
      drawBadge(c,i,x+20,yy-14,24);
      if(im)c.drawImage(im,x+50,yy-9,28,18);
      const qL=(s.gqs&&s.gqs[gi])||[],qr=qL.indexOf(i);
      c.font="700 "+fs+"px "+NUMF;
      tx(c,fit(c,(isMe?"★ ":"")+(qr>=0?`[${qr+1}] `:"")+t.n,cw-156),x+86,yy+1,fs,isMe?"#fbeaa8":qr>=0?"#3ee6a8":"#f1f5f9");
      c.fillStyle=grad(c,bx,bx+bw,tc[0],tc[1]);rr(c,bx,yy-15,bw,30,8);c.fill();
      tx(c,t.g,bx+bw/2,yy+1,fs-3,tc[2],"center",700);
    });
  }));
  drawPosterFooter(c,W,H,s.name.toUpperCase()+" · "+s.P.length+" TAKIM");
  return cv}
function dkBg(c,W,H,col1,col2,isGold){
  const bg=c.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,"#050a12");bg.addColorStop(.45,"#091423");bg.addColorStop(1,"#04080f");
  c.fillStyle=bg;c.fillRect(0,0,W,H);
  // Subtle diagonal stadium light beams
  c.save();
  for(let x=-200;x<W+200;x+=120){
    c.fillStyle="rgba(255,255,255,.012)";
    c.beginPath();c.moveTo(x,0);c.lineTo(x+52,0);c.lineTo(x-160,H);c.lineTo(x-212,H);c.closePath();c.fill();
  }
  c.restore();
  // Ambient dual-club spotlights
  const cA=isGold?"#f0c24b":(col1||"#38bdf8"),cB=isGold?"#d4a017":(col2||"#f0c24b");
  c.save();c.globalAlpha=isGold?.26:.24;
  const g1=c.createRadialGradient(W*.14,120,10,W*.14,120,620);g1.addColorStop(0,cA);g1.addColorStop(1,"transparent");
  c.fillStyle=g1;c.fillRect(0,0,W,780);
  c.globalAlpha=isGold?.22:.20;
  const g2=c.createRadialGradient(W*.86,140,10,W*.86,140,600);g2.addColorStop(0,cB);g2.addColorStop(1,"transparent");
  c.fillStyle=g2;c.fillRect(0,0,W,780);
  c.restore();
  // Faint architectural pitch geometry watermark
  c.save();c.strokeStyle="rgba(255,255,255,.032)";c.lineWidth=2;
  c.beginPath();c.arc(W/2,360,190,0,Math.PI*2);c.stroke();
  c.beginPath();c.arc(W/2,360,8,0,Math.PI*2);c.stroke();
  c.beginPath();c.moveTo(40,360);c.lineTo(W-40,360);c.stroke();
  c.restore();
  // Top metallic rim + header divider
  const topRim=c.createLinearGradient(0,0,W,0);
  topRim.addColorStop(0,cA);topRim.addColorStop(.5,"#fbeaa8");topRim.addColorStop(1,cB);
  c.fillStyle=topRim;c.fillRect(0,0,W,6);
  const gl=c.createLinearGradient(44,0,W-44,0);
  gl.addColorStop(0,"transparent");gl.addColorStop(.15,"rgba(240,194,75,.55)");gl.addColorStop(.5,"rgba(251,234,168,.85)");gl.addColorStop(.85,"rgba(240,194,75,.55)");gl.addColorStop(1,"transparent");
  c.fillStyle=gl;c.fillRect(44,154,W-88,2);
}
function glassBox(c,x,y,w,h,r,strokeCol,topTint){
  c.save();
  const fg=c.createLinearGradient(0,y,0,y+h);
  fg.addColorStop(0,"rgba(19,34,53,.88)");fg.addColorStop(1,"rgba(11,20,32,.92)");
  c.fillStyle=fg;rr(c,x,y,w,h,r);c.fill();
  if(topTint){
    c.save();rr(c,x,y,w,h,r);c.clip();
    c.globalAlpha=.16;
    const rg2=c.createRadialGradient(x+w*.2,y,10,x+w*.2,y,w*.75);
    rg2.addColorStop(0,topTint);rg2.addColorStop(1,"transparent");
    c.fillStyle=rg2;c.fillRect(x,y,w,h);
    c.restore();
  }
  c.lineWidth=1.8;c.strokeStyle=strokeCol||"rgba(255,255,255,.11)";rr(c,x,y,w,h,r);c.stroke();
  // Specular top rim highlight
  const hl=c.createLinearGradient(x+r,0,x+w-r,0);
  hl.addColorStop(0,"transparent");hl.addColorStop(.5,"rgba(255,255,255,.22)");hl.addColorStop(1,"transparent");
  c.fillStyle=hl;c.fillRect(x+r,y+1,w-r*2,1.5);
  c.restore();
}
function drawPill(c,text,x,y,w,h,bg1,bg2,stroke,txCol,fs){
  c.save();
  c.fillStyle=bg2?grad(c,x,x+w,bg1,bg2):bg1;
  rr(c,x,y,w,h,h/2);c.fill();
  if(stroke){c.lineWidth=1.6;c.strokeStyle=stroke;c.stroke()}
  tx(c,text,x+w/2,y+h/2+1,fs||22,txCol||"#f8fafc","center",700);
  c.restore();
}
function drawFormRow(c,ms,x,y,alignRight){
  if(!ms||!ms.length)return;
  const r=21,gap=54,totW=(ms.length-1)*gap+r*2;
  const sx=alignRight?(x-totW+r):(x+r);
  const cols={w:["#10b981","#052e16","G"],d:["#64748b","#f8fafc","B"],l:["#ef4444","#ffffff","M"]};
  ms.forEach((m,i)=>{
    const [bg,fg,lt]=cols[mres(m)]||cols.d,cx=sx+i*gap;
    c.save();
    c.shadowColor=bg;c.shadowBlur=10;
    c.fillStyle=bg;c.beginPath();c.arc(cx,y,r,0,Math.PI*2);c.fill();
    c.restore();
    c.lineWidth=1.5;c.strokeStyle="rgba(255,255,255,.28)";c.beginPath();c.arc(cx,y,r,0,Math.PI*2);c.stroke();
    tx(c,lt,cx,y+1,22,fg,"center",700);
  });
}
function drawPosterFooter(c,W,H,sub){
  const fy=H-64;
  const fln=c.createLinearGradient(44,0,W-44,0);
  fln.addColorStop(0,"transparent");fln.addColorStop(.5,"rgba(255,255,255,.14)");fln.addColorStop(1,"transparent");
  c.fillStyle=fln;c.fillRect(44,fy-14,W-88,1.5);
  tx(c,"FC 27 GRUP LİGİ",54,fy+16,24,"#f0c24b","left",700);
  tx(c,sub||"BROADCAST EDITION",W-54,fy+16,20,"#64748b","right",600);
}
async function karneCv(x,p){p=p==null?1:p;const cu=n=>Math.round(n*p);
  if(typeof preloadLogos==="function"&&x&&x.my!=null)await preloadLogos([x.my]);
  const t=RT(x,x.my),W=1080,ts=x.ts,v=k=>ts[k]||0,champ=x.res&&x.res.st==7;
  const cb=bspec(x.my),allMt=x.mt||[],ms=allMt.slice(-5);
  const top=f=>{const L=x.pl.filter(q=>q[f]>0).sort((a,b)=>b[f]-a[f]);if(!L.length)return null;const mx=L[0][f],ties=L.filter(q=>q[f]==mx);return{n:ties.map(q=>q.n).join(", "),v:mx}};
  const g=top("g"),a=top("a"),mom=top("mom"),aw=seasonAwards(x);
  const awItems=[];
  if(g)awItems.push(["ALTIN AYAKKABI",g.n,g.v+" Gol","#f0c24b"]);
  if(a)awItems.push(["OYUN KURUCU",a.n,a.v+" Asist","#38bdf8"]);
  if(mom)awItems.push(["MAÇIN ADAMI",mom.n,mom.v+" MOTM","#3ee6a8"]);
  if(aw&&aw.duo)awItems.push(["ALTIN İKİLİ",aw.duo.n,aw.duo.m+"M · "+aw.duo.tot+" Ortak Gol","#2dd4bf"]);
  if(aw&&aw.wk)awItems.push(["GENÇ YILDIZ ("+aw.wk.age+")",aw.wk.n,aw.wk.g+"G · "+aw.wk.a+"A","#c084fc"]);
  const hasAw=(aw&&aw.mvp)||awItems.length>0;
  const awRows=Math.ceil(awItems.length/2);
  const awBoxH=hasAw?(74+(aw&&aw.mvp?96:0)+(awRows?awRows*102+(awRows-1)*12+8:0)+20):0;
  const mCols=allMt.length>6?2:1,mRows=Math.ceil(allMt.length/mCols);
  const mBoxH=allMt.length?(84+mRows*58+18):0;
  let H=962;
  if(awBoxH)H+=awBoxH+24;
  if(mBoxH)H+=mBoxH+24;
  else if(ms.length)H+=88+24;
  H=Math.max(1220,H+84);
  const cv=mkCv(W,H),c=cv.getContext("2d");
  dkBg(c,W,H,cb.c1,cb.c2,champ);

  // Header
  drawPill(c,champ?"ŞAMPİYONLUK KARNESİ":"SEZON KARNESİ",48,42,champ?238:192,38,"rgba(240,194,75,.16)","rgba(240,194,75,.06)","rgba(240,194,75,.48)","#fbeaa8",20);
  tx(c,x.name.toUpperCase(),48,114,54,"#f8fafc","left",700);
  tx(c,x.date,W-48,70,26,"#94a3b8","right",600);
  c.font="600 22px "+NUMF;tx(c,fit(c,isLg(x.cfg)?"PUAN LİGİ":"KUPA TURNUVASI",320),W-48,112,22,"#3ee6a8","right",700);

  // Hero Club Card
  const hy=178,hh=288;
  if(champ){
    c.save();
    const cg=c.createLinearGradient(44,hy,1036,hy+hh);
    cg.addColorStop(0,"#fdf2c0");cg.addColorStop(.52,"#e6bc45");cg.addColorStop(1,"#c49216");
    c.fillStyle=cg;rr(c,44,hy,992,hh,28);c.fill();
    c.lineWidth=2.5;c.strokeStyle="#fff4cc";c.stroke();
    c.restore();
  }else{
    glassBox(c,44,hy,992,hh,28,"rgba(240,194,75,.42)",cb.c1);
  }
  const hCol=champ?"#2b2000":"#f8fafc",sCol=champ?"#4a3600":"#94a3b8";
  c.save();c.shadowColor="rgba(0,0,0,.55)";c.shadowBlur=24;c.shadowOffsetY=10;
  drawBadge(c,x.my,78,hy+44,148);
  c.restore();
  c.font="700 76px "+NUMF;tx(c,fit(c,t.n.toUpperCase(),530),256,hy+86,76,hCol,"left",700);
  const im=await flagImg(t.c);if(im)c.drawImage(im,256,hy+132,48,32);
  tx(c,CN[t.c][0],316,hy+148,30,champ?"#3b2a00":"#cbd5e1","left",600);
  // HÜC / ORT / DEF pills
  [["HÜC",t.a],["ORT",t.o],["DEF",t.d]].forEach(([lb,val],idx)=>{
    const px=256+idx*118,py=hy+186;
    c.fillStyle=champ?"rgba(43,32,0,.14)":"rgba(255,255,255,.07)";
    rr(c,px,py,106,40,10);c.fill();
    c.lineWidth=1;c.strokeStyle=champ?"rgba(43,32,0,.22)":"rgba(255,255,255,.12)";c.stroke();
    tx(c,lb,px+14,py+21,19,sCol,"left",600);
    tx(c,val,px+92,py+21,24,hCol,"right",700);
  });
  c.font="500 22px "+NUMF;tx(c,fit(c,fmt(x.cfg),720),256,hy+252,22,sCol,"left",500);
  // Sculpted GEN Emblem
  const tc=TCOL[tierOf(t.g)],gx=846,gy=hy+44;
  c.save();
  c.fillStyle=grad(c,gx,gx+152,tc[0],tc[1]);rr(c,gx,gy,152,184,22);c.fill();
  c.lineWidth=2;c.strokeStyle="rgba(255,255,255,.55)";c.stroke();
  tx(c,cu(t.g),gx+76,gy+82,102,tc[2],"center",700);
  tx(c,"GENEL",gx+76,gy+152,24,tc[2],"center",700);
  c.restore();

  // Status Ribbon
  const sy=488,sh=86,rt=x.res?rlb(x.res,x.cfg,x.grk).trim():"SEZON DEVAM EDİYOR";
  const stC=champ?["#f8e08a","#d4a017","#fff4cc","#2b2000"]:x.res?["#1e293b","#0f172a","rgba(148,163,184,.4)","#f8fafc"]:["#12b886","#0a7c56","rgba(62,230,168,.55)","#ffffff"];
  c.save();
  c.fillStyle=grad(c,44,1036,stC[0],stC[1]);rr(c,44,sy,992,sh,22);c.fill();
  c.lineWidth=1.8;c.strokeStyle=stC[2];c.stroke();
  c.fillStyle="rgba(255,255,255,.22)";c.fillRect(72,sy+1,936,1.5);
  c.font="700 44px "+NUMF;tx(c,fit(c,rt.toUpperCase(),920),540,sy+sh/2+1,44,stC[3],"center",700);
  c.restore();

  // Row 1 KPI: G / B / M
  const ky1=598,wV=v("w"),dV=v("d"),lV=v("l"),totM=wV+dV+lV,wrPct=totM?Math.round(wV/totM*100):0;
  [[cu(wV),"GALİBİYET","#3ee6a8",totM?"%"+wrPct:""],[cu(dV),"BERABERLİK","#94a3b8",""],[cu(lV),"MAĞLUBİYET","#ff6b6b",""]].forEach(([val,lbl,col,sub],i)=>{
    const bx=44+i*338;
    glassBox(c,bx,ky1,316,174,22,"rgba(255,255,255,.10)",col);
    c.fillStyle=col;rr(c,bx+24,ky1+1,268,4,2);c.fill();
    tx(c,val,bx+158,ky1+76,104,col,"center",700);
    tx(c,lbl,bx+158,ky1+144,24,"#94a3b8","center",700);
    if(sub)drawPill(c,sub,bx+234,ky1+18,64,28,"rgba(62,230,168,.16)",null,"rgba(62,230,168,.4)","#3ee6a8",17);
  });

  // Proportional W-D-L Strip
  const byBar=786;
  c.fillStyle="rgba(255,255,255,.07)";rr(c,44,byBar,992,10,5);c.fill();
  if(totM>0){
    let cx=44;
    [[wV,"#12b886"],[dV,"#64748b"],[lV,"#ef4444"]].forEach(([cnt,col])=>{
      if(!cnt)return;const segW=Math.max(12,Math.round((cnt/totM)*992));
      c.fillStyle=col;rr(c,cx,byBar,Math.min(segW,1036-cx),10,5);c.fill();cx+=segW+4;
    });
  }

  // Row 2 KPI: Atılan / Yenen / Averaj / Puan
  const ky2=812,av=v("gf")-v("ga"),avStr=(cu(av)>0?"+":"")+cu(av);
  [["ATILAN GOL",cu(v("gf")),"#f8fafc"],["YENEN GOL",cu(v("ga")),"#cbd5e1"],["AVERAJ",avStr,av>0?"#3ee6a8":av<0?"#ff6b6b":"#94a3b8"],["PUAN",cu(wV*3+dV),"#f0c24b"]].forEach(([lbl,val,vc],i)=>{
    const bx=44+i*253;
    glassBox(c,bx,ky2,233,124,20,"rgba(255,255,255,.09)");
    tx(c,val,bx+116,ky2+50,58,vc,"center",700);
    tx(c,lbl,bx+116,ky2+98,21,"#94a3b8","center",600);
  });

  let curY=960;
  // Awards Showcase Box
  if(awBoxH){
    glassBox(c,44,curY,992,awBoxH,24,"rgba(240,194,75,.28)","#f0c24b");
    tx(c,"SEZON ÖDÜLLERİ VE LİDERLER",72,curY+38,26,"#f0c24b","left",700);
    let ay=curY+72;
    if(aw&&aw.mvp){
      const mvpStat=`${aw.mvp.g}G · ${aw.mvp.a}A${aw.mvp.mom?" · "+aw.mvp.mom+"★":""}`;
      c.save();
      c.fillStyle=grad(c,72,1008,"rgba(240,194,75,.22)","rgba(15,157,107,.10)");
      rr(c,72,ay,936,80,16);c.fill();
      c.lineWidth=1.6;c.strokeStyle="rgba(240,194,75,.55)";c.stroke();
      drawPill(c,"SEZON MVP",90,ay+21,126,38,"#f8e08a","#d4a017",null,"#2b2000",20);
      c.font="700 40px "+NUMF;tx(c,fit(c,aw.mvp.n,510),234,ay+41,40,"#fbeaa8","left",700);
      drawPill(c,mvpStat,784,ay+20,204,40,"rgba(0,0,0,.32)",null,"rgba(240,194,75,.45)","#f8fafc",23);
      c.restore();
      ay+=96;
    }
    awItems.forEach(([lbl,name,stat,col],idx)=>{
      const isLastOdd=idx===awItems.length-1&&awItems.length%2===1;
      const colI=idx%2,rowI=Math.floor(idx/2);
      const iw=isLastOdd?936:460,ix=72+(isLastOdd?0:colI*476),iy=ay+rowI*114;
      c.fillStyle="rgba(255,255,255,.045)";rr(c,ix,iy,iw,100,15);c.fill();
      c.lineWidth=1.2;c.strokeStyle="rgba(255,255,255,.09)";c.stroke();
      c.fillStyle=col;rr(c,ix,iy+18,5,64,3);c.fill();
      tx(c,lbl,ix+22,iy+28,19,col,"left",700);
      c.font="700 32px "+NUMF;tx(c,fit(c,name,iw-44),ix+22,iy+68,32,"#f8fafc","left",700);
      tx(c,stat,ix+iw-20,iy+28,21,"#cbd5e1","right",600);
    });
    curY+=awBoxH+24;
  }

  // Matches Box (with integrated Form circles in header)
  if(mBoxH){
    glassBox(c,44,curY,992,mBoxH,24,"rgba(255,255,255,.11)");
    tx(c,"MAÇ SONUÇLARI ("+allMt.length+")",72,curY+42,26,"#f0c24b","left",700);
    if(ms.length)drawFormRow(c,ms,1008,curY+42,true);
    const cw=mCols==2?458:936;
    allMt.forEach((m,idx)=>{
      const colIdx=mCols==2?idx%2:0,rowIdx=mCols==2?Math.floor(idx/2):idx;
      const rx=72+colIdx*478,ry=curY+84+rowIdx*58+24;
      c.fillStyle="rgba(255,255,255,.035)";rr(c,rx,ry-24,cw,48,11);c.fill();
      const mr=mres(m),rCol={w:"#10b981",d:"#64748b",l:"#ef4444"}[mr],rLt={w:"G",d:"B",l:"M"}[mr];
      c.fillStyle=rCol;rr(c,rx+8,ry-15,30,30,8);c.fill();
      tx(c,rLt,rx+23,ry+1,18,mr=="w"?"#052e16":"#fff","center",700);
      const rdTxt=m.rd+(m.lg?" "+m.lg+".M":""),scStr=mscTxt(m),fSz=mCols==2?24:28;
      c.font="600 "+fSz+"px "+NUMF;
      tx(c,fit(c,rdTxt+" · "+m.on,cw-165),rx+48,ry+1,fSz,"#f1f5f9","left",600);
      c.fillStyle=mr=="w"?"rgba(16,185,129,.18)":mr=="l"?"rgba(239,68,68,.18)":"rgba(148,163,184,.18)";
      rr(c,rx+cw-104,ry-16,96,32,8);c.fill();
      tx(c,scStr,rx+cw-56,ry+1,fSz-1,mr=="w"?"#3ee6a8":mr=="l"?"#ff6b6b":"#cbd5e1","center",700);
    });
    curY+=mBoxH+24;
  }else if(ms.length){
    glassBox(c,44,curY,992,84,20,"rgba(255,255,255,.10)");
    tx(c,"SON MAÇ FORMU",72,curY+43,24,"#94a3b8","left",700);
    drawFormRow(c,ms,1008,curY+42,true);
    curY+=108;
  }
  drawPosterFooter(c,W,H,x.name.toUpperCase()+" · "+t.n.toUpperCase());
  return cv}
async function totsCv(s){
  const st2=tourneyStats(s),xi=tourneyTots(s,st2);
  if(!xi)throw new Error("TOTS için yeterli veri yok");
  if(typeof preloadLogos==="function")await preloadLogos([].concat(xi.F||[],xi.M||[],xi.D||[],xi.K||[]).map(p=>p.ti));
  const W=1080,H=1460,cv=mkCv(W,H),c=cv.getContext("2d");
  const cb=s.my!=null&&T[s.my]?bspec(s.my):null,champ=!!(s.res&&s.res.st===7);
  dkBg(c,W,H,cb?cb.c1:"#3ee6a8",cb?cb.c2:"#f0c24b",champ);

  // Header
  drawPill(c,"TURNUVANIN EN İYİ 11'İ",48,42,272,38,"rgba(240,194,75,.18)","rgba(240,194,75,.06)","rgba(240,194,75,.52)","#fbeaa8",20);
  tx(c,s.name.toUpperCase()+" · TOTS",48,114,52,"#f8fafc","left",700);
  tx(c,s.date||today(),W-48,70,25,"#94a3b8","right",600);
  const fmtStr=totsFmtOf(xi);
  drawPill(c,fmtStr+" DİZİLİŞ",W-206,94,158,34,"rgba(62,230,168,.16)",null,"rgba(62,230,168,.42)","#3ee6a8",19);

  // Perspective Pitch Canvas Stage
  const px=44,py=176,pw=992,ph=1178;
  c.save();
  rr(c,px,py,pw,ph,28);c.clip();
  const pg=c.createLinearGradient(0,py,0,py+ph);
  pg.addColorStop(0,"#062a1b");pg.addColorStop(.5,"#0d462d");pg.addColorStop(1,"#06291a");
  c.fillStyle=pg;c.fillRect(px,py,pw,ph);
  // Subtle vertical grass bands
  for(let sx=px;sx<px+pw;sx+=124){
    c.fillStyle="rgba(255,255,255,.022)";
    c.fillRect(sx,py,62,ph);
  }
  // Ambient vignette & soft center light
  const vig=c.createRadialGradient(px+pw/2,py+ph*.45,120,px+pw/2,py+ph*.5,pw*.72);
  vig.addColorStop(0,"rgba(62,230,168,.08)");vig.addColorStop(1,"rgba(2,10,7,.52)");
  c.fillStyle=vig;c.fillRect(px,py,pw,ph);

  // Perspective Trapezoid Pitch Lines
  const mapX=u=>px+u/360*pw,mapY=v=>py+v/470*ph;
  const poly=pts=>{c.beginPath();pts.forEach(([u,v],k)=>{if(k)c.lineTo(mapX(u),mapY(v));else c.moveTo(mapX(u),mapY(v))});c.closePath();c.stroke()};
  c.strokeStyle="rgba(255,255,255,.17)";c.lineWidth=3.2;
  poly([[54,18],[306,18],[348,452],[12,452]]);
  poly([[114,18],[246,18],[256,74],[104,74]]);
  poly([[146,18],[214,18],[218,40],[142,40]]);
  c.beginPath();c.moveTo(mapX(154),mapY(74));c.quadraticCurveTo(mapX(180),mapY(92),mapX(206),mapY(74));c.stroke();
  c.beginPath();c.moveTo(mapX(35),mapY(214));c.lineTo(mapX(325),mapY(214));c.stroke();
  c.beginPath();c.ellipse(mapX(180),mapY(214),54/360*pw,37/470*ph,0,0,Math.PI*2);c.stroke();
  c.fillStyle="rgba(255,255,255,.24)";c.beginPath();c.arc(mapX(180),mapY(214),6,0,Math.PI*2);c.fill();
  poly([[94,370],[266,370],[284,452],[76,452]]);
  poly([[134,416],[226,416],[232,452],[128,452]]);
  c.beginPath();c.moveTo(mapX(148),mapY(370));c.quadraticCurveTo(mapX(180),mapY(350),mapX(212),mapY(370));c.stroke();
  c.restore();
  c.save();c.lineWidth=2;c.strokeStyle="rgba(62,230,168,.34)";rr(c,px,py,pw,ph,28);c.stroke();c.restore();

  const mvpP=totsFindMvp(xi);
  const F=totsOrderLine(xi.F,"F"),M=totsOrderLine(xi.M,"M"),D=totsOrderLine(xi.D,"D"),K=xi.K||[];
  const posCol={K:"#d97706",D:"#4f46e5",M:"#0284c7",F:"#059669"};
  const drawPlayer=(p,cx,cy,cw)=>{
    const isMvp=mvpP&&p.n===mvpP.n&&p.ti===mvpP.ti;
    const parts=[];
    if(p.g)parts.push(`${p.g}G`);
    if(p.a)parts.push(`${p.a}A`);
    if(p.mom)parts.push(`${p.mom}★`);
    const statStr=parts.length?parts.join(" · "):(p.cs?`${p.cs} TK`:`${p.ovr} GEN`);
    const dispNm=(p.mine&&!isMvp?"★ ":"")+totsDispName(p.n,cw<=220?4:3);
    c.save();
    if(isMvp){
      const ch=244,x=Math.round(cx-cw/2),y=Math.round(cy-ch/2);
      c.save();
      c.shadowColor="rgba(240,194,75,.38)";c.shadowBlur=32;
      const mg=c.createLinearGradient(x,y,x+cw,y+ch);
      mg.addColorStop(0,"rgba(240,194,75,.32)");mg.addColorStop(.55,"rgba(168,128,32,.20)");mg.addColorStop(1,"rgba(18,26,20,.88)");
      c.fillStyle=mg;rr(c,x,y,cw,ch,22);c.fill();
      c.restore();
      c.lineWidth=2.6;c.strokeStyle="#f0c24b";rr(c,x,y,cw,ch,22);c.stroke();
      // Top-right MVP corner tab
      c.save();rr(c,x,y,cw,ch,22);c.clip();
      const tw=76,th=32;
      c.fillStyle=grad(c,x+cw-tw,x+cw,"#fbeaa8","#d4a017");
      c.beginPath();c.moveTo(x+cw-tw,y);c.lineTo(x+cw,y);c.lineTo(x+cw,y+th);c.lineTo(x+cw-tw+12,y+th);c.quadraticCurveTo(x+cw-tw,y+th,x+cw-tw,y+th-12);c.closePath();c.fill();
      tx(c,"MVP",x+cw-tw/2+2,y+th/2+1,18,"#2b2000","center",700);
      c.restore();
      // Crest + position pill
      c.save();c.shadowColor="rgba(0,0,0,.6)";c.shadowBlur=16;c.shadowOffsetY=6;
      drawBadge(c,p.ti,cx-38,y+24,76);
      c.restore();
      drawPill(c,p.pos,cx+16,y+76,58,28,posCol[p.grp]||"#3b4ec8",null,"rgba(255,255,255,.35)","#fff",16);
      c.font="700 30px "+NUMF;
      tx(c,fit(c,dispNm,cw-24),cx,y+144,30,"#fff7d6","center",700);
      drawPill(c,statStr,x+22,y+182,cw-44,38,"rgba(34,26,8,.68)",null,"rgba(240,194,75,.72)","#fbeaa8",21);
    }else{
      // Floating Broadcast Style (No outer rectangle)
      c.save();c.shadowColor="rgba(0,0,0,.6)";c.shadowBlur=18;c.shadowOffsetY=7;
      drawBadge(c,p.ti,cx-38,cy-98,76);
      c.restore();
      drawPill(c,p.pos,cx+16,cy-46,56,26,posCol[p.grp]||"#3b4ec8",null,"rgba(255,255,255,.32)","#fff",15);
      // Frosted dark-green nameplate pill
      const nw=cw-12,nx=Math.round(cx-nw/2),ny=cy-6;
      c.save();c.shadowColor="rgba(0,0,0,.45)";c.shadowBlur=12;c.shadowOffsetY=4;
      c.fillStyle="rgba(10,28,22,.86)";rr(c,nx,ny,nw,48,14);c.fill();
      c.restore();
      c.lineWidth=1.8;c.strokeStyle=p.mine?"rgba(240,194,75,.65)":"rgba(110,231,183,.34)";rr(c,nx,ny,nw,48,14);c.stroke();
      c.font="700 28px "+NUMF;
      tx(c,fit(c,dispNm,nw-20),cx,ny+25,28,p.mine?"#fbeaa8":"#ffffff","center",700);
      // Compact stat pill
      const sw=Math.min(nw-16,Math.max(106,statStr.length*15+36));
      drawPill(c,statStr,Math.round(cx-sw/2),ny+54,sw,34,"rgba(8,24,18,.90)",null,"rgba(62,230,168,.44)","#5eead4",20);
    }
    c.restore();
  };

  // Dynamic 7-Formation Coordinates (zero-overlap broadcast spacing)
  const CV_LAY={
    "4-3-3":{F:[[250,368,242],[540,336,242],[830,368,242]],M:[[246,642,246],[540,676,246],[834,642,246]],D:[[174,904,218],[418,954,218],[662,954,218],[906,904,218]],K:[[540,1208,242]]},
    "4-4-2":{F:[[365,344,242],[715,344,242]],M:[[182,622,218],[422,666,218],[658,666,218],[898,622,218]],D:[[174,908,218],[418,956,218],[662,956,218],[906,908,218]],K:[[540,1210,242]]},
    "4-5-1":{F:[[540,304,242]],M:[[206,506,214],[390,694,214],[540,498,214],[690,694,214],[874,506,214]],D:[[174,926,218],[418,970,218],[662,970,218],[906,926,218]],K:[[540,1218,242]]},
    "3-5-2":{F:[[365,308,242],[715,308,242]],M:[[206,512,214],[390,700,214],[540,504,214],[690,700,214],[874,512,214]],D:[[250,960,240],[540,980,240],[830,960,240]],K:[[540,1220,242]]},
    "3-4-3":{F:[[250,366,242],[540,332,242],[830,366,242]],M:[[182,628,218],[422,672,218],[658,672,218],[898,628,218]],D:[[250,944,240],[540,964,240],[830,944,240]],K:[[540,1210,242]]},
    "5-3-2":{F:[[365,318,242],[715,318,242]],M:[[248,566,240],[540,596,240],[832,566,240]],D:[[164,798,204],[328,996,204],[540,1010,204],[752,996,204],[916,798,204]],K:[[540,1224,242]]},
    "5-4-1":{F:[[540,304,242]],M:[[182,542,216],[422,582,216],[658,582,216],[898,542,216]],D:[[164,798,204],[328,996,204],[540,1010,204],[752,996,204],[916,798,204]],K:[[540,1224,242]]}
  };
  const lay=CV_LAY[fmtStr]||CV_LAY["4-3-3"];
  F.forEach((p,i)=>{const q=lay.F[i]||[540,350,240];drawPlayer(p,q[0],q[1],q[2])});
  M.forEach((p,i)=>{const q=lay.M[i]||[540,650,220];drawPlayer(p,q[0],q[1],q[2])});
  D.forEach((p,i)=>{const q=lay.D[i]||[540,950,210];drawPlayer(p,q[0],q[1],q[2])});
  K.forEach((p,i)=>{const q=lay.K[i]||[540,1212,242];drawPlayer(p,q[0],q[1],q[2])});

  drawPosterFooter(c,W,H,s.name.toUpperCase()+" · TURNUVANIN EN İYİ 11'İ ("+fmtStr+")");
  return cv}
async function koCv(s){
  if(isLg(s.cfg)||!s.G)throw new Error("Eleme ağacı yok");
  initKoBracket(s,false);
  const sim=ensureSim(s),ko=sim.ko,RDs=rds(s.cfg).filter(r=>r!=="Grup");
  if(!RDs.length||!RDs.some(rd=>Array.isArray(ko[rd])&&ko[rd].length))throw new Error("Eleme ağacı henüz oluşmadı");
  if(typeof preloadLogos==="function"){const _ki=[];RDs.forEach(rd=>(ko[rd]||[]).forEach(m=>{if(m){if(m.h!=null)_ki.push(m.h);if(m.a!=null)_ki.push(m.a);if(m.b!=null)_ki.push(m.b)}}));await preloadLogos(_ki)}
  const firstCnt=(ko[RDs[0]]&&ko[RDs[0]].length)||Math.max(1,Math.floor(adv(s.cfg)/2));
  const colW=300,colGap=68,padX=54,headH=210,footH=92,slotH=124;
  const W=Math.max(1080,padX*2+RDs.length*colW+(RDs.length-1)*colGap);
  const bodyH=Math.max(580,firstCnt*slotH);
  const H=headH+bodyH+footH;
  const cv=mkCv(W,H),c=cv.getContext("2d");
  const cb=s.my!=null&&T[s.my]?bspec(s.my):null,out=getTourneyOutcome(s),champ=!!(out&&out.done&&out.ch===s.my);
  dkBg(c,W,H,cb?cb.c1:"#38bdf8",cb?cb.c2:"#f0c24b",champ);

  // Header
  drawPill(c,"ELEME AĞACI · BRACKET",48,42,262,38,"rgba(240,194,75,.18)","rgba(240,194,75,.06)","rgba(240,194,75,.52)","#fbeaa8",20);
  tx(c,s.name.toUpperCase()+" · ELEME TURLARI",48,114,50,"#f8fafc","left",700);
  tx(c,s.date||today(),W-48,70,25,"#94a3b8","right",600);
  const subR=out&&out.done?"ŞAMPİYON: "+T[out.ch].n.toUpperCase():koPath(s.cfg).toUpperCase();
  c.font="700 22px "+NUMF;tx(c,fit(c,subR,480),W-48,112,22,out&&out.done?"#fbeaa8":"#3ee6a8","right",700);

  const totalW=RDs.length*colW+(RDs.length-1)*colGap;
  const startX=Math.round((W-totalW)/2);
  const cardH=96;

  // Compute slot centers for each round
  const centers=RDs.map((rd,rIdx)=>{
    const cnt=Math.max(1,Math.round(firstCnt/Math.pow(2,rIdx)));
    const step=bodyH/cnt;
    return rg(cnt).map(pIdx=>headH+34+step*(pIdx+0.5));
  });

  // Draw orthogonal bracket connectors first (underneath nodes)
  for(let rIdx=0;rIdx<RDs.length-1;rIdx++){
    const rd=RDs[rIdx],pairs=Array.isArray(ko[rd])?ko[rd]:[];
    const xRight=startX+rIdx*(colW+colGap)+colW;
    const xNext=startX+(rIdx+1)*(colW+colGap);
    const xMid=Math.round((xRight+xNext)/2);
    const curC=centers[rIdx],nxtC=centers[rIdx+1];
    for(let pIdx=0;pIdx<curC.length;pIdx++){
      const p=pairs[pIdx]||null,done=!!(p&&p.w!=null),mine=!!(p&&(p.t1===s.my||p.t2===s.my));
      const y1=curC[pIdx],y2=nxtC[Math.floor(pIdx/2)];
      c.save();
      c.lineWidth=mine?3:done?2.4:1.8;
      c.strokeStyle=mine?"#f0c24b":done?"rgba(62,230,168,.72)":"rgba(148,163,184,.28)";
      c.beginPath();c.moveTo(xRight,y1);c.lineTo(xMid,y1);c.lineTo(xMid,y2);c.lineTo(xNext,y2);c.stroke();
      c.restore();
    }
  }

  // Draw round headers and match nodes
  RDs.forEach((rd,rIdx)=>{
    const isFin=rIdx===RDs.length-1;
    const x=startX+rIdx*(colW+colGap);
    const pairs=Array.isArray(ko[rd])?ko[rd]:[];
    drawPill(c,(isFin?"🏆 ":"")+rd.toUpperCase(),x+40,headH-12,colW-80,32,isFin?"rgba(240,194,75,.22)":"rgba(255,255,255,.07)",null,isFin?"rgba(240,194,75,.55)":"rgba(255,255,255,.15)",isFin?"#fbeaa8":"#cbd5e1",18);
    centers[rIdx].forEach((cy,pIdx)=>{
      const p=pairs[pIdx]||null,done=!!(p&&p.w!=null),mine=!!(p&&(p.t1===s.my||p.t2===s.my));
      const y=Math.round(cy-cardH/2);
      glassBox(c,x,y,colW,cardH,16,mine?"rgba(240,194,75,.75)":isFin?"rgba(240,194,75,.55)":"rgba(255,255,255,.14)",mine||isFin?"#f0c24b":null);
      const drawRow=(ti,g,isW,isL,ry)=>{
        if(ti==null||!T[ti]){
          tx(c,"Bekleniyor…",x+20,ry,21,"#64748b","left",600);
          tx(c,"—",x+colW-20,ry,22,"#475569","right",700);
          return;
        }
        if(isW){
          c.fillStyle=ti===s.my?"rgba(240,194,75,.18)":"rgba(62,230,168,.12)";
          rr(c,x+4,ry-19,colW-8,38,10);c.fill();
        }
        c.save();if(isL)c.globalAlpha=.48;
        drawBadge(c,ti,x+14,ry-13,22);
        c.font=(isW?"700":"600")+" 22px "+NUMF;
        tx(c,fit(c,(ti===s.my?"★ ":"")+T[ti].n,colW-94),x+44,ry+1,22,ti===s.my?"#fbeaa8":isW?"#ffffff":"#cbd5e1","left",isW?700:600);
        tx(c,done?String(g):"·",x+colW-18,ry+1,24,isW?"#3ee6a8":"#94a3b8","right",700);
        c.restore();
      };
      const w1=done&&p.w===p.t1,w2=done&&p.w===p.t2;
      drawRow(p?p.t1:null,p?p.g1:null,w1,done&&!w1,y+25);
      c.fillStyle="rgba(255,255,255,.09)";c.fillRect(x+12,y+48,colW-24,1);
      drawRow(p?p.t2:null,p?p.g2:null,w2,done&&!w2,y+71);
      if(done&&(p.pf!=null||p.et)){
        const tag=p.pf!=null?`P ${p.pf}-${p.pa}`:"UZ";
        drawPill(c,tag,x+colW-74,y+cardH-13,62,20,"#0b1622",null,"rgba(240,194,75,.55)","#fbeaa8",13);
      }
    });
  });

  drawPosterFooter(c,W,H,s.name.toUpperCase()+" · ELEME AĞACI");
  return cv}
function clrImg(){if(st.img&&st.img.url&&st.img.url.startsWith("blob:")){try{URL.revokeObjectURL(st.img.url)}catch(e){}}st.img=null}
async function mkImg(kind,x){
  if(st.isGenerating)return;
  if(kind=="karne"&&x.my==null){ask("Karne için önce takım seçilmiş olmalı.");render();return}
  if(kind=="kura"&&!x.G){ask("Önce kurayı çek.");render();return}
  st.isGenerating=kind;st.genId=(kind=="karne"||kind=="mac")&&x&&x.id!=null?x.id:null;
  ntf("⏳ Görsel hazırlanıyor…");render();
  await new Promise(r=>{if(typeof requestAnimationFrame=="function")requestAnimationFrame(()=>setTimeout(r,16));else setTimeout(r,16)});
  try{
    try{await document.fonts.load('700 30px "FC Sayi"')}catch(e){}
    const cv=kind=="kura"?await kuraCv(x):kind=="tots"?await totsCv(x):kind=="ko"?await koCv(x):kind=="kariyer"?await kariyerCv():kind=="mac"?await macCv(x):await karneCv(x);
    const blob=await new Promise(r=>cv.toBlob(r,"image/png"));
    const url=blob&&typeof URL!="undefined"&&URL.createObjectURL?URL.createObjectURL(blob):cv.toDataURL("image/png");
    clrImg();hideToast();
    st.img={title:kind=="kariyer"?"Kariyer özeti":kind=="mac"?"Maç kartı":kind=="tots"?x.name+" · En İyi 11 (TOTS)":kind=="ko"?x.name+" · Eleme Ağacı":x.name+(kind=="kura"?" kurası":" karnesi"),name:"fc27-"+kind+"-"+x.name.replace(/[^\wÀ-ɏ]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase()+".png",url,blob,msg:"",x,w:cv.width,h:cv.height,anim:kind=="karne"&&!rm()};
  }catch(e){hideToast();ask("Görsel oluşturulamadı.")}
  finally{st.isGenerating=false;st.genId=null;render()}
  if(st.img&&st.img.anim)playKarne(st.img)}
const imgDlg=()=>{const shIc='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>';return `<div class="dlg"><div class="dbox wide pimgdlg" role="dialog" aria-modal="true"><div class="pimg-hd"><span class="aci">${UICO.trophy}</span><div class="pimg-t"><b>${esc(st.img.title)}</b><small>Yüksek çözünürlüklü PNG kartı</small></div><button class="mb sc-ic" data-a="no" aria-label="Kapat">✕</button></div><div class="pimg-stage">${st.img.anim?`<canvas id="kcv" class="shimg" width="${st.img.w||1080}" height="${st.img.h||1400}" role="img" aria-label="${esc(st.img.title)}"></canvas>`:`<img class="shimg" src="${st.img.url}" alt="${esc(st.img.title)}">`}</div><div class="pimg-nt">${esc(st.img.msg||"Görsele basılı tutarak da galeriye kaydedebilirsin.")}</div><div class="pimg-acts"><button class="btn p pset-pri" data-a="shimg">${shIc}<span>Paylaş</span></button><a class="btn pset-sec" href="${st.img.url}" download="${esc(st.img.name)}">${UICO.backup}<span>İndir</span></a></div></div></div>`};

async function kariyerCv(){const mode=st.hmod||"all",d=careerData(mode),isL=mode=="lg",isC=mode=="cup",W=1080;
  const bestMap=isL?SNL:SN,totM=d.t.w+d.t.d+d.t.l,wrPct=totM?Math.round(d.t.w/totM*100):0;
  const cards=[];
  if(d.ga)cards.push(["SKOR KATKISI LİDERİ",d.ga.n,d.ga.v+" G+A","#fbeaa8"]);
  if(d.g)cards.push(["EN GOLCÜ",d.g.n,d.g.v+" Gol","#f0c24b"]);
  if(d.a)cards.push(["ASİST LİDERİ",d.a.n,d.a.v+" Asist","#38bdf8"]);
  if(d.mom)cards.push(["MAÇIN ADAMI LİDERİ",d.mom.n,d.mom.v+" MOTM","#3ee6a8"]);
  if(d.duo)cards.push(["ALTIN İKİLİ",d.duo.n,d.duo.m+"M · "+d.duo.tot+" Ortak Gol","#2dd4bf"]);
  const hasBest=d.best>=0,cRows=Math.ceil(cards.length/2);
  const hasLd=hasBest||cards.length>0;
  const boxH=hasLd?(74+(hasBest?84:0)+(cRows?cRows*102+(cRows-1)*12+8:0)+20):0;
  const H=Math.max(1180,874+(boxH?boxH+24:0)+84);
  const cv=mkCv(W,H),c=cv.getContext("2d");
  dkBg(c,W,H,"#38bdf8","#f0c24b",d.ch>0);

  // Header
  const pillTxt=isL?"LİG KARİYERİ":isC?"KUPA KARİYERİ":"KARİYER ÖZETİ";
  drawPill(c,pillTxt,48,42,196,38,"rgba(240,194,75,.16)","rgba(240,194,75,.06)","rgba(240,194,75,.48)","#fbeaa8",20);
  tx(c,(store.owner?store.owner.toUpperCase()+" · ":"")+"MENAJER KARİYERİ",48,114,50,"#f8fafc","left",700);
  tx(c,today(),W-48,70,25,"#94a3b8","right",600);
  tx(c,d.n+" SEZON · "+totM+" MAÇ",W-48,112,22,"#3ee6a8","right",700);

  // Hero Trophy & Seasons Showcase
  const hy=178,hh=264;
  if(d.ch>0){
    c.save();
    const cg=c.createLinearGradient(44,hy,1036,hy+hh);
    cg.addColorStop(0,"#fdf2c0");cg.addColorStop(.52,"#e6bc45");cg.addColorStop(1,"#c49216");
    c.fillStyle=cg;rr(c,44,hy,992,hh,28);c.fill();
    c.lineWidth=2.5;c.strokeStyle="#fff4cc";c.stroke();
    c.restore();
  }else{
    glassBox(c,44,hy,992,hh,28,"rgba(240,194,75,.42)","#38bdf8");
  }
  const hCol=d.ch>0?"#2b2000":"#fbeaa8",sCol=d.ch>0?"#4a3600":"#94a3b8";
  tx(c,d.ch,292,hy+106,154,hCol,"center",700);
  tx(c,"ŞAMPİYONLUK",292,hy+210,30,sCol,"center",700);
  c.fillStyle=d.ch>0?"rgba(43,32,0,.18)":"rgba(255,255,255,.12)";c.fillRect(539,hy+44,2,176);
  tx(c,d.n,788,hy+106,154,hCol,"center",700);
  tx(c,isL?"LİG SEZONU":isC?"KUPA SEZONU":"SEZON",788,hy+210,30,sCol,"center",700);

  // Row 1 KPI: G / B / M
  const ky1=468;
  [[d.t.w,"GALİBİYET","#3ee6a8",totM?"%"+wrPct:""],[d.t.d,"BERABERLİK","#94a3b8",""],[d.t.l,"MAĞLUBİYET","#ff6b6b",""]].forEach(([val,lbl,col,sub],i)=>{
    const bx=44+i*338;
    glassBox(c,bx,ky1,316,174,22,"rgba(255,255,255,.10)",col);
    c.fillStyle=col;rr(c,bx+24,ky1+1,268,4,2);c.fill();
    tx(c,val,bx+158,ky1+76,104,col,"center",700);
    tx(c,lbl,bx+158,ky1+144,24,"#94a3b8","center",700);
    if(sub)drawPill(c,sub,bx+234,ky1+18,64,28,"rgba(62,230,168,.16)",null,"rgba(62,230,168,.4)","#3ee6a8",17);
  });

  // Proportional W-D-L Strip
  const byBar=656;
  c.fillStyle="rgba(255,255,255,.07)";rr(c,44,byBar,992,10,5);c.fill();
  if(totM>0){
    let cx=44;
    [[d.t.w,"#12b886"],[d.t.d,"#64748b"],[d.t.l,"#ef4444"]].forEach(([cnt,col])=>{
      if(!cnt)return;const segW=Math.max(12,Math.round((cnt/totM)*992));
      c.fillStyle=col;rr(c,cx,byBar,Math.min(segW,1036-cx),10,5);c.fill();cx+=segW+4;
    });
  }

  // Row 2 KPI: Atılan / Yenen / Averaj / Final or Podium
  const ky2=682,av=d.t.gf-d.t.ga,avStr=(av>0?"+":"")+av;
  [["ATILAN GOL",d.t.gf,"#f8fafc"],["YENEN GOL",d.t.ga,"#cbd5e1"],["AVERAJ",avStr,av>0?"#3ee6a8":av<0?"#ff6b6b":"#94a3b8"],[isL?"İLK 3 (PODYUM)":"FİNALE KALMA",isL?d.pod:d.fin,"#f0c24b"]].forEach(([lbl,val,vc],i)=>{
    const bx=44+i*253;
    glassBox(c,bx,ky2,233,124,20,"rgba(255,255,255,.09)");
    tx(c,val,bx+116,ky2+50,58,vc,"center",700);
    tx(c,lbl,bx+116,ky2+98,21,"#94a3b8","center",600);
  });

  // Career Leaders & Records Showcase
  if(boxH){
    const by=832;
    glassBox(c,44,by,992,boxH,24,"rgba(240,194,75,.28)","#f0c24b");
    tx(c,"KARİYER LİDERLERİ VE REKORLAR",72,by+38,26,"#f0c24b","left",700);
    let ay=by+72;
    if(hasBest){
      c.save();
      c.fillStyle=grad(c,72,1008,"rgba(240,194,75,.20)","rgba(15,157,107,.10)");
      rr(c,72,ay,936,68,15);c.fill();
      c.lineWidth=1.5;c.strokeStyle="rgba(240,194,75,.48)";c.stroke();
      drawPill(c,"EN İYİ SONUÇ",90,ay+16,144,36,"#f8e08a","#d4a017",null,"#2b2000",19);
      c.font="700 34px "+NUMF;tx(c,fit(c,(bestMap[d.best]||SN[d.best]).trim().toUpperCase(),730),252,ay+35,34,"#fbeaa8","left",700);
      c.restore();
      ay+=84;
    }
    cards.forEach(([lbl,name,stat,col],idx)=>{
      const isLastOdd=idx===cards.length-1&&cards.length%2===1;
      const colI=idx%2,rowI=Math.floor(idx/2);
      const iw=isLastOdd?936:460,ix=72+(isLastOdd?0:colI*476),iy=ay+rowI*114;
      c.fillStyle="rgba(255,255,255,.045)";rr(c,ix,iy,iw,100,15);c.fill();
      c.lineWidth=1.2;c.strokeStyle="rgba(255,255,255,.09)";c.stroke();
      c.fillStyle=col;rr(c,ix,iy+18,5,64,3);c.fill();
      tx(c,lbl,ix+22,iy+28,19,col,"left",700);
      c.font="700 32px "+NUMF;tx(c,fit(c,name,iw-44),ix+22,iy+68,32,"#f8fafc","left",700);
      tx(c,stat,ix+iw-20,iy+28,21,"#cbd5e1","right",600);
    });
  }
  drawPosterFooter(c,W,H,pillTxt+" · "+d.n+" SEZON");
  return cv}

/* Maç kartı görseli */
const findM=id=>{for(const x of store.seasons){const m=(x.mt||[]).find(q=>q.id==id);if(m)return{id,x,m,name:"mac-"+id}}return null};
async function macCv(q){const x=q.x,m=q.m,r=mres(m),oi=m.opp!=null&&T[m.opp]?m.opp:ixOf(m.on),me=x.my!=null&&T[x.my]?x.my:null;
  if(typeof preloadLogos==="function")await preloadLogos([me,oi]);
  const cHome=me!=null?bspec(me).c1:"#0f9d6b",cAway=oi!=null&&oi>=0&&T[oi]?bspec(oi).c1:"#f97316";
  const hasGls=Array.isArray(m.gls)&&m.gls.some(g=>g&&g.sc);
  const glList=hasGls?m.gls.filter(g=>g&&g.sc):[];
  const sc=Object.entries(m.sc||{}).filter(e=>e[1]>0).sort((a,b)=>b[1]-a[1]),as=Object.entries(m.as||{}).filter(e=>e[1]>0).sort((a,b)=>b[1]-a[1]);
  const n=hasGls?Math.min(6,glList.length):Math.min(6,sc.length),ex=hasGls?glList.length>6:sc.length>6,na=hasGls?0:Math.min(4,as.length);
  const des=matchDeserve(m),eff=xgEffInfo(m),stObj=m.stats;
  const stRows=[];
  if(stObj){
    if(stObj.myPos!=null||stObj.oppPos!=null){const a=stObj.myPos??50,b=stObj.oppPos??(100-a);stRows.push(["TOPLA OYNAMA","%"+a,"%"+b,a,b])}
    if(stObj.myShots!=null||stObj.oppShots!=null){const a=stObj.myShots??0,b=stObj.oppShots??0;stRows.push(["TOPLAM ŞUT",String(a),String(b),a,b])}
    if(stObj.mySot!=null||stObj.oppSot!=null){const a=stObj.mySot??0,b=stObj.oppSot??0;stRows.push(["İSABETLİ ŞUT",String(a),String(b),a,b])}
    if(stObj.myPass!=null||stObj.oppPass!=null){const a=stObj.myPass??0,b=stObj.oppPass??0;stRows.push(["PAS İSABETİ","%"+a,"%"+b,a,b])}
    if(stObj.myXg!=null||stObj.oppXg!=null){const a=stObj.myXg??0,b=stObj.oppXg??0;stRows.push(["GOL BEKLENTİSİ (xG)",a.toFixed(2).replace(".",","),b.toFixed(2).replace(".",","),a,b])}
  }
  const stBoxH=stRows.length?(84+stRows.length*66+(eff?56:0)+16):0;
  const momStr=m.mom||(m.omom||(oi!=null&&oi>=0&&T[oi]?pickOppMom(oi,m.og,m.gf,m.ga):""));
  const momDisp=m.mom?m.mom:(momStr?`${momStr} (${m.on})`:"");
  const gRowCnt=n+(ex?1:0)+(na?1:0);
  const ch=(gRowCnt||momDisp)?(74+gRowCnt*52+(momDisp?82:0)+18):0;
  const W=1080,H=604+(stBoxH?stBoxH+24:0)+(ch?ch+24:0)+104+80;
  const cv=mkCv(W,H),c=cv.getContext("2d");
  try{await document.fonts.load('700 30px "FC Sayi"')}catch(e){}
  dkBg(c,W,H,cHome,cAway,false);

  // Header
  const stageTag=(m.rd+(m.lg?" · "+m.lg+". MAÇ":"")).toUpperCase();
  drawPill(c,"MAÇ SONUCU",48,42,164,38,"rgba(240,194,75,.16)","rgba(240,194,75,.06)","rgba(240,194,75,.48)","#fbeaa8",20);
  drawPill(c,stageTag,224,42,Math.min(340,Math.max(120,stageTag.length*15+36)),38,"rgba(255,255,255,.08)",null,"rgba(255,255,255,.16)","#e2e8f0",19);
  tx(c,x.name.toUpperCase(),48,114,48,"#f8fafc","left",700);
  tx(c,new Date(m.id).toLocaleDateString("tr-TR"),W-48,112,26,"#94a3b8","right",600);

  // Hero Broadcast Scoreboard
  const isUnlucky=des&&des.k=="unlucky",isSteal=des&&des.k=="undeserved";
  const vBg1=isUnlucky?"#f97316":isSteal?"#2563eb":{w:"#12b886",d:"#64748b",l:"#e03131"}[r];
  const vBg2=isUnlucky?"#c2410c":isSteal?"#1e3a8a":{w:"#0a7c56",d:"#475569",l:"#991b1b"}[r];
  const vBdr=isUnlucky?"#fb923c":isSteal?"#60a5fa":{w:"#3ee6a8",d:"#94a3b8",l:"#ff6b6b"}[r];
  const hasP=m.pf!=null&&m.pa!=null;
  const baseLab=hasP?(r=="w"?"PENALTILARLA GALİBİYET":r=="l"?"PENALTILARLA MAĞLUBİYET":"BERABERLİK"):(m.et?({w:"UZATMADA GALİBİYET",d:"BERABERLİK (UZ)",l:"UZATMADA MAĞLUBİYET"}[r]):({w:"GALİBİYET",d:"BERABERLİK",l:"MAĞLUBİYET"}[r]));
  const lab=(des&&des.k!="fair"?des.t:baseLab).toUpperCase();

  const hy=178,hh=400;
  glassBox(c,44,hy,992,hh,28,"rgba(255,255,255,.16)");
  // Dual-club interior spotlight wash
  c.save();rr(c,44,hy,992,hh,28);c.clip();
  c.globalAlpha=.24;
  const sh1=c.createRadialGradient(180,hy+140,10,180,hy+140,340);sh1.addColorStop(0,cHome);sh1.addColorStop(1,"transparent");
  c.fillStyle=sh1;c.fillRect(44,hy,500,hh);
  const sh2=c.createRadialGradient(900,hy+140,10,900,hy+140,340);sh2.addColorStop(0,cAway);sh2.addColorStop(1,"transparent");
  c.fillStyle=sh2;c.fillRect(540,hy,496,hh);
  // Top dual-club bar
  c.globalAlpha=1;
  const topBar=c.createLinearGradient(44,0,1036,0);
  topBar.addColorStop(0,cHome);topBar.addColorStop(.5,"#f0c24b");topBar.addColorStop(1,cAway);
  c.fillStyle=topBar;c.fillRect(44,hy,992,5);
  c.restore();

  // Crests with broadcast drop shadows
  c.save();c.shadowColor="rgba(0,0,0,.6)";c.shadowBlur=24;c.shadowOffsetY=10;
  if(me!=null)drawBadge(c,me,126,hy+44,144);
  if(oi!=null&&oi>=0&&T[oi])drawBadge(c,oi,810,hy+44,144);
  c.restore();
  c.font="700 42px "+NUMF;
  tx(c,fit(c,(me!=null?T[me].n:"Takımım").toUpperCase(),280),198,hy+246,42,"#f8fafc","center",700);
  tx(c,fit(c,(m.on||"Rakip").toUpperCase(),280),882,hy+246,42,"#f8fafc","center",700);
  if(me!=null)tx(c,CN[T[me].c][0],198,hy+288,26,"#94a3b8","center",600);
  if(oi!=null&&oi>=0&&T[oi])tx(c,CN[T[oi].c][0],882,hy+288,26,"#94a3b8","center",600);

  // Giant Sculpted Score
  const scStr=m.gf+" – "+m.ga;
  c.save();c.shadowColor="rgba(251,234,168,.28)";c.shadowBlur=26;
  tx(c,scStr,540,hasP||m.et?hy+124:hy+148,scStr.length>5?124:162,"#fbeaa8","center",700);
  c.restore();
  if(hasP)drawPill(c,`PENALTILAR  ${m.pf} – ${m.pa}`,400,hy+216,280,40,"rgba(16,185,129,.18)",null,"rgba(62,230,168,.45)","#3ee6a8",22);
  else if(m.et)drawPill(c,"UZATMA SONUNDA (UZ)",405,hy+216,270,38,"rgba(240,194,75,.16)",null,"rgba(240,194,75,.45)","#fbeaa8",21);

  // Verdict Pill
  drawPill(c,lab,270,hy+316,540,56,vBg1,vBg2,vBdr,"#ffffff",28);

  let y=hy+hh+24;
  // Opta / Broadcast Match Analysis
  if(stBoxH){
    glassBox(c,44,y,992,stBoxH,24,"rgba(255,255,255,.11)");
    tx(c,"MAÇ ANALİZİ",74,y+40,26,"#f0c24b","left",700);
    if(des)drawPill(c,des.t.toUpperCase(),736,y+21,270,36,"rgba(255,255,255,.07)",null,vBdr,vBdr,18);
    let sy=y+92;
    stRows.forEach(([lbl,v1,v2,n1,n2])=>{
      const aNum=+n1||0,bNum=+n2||0,leadA=aNum>bNum,leadB=bNum>aNum;
      tx(c,v1,74,sy,32,leadA?"#3ee6a8":"#cbd5e1","left",700);
      tx(c,lbl,540,sy-4,21,"#94a3b8","center",700);
      tx(c,v2,1006,sy,32,leadB?"#fb923c":"#cbd5e1","right",700);
      const tot=aNum+bNum,p1=tot>0?aNum/tot:0.5;
      const bx=182,bw=716,by=sy+17,bh=10,w1=Math.round(bw*p1);
      c.fillStyle="rgba(255,255,255,.08)";rr(c,bx,by,bw,bh,5);c.fill();
      if(w1>0){c.fillStyle=leadA?"#12b886":"rgba(18,184,134,.45)";rr(c,bx,by,Math.max(8,w1-3),bh,5);c.fill()}
      if(bw-w1>0){c.fillStyle=leadB?"#f97316":"rgba(249,115,22,.45)";rr(c,bx+w1+3,by,Math.max(8,bw-w1-3),bh,5);c.fill()}
      sy+=66;
    });
    if(eff){
      const ec=eff.cls=="pos"?"#3ee6a8":eff.cls=="neg"?"#fb923c":"#94a3b8";
      const eBg=eff.cls=="pos"?"rgba(16,185,129,.14)":eff.cls=="neg"?"rgba(249,115,22,.14)":"rgba(148,163,184,.12)";
      drawPill(c,"Gol − xG: "+eff.t,210,sy-4,660,42,eBg,null,ec,ec,23);
    }
    y+=stBoxH+24;
  }

  // Match Details & Goals
  if(ch){
    glassBox(c,44,y,992,ch,24,"rgba(255,255,255,.11)");
    tx(c,"GOLLER VE MAÇ DETAYLARI",74,y+40,26,"#f0c24b","left",700);
    let ry=y+88;
    if(hasGls){
      glList.slice(0,6).forEach((g,idx)=>{
        const kk=isKK(g.sc);
        c.fillStyle="rgba(255,255,255,.038)";rr(c,72,ry-20,936,44,11);c.fill();
        c.fillStyle=kk?"#ef4444":"#10b981";rr(c,82,ry-13,30,30,15);c.fill();
        tx(c,kk?"KK":(idx+1),97,ry+3,18,kk?"#fff":"#052e16","center",700);
        c.font="700 31px "+NUMF;
        tx(c,fit(c,kk?"Kendi Kalesine (KK)":g.sc,540),126,ry+3,31,kk?"#ff6b6b":"#f8fafc","left",700);
        if(!kk&&g.as){
          c.font="600 22px "+NUMF;const aTxt=fit(c,"ASİST · "+g.as,310);
          drawPill(c,aTxt,686,ry-14,310,32,"rgba(62,230,168,.12)",null,"rgba(62,230,168,.32)","#3ee6a8",20);
        }
        ry+=52;
      });
      if(ex){tx(c,"+ "+(glList.length-6)+" gol daha",84,ry+2,24,"#94a3b8","left",600);ry+=52}
    }else{
      sc.slice(0,6).forEach(([nm,g],idx)=>{
        const kk=isKK(nm);
        c.fillStyle="rgba(255,255,255,.038)";rr(c,72,ry-20,936,44,11);c.fill();
        c.fillStyle=kk?"#ef4444":"#10b981";rr(c,82,ry-13,30,30,15);c.fill();
        tx(c,kk?"KK":(idx+1),97,ry+3,18,kk?"#fff":"#052e16","center",700);
        c.font="700 31px "+NUMF;tx(c,fit(c,kk?"Kendi Kalesine (KK)":nm,720),126,ry+3,31,"#f8fafc","left",700);
        drawPill(c,"× "+g,912,ry-14,84,32,"rgba(62,230,168,.16)",null,"rgba(62,230,168,.38)","#3ee6a8",22);
        ry+=52;
      });
      if(ex){tx(c,"+ "+(sc.length-6)+" golcü daha",84,ry+2,24,"#94a3b8","left",600);ry+=52}
      if(na){c.font="600 25px "+NUMF;tx(c,fit(c,"ASİST: "+as.slice(0,4).map(([nm,a])=>nm+(a>1?" (×"+a+")":"")).join(", "),910),84,ry+2,25,"#3ee6a8","left",600);ry+=52}
    }
    if(momDisp){
      const my2=ry-6;
      c.save();
      c.fillStyle=grad(c,72,1008,"rgba(240,194,75,.22)","rgba(240,194,75,.06)");
      rr(c,72,my2,936,64,15);c.fill();
      c.lineWidth=1.6;c.strokeStyle="rgba(240,194,75,.52)";c.stroke();
      drawPill(c,"★ MOTM",88,my2+14,120,36,"#f8e08a","#d4a017",null,"#2b2000",20);
      c.font="700 32px "+NUMF;tx(c,fit(c,momDisp,750),226,my2+33,32,"#fbeaa8","left",700);
      c.restore();
    }
    y+=ch+24;
  }

  // Son 5 Maç Form Strip
  const ms=(x.mt||[]),ix=ms.findIndex(q=>q.id==m.id),fm=ms.slice(Math.max(0,ix-4),ix+1);
  glassBox(c,44,y,992,80,20,"rgba(255,255,255,.10)");
  tx(c,"SON 5 MAÇ FORMU",74,y+41,24,"#94a3b8","left",700);
  drawFormRow(c,fm,1006,y+40,true);
  drawPosterFooter(c,W,H,x.name.toUpperCase()+" · "+stageTag);
  return cv}

/* ---------- KARNE: SAYILAR YUKARI SAYAR ---------- */
async function playKarne(im){
  const t0=performance.now(),D=1100;
  while(st.img===im&&im.anim){
    const p=Math.min(1,(performance.now()-t0)/D),e=1-Math.pow(1-p,3);
    if(!$("kcv"))return;
    const cv=await karneCv(im.x,e);
    const el=$("kcv");if(st.img!==im||!el)return;
    el.getContext("2d").drawImage(cv,0,0);
    if(p>=1)break;
    await new Promise(r=>requestAnimationFrame(r))}
  if(st.img===im){im.anim=false;render()}}

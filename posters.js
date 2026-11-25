/* FC 27 Grup Ligi — Broadcast PNG Poster Motoru (posters.js · v25.1) */
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
  const G=s.G,gs=G[0].length,n=G.length,lg=isLg(s.cfg);
  const sim=ensureSim(s),hasTbl=(s.cfg.gs||lg||isUcl(s.cfg))&&(s._hasTbl!==undefined?!!s._hasTbl:((sim&&sim.w>0)||(s.mt||[]).some(m=>m.rd==="Grup")));
  if(isUcl(s.cfg)){
    const W=1080,P=40,gap=20,cb=s.my!=null&&T[s.my]?bspec(s.my):null;
    if(hasTbl){
      // 2-column 36-team UCL Broadcast Standings (1-18 left, 19-36 right)
      const cw=(W-2*P-gap)/2,rh=52,hh=64,ch=hh+18*rh+22,HH=184,H=HH+ch+124;
      const cv=mkCv(W,H),c=cv.getContext("2d");
      dkBg(c,W,H,cb?cb.c1:"#38bdf8",cb?cb.c2:"#f0c24b",false);
      const maxW=s._maxW!==undefined?s._maxW:Math.max(sim.w||0,(s.mt||[]).filter(m=>m.rd==="Grup").length);
      drawPill(c,"ŞAMPİYONLAR LİGİ · LİG AŞAMASI",44,40,348,38,"rgba(56,189,248,.18)","rgba(56,189,248,.06)","rgba(56,189,248,.52)","#7dd3fc",19);
      c.font="700 48px "+NUMF;tx(c,fit(c,s.name.toLocaleUpperCase("tr")+" · PUAN DURUMU",610),44,114,48,"#f8fafc","left",700);
      drawPill(c,(maxW?maxW+"/8 HAFTA":"CANLI"),W-44-142,42,142,34,"rgba(16,185,129,.18)",null,"rgba(62,230,168,.48)","#3ee6a8",19);
      tx(c,"36 TAKIM · İLK 8 SON 16 · 9–24 PLAY-OFF",W-44,112,20,"#94a3b8","right",600);
      const tbl=s._calcTbl?s._calcTbl(0):withSn(s,()=>calcGroupTable(s,0));
      const colDef=[{k:"o",l:"O",x:cw-188},{k:"w",l:"G",x:cw-156},{k:"d",l:"B",x:cw-126},{k:"l",l:"M",x:cw-96},{k:"gd",l:"AV",x:cw-62},{k:"pts",l:"P",x:cw-26}];
      [0,1].forEach(colI=>{
        const x=P+colI*(cw+gap),y=HH,slice=tbl.slice(colI*18,(colI+1)*18);
        glassBox(c,x,y,cw,ch,22,"rgba(255,255,255,.12)",colI===0?"#38bdf8":null);
        c.fillStyle="rgba(255,255,255,.06)";rr(c,x+12,y+16,cw-24,32,8);c.fill();
        tx(c,"#",x+28,y+33,15,"#94a3b8","center",700);
        tx(c,colI===0?"SIRALAMA 1 – 18":"SIRALAMA 19 – 36",x+52,y+33,15,"#94a3b8","left",700);
        colDef.forEach(cd=>tx(c,cd.l,x+cd.x,y+33,15,cd.k==="pts"?"#f8fafc":"#94a3b8","center",700));
        slice.forEach((r,si)=>{
          const rk=colI*18+si+1,ry=y+hh+si*rh,yy=ry+rh/2,ti=r.ti,t=T[ti];
          const isMe=ti===s.my,isGu=s._gTi!=null&&ti===s._gTi,isL1=rk===1,isTop8=rk<=8,isPo=rk>=9&&rk<=24;
          const bgCol=isMe?"rgba(240,194,75,.18)":isGu?"rgba(56,189,248,.20)":isL1?"rgba(240,194,75,.10)":isTop8?"rgba(16,185,129,.08)":isPo?"rgba(56,189,248,.065)":"rgba(255,255,255,.024)";
          c.fillStyle=bgCol;rr(c,x+12,ry+3,cw-24,rh-6,9);c.fill();
          if(isMe||isGu||isTop8||isPo){
            c.fillStyle=isMe||isL1?"#f0c24b":isGu?"#38bdf8":isTop8?"#3ee6a8":"#38bdf8";
            rr(c,x+13,ry+10,3.5,rh-20,2);c.fill();
          }
          if(isMe||isGu){c.lineWidth=1.1;c.strokeStyle=isMe?"rgba(240,194,75,.50)":"rgba(56,189,248,.58)";rr(c,x+12,ry+3,cw-24,rh-6,9);c.stroke()}
          const rbx=x+18,rby=yy-11;
          if(isL1){c.fillStyle=grad(c,rbx,rbx+24,"#f8e08a","#d4a017");rr(c,rbx,rby,24,22,6);c.fill();tx(c,rk,rbx+12,yy+1,15,"#2b2000","center",700)}
          else if(isTop8){c.fillStyle="rgba(16,185,129,.22)";rr(c,rbx,rby,24,22,6);c.fill();tx(c,rk,rbx+12,yy+1,15,"#3ee6a8","center",700)}
          else if(isPo){c.fillStyle="rgba(56,189,248,.18)";rr(c,rbx,rby,24,22,6);c.fill();tx(c,rk,rbx+12,yy+1,15,"#7dd3fc","center",700)}
          else{tx(c,rk,rbx+12,yy+1,15,"#64748b","center",700)}
          drawBadge(c,ti,x+47,yy-12,20);
          c.font="700 20px "+NUMF;
          tx(c,fit(c,(isMe?"★ ":isGu?"◆ ":"")+t.n,cw-272),x+73,yy+1,20,isMe?"#fbeaa8":isGu?"#7dd3fc":rk>24?"#94a3b8":"#f1f5f9","left",700);
          const avStr=(r.gd>0?"+":r.gd<0?"−":"")+Math.abs(r.gd);
          colDef.forEach(cd=>{
            if(cd.k==="pts"){
              const px=x+cd.x-18,py=yy-13;
              c.fillStyle=isL1?"rgba(240,194,75,.24)":isTop8?"rgba(16,185,129,.20)":isPo?"rgba(56,189,248,.18)":"rgba(255,255,255,.07)";
              rr(c,px,py,36,26,7);c.fill();
              tx(c,r.pts,x+cd.x,yy+1,20,isL1?"#fbeaa8":isTop8?"#3ee6a8":isPo?"#7dd3fc":"#94a3b8","center",700);
            }else if(cd.k==="gd"){
              tx(c,avStr,x+cd.x,yy+1,18,r.gd>0?"#3ee6a8":r.gd<0?"#ff6b6b":"#94a3b8","center",700);
            }else{
              const mut=cd.k==="d"||cd.k==="l";
              tx(c,r[cd.k],x+cd.x,yy+1,18,mut?"#94a3b8":"#e2e8f0","center",600);
            }
          });
          if(rk===8||rk===24){
            c.save();c.strokeStyle=rk===8?"rgba(62,230,168,.65)":"rgba(56,189,248,.65)";c.lineWidth=1.8;c.setLineDash([6,5]);
            c.beginPath();c.moveTo(x+16,ry+rh);c.lineTo(x+cw-16,ry+rh);c.stroke();c.restore();
          }
        });
      });
      // Legend strip
      const ly=HH+ch+24;
      drawPill(c,"1–8 · DOĞRUDAN SON 16",44,ly,260,32,"rgba(16,185,129,.16)",null,"rgba(62,230,168,.45)","#3ee6a8",16);
      drawPill(c,"9–24 · PLAY-OFF",318,ly,210,32,"rgba(56,189,248,.16)",null,"rgba(56,189,248,.45)","#7dd3fc",16);
      drawPill(c,"25–36 · ELENİR",542,ly,190,32,"rgba(255,255,255,.06)",null,"rgba(255,255,255,.16)","#94a3b8",16);
      drawPosterFooter(c,W,H,s.name.toLocaleUpperCase("tr")+" · ŞAMPİYONLAR LİGİ PUAN DURUMU");
      return cv;
    }
    // UCL Draw Poster: User's 8 Opponents + 4 Pots (2x2)
    const pots=(s.ucl&&s.ucl.pots)||[G[0].slice(0,9),G[0].slice(9,18),G[0].slice(18,27),G[0].slice(27,36)];
    const sched=typeof uclMySchedule==="function"?uclMySchedule(s):[];
    const myBoxH=sched.length?258:0,cw=(W-2*P-gap)/2,rh=44,hh=58,ch=hh+9*rh+16,HH=184;
    const potTop=HH+(myBoxH?myBoxH+20:0),H=potTop+2*ch+gap+96;
    const cv=mkCv(W,H),c=cv.getContext("2d");
    dkBg(c,W,H,cb?cb.c1:"#38bdf8",cb?cb.c2:"#f0c24b",false);
    drawPill(c,"ŞAMPİYONLAR LİGİ KURASI",44,40,290,38,"rgba(56,189,248,.18)","rgba(56,189,248,.06)","rgba(56,189,248,.52)","#7dd3fc",19);
    c.font="700 48px "+NUMF;tx(c,fit(c,s.name.toLocaleUpperCase("tr")+" · 4 TORBA & 8 RAKİP",680),44,114,48,"#f8fafc","left",700);
    tx(c,s.date,W-44,66,24,"#94a3b8","right",600);
    tx(c,"36 TAKIM · 4 EV · 4 DEPLASMAN",W-44,112,21,"#3ee6a8","right",600);
    const imgs=nob();
    await Promise.all([...new Set(G[0].map(i=>T[i].c))].map(async k=>{imgs[k]=await flagImg(k)}));
    if(myBoxH&&s.my!=null&&T[s.my]){
      glassBox(c,P,HH,W-2*P,myBoxH,22,"rgba(240,194,75,.58)","#f0c24b");
      drawBadge(c,s.my,P+18,HH+14,34);
      tx(c,(T[s.my].n+" · 8 MAÇLIK LİG FİKSTÜRÜ").toLocaleUpperCase("tr"),P+64,HH+33,28,"#fbeaa8","left",700);
      sched.forEach((m,idx)=>{
        const col=idx%2,row=Math.floor(idx/2),rx=P+16+col*488,ry=HH+68+row*44;
        c.fillStyle="rgba(255,255,255,.045)";rr(c,rx,ry,472,38,9);c.fill();
        drawPill(c,"H"+m.w,rx+8,ry+6,42,26,"rgba(255,255,255,.09)",null,null,"#cbd5e1",15);
        drawBadge(c,m.opp,rx+58,ry+6,22);
        c.font="700 22px "+NUMF;tx(c,fit(c,T[m.opp].n,260),rx+88,ry+20,22,"#f8fafc","left",700);
        drawPill(c,m.home?"EV":"DEP",rx+358,ry+6,52,26,m.home?"rgba(16,185,129,.22)":"rgba(56,189,248,.18)",null,m.home?"rgba(62,230,168,.45)":"rgba(56,189,248,.45)",m.home?"#3ee6a8":"#7dd3fc",15);
        const tc=TCOL[tierOf(T[m.opp].g)];
        c.fillStyle=grad(c,rx+420,rx+462,tc[0],tc[1]);rr(c,rx+420,ry+6,42,26,7);c.fill();
        tx(c,T[m.opp].g,rx+441,ry+20,18,tc[2],"center",700);
      });
    }
    const myOpps=new Map(sched.map(x=>[x.opp,x.home]));
    withSn(s,()=>pots.forEach((pt,pi)=>{
      const x=P+(pi%2)*(cw+gap),y=potTop+Math.floor(pi/2)*(ch+gap),mine=s.my!=null&&pt.includes(s.my);
      glassBox(c,x,y,cw,ch,22,mine?"rgba(240,194,75,.55)":"rgba(255,255,255,.12)",mine?"#f0c24b":null);
      c.fillStyle=mine?grad(c,x+14,x+50,"#f8e08a","#d4a017"):grad(c,x+14,x+50,"#0ea5e9","#0369a1");
      rr(c,x+14,y+12,36,36,10);c.fill();
      tx(c,String(pi+1),x+32,y+31,22,mine?"#2b2000":"#fff","center",700);
      tx(c,"TORBA "+(pi+1),x+60,y+31,26,mine?"#fbeaa8":"#f8fafc","left",700);
      drawPill(c,"ORT "+fx(avg(pt,"g")),x+cw-100,y+17,86,26,"rgba(255,255,255,.07)",null,"rgba(255,255,255,.14)","#cbd5e1",16);
      pt.forEach((ti,ri)=>{
        const ry=y+hh+ri*rh,yy=ry+rh/2,t=T[ti],tc=TCOL[tierOf(t.g)],im=imgs[t.c],isMe=ti===s.my,isGu=s._gTi!=null&&ti===s._gTi,isOp=myOpps.has(ti);
        c.fillStyle=isMe?"rgba(240,194,75,.16)":isGu?"rgba(56,189,248,.22)":isOp?"rgba(56,189,248,.11)":"rgba(255,255,255,.03)";
        rr(c,x+12,ry+2,cw-24,rh-4,8);c.fill();
        if(isGu){c.lineWidth=1.1;c.strokeStyle="rgba(56,189,248,.58)";c.stroke()}
        drawBadge(c,ti,x+18,yy-11,20);
        if(im)c.drawImage(im,x+44,yy-8,24,16);
        c.font="700 22px "+NUMF;
        tx(c,fit(c,(isMe?"★ ":isGu?"◆ ":"")+t.n,cw-172),x+75,yy+1,22,isMe?"#fbeaa8":isGu||isOp?"#7dd3fc":"#f1f5f9","left",700);
        if(isOp)drawPill(c,myOpps.get(ti)?"EV":"DEP",x+cw-104,yy-11,42,22,myOpps.get(ti)?"rgba(16,185,129,.22)":"rgba(56,189,248,.22)",null,null,myOpps.get(ti)?"#3ee6a8":"#7dd3fc",13);
        c.fillStyle=grad(c,x+cw-54,x+cw-14,tc[0],tc[1]);rr(c,x+cw-54,yy-12,40,24,7);c.fill();
        tx(c,t.g,x+cw-34,yy+1,18,tc[2],"center",700);
      });
    }));
    drawPosterFooter(c,W,H,s.name.toLocaleUpperCase("tr")+" · ŞAMPİYONLAR LİGİ KURASI");
    return cv;
  }
  if(hasTbl){
    const cols=n<=1?1:2,W=1080,P=40,gap=20,cw=(W-2*P-gap*(cols-1))/cols;
    const rh=cols==1?54:50,hh=102,ch=hh+gs*rh+22,rows=Math.ceil(n/cols),HH=184;
    const rawH=HH+rows*ch+(rows-1)*gap+100;
    const maxDim=4096,sc=Math.min(1,maxDim/rawH);
    const cv=mkCv(Math.round(W*sc),Math.round(rawH*sc)),c=cv.getContext("2d");
    if(sc<1)c.scale(sc,sc);
    const cb=s.my!=null&&T[s.my]?bspec(s.my):null;
    dkBg(c,W,rawH,cb?cb.c1:"#38bdf8",cb?cb.c2:"#f0c24b",false);
    const maxW=s._maxW!==undefined?s._maxW:Math.max(sim.w||0,(s.mt||[]).filter(m=>m.rd==="Grup").length);
    drawPill(c,lg?"LİG PUAN DURUMU":"PUAN DURUMU",44,40,lg?218:192,38,"rgba(240,194,75,.18)","rgba(240,194,75,.06)","rgba(240,194,75,.52)","#fbeaa8",20);
    c.font="700 50px "+NUMF;tx(c,fit(c,s.name.toLocaleUpperCase("tr")+(lg?" · LİG TABLOSU":" · GRUPLAR"),580),44,114,50,"#f8fafc","left",700);
    drawPill(c,(maxW?maxW+". HAFTA":"CANLI"),W-44-136,42,136,34,"rgba(16,185,129,.18)",null,"rgba(62,230,168,.48)","#3ee6a8",19);
    c.font="600 22px "+NUMF;tx(c,fit(c,fmt(s.cfg),380),W-44,112,22,"#94a3b8","right",600);
    const myg=s.my!=null?G.findIndex(g=>g.includes(s.my)):-1,gug=s._gTi!=null?G.findIndex(g=>g.includes(s._gTi)):-1,qMax=s.cfg.q||2;
    const colDef=cols==1
      ? [{k:"o",l:"O",x:cw-378},{k:"w",l:"G",x:cw-332},{k:"d",l:"B",x:cw-286},{k:"l",l:"M",x:cw-240},{k:"gf",l:"AG",x:cw-190},{k:"ga",l:"YG",x:cw-142},{k:"gd",l:"AV",x:cw-90},{k:"pts",l:"P",x:cw-36}]
      : [{k:"o",l:"O",x:cw-202},{k:"w",l:"G",x:cw-168},{k:"d",l:"B",x:cw-136},{k:"l",l:"M",x:cw-104},{k:"gd",l:"AV",x:cw-68},{k:"pts",l:"P",x:cw-28}];
    const nameMaxW=cols==1?(cw-496):(cw-296);
    withSn(s,()=>G.forEach((g,gi)=>{
      const x=P+(gi%cols)*(cw+gap),y=HH+Math.floor(gi/cols)*(ch+gap),mine=gi==myg,guGrp=!mine&&gi==gug;
      const tbl=s._calcTbl?s._calcTbl(gi):calcGroupTable(s,gi),qL=(s.gqs&&s.gqs[gi])||[];
      glassBox(c,x,y,cw,ch,22,mine?"rgba(240,194,75,.65)":guGrp?"rgba(56,189,248,.62)":"rgba(255,255,255,.12)",mine?"#f0c24b":guGrp?"#38bdf8":null);
      const gl=lg?"★":s.cfg.gs?GL(gi):String(gi+1);
      c.fillStyle=mine?grad(c,x+14,x+54,"#f8e08a","#d4a017"):guGrp?grad(c,x+14,x+54,"#38bdf8","#0284c7"):grad(c,x+14,x+54,"#12b886","#0a7c56");
      rr(c,x+14,y+14,38,38,11);c.fill();
      tx(c,gl,x+33,y+34,23,mine?"#2b2000":"#fff","center",700);
      tx(c,gname(s,gi).toLocaleUpperCase("tr"),x+62,y+34,cols==1?32:27,mine?"#fbeaa8":guGrp?"#7dd3fc":"#f8fafc","left",700);
      const tagTxt=lg?(s.cfg.N+" TAKIM"):("İLK "+qMax+" ÇIKAR");
      drawPill(c,tagTxt,x+cw-124,y+19,110,28,mine?"rgba(240,194,75,.18)":"rgba(255,255,255,.07)",null,mine?"rgba(240,194,75,.45)":"rgba(255,255,255,.14)",mine?"#fbeaa8":"#cbd5e1",16);
      // Column header strip
      const chY=y+62;
      c.fillStyle="rgba(255,255,255,.06)";rr(c,x+12,chY,cw-24,30,8);c.fill();
      tx(c,"#",x+29,chY+16,16,"#94a3b8","center",700);
      tx(c,"TAKIM",x+54,chY+16,16,"#94a3b8","left",700);
      colDef.forEach(cd=>tx(c,cd.l,x+cd.x,chY+16,16,cd.k==="pts"?"#f8fafc":"#94a3b8","center",700));
      tbl.forEach((r,idx)=>{
        const ry=y+hh+idx*rh,yy=ry+rh/2,ti=r.ti,t=T[ti];
        const isMe=ti===s.my,isGu=s._gTi!=null&&ti===s._gTi,isQ=!lg&&idx<qMax,okQ=isQ||qL.indexOf(ti)>=0,lead1=idx===0&&(okQ||lg);
        const bgCol=isMe?"rgba(240,194,75,.16)":isGu?"rgba(56,189,248,.18)":lead1?"rgba(240,194,75,.09)":okQ?"rgba(16,185,129,.08)":"rgba(255,255,255,.028)";
        c.fillStyle=bgCol;rr(c,x+12,ry+3,cw-24,rh-6,10);c.fill();
        if(isMe||isGu||lead1||okQ){
          c.fillStyle=isMe||lead1?"#f0c24b":isGu?"#38bdf8":"#3ee6a8";
          rr(c,x+13,ry+10,3.5,rh-20,2);c.fill();
        }
        if(isMe||isGu){c.lineWidth=1.1;c.strokeStyle=isMe?"rgba(240,194,75,.45)":"rgba(56,189,248,.55)";rr(c,x+12,ry+3,cw-24,rh-6,10);c.stroke()}
        // Rank badge
        const rbx=x+19,rby=yy-12;
        if(lead1){c.fillStyle=grad(c,rbx,rbx+22,"#f8e08a","#d4a017");rr(c,rbx,rby,22,24,6);c.fill();tx(c,idx+1,rbx+11,yy+1,16,"#2b2000","center",700)}
        else if(okQ){c.fillStyle="rgba(16,185,129,.22)";rr(c,rbx,rby,22,24,6);c.fill();tx(c,idx+1,rbx+11,yy+1,16,"#3ee6a8","center",700)}
        else{tx(c,idx+1,rbx+11,yy+1,16,"#94a3b8","center",700)}
        drawBadge(c,ti,x+47,yy-13,22);
        const fsN=cols==1?26:22;
        c.font="700 "+fsN+"px "+NUMF;
        tx(c,fit(c,(isMe?"★ ":isGu?"◆ ":"")+t.n,nameMaxW),x+76,yy+1,fsN,isMe?"#fbeaa8":isGu?"#7dd3fc":"#f1f5f9","left",700);
        const avStr=(r.gd>0?"+":r.gd<0?"−":"")+Math.abs(r.gd);
        colDef.forEach(cd=>{
          if(cd.k==="pts"){
            const px=x+cd.x-20,py=yy-14;
            c.fillStyle=lead1?"rgba(240,194,75,.24)":okQ?"rgba(16,185,129,.20)":"rgba(255,255,255,.08)";
            rr(c,px,py,40,28,7);c.fill();
            tx(c,r.pts,x+cd.x,yy+1,cols==1?23:21,lead1?"#fbeaa8":okQ?"#3ee6a8":"#f8fafc","center",700);
          }else if(cd.k==="gd"){
            tx(c,avStr,x+cd.x,yy+1,cols==1?21:19,r.gd>0?"#3ee6a8":r.gd<0?"#ff6b6b":"#94a3b8","center",700);
          }else{
            const mut=cd.k==="d"||cd.k==="l"||cd.k==="ga";
            tx(c,r[cd.k],x+cd.x,yy+1,cols==1?21:19,mut?"#94a3b8":"#e2e8f0","center",600);
          }
        });
        if(!lg&&idx===qMax-1&&idx<tbl.length-1){
          c.save();c.strokeStyle="rgba(62,230,168,.50)";c.lineWidth=1.5;c.setLineDash([6,5]);
          c.beginPath();c.moveTo(x+18,ry+rh);c.lineTo(x+cw-18,ry+rh);c.stroke();c.restore();
        }
      });
    }));
    drawPosterFooter(c,W,rawH,s.name.toLocaleUpperCase("tr")+" · "+(maxW?maxW+". HAFTA PUAN DURUMU":"PUAN DURUMU"));
    return cv;
  }
  const cols=n<=1?1:n<=8?2:3,W=1080,P=40,gap=20;
  const cw=(W-2*P-gap*(cols-1))/cols,fs=cols==3?23:29,rh=cols==3?46:54,hh=68,ch=hh+gs*rh+18;
  const rows=Math.ceil(n/cols),HH=184,H=HH+rows*ch+(rows-1)*gap+96;
  const cv=mkCv(W,H),c=cv.getContext("2d");
  const cb=s.my!=null&&T[s.my]?bspec(s.my):null;
  dkBg(c,W,H,cb?cb.c1:"#38bdf8",cb?cb.c2:"#f0c24b",false);

  // Header cleanly positioned above y=154 divider
  drawPill(c,lg?"LİG TABLOSU":"KURA SONUCU",44,40,176,38,"rgba(240,194,75,.16)","rgba(240,194,75,.06)","rgba(240,194,75,.48)","#fbeaa8",20);
  c.font="700 52px "+NUMF;tx(c,fit(c,s.name.toLocaleUpperCase("tr")+(lg?"":(!s.cfg.gs?" · EŞLEŞMELER":" · GRUPLAR")),580),44,114,52,"#f8fafc","left",700);
  tx(c,s.date,W-44,66,25,"#94a3b8","right",600);
  c.font="600 22px "+NUMF;tx(c,fit(c,fmt(s.cfg),380),W-44,112,22,"#3ee6a8","right",600);

  const myg=s.my!=null?G.findIndex(g=>g.includes(s.my)):-1,gug=s._gTi!=null?G.findIndex(g=>g.includes(s._gTi)):-1,imgs=nob();
  await Promise.all([...new Set(G.flat().map(i=>T[i].c))].map(async k=>{imgs[k]=await flagImg(k)}));
  withSn(s,()=>G.forEach((g,gi)=>{
    const x=P+(gi%cols)*(cw+gap),y=HH+Math.floor(gi/cols)*(ch+gap),mine=gi==myg,guGrp=!mine&&gi==gug;
    glassBox(c,x,y,cw,ch,22,mine?"rgba(240,194,75,.65)":guGrp?"rgba(56,189,248,.62)":"rgba(255,255,255,.12)",mine?"#f0c24b":guGrp?"#38bdf8":null);
    const gl=lg?"★":s.cfg.gs?GL(gi):String(gi+1);
    c.fillStyle=mine?grad(c,x+14,x+56,"#f8e08a","#d4a017"):guGrp?grad(c,x+14,x+56,"#38bdf8","#0284c7"):grad(c,x+14,x+56,"#12b886","#0a7c56");
    rr(c,x+14,y+15,40,40,11);c.fill();
    tx(c,gl,x+34,y+36,24,mine?"#2b2000":"#fff","center",700);
    tx(c,gname(s,gi).toLocaleUpperCase("tr"),x+64,y+36,cols==3?25:30,mine?"#fbeaa8":guGrp?"#7dd3fc":"#f8fafc","left",700);
    drawPill(c,"ORT "+fx(avg(g,"g")),x+cw-104,y+21,90,28,mine?"rgba(240,194,75,.18)":guGrp?"rgba(56,189,248,.18)":"rgba(255,255,255,.07)",null,mine?"rgba(240,194,75,.45)":guGrp?"rgba(56,189,248,.48)":"rgba(255,255,255,.14)",mine?"#fbeaa8":guGrp?"#7dd3fc":"#cbd5e1",17);
    g.slice().sort((a,b)=>V(T[b])-V(T[a])).forEach((i,r)=>{
      const ry=y+hh+r*rh,yy=ry+rh/2,t=T[i],tc=TCOL[tierOf(t.g)],im=imgs[t.c],bw=46,bx=x+cw-14-bw;
      const isMe=i===s.my,isGu=s._gTi!=null&&i===s._gTi;
      c.fillStyle=isMe?"rgba(240,194,75,.14)":isGu?"rgba(56,189,248,.18)":"rgba(255,255,255,.032)";
      rr(c,x+12,ry+3,cw-24,rh-6,10);c.fill();
      if(isMe||isGu){c.lineWidth=1.2;c.strokeStyle=isMe?"rgba(240,194,75,.45)":"rgba(56,189,248,.58)";c.stroke()}
      drawBadge(c,i,x+20,yy-14,24);
      if(im)c.drawImage(im,x+50,yy-9,28,18);
      const qL=(s.gqs&&s.gqs[gi])||[],qr=qL.indexOf(i);
      c.font="700 "+fs+"px "+NUMF;
      tx(c,fit(c,(isMe?"★ ":isGu?"◆ ":"")+(qr>=0?`[${qr+1}] `:"")+t.n,cw-156),x+86,yy+1,fs,isMe?"#fbeaa8":isGu?"#7dd3fc":qr>=0?"#3ee6a8":"#f1f5f9");
      c.fillStyle=grad(c,bx,bx+bw,tc[0],tc[1]);rr(c,bx,yy-15,bw,30,8);c.fill();
      tx(c,t.g,bx+bw/2,yy+1,fs-3,tc[2],"center",700);
    });
  }));
  drawPosterFooter(c,W,H,s.name.toLocaleUpperCase("tr")+" · "+s.P.length+" TAKIM");
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
async function karneCv(x,p,targetCv){p=p==null?1:p;const cu=n=>Math.round(n*p);
  if(typeof preloadLogos==="function"&&x&&x.my!=null)await preloadLogos([x.my]);
  const t=RT(x,x.my),W=1080,ts=x.ts,v=k=>ts[k]||0,champ=x.res&&x.res.st==7;
  const cb=bspec(x.my),allMt=x.mt||[],ms=allMt.slice(-5);
  const top=f=>{const L=x.pl.filter(q=>q[f]>0).sort((a,b)=>b[f]-a[f]);if(!L.length)return null;const mx=L[0][f],ties=L.filter(q=>q[f]==mx);return{n:ties.map(q=>q.n).join(", "),v:mx}};
  const g=top("g"),a=top("a"),mom=top("mom"),aw=seasonAwards(x);
  const awItems=[];
  if(g)awItems.push(["ALTIN AYAKKABI",g.n,g.v+" GOL","#f0c24b"]);
  if(a)awItems.push(["OYUN KURUCU",a.n,a.v+" ASİST","#38bdf8"]);
  if(mom)awItems.push(["MAÇIN ADAMI",mom.n,mom.v+" MOTM","#3ee6a8"]);
  if(aw&&aw.wk)awItems.push(["GENÇ YILDIZ ("+aw.wk.age+")",aw.wk.n,aw.wk.g+"G · "+aw.wk.a+"A","#c084fc"]);
  if(aw&&aw.duo)awItems.push(["ALTIN İKİLİ",aw.duo.n,aw.duo.tot+" ORTAK GOL · "+aw.duo.m+"M","#2dd4bf",true]);
  const hasAw=(aw&&aw.mvp)||awItems.length>0;
  // Layout award items (wide items take full row)
  const awLayout=[];let curRow=[];
  awItems.forEach(it=>{
    if(it[4]){if(curRow.length){awLayout.push(curRow);curRow=[]}awLayout.push([it])}
    else{curRow.push(it);if(curRow.length===2){awLayout.push(curRow);curRow=[]}}
  });
  if(curRow.length)awLayout.push(curRow);
  const awBoxH=hasAw?(76+(aw&&aw.mvp?98:0)+(awLayout.length?awLayout.length*120-14:0)+22):0;
  const mCols=allMt.length>6?2:1,mRows=Math.ceil(allMt.length/mCols);
  const mBoxH=allMt.length?(88+mRows*60+18):0;
  let H=984;
  if(awBoxH)H+=awBoxH+24;
  if(mBoxH)H+=mBoxH+24;
  else if(ms.length)H+=88+24;
  H=Math.max(1240,H+84);
  const cv=targetCv||mkCv(W,H);if(cv.width!==W)cv.width=W;if(cv.height!==H)cv.height=H;
  const c=cv.getContext("2d");c.clearRect(0,0,W,H);
  dkBg(c,W,H,cb.c1,cb.c2,champ);

  // Header
  drawPill(c,champ?"🏆 ŞAMPİYONLUK KARNESİ":"SEZON KARNESİ",48,40,champ?268:198,38,"rgba(240,194,75,.18)","rgba(240,194,75,.06)","rgba(240,194,75,.52)","#fbeaa8",20);
  c.font="700 56px "+NUMF;tx(c,fit(c,x.name.toLocaleUpperCase("tr"),780),48,114,56,"#f8fafc","left",700);
  tx(c,x.date,W-48,66,25,"#94a3b8","right",600);
  const fmtTag=isUcl(x.cfg)?"ŞAMPİYONLAR LİGİ":isLg(x.cfg)?"PUAN LİGİ":"KUPA TURNUVASI";
  drawPill(c,fmtTag,W-48-174,92,174,32,"rgba(16,185,129,.16)",null,"rgba(62,230,168,.42)","#3ee6a8",18);

  // Hero Club Showcase Card
  const hy=178,hh=304;
  if(champ){
    c.save();
    const cg=c.createLinearGradient(44,hy,1036,hy+hh);
    cg.addColorStop(0,"#fdf2c0");cg.addColorStop(.52,"#e6bc45");cg.addColorStop(1,"#c49216");
    c.fillStyle=cg;rr(c,44,hy,992,hh,28);c.fill();
    c.lineWidth=2.5;c.strokeStyle="#fff4cc";c.stroke();
    c.restore();
  }else{
    glassBox(c,44,hy,992,hh,28,"rgba(240,194,75,.48)",cb.c1);
    c.save();rr(c,44,hy,992,hh,28);c.clip();
    const sp=c.createRadialGradient(156,hy+136,12,156,hy+136,240);
    sp.addColorStop(0,cb.c1);sp.addColorStop(1,"transparent");
    c.globalAlpha=.28;c.fillStyle=sp;c.fillRect(44,hy,480,hh);
    c.restore();
  }
  const hCol=champ?"#2b2000":"#f8fafc",sCol=champ?"#4a3600":"#94a3b8";
  // Frosted crest halo stage
  c.save();
  c.fillStyle=champ?"rgba(43,32,0,.10)":"rgba(255,255,255,.08)";
  c.beginPath();c.arc(154,hy+142,88,0,Math.PI*2);c.fill();
  c.lineWidth=2;c.strokeStyle=champ?"rgba(43,32,0,.20)":"rgba(255,255,255,.16)";c.stroke();
  c.shadowColor="rgba(0,0,0,.55)";c.shadowBlur=22;c.shadowOffsetY=8;
  drawBadge(c,x.my,86,hy+64,136);
  c.restore();

  c.font="700 74px "+NUMF;tx(c,fit(c,t.n.toLocaleUpperCase("tr"),520),272,hy+78,74,hCol,"left",700);
  const im=await flagImg(t.c);if(im)c.drawImage(im,272,hy+122,42,28);
  tx(c,CN[t.c][0],326,hy+136,27,champ?"#3b2a00":"#cbd5e1","left",600);

  // Premium HÜC / ORT / DEF Stat Capsules with mini strength bars
  [["HÜC",t.a],["ORT",t.o],["DEF",t.d]].forEach(([lb,val],idx)=>{
    const px=272+idx*164,py=hy+172,pw=150,ph=62;
    const isHi=val>=85,isMid=val>=80;
    const barCol=champ?"#2b2000":(isHi?"#f0c24b":isMid?"#3ee6a8":"#38bdf8");
    c.fillStyle=champ?"rgba(43,32,0,.13)":"rgba(255,255,255,.065)";
    rr(c,px,py,pw,ph,13);c.fill();
    c.lineWidth=1.2;c.strokeStyle=champ?"rgba(43,32,0,.22)":(isHi?"rgba(240,194,75,.42)":"rgba(255,255,255,.13)");c.stroke();
    tx(c,lb,px+14,py+24,18,sCol,"left",700);
    tx(c,val,px+pw-14,py+24,28,champ?"#2b2000":(isHi?"#fbeaa8":"#f8fafc"),"right",700);
    const pct=Math.max(18,Math.min(100,Math.round((val-64)/28*100)));
    c.fillStyle=champ?"rgba(43,32,0,.18)":"rgba(255,255,255,.10)";
    rr(c,px+14,py+45,pw-28,6,3);c.fill();
    c.fillStyle=barCol;
    rr(c,px+14,py+45,Math.round((pw-28)*pct/100),6,3);c.fill();
  });
  c.font="500 21px "+NUMF;tx(c,fit(c,fmt(x.cfg),540),272,hy+266,21,sCol,"left",500);

  // Sculpted GEN Shield Card
  const tc=TCOL[tierOf(t.g)],gx=846,gy=hy+48;
  c.save();
  c.shadowColor="rgba(0,0,0,.45)";c.shadowBlur=20;c.shadowOffsetY=8;
  c.fillStyle=grad(c,gx,gx+154,tc[0],tc[1]);rr(c,gx,gy,154,196,24);c.fill();
  c.restore();
  c.lineWidth=2;c.strokeStyle="rgba(255,255,255,.55)";rr(c,gx,gy,154,196,24);c.stroke();
  tx(c,cu(t.g),gx+77,gy+86,108,tc[2],"center",700);
  c.fillStyle="rgba(0,0,0,.14)";c.fillRect(gx+26,gy+142,102,2);
  tx(c,"GENEL",gx+77,gy+166,24,tc[2],"center",700);

  // Status Ribbon
  const sy=504,sh=88,rt=x.res?rlb(x.res,x.cfg,x.grk).trim():"SEZON DEVAM EDİYOR";
  const stC=champ?["#fbeaa8","#d4a017","#fff4cc","#2b2000"]:x.res?["rgba(30,45,66,.95)","rgba(15,24,38,.98)","rgba(148,163,184,.42)","#f8fafc"]:["#12b886","#0a7c56","rgba(62,230,168,.55)","#ffffff"];
  c.save();
  c.fillStyle=grad(c,44,1036,stC[0],stC[1]);rr(c,44,sy,992,sh,22);c.fill();
  c.lineWidth=1.8;c.strokeStyle=stC[2];c.stroke();
  c.fillStyle="rgba(255,255,255,.22)";c.fillRect(72,sy+1,936,1.5);
  c.font="700 44px "+NUMF;tx(c,fit(c,(champ?"🏆 ":"")+rt.toLocaleUpperCase("tr"),920),540,sy+sh/2+1,44,stC[3],"center",700);
  c.restore();

  // Row 1 KPI: G / B / M with percentage pills
  const ky1=614,wV=v("w"),dV=v("d"),lV=v("l"),totM=wV+dV+lV;
  const pctOf=n=>totM?`%${Math.round(n/totM*100)}`:"";
  [[cu(wV),"GALİBİYET","#3ee6a8",pctOf(wV)],[cu(dV),"BERABERLİK","#94a3b8",pctOf(dV)],[cu(lV),"MAĞLUBİYET","#ff6b6b",pctOf(lV)]].forEach(([val,lbl,col,sub],i)=>{
    const bx=44+i*338;
    glassBox(c,bx,ky1,316,174,22,"rgba(255,255,255,.11)",col);
    c.fillStyle=col;rr(c,bx+24,ky1+1,268,4,2);c.fill();
    tx(c,val,bx+158,ky1+78,106,col,"center",700);
    tx(c,lbl,bx+158,ky1+146,24,"#94a3b8","center",700);
    if(sub)drawPill(c,sub,bx+230,ky1+18,68,28,"rgba(255,255,255,.08)",null,col,col,17);
  });

  // Proportional W-D-L Strip
  const byBar=802;
  c.fillStyle="rgba(255,255,255,.07)";rr(c,44,byBar,992,12,6);c.fill();
  if(totM>0){
    let cx=44;
    [[wV,"#12b886"],[dV,"#64748b"],[lV,"#ef4444"]].forEach(([cnt,col])=>{
      if(!cnt)return;const segW=Math.max(14,Math.round((cnt/totM)*992));
      c.fillStyle=col;rr(c,cx,byBar,Math.min(segW,1036-cx),12,6);c.fill();cx+=segW+4;
    });
  }

  // Row 2 KPI: Atılan / Yenen / Averaj / Puan
  const ky2=830,av=v("gf")-v("ga"),avStr=(cu(av)>0?"+":"")+cu(av);
  [["ATILAN GOL",cu(v("gf")),"#f8fafc"],["YENEN GOL",cu(v("ga")),"#cbd5e1"],["AVERAJ",avStr,av>0?"#3ee6a8":av<0?"#ff6b6b":"#94a3b8"],["PUAN",cu(wV*3+dV),"#f0c24b"]].forEach(([lbl,val,vc],i)=>{
    const bx=44+i*253;
    glassBox(c,bx,ky2,233,126,20,"rgba(255,255,255,.10)");
    tx(c,val,bx+116,ky2+52,60,vc,"center",700);
    tx(c,lbl,bx+116,ky2+100,21,"#94a3b8","center",600);
  });

  let curY=980;
  // Awards Showcase Box (with crisp right-aligned stat pills & full-width duo row)
  if(awBoxH){
    glassBox(c,44,curY,992,awBoxH,24,"rgba(240,194,75,.32)","#f0c24b");
    tx(c,"🏆 SEZON ÖDÜLLERİ VE LİDERLER",72,curY+38,26,"#f0c24b","left",700);
    let ay=curY+74;
    if(aw&&aw.mvp){
      const mvpStat=`${aw.mvp.g}G · ${aw.mvp.a}A${aw.mvp.mom?" · "+aw.mvp.mom+"★":""}`;
      c.save();
      c.fillStyle=grad(c,72,1008,"rgba(240,194,75,.24)","rgba(15,157,107,.10)");
      rr(c,72,ay,936,82,16);c.fill();
      c.lineWidth=1.8;c.strokeStyle="rgba(240,194,75,.60)";c.stroke();
      drawPill(c,"★ SEZON MVP",90,ay+21,150,40,"#fbeaa8","#d4a017",null,"#2b2000",20);
      c.font="700 42px "+NUMF;tx(c,fit(c,aw.mvp.n,490),258,ay+42,42,"#fff7d6","left",700);
      drawPill(c,mvpStat,780,ay+21,210,40,"rgba(0,0,0,.38)",null,"rgba(240,194,75,.55)","#fbeaa8",23);
      c.restore();
      ay+=98;
    }
    awLayout.forEach(row=>{
      const isFull=row.length===1;
      row.forEach(([lbl,name,stat,col],colI)=>{
        const iw=isFull?936:460,ix=72+(isFull?0:colI*476),iy=ay;
        c.fillStyle="rgba(255,255,255,.048)";rr(c,ix,iy,iw,106,16);c.fill();
        c.lineWidth=1.2;c.strokeStyle="rgba(255,255,255,.10)";c.stroke();
        c.fillStyle=col;rr(c,ix,iy+18,5,70,3);c.fill();
        tx(c,lbl,ix+22,iy+30,19,col,"left",700);
        c.font="700 20px "+NUMF;
        const sw=Math.min(250,Math.max(104,Math.ceil(c.measureText(stat).width)+30));
        drawPill(c,stat,ix+iw-sw-16,iy+16,sw,30,"rgba(255,255,255,.07)",null,col,col,17);
        c.font="700 35px "+NUMF;tx(c,fit(c,name,iw-44),ix+22,iy+74,35,"#f8fafc","left",700);
      });
      ay+=120;
    });
    curY+=awBoxH+24;
  }

  // Matches Box (with integrated Form circles in header)
  if(mBoxH){
    glassBox(c,44,curY,992,mBoxH,24,"rgba(255,255,255,.12)");
    tx(c,"MAÇ SONUÇLARI ("+allMt.length+")",72,curY+44,26,"#f0c24b","left",700);
    if(ms.length)drawFormRow(c,ms,1008,curY+44,true);
    const cw=mCols==2?458:936;
    allMt.forEach((m,idx)=>{
      const colIdx=mCols==2?idx%2:0,rowIdx=mCols==2?Math.floor(idx/2):idx;
      const rx=72+colIdx*478,ry=curY+88+rowIdx*60+25;
      c.fillStyle="rgba(255,255,255,.04)";rr(c,rx,ry-25,cw,50,12);c.fill();
      c.lineWidth=1;c.strokeStyle="rgba(255,255,255,.06)";c.stroke();
      const mr=mres(m),rCol={w:"#10b981",d:"#64748b",l:"#ef4444"}[mr],rLt={w:"G",d:"B",l:"M"}[mr];
      c.fillStyle=rCol;rr(c,rx+9,ry-16,32,32,9);c.fill();
      tx(c,rLt,rx+25,ry+1,19,mr=="w"?"#052e16":"#fff","center",700);
      const rdDisp=m.rd==="Grup"?(isUcl(x.cfg)?"Lig Aş.":isLg(x.cfg)?"Lig":"Grup"):m.rd;
      const rdTxt=rdDisp+(m.lg?" "+m.lg+".M":""),scStr=mscTxt(m),fSz=mCols==2?25:29;
      c.font="600 "+fSz+"px "+NUMF;
      tx(c,fit(c,rdTxt+" · "+m.on,cw-172),rx+52,ry+1,fSz,"#f1f5f9","left",600);
      c.fillStyle=mr=="w"?"rgba(16,185,129,.20)":mr=="l"?"rgba(239,68,68,.20)":"rgba(148,163,184,.18)";
      rr(c,rx+cw-108,ry-17,98,34,9);c.fill();
      c.lineWidth=1.1;c.strokeStyle=mr=="w"?"rgba(62,230,168,.45)":mr=="l"?"rgba(255,107,107,.45)":"rgba(148,163,184,.32)";c.stroke();
      tx(c,scStr,rx+cw-59,ry+1,fSz-1,mr=="w"?"#3ee6a8":mr=="l"?"#ff6b6b":"#cbd5e1","center",700);
    });
    curY+=mBoxH+24;
  }else if(ms.length){
    glassBox(c,44,curY,992,84,20,"rgba(255,255,255,.10)");
    tx(c,"SON MAÇ FORMU",72,curY+43,24,"#94a3b8","left",700);
    drawFormRow(c,ms,1008,curY+42,true);
    curY+=108;
  }
  drawPosterFooter(c,W,H,x.name.toLocaleUpperCase("tr")+" · "+t.n.toLocaleUpperCase("tr"));
  return cv}
async function totsCv(s){
  const st2=s._st2||tourneyStats(s),xi=tourneyTots(s,st2);
  if(!xi)throw new Error("TOTS için yeterli veri yok");
  if(typeof preloadLogos==="function")await preloadLogos([].concat(xi.F||[],xi.M||[],xi.D||[],xi.K||[]).map(p=>p.ti));
  const W=1080,H=1460,cv=mkCv(W,H),c=cv.getContext("2d");
  const cb=s.my!=null&&T[s.my]?bspec(s.my):null,champ=!!((s.res&&(s.res.st===7||s.res.hSt===7||s.res.gSt===7))||(s._out&&s._out.done&&(s._out.ch===s.my||s._out.ch===s._gTi)));
  dkBg(c,W,H,cb?cb.c1:"#3ee6a8",cb?cb.c2:"#f0c24b",champ);

  // Header
  drawPill(c,"TURNUVANIN EN İYİ 11'İ",48,42,272,38,"rgba(240,194,75,.18)","rgba(240,194,75,.06)","rgba(240,194,75,.52)","#fbeaa8",20);
  c.font="700 52px "+NUMF;tx(c,fit(c,s.name.toLocaleUpperCase("tr")+" · TOTS",796),48,114,52,"#f8fafc","left",700);
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
    const isGu=s._gTi!=null&&p.ti===s._gTi;
    const dispNm=(p.mine&&!isMvp?"★ ":isGu&&!isMvp?"◆ ":"")+totsDispName(p.n,cw<=220?4:3);
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
      c.lineWidth=1.8;c.strokeStyle=p.mine?"rgba(240,194,75,.65)":isGu?"rgba(56,189,248,.75)":"rgba(110,231,183,.34)";rr(c,nx,ny,nw,48,14);c.stroke();
      c.font="700 28px "+NUMF;
      tx(c,fit(c,dispNm,nw-20),cx,ny+25,28,p.mine?"#fbeaa8":isGu?"#7dd3fc":"#ffffff","center",700);
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

  drawPosterFooter(c,W,H,s.name.toLocaleUpperCase("tr")+" · TURNUVANIN EN İYİ 11'İ ("+fmtStr+")");
  return cv}
async function koCv(s){
  if(isLg(s.cfg)||!s.G)throw new Error("Eleme ağacı yok");
  if(!s._coop)initKoBracket(s,false);
  const sim=ensureSim(s),ko=sim.ko,RDs=rds(s.cfg).filter(r=>r!=="Grup");
  if(!RDs.length||!RDs.some(rd=>Array.isArray(ko[rd])&&ko[rd].length))throw new Error("Eleme ağacı henüz oluşmadı");
  const out=s._out!==undefined?s._out:getTourneyOutcome(s),champTi=out&&out.done&&T[out.ch]?out.ch:null;
  if(typeof preloadLogos==="function"){
    const _ki=[];
    if(champTi!=null)_ki.push(champTi);
    RDs.forEach(rd=>(ko[rd]||[]).forEach(p=>{if(p){if(p.t1!=null)_ki.push(p.t1);if(p.t2!=null)_ki.push(p.t2)}}));
    await preloadLogos(_ki);
  }
  const ucl=isUcl(s.cfg),firstCnt=ucl?8:((ko[RDs[0]]&&ko[RDs[0]].length)||Math.max(1,Math.floor(adv(s.cfg)/2)));
  const colW=318,colGap=76,padX=56,headH=226,footH=116,slotH=firstCnt>=32?116:firstCnt>=16?130:144;
  const W=Math.max(1140,padX*2+RDs.length*colW+(RDs.length-1)*colGap);
  const bodyH=Math.max(660,firstCnt*slotH);
  const H=headH+bodyH+footH;
  const maxDim=4096,sc=Math.min(1,maxDim/W,maxDim/H);
  const cv=mkCv(Math.round(W*sc),Math.round(H*sc)),c=cv.getContext("2d");
  if(sc<1)c.scale(sc,sc);
  const refTi=champTi!=null?champTi:(s.my!=null&&T[s.my]?s.my:null);
  const cb=refTi!=null?bspec(refTi):null,isMyChamp=!!(champTi!=null&&(champTi===s.my||(s._gTi!=null&&champTi===s._gTi)));
  dkBg(c,W,H,cb?cb.c1:"#38bdf8",champTi!=null?"#f0c24b":(cb?cb.c2:"#f0c24b"),isMyChamp);

  // Subtle architectural dot grid over bracket stage
  c.save();
  c.fillStyle="rgba(255,255,255,.038)";
  for(let gx=padX;gx<W-padX;gx+=28){
    for(let gy=headH+10;gy<H-footH+10;gy+=28){
      c.fillRect(gx,gy,2,2);
    }
  }
  c.restore();

  // Header
  drawPill(c,"ELEME AĞACI · BRACKET",48,40,268,38,"rgba(240,194,75,.18)","rgba(240,194,75,.06)","rgba(240,194,75,.52)","#fbeaa8",20);
  tx(c,s.date||today(),W-48,58,24,"#94a3b8","right",600);
  let koRightW=0;
  if(champTi!=null){
    const chTxt="🏆 ŞAMPİYON: "+T[champTi].n.toLocaleUpperCase("tr");
    c.font="700 22px "+NUMF;
    const chW=Math.min(460,Math.max(220,Math.ceil(c.measureText(chTxt).width)+44));
    koRightW=chW;
    drawPill(c,fit(c,chTxt,420),W-48-chW,84,chW,42,"#fbeaa8","#d4a017","rgba(255,255,255,.55)","#2b2000",22);
  }else{
    const kpTxt=koPath(s.cfg).toLocaleUpperCase("tr");
    c.font="700 22px "+NUMF;
    const kpFit=fit(c,kpTxt,480);
    koRightW=Math.min(480,Math.ceil(c.measureText(kpFit).width));
    tx(c,kpFit,W-48,108,22,"#3ee6a8","right",700);
  }
  c.font="700 52px "+NUMF;tx(c,fit(c,s.name.toLocaleUpperCase("tr")+" · ELEME TURLARI",Math.max(360,W-96-koRightW-28)),48,114,52,"#f8fafc","left",700);

  const totalW=RDs.length*colW+(RDs.length-1)*colGap;
  const startX=Math.round((W-totalW)/2);

  // Compute slot centers for each round
  const centers=RDs.map((rd,rIdx)=>{
    const cnt=ucl?(rIdx===0?8:Math.max(1,Math.round(8/Math.pow(2,rIdx-1)))):Math.max(1,Math.round(firstCnt/Math.pow(2,rIdx)));
    const step=bodyH/cnt;
    return rg(cnt).map(pIdx=>headH+26+step*(pIdx+0.5));
  });

  // Subtle vertical round lane backdrops
  RDs.forEach((rd,rIdx)=>{
    const x=startX+rIdx*(colW+colGap),isFin=rIdx===RDs.length-1;
    c.save();
    c.fillStyle=isFin?"rgba(240,194,75,.032)":"rgba(255,255,255,.018)";
    rr(c,x-10,headH+14,colW+20,bodyH+12,20);c.fill();
    c.lineWidth=1;c.strokeStyle=isFin?"rgba(240,194,75,.14)":"rgba(255,255,255,.045)";c.stroke();
    c.restore();
  });

  // Draw smooth rounded bracket connectors with glowing paths & terminal dots
  const drawConnector=(x1,y1,x2,y2,stroke,lw,glow)=>{
    const xm=Math.round((x1+x2)/2),dy=y2-y1,r=Math.min(12,Math.abs(dy)/2);
    c.save();
    c.lineWidth=lw;c.strokeStyle=stroke;c.lineCap="round";c.lineJoin="round";
    if(glow){c.shadowColor=stroke;c.shadowBlur=10}
    c.beginPath();c.moveTo(x1,y1);
    if(Math.abs(dy)<2){c.lineTo(x2,y2)}
    else{
      const sy=dy>0?1:-1;
      c.lineTo(xm-r,y1);c.quadraticCurveTo(xm,y1,xm,y1+sy*r);
      c.lineTo(xm,y2-sy*r);c.quadraticCurveTo(xm,y2,xm+r,y2);
      c.lineTo(x2,y2);
    }
    c.stroke();
    c.shadowBlur=0;
    c.fillStyle=stroke;
    c.beginPath();c.arc(x1,y1,lw+1,0,Math.PI*2);c.fill();
    c.beginPath();c.arc(x2,y2,lw+1,0,Math.PI*2);c.fill();
    c.restore();
  };

  for(let rIdx=0;rIdx<RDs.length-1;rIdx++){
    const rd=RDs[rIdx],pairs=Array.isArray(ko[rd])?ko[rd]:[];
    const xRight=startX+rIdx*(colW+colGap)+colW;
    const xNext=startX+(rIdx+1)*(colW+colGap);
    const curC=centers[rIdx],nxtC=centers[rIdx+1];
    for(let pIdx=0;pIdx<curC.length;pIdx++){
      const p=pairs[pIdx]||null,done=!!(p&&p.w!=null);
      const isChampPath=!!(champTi!=null&&p&&p.w===champTi);
      const isMine=!!(p&&(p.t1===s.my||p.t2===s.my));
      const isGuestPath=!!(s._gTi!=null&&p&&(p.t1===s._gTi||p.t2===s._gTi));
      const y1=curC[pIdx],y2=(ucl&&rIdx===0)?nxtC[pIdx]:nxtC[Math.floor(pIdx/2)];
      if(isChampPath)drawConnector(xRight,y1,xNext,y2,"#f0c24b",3.2,true);
      else if(isMine)drawConnector(xRight,y1,xNext,y2,"#eab308",2.6,true);
      else if(isGuestPath)drawConnector(xRight,y1,xNext,y2,"#38bdf8",2.6,true);
      else if(done)drawConnector(xRight,y1,xNext,y2,"rgba(62,230,168,.62)",2.2,false);
      else drawConnector(xRight,y1,xNext,y2,"rgba(148,163,184,.24)",1.8,false);
    }
  }

  // Helper: Draw frosted halo + club badge so dark logos (Tottenham, Juventus, etc.) pop cleanly
  const drawCrestPlate=(ti,cx,cy,sz,alpha)=>{
    c.save();
    if(alpha!=null)c.globalAlpha=alpha;
    const pr=Math.round(sz*0.64);
    c.fillStyle="rgba(255,255,255,.10)";
    c.beginPath();c.arc(cx,cy,pr,0,Math.PI*2);c.fill();
    c.lineWidth=1;c.strokeStyle="rgba(255,255,255,.14)";c.stroke();
    drawBadge(c,ti,Math.round(cx-sz/2),Math.round(cy-Math.round(sz*53/46)/2),sz);
    c.restore();
  };

  // Draw round headers and match nodes
  let finalCardTop=0,finalX=0;
  RDs.forEach((rd,rIdx)=>{
    const isFin=rIdx===RDs.length-1;
    const x=startX+rIdx*(colW+colGap);
    const pairs=Array.isArray(ko[rd])?ko[rd]:[];
    const expCnt=centers[rIdx].length;
    const doneCnt=pairs.filter(p=>p&&p.w!=null).length;
    const colDone=doneCnt>=expCnt&&expCnt>0;
    const hdTxt=(isFin?"🏆 ":"")+rd.toLocaleUpperCase("tr")+(isFin?"":` · ${doneCnt}/${expCnt}`);
    drawPill(
      c,hdTxt,x+24,headH-42,colW-48,36,
      isFin?"#fbeaa8":(colDone?"rgba(16,185,129,.16)":"rgba(255,255,255,.07)"),
      isFin?"#d4a017":null,
      isFin?"rgba(255,255,255,.50)":(colDone?"rgba(62,230,168,.45)":"rgba(255,255,255,.15)"),
      isFin?"#2b2000":(colDone?"#6ee7b7":"#e2e8f0"),
      18
    );

    centers[rIdx].forEach((cy,pIdx)=>{
      const p=pairs[pIdx]||null,done=!!(p&&p.w!=null),mine=!!(p&&(p.t1===s.my||p.t2===s.my));
      const hasLegs=!!(done&&Array.isArray(p.leg1)&&Array.isArray(p.leg2)&&p.leg1.length>=2&&p.leg2.length>=2);
      const hasPen=!!(done&&p.pf!=null&&p.pa!=null);
      const hasEt=!!(done&&!hasPen&&p.et);
      const hasMeta=hasLegs||hasPen||hasEt;
      const rowH=48,metaH=hasMeta?24:0,cardH=rowH*2+metaH+6;
      const y=Math.round(cy-cardH/2);
      if(isFin){finalCardTop=y;finalX=x}

      const guestTie=!!(s._gTi!=null&&p&&(p.t1===s._gTi||p.t2===s._gTi));
      const bdrCol=isFin?"rgba(240,194,75,.82)":mine?"rgba(240,194,75,.72)":guestTie?"rgba(56,189,248,.72)":(done?"rgba(62,230,168,.30)":"rgba(255,255,255,.12)");
      const tint=isFin||mine?"#f0c24b":guestTie?"#38bdf8":(done?"#12b886":null);
      glassBox(c,x,y,colW,cardH,16,bdrCol,tint);

      const drawRow=(ti,g,isW,isL,rowTop)=>{
        const ry=rowTop+rowH/2;
        if(ti==null||!T[ti]){
          tx(c,"Bekleniyor…",x+22,ry,21,"#64748b","left",600);
          c.fillStyle="rgba(255,255,255,.05)";rr(c,x+colW-52,ry-15,38,30,8);c.fill();
          tx(c,"—",x+colW-33,ry+1,21,"#475569","center",700);
          return;
        }
        const isMe=ti===s.my,isGu=s._gTi!=null&&ti===s._gTi,isChampRow=isFin&&isW;
        if(isW||isMe||isGu){
          const bg1=isChampRow?"rgba(240,194,75,.28)":isMe?"rgba(240,194,75,.18)":isGu?"rgba(56,189,248,.20)":"rgba(16,185,129,.16)";
          const bg2="rgba(255,255,255,0)";
          c.fillStyle=grad(c,x+3,x+colW-3,bg1,bg2);
          rr(c,x+3,rowTop+2,colW-6,rowH-4,11);c.fill();
          c.fillStyle=isChampRow||isMe?"#f0c24b":isGu?"#38bdf8":"#3ee6a8";
          rr(c,x+4,rowTop+10,4,rowH-20,2);c.fill();
        }
        drawCrestPlate(ti,x+31,ry,25,isL&&!isMe&&!isGu?0.55:1);
        const nmCol=isChampRow?"#fff7d6":isMe?"#fbeaa8":isGu?"#7dd3fc":(isW?"#ffffff":"#94a3b8");
        const prefix=(isChampRow?"🏆 ":"")+(isMe?"★ ":isGu?"◆ ":"");
        c.font=(isW||isMe||isGu?"700":"600")+" 23px "+NUMF;
        tx(c,fit(c,prefix+T[ti].n,colW-118),x+58,ry+1,23,nmCol,"left",isW||isMe||isGu?700:600);

        // Broadcast Score Capsule
        const sx=x+colW-52,sy=ry-16,sw=40,sh=32;
        c.save();
        if(isChampRow){
          c.fillStyle=grad(c,sx,sx+sw,"#fbeaa8","#d4a017");
          rr(c,sx,sy,sw,sh,9);c.fill();
          tx(c,done?String(g):"·",sx+sw/2,ry+1,24,"#2b2000","center",700);
        }else if(isW){
          c.fillStyle="rgba(16,185,129,.22)";
          rr(c,sx,sy,sw,sh,9);c.fill();
          c.lineWidth=1.3;c.strokeStyle="rgba(62,230,168,.55)";c.stroke();
          tx(c,done?String(g):"·",sx+sw/2,ry+1,24,"#3ee6a8","center",700);
        }else{
          c.fillStyle=isMe?"rgba(240,194,75,.14)":isGu?"rgba(56,189,248,.16)":"rgba(255,255,255,.06)";
          rr(c,sx,sy,sw,sh,9);c.fill();
          if(isMe||isGu){c.lineWidth=1.1;c.strokeStyle=isMe?"rgba(240,194,75,.38)":"rgba(56,189,248,.46)";c.stroke()}
          tx(c,done?String(g):"·",sx+sw/2,ry+1,23,isMe?"#fbeaa8":isGu?"#7dd3fc":"#94a3b8","center",700);
        }
        c.restore();
      };

      const w1=done&&p.w===p.t1,w2=done&&p.w===p.t2;
      drawRow(p?p.t1:null,p?p.g1:null,w1,done&&!w1,y+3);
      c.fillStyle="rgba(255,255,255,.08)";c.fillRect(x+14,y+rowH+3,colW-28,1);
      drawRow(p?p.t2:null,p?p.g2:null,w2,done&&!w2,y+rowH+3);

      // Integrated Meta Footer inside card (zero overlap!)
      if(hasMeta){
        const fy=y+rowH*2+4;
        c.save();
        c.fillStyle="rgba(0,0,0,.28)";
        c.beginPath();c.rect(x+1,fy,colW-2,metaH+1);c.fill();
        c.fillStyle="rgba(255,255,255,.09)";c.fillRect(x+12,fy,colW-24,1);
        const parts=[];
        if(hasLegs)parts.push(`${p.leg1[0]}–${p.leg1[1]} · ${p.leg2[0]}–${p.leg2[1]}`);
        if(hasPen)parts.push(`PEN ${p.pf}–${p.pa}`);
        else if(hasEt)parts.push("UZATMA");
        const mCol=hasPen?"#fbeaa8":hasEt?"#38bdf8":"#cbd5e1";
        tx(c,parts.join("   ·   "),x+colW/2,fy+metaH/2+1,15,mCol,"center",700);
        c.restore();
      }
    });
  });

  // Champion Showcase Card above Final when tournament is complete & vertical space permits
  if(champTi!=null&&finalCardTop-(headH+40)>=226){
    const chH=210,chY=Math.max(headH+34,Math.round((headH+26+finalCardTop-chH)/2));
    const chX=finalX,chCol=bspec(champTi);
    // Vertical golden connector from Final up to Champion Showcase
    c.save();
    c.strokeStyle="rgba(240,194,75,.72)";c.lineWidth=2.5;c.setLineDash([5,5]);
    c.beginPath();c.moveTo(chX+colW/2,chY+chH);c.lineTo(chX+colW/2,finalCardTop);c.stroke();
    c.restore();

    glassBox(c,chX,chY,colW,chH,22,"rgba(240,194,75,.85)","#f0c24b");
    c.save();
    rr(c,chX,chY,colW,chH,22);c.clip();
    const rgCh=c.createRadialGradient(chX+colW/2,chY+96,8,chX+colW/2,chY+96,150);
    rgCh.addColorStop(0,"rgba(240,194,75,.28)");rgCh.addColorStop(1,"transparent");
    c.fillStyle=rgCh;c.fillRect(chX,chY,colW,chH);
    c.restore();

    drawPill(c,"🏆 TURNUVA ŞAMPİYONU",chX+42,chY+16,colW-84,30,"#fbeaa8","#d4a017",null,"#2b2000",17);
    // Illuminated crest stage
    const crX=chX+colW/2,crY=chY+98;
    c.save();
    c.fillStyle="rgba(255,255,255,.11)";c.beginPath();c.arc(crX,crY,44,0,Math.PI*2);c.fill();
    c.lineWidth=2;c.strokeStyle="rgba(240,194,75,.65)";c.stroke();
    c.shadowColor="rgba(0,0,0,.55)";c.shadowBlur=18;c.shadowOffsetY=6;
    drawBadge(c,champTi,crX-34,crY-39,68);
    c.restore();

    c.font="700 32px "+NUMF;
    tx(c,fit(c,T[champTi].n.toLocaleUpperCase("tr"),colW-32),chX+colW/2,chY+166,32,"#fff7d6","center",700);
    const finP=ko[RDs[RDs.length-1]]&&ko[RDs[RDs.length-1]][0];
    const finSub=finP?`FİNAL SKORU · ${finP.g1}–${finP.g2}${finP.pf!=null?` (PEN ${finP.pf}–${finP.pa})`:finP.et?" (UZ)":""}`:s.name.toLocaleUpperCase("tr");
    tx(c,finSub,chX+colW/2,chY+192,16,"#f0c24b","center",700);
  }

  drawPosterFooter(c,W,H,s.name.toLocaleUpperCase("tr")+" · ELEME AĞACI");
  return cv}
function wrapLines(c,text,maxW,maxLines){
  const words=String(text||"").split(/\s+/).filter(Boolean),lines=[];
  let cur="";
  for(const w of words){
    const test=cur?cur+" "+w:w;
    if(c.measureText(test).width<=maxW){cur=test}
    else{
      if(cur)lines.push(cur);
      cur=w;
      if(maxLines&&lines.length>=maxLines-1)break;
    }
  }
  if(cur&&(!maxLines||lines.length<maxLines))lines.push(cur);
  if(maxLines&&lines.length===maxLines&&words.join(" ").length>lines.join(" ").length){
    lines[maxLines-1]=fit(c,lines[maxLines-1]+"…",maxW);
  }
  return lines;
}
async function karneDnaCv(x){
  const dna=calcTacticalDNA(x,true);
  if(!dna)return null;
  if(typeof preloadLogos==="function"&&x&&x.my!=null)await preloadLogos([x.my]);
  const t=RT(x,x.my),W=1080,H=1420,cb=bspec(x.my),champ=x.res&&x.res.st==7;
  const cv=mkCv(W,H),c=cv.getContext("2d");
  dkBg(c,W,H,cb.c1,cb.c2,champ);

  // Header
  drawPill(c,"MENAJER KİMLİĞİ · SAYFA 2/2",48,42,304,38,"rgba(240,194,75,.18)","rgba(240,194,75,.06)","rgba(240,194,75,.52)","#fbeaa8",20);
  c.font="700 48px "+NUMF;tx(c,fit(c,x.name.toLocaleUpperCase("tr")+" · TAKTİKSEL DNA",730),48,114,48,"#f8fafc","left",700);
  tx(c,t.n.toLocaleUpperCase("tr"),W-48,70,26,"#fbeaa8","right",700);
  tx(c,dna.n+" İSTATİSTİKLİ MAÇ",W-48,112,22,"#3ee6a8","right",700);

  // Hero Identity Card
  const hy=178,hh=252;
  glassBox(c,44,hy,992,hh,26,champ?"rgba(240,194,75,.60)":"rgba(62,230,168,.42)",champ?"#f0c24b":cb.c1);
  c.save();c.shadowColor="rgba(0,0,0,.55)";c.shadowBlur=22;c.shadowOffsetY=8;
  drawBadge(c,x.my,76,hy+48,132);
  c.restore();
  drawPill(c,"SEZONUN MENAJER KİMLİĞİ",236,hy+28,248,32,"rgba(240,194,75,.16)",null,"rgba(240,194,75,.45)","#fbeaa8",17);
  c.font="700 54px "+NUMF;
  tx(c,fit(c,dna.title.toLocaleUpperCase("tr"),750),236,hy+94,54,champ?"#fbeaa8":"#f8fafc","left",700);
  c.font="500 22px system-ui,-apple-system,sans-serif";
  const dLines=wrapLines(c,dna.desc,756,2);
  dLines.forEach((ln,idx)=>{
    c.fillStyle="#cbd5e1";c.textAlign="left";c.textBaseline="middle";
    c.fillText(ln,236,hy+144+idx*28);
  });
  const axList=[
    {k:"atk",n:"Hücum Tehdidi",v:dna.atk,sub:`${xgN1(dna.mShots)} Şut/M · ${xgN2(dna.mXg)} xG/M`},
    {k:"ctrl",n:"Top & Pas Kontrolü",v:dna.ctrl,sub:`%${Math.round(dna.mPos)} Top · %${Math.round(dna.mPass)} Pas`},
    {k:"aggr",n:"Savunma Direnci & Pres",v:dna.aggr,sub:`${xgN1(dna.oShots)} Rakip Şut · ${xgN2(dna.oXg)} Rakip xG`},
    {k:"eff",n:"Bitiricilik Verimi",v:dna.eff,sub:`Gol−xG ${xgS2(dna.xgDiff)} · %${Math.round(dna.conv*100)} Dönüşüm`}
  ];
  const srt=axList.slice().sort((a,b)=>b.v-a.v),best=srt[0],worst=srt[srt.length-1];
  drawPill(c,`EN GÜÇLÜ: ${DNASH[best.k].toLocaleUpperCase("tr")} (${best.v})`,236,hy+198,270,34,"rgba(16,185,129,.18)",null,"rgba(62,230,168,.42)","#3ee6a8",18);
  drawPill(c,`GELİŞTİRİLECEK: ${DNASH[worst.k].toLocaleUpperCase("tr")} (${worst.v})`,520,hy+198,314,34,"rgba(249,115,22,.16)",null,"rgba(249,115,22,.42)","#fb923c",18);

  // Middle Card: Radar + 4 Axis Bars
  const my=454,mh=452;
  glassBox(c,44,my,992,mh,24,"rgba(255,255,255,.12)");
  tx(c,"TAKTİKSEL DNA · 4 EKSEN ANALİZİ",74,my+38,25,"#f0c24b","left",700);
  // Left Radar Chart
  const rcx=264,rcy=my+250,R=136;
  const rPts=[[0,-1,"HÜCUM",dna.atk],[1,0,"KONTROL",dna.ctrl],[0,1,"DİRENÇ",dna.aggr],[-1,0,"BİTİRİCİLİK",dna.eff]];
  [0.25,0.5,0.75,1].forEach(k=>{
    const r=R*k;
    c.save();c.beginPath();
    c.moveTo(rcx,rcy-r);c.lineTo(rcx+r,rcy);c.lineTo(rcx,rcy+r);c.lineTo(rcx-r,rcy);c.closePath();
    c.strokeStyle=k===1?"rgba(255,255,255,.26)":"rgba(255,255,255,.10)";
    c.lineWidth=k===1?2:1.2;
    if(k<1)c.setLineDash([4,4]);
    c.stroke();c.restore();
  });
  c.save();c.strokeStyle="rgba(255,255,255,.16)";c.lineWidth=1.4;
  c.beginPath();c.moveTo(rcx,rcy-R);c.lineTo(rcx,rcy+R);c.moveTo(rcx-R,rcy);c.lineTo(rcx+R,rcy);c.stroke();c.restore();
  c.save();c.beginPath();
  rPts.forEach(([dx,dy,,v],idx)=>{const r=R*(v/100);if(idx)c.lineTo(rcx+dx*r,rcy+dy*r);else c.moveTo(rcx+dx*r,rcy+dy*r)});
  c.closePath();
  const rf=c.createRadialGradient(rcx,rcy,10,rcx,rcy,R);
  rf.addColorStop(0,"rgba(62,230,168,.42)");rf.addColorStop(1,"rgba(15,157,107,.18)");
  c.fillStyle=rf;c.fill();
  c.lineWidth=3;c.strokeStyle="#3ee6a8";c.stroke();
  c.restore();
  rPts.forEach(([dx,dy,,v])=>{
    const r=R*(v/100);
    c.save();c.shadowColor="#f0c24b";c.shadowBlur=10;
    c.fillStyle="#fbeaa8";c.beginPath();c.arc(rcx+dx*r,rcy+dy*r,6.5,0,Math.PI*2);c.fill();
    c.lineWidth=2;c.strokeStyle="#091423";c.stroke();c.restore();
  });
  tx(c,`HÜCUM (${dna.atk})`,rcx,rcy-R-24,20,"#e2e8f0","center",700);
  tx(c,`DİRENÇ (${dna.aggr})`,rcx,rcy+R+26,20,"#e2e8f0","center",700);
  tx(c,`KONTROL`,rcx+R+12,rcy-10,18,"#cbd5e1","left",700);
  tx(c,String(dna.ctrl),rcx+R+12,rcy+14,22,"#3ee6a8","left",700);
  tx(c,`BİTİRİCİLİK`,rcx-R-12,rcy-10,18,"#cbd5e1","right",700);
  tx(c,String(dna.eff),rcx-R-12,rcy+14,22,"#f0c24b","right",700);

  // Vertical divider between Radar & Bars
  c.fillStyle="rgba(255,255,255,.08)";c.fillRect(486,my+74,1.5,mh-102);

  // Right 4 Axis Bars
  const lvlCol=v=>v>=80?["#f0c24b","#3ee6a8","ELİT"]:v>=65?["#12b886","#3ee6a8","ÇOK İYİ"]:v>=50?["#0ea5e9","#38bdf8","İYİ"]:v>=35?["#d97706","#fbbf24","ORTA"]:["#f97316","#ef4444","GELİŞTİRİLMELİ"];
  axList.forEach((a,idx)=>{
    const bx=514,by=my+78+idx*90,bw=492,[c1,c2,lvl]=lvlCol(a.v);
    c.fillStyle="rgba(255,255,255,.038)";rr(c,bx,by,bw,78,14);c.fill();
    c.lineWidth=1.2;c.strokeStyle="rgba(255,255,255,.08)";c.stroke();
    tx(c,a.n.toLocaleUpperCase("tr"),bx+16,by+24,21,"#f8fafc","left",700);
    drawPill(c,lvl,bx+292,by+12,110,24,"rgba(255,255,255,.07)",null,c1,c2,13);
    tx(c,String(a.v),bx+bw-16,by+26,34,c1,"right",700);
    // Progress bar
    c.fillStyle="rgba(255,255,255,.10)";rr(c,bx+16,by+46,bw-32,8,4);c.fill();
    c.fillStyle=grad(c,bx+16,bx+16+(bw-32)*(a.v/100),c1,c2);
    rr(c,bx+16,by+46,Math.max(12,Math.round((bw-32)*(a.v/100))),8,4);c.fill();
    tx(c,a.sub,bx+16,by+66,15,"#94a3b8","left",600);
  });

  // Bottom Card: xG, xPts & Hak Ediş
  const by=930,bh=386;
  glassBox(c,44,by,992,bh,24,"rgba(255,255,255,.12)");
  const sMs=(x.mt||[]).filter(m=>m.stats),xgMs=sMs.filter(m=>m.stats.myXg!=null),xaMs=xgMs.filter(m=>m.stats.oppXg!=null);
  const totGf=xgMs.reduce((a,m)=>a+(+m.gf||0),0),totXg=xgMs.reduce((a,m)=>a+(+m.stats.myXg||0),0),xgD=totGf-totXg;
  const totGa=xaMs.reduce((a,m)=>a+(+m.ga||0),0),totOXg=xaMs.reduce((a,m)=>a+(+m.stats.oppXg||0),0);
  const totXpts=xaMs.reduce((a,m)=>a+calcMatchXpts(m.stats.myXg,m.stats.oppXg).xPts,0);
  const actPts=xaMs.reduce((a,m)=>{const r=mres(m);return a+(r=="w"?3:r=="d"?1:0)},0),xpD=actPts-totXpts;
  const gkMs=sMs.filter(m=>m.stats.oppSot!=null),totOSot=gkMs.reduce((a,m)=>a+Math.max(0,+m.stats.oppSot||0),0),totSav=gkMs.reduce((a,m)=>a+Math.max(0,(+m.stats.oppSot||0)-(+m.ga||0)),0);
  const gkPct=totOSot>0?Math.round(totSav/totOSot*100):null;

  tx(c,"xG, xPts & VERİMLİLİK TELEMETRİSİ",74,by+38,25,"#f0c24b","left",700);
  const finSt=xgMs.length?(xgD>=0.5?["MÜKEMMEL BİTİRİCİLİK","#3ee6a8","rgba(16,185,129,.18)"]:xgD<=-0.5?["BİTİRİCİLİK SORUNU","#fb923c","rgba(249,115,22,.18)"]:["DENGELİ BİTİRİCİLİK","#cbd5e1","rgba(148,163,184,.16)"]):null;
  if(finSt)drawPill(c,finSt[0],728,by+20,278,36,finSt[2],null,finSt[1],finSt[1],18);

  const kpis=[
    ["ÜRETİLEN xG",xgMs.length?xgN2(totXg):"—",xgMs.length?`${totGf} Gol (${xgS2(xgD)})`:"Veri yok",xgD>=0.5?"#3ee6a8":xgD<=-0.5?"#fb923c":"#f8fafc"],
    ["YENEN xG",xaMs.length?xgN2(totOXg):"—",xaMs.length?`${totGa} Gol (${xgS2(totGa-totOXg)})`:"Veri yok",(totOXg-totGa)>=0.75?"#3ee6a8":(totOXg-totGa)<=-0.75?"#fb923c":"#cbd5e1"],
    ["BEKLENEN PUAN",xaMs.length?xgN1(totXpts):"—",xaMs.length?`Gerçek: ${actPts} (${xgS1(xpD)})`:"Veri yok",xpD>=1.5?"#3ee6a8":xpD<=-1.5?"#fb923c":"#f0c24b"],
    gkPct!=null?["KALECİ KURTARIŞ","%"+gkPct,`${totSav}/${totOSot} Kurtarış`,gkPct>=75?"#3ee6a8":gkPct<=55?"#fb923c":"#38bdf8"]
               :["TOPLA OYNAMA","%"+Math.round(dna.mPos),`Pas İsabeti %${Math.round(dna.mPass)}`,"#38bdf8"]
  ];
  kpis.forEach(([lbl,val,sub,col],i)=>{
    const kx=72+i*238,ky=by+74;
    c.fillStyle="rgba(255,255,255,.045)";rr(c,kx,ky,222,146,16);c.fill();
    c.lineWidth=1.2;c.strokeStyle="rgba(255,255,255,.10)";c.stroke();
    tx(c,lbl,kx+111,ky+28,17,"#94a3b8","center",700);
    tx(c,val,kx+111,ky+78,56,col,"center",700);
    tx(c,sub,kx+111,ky+122,17,"#cbd5e1","center",600);
  });

  // Hak Ediş 3-Box Strip
  const dhy=by+242;
  tx(c,"MAÇ SONUÇLARI HAK EDİLDİ Mİ?",74,dhy+12,18,"#94a3b8","left",700);
  [[dna.deservedCnt,"HAK EDİLMİŞ","#3ee6a8","rgba(16,185,129,.14)","rgba(62,230,168,.38)"],
   [dna.stealCnt,"ŞANSLI SONUÇ","#60a5fa","rgba(59,130,246,.14)","rgba(96,165,250,.38)"],
   [dna.unluckyCnt,"ŞANSSIZ SONUÇ","#fb923c","rgba(249,115,22,.14)","rgba(251,146,60,.38)"]
  ].forEach(([cnt,lbl,col,bg,bd],i)=>{
    const dx=72+i*318,dy=dhy+32;
    c.save();if(!cnt)c.globalAlpha=.46;
    c.fillStyle=bg;rr(c,dx,dy,300,88,15);c.fill();
    c.lineWidth=1.4;c.strokeStyle=bd;c.stroke();
    tx(c,String(cnt),dx+48,dy+45,52,col,"center",700);
    tx(c,lbl,dx+96,dy+34,21,"#f8fafc","left",700);
    tx(c,cnt===1?"1 maç":`${cnt} maç`,dx+96,dy+62,17,"#94a3b8","left",600);
    c.restore();
  });

  drawPosterFooter(c,W,H,x.name.toLocaleUpperCase("tr")+" · MENAJER KİMLİĞİ (2/2)");
  return cv;
}

function clrImg(){
  if(st.img){
    const urls=new Set([st.img.url,...(st.img.pages||[]).map(p=>p&&p.url)]);
    urls.forEach(u=>{if(u&&u.startsWith("blob:")){try{URL.revokeObjectURL(u)}catch(e){}}});
  }
  st.img=null;
}
async function mkImg(kind,x){
  if(st.isGenerating)return;
  if(kind=="karne"&&x.my==null){ask("Karne için önce takım seçilmiş olmalı.");render();return}
  if(kind=="kura"&&!x.G){ask("Önce kurayı çek.");render();return}
  st.isGenerating=kind;st.genId=(kind=="karne"||kind=="mac")&&x&&x.id!=null?x.id:null;
  ntf("⏳ Görsel hazırlanıyor…");render();
  await new Promise(r=>{if(typeof requestAnimationFrame=="function")requestAnimationFrame(()=>setTimeout(r,16));else setTimeout(r,16)});
  try{
    try{await document.fonts.load('700 30px "FC Sayi"')}catch(e){}
    const cv=kind=="kura"?await kuraCv(x):kind=="tots"?await totsCv(x):kind=="ko"?await koCv(x):kind=="kariyer"?await kariyerCv():kind=="mac"?await macCv(x):kind=="duello"?await duelloCv(x):kind=="duello-sezon"?await duelloSezonCv(x):kind=="duello-kulup"?await duelloKulupCv(x):kind=="coop-hist"?await coopHistCv(x):await karneCv(x);
    const toImgObj=async(canvas,ttl,fn)=>{
      const blob=await new Promise(r=>canvas.toBlob(r,"image/png"));
      const url=blob&&typeof URL!="undefined"&&URL.createObjectURL?URL.createObjectURL(blob):canvas.toDataURL("image/png");
      return{title:ttl,name:fn,url,blob,w:canvas.width,h:canvas.height};
    };
    const baseSlug=x.name.replace(/[^\wÀ-ɏ]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase();
    const kuraLive=kind=="kura"&&x&&(x._hasTbl!==undefined?!!x._hasTbl:((x.sim&&x.sim.w>0)||(x.mt||[]).some(m=>m.rd==="Grup")));
    const mainTitle=kind=="kariyer"?"Kariyer özeti":kind=="mac"?"Maç kartı":kind=="duello"?"Menajer Düellosu (1v1)":kind=="duello-sezon"?"Sezon vs. Sezon Posteri":kind=="duello-kulup"?"Kulüp vs. Kulüp Posteri":kind=="coop-hist"?"Ortak Kupa Geçmişi Posteri":kind=="tots"?x.name+" · En İyi 11 (TOTS)":kind=="ko"?x.name+" · Eleme Ağacı":x.name+(kind=="kura"?(kuraLive?(isUcl(x.cfg)?" ŞL puan durumu":isLg(x.cfg)?" lig puan durumu":" puan durumu"):(isUcl(x.cfg)?" ŞL kurası":" kurası")):" karnesi");
    const mainName="fc27-"+kind+"-"+baseSlug+".png";
    const p1=await toImgObj(cv,mainTitle,mainName);
    let pages=null;
    if(kind=="karne"&&x.res&&calcTacticalDNA(x,true)){
      const cv2=await karneDnaCv(x);
      if(cv2){
        const p2=await toImgObj(cv2,x.name+" · Menajer Kimliği","fc27-karne-"+baseSlug+"-kimlik.png");
        pages=[p1,p2];
      }
    }
    if(p1&&p1.url&&typeof Image!=="undefined"){
      await new Promise(res=>{const im=new Image();im.onload=im.onerror=res;im.src=p1.url;if(im.decode)im.decode().then(res).catch(()=>{});setTimeout(res,800)});
    }
    clrImg();hideToast();
    st.img=Object.assign({},p1,{msg:"",x,pg:0,pages,anim:false});
  }catch(e){hideToast();ask("Görsel oluşturulamadı.")}
  finally{st.isGenerating=false;st.genId=null;render()}}
const imgDlg=()=>{
  const shIc='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>';
  const pg=st.img.pg||0,hasP=Array.isArray(st.img.pages)&&st.img.pages.length>1,curP=hasP?(st.img.pages[pg]||st.img):st.img;
  const tabs=hasP?`<div class="stabs seg2 pimg-tabs" role="tablist" aria-label="Karne sayfaları"><button class="chip ${pg===0?"on":""}" role="tab" aria-selected="${pg===0}" data-a="imgpg" data-v="0">1 · Sezon Karnesi</button><button class="chip ${pg===1?"on":""}" role="tab" aria-selected="${pg===1}" data-a="imgpg" data-v="1">2 · Menajer Kimliği</button></div>`:"";
  const showAnim=pg===0&&st.img.anim;
  return `<div class="dlg"><div class="dbox wide pimgdlg" role="dialog" aria-modal="true"><div class="pimg-hd"><span class="aci">${UICO.trophy}</span><div class="pimg-t"><b>${esc(curP.title)}</b><small>${hasP?`Sayfa ${pg+1}/${st.img.pages.length} · `:""}Yüksek çözünürlüklü PNG kartı</small></div><button class="mb sc-ic" data-a="no" aria-label="Kapat">✕</button></div>${tabs}<div class="pimg-stage">${showAnim?`<canvas id="kcv" class="shimg" width="${curP.w||1080}" height="${curP.h||1400}" role="img" aria-label="${esc(curP.title)}"></canvas>`:`<img class="shimg" src="${curP.url}" width="${curP.w||1080}" height="${curP.h||1400}" style="aspect-ratio:${curP.w||1080}/${curP.h||1400}" decoding="sync" alt="${esc(curP.title)}">`}</div><div class="pimg-nt">${esc(st.img.msg||"Görsele basılı tutarak da galeriye kaydedebilirsin.")}</div><div class="pimg-acts"><button class="btn p pset-pri" data-a="shimg">${shIc}<span>Paylaş</span></button><a class="btn pset-sec" href="${curP.url}" download="${esc(curP.name)}">${UICO.backup}<span>İndir</span></a></div></div></div>`;
};

async function kariyerCv(){const mode=st.hmod||"all",d=careerData(mode),isL=mode=="lg",isC=mode=="cup",W=1080;
  const bestMap=isL?SNL:SN,totM=d.t.w+d.t.d+d.t.l,wrPct=totM?Math.round(d.t.w/totM*100):0;
  const cards=[];
  if(d.ga)cards.push(["SKOR KATKISI LİDERİ",d.ga.n,d.ga.v+" G+A","#fbeaa8"]);
  if(d.g)cards.push(["EN GOLCÜ",d.g.n,d.g.v+" GOL","#f0c24b"]);
  if(d.a)cards.push(["ASİST LİDERİ",d.a.n,d.a.v+" ASİST","#38bdf8"]);
  if(d.mom)cards.push(["MAÇIN ADAMI LİDERİ",d.mom.n,d.mom.v+" MOTM","#3ee6a8"]);
  if(d.duo)cards.push(["ALTIN İKİLİ",d.duo.n,d.duo.tot+" ORTAK GOL · "+d.duo.m+"M","#2dd4bf",true]);
  const cLayout=[];let curRow=[];
  cards.forEach(it=>{
    if(it[4]){if(curRow.length){cLayout.push(curRow);curRow=[]}cLayout.push([it])}
    else{curRow.push(it);if(curRow.length===2){cLayout.push(curRow);curRow=[]}}
  });
  if(curRow.length)cLayout.push(curRow);
  const hasBest=d.best>=0,hasLd=hasBest||cLayout.length>0;
  const boxH=hasLd?(76+(hasBest?86:0)+(cLayout.length?cLayout.length*120-14:0)+22):0;
  const H=Math.max(1200,886+(boxH?boxH+24:0)+84);
  const cv=mkCv(W,H),c=cv.getContext("2d");
  dkBg(c,W,H,"#38bdf8","#f0c24b",d.ch>0);

  // Header
  const pillTxt=isL?"LİG KARİYERİ":isC?"KUPA KARİYERİ":"KARİYER ÖZETİ";
  drawPill(c,pillTxt,48,40,196,38,"rgba(240,194,75,.18)","rgba(240,194,75,.06)","rgba(240,194,75,.52)","#fbeaa8",20);
  c.font="700 52px "+NUMF;tx(c,fit(c,(store.owner?store.owner.toLocaleUpperCase("tr")+" · ":"")+"MENAJER KARİYERİ",730),48,114,52,"#f8fafc","left",700);
  tx(c,today(),W-48,66,25,"#94a3b8","right",600);
  drawPill(c,d.n+" SEZON · "+totM+" MAÇ",W-48-224,92,224,32,"rgba(16,185,129,.16)",null,"rgba(62,230,168,.42)","#3ee6a8",18);

  // 3-Column Broadcast Hero Panel: Şampiyonluk | Sezon | Galibiyet Oranı Arc Gauge
  const hy=178,hh=268;
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
  const hCol=d.ch>0?"#2b2000":"#fbeaa8",sCol=d.ch>0?"#4a3600":"#94a3b8",divC=d.ch>0?"rgba(43,32,0,.18)":"rgba(255,255,255,.10)";
  // Col 1: Şampiyonluk
  tx(c,d.ch,209,hy+106,138,hCol,"center",700);
  tx(c,"🏆 ŞAMPİYONLUK",209,hy+208,26,sCol,"center",700);
  c.fillStyle=divC;c.fillRect(374,hy+44,2,180);
  // Col 2: Sezon
  tx(c,d.n,540,hy+106,138,d.ch>0?"#2b2000":"#f8fafc","center",700);
  tx(c,isL?"LİG SEZONU":isC?"KUPA SEZONU":"TOPLAM SEZON",540,hy+208,26,sCol,"center",700);
  c.fillStyle=divC;c.fillRect(706,hy+44,2,180);
  // Col 3: Win-Rate Radial Arc Gauge
  const gx=871,gy=hy+106,gr=66;
  c.save();
  c.lineWidth=11;c.strokeStyle=d.ch>0?"rgba(43,32,0,.16)":"rgba(255,255,255,.10)";
  c.beginPath();c.arc(gx,gy,gr,0,Math.PI*2);c.stroke();
  if(wrPct>0){
    const startA=-Math.PI/2,endA=startA+(Math.PI*2)*(wrPct/100);
    c.strokeStyle=d.ch>0?"#2b2000":"#3ee6a8";c.lineCap="round";
    if(!d.ch){c.shadowColor="#3ee6a8";c.shadowBlur=12}
    c.beginPath();c.arc(gx,gy,gr,startA,endA);c.stroke();
  }
  c.restore();
  tx(c,"%"+wrPct,gx,gy+2,44,d.ch>0?"#2b2000":"#3ee6a8","center",700);
  tx(c,"GALİBİYET ORANI",gx,hy+208,24,sCol,"center",700);

  // Row 1 KPI: G / B / M with individual percentages
  const ky1=470;
  const pctOf=n=>totM?`%${Math.round(n/totM*100)}`:"";
  [[d.t.w,"GALİBİYET","#3ee6a8",pctOf(d.t.w)],[d.t.d,"BERABERLİK","#94a3b8",pctOf(d.t.d)],[d.t.l,"MAĞLUBİYET","#ff6b6b",pctOf(d.t.l)]].forEach(([val,lbl,col,sub],i)=>{
    const bx=44+i*338;
    glassBox(c,bx,ky1,316,174,22,"rgba(255,255,255,.11)",col);
    c.fillStyle=col;rr(c,bx+24,ky1+1,268,4,2);c.fill();
    tx(c,val,bx+158,ky1+78,106,col,"center",700);
    tx(c,lbl,bx+158,ky1+146,24,"#94a3b8","center",700);
    if(sub)drawPill(c,sub,bx+230,ky1+18,68,28,"rgba(255,255,255,.08)",null,col,col,17);
  });

  // Proportional W-D-L Strip
  const byBar=658;
  c.fillStyle="rgba(255,255,255,.07)";rr(c,44,byBar,992,12,6);c.fill();
  if(totM>0){
    let cx=44;
    [[d.t.w,"#12b886"],[d.t.d,"#64748b"],[d.t.l,"#ef4444"]].forEach(([cnt,col])=>{
      if(!cnt)return;const segW=Math.max(14,Math.round((cnt/totM)*992));
      c.fillStyle=col;rr(c,cx,byBar,Math.min(segW,1036-cx),12,6);c.fill();cx+=segW+4;
    });
  }

  // Row 2 KPI: Atılan / Yenen / Averaj / Final or Podium
  const ky2=686,av=d.t.gf-d.t.ga,avStr=(av>0?"+":"")+av;
  const gfm=totM?(d.t.gf/totM).toFixed(1).replace(".",",")+" /M":"";
  const gam=totM?(d.t.ga/totM).toFixed(1).replace(".",",")+" /M":"";
  [["ATILAN GOL",d.t.gf,"#f8fafc",gfm],["YENEN GOL",d.t.ga,"#cbd5e1",gam],["AVERAJ",avStr,av>0?"#3ee6a8":av<0?"#ff6b6b":"#94a3b8",""],[isL?"İLK 3 (PODYUM)":"FİNALE KALMA",isL?d.pod:d.fin,"#f0c24b",""]].forEach(([lbl,val,vc,sub],i)=>{
    const bx=44+i*253;
    glassBox(c,bx,ky2,233,130,20,"rgba(255,255,255,.10)");
    tx(c,val,bx+116,ky2+48,58,vc,"center",700);
    tx(c,lbl,bx+116,ky2+92,20,"#94a3b8","center",600);
    if(sub)tx(c,sub,bx+116,ky2+114,15,"#64748b","center",600);
  });

  // Career Leaders & Records Showcase
  if(boxH){
    const by=842;
    glassBox(c,44,by,992,boxH,24,"rgba(240,194,75,.32)","#f0c24b");
    tx(c,"🏆 KARİYER LİDERLERİ VE REKORLAR",72,by+38,26,"#f0c24b","left",700);
    let ay=by+74;
    if(hasBest){
      c.save();
      c.fillStyle=grad(c,72,1008,"rgba(240,194,75,.22)","rgba(15,157,107,.10)");
      rr(c,72,ay,936,70,16);c.fill();
      c.lineWidth=1.6;c.strokeStyle="rgba(240,194,75,.52)";c.stroke();
      drawPill(c,"EN İYİ SONUÇ",90,ay+17,156,36,"#fbeaa8","#d4a017",null,"#2b2000",19);
      c.font="700 36px "+NUMF;tx(c,fit(c,(bestMap[d.best]||SN[d.best]).trim().toLocaleUpperCase("tr"),720),264,ay+36,36,"#fff7d6","left",700);
      c.restore();
      ay+=86;
    }
    cLayout.forEach(row=>{
      const isFull=row.length===1;
      row.forEach(([lbl,name,stat,col],colI)=>{
        const iw=isFull?936:460,ix=72+(isFull?0:colI*476),iy=ay;
        c.fillStyle="rgba(255,255,255,.048)";rr(c,ix,iy,iw,106,16);c.fill();
        c.lineWidth=1.2;c.strokeStyle="rgba(255,255,255,.10)";c.stroke();
        c.fillStyle=col;rr(c,ix,iy+18,5,70,3);c.fill();
        tx(c,lbl,ix+22,iy+30,19,col,"left",700);
        c.font="700 20px "+NUMF;
        const sw=Math.min(260,Math.max(104,Math.ceil(c.measureText(stat).width)+30));
        drawPill(c,stat,ix+iw-sw-16,iy+16,sw,30,"rgba(255,255,255,.07)",null,col,col,17);
        c.font="700 35px "+NUMF;tx(c,fit(c,name,iw-44),ix+22,iy+74,35,"#f8fafc","left",700);
      });
      ay+=120;
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
  const ogList=Array.isArray(m.og)?m.og.filter(o=>o&&o.sc):[];
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
  const stBoxH=stRows.length?(90+stRows.length*72+(eff?62:0)+16):0;
  const autoH2h=m.h2h&&!m.mom&&!m.gMom&&typeof coopAutoH2hMom==="function"?coopAutoH2hMom(m,me):null;
  const momStr=m.mom||(m.h2h&&m.gMom?m.gMom:autoH2h?autoH2h.n:(m.omom||(oi!=null&&oi>=0&&T[oi]?pickOppMom(oi,m.og,m.gf,m.ga):"")));
  const momIsMine=!!(m.mom||(autoH2h&&autoH2h.ti===me));
  const momDisp=momIsMine?momStr:(momStr?`${momStr} (${m.on})`:"");
  const gRowCnt=n+(ex?1:0)+(na?1:0);
  const hasOppG=ogList.length>0;
  const ogLines=[];
  if(hasOppG){
    const pref=(m.on||"RAKİP").toLocaleUpperCase("tr")+" GOLLERİ: ";
    const parts=ogList.map(o=>o.sc+(o.as?" ("+o.as+")":""));
    let curL=pref;
    parts.forEach((pt,idx)=>{
      const sep=idx===0?"":", ";
      if(curL.length+sep.length+pt.length>56&&curL!==pref){
        ogLines.push(curL);curL=pt;
      }else curL+=sep+pt;
    });
    if(curL)ogLines.push(curL);
  }
  const ogBoxH=hasOppG?(26+ogLines.length*30):0;
  const ch=(gRowCnt||hasOppG||momDisp)?(78+gRowCnt*54+(hasOppG?(ogBoxH+16):0)+(momDisp?86:0)+18):0;
  const W=1080,H=616+(stBoxH?stBoxH+24:0)+(ch?ch+24:0)+104+80;
  const cv=mkCv(W,H),c=cv.getContext("2d");
  try{await document.fonts.load('700 30px "FC Sayi"')}catch(e){}
  dkBg(c,W,H,cHome,cAway,false);

  // Header
  const rdDisp=m.rd==="Grup"?(isUcl(x.cfg)?"Lig Aşaması":isLg(x.cfg)?"Lig":"Grup"):m.rd;
  const stageTag=(rdDisp+(m.lg?" · "+m.lg+". MAÇ":"")).toLocaleUpperCase("tr");
  drawPill(c,"MAÇ SONUCU",48,40,164,38,"rgba(240,194,75,.18)","rgba(240,194,75,.06)","rgba(240,194,75,.52)","#fbeaa8",20);
  drawPill(c,stageTag,224,40,Math.min(340,Math.max(120,stageTag.length*15+36)),38,"rgba(255,255,255,.08)",null,"rgba(255,255,255,.18)","#e2e8f0",19);
  c.font="700 50px "+NUMF;
  tx(c,fit(c,x.name.toLocaleUpperCase("tr"),800),48,114,50,"#f8fafc","left",700);
  tx(c,new Date(m.id).toLocaleDateString("tr-TR"),W-48,112,26,"#94a3b8","right",600);

  // Hero Broadcast Scoreboard
  const vBg1={w:"#12b886",d:"#64748b",l:"#e03131"}[r];
  const vBg2={w:"#0a7c56",d:"#475569",l:"#991b1b"}[r];
  const vBdr={w:"#3ee6a8",d:"#94a3b8",l:"#ff6b6b"}[r];
  const hasP=m.pf!=null&&m.pa!=null;
  const baseLab=hasP?(r=="w"?"PENALTILARLA GALİBİYET":r=="l"?"PENALTILARLA MAĞLUBİYET":"BERABERLİK"):(m.et?({w:"UZATMADA GALİBİYET",d:"BERABERLİK (UZ)",l:"UZATMADA MAĞLUBİYET"}[r]):({w:"GALİBİYET",d:"BERABERLİK",l:"MAĞLUBİYET"}[r]));
  const lab=baseLab.toLocaleUpperCase("tr");

  const hy=178,hh=412;
  glassBox(c,44,hy,992,hh,28,"rgba(255,255,255,.18)");
  // Dual-club interior spotlight wash
  c.save();rr(c,44,hy,992,hh,28);c.clip();
  c.globalAlpha=.26;
  const sh1=c.createRadialGradient(204,hy+138,10,204,hy+138,340);sh1.addColorStop(0,cHome);sh1.addColorStop(1,"transparent");
  c.fillStyle=sh1;c.fillRect(44,hy,500,hh);
  const sh2=c.createRadialGradient(876,hy+138,10,876,hy+138,340);sh2.addColorStop(0,cAway);sh2.addColorStop(1,"transparent");
  c.fillStyle=sh2;c.fillRect(540,hy,496,hh);
  c.globalAlpha=1;
  const topBar=c.createLinearGradient(44,0,1036,0);
  topBar.addColorStop(0,cHome);topBar.addColorStop(.5,"#f0c24b");topBar.addColorStop(1,cAway);
  c.fillStyle=topBar;c.fillRect(44,hy,992,5);
  c.restore();

  // Frosted crest halos + drop-shadowed club crests
  const drawHaloCrest=(ti,cx,cy)=>{
    c.save();
    c.fillStyle="rgba(255,255,255,.085)";c.beginPath();c.arc(cx,cy,82,0,Math.PI*2);c.fill();
    c.lineWidth=1.8;c.strokeStyle="rgba(255,255,255,.16)";c.stroke();
    c.shadowColor="rgba(0,0,0,.6)";c.shadowBlur=22;c.shadowOffsetY=8;
    if(ti!=null&&ti>=0&&T[ti])drawBadge(c,ti,cx-64,cy-74,128);
    c.restore();
  };
  drawHaloCrest(me,204,hy+128);
  drawHaloCrest(oi,876,hy+128);
  c.font="700 42px "+NUMF;
  tx(c,fit(c,(me!=null?T[me].n:"Takımım").toLocaleUpperCase("tr"),284),204,hy+246,42,"#f8fafc","center",700);
  tx(c,fit(c,(m.on||"Rakip").toLocaleUpperCase("tr"),284),876,hy+246,42,"#f8fafc","center",700);
  if(me!=null)tx(c,CN[T[me].c][0],204,hy+288,25,"#94a3b8","center",600);
  if(oi!=null&&oi>=0&&T[oi])tx(c,CN[T[oi].c][0],876,hy+288,25,"#94a3b8","center",600);

  // Sculpted Broadcast Scoreplate Capsule
  const spW=316,spH=152,spX=540-spW/2,spY=hy+52;
  c.save();
  c.fillStyle="rgba(6,13,22,.74)";rr(c,spX,spY,spW,spH,24);c.fill();
  c.lineWidth=1.8;c.strokeStyle="rgba(240,194,75,.34)";c.stroke();
  c.fillStyle="rgba(255,255,255,.10)";c.fillRect(539,spY+26,2,spH-52);
  c.shadowColor="rgba(251,234,168,.26)";c.shadowBlur=22;
  tx(c,String(m.gf),spX+spW*0.25,spY+spH/2+4,116,m.gf>m.ga?"#3ee6a8":m.gf<m.ga?"#cbd5e1":"#fbeaa8","center",700);
  tx(c,String(m.ga),spX+spW*0.75,spY+spH/2+4,116,m.ga>m.gf?"#fb923c":m.ga<m.gf?"#cbd5e1":"#fbeaa8","center",700);
  c.restore();

  if(hasP)drawPill(c,`PENALTILAR  ${m.pf} – ${m.pa}`,400,hy+222,280,40,"rgba(16,185,129,.18)",null,"rgba(62,230,168,.45)","#3ee6a8",22);
  else if(m.et)drawPill(c,"UZATMA SONUNDA (UZ)",405,hy+222,270,38,"rgba(240,194,75,.16)",null,"rgba(240,194,75,.45)","#fbeaa8",21);

  // Verdict Pill
  drawPill(c,lab,270,hy+324,540,58,vBg1,vBg2,vBdr,"#ffffff",29);

  let y=hy+hh+24;
  // Opta / Broadcast Match Analysis (no duplicate verdict pill!)
  if(stBoxH){
    glassBox(c,44,y,992,stBoxH,24,"rgba(255,255,255,.12)");
    tx(c,"MAÇ ANALİZİ",74,y+42,27,"#f0c24b","left",700);
    const metaTag=(des&&des.k!=="fair")?des.t.toLocaleUpperCase("tr"):(stObj&&stObj.myXg!=null&&stObj.oppXg!=null?`xG FARKI: ${xgS2(stObj.myXg-stObj.oppXg)}`:"MAÇ TELEMETRİSİ");
    const mCol=(des&&des.k==="unlucky")?"#fb923c":(des&&des.k==="undeserved")?"#60a5fa":(des&&des.k==="deserved")?"#3ee6a8":"#e2e8f0";
    c.font="700 18px "+NUMF;const mW=Math.min(340,Math.max(200,Math.ceil(c.measureText(metaTag).width)+36));
    drawPill(c,fit(c,metaTag,mW-24),1006-mW,y+23,mW,36,"rgba(255,255,255,.07)",null,mCol,mCol,18);
    let sy=y+98;
    stRows.forEach(([lbl,v1,v2,n1,n2])=>{
      const aNum=+n1||0,bNum=+n2||0,leadA=aNum>bNum,leadB=bNum>aNum,tie=aNum===bNum;
      tx(c,v1,74,sy,36,leadA?"#3ee6a8":tie?"#f8fafc":"#94a3b8","left",700);
      tx(c,lbl,540,sy-6,22,"#cbd5e1","center",700);
      tx(c,v2,1006,sy,36,leadB?"#fb923c":tie?"#f8fafc":"#94a3b8","right",700);
      const tot=aNum+bNum,p1=tot>0?aNum/tot:0.5;
      const bx=188,bw=704,by=sy+18,bh=12,w1=Math.round(bw*p1);
      c.fillStyle="rgba(255,255,255,.08)";rr(c,bx,by,bw,bh,6);c.fill();
      if(w1>0){c.fillStyle=leadA||tie?"#12b886":"rgba(18,184,134,.42)";rr(c,bx,by,Math.max(10,w1-3),bh,6);c.fill()}
      if(bw-w1>0){c.fillStyle=leadB||tie?"#f97316":"rgba(249,115,22,.42)";rr(c,bx+w1+3,by,Math.max(10,bw-w1-3),bh,6);c.fill()}
      sy+=72;
    });
    if(eff){
      const ec=eff.cls=="pos"?"#3ee6a8":eff.cls=="neg"?"#fb923c":"#cbd5e1";
      const eBg=eff.cls=="pos"?"rgba(16,185,129,.15)":eff.cls=="neg"?"rgba(249,115,22,.15)":"rgba(148,163,184,.13)";
      drawPill(c,"Gol − xG: "+eff.t,190,sy-4,700,46,eBg,null,ec,ec,24);
    }
    y+=stBoxH+24;
  }

  // Match Details & Goals
  if(ch){
    glassBox(c,44,y,992,ch,24,"rgba(255,255,255,.12)");
    tx(c,"GOLLER VE MAÇ DETAYLARI",74,y+42,27,"#f0c24b","left",700);
    let ry=y+92;
    if(hasGls){
      glList.slice(0,6).forEach((g,idx)=>{
        const kk=isKK(g.sc);
        c.fillStyle="rgba(255,255,255,.045)";rr(c,72,ry-21,936,46,12);c.fill();
        c.fillStyle=kk?"#ef4444":"#10b981";rr(c,82,ry-14,32,32,16);c.fill();
        tx(c,kk?"KK":(idx+1),98,ry+3,19,kk?"#fff":"#052e16","center",700);
        c.font="700 32px "+NUMF;
        tx(c,fit(c,kk?"Kendi Kalesine (KK)":g.sc,520),128,ry+3,32,kk?"#ff6b6b":"#f8fafc","left",700);
        if(!kk&&g.as){
          c.font="600 22px "+NUMF;const aTxt=fit(c,"ASİST · "+g.as,320);
          drawPill(c,aTxt,676,ry-15,320,34,"rgba(62,230,168,.14)",null,"rgba(62,230,168,.38)","#3ee6a8",21);
        }
        ry+=54;
      });
      if(ex){tx(c,"+ "+(glList.length-6)+" gol daha",84,ry+2,24,"#94a3b8","left",600);ry+=54}
    }else{
      sc.slice(0,6).forEach(([nm,g],idx)=>{
        const kk=isKK(nm);
        c.fillStyle="rgba(255,255,255,.045)";rr(c,72,ry-21,936,46,12);c.fill();
        c.fillStyle=kk?"#ef4444":"#10b981";rr(c,82,ry-14,32,32,16);c.fill();
        tx(c,kk?"KK":(idx+1),98,ry+3,19,kk?"#fff":"#052e16","center",700);
        c.font="700 32px "+NUMF;tx(c,fit(c,kk?"Kendi Kalesine (KK)":nm,720),128,ry+3,32,"#f8fafc","left",700);
        drawPill(c,"× "+g,910,ry-15,86,34,"rgba(62,230,168,.16)",null,"rgba(62,230,168,.38)","#3ee6a8",22);
        ry+=54;
      });
      if(ex){tx(c,"+ "+(sc.length-6)+" golcü daha",84,ry+2,24,"#94a3b8","left",600);ry+=54}
      if(na){c.font="600 25px "+NUMF;tx(c,fit(c,"ASİST: "+as.slice(0,4).map(([nm,a])=>nm+(a>1?" (×"+a+")":"")).join(", "),910),84,ry+2,25,"#3ee6a8","left",600);ry+=54}
    }
    if(hasOppG){
      const boxTop=ry-20;
      c.fillStyle="rgba(249,115,22,.08)";rr(c,72,boxTop,936,ogBoxH,11);c.fill();
      c.lineWidth=1;c.strokeStyle="rgba(249,115,22,.28)";c.stroke();
      c.font="600 22px "+NUMF;
      ogLines.forEach((ln,li)=>{
        tx(c,fit(c,ln,904),90,boxTop+27+li*30,22,"#fdba74","left",600);
      });
      ry+=ogBoxH+16;
    }
    if(momDisp){
      const my2=ry-6;
      c.save();
      c.fillStyle=grad(c,72,1008,"rgba(240,194,75,.24)","rgba(240,194,75,.07)");
      rr(c,72,my2,936,68,16);c.fill();
      c.lineWidth=1.8;c.strokeStyle="rgba(240,194,75,.58)";c.stroke();
      drawPill(c,"★ MOTM",88,my2+15,126,38,"#fbeaa8","#d4a017",null,"#2b2000",21);
      c.font="700 34px "+NUMF;tx(c,fit(c,momDisp,744),232,my2+35,34,"#fff7d6","left",700);
      c.restore();
    }
    y+=ch+24;
  }

  // Son 5 Maç Form Strip
  const ms=(x.mt||[]),ix=ms.findIndex(q=>q.id==m.id),fm=ms.slice(Math.max(0,ix-4),ix+1);
  glassBox(c,44,y,992,80,20,"rgba(255,255,255,.11)");
  tx(c,"SON 5 MAÇ FORMU",74,y+41,24,"#94a3b8","left",700);
  drawFormRow(c,fm,1006,y+40,true);
  drawPosterFooter(c,W,H,x.name.toLocaleUpperCase("tr")+" · "+stageTag);
  return cv}
async function duelloCv(x){
  const me=x.me,opp=x.opp,mode=x.mode||"all",W=1080,hasDna=!!(me.dna||opp.dna),hasStar=!!(me.star||opp.star),H=hasDna?1520:(hasStar?1170:1030);
  const crit=duelCareerCriteria(me,opp,mode);
  const c1=crit.c1,c2=crit.c2;
  const tiMe=me.cur&&me.cur.team&&IX[me.cur.team]!=null?IX[me.cur.team]:null;
  const tiOp=opp.cur&&opp.cur.team&&IX[opp.cur.team]!=null?IX[opp.cur.team]:null;
  if(typeof preloadLogos==="function")await preloadLogos([tiMe,tiOp].filter(i=>i!=null));
  const modeLbl=mode=="cup"?"KUPA DÜELLOSU":mode=="lg"?"LİG DÜELLOSU":"MENAJER DÜELLOSU · 1V1";
  const cv=mkCv(W,H),c=cv.getContext("2d");
  dkBg(c,W,H,"#2dd496","#e8be54",false);

  // Header
  drawPill(c,modeLbl,48,40,290,38,"rgba(45,212,150,.18)","rgba(45,212,150,.06)","rgba(45,212,150,.52)","#3ee6a8",20);
  tx(c,"KAFA KAFAYA KARŞILAŞTIRMA",48,114,48,"#f8fafc","left",700);
  tx(c,today(),W-48,66,24,"#94a3b8","right",600);
  drawPill(c,"FC 27 LİG · CANLI VS",W-48-216,92,216,32,"rgba(240,194,75,.16)",null,"rgba(240,194,75,.45)","#fbeaa8",17);

  // Hero VS Panel (Obsidian Crest Frames + Club Badges)
  const sb={s1:crit.s1,s2:crit.s2};
  const hy=174,hh=204;
  glassBox(c,44,hy,992,hh,26,"rgba(240,194,75,.30)","#2dd496");
  const drawCrest=(ti,nm,bx,by,strokeCol,glowCol)=>{
    c.save();
    if(ti!=null){
      const cg=c.createLinearGradient(bx,by,bx,by+86);
      cg.addColorStop(0,"rgba(248,250,252,.94)");cg.addColorStop(1,"rgba(203,213,225,.80)");
      c.fillStyle=cg;
    }else c.fillStyle="rgba(255,255,255,.06)";
    c.strokeStyle=strokeCol;c.lineWidth=2.5;
    c.shadowColor=glowCol;c.shadowBlur=18;
    rr(c,bx,by,86,86,20);c.fill();c.stroke();
    c.restore();
    if(ti!=null&&typeof drawBadge==="function")drawBadge(c,ti,bx+12,by+8,62);
    else tx(c,(nm||"?").slice(0,1).toLocaleUpperCase("tr"),bx+43,by+46,38,"#f8fafc","center",700);
  };
  // Left (Me - Emerald)
  drawCrest(tiMe,me.name,72,hy+54,"rgba(46,229,157,.62)","rgba(46,229,157,.32)");
  c.font="700 40px "+NUMF;
  tx(c,fit(c,me.name.toLocaleUpperCase("tr"),255),176,hy+72,40,"#f8fafc","left",700);
  tx(c,`${c1.n} SEZON · ${c1.m} MAÇ`,176,hy+112,20,"#94a3b8","left",600);
  if(me.cur&&me.cur.team){
    c.font="700 20px "+NUMF;
    tx(c,fit(c,me.cur.team+(me.cur.teamG?" · "+me.cur.teamG+" GEN":""),255),176,hy+146,20,"#3ee6a8","left",700);
  }
  // Center VS & Score
  drawPill(c,"VS",W/2-38,hy+30,76,34,"rgba(255,255,255,.10)",null,"rgba(255,255,255,.22)","#e2e8f0",18);
  tx(c,String(sb.s1),W/2-44,hy+122,78,"#2dd496","right",700);
  tx(c,"–",W/2,hy+118,54,"#64748b","center",700);
  tx(c,String(sb.s2),W/2+44,hy+122,78,"#e8be54","left",700);
  // Right (Opp - Gold)
  drawCrest(tiOp,opp.name,W-72-86,hy+54,"rgba(240,194,75,.64)","rgba(240,194,75,.32)");
  c.font="700 40px "+NUMF;
  tx(c,fit(c,opp.name.toLocaleUpperCase("tr"),255),W-176,hy+72,40,"#f8fafc","right",700);
  tx(c,`${c2.n} SEZON · ${c2.m} MAÇ`,W-176,hy+112,20,"#94a3b8","right",600);
  if(opp.cur&&opp.cur.team){
    c.font="700 20px "+NUMF;
    tx(c,fit(c,opp.cur.team+(opp.cur.teamG?" · "+opp.cur.teamG+" GEN":""),255),W-176,hy+146,20,"#fbeaa8","right",700);
  }

  // Comparison Bars Box — TEK KAYNAK (duelCareerCriteria: 10 puanlı kriter + 1 nötr GEN satırı)
  const by=396,bh=560;
  glassBox(c,44,by,992,bh,24,"rgba(255,255,255,.12)",null);
  crit.rows.forEach((r,idx)=>{
    const ry=by+34+idx*48.5;
    const b=duelBarCalc(r.v1,r.v2,r.low);
    const w1=!r.neu&&b.w1,w2=!r.neu&&b.w2;
    tx(c,String(r.f1).toLocaleUpperCase("tr"),82,ry,23,w1?"#2dd496":"#cbd5e1","left",700);
    tx(c,r.lbl.toLocaleUpperCase("tr"),W/2,ry,15.5,"#94a3b8","center",700);
    tx(c,String(r.f2).toLocaleUpperCase("tr"),W-82,ry,23,w2?"#e8be54":"#cbd5e1","right",700);
    const bw1=Math.round(b.p1/100*430),bw2=Math.round(b.p2/100*430);
    c.fillStyle="rgba(255,255,255,.07)";
    rr(c,82,ry+15,430,7,3.5);c.fill();
    rr(c,W-82-430,ry+15,430,7,3.5);c.fill();
    if(bw1>0){c.fillStyle=r.neu?"rgba(148,163,184,.52)":(w1?"#2dd496":"rgba(45,212,150,.48)");rr(c,82+(430-bw1),ry+15,bw1,7,3.5);c.fill()}
    if(bw2>0){c.fillStyle=r.neu?"rgba(148,163,184,.52)":(w2?"#e8be54":"rgba(232,190,84,.48)");rr(c,W-82-430,ry+15,bw2,7,3.5);c.fill()}
  });

  if(hasDna){
  // Dual Tactical DNA Radar + Identities + Career Star Box
  const dy=974,dh=472;
  glassBox(c,44,dy,992,dh,24,"rgba(255,255,255,.12)",null);
  tx(c,"TAKTİKSEL DNA · MENAJER KİMLİĞİ · KARİYER YILDIZI",82,dy+36,20,"#94a3b8","left",700);
  const cx=W/2,cy=dy+226,R=132;
  const ax=[[0,-1,"HÜCUM","atk"],[1,0,"KONTROL","ctrl"],[0,1,"DİRENÇ","aggr"],[-1,0,"BİTİRİCİLİK","eff"]];
  [0.25,0.5,0.75,1].forEach(k=>{
    const r=R*k;
    c.strokeStyle="rgba(255,255,255,.12)";c.lineWidth=k==1?1.8:1;
    c.beginPath();c.moveTo(cx,cy-r);c.lineTo(cx+r,cy);c.lineTo(cx,cy+r);c.lineTo(cx-r,cy);c.closePath();c.stroke();
  });
  c.strokeStyle="rgba(255,255,255,.12)";c.lineWidth=1;
  c.beginPath();c.moveTo(cx,cy-R);c.lineTo(cx,cy+R);c.moveTo(cx-R,cy);c.lineTo(cx+R,cy);c.stroke();
  const drawPoly=(dna,fill,stroke)=>{
    if(!dna)return;
    c.beginPath();
    ax.forEach(([dx,dy2,,k],i)=>{
      const r=R*((dna[k]||0)/100),px=cx+dx*r,py=cy+dy2*r;
      if(i===0)c.moveTo(px,py);else c.lineTo(px,py);
    });
    c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=stroke;c.lineWidth=3.5;c.stroke();
  };
  drawPoly(opp.dna,"rgba(232,190,84,.24)","#e8be54");
  drawPoly(me.dna,"rgba(45,212,150,.26)","#2dd496");
  tx(c,"HÜCUM",cx,cy-R-18,17,"#cbd5e1","center",700);
  tx(c,"KONTROL",cx+R+14,cy+5,17,"#cbd5e1","left",700);
  tx(c,"DİRENÇ",cx,cy+R+24,17,"#cbd5e1","center",700);
  tx(c,"BİTİRİCİLİK",cx-R-14,cy+5,17,"#cbd5e1","right",700);

  // Left & Right Identity + Star Labels
  c.font="700 24px "+NUMF;
  tx(c,me.name.toLocaleUpperCase("tr"),82,dy+92,19,"#2dd496","left",700);
  tx(c,fit(c,me.dna?me.dna.title:"İstatistik yok",255),82,dy+124,24,"#f8fafc","left",700);
  if(me.dna&&me.dna.subTag)tx(c,fit(c,me.dna.subTag,245),82,dy+152,17,"#94a3b8","left",600);
  if(me.dna)tx(c,`Gol−xG: ${xgS2(me.dna.xgDiff)} · Rakip xG: ${xgN2(me.dna.oXg)}`,82,dy+366,18,"#3ee6a8","left",700);
  if(me.star)tx(c,`★ ${fit(c,me.star.n,210)} (${me.star.v} G+A)`,82,dy+418,20,"#f8fafc","left",700);

  c.font="700 24px "+NUMF;
  tx(c,opp.name.toLocaleUpperCase("tr"),W-82,dy+92,19,"#e8be54","right",700);
  tx(c,fit(c,opp.dna?opp.dna.title:"İstatistik yok",255),W-82,dy+124,24,"#f8fafc","right",700);
  if(opp.dna&&opp.dna.subTag)tx(c,fit(c,opp.dna.subTag,245),W-82,dy+152,17,"#94a3b8","right",600);
  if(opp.dna)tx(c,`Gol−xG: ${xgS2(opp.dna.xgDiff)} · Rakip xG: ${xgN2(opp.dna.oXg)}`,W-82,dy+366,18,"#fbeaa8","right",700);
  if(opp.star)tx(c,`★ ${fit(c,opp.star.n,210)} (${opp.star.v} G+A)`,W-82,dy+418,20,"#f8fafc","right",700);

  }else if(hasStar){
    const dy=974,dh=126;
    glassBox(c,44,dy,992,dh,22,"rgba(255,255,255,.12)",null);
    tx(c,"KARİYER YILDIZLARI (G+A)",W/2,dy+32,17,"#94a3b8","center",700);
    c.font="700 24px "+NUMF;
    tx(c,me.star?`★ ${fit(c,me.star.n,360)} (${me.star.v} G+A)`:"—",82,dy+80,24,"#3ee6a8","left",700);
    tx(c,opp.star?`★ ${fit(c,opp.star.n,360)} (${opp.star.v} G+A)`:"—",W-82,dy+80,24,"#fbeaa8","right",700);
  }
  // Footer
  tx(c,"FC 27 LİG · MENAJER DÜELLOSU",W/2,H-32,19,"rgba(255,255,255,.45)","center",700);
  return cv;
}
async function duelloSezonCv(x){
  const me=x.me,opp=x.opp,s1=x.s1,s2=x.s2,W=1080,H=1320;
  const ti1=s1.tm&&IX[s1.tm]!=null?IX[s1.tm]:null,ti2=s2.tm&&IX[s2.tm]!=null?IX[s2.tm]:null;
  if(typeof preloadLogos==="function")await preloadLogos([ti1,ti2].filter(i=>i!=null));
  const cv=mkCv(W,H),c=cv.getContext("2d");
  dkBg(c,W,H,"#2dd496","#e8be54",false);

  drawPill(c,"SEZON vs. SEZON · 1V1",48,40,280,38,"rgba(56,189,248,.18)","rgba(56,189,248,.06)","rgba(56,189,248,.52)","#7dd3fc",20);
  tx(c,"SEZON KARŞILAŞTIRMASI",48,114,48,"#f8fafc","left",700);
  tx(c,today(),W-48,66,24,"#94a3b8","right",600);
  drawPill(c,"FC 27 LİG · DÜELLO",W-48-210,92,210,32,"rgba(240,194,75,.16)",null,"rgba(240,194,75,.45)","#fbeaa8",17);

  const sc=duelSeasonCriteria(s1,s2),sc1=sc.sc1,sc2=sc.sc2;

  const hy=174,hh=224;
  glassBox(c,44,hy,992,hh,26,"rgba(56,189,248,.34)","#2dd496");
  const drawCrest=(ti,nm,bx,by,scol,gcol)=>{
    c.save();
    if(ti!=null){
      const cg=c.createLinearGradient(bx,by,bx,by+86);
      cg.addColorStop(0,"rgba(248,250,252,.94)");cg.addColorStop(1,"rgba(203,213,225,.80)");
      c.fillStyle=cg;
    }else c.fillStyle="rgba(255,255,255,.06)";
    c.strokeStyle=scol;c.lineWidth=2.5;c.shadowColor=gcol;c.shadowBlur=18;
    rr(c,bx,by,86,86,20);c.fill();c.stroke();c.restore();
    if(ti!=null&&typeof drawBadge==="function")drawBadge(c,ti,bx+12,by+8,62);
    else tx(c,(nm||"?").slice(0,1).toLocaleUpperCase("tr"),bx+43,by+46,38,"#f8fafc","center",700);
  };
  drawCrest(ti1,s1.tm||me.name,72,hy+64,"rgba(46,229,157,.62)","rgba(46,229,157,.32)");
  c.font="700 36px "+NUMF;
  tx(c,fit(c,(s1.tm||"TAKIM YOK").toLocaleUpperCase("tr"),255),176,hy+68,36,"#f8fafc","left",700);
  tx(c,`${me.name.toLocaleUpperCase("tr")} · ${s1.n}`,176,hy+106,20,"#94a3b8","left",600);
  tx(c,fit(c,duelShortRes(s1.res,s1.st),255),176,hy+140,20,"#3ee6a8","left",700);
  tx(c,`${s1.w}G ${s1.d}B ${s1.l}M · ${s1.gf}:${s1.ga}`,176,hy+172,18,"#cbd5e1","left",600);

  drawPill(c,"VS",W/2-38,hy+36,76,34,"rgba(255,255,255,.10)",null,"rgba(255,255,255,.22)","#e2e8f0",18);
  tx(c,String(sc1),W/2-44,hy+128,78,"#2dd496","right",700);
  tx(c,"–",W/2,hy+124,54,"#64748b","center",700);
  tx(c,String(sc2),W/2+44,hy+128,78,"#e8be54","left",700);

  drawCrest(ti2,s2.tm||opp.name,W-72-86,hy+64,"rgba(240,194,75,.64)","rgba(240,194,75,.32)");
  c.font="700 36px "+NUMF;
  tx(c,fit(c,(s2.tm||"TAKIM YOK").toLocaleUpperCase("tr"),255),W-176,hy+68,36,"#f8fafc","right",700);
  tx(c,`${opp.name.toLocaleUpperCase("tr")} · ${s2.n}`,W-176,hy+106,20,"#94a3b8","right",600);
  tx(c,fit(c,duelShortRes(s2.res,s2.st),255),W-176,hy+140,20,"#fbeaa8","right",700);
  tx(c,`${s2.w}G ${s2.d}B ${s2.l}M · ${s2.gf}:${s2.ga}`,W-176,hy+172,18,"#cbd5e1","right",600);

  const by=424,bh=650;
  glassBox(c,44,by,992,bh,24,"rgba(255,255,255,.12)",null);
  const step=sc.rows.length>1?Math.min(68,Math.floor((bh-64)/sc.rows.length)):60;
  sc.rows.forEach((r,idx)=>{
    const ry=by+42+idx*step;
    const b=duelBarCalc(r.v1,r.v2,r.low);
    const w1=!r.neu&&b.w1,w2=!r.neu&&b.w2;
    tx(c,String(r.f1).toLocaleUpperCase("tr"),82,ry,25,w1?"#2dd496":"#cbd5e1","left",700);
    tx(c,r.lbl.toLocaleUpperCase("tr"),W/2,ry,16.5,"#94a3b8","center",700);
    tx(c,String(r.f2).toLocaleUpperCase("tr"),W-82,ry,25,w2?"#e8be54":"#cbd5e1","right",700);
    const bw1=Math.round(b.p1/100*430),bw2=Math.round(b.p2/100*430);
    c.fillStyle="rgba(255,255,255,.07)";
    rr(c,82,ry+17,430,8,4);c.fill();rr(c,W-82-430,ry+17,430,8,4);c.fill();
    if(bw1>0){c.fillStyle=r.neu?"rgba(148,163,184,.52)":(w1?"#2dd496":"rgba(45,212,150,.48)");rr(c,82+(430-bw1),ry+17,bw1,8,4);c.fill()}
    if(bw2>0){c.fillStyle=r.neu?"rgba(148,163,184,.52)":(w2?"#e8be54":"rgba(232,190,84,.48)");rr(c,W-82-430,ry+17,bw2,8,4);c.fill()}
  });

  const my=1098,mh=134;
  glassBox(c,44,my,992,mh,22,"rgba(255,255,255,.12)",null);
  tx(c,"SEZON YILDIZLARI",W/2,my+32,17,"#94a3b8","center",700);
  c.font="700 24px "+NUMF;
  tx(c,s1.mvp?`★ ${fit(c,s1.mvp,380)}`:"—",82,my+84,24,"#3ee6a8","left",700);
  tx(c,s2.mvp?`★ ${fit(c,s2.mvp,380)}`:"—",W-82,my+84,24,"#fbeaa8","right",700);
  tx(c,"FC 27 LİG · SEZON vs. SEZON DÜELLOSU",W/2,H-32,19,"rgba(255,255,255,.45)","center",700);
  return cv;
}

async function duelloKulupCv(x){
  const me=x.me,opp=x.opp,c1=x.c1,c2=x.c2,W=1080,H=1100;
  const ti1=c1.tm&&IX[c1.tm]!=null?IX[c1.tm]:null,ti2=c2.tm&&IX[c2.tm]!=null?IX[c2.tm]:null;
  if(typeof preloadLogos==="function")await preloadLogos([ti1,ti2].filter(i=>i!=null));
  const cv=mkCv(W,H),c=cv.getContext("2d");
  dkBg(c,W,H,"#2dd496","#e8be54",false);

  drawPill(c,"KULÜP vs. KULÜP · 1V1",48,40,280,38,"rgba(240,194,75,.18)","rgba(240,194,75,.06)","rgba(240,194,75,.52)","#fbeaa8",20);
  tx(c,"KULÜP PERFORMANS DÜELLOSU",48,114,48,"#f8fafc","left",700);
  tx(c,today(),W-48,66,24,"#94a3b8","right",600);
  drawPill(c,"FC 27 LİG · DÜELLO",W-48-210,92,210,32,"rgba(45,212,150,.16)",null,"rgba(45,212,150,.45)","#3ee6a8",17);

  let sc1=0,sc2=0;
  const cmp=(a,b,low)=>{if(a==null||b==null||!Number.isFinite(+a)||!Number.isFinite(+b))return;if(low){if(+a<+b)sc1++;else if(+b<+a)sc2++}else{if(+a>+b)sc1++;else if(+b>+a)sc2++}};
  cmp(c1.ch,c2.ch,false);
  const gdpm1=c1.gdpm!=null?c1.gdpm:(c1.m?Math.round(c1.gd/c1.m*100)/100:null),gdpm2=c2.gdpm!=null?c2.gdpm:(c2.m?Math.round(c2.gd/c2.m*100)/100:null);
  if(c1.m>0&&c2.m>0){cmp(c1.wr,c2.wr,false);cmp(c1.ppm,c2.ppm,false);cmp(c1.gpm,c2.gpm,false);cmp(c1.gapm,c2.gapm,true);cmp(gdpm1,gdpm2,false)}

  const hy=174,hh=210;
  glassBox(c,44,hy,992,hh,26,"rgba(240,194,75,.34)","#2dd496");
  const drawCrest=(ti,nm,bx,by,scol,gcol)=>{
    c.save();
    if(ti!=null){
      const cg=c.createLinearGradient(bx,by,bx,by+86);
      cg.addColorStop(0,"rgba(248,250,252,.94)");cg.addColorStop(1,"rgba(203,213,225,.80)");
      c.fillStyle=cg;
    }else c.fillStyle="rgba(255,255,255,.06)";
    c.strokeStyle=scol;c.lineWidth=2.5;c.shadowColor=gcol;c.shadowBlur=18;
    rr(c,bx,by,86,86,20);c.fill();c.stroke();c.restore();
    if(ti!=null&&typeof drawBadge==="function")drawBadge(c,ti,bx+12,by+8,62);
    else tx(c,(nm||"?").slice(0,1).toLocaleUpperCase("tr"),bx+43,by+46,38,"#f8fafc","center",700);
  };
  drawCrest(ti1,c1.tm,72,hy+58,"rgba(46,229,157,.62)","rgba(46,229,157,.32)");
  c.font="700 36px "+NUMF;
  tx(c,fit(c,c1.tm.toLocaleUpperCase("tr"),255),176,hy+72,36,"#f8fafc","left",700);
  tx(c,`${me.name.toLocaleUpperCase("tr")}${c1.g?" · "+c1.g+" GEN":""}`,176,hy+112,20,"#3ee6a8","left",700);
  tx(c,`${c1.n} SEZON · ${c1.m} MAÇ · ${c1.w}G ${c1.d}B ${c1.l}M`,176,hy+146,19,"#94a3b8","left",600);

  drawPill(c,"VS",W/2-38,hy+32,76,34,"rgba(255,255,255,.10)",null,"rgba(255,255,255,.22)","#e2e8f0",18);
  tx(c,String(sc1),W/2-44,hy+124,78,"#2dd496","right",700);
  tx(c,"–",W/2,hy+120,54,"#64748b","center",700);
  tx(c,String(sc2),W/2+44,hy+124,78,"#e8be54","left",700);

  drawCrest(ti2,c2.tm,W-72-86,hy+58,"rgba(240,194,75,.64)","rgba(240,194,75,.32)");
  c.font="700 36px "+NUMF;
  tx(c,fit(c,c2.tm.toLocaleUpperCase("tr"),255),W-176,hy+72,36,"#f8fafc","right",700);
  tx(c,`${opp.name.toLocaleUpperCase("tr")}${c2.g?" · "+c2.g+" GEN":""}`,W-176,hy+112,20,"#fbeaa8","right",700);
  tx(c,`${c2.n} SEZON · ${c2.m} MAÇ · ${c2.w}G ${c2.d}B ${c2.l}M`,W-176,hy+146,19,"#94a3b8","right",600);

  const by=412,bh=584;
  glassBox(c,44,by,992,bh,24,"rgba(255,255,255,.12)",null);
  const pctF=v=>v==null?"—":"%"+Math.round(v),fxF=v=>v==null?"—":fx(v),sgnI=v=>v>0?"+"+v:v<0?"−"+Math.abs(v):"0";
  const rows=[
    ["ŞAMPİYONLUK",c1.ch,c2.ch,String(c1.ch),String(c2.ch),false,false],
    ["GALİBİYET ORANI",c1.wr,c2.wr,pctF(c1.wr),pctF(c2.wr),false,false],
    ["MAÇ BAŞI PUAN",c1.ppm,c2.ppm,fxF(c1.ppm),fxF(c2.ppm),false,false],
    ["ATILAN GOL / MAÇ",c1.gpm,c2.gpm,fxF(c1.gpm),fxF(c2.gpm),false,false],
    ["YENİLEN GOL / MAÇ",c1.gapm,c2.gapm,fxF(c1.gapm),fxF(c2.gapm),true,false],
    ["MAÇ BAŞI AVERAJ",gdpm1,gdpm2,gdpm1!=null?(gdpm1>0?"+"+fx(gdpm1):fx(gdpm1)):"—",gdpm2!=null?(gdpm2>0?"+"+fx(gdpm2):fx(gdpm2)):"—",false,false],
    ["TOPLAM GOL",c1.m?c1.gf:null,c2.m?c2.gf:null,c1.m?`${c1.gf}:${c1.ga}`:"—",c2.m?`${c2.gf}:${c2.ga}`:"—",false,true]
  ];
  rows.forEach(([lbl,v1,v2,f1,f2,low,neu],idx)=>{
    const ry=by+52+idx*74;
    const b=duelBarCalc(v1,v2,low);
    const w1=!neu&&b.w1,w2=!neu&&b.w2;
    tx(c,f1,82,ry,28,w1?"#2dd496":"#cbd5e1","left",700);
    tx(c,lbl,W/2,ry,18,"#94a3b8","center",700);
    tx(c,f2,W-82,ry,28,w2?"#e8be54":"#cbd5e1","right",700);
    const bw1=Math.round(b.p1/100*430),bw2=Math.round(b.p2/100*430);
    c.fillStyle="rgba(255,255,255,.07)";
    rr(c,82,ry+20,430,9,4);c.fill();rr(c,W-82-430,ry+20,430,9,4);c.fill();
    if(bw1>0){c.fillStyle=neu?"rgba(148,163,184,.52)":(w1?"#2dd496":"rgba(45,212,150,.48)");rr(c,82+(430-bw1),ry+20,bw1,9,4);c.fill()}
    if(bw2>0){c.fillStyle=neu?"rgba(148,163,184,.52)":(w2?"#e8be54":"rgba(232,190,84,.48)");rr(c,W-82-430,ry+20,bw2,9,4);c.fill()}
  });
  tx(c,"FC 27 LİG · KULÜP vs. KULÜP DÜELLOSU",W/2,H-32,19,"rgba(255,255,255,.45)","center",700);
  return cv;
}


/* ---------- v23.0: ORTAK KUPA GEÇMİŞİ POSTERİ (2P CO-OP TROPHY HISTORY) ---------- */
async function coopHistCv(x){
  const W=1080,H=1460,cv=mkCv(W,H),c=cv.getContext("2d");
  const hist=Array.isArray(x.hist)?x.hist:[];
  const logosToLoad=[];
  hist.slice(0,8).forEach(s=>{[s.ch,s.hTi,s.gTi].forEach(ti=>{if(ti!=null&&T[ti])logosToLoad.push(ti)})});
  if(typeof preloadLogos==="function"&&logosToLoad.length)await preloadLogos([...new Set(logosToLoad)]);
  dkBg(c,W,H,"#2dd496","#38bdf8",false);

  drawPill(c,"2P ORTAK TURNUVA · KUPA TARİHİ",48,40,368,38,"rgba(240,194,75,.18)","rgba(240,194,75,.06)","rgba(240,194,75,.52)","#fbeaa8",19);
  tx(c,"ORTAK KUPA GEÇMİŞİ",48,114,52,"#f8fafc","left",700);
  tx(c,(x.room||"CO-OP")+" · "+today(),W-48,66,22,"#94a3b8","right",600);
  drawPill(c,(x.cnt||0)+" SEZON",W-48-140,92,140,32,"rgba(45,212,150,.16)",null,"rgba(45,212,150,.45)","#3ee6a8",18);

  const hy=176,hh=228;
  glassBox(c,44,hy,992,hh,26,"rgba(240,194,75,.36)","#f0c24b");
  const hNm=(x.hName||"KURUCU").toLocaleUpperCase("tr"),gNm=(x.gName||"MİSAFİR").toLocaleUpperCase("tr");
  c.font="700 24px "+NUMF;
  tx(c,"★ "+fit(c,hNm,280),96,hy+52,24,"#3ee6a8","left",700);
  tx(c,String(x.hCh||0),96,hy+132,96,"#3ee6a8","left",700);
  tx(c,"ŞAMPİYONLUK 🏆",96,hy+190,18,"#94a3b8","left",700);

  drawPill(c,"DOĞRUDAN H2H",W/2-96,hy+28,192,32,"rgba(255,255,255,.08)",null,"rgba(255,255,255,.18)","#e2e8f0",16);
  const hh2=x.h2h||{hw:0,d:0,gw:0,hgf:0,ggf:0,tot:0};
  tx(c,hh2.tot?`${hh2.hw} – ${hh2.d} – ${hh2.gw}`:"0 – 0 – 0",W/2,hy+106,48,"#f8fafc","center",700);
  tx(c,hh2.tot?`GOL: ${hh2.hgf} – ${hh2.ggf}`:"HENÜZ KARŞILAŞMADI",W/2,hy+150,18,"#cbd5e1","center",600);
  drawPill(c,`YAPAY ZEKÂ: ${x.aiCh||0} 🏆`,W/2-104,hy+174,208,30,"rgba(240,194,75,.14)",null,"rgba(240,194,75,.38)","#fbeaa8",16);

  c.font="700 24px "+NUMF;
  tx(c,"◆ "+fit(c,gNm,280),W-96,hy+52,24,"#7dd3fc","right",700);
  tx(c,String(x.gCh||0),W-96,hy+132,96,"#7dd3fc","right",700);
  tx(c,"ŞAMPİYONLUK 🏆",W-96,hy+190,18,"#94a3b8","right",700);

  const by=426,bh=310;
  glassBox(c,44,by,992,bh,24,"rgba(255,255,255,.12)",null);
  tx(c,"ORTAK KARİYER PERFORMANS KIYASI",82,by+34,20,"#94a3b8","left",700);
  const hS=x.h||{},gS=x.g||{};
  const pctF=v=>v==null?"—":"%"+Math.round(v),fxF=v=>v==null?"—":fx(v);
  const cmpRows=[
    ["GALİBİYET ORANI",hS.wr,gS.wr,pctF(hS.wr),pctF(gS.wr),false],
    ["MAÇ BAŞI PUAN",hS.ppm,gS.ppm,fxF(hS.ppm),fxF(gS.ppm),false],
    ["ATILAN GOL / MAÇ",hS.gpm,gS.gpm,fxF(hS.gpm),fxF(gS.gpm),false],
    ["YENİLEN GOL / MAÇ",hS.gapm,gS.gapm,fxF(hS.gapm),fxF(gS.gapm),true]
  ];
  cmpRows.forEach(([lbl,v1,v2,f1,f2,low],idx)=>{
    const ry=by+80+idx*58;
    const b=duelBarCalc(v1,v2,low);
    tx(c,f1,82,ry,26,b.w1?"#3ee6a8":"#cbd5e1","left",700);
    tx(c,lbl,W/2,ry,17,"#94a3b8","center",700);
    tx(c,f2,W-82,ry,26,b.w2?"#7dd3fc":"#cbd5e1","right",700);
    const bw1=Math.round(b.p1/100*426),bw2=Math.round(b.p2/100*426);
    c.fillStyle="rgba(255,255,255,.07)";rr(c,82,ry+18,426,8,4);c.fill();rr(c,W-82-426,ry+18,426,8,4);c.fill();
    if(bw1>0){c.fillStyle=b.w1?"#2dd496":"rgba(45,212,150,.48)";rr(c,82+(426-bw1),ry+18,bw1,8,4);c.fill()}
    if(bw2>0){c.fillStyle=b.w2?"#38bdf8":"rgba(56,189,248,.48)";rr(c,W-82-426,ry+18,bw2,8,4);c.fill()}
  });

  const ty=758,th=620;
  glassBox(c,44,ty,992,th,24,"rgba(255,255,255,.12)",null);
  tx(c,"SEZON KRONOLOJİSİ · ŞAMPİYONLAR",82,ty+36,20,"#f0c24b","left",700);
  if(x.topS){c.font="700 15px "+NUMF;drawPill(c,fit(c,`GOL KRALI: ${x.topS.n.toLocaleUpperCase("tr")} (${x.topS.g}G)`,288),W-44-340,ty+18,308,32,"rgba(45,212,150,.14)",null,"rgba(45,212,150,.38)","#3ee6a8",15)}
  hist.slice(0,7).forEach((s,idx)=>{
    const ry=ty+74+idx*76;
    c.fillStyle="rgba(255,255,255,.038)";rr(c,72,ry,936,64,14);c.fill();
    c.strokeStyle="rgba(255,255,255,.09)";c.lineWidth=1;rr(c,72,ry,936,64,14);c.stroke();
    c.font="700 20px "+NUMF;
    tx(c,fit(c,(s.name||"Sezon").toLocaleUpperCase("tr"),210),92,ry+24,20,"#f8fafc","left",700);
    tx(c,s.date||"",92,ry+48,14,"#94a3b8","left",600);
    const chN=s.ch!=null&&T[s.ch]?T[s.ch].n:"?";
    const who=s.ch===s.hTi&&s.hSt===7?hNm:s.ch===s.gTi&&s.gSt===7?gNm:"YAPAY ZEKÂ";
    const wCol=s.ch===s.hTi&&s.hSt===7?"#3ee6a8":s.ch===s.gTi&&s.gSt===7?"#7dd3fc":"#fbeaa8";
    if(s.ch!=null&&T[s.ch])drawBadge(c,s.ch,326,ry+14,34);
    c.font="700 22px "+NUMF;
    tx(c,"🏆 "+fit(c,chN.toLocaleUpperCase("tr"),230),370,ry+25,22,"#fff7d6","left",700);
    tx(c,who,370,ry+48,15,wCol,"left",700);
    const hClub=s.hTi!=null&&T[s.hTi]?T[s.hTi].n:"?",gClub=s.gTi!=null&&T[s.gTi]?T[s.gTi].n:"?";
    c.font="700 17px "+NUMF;
    tx(c,"★ "+fit(c,hClub,210),988,ry+23,17,"#3ee6a8","right",700);
    tx(c,"◆ "+fit(c,gClub,210),988,ry+47,17,"#7dd3fc","right",700);
  });

  drawPosterFooter(c,W,H,"FC 27 LİG · 2P ORTAK KUPA GEÇMİŞİ");
  return cv;
}

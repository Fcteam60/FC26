/* FC 27 Grup Ligi — Analitik, xG/xPts, Taktiksel DNA ve Kariyer Motoru (analytics.js · v24.8) */
const RS=["Grup","S64","S32","S16","ÇF","YF","Final","Şamp."];
/* ---------- RAKİPLER ---------- */
function oppData(){const M=nob();
  store.seasons.forEach(x=>(x.mt||[]).forEach(m=>{const k=m.on;if(!k)return;const o=M[k]=M[k]||{n:k,m:[],w:0,d:0,l:0,gf:0,ga:0};o.m.push({m,s:x.name});o[mres(m)]++;o.gf+=m.gf;o.ga+=m.ga}));
  return Object.values(M).sort((a,b)=>b.m.length-a.m.length||b.w-a.w||TR_CMP(a.n,b.n))}
function oppCard(){
  const L=oppData(),tot=L.reduce((a,o)=>a+o.m.length,0);
  if(!L.length)return psetCard("radar","sky","Rakiplerim","Karşılaştığın takımlar",null,emp("Maç sonuçları girildikçe karşılaştığın takımlar burada listelenir."));
  const totW=L.reduce((a,o)=>a+o.w,0),wr=tot?Math.round(totW/tot*100):0;
  const best=L.filter(o=>o.m.length>=2),pk=(f)=>best.slice().sort(f)[0];
  const my=pk((a,b)=>b.w-a.w||a.l-b.l),bad=pk((a,b)=>b.l-a.l||a.w-b.w),el=elimData()[0];
  const kpis=`<div class="rec-kpi" style="margin-top:0">`+
    `<div class="rkpi sky"><b>${L.length}</b><span>Farklı Rakip</span></div>`+
    `<div class="rkpi gold"><b>${tot}</b><span>Toplam Maç</span></div>`+
    `<div class="rkpi emr"><b>%${wr}</b><span>Galibiyet</span></div>`+
    `</div>`;
  const hls=[];
  if(my&&my.w>0)hls.push(`<div class="pop-hl emr"><span>En çok yendiğin</span><b>${esc(my.n)}</b><em>${my.w}G</em></div>`);
  if(bad&&bad.l>0)hls.push(`<div class="pop-hl wr"><span>En çok kaybettiğin</span><b>${esc(bad.n)}</b><em>${bad.l}M</em></div>`);
  if(el&&el[1]>=2)hls.push(`<div class="pop-hl gold"><span>Seni en çok eleyen</span><b>${esc(el[0])}</b><em>${el[1]}×</em></div>`);
  const hlHtml=hls.length?`<div class="pop-hls">${hls.join("")}</div>`:"";
  const sumCard=psetCard("radar","sky","Rakiplerim","Karşılaştığın kulüpler ve rekabet özeti",`${L.length} kulüp`,kpis+hlHtml);
  const showL=st.roall?L:L.slice(0,10);
  const ro=st.ro,rows=showL.map((o,k)=>{
    const ti=T.findIndex(t=>t.n==o.n),open=ro==o.n,ad=o.gf-o.ga,adStr=(ad>0?"+":"")+ad;
    const det=open?`<div class="odt podt">${rivBlk(o)}<div class="podt-ms">${o.m.map(({m,s})=>{const r=mres(m);return `<div class="podt-m"><i class="fd ${r}"></i><span class="n"><b>${esc(s)}</b> · ${esc(m.rd)}${m.lg?" · "+m.lg+". maç":""}</span><span class="podt-sc ${r}">${mscTxt(m)}</span></div>`}).join("")}</div><div class="podt-ft"><span>Atılan <b>${o.gf}</b></span><span>Yenen <b>${o.ga}</b></span><span>Averaj <b>${adStr}</b></span></div></div>`:"";
    const gbm=`<span class="gbm pgbm" aria-label="${o.w} galibiyet, ${o.d} beraberlik, ${o.l} mağlubiyet"><i class="w${o.w?"":" z"}">${o.w}G</i><i class="d${o.d?"":" z"}">${o.d}B</i><i class="l${o.l?"":" z"}">${o.l}M</i></span>`;
    return `<div class="orow pop-r${open?" open":""}"><button class="row ob" data-a="ro" data-v="${esc(o.n)}" aria-expanded="${open}"><span class="rk">${k+1}</span>${ti>=0?`<span class="cc">${fl(T[ti].c)}</span>${badge(ti,24)}`:""}<span class="n pop-nm"><b>${esc(o.n)}</b><small>${o.m.length} maç · ${o.gf}–${o.ga} (${adStr})</small></span>${gbm}<span class="pop-chv" aria-hidden="true">${UICO.chev}</span></button>${det}</div>`}).join("");
  const moreBtn=L.length>10?`<div class="bar" style="margin:10px 0 0"><button class="btn pset-sec" data-a="roall" style="width:100%">${st.roall?"İlk 10 rakibe daralt":"Tüm rakipleri göster ("+L.length+")"}</button></div>`:"";
  const listCard=psetCard("duo","emr","Karşılaşma Geçmişi","Maç dökümü için bir rakibe dokun",st.roall?`${L.length} rakip`:`ilk ${Math.min(10,L.length)}`,rows+moreBtn);
  return sumCard+revCard(L)+listCard}
/* ---------- BEKLENENE GÖRE PERFORMANS / TAKIM GÜCÜ ---------- */
const d1=v=>(v>0?"+":v<0?"−":"")+Math.abs(v).toFixed(1).replace(".",","),dI=v=>(v>0?"+":v<0?"−":"")+Math.abs(v);
function expSt(r,c){r=Math.ceil(r);if(r<=1)return 7;if(r==2)return 6;if(isLg(c))return r==3?5:r<=Math.ceil(c.N/2)?4:0;if(isUcl(c))return r<=4?5:r<=8?4:r<=16?3:r<=24?2:0;if(c.gs&&r>adv(c))return 0;let t=1;while(t<r)t*=2;return RKM[t]!==undefined?RKM[t]:0}
function xpData(mode){return store.seasons.filter(x=>(!mode||mode=="all"||(mode=="lg"?isLg(x.cfg):!isLg(x.cfg)))&&x.res&&x.my!=null&&T[x.my]&&x.cfg&&x.P&&x.P.length>=4&&x.P.includes(x.my)).map(x=>withSn(x,()=>{
  const m=V(T[x.my]),gt=x.P.filter(i=>V(T[i])>m).length,eq=x.P.filter(i=>V(T[i])==m).length,r=1+gt+(eq-1)/2,N=x.P.length;
  const rk=resRanks(x.cfg),pos=v=>{let i=-1;rk.forEach((q,j)=>{if(q<=v)i=j});return i},ex=expSt(r,x.cfg),ac=x.res.st;
  return{x,r:Math.ceil(r),N,g:T[x.my].g,p:N>1?(Math.ceil(r)-1)/(N-1):0,ex,ac,d:pos(ac)-pos(ex)}}))}
const dc=d=>d>0?"p":d<0?"n":"z";
function xpCard(mode){const D=xpData(mode);
  if(!D.length)return psetCard("radar","sky","Beklenene Göre Performans","Güç sırasına göre turnuva verimi",null,emp("Seçili kategoride takım ve kura seçilmiş, sonucu girilmiş sezonlar burada beklentiyle karşılaştırılır."));
  const tot=D.reduce((a,o)=>a+o.d,0),up=D.filter(o=>o.d>0).length,dn=D.filter(o=>o.d<0).length;
  const tone=tot>0?"emr":tot<0?"org":"sky";
  const kpis=`<div class="pset-kpi">`+
    `<div class="pk2 ${tone}"><b>${dI(tot)}</b><span>Toplam Fark</span></div>`+
    `<div class="pk2 emr${up?"":" z"}"><b>${up}</b><span>Beklenti Üstü</span></div>`+
    `<div class="pk2 org${dn?"":" z"}"><b>${dn}</b><span>Beklenti Altı</span></div>`+
    `</div>`;
  const rows=D.slice().reverse().slice(0,10).map(o=>{
    const lg=isLg(o.x.cfg),uLbl=lg?"kademe":"tur",c=dc(o.d);
    const expT=stTxt(o.x.cfg,o.ex).trim(),actT=rlb(o.x.res,o.x.cfg,o.x.grk).split(" · ")[0].trim();
    return `<div class="pxp-r ${c}">`+
      `<div class="pxp-top">`+
        `${badge(o.x.my,28)}`+
        `<div class="pxp-m"><b>${esc(o.x.name)} · ${esc(T[o.x.my].n)}</b><small>${o.g} GEN · Güç sırası ${o.r}/${o.N}</small></div>`+
        `<span class="pxp-d ${c}">${o.d?dI(o.d)+" "+uLbl:"Beklenen"}</span>`+
      `</div>`+
      `<div class="pxp-flow">`+
        `<div class="pxp-box"><span>Beklenen</span><b>${esc(expT)}</b></div>`+
        `<span class="pxp-arr" aria-hidden="true">→</span>`+
        `<div class="pxp-box act"><span>Ulaşılan</span><b>${esc(actT)}</b></div>`+
      `</div>`+
    `</div>`;
  }).join("");
  return psetCard("radar",tone,"Beklenene Göre Performans","Güç sırasına göre turnuva verimi",`${D.length} sezon`,
    kpis+`<div class="pxp-list">${rows}</div>`+
    `<div class="note" style="margin:9px 0 0">Beklenen derece, takımının o sezonki rakipler arasındaki güç sırasından hesaplanır.</div>`
  )}
function powerCard(mode){const D=xpData(mode);if(D.length<2)return "";
  const gs=D.map(o=>o.g),g0=Math.min(...gs)-1,g1=Math.max(...gs)+1,gw=Math.max(4,g1-g0),X=g=>36+(g-g0)/gw*252,Y=v=>140-v/7*128,seen=nob();
  const LRS={0:"Alt",4:"Orta",5:"3.",6:"2.",7:"Şamp."},gKeys=mode=="lg"?[0,4,5,6,7]:[0,3,4,5,6,7],grid=gKeys.map((v,idx)=>`<line class="gl" x1="30" x2="294" y1="${Y(v)}" y2="${Y(v)}" ${idx?'stroke-dasharray="3 3" opacity=".75"':""}/><text x="2" y="${Y(v)+3}">${mode=="lg"?(LRS[v]||RS[v]):RS[v]}</text>`).join("");
  const pts=D.map(o=>{const k=o.g+"_"+o.ac,j=seen[k]=(seen[k]||0)+1,px=Math.min(290,Math.max(34,X(o.g)+(j-1)*9));return `<circle class="${dc(o.d)}" cx="${px.toFixed(1)}" cy="${Y(o.ac).toFixed(1)}" r="5.5" style="stroke:var(--card)" stroke-width="1.5"><title>${esc(o.x.name)} · ${esc(T[o.x.my].n)} · güç ${o.g} · ${esc(stTxt(o.x.cfg,o.ac).trim())}</title></circle>`}).join("");
  const xt=[g0+1,Math.round((g0+g1)/2),g1-1].map(g=>`<text x="${X(g).toFixed(1)}" y="158" text-anchor="middle">${g}</text>`).join("");
  const sc=`<div class="svgbox"><svg class="scp" viewBox="0 0 300 164" style="width:100%" role="img" aria-label="Takım gücüne göre ulaşılan derece">${grid}${pts}${xt}</svg></div><div class="note" style="margin:6px 0 8px">Yatay: takımın genel gücü. Dikey: ulaştığın derece. Yeşil beklentinin üstü, kırmızı altı, gri beklenen.</div>`;
  const grp=[["Güçlü takım","ilk üçte biri",o=>o.p<1/3],["Orta takım","orta üçte biri",o=>o.p>=1/3&&o.p<2/3],["Zayıf takım","son üçte biri",o=>o.p>=2/3]];
  const av=L=>L.reduce((a,o)=>a+o.d,0)/L.length,rs=grp.map(([t,sb,f])=>{const L=D.filter(f);return L.length?`<div class="row"><span class="n">${t}<span class="lb"> · ${sb}</span></span><span class="lb">${L.length} sezon · güç ${(L.reduce((a,o)=>a+o.g,0)/L.length).toFixed(0)} · ${L.filter(o=>o.ac==7).length} şamp.</span><b>${d1(av(L))}</b></div>`:""}).join("");
  const st_=D.filter(grp[0][2]),wk=D.filter(grp[2][2]);let tip="Daha net bir yorum için güçlü ve zayıf takımlarla en az 2’şer sezon gerekir.";
  if(st_.length>=2&&wk.length>=2){const df=av(wk)-av(st_);tip=df>=.5?"Zayıf takımla daha iyi oynuyorsun: beklentinin ortalama "+d1(av(wk))+" kademe üstündesin.":df<=-.5?"Güçlü takımla daha iyi oynuyorsun, zayıf takımda beklentinin altında kalıyorsun.":"Takım gücü ne olursa olsun beklentiyle uyumlu oynuyorsun."}
  return psetCard("radar","pur","Takım Gücü ve Sonuç","Takım gücüne göre sezon başarısı",`${D.length} sezon`,sc+rs+`<div class="note" style="margin:8px 0 0"><b>${tip}</b> Sağdaki değer, sezon başına ortalama fark.</div>`)}
/* ---------- SEZON YOLU / FİLTRE / GALERİ ---------- */
function pathSvg(x){if(!x.res||!x.cfg)return "";const rk=resRanks(x.cfg),n=rk.length,W=n*40,sv=x.res.st,ch=sv==7,cx=i=>20+i*40,lg=isLg(x.cfg),ucl=isUcl(x.cfg),LRS={0:"Alt",4:"Orta",5:"3.",6:"2.",7:"Şamp."};
  let li=-1;rk.forEach((r,i)=>{if(r<=sv)li=i});
  const cl=ch?" ch":"",ln=rk.slice(1).map((r,j)=>`<line class="${j<li?"ln"+cl:"lm"}" x1="${cx(j)}" x2="${cx(j+1)}" y1="14" y2="14"/>`).join("");
  const nd=rk.map((r,i)=>`<circle class="${i<li?"dn"+cl:i==li?"dn "+(ch?"ch":"el"):"em"}" cx="${cx(i)}" cy="14" r="5.5"/><text x="${cx(i)}" y="31" text-anchor="middle">${lg?(LRS[r]||RS[r]):ucl?(RSU[r]||RS[r]):RS[r]}</text>`).join("");
  return `<svg class="spt" viewBox="0 0 ${W} 36" style="max-width:${n*56}px" role="img" aria-label="Sezon yolu: ${esc(stTxt(x.cfg,sv).trim())}">${ln}${nd}</svg>`}
const SFR=[["all","Tümü"],["champ","Şampiyonluk"],["fin","Finalist / İlk 2"],["semi","Yarı final+ / İlk 3"],["grp","Grupta elendi"],["live","Devam eden"]];
const SFM=[["all","Tümü"],["cup","Kupa"],["lg","Lig"]];
function seasonsView(ss,card){const m=st.sfm||"all",r=st.sfr||"all",t=st.sft||"",c=st.sfc||"",v=st.sv||"l";
  const my=ss.filter(x=>x.my!=null&&T[x.my]),tm=[...new Set(my.map(x=>x.my))].sort((a,b)=>TR_CMP(T[a].n,T[b].n)),cs=[...new Set(my.map(x=>String(T[x.my].c)))].sort((a,b)=>TR_CMP(CN[a][0],CN[b][0]));
  const ok=x=>{const q=x.res?x.res.st:-1,lg=isLg(x.cfg);
    if(m=="cup"&&lg)return false;if(m=="lg"&&!lg)return false;
    if(r=="champ"&&q!=7)return false;if(r=="fin"&&q<6)return false;if(r=="semi"&&q<5)return false;if(r=="grp"&&!(x.res&&q==0&&!lg&&x.cfg&&x.cfg.gs))return false;if(r=="live"&&x.res)return false;
    if(t!==""&&x.my!=+t)return false;if(c!==""&&!(x.my!=null&&T[x.my]&&String(T[x.my].c)==c))return false;return true};
  const fs=ss.filter(ok),advCnt=(r!="all"?1:0)+(t!==""?1:0)+(c!==""?1:0),act=m!="all"||advCnt>0;
  const gal=x=>{const tm2=x.my!=null?T[x.my]:null,ch=x.res&&x.res.st==7,g=x.ts||{},lg=isLg(x.cfg),cb=tm2?bspec(x.my):null;
    const sty=cb&&!ch?` style="--sc1:${cb.c1};--sc2:${cb.c2}"`:"";
    return `<button class="gcd pgcd${ch?" gold":""}"${sty} data-a="karne" data-id="${x.id}" aria-label="${esc(x.name)} karnesini aç"><div class="gt">${tm2?badge(x.my,32):""}<div><b>${tm2?esc(tm2.n):"Takım yok"}</b><span class="gs">${esc(x.name)} · ${lg?"Lig":"Kupa"}</span></div></div><div class="gr">${x.res?esc(rlb(x.res,x.cfg,x.grk).split(" · ")[0].trim()):"Devam ediyor"}</div>${pathSvg(x)}${(g.w||g.d||g.l)?`<div class="gs">${g.w||0}G ${g.d||0}B ${g.l||0}M · ${g.gf||0}/${g.ga||0} gol</div>`:""}</button>`};
  const opt=(val,lab,sel)=>`<option value="${val}" ${sel?"selected":""}>${esc(lab)}</option>`;
  const fOpen=!!st.sfopen;
  const modeBar=`<div class="stabs seg3 sf-mode" role="tablist" aria-label="Turnuva türü">${SFM.map(([k,l])=>`<button class="chip ${m==k?"on":""}" data-a="sfm" data-v="${k}">${l}</button>`).join("")}</div>`;
  const toolBar=`<div class="sf-tools"><div class="sf-tl"><span class="xfpill">${fs.length} / ${ss.length} sezon</span><button class="sf-fbtn${fOpen||advCnt?" on":""}" data-a="sfopen" aria-expanded="${fOpen}">${UICO.sliders}<span>Filtrele${advCnt?` (${advCnt})`:""}</span></button>${act?`<button class="sf-clr" data-a="sfx">Temizle</button>`:""}</div><div class="stabs seg2 sf-v" role="tablist" aria-label="Görünüm"><button class="chip ${v=="l"?"on":""}" data-a="sv" data-v="l">Liste</button><button class="chip ${v=="g"?"on":""}" data-a="sv" data-v="g">Galeri</button></div></div>`;
  const drawer=fOpen?`<div class="sf-drw"><div class="pset-lbl">Sonuç Durumu</div><div class="sf-chips">${SFR.map(([k,l])=>`<button class="chip ${r==k?"on":""}" data-a="sfr" data-v="${k}">${l}</button>`).join("")}</div><div class="sf-sels"><select id="sft" class="sel" aria-label="Takıma göre filtre">${opt("","Tüm takımlar",t==="")}${tm.map(i=>opt(i,T[i].n,t!==""&&+t==i)).join("")}</select><select id="sfc" class="sel" aria-label="Ülkeye göre filtre">${opt("","Tüm ülkeler",c==="")}${cs.map(k=>opt(k,CN[k][0],c==k)).join("")}</select></div></div>`:"";
  const head=`<div class="card pglass sf-box">${modeBar}${toolBar}${drawer}</div>`;
  const lim=12,showFs=(st.sall||act||fs.length<=lim)?fs:fs.slice(0,lim);
  const moreS=fs.length>lim&&!act?`<div class="bar" style="margin:10px 0 0"><button class="btn pset-sec" data-a="sall" style="width:100%">${st.sall?"Daha az sezon göster (ilk "+lim+")":"Tüm sezonları göster ("+fs.length+")"}</button></div>`:"";
  const body=!fs.length?`<div class="card pglass">${emp("Bu filtreye uyan sezon yok.")}</div>`:v=="g"?`<div class="sgl">${showFs.map(gal).join("")}</div>${moreS}<div class="note">Karneyi açmak için karta dokun. Düzenlemek veya silmek için Liste görünümünü kullan.</div>`:showFs.map(card).join("")+moreS;
  return head+body}
/* ---------- MAÇ İSTATİSTİKLERİ ---------- */
const allM=()=>store.seasons.flatMap(x=>(x.mt||[]).map(m=>({m,x})));
const pct=(a,b)=>b?Math.round(a/b*100)+"%":"—",f2=(a,b)=>b?(a/b).toFixed(2).replace(".",","):"—";
const tally=L=>{const o={n:L.length,w:0,d:0,l:0,gf:0,ga:0,cs:0};L.forEach(m=>{o[mres(m)]++;o.gf+=m.gf;o.ga+=m.ga;if(!m.ga)o.cs++});return o};
const gbmT=o=>`${o.w}G ${o.d}B ${o.l}M`;
function h2h(i){if(i==null||!T[i])return null;const L=allM().filter(e=>e.m.on==T[i].n).map(e=>e.m);return L.length?{o:tally(L),last:L[L.length-1]}:null}
const h2hLine=i=>{const h=h2h(i);if(!h)return `<div class="note" style="margin:0 0 6px">Bu rakiple ilk karşılaşman.</div>`;
  return `<div class="note" style="margin:0 0 6px">${esc(T[i].n)}’e karşı <b>${gbmT(h.o)}</b>, son maç ${h.last.gf}-${h.last.ga}${h.o.l?` <span style="font-weight:700;color:var(--wr)">· rövanş</span>`:""}</div>`};
function elimData(){const M=nob();store.seasons.forEach(x=>{if(!x.res||x.my==null||x.res.st<1||x.res.st>=7)return;
  const ko=(x.mt||[]).filter(m=>m.rd!="Grup"),l=ko[ko.length-1];if(!l||!l.on)return;M[l.on]=(M[l.on]||0)+1});
  return Object.entries(M).sort((a,b)=>b[1]-a[1])}
function streaks(L){let w=0,u=0,nl=0,bw=0,bu=0;(L||allM().map(e=>e.m)).forEach(m=>{const r=mres(m);w=r=="w"?w+1:0;u=r=="l"?0:u+1;nl=r=="w"?0:nl+1;bw=Math.max(bw,w);bu=Math.max(bu,u)});return{w,u,nl,bw,bu}}
const stkPill=()=>{const k=streaks();let t="",cls="";if(k.u>=3){t=k.u+" maçtır yenilmez"+(k.w==k.u?" ("+k.w+"G)":"");cls="w"}else if(k.w>=2){t=k.w+" maç üst üste galibiyet";cls="w"}else if(k.nl>=3){t=k.nl+" maçtır galibiyet yok";cls="l"}return t?`<div class="stk pstk ${cls}">${cls=="w"?UICO.flame:UICO.bolt}<span>${t}</span></div>`:""};
const sbar=o=>`<div class="msb" role="img" aria-label="${gbmT(o)}">${["w","d","l"].map(k=>o[k]?`<i class="${k}" style="flex:${o[k]}"></i>`:"").join("")}</div>`;
const tile=(v,l,sub)=>`<div><b>${v}</b><span>${l}</span>${sub?`<small>${sub}</small>`:""}</div>`;
function formCard(ML){const L=ML.slice(-10),n=L.length;if(n<2)return "";
  const pt=m=>({w:3,d:1,l:0})[mres(m)],all=ML.map(pt),base=ML.length-n;
  const ma=L.map((m,i)=>{const k=base+i,a=all.slice(Math.max(0,k-2),k+1);return a.reduce((x,y)=>x+y,0)/a.length});
  const cx=i=>16+(i+.5)*280/n,y=v=>100-v/3*86;
  const gr=[0,1,2,3].map(v=>`<line x1="16" x2="296" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--bd)" ${v?'stroke-dasharray="3 3" opacity=".75"':""}/><text x="2" y="${y(v)+3}" font-size="9" style="fill:var(--mut)">${v}</text>`).join("");
  const ln=ma.map((v,i)=>(i?"L":"M")+cx(i).toFixed(1)+" "+y(v).toFixed(1)).join("");
  const area=`${ln} L${cx(n-1).toFixed(1)} 100 L${cx(0).toFixed(1)} 100 Z`;
  const defs=`<defs><linearGradient id="fmArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--ac)" stop-opacity=".28"/><stop offset="100%" stop-color="var(--ac)" stop-opacity="0"/></linearGradient></defs>`;
  const col=r=>r=="w"?"var(--ac)":r=="l"?"var(--wr)":"var(--mut)";
  const dots=L.map((m,i)=>`<circle cx="${cx(i).toFixed(1)}" cy="${y(ma[i]).toFixed(1)}" r="4.5" style="fill:${col(mres(m))};stroke:var(--card)" stroke-width="2"><title>${esc(m.on)} ${m.gf}-${m.ga}</title></circle>`).join("");
  const LT={w:"G",d:"B",l:"M"},tot=L.reduce((a,m)=>a+pt(m),0);
  let tr="";if(n>=6){const r=ma.slice(-3).reduce((a,b)=>a+b,0)/3,e=L.slice(0,-3).reduce((a,m)=>a+pt(m),0)/(n-3),d=r-e;tr=d>=.5?" Form yükselişte.":d<=-.5?" Form düşüşte.":""}
  return psetCard("up","emr","Form Eğrisi",`Son ${n} maç hareketli puan ortalaması`,`${f2(tot,n)} p/M`,
    `${tr?`<div class="note" style="margin:0 0 8px"><b>${tr.trim()}</b></div>`:""}`+
    `<div class="svgbox"><svg viewBox="0 0 300 108" style="width:100%" role="img" aria-label="Hareketli ortalama puan">${defs}<g>${gr}</g><path d="${area}" fill="url(#fmArea)"/><path d="${ln}" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="stroke:var(--ac)"/>${dots}</svg></div>`+
    `<div class="mfr" style="margin-top:8px">${L.map(m=>`<div class="mfc"><i class="${mres(m)}">${LT[mres(m)]}</i><span>${m.gf}-${m.ga}</span></div>`).join("")}</div>`+
    `<div class="note" style="margin:8px 0 0">Çizgi: son 3 maçın ortalama puanı (G=3, B=1, M=0).</div>`
  )}
function matchTab(){const A0=allM(),ds=new Set(A0.map(dOf)),fd=ds.has(st.sfd)?st.sfd:"",A=fd?A0.filter(e=>dOf(e)==fd):A0,ML=A.map(e=>e.m),fb=oyFilter(A0,fd);
  if(!ML.length)return fb+psetCard("chart","sky","Maç İstatistikleri","Kariyer maç ortalamaları",null,emp("Maç sonuçları girildikçe ortalamalar, form ve skorlar burada görünür."));
  const curS=store.seasons.find(x=>x.id==store.cur),C=tally(ML),S=tally((curS&&curS.mt)||[]),ad=C.gf-C.ga;
  const c1=psetCard("shield","emr","Genel Görünüm","Kariyer maç özeti",`${C.n} maç`,`<div class="mtl">${tile(C.n,"maç")}${tile(pct(C.w,C.n),"galibiyet")}${tile((ad>0?"+":"")+ad,"averaj",C.gf+" - "+C.ga)}</div>`+sbar(C)+`<div class="mgl"><span class="w">${C.w} G</span><span class="d">${C.d} B</span><span class="l">${C.l} M</span></div>`);
  const sv=f=>S.n?"bu sezon "+f(S):"";
  const c3=psetCard("chart","sky","Maç Başına","Kariyer ve bu sezon ortalamaları",`${C.n} maç`,`<div class="mtl c2" style="margin-bottom:0">${tile(f2(C.gf,C.n),"atılan gol",sv(o=>f2(o.gf,o.n)))}${tile(f2(C.ga,C.n),"yenen gol",sv(o=>f2(o.ga,o.n)))}${tile(pct(C.cs,C.n),"temiz kasa",sv(o=>pct(o.cs,o.n)))}${tile(f2(C.w*3+C.d,C.n),"puan",sv(o=>f2(o.w*3+o.d,o.n)))}</div>`);
  const grp=[["Grup maçları",m=>m.rd=="Grup"],["Eleme maçları",m=>m.rd!="Grup"&&m.rd!=RN[2]],["Final",m=>m.rd==RN[2]]];
  const st1=grp.map(([t,f])=>{const o=tally(ML.filter(f));return o.n?`<div class="mstg"><div class="mstt"><b>${t}</b><span class="lb">${o.n} maç · ${gbmT(o)} · %${Math.round(o.w/o.n*100)}</span></div>${sbar(o)}</div>`:""}).join("");
  const go=tally(ML.filter(grp[0][1])),ko=tally(ML.filter(grp[1][1]));
  const tip=go.n>=3&&ko.n>=3?(go.w/go.n-ko.w/ko.n>=.15?"Grupta daha iyisin, eleme maçlarında düşüyorsun.":ko.w/ko.n-go.w/go.n>=.15?"Eleme maçlarında grup maçlarından daha iyisin.":""):"";
  const c4=psetCard("trophy","gold","Aşamaya Göre Başarı","Grup, eleme ve final verimi",null,st1+(tip?`<div class="note" style="margin:8px 0 0">${tip}</div>`:""));
  const k=streaks(ML),c5=psetCard("flame","emr","Seriler","Aktif ve rekor seriler",null,`<div class="mtl c2" style="margin-bottom:0">${tile(k.u,"maçtır yenilmiyorsun","en uzun "+k.bu)}${tile(k.w,"galibiyet serisi","en uzun "+k.bw)}</div>`);
  const SC=nob();ML.forEach(m=>{const q=m.gf+"–"+m.ga;SC[q]=SC[q]||{n:0,r:mres(m)};SC[q].n++});
  const sl=Object.entries(SC).sort((a,b)=>b[1].n-a[1].n).slice(0,6),mx=sl[0][1].n;
  const c6=psetCard("list","sky","En Sık Biten Skorlar","Maç sonuç dağılımı",`ilk ${sl.length}`,sl.map(([q,o])=>`<div class="row"><span class="n" style="flex:0 0 48px"><b>${q}</b></span><div class="bk mbr"><i class="${o.r}" style="width:${o.n/mx*100}%"></i></div><b>${o.n}</b></div>`).join("")+`<div class="note" style="margin:8px 0 0">Yeşil: galibiyet, gri: beraberlik, kırmızı: mağlubiyet.</div>`);
  const CO=nob();ML.forEach(m=>{const ti=T.findIndex(t=>t.n==m.on);if(ti<0)return;(CO[T[ti].c]=CO[T[ti].c]||[]).push(m)});
  const cl=Object.entries(CO).map(([c,L])=>({c:c,o:tally(L)})).sort((a,b)=>b.o.n-a.o.n),cm=cl[0]?cl[0].o.n:1;
  const bst=cl.filter(x=>x.o.n>=3).sort((a,b)=>b.o.w/b.o.n-a.o.w/a.o.n)[0];
  const c7=cl.length?psetCard("compass","emr","Rakip Ülkeler","Ülke bazlı karşılaşma geçmişi",`${cl.length} ülke`,(bst?`<div class="note" style="margin:0 0 8px">En başarılı olduğun ülke: <b>${CN[bst.c][0]}</b> (%${Math.round(bst.o.w/bst.o.n*100)} galibiyet)</div>`:"")+cl.slice(0,8).map(x=>`<div class="row"><span class="n" style="flex:0 0 116px">${fl(x.c)} ${CN[x.c][0]}</span><div class="bk"><i style="width:${x.o.n/cm*100}%"></i></div><b>${x.o.n}</b><span class="lb" style="min-width:38px;text-align:right">%${Math.round(x.o.w/x.o.n*100)}</span></div>`).join("")+`<div class="note" style="margin:8px 0 0">Sağdaki: o ülkeye karşı galibiyet oranı.</div>`):"";
  return fb+tacticalDnaCard(null,{career:true,matches:ML,fd:fd})+xgSummaryCard(ML)+c1+formCard(ML)+c3+oppTierCard(A)+marginCard(ML)+c4+c5+twoLegCard(A)+etPkCard(ML)+c6+surCard(ML)+oyDiff(A0)+c7}

/* ---------- v18.43 (Paket 3): Derin Analitik Motoru (Rakip Katmanı, Yakın Maç/Clutch, Rövanş, Oyuncu Profili) ---------- */
function oppTierCard(A){
  const list=(A||[]).map(e=>{
    const m=e.m||e,x=e.x||cur();
    const oi=m.opp!=null&&T[m.opp]?m.opp:ixOf(m.on);
    if(oi==null||!T[oi])return null;
    const og=RT(x,oi).g;
    return{m,og};
  }).filter(Boolean);
  if(list.length<2)return "";
  const tiers=[
    {k:"elit",lbl:"85+ Elit",sub:"Dünya devleri",cls:"gold",fn:g=>g>=85},
    {k:"strong",lbl:"80–84 Güçlü",sub:"Üst düzey rakipler",cls:"sky",fn:g=>g>=80&&g<=84},
    {k:"mid",lbl:"75–79 Orta",sub:"Dengeli rakipler",cls:"emr",fn:g=>g>=75&&g<=79},
    {k:"weak",lbl:"<75 Zayıf",sub:"Alt seviye rakipler",cls:"mut",fn:g=>g<75}
  ];
  const rowsData=tiers.map(t=>{
    const ms=list.filter(e=>t.fn(e.og)).map(e=>e.m);
    if(!ms.length)return null;
    const o=tally(ms),wr=Math.round(o.w/o.n*100);
    const xm=ms.filter(m=>m.stats&&m.stats.myXg!=null&&m.stats.oppXg!=null);
    const xgd=xm.length?xm.reduce((a,m)=>a+(+m.stats.myXg-+m.stats.oppXg),0)/xm.length:null;
    return Object.assign({o,wr,xgd},t);
  }).filter(Boolean);
  if(!rowsData.length)return "";
  const rowsHtml=rowsData.map(r=>`<div class="tier-r ${r.cls}">`+
    `<div class="tier-top"><span class="tier-tag">${r.lbl}</span><span class="tier-cnt">${r.o.n} maç · ${gbmT(r.o)}</span><b class="tier-wr">%${r.wr}</b></div>`+
    `${sbar(r.o)}`+
    `<div class="tier-sub"><span>Gol/M: <b>${f2(r.o.gf,r.o.n)}</b> − <b>${f2(r.o.ga,r.o.n)}</b></span>${r.xgd!=null?`<span>xG Farkı: <b class="${r.xgd>=0?"gd":"wr"}">${xgS2(r.xgd)}</b></span>`:`<span>${r.sub}</span>`}</div>`+
  `</div>`).join("");
  const el=rowsData.find(r=>r.k==="elit"),wk=rowsData.find(r=>r.k==="weak")||rowsData.find(r=>r.k==="mid");
  let tip="";
  if(el&&el.o.n>=2&&el.wr>=55)tip="Dev Avcısı: 85+ elit rakiplere karşı bile yüksek galibiyet yüzdesi yakalıyorsun.";
  else if(el&&wk&&el.o.n>=2&&wk.o.n>=2&&el.wr>wk.wr+10)tip="Büyük maçlara daha iyi odaklanıyorsun; alt seviye rakiplere karşı sürpriz puan kayıplarına dikkat.";
  else if(el&&el.o.n>=2&&el.wr<=30)tip="85+ elit rakiplere karşı zorlanıyorsun; büyük maçlarda savunma disiplinini artırmak fark yaratabilir.";
  return psetCard("radar","gold","Rakip Güç Katmanı","Rakibin GEN seviyesine göre performansın",`${list.length} maç`,
    `<div class="tier-list">${rowsHtml}</div>${tip?`<div class="note" style="margin:9px 0 0"><b>${tip}</b></div>`:""}`
  );
}

function marginCard(ML){
  const L=(ML||[]).filter(Boolean);
  if(L.length<2)return "";
  let cW=0,cL=0,bigW=0,bigL=0,drw=0;
  L.forEach(m=>{
    const diff=m.gf-m.ga,r=mres(m),isPk=m.gf===m.ga&&m.pf!=null&&m.pa!=null&&m.pf!==m.pa;
    if(Math.abs(diff)===1||isPk){if(r==="w")cW++;else if(r==="l")cL++}
    else if(diff>=2)bigW++;
    else if(diff<=-2)bigL++;
    else drw++;
  });
  const cTot=cW+cL,cPct=cTot?Math.round(cW/cTot*100):null;
  const kpis=`<div class="pset-kpi">`+
    `<div class="pk2 ${cPct!=null?(cPct>=55?"emr":cPct<45?"org":"gold"):"sky"}"><b>${cPct!=null?"%"+cPct:"—"}</b><span>Yakın Maç (1F/P)</span></div>`+
    `<div class="pk2 emr"><b>${bigW}</b><span>Rahat Galibiyet (2+)</span></div>`+
    `<div class="pk2 org"><b>${bigL}</b><span>Ağır Yenilgi (2+)</span></div>`+
    `</div>`;
  const segs=[[cW,"#12b886","1F/P Galibiyet"],[bigW,"#3ee6a8","2+ Fark Galibiyet"],[drw,"#64748b","Beraberlik"],[cL,"#f97316","1F/P Mağlubiyet"],[bigL,"#e03131","2+ Fark Mağlubiyet"]];
  const bar=`<div class="msb" role="img" aria-label="Skor farkı dağılımı">${segs.map(([v,col])=>v?`<i style="flex:${v};background:${col}"></i>`:"").join("")}</div>`;
  const det=`<div class="mrg-det">`+
    `<span>Yakın maçlar (1 gol farkı / penaltı): <b>${cW}G – ${cL}M</b></span>`+
    (drw?`<span>Beraberlik: <b>${drw}</b></span>`:"")+
    `</div>`;
  let tip="";
  if(cTot>=3){
    if(cPct>=65)tip="Soğukkanlılık (Clutch) seviyen çok yüksek: başa baş giden maçları koparmayı biliyorsun.";
    else if(cPct<=35)tip="Tek farklı yakın maçlarda puan kayıpları yaşıyorsun; son dakikalarda oyunu soğutmak işine yarayabilir.";
    else tip="Yakın maçlarda dengeli bir karnen var ("+cW+"G "+cL+"M).";
  }
  return psetCard("flame","emr","Soğukkanlılık & Skor Farkı","Tek farklı maçlarda baskı yönetimi",cTot?`${cW}G-${cL}M`:"—",
    kpis+bar+det+(tip?`<div class="note" style="margin:8px 0 0">${tip}</div>`:"")
  );
}

function twoLegCard(A){
  const map=nob();
  (A||[]).forEach(e=>{
    const m=e.m||e,x=e.x||cur();
    if(!m||m.rd==="Grup"||!(m.lg===1||m.lg===2))return;
    const k=`${x.id}|${m.rd}|${m.on}`;
    (map[k]=map[k]||{sName:x.name,rd:m.rd,on:m.on,ms:[]}).ms.push(m);
  });
  const ties=Object.values(map).filter(t=>{
    const m1=t.ms.find(m=>m.lg===1),m2=t.ms.find(m=>m.lg===2);
    return !!(m1&&m2);
  }).map(t=>{
    const m1=t.ms.find(m=>m.lg===1),m2=t.ms.find(m=>m.lg===2);
    const af=(+m1.gf||0)+(+m2.gf||0),aa=(+m1.ga||0)+(+m2.ga||0);
    const adv=af>aa||(af===aa&&m2.pf!=null&&m2.pa!=null&&m2.pf>m2.pa);
    const comeback=m1.gf<m1.ga&&adv,blown=m1.gf>m1.ga&&!adv;
    return Object.assign({m1,m2,af,aa,adv,comeback,blown},t);
  });
  if(!ties.length)return "";
  const advCnt=ties.filter(t=>t.adv).length,cbCnt=ties.filter(t=>t.comeback).length,blCnt=ties.filter(t=>t.blown).length;
  const kpis=`<div class="pset-kpi">`+
    `<div class="pk2 emr"><b>%${Math.round(advCnt/ties.length*100)}</b><span>Tur Geçme (${advCnt}/${ties.length})</span></div>`+
    `<div class="pk2 gold"><b>${cbCnt}</b><span>Geri Dönüş</span></div>`+
    `<div class="pk2 org"><b>${blCnt}</b><span>Elden Kaçan</span></div>`+
    `</div>`;
  const listHtml=ties.slice(-6).reverse().map(t=>{
    const tag=t.comeback?`<span class="xfpill gold">Geri Dönüş</span>`:t.blown?`<span class="xfpill dgr">Elden Kaçtı</span>`:`<span class="xfpill ${t.adv?"emr":"dgr"}">${t.adv?"Turu Geçtin":"Elendin"}</span>`;
    return `<div class="podt-m"><span class="n"><b>${esc(t.on)}</b> · ${esc(t.sName)} ${esc(t.rd)}<br><small>1.M ${t.m1.gf}–${t.m1.ga} · 2.M ${mscTxt(t.m2)} (Top. ${t.af}–${t.aa})</small></span>${tag}</div>`;
  }).join("");
  return psetCard("bolt","sky","Çift Maçlı Rövanş Karnesi","2 ayaklı eleme turları ve geri dönüşler",`${ties.length} seri`,
    kpis+`<div class="podt-ms">${listHtml}</div>`
  );
}

function plProfileData(name){
  const k=nz(name);if(!k)return null;
  const db=sqFindAny(name);
  let disp=db?db.p.n:String(name).trim(),totG=0,totA=0,totM=0,totMom=0,clG=0,clA=0,clMom=0;
  const seasons=[],oppMap=nob(),partMap=nob();
  const ensPart=(pn)=>{const pk=nz(pn);if(!pk||pk===k||isKK(pn))return null;return partMap[pk]=partMap[pk]||{n:pn,from:0,to:0}};
  store.seasons.forEach(x=>{
    const p=(x.pl||[]).find(q=>q&&nz(q.n)===k);
    if(p){
      if(!db&&p.n)disp=p.n;
      const g=+p.g||0,a=+p.a||0,m=+p.m||0,mom=+p.mom||0;
      totG+=g;totA+=a;totM+=m;totMom+=mom;
      if(g||a||mom||m)seasons.push({sName:x.name,tmIdx:x.my,g,a,m,mom});
    }
    (x.mt||[]).forEach(m=>{
      const isKO=m.rd&&m.rd!=="Grup";
      let mG=0,mA=0;
      if(Array.isArray(m.gls)&&m.gls.length){
        m.gls.forEach(gl=>{
          if(!gl||!gl.sc||isKK(gl.sc))return;
          if(nz(gl.sc)===k){
            mG++;
            if(gl.as&&!isKK(gl.as)){const o=ensPart(gl.as);if(o)o.from++}
          }else if(gl.as&&nz(gl.as)===k){
            mA++;
            const o=ensPart(gl.sc);if(o)o.to++;
          }
        });
      }else{
        Object.entries(m.sc||{}).forEach(([pn,v])=>{if(nz(pn)===k)mG+=+v||0});
        Object.entries(m.as||{}).forEach(([pn,v])=>{if(nz(pn)===k)mA+=+v||0});
      }
      if(mG>0&&m.on)oppMap[m.on]=(oppMap[m.on]||0)+mG;
      if(isKO){clG+=mG;clA+=mA;if(m.mom&&nz(m.mom)===k)clMom++}
    });
  });
  const topOpps=Object.entries(oppMap).sort((a,b)=>b[1]-a[1]||TR_CMP(a[0],b[0])).slice(0,5);
  const partners=Object.values(partMap).sort((a,b)=>(b.from+b.to)-(a.from+a.to)||TR_CMP(a.n,b.n)).slice(0,5);
  return{name:disp,db,totG,totA,totM,totMom,totGA:totG+totA,clG,clA,clMom,seasons:seasons.reverse(),topOpps,partners};
}

function plSeasonChartSvg(seasons){
  const L=seasons.slice().reverse().slice(-8);
  if(!L.length)return "";
  const W=300,H=96,pL=10,pR=10,pT=18,pB=22,hh=H-pT-pB;
  const mx=Math.max(1,...L.map(x=>x.g+x.a)),slot=(W-pL-pR)/L.length,bw=Math.min(24,Math.max(10,slot*0.52));
  const bars=L.map((x,i)=>{
    const cx=pL+slot*(i+0.5),tot=x.g+x.a,gH=x.g/mx*hh,aH=x.a/mx*hh,totH=gH+aH;
    const lbl=x.sName.replace(/^Sezon\s*/i,"S").slice(0,5);
    return `<g><title>${esc(x.sName)}: ${x.g}G · ${x.a}A</title>`+
      (x.g?`<rect class="plb-g" x="${(cx-bw/2).toFixed(1)}" y="${(pT+hh-gH).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(2,gH).toFixed(1)}" rx="3"/>`:"")+
      (x.a?`<rect class="plb-a" x="${(cx-bw/2).toFixed(1)}" y="${(pT+hh-totH).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(2,aH).toFixed(1)}" rx="3"/>`:"")+
      (tot?`<text class="plb-v" x="${cx.toFixed(1)}" y="${Math.max(11,pT+hh-totH-4).toFixed(1)}" text-anchor="middle">${tot}</text>`:"")+
      `<text class="plb-l" x="${cx.toFixed(1)}" y="${H-6}" text-anchor="middle">${esc(lbl)}</text></g>`;
  }).join("");
  return `<div class="pl-sec"><div class="pl-chd"><span class="pset-lbl" style="margin:0">Sezon İvmesi (G + A)</span><span class="pl-leg"><i></i>Gol <i class="a"></i>Asist</span></div><div class="pl-chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Sezonlara göre gol ve asist grafiği"><line class="plb-ax" x1="${pL}" y1="${pT+hh}" x2="${W-pR}" y2="${pT+hh}"/>${bars}</svg></div></div>`;
}
function plDlg(){
  const d=st.pi?plProfileData(st.pi):null;
  if(!d)return "";
  const db=d.db,ti=db?db.i:(d.seasons[0]&&d.seasons[0].tmIdx!=null&&T[d.seasons[0].tmIdx]?d.seasons[0].tmIdx:null);
  const cb=ti!=null&&T[ti]?bspec(ti):null;
  const sty=cb?` style="--pc1:${cb.c1};--pc2:${cb.c2}"`:"";
  const sub=db?`<span class="sqp p-${db.p.g}" style="display:inline-flex;margin-right:4px">${db.p.p}</span>${db.p.a} yaş · ${esc(T[db.i].n)}`:"Kariyer oyuncu profili";
  const kpis=`<div class="pset-kpi" style="margin-top:10px">`+
    `<div class="pk2 emr"><b>${d.totG}</b><span>Gol</span></div>`+
    `<div class="pk2 sky"><b>${d.totA}</b><span>Asist</span></div>`+
    `<div class="pk2 gold"><b>${d.totMom}</b><span>MOTM</span></div>`+
    `</div>`;
  const gaPm=d.totM?fx(d.totGA/d.totM):"—";
  const metaPills=`<div class="dnamets" style="margin:0 0 10px">`+
    `<span class="dnam"><b>${d.totM}</b><em>Maç</em></span>`+
    `<span class="dnam pos"><b>${d.totGA}</b><em>G+A</em></span>`+
    `<span class="dnam"><b>${gaPm}</b><em>G+A / Maç</em></span>`+
    `<span class="dnam"><b>${d.seasons.length}</b><em>Sezon</em></span>`+
    (d.clG+d.clA+d.clMom?`<span class="dnam"><b>${d.clG}G ${d.clA}A</b><em>Eleme</em></span>`:"")+
    `</div>`;
  const chartHtml=d.seasons.length>=2?plSeasonChartSvg(d.seasons):"";
  const oppHtml=d.topOpps.length?`<div class="pl-sec"><div class="pset-lbl">En Çok Gol Attığı Rakipler</div>`+
    d.topOpps.map(([on,cnt])=>{const oi=ixOf(on);return `<div class="row">${oi!=null?badge(oi,20):""}<span class="n"><b>${esc(on)}</b></span><span class="g">${cnt} gol</span></div>`}).join("")+`</div>`:"";
  const partHtml=d.partners.length?`<div class="pl-sec"><div class="pset-lbl">En Uyumlu Asist Partnerleri</div>`+
    d.partners.map(p=>`<div class="row"><span class="n"><b>${esc(p.n)}</b><small class="pm"> ${p.from?`${p.from} asist aldı`:""}${p.from&&p.to?" · ":""}${p.to?`${p.to} asist verdi`:""}</small></span><span class="g">${p.from+p.to}</span></div>`).join("")+`</div>`:"";
  const snHtml=d.seasons.length?`<div class="pl-sec"><div class="pset-lbl">Sezon Bazlı Performans</div>`+
    d.seasons.map(x=>`<div class="row">${x.tmIdx!=null&&T[x.tmIdx]?badge(x.tmIdx,20):""}<span class="n"><b>${esc(x.sName)}</b>${x.tmIdx!=null&&T[x.tmIdx]?` <small class="pm">${esc(T[x.tmIdx].n)}</small>`:""}</span><span class="sqst"><i class="sg">${x.g}G</i>${x.a?`<i class="sa">${x.a}A</i>`:""}${x.mom?`<i class="sm">${x.mom}★</i>`:""}</span></div>`).join("")+`</div>`:"";
  return `<div class="dlg ti"><button class="tibk" data-a="no" aria-label="Kapat"></button><div class="dbox tisheet plsheet"${sty} role="dialog" aria-modal="true" aria-label="${esc(d.name)} oyuncu profili">`+
    `<div class="tih">${ti!=null?badge(ti,46):`<span class="aci">${UICO.boot}</span>`}<div class="tim"><b>${esc(d.name)}</b><span>${sub}</span></div>${db?`<div class="tmo2"><b>${db.p.o}</b><i>GEN</i></div>`:""}</div>`+
    kpis+metaPills+chartHtml+oppHtml+partHtml+snHtml+
    `<div class="bar"><button class="btn p" data-a="no" style="flex:1">Kapat</button></div>`+
  `</div></div>`;
}

/* ---------- KARİYER ÖZETİ, UZATMA/PENALTI, CLUTCH & MEVKİ DAĞILIMI ---------- */
function etPkCard(ML){
  const etL=(ML||[]).filter(m=>m.et||(m.pf!=null&&m.pa!=null));
  const pkL=(ML||[]).filter(m=>m.pf!=null&&m.pa!=null);
  if(!etL.length)return "";
  const etO=tally(etL);
  let pkW=0,pkLcnt=0,pfTot=0,paTot=0;
  pkL.forEach(m=>{if(m.pf>m.pa)pkW++;else if(m.pf<m.pa)pkLcnt++;pfTot+=+m.pf||0;paTot+=+m.pa||0});
  const pkN=pkW+pkLcnt;
  let h=`<div class="mtl c2">${tile(etL.length,"uzatma maçı",`${etO.w}G ${etO.d}B ${etO.l}M · %${Math.round(etO.w/etL.length*100)}`)}${tile(pkN?pct(pkW,pkN):"—","penaltı kazanma",pkN?`${pkW}G ${pkLcnt}M (${pfTot}–${paTot})`:"seri penaltı yok")}</div>`;
  const rec=etL.slice(-5).reverse().map(m=>`<div class="row"><i class="fd ${mres(m)}"></i><span class="n">${esc(m.rd)} · ${esc(m.on)}</span><b>${mscTxt(m)}</b></div>`).join("");
  return psetCard("bolt","gold","Uzatma ve Penaltı Karnesi","Kırılma anları",`${etL.length} maç`,h+rec)}
function clutchStats(seasons){
  const C=nob();
  seasons.forEach(x=>(x.mt||[]).filter(m=>m.rd&&m.rd!="Grup").forEach(m=>{
    const isFin=m.rd==RN[2],seen=new Set();
    const ens=n=>{if(isKK(n))return null;const k=nz(n);if(!k)return null;return C[k]=C[k]||{n:String(n).trim(),g:0,a:0,ga:0,mom:0,m:0,fg:0,fa:0}};
    Object.entries(m.sc||{}).forEach(([n,g])=>{if(+g>0){const o=ens(n);if(o){o.g+=+g;o.ga+=+g;if(isFin)o.fg+=+g;seen.add(nz(n))}}});
    Object.entries(m.as||{}).forEach(([n,a])=>{if(+a>0){const o=ens(n);if(o){o.a+=+a;o.ga+=+a;if(isFin)o.fa+=+a;seen.add(nz(n))}}});
    if(m.mom){const o=ens(m.mom);if(o){o.mom+=1;seen.add(nz(m.mom))}}
    seen.forEach(k=>{if(C[k])C[k].m+=1})}));
  return Object.values(C).filter(o=>o.ga>0||o.mom>0).sort((a,b)=>b.ga-a.ga||b.g-a.g||b.mom-a.mom)}
function posOfPlayer(s,n){
  if(s&&s.my!=null){const p=sqFind(s.my,n);if(p)return p.g}
  const a=sqFindAny(n);return a?a.p.g:"U"}
function posDistCard(seasons){
  const G={F:{l:"Forvet",s:"FOR",g:0,a:0},M:{l:"Orta saha",s:"ORT",g:0,a:0},D:{l:"Defans",s:"DEF",g:0,a:0},K:{l:"Kaleci",s:"KAL",g:0,a:0},U:{l:"Diğer / Transfer",s:"DİĞ",g:0,a:0}};
  let totG=0,totA=0;
  seasons.forEach(x=>{
    const mG=nob(),mA=nob();
    (x.mt||[]).forEach(m=>{
      Object.entries(m.sc||{}).forEach(([n,v])=>{if(+v>0&&!isKK(n))mG[nz(n)]=(mG[nz(n)]||0)+(+v)});
      Object.entries(m.as||{}).forEach(([n,v])=>{if(+v>0&&!isKK(n))mA[nz(n)]=(mA[nz(n)]||0)+(+v)})});
    const seen=new Set();
    (x.pl||[]).forEach(p=>{
      const k=nz(p.n);seen.add(k);
      const pos=posOfPlayer(x,p.n),g=Math.max(p.g||0,mG[k]||0),a=Math.max(p.a||0,mA[k]||0);
      G[pos].g+=g;G[pos].a+=a;totG+=g;totA+=a});
    Object.entries(mG).forEach(([k,g])=>{if(!seen.has(k)){const pos=posOfPlayer(x,k);G[pos].g+=g;totG+=g}});
    Object.entries(mA).forEach(([k,a])=>{if(!seen.has(k)){const pos=posOfPlayer(x,k);G[pos].a+=a;totA+=a}})});
  if(!totG&&!totA)return "";
  const keys=["F","M","D","K","U"].filter(k=>G[k].g>0||G[k].a>0);
  const rows=keys.map(k=>{
    const o=G[k],gp=totG?Math.round(o.g/totG*100):0;
    return `<div class="ppos-r p-${k}"><div class="ppos-top"><span class="ppos-tag">${o.s}</span><span class="ppos-nm">${o.l}</span><span class="ppos-vals"><b>${o.g}G</b>${totA?`<em class="ppos-a">${o.a}A</em>`:""}<span class="ppos-pct">%${gp}</span></span></div><div class="ppos-bar"><i style="width:${Math.max(o.g?6:0,gp)}%"></i></div></div>`}).join("");
  return `<div class="card pglass ppos"><h3>Mevki dağılımı<small>${totG}G${totA?` · ${totA}A`:""}</small></h3>${rows}<div class="note" style="margin:8px 0 0">Kadro ve FC 27 veritabanındaki mevkilere göre hesaplanır.</div></div>`}
function duoStats(seasons){
  const D=nob(),B=nob();
  seasons.forEach(x=>(x.mt||[]).forEach(m=>{
    const sc=Object.entries(m.sc||{}).filter(([n,v])=>v>0&&!isKK(n)),as=Object.entries(m.as||{}).filter(([n,v])=>v>0&&!isKK(n));
    const asMap=nob();as.forEach(([n,a])=>{asMap[nz(n)]={n,a}});
    sc.forEach(([sn,g])=>{
      const sk=nz(sn);
      if(asMap[sk]){const o=B[sk]=B[sk]||{n:sn,c:0,g:0,a:0};o.c++;o.g+=g;o.a+=asMap[sk].a}
    });
    if(Array.isArray(m.gls)&&m.gls.length){
      const mPairs=new Set();
      m.gls.forEach(g=>{
        if(!g||!g.sc||isKK(g.sc)||!g.as||isKK(g.as))return;
        const sn=String(g.sc).trim(),an=String(g.as).trim(),sk=nz(sn),ak=nz(an);
        if(!sk||!ak||sk===ak)return;
        const k1=sk<ak?sk:ak,k2=sk<ak?ak:sk,key=k1+"|"+k2;
        const n1=sk<ak?sn:an,n2=sk<ak?an:sn;
        const o=D[key]=D[key]||{n:n1+" & "+n2,m:0,tot:0};
        o.tot+=1;mPairs.add(key);
      });
      mPairs.forEach(key=>{if(D[key])D[key].m+=1});
    }else{
      sc.forEach(([sn,g])=>{
        const sk=nz(sn);
        as.forEach(([an,a])=>{
          const ak=nz(an);if(sk==ak)return;
          const k1=sk<ak?sk:ak,k2=sk<ak?ak:sk,key=k1+"|"+k2;
          const n1=sk<ak?sn:an,n2=sk<ak?an:sn;
          const o=D[key]=D[key]||{n:n1+" & "+n2,m:0,tot:0};
          o.m++;o.tot+=Math.min(g,a);
        });
      });
    }
  }));
  return{duos:Object.values(D).sort((a,b)=>b.tot-a.tot||b.m-a.m),both:Object.values(B).sort((a,b)=>b.c-a.c||(b.g+b.a)-(a.g+a.a))}}
function seasonAwards(s){
  const pl=s.pl||[];if(!pl.length)return null;
  const active=pl.filter(p=>(p.g||0)+(p.a||0)+(p.mom||0)+(p.m||0)>0);if(!active.length)return null;
  const mvpScore=p=>(p.g||0)*3+(p.a||0)*2+(p.mom||0)*3.5+((+p.r||0)>0?(+p.r-6)*2:0)+Math.min(5,(p.m||0)*.25);
  const mvp=active.slice().sort((a,b)=>mvpScore(b)-mvpScore(a)||(b.g||0)-(a.g||0))[0];
  const topT=f=>{const L=active.filter(p=>(p[f]||0)>0).sort((a,b)=>b[f]-a[f]);if(!L.length)return null;const mx=L[0][f];return{n:L.filter(p=>p[f]==mx).map(p=>p.n).join(", "),v:mx}};
  const gaL=active.filter(p=>(p.g||0)+(p.a||0)>0).sort((a,b)=>((b.g||0)+(b.a||0))-((a.g||0)+(a.a||0))||(b.g||0)-(a.g||0));
  const topGA=gaL.length?(()=>{const mx=(gaL[0].g||0)+(gaL[0].a||0);return{n:gaL.filter(p=>(p.g||0)+(p.a||0)==mx).map(p=>p.n).join(", "),v:mx,g:gaL[0].g||0,a:gaL[0].a||0}})():null;
  const ageOf=n=>{const q=s.my!=null?sqFind(s.my,n):null;if(q)return q.a;const a=sqFindAny(n);return a?a.p.a:99};
  const wkL=active.filter(p=>ageOf(p.n)<=21&&((p.g||0)+(p.a||0)+(p.mom||0)>0)).sort((a,b)=>mvpScore(b)-mvpScore(a));
  const wk=wkL[0]?{n:wkL[0].n,age:ageOf(wkL[0].n),g:wkL[0].g||0,a:wkL[0].a||0,mom:wkL[0].mom||0}:null;
  const ds=duoStats([s]),cl=clutchStats([s])[0]||null;
  return{mvp:{n:mvp.n,g:mvp.g||0,a:mvp.a||0,mom:mvp.mom||0,m:mvp.m||0},boot:topT("g"),play:topT("a"),ga:topGA,wk,duo:ds.duos[0]||null,both:ds.both[0]||null,clutch:cl}}
const UICO={
  trophy:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5v1.5A3 3 0 0 0 8 10.5M16 6h3v1.5a3 3 0 0 1-3 3M12 13v4M8.5 20h7"/></svg>',
  boot:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  play:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><circle cx="12" cy="6" r="2.5"/><path d="M7.5 15.8L10.8 8.3M16.5 15.8L13.2 8.3M8.5 18h7"/></svg>',
  bolt:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2L4.5 13.5h6L9.5 22 19.5 10.5h-6z"/></svg>',
  flame:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c2.5 3.2 5 5.6 5 9.2A5 5 0 0 1 7 12.2c0-2.2 1.2-4 2.5-5.6.2 1.5 1.1 2.4 2.2 2.4-.5-2-.3-4 .3-6z"/></svg>',
  gem:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12l3 5-9 11L3 9z"/><path d="M3 9h18M9 4l-1.5 5L12 20l4.5-11L15 4"/></svg>',
  duo:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8.5" r="3"/><circle cx="16.5" cy="9.5" r="2.5"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M14.5 19a4.5 4.5 0 0 1 6 0"/></svg>',
  radar:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 12l5-5M12 4v3M12 17v3M4 12h3M17 12h3"/></svg>',
  sliders:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="11" cy="17" r="2"/></svg>',
  theme:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  spark:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>',
  backup:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v10M8 10l4 4 4-4"/><path d="M5 17v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2"/></svg>',
  upload:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V5M8 9l4-4 4 4"/><path d="M5 17v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2"/></svg>',
  db:'<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="2.8"/><path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6"/></svg>',
  app:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M9 12l2 2 4-4"/></svg>',
  bug:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9v4M12 16.5v.5"/><path d="M10.3 4.3L3.7 16a2 2 0 0 0 1.7 3h13.2a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z"/></svg>',
  shield:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5.5c0 4.5-3 8.2-7 9.5-4-1.3-7-5-7-9.5V6z"/></svg>',
  trash:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 7V4.5h4V7M7 7l.8 12.5h8.4L17 7M10.5 11v5M13.5 11v5"/></svg>',
  chev:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  ball:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5l3.5 2.5-1.3 4H9.8L8.5 10zM12 3v4.5M15.5 10l4.2-1.5M14.2 14l2.8 4M9.8 14L7 18M8.5 10L4.3 8.5"/></svg>',
  assist:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 17L17 5M17 5h-6M17 5v6"/><circle cx="6.5" cy="17.5" r="2"/></svg>',
  tree:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h5v5H4M4 13h5v5H4M9 8.5h4v7H9M13 12h7"/></svg>',
  list:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>',
  cal:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>',
  book:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22zM4 5.5V20"/></svg>',
  chart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16M7 16v-5M12 16V7M17 16v-8"/></svg>',
  ff:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 6l7 6-7 6V6zM12.5 6l7 6-7 6V6z"/></svg>',
  phone:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="3" width="12" height="18" rx="2.5"/><path d="M10.5 18h3"/></svg>',
  dna:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7.5 4.3v8.6L12 20.2l-7.5-4.3V7.3z"/><circle cx="12" cy="12" r="2.5"/></svg>',
  up:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17l5-5 4 4 7-8M15 8h5v5"/></svg>',
  wrench:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-5.3 5.3a1.5 1.5 0 0 0 2.1 2.1l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.1-2.1z"/></svg>',
  check:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8.5 12.3l2.3 2.4 4.8-5"/></svg>',
  compass:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 13.4 13.4 8.5 15.5 10.6 10.6 15.5 8.5"/></svg>',
  rocket:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19l4-1 9-9a4 4 0 0 0-5.7-5.7l-9 9-1 4zM14 5l5 5"/></svg>'
};
const uiIco=(k,cls)=>`<i class="ui-ic${cls?" "+cls:""}" aria-hidden="true">${UICO[k]||""}</i>`;
function awardsCard(s,inFold){
  const aw=seasonAwards(s);if(!aw)return "";
  const mvpInfo=s&&s.my!=null?sqFind(s.my,aw.mvp.n):(sqFindAny(aw.mvp.n)&&sqFindAny(aw.mvp.n).p);
  const mvpSub=mvpInfo?`<span class="aw-sub"><i class="sqp p-${mvpInfo.g}">${esc(mvpInfo.p)}</i>${mvpInfo.a} yaş · ${mvpInfo.o} GEN</span>`:"";
  const mvpPills=[`<span class="awp"><b>${aw.mvp.g}</b><em>G</em></span>`,`<span class="awp"><b>${aw.mvp.a}</b><em>A</em></span>`];
  if(aw.mvp.mom)mvpPills.push(`<span class="awp gld"><b>${aw.mvp.mom}</b><em>★</em></span>`);
  const hero=`<button class="awd mvp tap" data-a="pinfo" data-n="${esc(aw.mvp.n)}" aria-label="${esc(aw.mvp.n)} profilini aç">`+
    `<span class="awic">${UICO.trophy}</span>`+
    `<div class="awm"><div class="awi">★ Sezonun MVP’si</div><b>${esc(aw.mvp.n)}</b>${mvpSub}<div class="awps">${mvpPills.join("")}</div></div>`+
  `</button>`;
  const mkA=(cls,ic,lbl,nm,badgeTxt,subTxt,forceWide)=>{
    const single=!nm.includes(",")&&!nm.includes("&");
    const isWide=!!forceWide||nm.length>18||nm.includes("&")||nm.includes(",");
    const wCls=isWide?" wide":"";
    const inner=`<div class="awtop"><span class="awic sm">${UICO[ic]}</span><span class="awi">${lbl}</span>${badgeTxt?`<span class="aw-bdg">${badgeTxt}</span>`:""}</div>`+
      `<div class="aw-body"><b>${esc(nm)}</b>${subTxt?`<span class="awst">${subTxt}</span>`:""}</div>`;
    return single
      ? `<button class="awd ${cls}${wCls} tap" data-a="pinfo" data-n="${esc(nm)}" aria-label="${esc(nm)} profilini aç">${inner}</button>`
      : `<div class="awd ${cls}${wCls}">${inner}</div>`;
  };
  const items=[];
  if(aw.boot)items.push(mkA("gold","boot","Altın Ayakkabı",aw.boot.n,`${aw.boot.v} GOL`,"Sezonun en golcü ismi"));
  if(aw.play)items.push(mkA("sky","play","Oyun Kurucu",aw.play.n,`${aw.play.v} ASİST`,"En çok gol pası veren"));
  if(aw.ga)items.push(mkA("emr","bolt","Skor Katkısı",aw.ga.n,`${aw.ga.v} G+A`,`${aw.ga.g} Gol · ${aw.ga.a} Asist`));
  if(aw.clutch)items.push(mkA("org","flame","Eleme Yıldızı",aw.clutch.n,`${aw.clutch.ga} G+A`,`Elemede ${aw.clutch.g}G · ${aw.clutch.a}A`));
  if(aw.wk)items.push(mkA("pur","gem",`Genç Yıldız (${aw.wk.age})`,aw.wk.n,`${aw.wk.g}G · ${aw.wk.a}A`,aw.wk.mom?`${aw.wk.mom}★ Maçın Adamı`:"21 yaş altı en etkili"));
  if(aw.duo)items.push(mkA("teal","duo","Altın İkili",aw.duo.n,`${aw.duo.tot} ORTAK GOL`,`${aw.duo.m} maçta birlikte skor üretti`,true));
  const grid=`<div class="aw-wrap">${hero}${items.length?`<div class="awg">${items.join("")}</div>`:""}</div>`;
  if(inFold)return `<div class="aw-subbar"><span class="lb">${s.res?"Sezon ödülleri kesinleşti":"Canlı sezon liderleri"}</span></div>${grid}`;
  return `<div class="card pglass paw"><h3>Sezon ödülleri<small>${s.res?"kesinleşti":"canlı liderler"}</small></h3>${grid}</div>`}
function careerData(mode){
  const S=store.seasons.filter(x=>!mode||mode=="all"||(mode=="lg"?isLg(x.cfg):!isLg(x.cfg)));
  const f=S.filter(x=>x.res),act=S.filter(x=>x.res||(x.mt||[]).length||(x.ts&&((x.ts.w||0)+(x.ts.d||0)+(x.ts.l||0)))),t={w:0,d:0,l:0,gf:0,ga:0},P=nob();
  S.forEach(x=>{const q=x.ts||{};for(const k in t)t[k]+=q[k]||0;(x.pl||[]).forEach(p=>{const q=nz(p.n),o=P[q]=P[q]||{n:p.n,g:0,a:0,mom:0,ga:0};o.g+=p.g||0;o.a+=p.a||0;o.mom+=p.mom||0;o.ga=(o.g||0)+(o.a||0)})});
  const pl=Object.values(P),top=k=>pl.filter(p=>p[k]>0).sort((a,b)=>b[k]-a[k]),topT=k=>{const L=top(k);if(!L.length)return null;const mx=L[0][k],ties=L.filter(p=>p[k]==mx);return{n:ties.map(p=>p.n).join(", "),v:mx}};
  const ds=duoStats(S);
  return{mode:mode||"all",n:f.length||act.length,finN:f.length,ch:f.filter(x=>x.res.st==7).length,fin:f.filter(x=>x.res.st>=6).length,pod:f.filter(x=>x.res.st>=5).length,t,best:f.length?Math.max(...f.map(x=>x.res.st)):-1,g:topT("g"),a:topT("a"),ga:topT("ga"),mom:topT("mom"),duo:ds.duos[0]||null}}
function careerCard(mode){const d=careerData(mode);if(!d.n&&!(d.t.w+d.t.d+d.t.l))return "";
  const isL=mode=="lg",isC=mode=="cup",ttl=isL?"Lig Kariyer Özeti":isC?"Kupa Kariyer Özeti":"Kariyer Özeti";
  const sub=isL?"Puan usulü lig performansı":isC?"Eleme usulü kupa performansı":"Tüm sezonlar toplamı";
  const c3v=isL?d.pod:d.fin,c3l=isL?"İlk 3 (Podyum)":(isC?"Final":"Final / İlk 2");
  const totM=d.t.w+d.t.d+d.t.l,wr=totM?Math.round(d.t.w/totM*100):0,gd=d.t.gf-d.t.ga;
  const gdStr=(gd>0?"+":gd<0?"−":"")+Math.abs(gd);
  const shIc='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>';
  const kpis=`<div class="car-kpi">`+
    `<div class="ck sky"><b>${d.n}</b><span>${isL?"Lig Sezonu":isC?"Kupa Sezonu":"Sezon"}</span></div>`+
    `<div class="ck gold${d.ch?"":" z"}"><b>${d.ch}</b><span>Şampiyonluk</span></div>`+
    `<div class="ck emr${c3v?"":" z"}"><b>${c3v}</b><span>${c3l}</span></div>`+
    `</div>`;
  const tel=totM?`<div class="car-tel">`+
    `<div class="car-th"><span>Kariyer Karnesi · ${totM} Maç</span><b class="car-wr">%${wr} Galibiyet</b></div>`+
    `${sbar(d.t)}`+
    `<div class="car-pills">`+
      `<span class="cp w"><b>${d.t.w}</b><em>G</em></span>`+
      `<span class="cp d"><b>${d.t.d}</b><em>B</em></span>`+
      `<span class="cp l"><b>${d.t.l}</b><em>M</em></span>`+
      `<span class="cp gl"><b>${d.t.gf}–${d.t.ga}</b><em class="${gd>0?"pos":gd<0?"neg":""}">(${gdStr})</em></span>`+
    `</div>`+
    `</div>`:"";
  return psetCard("trophy","gold",ttl,sub,`${d.n} sezon`,
    kpis+tel+
    `<div class="bar" style="margin:10px 0 0"><button class="btn pset-sec" data-a="kariyer" style="width:100%">${shIc}<span>Kariyer Özetini Paylaş</span></button></div>`
  )}

/* ---------- MAÇ ÖNCESİ TAHMİN VE SÜRPRİZ MAÇLAR ---------- */
const PSC=40;
const pSplit=z=>{const p=1/(1+Math.exp(-z)),pd=.22*(1-Math.abs(2*p-1)*.6);return [p*(1-pd),pd,(1-p)*(1-pd)]};
const pBase=(x,mi,oi)=>pSplit((V(RT(x,mi))-V(RT(x,oi)))/PSC);
function pastM(){const o=[];store.seasons.forEach(x=>{if(x.my==null||!T[x.my])return;(x.mt||[]).forEach(m=>{const oi=m.opp!=null&&T[m.opp]?m.opp:ixOf(m.on);if(oi==null||oi<0||!T[oi])return;o.push({x,m,oi,b:pBase(x,x.my,oi),r:mres(m)})})});return o}
function predict(s,oi){if(s.my==null||oi==null||!T[oi]||!T[s.my])return null;
  const z0=(V(RT(s,s.my))-V(RT(s,oi)))/PSC,H=pastM(),dd=oyOf(s).d,same=dd?H.filter(e=>oyOf(e.x).d==dd):[],use=same.length>=5,pool=use?same:H,n=pool.length,cl=(v,m)=>Math.max(-m,Math.min(m,v));
  let off=0;if(n){const E=pool.reduce((a,e)=>a+e.b[0],0),A=pool.filter(e=>e.r=="w").length;off=cl((A-E)/(n+8)*4,1.2)}
  const hh=H.filter(e=>e.oi==oi),hn=hh.length;if(hn>=2){const w=hh.filter(e=>e.r=="w").length,l=hh.filter(e=>e.r=="l").length;off+=cl((w-l)/(hn+4)*.8,.5)}
  const q=pSplit(z0+off),w=Math.round(q[0]*100),d=Math.round(q[1]*100);
  return{w,d,l:Math.max(0,100-w-d),n,same:use,hn}}
function predLine(s,i){const p=predict(s,i);if(!p)return "";
  const fav=p.w>=55?"favori sensin":p.l>=55?"rakip favori":"dengeli maç";
  return `<div class="pbx" style="margin:0 0 8px"><div class="mstt"><b>Tahmin: %${p.w} galibiyet</b><span class="lb">${fav}</span></div><div class="msb" role="img" aria-label="Galibiyet %${p.w}, beraberlik %${p.d}, mağlubiyet %${p.l}">${[["w",p.w],["d",p.d],["l",p.l]].map(([k,v])=>v?`<i class="${k}" style="flex:${v}"></i>`:"").join("")}</div><div class="note" style="margin:4px 0 0">Beraberlik %${p.d} · mağlubiyet %${p.l}. Güç farkına${p.n?" ve son "+p.n+" maçına":""} dayanır${p.same?" (aynı zorlukta)":""}${p.hn>=2?"; bu rakiple "+p.hn+" maçın da hesaba katıldı":""}.</div></div>`}
function surCard(ML){const ids=new Set(ML.map(m=>m.id)),L=pastM().filter(e=>ids.has(e.m.id)).map(e=>{const pr=e.m.pr||e.b.map(v=>Math.round(v*100)),pw=pr[0],pl=pr[2],po=e.r=="w"?pw:e.r=="l"?pl:null;return Object.assign({pr,pw,pl,po},e)});
  if(L.length<3)return psetCard("spark","org","Sürpriz Maçlar","Tahmine ters sonuçlar",null,emp("En az 3 maç girildikten sonra tahmine ters sonuçlar burada listelenir."));
  const dec=L.filter(e=>e.r!="d"&&Math.abs(e.pw-e.pl)>=10),hit=dec.filter(e=>(e.pw>e.pl)==(e.r=="w")).length,E=L.reduce((a,e)=>a+e.pw/100,0),A=L.filter(e=>e.r=="w").length;
  const udog=L.filter(e=>e.pl>e.pw+5),udogW=udog.filter(e=>e.r=="w").length;
  const S=L.filter(e=>e.po!=null&&e.po<=30).sort((a,b)=>a.po-b.po).slice(0,8);
  const rows=S.map(e=>`<div class="row"><i class="fd ${e.r}" role="img" aria-label="${e.r=="w"?"Beklenmedik galibiyet":"Beklenmedik mağlubiyet"}"></i><span class="n">${esc(e.x.name)} · ${esc(e.m.rd)} · ${esc(e.m.on)} ${e.m.gf}–${e.m.ga}</span><b>%${e.po}</b></div>`).join("");
  return psetCard("spark","org","Sürpriz Maçlar","Tahmine ters sonuçlar",S.length?`${S.length} sürpriz`:"Normal",`<div class="mtl">${tile(dec.length?pct(hit,dec.length):"—","tahmin isabeti",dec.length?dec.length+" net maç":"net favori yok")}${tile(fx(E),"beklenen galibiyet","gerçekte "+A)}${tile(udog.length?pct(udogW,udog.length):"—","underdog galibiyet",udog.length?udogW+"/"+udog.length+" zor maç":"rakip favori yok")}</div>`+(rows?`<div class="rt">En büyük sürprizler</div>${rows}<div class="note" style="margin:8px 0 0">Sağdaki yüzde, o sonucun maç öncesi tahminidir. Underdog: maç öncesi rakibin favori olduğu maçlar.</div>`:`<div class="note" style="margin:8px 0 0">Henüz sürpriz yok: sonuçların çoğu tahminle uyumlu.</div>`))}

/* ---------- v14: TAKTİKSEL ANALİZ, HAK EDİŞ, xG VERİMLİLİĞİ VE RADAR MOTORU ---------- */
const XGMAX=7,XPC=new Map();
function poissonArr(lam,n){const a=new Array(n+1);let p=Math.exp(-lam);a[0]=p;for(let i=1;i<=n;i++){p*=lam/i;a[i]=p}return a}
function calcMatchXpts(mx,ox){
  if(mx==null||ox==null||!Number.isFinite(+mx)||!Number.isFinite(+ox))return null;
  const l1=Math.max(0,Math.min(XGMAX,+mx)),l2=Math.max(0,Math.min(XGMAX,+ox)),key=l1+"|"+l2,hit=XPC.get(key);
  if(hit)return hit;
  const N=16,a=poissonArr(l1,N),b=poissonArr(l2,N);
  let pw=0,pd=0,pl=0;
  for(let i=0;i<=N;i++){const pi=a[i];for(let j=0;j<=N;j++){const pij=pi*b[j];if(i>j)pw+=pij;else if(i==j)pd+=pij;else pl+=pij}}
  const tot=pw+pd+pl;if(tot>0){pw/=tot;pd/=tot;pl/=tot}
  const r={pw,pd,pl,xPts:pw*3+pd,opXpts:pl*3+pd};
  if(XPC.size>4000)XPC.clear();
  XPC.set(key,r);return r}
function cleanStatsW(raw){
  if(!raw||typeof raw!="object")return{s:null,warns:[]};
  const num=v=>{if(v===""||v==null)return null;const n=parseFloat(String(v).replace(",","."));return Number.isFinite(n)?n:null};
  const warns=[];
  let myPos=num(raw.myPos),oppPos=num(raw.oppPos);
  if(myPos!=null&&(myPos<0||myPos>100))warns.push("Topla oynama 0–100 aralığına çekildi");
  if(myPos!=null&&oppPos==null)oppPos=Math.max(0,Math.min(100,100-myPos));
  else if(oppPos!=null&&myPos==null)myPos=Math.max(0,Math.min(100,100-oppPos));
  let myShots=num(raw.myShots),oppShots=num(raw.oppShots);
  let mySot=num(raw.mySot),oppSot=num(raw.oppSot);
  if(myShots!=null)myShots=Math.max(0,Math.min(60,Math.round(myShots)));
  if(oppShots!=null)oppShots=Math.max(0,Math.min(60,Math.round(oppShots)));
  if(mySot!=null)mySot=Math.max(0,Math.min(60,Math.round(mySot)));
  if(oppSot!=null)oppSot=Math.max(0,Math.min(60,Math.round(oppSot)));
  if(mySot!=null&&myShots!=null&&mySot>myShots){mySot=myShots;warns.push("İsabetli şut toplam şutu aşamaz, düzeltildi")}
  if(oppSot!=null&&oppShots!=null&&oppSot>oppShots){oppSot=oppShots;warns.push("Rakip isabetli şutu toplam şutu aşamaz, düzeltildi")}
  let myPass=num(raw.myPass),oppPass=num(raw.oppPass);
  let myXg=num(raw.myXg),oppXg=num(raw.oppXg);
  if((myXg!=null&&myXg>XGMAX)||(oppXg!=null&&oppXg>XGMAX))warns.push("xG en fazla "+XGMAX+" olabilir, sınıra çekildi");
  if([myPos,oppPos,myShots,oppShots,mySot,oppSot,myPass,oppPass,myXg,oppXg].every(v=>v==null))return{s:null,warns};
  return{s:{
    myPos:myPos!=null?Math.round(Math.max(0,Math.min(100,myPos))):null,
    oppPos:oppPos!=null?Math.round(Math.max(0,Math.min(100,oppPos))):null,
    myShots,oppShots,mySot,oppSot,
    myPass:myPass!=null?Math.round(Math.max(0,Math.min(100,myPass))):null,
    oppPass:oppPass!=null?Math.round(Math.max(0,Math.min(100,oppPass))):null,
    myXg:myXg!=null?Math.round(Math.max(0,Math.min(XGMAX,myXg))*100)/100:null,
    oppXg:oppXg!=null?Math.round(Math.max(0,Math.min(XGMAX,oppXg))*100)/100:null
  },warns};
}
function matchDeserve(m){
  const st=m&&m.stats;if(!st||st.myXg==null||st.oppXg==null)return null;
  const r=mres(m),mx=+st.myXg,ox=+st.oppXg,diff=mx-ox,tot=mx+ox;
  const relTh=Math.max(0.35,tot*0.16),drawTh=Math.max(0.55,tot*0.22);
  const xp=calcMatchXpts(mx,ox),actPts=r=="w"?3:r=="d"?1:0,pDiff=xp?actPts-xp.xPts:0;
  if(r=="l"&&diff>=relTh&&pDiff<=-1.15)return{k:"unlucky",t:"Şanssız Mağlubiyet",ic:uiIco("bug"),c:"#f97316",bg:"#ea580c",d:diff,xPts:xp.xPts};
  if(r=="w"&&diff<=-relTh&&pDiff>=1.15)return{k:"undeserved",t:"Hak Edilmemiş Galibiyet",ic:uiIco("shield"),c:"#3b82f6",bg:"#1e3a8a",d:diff,xPts:xp.xPts};
  if(r=="w"&&diff>=Math.max(0.25,tot*0.11))return{k:"deserved",t:"Hak Edilmiş Galibiyet",ic:uiIco("check"),c:"#12b886",bg:"#0f9d6b",d:diff,xPts:xp.xPts};
  if(r=="d"&&diff>=drawTh)return{k:"unlucky",t:"Kaçan Galibiyet (Şanssız)",ic:uiIco("bug"),c:"#f97316",bg:"#ea580c",d:diff,xPts:xp.xPts};
  if(r=="d"&&diff<=-drawTh)return{k:"undeserved",t:"Kurtarılan Puan",ic:uiIco("shield"),c:"#3b82f6",bg:"#1e3a8a",d:diff,xPts:xp.xPts};
  return{k:"fair",t:r=="l"&&diff<=-Math.max(0.25,tot*0.11)?"Hak Edilmiş Mağlubiyet":"Dengeli Maç",ic:"•",c:"#94a3b8",bg:"#475569",d:diff,xPts:xp?xp.xPts:null};
}
function xgEffInfo(m){
  const st=m&&m.stats;if(!st||st.myXg==null)return null;
  const diff=(+m.gf||0)-(+st.myXg),s=(diff>0?"+":"")+diff.toFixed(2).replace(".",",");
  if(diff>=0.5)return{v:diff,s,cls:"pos",t:"Mükemmel bitiricilik ("+s+" xG)"};
  if(diff>0.1)return{v:diff,s,cls:"pos",t:"İyi bitiricilik ("+s+" xG)"};
  if(diff<=-0.5)return{v:diff,s,cls:"neg",t:"Bitiricilik sorunu ("+s+" xG)"};
  if(diff<-0.1)return{v:diff,s,cls:"neg",t:"Düşük bitiricilik ("+s+" xG)"};
  return{v:diff,s,cls:"neu",t:"Beklenen bitiricilik ("+s+" xG)"};
}
function advFormUI(s){
  const q=st.mst||defMst(),me=s.my!=null&&T[s.my]?T[s.my].n:"Sen",op=st.mop!=null&&T[st.mop]?T[st.mop].n:"Rakip";
  const hasAny=Object.values(q).some(v=>v!==""&&v!=null);
  let h=`<button type="button" class="advbtn ${st.madv?"open":""}" data-a="madv"><span class="ui-lbl">${uiIco("chart")}<span>Gelişmiş İstatistik Ekle (Opsiyonel)${hasAny?" ✓":""}</span></span><span>${st.madv?"▴":"▾"}</span></button>`;
  if(!st.madv)return h;
  const row=(lbl,sub,k1,k2,ph1,ph2,dec,last)=>`<div class="advrow"><div class="advinp"><input id="mst_${k1}" class="tin" data-mst="${k1}" inputmode="${dec?"decimal":"numeric"}" enterkeyhint="next" maxlength="5" placeholder="${ph1}" value="${esc(q[k1]??"")}"></div><div class="lbl">${lbl}${sub?`<small>${sub}</small>`:""}</div><div class="advinp"><input id="mst_${k2}" class="tin" data-mst="${k2}" inputmode="${dec?"decimal":"numeric"}" enterkeyhint="${last?"done":"next"}" maxlength="5" placeholder="${ph2}" value="${esc(q[k2]??"")}"></div></div>`;
  const mp=parseFloat(q.myPos),opP=parseFloat(q.oppPos),pBar=Number.isFinite(mp)&&Number.isFinite(opP)&&mp+opP>0?`<div class="advbar"><i style="width:${mp}%"></i><i style="width:${opP}%"></i></div>`:"";
  h+=`<div class="advbox"><div class="advhd"><span>★ ${esc(me)}</span><span>5 Altın Veri</span><span>${esc(op)}</span></div>`+
    row("Topla Oynama %","otomatik tamamlar","myPos","oppPos","50","50",false)+pBar+
    row("Toplam Şut","maç boyu","myShots","oppShots","10","8",false)+
    row("İsabetli Şut","kaleyi bulan","mySot","oppSot","6","4",false)+
    row("Pas İsabeti %","yüzde","myPass","oppPass","85","82",false)+
    row("xG (Gol Beklentisi)","ondalık (örn. 1.8)","myXg","oppXg","1.5","1.1",true,true)+
    `<div class="note" style="margin:6px 0 0;text-align:center">Girilen verilerle Hak Ediş, xG Verimliliği ve Taktiksel DNA (Radar) otomatik hesaplanır.</div></div>`;
  return h;
}
function calcTacticalDNA(s,opt){
  const onlySeason=opt===true,isCareer=!!(opt&&typeof opt==="object"&&opt.career);
  let src=[],scopeLbl="";
  if(isCareer){
    const rawL=Array.isArray(opt.matches)?opt.matches:store.seasons.flatMap(x=>x.mt||[]);
    src=rawL.filter(m=>m&&m.stats);
    if(!src.length)return null;
    scopeLbl=opt.fd?`${opt.fd} (${src.length} istatistikli maç)`:`Tüm kariyer (${src.length} istatistikli maç)`;
  }else{
    const curM=((s&&s.mt)||[]).filter(m=>m.stats);
    if(onlySeason&&!curM.length)return null;
    const allSt=onlySeason?[]:store.seasons.flatMap(x=>(x.mt||[]).filter(m=>m.stats));
    src=curM.length>=1?curM:allSt;
    if(!src.length)return null;
    scopeLbl=curM.length>=1?`Bu sezon (${src.length} istatistikli maç)`:`Tüm kariyer (${src.length} istatistikli maç)`;
  }
  const n=src.length,avgOf=(fn)=>{const vals=src.map(fn).filter(v=>v!=null&&Number.isFinite(v));return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null};
  const mPos=avgOf(m=>m.stats.myPos)??50;
  const mPass=avgOf(m=>m.stats.myPass)??80;
  const mShots=avgOf(m=>m.stats.myShots)??10;
  const mSot=avgOf(m=>m.stats.mySot)??(mShots*0.5);
  const mXg=avgOf(m=>m.stats.myXg)??1.4;
  const oShots=avgOf(m=>m.stats.oppShots)??10;
  const oSot=avgOf(m=>m.stats.oppSot)??(oShots*0.5);
  const oXg=avgOf(m=>m.stats.oppXg)??1.3;
  const mGf=avgOf(m=>+m.gf||0)??1.5;
  const mGa=avgOf(m=>+m.ga||0)??1.2;
  const cl=(v)=>Math.round(Math.max(12,Math.min(99,v)));
  // 1. Hücum Tehdidi (Şut + xG + İsabetli Şut)
  const shScore=Math.min(100,(mShots/16)*100);
  const xgScore=Math.min(100,(mXg/3.0)*100);
  const sotScore=Math.min(100,(mSot/9)*100);
  const atk=cl(shScore*0.40+xgScore*0.45+sotScore*0.15);
  // 2. Top & Pas Kontrolü (Topla Oynama + Pas İsabeti)
  const posScore=Math.max(0,Math.min(100,((mPos-30)/40)*100));
  const pasScore=Math.max(0,Math.min(100,((mPass-65)/28)*100));
  const ctrl=cl(posScore*0.55+pasScore*0.45);
  // 3. Savunma Direnci (Rakip xG %50 + Rakip Şut Kalitesi %25 + Rakip İsabetli Şut %25)
  const oxgScore=Math.max(0,Math.min(100,((2.30-oXg)/1.80)*100));
  const oQual=oShots>0?oXg/oShots:0.13;
  const oQualScore=Math.max(0,Math.min(100,((0.24-oQual)/0.18)*100));
  const oSotScore=Math.max(0,Math.min(100,((8.5-oSot)/7.0)*100));
  const aggr=cl(oxgScore*0.50+oQualScore*0.25+oSotScore*0.25);
  // 4. Bitiricilik Verimi (Maç başı Gol - xG + Şut dönüşümü)
  const totGf=src.reduce((a,m)=>a+(+m.gf||0),0);
  const xgSrc=src.filter(m=>m.stats&&m.stats.myXg!=null);
  const totGfXg=xgSrc.reduce((a,m)=>a+(+m.gf||0),0);
  const totXg=xgSrc.reduce((a,m)=>a+(+m.stats.myXg||0),0);
  const totSh=src.reduce((a,m)=>a+(m.stats.myShots!=null?+m.stats.myShots:10),0);
  const gxRatio=(xgSrc.length&&totXg>0.2)?totGfXg/totXg:1;
  const finPm=xgSrc.length?(totGfXg-totXg)/xgSrc.length:0;
  const conv=totSh>0?totGf/totSh:0.14;
  const effRaw=55+finPm*65+(conv-0.14)*115;
  const eff=cl(effRaw);
  // xPts & Kaleci Kurtarış metrikleri (16 profilli matris için)
  const xaSrc=src.filter(m=>m.stats&&m.stats.myXg!=null&&m.stats.oppXg!=null);
  const xgPairCnt=xaSrc.length;
  const actPtsPm=xgPairCnt?xaSrc.reduce((a,m)=>{const r=mres(m);return a+(r=="w"?3:r=="d"?1:0)},0)/xgPairCnt:1.5;
  const xPtsPm=xgPairCnt?xaSrc.reduce((a,m)=>{const xp=calcMatchXpts(m.stats.myXg,m.stats.oppXg);return a+(xp?xp.xPts:1.5)},0)/xgPairCnt:1.5;
  const xptsDeltaPm=actPtsPm-xPtsPm;
  const gkSavePm=xgPairCnt?(xaSrc.reduce((a,m)=>a+(+m.stats.oppXg||0)-(+m.ga||0),0)/xgPairCnt):0;
  const xgPerShot=mShots>0?mXg/mShots:0.13;
  // 16 Profilli Uygunluk Skoru Matrisi + İkincil Tarz Etiketi
  const profs=[];
  const addP=(sc,title,icon,desc)=>{if(sc>0)profs.push({sc,title,icon,desc})};
  if(atk>=68&&ctrl>=68&&aggr>=68&&eff>=65&&mPos<61)
    addP(98+(atk+ctrl+aggr+eff-269)*0.25,"Toplam Futbol Mimarı",uiIco("trophy"),"Hücum, pas kontrolü, savunma direnci ve bitiricilikte dört eksende birden elit seviye yakalayan komple futbol ekolü.");
  if(mPos>=56&&mPass>=85&&ctrl>=68)
    addP(78+(mPos-56)*2.6+(mPass-85)*2.0+Math.max(0,ctrl-atk)*0.6,"Tiki-Taka Ustası",uiIco("play"),`Topa hükmeden (%${Math.round(mPos)}), yüksek pas isabetiyle (%${Math.round(mPass)}) oyunu rakip yarı sahaya yıkan pas ustası.`);
  if(mPos>=52&&mPos<60&&xgPerShot>=0.165&&atk>=52)
    addP(74+(mPos-52)*1.5+(xgPerShot-0.165)*260,"Pozisyon Oyunu Mimarı",uiIco("compass"),`Topu sabırla dolaştırıp şut başına ${xgN2(xgPerShot)} xG ile yüksek kaliteli net fırsatlar üreten modern oyun kurgusu.`);
  if(mPos>=50&&mPos<57&&mPass>=83&&aggr>=52)
    addP(66+(mPass-83)*2.0+(aggr-52)*0.4,"Kontrollü Oyun Kurucu",uiIco("compass"),`Topu ayağında güvenli tutup (%${Math.round(mPass)} pas) savunma dengesini bozmadan maçı sakin yöneten menajer.`);
  if(atk>=62&&aggr>=62&&mShots>=12&&oShots<=9.5&&mPos<58)
    addP(78+(atk-62)*0.85+(aggr-62)*0.85,"Gegenpressing Mimarı",uiIco("flame"),`Önde yoğun baskı, maç başı ${xgN1(mShots)} şut temposu ve rakibi ${xgN1(oShots)} şutta boğan yüksek enerjili pres ekolü.`);
  if(mXg>=1.65&&oXg>=1.45)
    addP(80+(mXg-1.65)*22+(oXg-1.45)*20,"Heavy Metal (Kaotik Hücum)",uiIco("bolt"),`İki kalede de fırtına koparan (${xgN2(mXg)} vs ${xgN2(oXg)} xG), riski yüksek ve gollü açık futbol anlayışı.`);
  if(mShots>=12&&atk>=ctrl+10)
    addP(68+(mShots-12)*2.0+(atk-ctrl-10)*0.7,"Direkt Hücumcu",uiIco("rocket"),`Pas dolaştırmak yerine doğrudan kaleyi düşünen, maç başı ${xgN1(mShots)} şutla ceza sahasını zorlayan dikine oyun.`);
  if(mPos<=47.5&&(atk>=48||xgPerShot>=0.16||eff>=62))
    addP(75+(47.5-mPos)*1.8+Math.max(0,xgPerShot-0.15)*140+Math.max(0,eff-60)*0.45,"Kontra Atak Dehası",uiIco("bolt"),`Topu rakibe bırakıp (%${Math.round(mPos)}) kapılan toplarla saniyeler içinde tehlikeli geçiş ve skor üreten taktikçi.`);
  if(oXg<=0.95&&aggr>=68&&mPos<=47.5)
    addP(78+(0.95-oXg)*35+(aggr-68)*0.8,"Catenaccio (Katı Savunma)",uiIco("shield"),`Rakibi maç başı yalnızca ${xgN2(oXg)} xG’de kilitleyen, önce kalesini güvenceye alan disiplinli savunma okulu.`);
  if(xgPairCnt>=2&&oXg>=1.35&&gkSavePm>=0.35)
    addP(76+(gkSavePm-0.35)*42+(oXg-1.35)*10,"Duvar Arkası (Kaleci Kalkanı)",uiIco("shield"),`Kalede yüksek rakip xG’sine (${xgN2(oXg)}) rağmen maç başı ${xgN2(gkSavePm)} gol önleyerek ayakta kalan dirençli yapı.`);
  if(xgSrc.length>=2&&finPm>=0.25&&eff>=72)
    addP(76+(finPm-0.25)*38+(eff-72)*0.6,"Klinik Bitirici",uiIco("boot"),`Bulduğu fırsatları beklenenin çok üstünde (+${xgN2(finPm)} Gol/M) gole çeviren soğukkanlı bitiricilik uzmanı.`);
  if(xgPairCnt>=2&&xptsDeltaPm>=0.28&&actPtsPm>=1.5)
    addP(73+(xptsDeltaPm-0.28)*48,"Sonuç Odaklı Pragmatist",uiIco("trophy"),`xG üstünlüğü kurmasa da skoru almayı bilen; maç başı beklenenden +${xgN2(xptsDeltaPm)} fazla puan toplayan realist menajer.`);
  if(xgSrc.length>=2&&mXg>=1.55&&finPm<=-0.25)
    addP(84+(mXg-1.55)*20+(-finPm-0.25)*45,"İsrafçı Dominant",uiIco("spark"),`Maç başı ${xgN2(mXg)} xG ile oyunu domine edip bol pozisyon üreten ama bitiricilikte (${xgS2(finPm)}/M) puan bırakan yapı.`);
  if(mXg<=1.05&&oXg<=1.05&&mPos>=45)
    addP(76+(1.05-mXg)*28+(1.05-oXg)*28,"Kısır / Kilitli Oyun",uiIco("sliders"),`Hem kendi (${xgN2(mXg)}) hem rakip (${xgN2(oXg)}) xG’sinin düşük kaldığı, pozisyonun az olduğu kilitli satranç maçları.`);
  if(mXg<=1.05&&oXg>=1.55)
    addP(82+(1.05-mXg)*22+(oXg-1.55)*24,"Kırılgan Yapı (Savunma Alarmı)",uiIco("bug"),`Hücum üretimi düşük (${xgN2(mXg)} xG), kalede verilen pozisyon yüksek (${xgN2(oXg)} rakip xG); savunma ve üretim dengesi acil öncelik.`);
  if(!profs.length)
    addP(50,"Dengeli Taktisyen",uiIco("dna"),"Savunma ile hücumu dengede tutan, rakibe ve skora göre strateji değiştirebilen esnek menajer.");
  profs.sort((a,b)=>b.sc-a.sc);
  const {title,icon,desc}=profs[0];
  let subTag="";
  if(profs.length>=2&&profs[1].sc>=70)subTag=profs[1].title;
  else if(xgSrc.length>=2&&finPm>=0.22)subTag="Keskin Bitirici";
  else if(xgSrc.length>=2&&finPm<=-0.22)subTag="Bitiricilik Baskısı";
  else if(xgPairCnt>=2&&gkSavePm>=0.30)subTag="Kaleciye Güvenen";
  else if(xgPairCnt>=2&&xptsDeltaPm>=0.25)subTag="Skor Odaklı";
  else if(xgPairCnt>=2&&xptsDeltaPm<=-0.25)subTag="Şanssız Seri";
  const xgDiff=xgSrc.length?(totGfXg-totXg):0;
  const unluckyCnt=src.filter(m=>{const d=matchDeserve(m);return d&&d.k=="unlucky"}).length;
  const stealCnt=src.filter(m=>{const d=matchDeserve(m);return d&&d.k=="undeserved"}).length;
  const deservedCnt=src.filter(m=>{const d=matchDeserve(m);return d&&d.k=="deserved"}).length;
  const fairCnt=Math.max(0,xgPairCnt-(unluckyCnt+stealCnt+deservedCnt));
  const cntK=fn=>src.filter(m=>fn(m)!=null).length;
  const covd={pos:cntK(m=>m.stats.myPos),pass:cntK(m=>m.stats.myPass),shots:cntK(m=>m.stats.myShots),sot:cntK(m=>m.stats.mySot),xg:cntK(m=>m.stats.myXg),oShots:cntK(m=>m.stats.oppShots),oSot:cntK(m=>m.stats.oppSot),oXg:cntK(m=>m.stats.oppXg)};
  const miss=[["Topla oynama",covd.pos],["Pas isabeti",covd.pass],["Şut",covd.shots],["İsabetli şut",covd.sot],["xG",covd.xg],["Rakip şutu",covd.oShots],["Rakip xG",covd.oXg]].filter(x=>!x[1]).map(x=>x[0]);
  return{n,scope:scopeLbl,isCareer,atk,ctrl,aggr,eff,title,subTag,desc,icon,mPos,mPass,mShots,mSot,mXg,oShots,oXg,mGf,mGa,oSot,conv,gxRatio,finPm,miss,cov:covd,xgDiff,xgPairCnt,fairCnt,unluckyCnt,stealCnt,deservedCnt};
}
function radarSvg(dna){
  const W=240,H=220,cx=120,cy=110,R=72;
  const pts=[[0,-1,"HÜCUM",dna.atk],[1,0,"KONTROL",dna.ctrl],[0,1,"DİRENÇ",dna.aggr],[-1,0,"BİTİRİCİLİK",dna.eff]];
  const rings=[0.25,0.5,0.75,1].map(k=>{
    const r=R*k;
    return `<polygon points="${cx},${cy-r} ${cx+r},${cy} ${cx},${cy+r} ${cx-r},${cy}" fill="none" stroke="var(--bd)" stroke-width="${k==1?1.5:1}" stroke-dasharray="${k<1?"2 2":"0"}"/>`;
  }).join("");
  const axes=`<line x1="${cx}" y1="${cy-R}" x2="${cx}" y2="${cy+R}" stroke="var(--bd)" stroke-width="1"/><line x1="${cx-R}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="var(--bd)" stroke-width="1"/>`;
  const poly=pts.map(([dx,dy,,v])=>{const r=R*(v/100);return `${(cx+dx*r).toFixed(1)},${(cy+dy*r).toFixed(1)}`}).join(" ");
  const dots=pts.map(([dx,dy,,v])=>{const r=R*(v/100);return `<circle cx="${(cx+dx*r).toFixed(1)}" cy="${(cy+dy*r).toFixed(1)}" r="4.5" fill="var(--gold)" stroke="var(--card)" stroke-width="1.5"/>`}).join("");
  const labels=`
    <text x="${cx}" y="${cy-R-18}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--mut)">HÜCUM (${dna.atk})</text>
    <text x="${cx+R+8}" y="${cy+4}" text-anchor="start" font-size="10" font-weight="700" fill="var(--mut)">KONTROL (${dna.ctrl})</text>
    <text x="${cx}" y="${cy+R+22}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--mut)">DİRENÇ (${dna.aggr})</text>
    <text x="${cx-R-8}" y="${cy+4}" text-anchor="end" font-size="10" font-weight="700" fill="var(--mut)">BİTİRİCİLİK (${dna.eff})</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Taktiksel DNA Radar Grafiği">${rings}${axes}<polygon points="${poly}" fill="var(--ac)" fill-opacity=".24" stroke="var(--ac)" stroke-width="2.5"/>${dots}${labels}</svg>`;
}
/* ---------- v18.25: AÇIKLAYICI İSTATİSTİK KARTLARI (Oyun Tarzın + xG/xPts Analizi) ---------- */
const xgN1=v=>(+v).toFixed(1).replace(".",","),xgN2=v=>(+v).toFixed(2).replace(".",",");
const xgS1=v=>{const r=Math.round(v*10)/10;return (r>0?"+":"")+xgN1(r)},xgS2=v=>{const r=Math.round(v*100)/100;return (r>0?"+":"")+xgN2(r)};
function xgLvl(v){return v>=80?["Elit","l5"]:v>=65?["Çok iyi","l4"]:v>=50?["İyi","l3"]:v>=35?["Orta","l2"]:["Geliştirilmeli","l1"]}
const XGI={
  fin:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  pts:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.2 1 5.8L12 16.4 6.8 19.2l1-5.8-4.3-4.2 5.9-.9z"/></svg>',
  def:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5.5c0 4.5-3 8.2-7 9.5-4-1.3-7-5-7-9.5V6z"/></svg>',
  shot:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17l5-5 4 4 7-8"/><path d="M15 8h5v5"/></svg>',
  ctrl:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><circle cx="12" cy="6" r="2.5"/><path d="M7.5 15.8L10.8 8.3M16.5 15.8L13.2 8.3M8.5 18h7"/></svg>',
  hak:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16M5 8h14M7 8l-2.5 5h5zM17 8l-2.5 5h5z"/></svg>',
  tr:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16M6 15v-4M10 15V9M14 15v-6M18 15V6"/></svg>'
};
const xgTile=(v,l,sub,hint,cls)=>`<div class="xt${cls?" "+cls:""}"><span class="xtl">${l}</span><b>${v}</b>${sub?`<span class="xtsub">${sub}</span>`:""}${hint?`<em>${hint}</em>`:""}</div>`;
const xgSec=(t,d,body,fold,ic,pill)=>{
  if(!body)return "";
  const icon=ic&&XGI[ic]?`<span class="xshi">${XGI[ic]}</span>`:"";
  const txt=`<span class="xsht"><b>${t}</b>${d?`<small>${d}</small>`:""}</span>`;
  if(fold){
    const pHtml=pill?`<span class="xfpill">${esc(pill)}</span>`:"";
    return `<details class="xsec xfold"><summary class="xsh"><span class="xshl">${icon}${txt}</span><span class="xshr">${pHtml}<span class="xfc" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></span></span></summary><div class="xfb">${body}</div></details>`;
  }
  return `<div class="xsec"><div class="xsh"><span class="xshl">${icon}${txt}</span></div>${body}</div>`;
};
const xgVc=(d,th)=>d>=th?"pos":d<=-th?"neg":"neu";
function deserveWhy(m,d){
  d=d||matchDeserve(m);if(!d)return "";
  const r=mres(m),act=r=="w"?3:r=="d"?1:0,ad=xgN2(Math.abs(d.d)),pts=d.xPts!=null?` (beklenen ${xgN1(d.xPts)} puan, alınan ${act})`:"";
  if(d.k=="unlucky")return `Rakipten ${ad} xG fazla pozisyon bulmana rağmen ${r=="l"?"kaybettin":"kazanamadın"}${pts}.`;
  if(d.k=="undeserved")return r=="w"?`Rakip ${ad} xG daha fazla pozisyon buldu ama maçı sen aldın${pts}.`:`Rakip ${ad} xG daha tehlikeliydi, yine de bir puan kurtardın${pts}.`;
  if(d.k=="deserved")return `${ad} xG'lik pozisyon üstünlüğün skora yansıdı${pts}.`;
  return r=="l"&&d.d<=-.25?`Rakip daha çok ve daha net pozisyon buldu${pts}.`:`Pozisyonlar dengeliydi${pts}.`;
}
const DNAX={
  atk:{n:"Hücum Tehdidi",hi:"Rakip kaleyi sürekli yokluyorsun: çok şut çekiyor ve yüksek değerli (net) pozisyonlara giriyorsun.",mid:"Hücumun dengeli: fırsat üretiyorsun ama net pozisyon sayını artırma payı var.",lo:"Az şut çekiyor ya da düşük değerli pozisyonlara giriyorsun. Ceza sahasına daha çok girmek skoru yükseltir.",tip:"Yükseltmek için: daha çok şut, ceza sahası içinden ve isabetli şut."},
  ctrl:{n:"Top & Pas Kontrolü",hi:"Topu rakipten çok kullanıyor ve paslarını yerine ulaştırıyorsun; maçın temposunu sen belirliyorsun.",mid:"Top kontrolün dengede; maçın büyük bölümünde rakiple eşit oynuyorsun.",lo:"Top çoğunlukla rakipte ya da pas isabetin düşük. Kısa paslarla topu tutmak puanı artırır.",tip:"Yükseltmek için: topla oynama oranı (%30'dan %70'e) ve pas isabeti (%65'ten %93'e)."},
  aggr:{n:"Savunma Direnci",hi:"Rakibi çok düşük xG’de tutuyor, ceza sahasına sokmuyor ve kaleye gelen isabetli şutları kısıtlıyorsun.",mid:"Savunman orta seviyede; rakibe zaman zaman tehlikeli xG fırsatları verebiliyorsun.",lo:"Rakip yüksek xG ve net şut fırsatları buluyor. Blokları daraltıp ceza sahası şutlarını kesmek puanı yükseltir.",tip:"Yükseltmek için: rakibin xG’sini (%50), şut başına xG kalitesini (%25) ve isabetli şutlarını (%25) düşür."},
  eff:{n:"Bitiricilik Verimi",hi:"Pozisyonları gole çevirmede çok iyisin: beklenenden fazla gol atıyorsun.",mid:"Bitiriciliğin pozisyonlarınla uyumlu; ne şanslı ne şanssızsın.",lo:"Pozisyonlar gole dönüşmüyor, beklenenden az gol atıyorsun. Sakin ve köşeye vuruş denemeye değer.",tip:"Yükseltmek için: gol / xG oranı ve gol / şut oranı yüksek olmalı."}
};
const DNASH={atk:"Hücum",ctrl:"Kontrol",aggr:"Direnç",eff:"Bitiricilik"};
const DNAI={
  atk:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  ctrl:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><circle cx="12" cy="6" r="2.5"/><path d="M7.5 15.8L10.8 8.3M16.5 15.8L13.2 8.3M8.5 18h7"/></svg>',
  aggr:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5.5c0 4.5-3 8.2-7 9.5-4-1.3-7-5-7-9.5V6z"/><path d="M9.5 12.2l1.8 1.8 3.6-3.8"/></svg>',
  eff:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2L4.5 13.5h6L9.5 22 19.5 10.5h-6z"/></svg>'
};
const DHKI={
  ok:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8.5 12.3l2.3 2.4 4.8-5"/></svg>',
  st:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5.5c0 4.5-3 8.2-7 9.5-4-1.3-7-5-7-9.5V6z"/></svg>',
  un:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4L3.5 19h17z"/><path d="M12 10v4M12 16.8v.4"/></svg>'
};
function tacticalDeltaHtml(s){
  if(!s)return "";
  const curM=(s.mt||[]).filter(m=>m.stats);
  if(!curM.length)return "";
  const idx=store.seasons.findIndex(x=>x.id===s.id);
  let prevS=null;
  for(let k=(idx>0?idx-1:store.seasons.length-1);k>=0;k--){
    if(store.seasons[k].id!==s.id&&(store.seasons[k].mt||[]).some(m=>m.stats)){prevS=store.seasons[k];break}
  }
  if(!prevS)return "";
  const prevM=(prevS.mt||[]).filter(m=>m.stats);
  const avgM=(arr,fn)=>{const v=arr.map(fn).filter(x=>x!=null&&Number.isFinite(x));return v.length?v.reduce((a,b)=>a+b,0)/v.length:null};
  const xgs=arr=>{const sh=arr.filter(m=>m.stats.myShots>0&&m.stats.myXg!=null);const ts=sh.reduce((a,m)=>a+m.stats.myShots,0);return ts>0?sh.reduce((a,m)=>a+(+m.stats.myXg||0),0)/ts:null};
  const fin=arr=>{const xm=arr.filter(m=>m.stats.myXg!=null);return xm.length?xm.reduce((a,m)=>a+((+m.gf||0)-(+m.stats.myXg||0)),0)/xm.length:null};
  const metrics=[
    ["Topla Oynama",avgM(curM,m=>m.stats.myPos),avgM(prevM,m=>m.stats.myPos),v=>"%"+Math.round(v),d=>(d>0?"+":"")+Math.round(d),1],
    ["Pas İsabeti",avgM(curM,m=>m.stats.myPass),avgM(prevM,m=>m.stats.myPass),v=>"%"+Math.round(v),d=>(d>0?"+":"")+Math.round(d),1],
    ["xG / Şut",xgs(curM),xgs(prevM),v=>xgN2(v),d=>xgS2(d),0.015],
    ["Bitiricilik/M",fin(curM),fin(prevM),v=>xgS2(v),d=>xgS2(d),0.08]
  ].filter(x=>x[1]!=null&&x[2]!=null);
  if(!metrics.length)return "";
  const cells=metrics.map(([lbl,cV,pV,fmtV,fmtD,th])=>{
    const d=cV-pV,cls=d>=th?"pos":d<=-th?"neg":"neu",arr=d>=th?"↑":d<=-th?"↓":"=";
    return `<div class="tdel-c"><span>${lbl}</span><b>${fmtV(cV)}</b><em class="${cls}">${arr} ${fmtD(d)}</em></div>`;
  }).join("");
  return `<div class="tdel-box"><div class="tdel-h"><b>Sezon Gelişimi</b><small>${esc(prevS.name)} → ${esc(s.name)}</small></div><div class="tdel-g">${cells}</div></div>`;
}
function tacticalDnaCard(s,careerOpt){
  const isCareer=!!(careerOpt&&careerOpt.career);
  const dna=calcTacticalDNA(s,isCareer?careerOpt:false);
  if(!dna){
    return `<div class="dnacard"><div class="dnahd"><h3 class="ui-lbl" style="margin:0">${uiIco("dna")}<span>${isCareer?"Genel Menajer Profili":"Oyun Tarzın & Menajer Kimliği"}</span></h3><span class="lb">${isCareer?"Kariyer Analizi":"Taktiksel Analiz"}</span></div><div class="note" style="margin:6px 0">Maç skoru girerken <b>“Gelişmiş İstatistik Ekle”</b> bölümünden girdiğin verilerle (Topla Oynama, Şut, Pas, xG) ${isCareer?"tüm kariyerindeki genel menajer profilini":"nasıl bir futbol oynadığını"} 100 üzerinden puanlar ve menajer kimliğini belirler.</div></div>`;
  }
  const xd=xgS2(dna.xgDiff),effCol=dna.xgDiff>=0?"pos":"neg";
  const ax=[
    {k:"atk",v:dna.atk,pills:[[xgN1(dna.mShots),"Şut/M"],[xgN1(dna.mSot),"İsabet"],[xgN2(dna.mXg),"xG/M"]]},
    {k:"ctrl",v:dna.ctrl,pills:[["%"+Math.round(dna.mPos),"Topla Oynama"],["%"+Math.round(dna.mPass),"Pas İsabeti"]]},
    {k:"aggr",v:dna.aggr,pills:[[xgN1(dna.oShots),"Rakip Şut"],[xgN1(dna.oSot),"İsabet"],[xgN2(dna.oXg),"Rakip xG"]]},
    {k:"eff",v:dna.eff,pills:[[xd,"Gol − xG",effCol],["%"+Math.round(dna.conv*100),"Şut Dönüşümü"]]}
  ];
  const srt=ax.slice().sort((a,b)=>b.v-a.v),best=srt[0],worst=srt[srt.length-1];
  const items=ax.map(a=>{
    const d=DNAX[a.k],lv=xgLvl(a.v),tier=a.v>=65?"hi":a.v>=45?"mid":"lo";
    const pills=a.pills.map(([val,lbl,cls])=>`<span class="dnam${cls?" "+cls:""}"><b>${val}</b><em>${lbl}</em></span>`).join("");
    return `<div class="dnaitem ${lv[1]}">
      <div class="dnai-hd">
        <span class="dnai-ic">${DNAI[a.k]}</span>
        <div class="dnai-tt"><b>${d.n}</b><span class="dlv ${lv[1]}">${lv[0]}</span></div>
        <div class="dnasc"><b>${a.v}</b><small>/100</small></div>
      </div>
      <div class="dnamets">${pills}</div>
      <div class="dnabar" role="progressbar" aria-label="${d.n}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${a.v}">
        <i style="width:${a.v}%"></i>
        <s style="left:35%"></s><s style="left:50%"></s><s style="left:65%"></s><s style="left:80%"></s>
      </div>
      <div class="dnx">${d[tier]}</div>
      <details class="dnatip"><summary>Nasıl yükselir?</summary><p>${d.tip}</p></details>
    </div>`;
  }).join("");
  const cf=dna.n>=8?["Yüksek güven","l4"]:dna.n>=3?["Orta güven","l3"]:["Erken sinyal","l1"];
  const notes=[];
  if(dna.n<3)notes.push(`Erken sinyal: yalnızca ${dna.n} maçlık veri var; menajer kimliği en az 3 maçta netleşir.`);
  if(dna.miss&&dna.miss.length)notes.push(`Hiç girilmeyen veriler (${dna.miss.join(", ")}) için nötr varsayılan değer kullanıldı.`);
  const totDes=dna.deservedCnt+dna.stealCnt+dna.unluckyCnt,pairN=dna.xgPairCnt||totDes;
  const dhkBar=totDes>0?`<div class="dhkbar" role="img" aria-label="Hak ediş dağılımı: ${dna.deservedCnt} hak edilmiş, ${dna.stealCnt} şanslı, ${dna.unluckyCnt} şanssız">${dna.deservedCnt?`<i class="ok" style="flex:${dna.deservedCnt}"></i>`:""}${dna.stealCnt?`<i class="st" style="flex:${dna.stealCnt}"></i>`:""}${dna.unluckyCnt?`<i class="un" style="flex:${dna.unluckyCnt}"></i>`:""}</div>`:"";
  const subHtml=dna.subTag?`<div class="dnasub"><span>İkincil tarz:</span> <b>${esc(dna.subTag)}</b></div>`:"";
  return `<div class="dnacard">
    <div class="dnahd"><div><div class="lb" style="text-transform:uppercase;letter-spacing:.05em;font-weight:700">${isCareer?"Genel Menajer Profili":"Oyun Tarzın"} · ${esc(dna.scope)}</div><div class="dnabdg" style="margin-top:4px"><span>${dna.icon}</span><span>${esc(dna.title)}</span></div>${subHtml}</div><span class="dlv ${cf[1]}" title="Puanların kaç maça dayandığına göre güven düzeyi">${cf[0]} · ${dna.n} maç</span></div>
    <div class="note" style="margin:0 0 10px">${esc(dna.desc)}</div>
    <div class="dnasum"><span class="ui-lbl">${uiIco("up")}<span>En güçlü: <b>${DNASH[best.k]}</b> (${best.v})</span></span><span class="ui-lbl">${uiIco("wrench")}<span>Geliştirilecek: <b>${DNASH[worst.k]}</b> (${worst.v})</span></span></div>
    <div class="dnagrid">
      <div class="dnaradar">${radarSvg(dna)}</div>
      <div class="dnalist">${items}</div>
    </div>
    ${isCareer?"":tacticalDeltaHtml(s)}
    <div class="dhkbox">
      <div class="dhkh"><b>Maç sonuçların hak edildi mi?</b>${pairN?`<span class="lb">${pairN} xG maçı</span>`:""}</div>
      ${dhkBar}
      <div class="dhk3">
        <div class="dhkc ok${dna.deservedCnt?"":" z"}"><span class="dhki">${DHKI.ok}</span><b>${dna.deservedCnt}</b><span>Hak Edilmiş</span></div>
        <div class="dhkc st${dna.stealCnt?"":" z"}"><span class="dhki">${DHKI.st}</span><b>${dna.stealCnt}</b><span>Şanslı</span></div>
        <div class="dhkc un${dna.unluckyCnt?"":" z"}"><span class="dhki">${DHKI.un}</span><b>${dna.unluckyCnt}</b><span>Şanssız</span></div>
      </div>
      <div class="note" style="margin:6px 0 0">${dna.fairCnt?`Diğer <b>${dna.fairCnt} maç</b> dengeli veya beklenen sonuçla bitti. `:""}Her maçta toplam xG’ye orantılı farkla hesaplanır; ayrıntı için aşağıdaki xG analizine bak.</div>
    </div>
    ${notes.length?`<div class="note dnawarn">${notes.map(esc).join(" ")}</div>`:""}
    <details class="xgl"><summary>Puanlar nasıl hesaplanıyor?</summary><dl>
      <div><dt>Puan Ölçeği (0–100)</dt><dd><b>35 altı</b> Geliştirilmeli · <b>35–49</b> Orta · <b>50–64</b> İyi · <b>65–79</b> Çok iyi · <b>80+</b> Elit.</dd></div>
      <div><dt>Hücum Tehdidi</dt><dd>Maç başı şut sayısı (%40; 16 şut = tam puan) + xG (%45; 3,0 xG = tam puan) + isabetli şut (%15; 9 isabetli şut = tam puan).</dd></div>
      <div><dt>Top & Pas Kontrolü</dt><dd>Topla oynama (%55; %30 = 0 puan, %70 = tam puan) + pas isabeti (%45; %65 = 0 puan, %93 = tam puan).</dd></div>
      <div><dt>Savunma Direnci</dt><dd>Rakip xG’sini baskılama (%50; 0,50 xG = tam puan) + rakip şut kalitesini düşürme (%25) + rakip isabetli şutunu kısıtlama (%25).</dd></div>
      <div><dt>Bitiricilik Verimi</dt><dd>Maç başı (Gol − xG) farkı ve gol / şut dönüşümü. Beklentiyle aynı gol sayısı yaklaşık 55 puan verir; fazlası puanı yükseltir.</dd></div>
      <div><dt>Hangi maçlar sayılır?</dt><dd>${isCareer?"Kariyerindeki (ve varsa seçili zorluk filtresindeki) istatistik girilmiş tüm maçlar genel menajer profiline dahil edilir.":"Bu sezonda istatistik girilmiş tüm maçlar dahil edilir. Bu sezonda henüz veri yoksa tüm kariyerin kullanılır."}</dd></div>
    </dl></details>
  </div>`;
}

function xgTrendSvg(arr){
  const W=300,H=136,pl=6,pr=6,pt=16,pb=24,n=arr.length;
  const mx=Math.max(1,...arr.flatMap(m=>[+m.stats.myXg||0,+m.stats.oppXg||0])),sl=(W-pl-pr)/n,bw=Math.max(5,Math.min(14,sl*.34)),hh=H-pt-pb;
  const defs=`<defs><linearGradient id="xgA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--ac)"/><stop offset="100%" stop-color="var(--ac)" stop-opacity=".42"/></linearGradient><linearGradient id="xgB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f97316"/><stop offset="100%" stop-color="#f97316" stop-opacity=".42"/></linearGradient></defs>`;
  const midY=(pt+hh/2).toFixed(1);
  const bars=arr.map((m,i)=>{
    const cx=pl+sl*(i+.5),a=(+m.stats.myXg||0),b=(+m.stats.oppXg||0),ha=a/mx*hh,hb=b/mx*hh,r=mres(m),L={w:"G",d:"B",l:"M"}[r];
    return `<g><title>${esc(m.on)} ${m.gf}–${m.ga} · xG ${xgN2(a)} – ${xgN2(b)}</title><rect x="${(cx-bw-1).toFixed(1)}" y="${(pt+hh-ha).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(2,ha).toFixed(1)}" rx="3" fill="url(#xgA)"/><rect x="${(cx+1).toFixed(1)}" y="${(pt+hh-hb).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(2,hb).toFixed(1)}" rx="3" fill="url(#xgB)"/><text class="${r}" x="${cx.toFixed(1)}" y="${H-8}" text-anchor="middle" font-weight="700">${L}</text></g>`;
  }).join("");
  return `<div class="svgbox"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Maç maç xG karşılaştırması">${defs}<line x1="${pl}" y1="${midY}" x2="${W-pr}" y2="${midY}" stroke-dasharray="3 3" opacity=".6"/><line x1="${pl}" y1="${pt+hh}" x2="${W-pr}" y2="${pt+hh}"/><text x="${pl}" y="10" text-anchor="start">en yüksek ${xgN1(mx)} xG</text>${bars}</svg></div>`;
}

function xgSummaryCard(ML){
  ML=(ML||[]).filter(Boolean);
  const totalM=ML.length,hasSt=m=>m.stats&&typeof m.stats=="object",A=ML.filter(hasSt);
  if(!A.length)return "";
  const L=A.filter(m=>m.stats.myXg!=null),shAll=A.filter(m=>m.stats.myShots!=null&&m.stats.myShots>0),gkAll=A.filter(m=>m.stats.oppSot!=null);
  const posL=A.filter(m=>m.stats.myPos!=null),pasL=A.filter(m=>m.stats.myPass!=null);
  if(!L.length&&!shAll.length&&!gkAll.length&&!posL.length&&!pasL.length)return "";
  const sumF=(arr,f)=>arr.reduce((a,m)=>a+f(m),0),avgF=(arr,f)=>arr.length?sumF(arr,f)/arr.length:null;
  const gf=m=>+m.gf||0,ga=m=>+m.ga||0,pts=m=>{const r=mres(m);return r=="w"?3:r=="d"?1:0};
  const n=L.length,totGf=sumF(L,gf),totXg=sumF(L,m=>+m.stats.myXg||0),diff=totGf-totXg;
  const XA=L.filter(m=>m.stats.oppXg!=null),nx=XA.length;
  const xaX=sumF(XA,m=>+m.stats.oppXg||0),xaGa=sumF(XA,ga),xaMyX=sumF(XA,m=>+m.stats.myXg||0);
  const totXpts=sumF(XA,m=>calcMatchXpts(m.stats.myXg,m.stats.oppXg).xPts),actPts=sumF(XA,pts),xpDiff=actPts-totXpts;
  const avgPos=avgF(posL,m=>m.stats.myPos),avgPas=avgF(pasL,m=>m.stats.myPass);
  const oppPasL=A.filter(m=>m.stats.oppPass!=null),avgOppPas=avgF(oppPasL,m=>m.stats.oppPass),oppPosAvg=avgPos!=null?100-avgPos:null;
  const totSh=sumF(shAll,m=>m.stats.myShots),totShGf=sumF(shAll,gf);
  const shXg=shAll.filter(m=>m.stats.myXg!=null),totShXg=sumF(shXg,m=>+m.stats.myXg||0),totShXgCnt=sumF(shXg,m=>m.stats.myShots);
  const sotL=shAll.filter(m=>m.stats.mySot!=null),totSot=sumF(sotL,m=>m.stats.mySot),totShForSot=sumF(sotL,m=>m.stats.myShots);
  const xgPSv=totShXgCnt>0?totShXg/totShXgCnt:null,sotV=totShForSot>0?totSot/totShForSot*100:null,convV=totSh>0?totShGf/totSh*100:null;
  const avgSh=shAll.length?totSh/shAll.length:null,avgSot=sotL.length?totSot/sotL.length:null;
  const SD=A.filter(m=>m.stats.myShots!=null&&m.stats.oppShots!=null),shDiff=avgF(SD,m=>m.stats.myShots-m.stats.oppShots);
  const oppShL=A.filter(m=>m.stats.oppShots!=null),avgOppSh=avgF(oppShL,m=>m.stats.oppShots),oppSotL=A.filter(m=>m.stats.oppSot!=null),avgOppSot=avgF(oppSotL,m=>m.stats.oppSot);
  const totOppSot=sumF(gkAll,m=>Math.max(0,+m.stats.oppSot||0)),totSaves=sumF(gkAll,m=>Math.max(0,(+m.stats.oppSot||0)-ga(m))),gkV=totOppSot>0?totSaves/totOppSot*100:null;
  const cs=A.filter(m=>ga(m)==0).length,posG=posL.length&&avgPos>0?avgF(posL,gf)/(avgPos/50):null;
  const covCnt=Math.max(n,shAll.length,gkAll.length,posL.length,pasL.length);
  const D=XA.map(m=>({m,d:matchDeserve(m)})).filter(x=>x.d);
  // --- Koç notları (tek birleşik cam kart + özel SVG ikonlar) ---
  const ins=[];
  const finPm=n?diff/n:0,avgMyXg=n?totXg/n:0;
  if(n>=2){
    if(finPm>=.18&&diff>=.5)ins.push(["pos","fin",`<b>Bitiriciliğin güçlü:</b> ${xgN1(totXg)} xG'lik pozisyondan ${totGf} gol çıkardın (${xgS2(diff)}, maç başı ${xgS2(finPm)}).`]);
    else if(finPm<=-.18&&diff<=-.5)ins.push(["neg","fin",`<b>Bitiricilik beklentinin altında:</b> ${xgN1(totXg)} xG'ye karşı ${totGf} gol (${xgS2(diff)}, maç başı ${xgS2(finPm)}). Sakin bitirmeye odaklan.`]);
    else if(avgMyXg<1.0)ins.push(["neu","fin",`<b>Bitiricilik normal ama üretim düşük:</b> ${totGf} gol, ${xgN1(totXg)} xG (maç başı ${xgN2(avgMyXg)} xG). Öncelik daha fazla net pozisyon üretmek.`]);
    else ins.push(["neu","fin",`<b>Gollerin pozisyonlarınla uyumlu:</b> ${totGf} gol, ${xgN1(totXg)} xG (maç başı ${xgS2(finPm)}). Belirgin bir sapma yok.`]);
  }
  if(nx>=2){
    if(xpDiff>=1.5)ins.push(["pos","pts",`<b>Puanların oyununun önünde:</b> beklenen ${xgN1(totXpts)} puana karşı ${actPts} topladın (${xgS1(xpDiff)}).`]);
    else if(xpDiff<=-1.5)ins.push(["neg","pts",`<b>Hak ettiğinden az puan topladın:</b> beklenen ${xgN1(totXpts)} puana karşı ${actPts} (${xgS1(xpDiff)}). Oyununu bozma.`]);
    else ins.push(["neu","pts",`<b>Puanların oyununla uyumlu:</b> ${xgN1(totXpts)} puan beklenirken ${actPts} topladın.`]);
    const dd=xaX-xaGa;
    if(dd>=.75)ins.push(["pos","def",`<b>Savunma beklentinin üstünde:</b> rakip ${xgN1(xaX)} xG buldu, sen ${xaGa} gol yedin (${xgN1(dd)} gol önlendi).`]);
    else if(dd<=-.75)ins.push(["neg","def",`<b>Beklenenden fazla gol yedin:</b> rakip ${xgN1(xaX)} xG'den ${xaGa} gol buldu (${xgN1(-dd)} fazla).`]);
  }
  if(xgPSv!=null){
    if(xgPSv>=.2)ins.push(["pos","fin",`<b>Net pozisyondan şut çekiyorsun:</b> şut başına ${xgN2(xgPSv)} xG ile yüksek gol olasılığı yakalıyorsun.`]);
    else if(xgPSv<.1)ins.push(["neg","fin",`<b>Şut kalitesi düşük:</b> şut başına ${xgN2(xgPSv)} xG. Ceza sahasına girip şut çekmek bunu yükseltir.`]);
  }
  if(shDiff!=null&&Math.abs(shDiff)>=2)ins.push([shDiff>0?"pos":"neg","shot",shDiff>0?`<b>Şut üstünlüğün var:</b> rakipten maç başı ${xgN1(shDiff)} şut fazla çekiyorsun.`:`<b>Rakip daha çok şut çekiyor:</b> maç başı ${xgN1(-shDiff)} şut geride kalıyorsun.`]);
  if(gkAll.length>=2&&gkV!=null){
    if(gkV>=75)ins.push(["pos","def",`<b>Kaleci çok iyi:</b> rakibin isabetli şutlarının %${Math.round(gkV)}'ini çıkardın.`]);
    else if(gkV<=55)ins.push(["neg","def",`<b>Kaleci kurtarışı düşük:</b> isabetli şutların yalnızca %${Math.round(gkV)}'i çıkarıldı.`]);
  }
  const insHtml=ins.length?`<div class="xinsbox"><div class="xinsh"><b>Koç Özeti</b><span>${Math.min(5,ins.length)} bulgu</span></div><ul class="xins">${ins.slice(0,5).map(([c,ic,t])=>`<li class="${c}"><span class="xini">${XGI[ic]||XGI.fin}</span><span class="xint">${t}</span></li>`).join("")}</ul></div>`:"";
  const vdCls=n?(finPm>=.18&&diff>=.5?"pos":finPm<=-.18&&diff<=-.5?"neg":"neu"):"neu";
  const statusTtl=!n?"Gelişmiş Analiz Hazır":vdCls=="pos"?"Mükemmel Bitiricilik":vdCls=="neg"?"Bitiricilik Sorunu":"Dengeli Bitiricilik";
  const statusSub=!n?"Girilen maç istatistiklerine göre özet çıkarıldı.":vdCls=="pos"?"Beklentinin üzerinde gol üretiyorsun.":vdCls=="neg"?"Üretilen pozisyonlara göre gol dönüşümü düşük kalıyor.":avgMyXg<1.0?"Bitiricilik normal; asıl odak daha fazla pozisyon (xG) üretmek.":"xG beklentisiyle paralel skor üretiyorsun.";
  const head=`<div class="xvd pxvd ${vdCls}"><span class="xvdi">${XGI.fin}</span><div class="xvdm"><b>${statusTtl}</b><span>${statusSub}</span><div class="xvdp"><span class="xvp"><b>${n}/${totalM}</b> xG maçı</span>${nx?`<span class="xvp"><b>${nx}</b> xPts maçı</span>`:""}${n?`<span class="xvp ${vdCls}"><b>${xgS2(diff)}</b> Gol−xG</span>`:""}</div></div></div>`;
  // --- 1. Gol beklentisi ---
  let gol="";
  if(n){
    const t=[xgTile(xgN1(totXg),"Üretilen xG",`gerçekte ${totGf} gol (${xgS2(diff)})`,vdCls=="pos"?"Beklentinin üstünde gol attın: bitiricilik çok iyi.":vdCls=="neg"?"Pozisyonlar golle sonuçlanmadı: bitiricilik düşük.":"Gol sayın pozisyonlarınla uyumlu.",vdCls)];
    if(nx){
      const gd=xaX-xaGa,xd=(xaMyX-xaX)/nx,sh=xaMyX+xaX>0?Math.round(xaMyX/(xaMyX+xaX)*100):null;
      t.push(xgTile(xgN1(xaX),"Yenen xG (rakibin xG'si)",`gerçekte ${xaGa} gol yedin (${xgS2(xaGa-xaX)})`,gd>=.75?"Beklenenden az gol yedin: savunma ve kaleci iyi.":gd<=-.75?"Beklenenden çok gol yedin: kaleci ya da savunma zayıf kaldı.":"Yediğin goller rakibin pozisyonlarıyla uyumlu.",xgVc(gd,.75)));
      t.push(xgTile(xgS2(xd),"xG Farkı (maç başı)",`toplam ${xgS2(xaMyX-xaX)}`,xd>=.3?"Pozisyon üretiminde rakipten üstünsün.":xd<=-.3?"Rakip senden daha çok pozisyon üretiyor.":"Pozisyon üretimi başa baş.",xgVc(xd,.3)));
      if(sh!=null)t.push(xgTile("%"+sh,"Pozisyon Payı",`senin xG'nin toplam içindeki payı`,sh>=55?"Net üstünlük: pozisyonların çoğu sende.":sh<=45?"Pozisyonların çoğu rakipte.":"Pozisyonlar dengeli paylaşılıyor.",sh>=55?"pos":sh<=45?"neg":"neu"));
    }
    gol=`<div class="xtg">${t.join("")}</div>`;
    if(nx&&xaMyX+xaX>0){const sh=xaMyX/(xaMyX+xaX)*100,shR=Math.round(sh);gol+=`<div class="xbarbox"><div class="xbarl"><span><b>${xgN1(xaMyX)}</b> xG <em>(%${shR} Sen)</em></span><span><em>(Rakip %${100-shR})</em> <b>${xgN1(xaX)}</b> xG</span></div><div class="xbar" role="img" aria-label="xG payı: sen ${xgN1(xaMyX)}, rakip ${xgN1(xaX)}"><i class="a" style="width:${sh.toFixed(1)}%"></i><i class="b" style="width:${(100-sh).toFixed(1)}%"></i></div></div>`;}
  }
  // --- 2. Beklenen puan ---
  let puan="";
  if(nx){
    const ppm=actPts/nx,xpm=totXpts/nx;
    puan=`<div class="xtg">${xgTile(xgN1(totXpts),"Beklenen Puan (xPts)",`gerçekte ${actPts} puan (${xgS1(xpDiff)})`,xpDiff>=1.5?"Oyunundan fazla puan topladın: biraz şans ya da etkinlik var.":xpDiff<=-1.5?"Oyununun hak ettiğinden az puan topladın: şanssızsın.":"Puan toplamın oyununla uyumlu.",xgVc(xpDiff,1.5))}${xgTile(xgN2(ppm),"Maç Başı Puan",`beklenen ${xgN2(xpm)}`,ppm>=2?"Çok yüksek puan ortalaması (3 = hep galibiyet).":ppm>=1.3?"Dengeli ve üst düzey bir puan ortalaman var.":"Puan ortalaman düşük; bir galibiyet ortalamayı belirgin yükseltir.",xgVc(ppm-xpm,.3))}</div>`;
  }
  // --- 3. Şut kalitesi ---
  let sut="";
  if(shAll.length){
    const t=[],expConv=xgPSv!=null?xgPSv*100:null;
    t.push(xgTile(convV!=null?"%"+Math.round(convV):"—","Şut Dönüşümü",`${totShGf}/${totSh} gol/şut`,expConv!=null?`Şut kalitene göre beklenen dönüşüm %${Math.round(expConv)}.`:"Şutların yüzde kaçı gol oluyor.",expConv!=null?xgVc(convV-expConv,3):"neu"));
    if(sotV!=null)t.push(xgTile("%"+Math.round(sotV),"Şut İsabeti",`${totSot}/${totShForSot} şut kaleyi buldu`,sotV>=50?"Şutların çoğu kaleyi buluyor.":"Şutların çoğu dışarı gidiyor; daha sakin ve seçici şut dene.",sotV>=50?"pos":sotV<35?"neg":"neu"));
    if(xgPSv!=null)t.push(xgTile(xgN2(xgPSv),"Şut Kalitesi",`şut başına xG`,xgPSv>=.2?"Şutların çoğu net pozisyondan.":xgPSv<.1?"Uzak, düşük kaliteli şutlar ağırlıkta.":"Orta kalitede şutlar çekiyorsun.",xgPSv>=.2?"pos":xgPSv<.1?"neg":"neu"));
    t.push(xgTile(xgN1(avgSh),"Maç Başı Şut",avgSot!=null?`${xgN1(avgSot)} isabetli`:`${shAll.length} maçta`,shDiff!=null?(shDiff>=2?`Rakipten maç başı ${xgN1(shDiff)} şut fazla.`:shDiff<=-2?`Rakipten maç başı ${xgN1(-shDiff)} şut az.`:"Rakiple benzer şut sayısı."):"Rakip şutu girilirse kıyas yapılır.",shDiff!=null?xgVc(shDiff,2):"neu"));
    sut=`<div class="xtg">${t.join("")}</div>`;
  }
  // --- 4. Savunma & kaleci ---
  let sav="";
  {
    const t=[];
    if(gkV!=null)t.push(xgTile("%"+Math.round(gkV),"Kaleci Kurtarış",`${totSaves}/${totOppSot} kurtarış`,gkV>=75?"Kaleci çok iyi: isabetli şutların çoğunu çıkarıyor.":gkV<=55?"Kaleci zayıf: isabetli şutların yarısından azı çıkıyor.":"Kaleci performansı normal.",gkV>=75?"pos":gkV<=55?"neg":"neu"));
    if(nx){const pv=xaX-xaGa;t.push(xgTile(xgS2(pv),"Önlenen Gol",`yenen xG − yenen gol`,pv>=.75?"Savunma ve kaleci sayesinde beklenenden az gol yedin.":pv<=-.75?"Beklenenden fazla gol yedin.":"Yediğin goller beklenenle uyumlu.",xgVc(pv,.75)));}
    if(avgOppSh!=null)t.push(xgTile(xgN1(avgOppSh),"Rakip Şutu (maç başı)",avgOppSot!=null?`${xgN1(avgOppSot)} isabetli`:`${oppShL.length} maçta`,avgOppSh<=8?"Rakibe az şut izni veriyorsun.":avgOppSh>=13?"Rakip çok şut çekiyor: savunma baskı altında.":"Rakip şut sayısı orta düzeyde.",avgOppSh<=8?"pos":avgOppSh>=13?"neg":"neu"));
    t.push(xgTile("%"+Math.round(cs/A.length*100),"Temiz Kasa",`${cs}/${A.length} maçta gol yemedin`,cs/A.length>=.4?"Kaleni sık sık kapatıyorsun.":cs===0?"Henüz gol yemediğin maç yok.":"Arada kaleni kapatabiliyorsun.",cs/A.length>=.4?"pos":"neu"));
    sav=`<div class="xtg">${t.join("")}</div>`;
  }
  // --- 5. Oyun kontrolü ---
  let kont="";
  if(posL.length||pasL.length){
    const t=[];
    if(avgPos!=null)t.push(xgTile("%"+Math.round(avgPos),"Topla Oynama",`rakip %${Math.round(oppPosAvg)}`,avgPos>=55?"Maçların çoğunda topa sen hükmediyorsun.":avgPos<=45?"Topu çoğunlukla rakibe bırakıyorsun.":"Top paylaşımı dengeli.",avgPos>=55?"pos":"neu"));
    if(avgPas!=null)t.push(xgTile("%"+Math.round(avgPas),"Pas İsabeti",avgOppPas!=null?`rakip %${Math.round(avgOppPas)}`:`${pasL.length} maçta`,avgPas>=85?"Paslarını çok temiz kullanıyorsun.":avgPas<75?"Çok pas kaybediyorsun; oyun kurmayı sadeleştir.":"Pas isabetin makul.",avgPas>=85?"pos":avgPas<75?"neg":"neu"));
    if(avgPas!=null&&avgOppPas!=null){const pd=avgPas-avgOppPas;t.push(xgTile((pd>0?"+":"")+Math.round(pd)+" puan","Pas Üstünlüğü","rakibe göre pas isabeti farkı",pd>=3?"Paslaşmada rakipten daha temizsin.":pd<=-3?"Rakip paslaşmada senden daha temiz.":"Pas isabetinde fark yok.",xgVc(pd,3)));}
    if(posG!=null)t.push(xgTile(xgN2(posG),"Top Verimi",`%50 top başına maç başı gol`,posG>=2?"Az topla bile çok gol üretiyorsun.":posG<1?"Topu tutuyorsun ama gole çeviremiyorsun.":"Topu makul bir verimle kullanıyorsun.",posG>=2?"pos":posG<1?"neg":"neu"));
    kont=`<div class="xtg">${t.join("")}</div>`;
  }
  // --- 6. Hak ediş ---
  let hak="";
  if(D.length){
    const cnt=k=>D.filter(x=>x.d.k==k).length,seg=[["deserved","Hak edilmiş galibiyet"],["fair","Dengeli / hak edilmiş sonuç"],["undeserved","Şanslı sonuç"],["unlucky","Şanssız sonuç"]];
    const bar=seg.map(([k])=>cnt(k)?`<i class="k-${k}" style="flex:${cnt(k)}" title="${cnt(k)} maç"></i>`:"").join("");
    const lg=seg.map(([k,l])=>`<span><i class="k-${k}"></i>${l}: <b>${cnt(k)}</b></span>`).join("");
    const hl=D.filter(x=>x.d.k=="unlucky"||x.d.k=="undeserved").slice(-5).reverse();
    hak=`<div class="xdist" role="img" aria-label="Maçların hak ediş dağılımı">${bar}</div><div class="xlg">${lg}</div>`+
      (hl.length?hl.map(({m,d})=>`<div class="xhl"><div class="xhh"><span class="desbdg ${d.k}">${d.ic} ${esc(d.t)}</span><span class="n">${esc(m.on)} (${m.gf}–${m.ga})</span></div><div class="lb" style="margin-top:4px">xG ${xgN2(m.stats.myXg)} – ${xgN2(m.stats.oppXg)}</div><div class="note" style="margin:2px 0 0">${esc(deserveWhy(m,d))}</div></div>`).join(""):`<div class="note" style="margin:8px 0 0">Şans ya da şanssızlıkla belirlenmiş maç yok: sonuçların çoğu oyuna uygun.</div>`);
  }
  // --- 7. xG trendi ---
  let trend="";
  if(XA.length>=3){
    const T10=XA.slice(-10);
    let tr="";
    if(XA.length>=6){
      const k=Math.min(5,Math.floor(XA.length/2)),rec=XA.slice(-k),old=XA.slice(-2*k,-k),dfn=a=>sumF(a,m=>(+m.stats.myXg||0)-(+m.stats.oppXg||0))/a.length,dl=dfn(rec)-dfn(old);
      tr=dl>=.3?`Son ${k} maçta xG farkın öncekilere göre <b>yükselişte</b> (${xgS2(dl)}).`:dl<=-.3?`Son ${k} maçta xG farkın öncekilere göre <b>düşüşte</b> (${xgS2(dl)}).`:`Son ${k} maçta xG farkın öncekilerle <b>benzer</b> seviyede.`;
    }
    trend=`<div class="xtr">${xgTrendSvg(T10)}</div><div class="xlg"><span><i class="k-deserved"></i>Senin xG'n</span><span><i class="k-unlucky"></i>Rakip xG'si</span><span>G / B / M: maç sonucu</span></div>${tr?`<div class="note" style="margin:6px 0 0">${tr}</div>`:""}`;
  }
  const gls=`<details class="xgl"><summary>Terimler nasıl okunur?</summary><dl>
    <div><dt>xG (gol beklentisi)</dt><dd>Çekilen şutların pozisyon kalitesine göre kaç gol getirmesi beklendiği. Gerçek gol xG'den fazlaysa şanslı ya da çok iyi bitiriyorsun.</dd></div>
    <div><dt>Yenen xG</dt><dd>Rakibin pozisyonlarının değeri. Yediğin gol bundan azsa savunma ya da kaleci iyi iş çıkarmış demektir.</dd></div>
    <div><dt>xG Farkı</dt><dd>Senin xG'n eksi rakibin xG'si. Pozitif fark, oyunda rakipten üstün olduğunu gösterir.</dd></div>
    <div><dt>xPts (beklenen puan)</dt><dd>İki takımın xG'sine bakılarak o maçtan istatistiksel olarak ortalama kaç puan çıkması gerektiği.</dd></div>
    <div><dt>Şut Dönüşümü / İsabeti</dt><dd>Dönüşüm: şutların yüzde kaçı gol. İsabet: şutların yüzde kaçı kaleyi buldu.</dd></div>
    <div><dt>Kaleci Kurtarış</dt><dd>Rakibin isabetli şutlarının yüzde kaçı gole dönüşmedi (isabetli şut − yenen gol).</dd></div>
    <div><dt>Önlenen Gol</dt><dd>Yenen xG eksi yenen gol. Pozitifse kaleci ve savunma beklentinin üstünde performans veriyor.</dd></div>
    <div><dt>Top Verimi</dt><dd>%50 topla oynama başına maç başı gol. Yüksekse az topla çok gol üretiyorsun.</dd></div>
    <div><dt>Hak Ediş</dt><dd>Maçın sonucu ile xG ve xPts dağılımının uyumu. Şanslı: rakip daha tehlikeliyken aldığın puan. Şanssız: daha çok pozisyon bulup kaybettiğin puan.</dd></div>
  </dl></details>`;
  return cd(`xG, xPts & Verimlilik Analizi<small>${covCnt}/${totalM} maç kapsama</small>`,
    head+insHtml+
    xgSec("Gol Beklentisi","Pozisyon değeri ve goller",gol,false,"fin")+
    xgSec("Puan Beklentisi","Oyuna göre hak edilen puan",puan,false,"pts")+
    xgSec("Şut Kalitesi","Şut kalitesi ve isabet",sut,true,"shot",convV!=null?`%${Math.round(convV)}`:(avgSh!=null?`${xgN1(avgSh)}/M`:""))+
    xgSec("Savunma & Kaleci","Rakip şut ve kurtarış",sav,true,"def",gkV!=null?`%${Math.round(gkV)}`:`${cs} temiz`)+
    xgSec("Oyun Kontrolü","Top ve pas hakimiyeti",kont,true,"ctrl",avgPos!=null?`%${Math.round(avgPos)} top`:(avgPas!=null?`%${Math.round(avgPas)} pas`:""))+
    xgSec("Hak Ediş Dağılımı","Sonuç ve oyun dengesi",hak,true,"hak",D.length?`${D.length} maç`:"")+
    xgSec("xG Trendi","Son maçlarda xG akışı",trend,true,"tr",XA.length>=3?`${Math.min(10,XA.length)} maç`:"")+
    gls);
}


/* ---------- v21.2: TURNUVA EVRENİ TARİHİ (Tüm Sezonlar — Kupa/Lig Filtreli) ---------- */
function universeData(mode){
  const allFin=store.seasons.filter(x=>x&&x.res);
  const fin=allFin.filter(x=>!mode||mode=="all"||(mode=="lg"?isLg(x.cfg):!isLg(x.cfg)));
  const clubs=nob(),totsM=nob(),scorers=nob(),mvps=nob(),timeline=[];
  const ensClub=ti=>{
    if(ti==null||!T[ti])return null;
    return clubs[ti]=clubs[ti]||{ti,n:T[ti].n,ch:0,chMe:0,chAi:0,ru:0,ruMe:0,ruAi:0};
  };
  let myCh=0,aiCh=0;
  fin.forEach(x=>{
    const r=x.res||{},lg=isLg(x.cfg);
    const chTi=(r.ch!=null&&T[r.ch])?r.ch:(r.st===7&&x.my!=null&&T[x.my]?x.my:null);
    const ruTi=(r.ru!=null&&T[r.ru])?r.ru:(r.st===6&&x.my!=null&&T[x.my]?x.my:null);
    const chIsMe=chTi!=null&&chTi===x.my&&r.st===7;
    const ruIsMe=ruTi!=null&&ruTi===x.my&&r.st===6;
    if(chTi!=null){
      const c=ensClub(chTi);
      if(c){c.ch++;if(chIsMe){c.chMe++;myCh++}else{c.chAi++;aiCh++}}
    }
    if(ruTi!=null){
      const c=ensClub(ruTi);
      if(c){c.ru++;if(ruIsMe)c.ruMe++;else c.ruAi++}
    }
    if(r.topG&&r.topG.n){
      const k=nz(r.topG.n),o=scorers[k]=scorers[k]||{n:r.topG.n,cnt:0,totG:0,ti:r.topG.ti,seasons:[]};
      o.cnt++;o.totG+=+r.topG.g||0;if(r.topG.ti!=null&&T[r.topG.ti])o.ti=r.topG.ti;o.seasons.push(x.name);
    }
    if(r.mvp&&r.mvp.n){
      const k=nz(r.mvp.n),o=mvps[k]=mvps[k]||{n:r.mvp.n,cnt:0,g:0,a:0,mom:0,ti:r.mvp.ti,seasons:[]};
      o.cnt++;o.g+=+r.mvp.g||0;o.a+=+r.mvp.a||0;o.mom+=+r.mvp.mom||0;if(r.mvp.ti!=null&&T[r.mvp.ti])o.ti=r.mvp.ti;o.seasons.push(x.name);
    }
    if(r.tots&&typeof r.tots==="object"){
      const seenInS=new Set();
      ["F","M","D","K"].forEach(grp=>{
        (Array.isArray(r.tots[grp])?r.tots[grp]:[]).forEach(p=>{
          if(!p||!p.n)return;
          const k=nz(p.n);if(seenInS.has(k))return;seenInS.add(k);
          const o=totsM[k]=totsM[k]||{n:p.n,cnt:0,g:0,a:0,mom:0,pos:p.pos||"",grp:p.grp||grp,ti:p.ti,clubs:new Set(),mineCnt:0};
          o.cnt++;o.g+=+p.g||0;o.a+=+p.a||0;o.mom+=+p.mom||0;
          if(p.pos)o.pos=p.pos;
          if(p.ti!=null&&T[p.ti]){o.ti=p.ti;o.clubs.add(T[p.ti].n)}
          if(p.mine)o.mineCnt++;
        });
      });
    }
    timeline.push({id:x.id,name:x.name,date:x.date,lg,chTi,ruTi,chIsMe,myTi:x.my,mySt:r.st,topG:r.topG,mvp:r.mvp,hasTots:!!r.tots});
  });
  const clubList=Object.values(clubs);
  const champs=clubList.filter(c=>c.ch>0).sort((a,b)=>b.ch-a.ch||b.ru-a.ru||TR_CMP(a.n,b.n));
  const cursed=clubList.filter(c=>c.ru>0).sort((a,b)=>b.ru-a.ru||a.ch-b.ch||TR_CMP(a.n,b.n));
  const totsLegends=Object.values(totsM).map(o=>Object.assign({},o,{clubList:[...o.clubs]})).sort((a,b)=>b.cnt-a.cnt||(b.g+b.a)-(a.g+a.a)||b.g-a.g||TR_CMP(a.n,b.n));
  const topScorers=Object.values(scorers).sort((a,b)=>b.cnt-a.cnt||b.totG-a.totG||TR_CMP(a.n,b.n));
  const topMvps=Object.values(mvps).sort((a,b)=>b.cnt-a.cnt||(b.g+b.a)-(a.g+a.a)||TR_CMP(a.n,b.n));
  return{allFinCnt:allFin.length,cupFinCnt:allFin.filter(x=>!isLg(x.cfg)).length,lgFinCnt:allFin.filter(x=>isLg(x.cfg)).length,finCnt:fin.length,myCh,aiCh,champs,cursed,totsLegends,topScorers,topMvps,timeline:timeline.reverse()};
}
function universeView(){
  const umod=st.umod||"all",u=universeData(umod);
  const modBar=u.allFinCnt?`<div class="stabs seg3" style="margin:0 0 10px" role="tablist" aria-label="Evren turnuva filtresi">${[["all",`Tümü (${u.allFinCnt})`],["cup",`Kupa (${u.cupFinCnt})`],["lg",`Lig (${u.lgFinCnt})`]].map(([k,l])=>`<button class="chip ${umod==k?"on":""}" role="tab" aria-selected="${umod==k}" data-a="umod" data-v="${k}">${l}</button>`).join("")}</div>`:"";
  if(!u.finCnt){
    const emptyTxt=u.allFinCnt?(umod=="lg"?"Henüz tamamlanan puan usulü lig sezonu bulunmuyor.":"Henüz tamamlanan kupa sezonu bulunmuyor."):"Sezonları tamamladıkça (elensen bile Turnuvayı Sonlandır dediğinde) tüm FC 27 evreninin şampiyonluk tarihi, lanetli finalistleri ve TOTS efsaneleri burada birikir.";
    return modBar+psetCard("trophy","gold","Turnuva Evreni Tarihi","Tüm sezonların şampiyonları, TOTS efsaneleri ve tarihi",null,emp(emptyTxt));
  }
  const totCh=u.myCh+u.aiCh;
  const subLbl=umod=="lg"?"Puan usulü liglerin ortak tarihi":umod=="cup"?"Kupa turnuvalarının ortak tarihi":"Sen ve yapay zekâ kulüplerinin ortak tarihi";
  const sumCard=psetCard("trophy","gold","Evren Özeti",subLbl,`${u.finCnt} sezon`,
    `<div class="car-kpi" style="margin-bottom:0">`+
      `<div class="ck gold"><b>${u.champs.length}</b><span>Farklı Şampiyon</span></div>`+
      `<div class="ck emr${u.myCh?"":" z"}"><b>${u.myCh}</b><span>Senin Kupan</span></div>`+
      `<div class="ck sky${u.aiCh?"":" z"}"><b>${u.aiCh}</b><span>YZ Şampiyonluğu</span></div>`+
    `</div>`+
    (totCh?`<div class="note" style="margin:9px 0 0">Kayıtlı ${totCh} şampiyonluktan <b>%${Math.round(u.myCh/totCh*100)}</b>’i senin, <b>%${Math.round(u.aiCh/totCh*100)}</b>’i yapay zekâ kulüplerinin oldu.</div>`:"")
  );
  // 1) En çok şampiyon olan kulüpler
  const champRows=u.champs.slice(0,12).map((c,i)=>{
    const subParts=[];
    if(c.chMe)subParts.push(`Sen: ${c.chMe}`);
    if(c.chAi)subParts.push(`YZ: ${c.chAi}`);
    if(c.ru)subParts.push(`${c.ru} ikincilik`);
    return `<button class="hof-r tap${i===0?" r1":""}" data-a="tinfo" data-i="${c.ti}" aria-label="${esc(c.n)} kadrosunu incele">`+
      `${i<3?`<span class="mdl m${i+1}">${i+1}</span>`:`<span class="hof-rk">${i+1}</span>`}`+
      `${badge(c.ti,26)}`+
      `<span class="hof-nm"><b>${esc(c.n)}</b><small>${esc(subParts.join(" · "))}</small></span>`+
      `<span class="hof-v">${c.ch} 🏆</span>`+
    `</button>`;
  }).join("");
  const champCard=u.champs.length?psetCard("shield","gold","Evrenin Devleri","En çok şampiyon olan kulüpler",`ilk ${Math.min(12,u.champs.length)}`,champRows):"";
  // 2) En çok final kaybeden / 2. olan "lanetli" takımlar
  const cursedRows=u.cursed.slice(0,8).map((c,i)=>{
    const curseTag=c.ch===0&&c.ru>=2?" · 0 kupa laneti":(c.ch>0?` · ${c.ch} şampiyonluk`:" · henüz kupasız");
    return `<button class="hof-r tap" data-a="tinfo" data-i="${c.ti}" aria-label="${esc(c.n)} kadrosunu incele">`+
      `<span class="hof-rk">${i+1}</span>`+
      `${badge(c.ti,24)}`+
      `<span class="hof-nm"><b>${esc(c.n)}</b><small>${c.ruMe?`Sen: ${c.ruMe} · `:""}${c.ruAi?`YZ: ${c.ruAi}`:""}${curseTag}</small></span>`+
      `<span class="hof-v">${c.ru}× 2.</span>`+
    `</button>`;
  }).join("");
  const cursedCard=u.cursed.length?psetCard("flame","org","Lanetli Finalistler","En çok finalde kaybeden veya 2. olan kulüpler",`${u.cursed.length} kulüp`,cursedRows):"";
  // 3) TOTS Efsaneleri
  const totsRows=u.totsLegends.slice(0,12).map((p,i)=>{
    const clTxt=p.clubList.slice(0,2).join(" / ");
    const stTxt=`${p.g}G · ${p.a}A${p.mom?` · ${p.mom}★`:""}`;
    const btnAttrs=p.mineCnt>0?`data-a="pinfo" data-n="${esc(p.n)}"`:(p.ti!=null&&T[p.ti]?`data-a="tinfo" data-i="${p.ti}"`:"");
    const posTag=p.pos?`<span class="sqp p-${p.grp}" style="width:auto;padding:1px 6px;font-size:11px">${esc(p.pos)}</span>`:"";
    const inner=`${i<3?`<span class="mdl m${i+1}">${i+1}</span>`:`<span class="hof-rk">${i+1}</span>`}`+
      `${p.ti!=null&&T[p.ti]?badge(p.ti,24):""}`+
      `<span class="hof-nm"><b>${p.mineCnt?"★ ":""}${esc(p.n)}</b><small>${esc(clTxt)}${clTxt?" · ":""}${stTxt}</small></span>`+
      `${posTag}<span class="hof-v">${p.cnt}×</span>`;
    return btnAttrs?`<button class="hof-r tap${i===0?" r1":""}" ${btnAttrs}>${inner}</button>`:`<div class="hof-r${i===0?" r1":""}">${inner}</div>`;
  }).join("");
  const totsCard=u.totsLegends.length?psetCard("spark","emr","TOTS Efsaneleri","Turnuvanın En İyi 11’ine en çok seçilen oyuncular",`ilk ${Math.min(12,u.totsLegends.length)}`,totsRows):"";
  // 4) Gol Krallığı & MVP Onur Listesi
  const honRow=(o,i,val,sub)=>{
    const bdg=o.ti!=null&&T[o.ti]?badge(o.ti,22):"";
    return `<div class="hof-r${i===0?" r1":""}">${i<3?`<span class="mdl m${i+1}">${i+1}</span>`:`<span class="hof-rk">${i+1}</span>`}${bdg}<span class="hof-nm"><b>${esc(o.n)}</b><small>${esc(sub)}</small></span><span class="hof-v">${val}</span></div>`;
  };
  let honorHtml="";
  if(u.topScorers.length||u.topMvps.length){
    const scPart=u.topScorers.length?`<div class="hof-sub">Turnuva Gol Kralları</div>`+u.topScorers.slice(0,6).map((o,i)=>honRow(o,i,`${o.cnt}×`,`Toplam ${o.totG} gol · ${o.seasons.slice(-2).join(", ")}`)).join(""):"";
    const mvPart=u.topMvps.length?`<div class="hof-sub" style="margin-top:12px">Turnuva MVP’leri</div>`+u.topMvps.slice(0,6).map((o,i)=>honRow(o,i,`${o.cnt}×`,`${o.g}G ${o.a}A${o.mom?` ${o.mom}★`:""} · ${o.seasons.slice(-2).join(", ")}`)).join(""):"";
    honorHtml=psetCard("boot","sky","Gol Krallığı & MVP Onur Listesi","Tüm sezonların turnuva ödülü sahipleri",`${u.topScorers.length} gol kralı`,scPart+mvPart);
  }
  // 5) Sezon Sezon Şampiyonluk Kronolojisi
  const tlRows=u.timeline.map(it=>{
    const chNm=it.chTi!=null&&T[it.chTi]?T[it.chTi].n:"Kayıt yok";
    const ruNm=it.ruTi!=null&&T[it.ruTi]?T[it.ruTi].n:"";
    const extras=[];
    if(ruNm)extras.push(`Finalist: ${ruNm}`);
    if(it.topG)extras.push(`Gol Kralı: ${it.topG.n} (${it.topG.g}G)`);
    if(it.mvp)extras.push(`MVP: ${it.mvp.n}`);
    return `<div class="uv-row${it.chIsMe?" mine":""}">`+
      `<div class="uv-top"><span class="uv-sn"><b>${esc(it.name)}</b><span class="xfpill ${it.lg?"sky":"gold"}">${it.lg?"Lig":"Kupa"}</span></span>${it.hasTots?`<button class="chip uv-tots" data-a="totsv" data-id="${it.id}">En İyi 11</button>`:""}</div>`+
      `<div class="uv-ch">${it.chTi!=null&&T[it.chTi]?badge(it.chTi,26):`<span class="aci" style="width:26px;height:26px">${UICO.trophy}</span>`}<div class="uv-chm"><b>${it.chIsMe?"★ ":""}${esc(chNm)}</b>${extras.length?`<small>${esc(extras.join(" · "))}</small>`:""}</div></div>`+
    `</div>`;
  }).join("");
  const tlCard=psetCard("cal","sky","Şampiyonluk Kronolojisi","Sezon sezon tüm şampiyonlar ve ödüller",`${u.timeline.length} sezon`,`<div class="uv-list">${tlRows}</div>`);
  return modBar+sumCard+champCard+cursedCard+totsCard+honorHtml+tlCard;
}

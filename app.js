/* ---------- SÜRÜM VE HATA GÜNLÜĞÜ ---------- */
const VER="20.2",ELK="fc26lig4_log";const nob=()=>Object.create(null);let SWR=null;
function elogGet(){try{const a=JSON.parse(localStorage.getItem(ELK)||"[]");return Array.isArray(a)?a:[]}catch(e){return []}}
function elog(k,m,w){try{const a=elogGet();a.push({t:Date.now(),k:k,m:String(m||"").slice(0,300),w:String(w||"").slice(0,200)});localStorage.setItem(ELK,JSON.stringify(a.slice(-20)))}catch(e){}}
addEventListener("error",e=>{elog("hata",e.message,String(e.filename||"").split("/").pop()+":"+e.lineno+":"+e.colno)});
addEventListener("unhandledrejection",e=>{const r=e.reason;elog("söz",r&&r.message?r.message:r,r&&r.stack?String(r.stack).split("\n")[1]:"")});
/* ---------- TAKIM HAVUZU VE KADROLAR (data.js dosyasından yüklenir) ---------- */
const T=RAW.split(";").map(s=>{const p=s.split(",");return{n:p[0],c:p[1],g:+p[2],a:+p[3],o:+p[4],d:+p[5]}});
const TN=T.map(t=>t.n);
const IX=Object.create(null);T.forEach((t,i)=>IX[t.n]=i);
const SQP={GK:"K",CB:"D",LB:"D",RB:"D",LWB:"D",RWB:"D",CDM:"M",CM:"M",CAM:"M",LM:"M",RM:"M",ST:"F",CF:"F",LW:"F",RW:"F",LF:"F",RF:"F"};
const SQC=nob();
function squadOf(i){const t=T[i];if(!t)return [];if(SQC[t.n])return SQC[t.n];const raw=SQ[t.n];
  return SQC[t.n]=raw?raw.split(";").map(x=>{const q=x.split(",");return{n:q[0],p:q[1],o:+q[2],a:+q[3],j:+q[4],t:q[5],g:SQP[q[1]]||"M"}}):[]}
const nz=t=>String(t||"").toLocaleLowerCase("tr").replace(/ı/g,"i").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ø/g,"o").replace(/ł/g,"l").replace(/đ/g,"d");
const TR_CMP=(typeof Intl!=="undefined"&&Intl.Collator)?new Intl.Collator("tr").compare:(a,b)=>String(a||"").localeCompare(String(b||""),"tr");
const sqFind=(i,n)=>i==null?null:(squadOf(i).find(p=>nz(p.n)==nz(n))||null);
let SQ_MAP=null;
const sqFindAny=n=>{const k=nz(n);if(!k)return null;if(!SQ_MAP){SQ_MAP=new Map();for(let i=0;i<T.length;i++)squadOf(i).forEach(p=>{const pk=nz(p.n);if(!SQ_MAP.has(pk))SQ_MAP.set(pk,{p,i})})}return SQ_MAP.get(k)||null};
const EU=new Set("ESP ENG ITA GER FRA POR TUR NED BEL SCO GRE CZE UKR CRO DEN".split(" "));
const CN={ENG:["İngiltere","\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}"],SCO:["İskoçya","\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}"],ESP:["İspanya","ES"],ITA:["İtalya","IT"],GER:["Almanya","DE"],FRA:["Fransa","FR"],POR:["Portekiz","PT"],TUR:["Türkiye","TR"],KSA:["Suudi Arabistan","SA"],NED:["Hollanda","NL"],ARG:["Arjantin","AR"],GRE:["Yunanistan","GR"],CZE:["Çekya","CZ"],BEL:["Belçika","BE"],UKR:["Ukrayna","UA"],CRO:["Hırvatistan","HR"],DEN:["Danimarka","DK"],USA:["ABD","US"],URU:["Uruguay","UY"],MEX:["Meksika","\u{1F1F2}\u{1F1FD}"]};
const H3=(a,b,c)=>`<rect width="24" height="5.4" fill="${a}"/><rect y="5.3" width="24" height="5.4" fill="${b}"/><rect y="10.6" width="24" height="5.4" fill="${c}"/>`;
const V3=(a,b,c)=>`<rect width="8.1" height="16" fill="${a}"/><rect x="8" width="8.1" height="16" fill="${b}"/><rect x="16" width="8" height="16" fill="${c}"/>`;
const ST=(bg,fg,cv)=>`<rect width="24" height="16" fill="${bg}"/>`+[1.78,5.33,8.89,12.44].map(y=>`<rect y="${y}" width="24" height="1.78" fill="${fg}"/>`).join("");
const FLG={
ESP:'<rect width="24" height="16" fill="#c60b1e"/><rect y="4" width="24" height="8" fill="#ffc400"/>',
ENG:'<rect width="24" height="16" fill="#fff"/><rect x="10" width="4" height="16" fill="#ce1124"/><rect y="6" width="24" height="4" fill="#ce1124"/>',
SCO:'<rect width="24" height="16" fill="#005eb8"/><path d="M0 0L24 16M24 0L0 16" stroke="#fff" stroke-width="3"/>',
ITA:V3("#009246","#fff","#ce2b37"),GER:H3("#000","#dd0000","#ffce00"),FRA:V3("#0055a4","#fff","#ef4135"),
POR:'<rect width="24" height="16" fill="#ff0000"/><rect width="9.6" height="16" fill="#006600"/><circle cx="9.6" cy="8" r="3" fill="#ffcc00"/>',
TUR:'<rect width="24" height="16" fill="#e30a17"/><circle cx="9" cy="8" r="4.2" fill="#fff"/><circle cx="10.4" cy="8" r="3.3" fill="#e30a17"/><circle cx="14.2" cy="8" r="1.4" fill="#fff"/>',
KSA:'<rect width="24" height="16" fill="#006c35"/><rect x="5" y="5" width="14" height="2" fill="#fff" opacity=".9"/><rect x="5" y="10.5" width="14" height="1.3" fill="#fff"/>',
NED:H3("#ae1c28","#fff","#21468b"),
ARG:H3("#74acdf","#fff","#74acdf")+'<circle cx="12" cy="8" r="1.7" fill="#f6b40e"/>',
GRE:ST("#0d5eaf","#fff")+'<rect width="8.9" height="8.9" fill="#0d5eaf"/><rect x="3.6" width="1.8" height="8.9" fill="#fff"/><rect y="3.6" width="8.9" height="1.8" fill="#fff"/>',
CZE:'<rect width="24" height="8" fill="#fff"/><rect y="8" width="24" height="8" fill="#d7141a"/><path d="M0 0L12 8L0 16z" fill="#11457e"/>',
BEL:V3("#000","#fae042","#ed2939"),
UKR:'<rect width="24" height="8" fill="#0057b7"/><rect y="8" width="24" height="8" fill="#ffd700"/>',
CRO:H3("#ff0000","#fff","#171796")+'<rect x="10" y="5.5" width="4" height="5" fill="#ff0000" stroke="#fff" stroke-width=".6"/>',
DEN:'<rect width="24" height="16" fill="#c8102e"/><rect x="7" width="3" height="16" fill="#fff"/><rect y="6.5" width="24" height="3" fill="#fff"/>',
USA:'<rect width="24" height="16" fill="#fff"/>'+[0,4.57,9.14,13.71].map(y=>`<rect y="${y}" width="24" height="2.29" fill="#b22234"/>`).join("")+'<rect width="10" height="9.1" fill="#3c3b6e"/>',
URU:ST("#fff","#0038a8")+'<rect width="8.9" height="8.9" fill="#fff"/><circle cx="4.4" cy="4.4" r="2" fill="#fcd116"/>',MEX:V3("#006847","#fff","#ce1126")+'<circle cx="12" cy="8" r="1.6" fill="#6b4a00"/>'};
const fl=c=>`<svg class="fg" viewBox="0 0 24 16" role="img" aria-label="${CN[c][0]}">${FLG[c]||""}</svg>`;
const rb=v=>`<span class="g ${v>=85?"t1":v>=80?"t2":v>=75?"t3":""}">${v}</span>`;
const cn=c=>fl(c)+" "+CN[c][0];

/* ---------- ESKİ SÜRÜMDEN (64 takımlı havuz) GEÇİŞ ---------- */
const OLDN="Real Madrid,Barcelona,Atlético Madrid,Athletic Bilbao,Villarreal,Real Betis,Real Sociedad,Osasuna,Liverpool,Man City,Arsenal,Chelsea,Newcastle,Aston Villa,Man United,Tottenham,Inter,Milan,Napoli,Juventus,Roma,Atalanta,Lazio,Como,Bayern,Dortmund,Leipzig,Leverkusen,Frankfurt,Stuttgart,Hoffenheim,Wolfsburg,PSG,Marseille,Monaco,Lyon,Lille,Lens,Rennes,Nice,Sporting,Benfica,Porto,Braga,Galatasaray,Fenerbahçe,Beşiktaş,Al Hilal,Al Nassr,PSV,Ajax,Feyenoord,Al Ahli,Al Ittihad,Union SG,PAOK,Boca Juniors,River Plate,Celtic,Rangers,Olympiacos,AEK,Slavia Praha,Club Brugge".split(",");
const ALIAS={"Inter":"Lombardia FC","Inter Milan":"Lombardia FC","Milan":"Milano FC","AC Milan":"Milano FC","Atalanta":"Bergamo Calcio","Atalanta BC":"Bergamo Calcio","Lazio":"Latium","SS Lazio":"Latium","Paris Saint-Germain":"PSG","Arsenal FC":"Arsenal","FC Barcelona":"Barcelona","Manchester City":"Man City","Bayern München":"Bayern","FC Bayern München":"Bayern","Liverpool FC":"Liverpool","Manchester United":"Man United","Chelsea FC":"Chelsea","Tottenham Hotspur":"Tottenham","Borussia Dortmund":"Dortmund","SSC Napoli":"Napoli","Juventus FC":"Juventus","AS Roma":"Roma","Newcastle United":"Newcastle","Bayer 04 Leverkusen":"Leverkusen","RB Leipzig":"Leipzig","Galatasaray SK":"Galatasaray","Fenerbahçe SK":"Fenerbahçe","Sunderland AFC":"Sunderland","Athletic Club":"Athletic Bilbao","Real Betis Balompié":"Real Betis","Villarreal CF":"Villarreal","SL Benfica":"Benfica","FC Porto":"Porto","Everton FC":"Everton","Brighton & Hove Albion":"Brighton","VfB Stuttgart":"Stuttgart","AFC Bournemouth":"Bournemouth","Olympiacos FC":"Olympiacos","TSG 1899 Hoffenheim":"Hoffenheim","RC Lens":"Lens","Olympique Lyonnais":"Lyon","AS Monaco":"Monaco","Stade Rennais":"Rennes","Fulham FC":"Fulham","RC Celta":"Celta Vigo","Sporting CP":"Sporting","SC Freiburg":"Freiburg","Lille OSC":"Lille","Beşiktaş JK":"Beşiktaş","Bologna FC":"Bologna","Valencia CF":"Valencia","Olympique de Marseille":"Marseille","CA Osasuna":"Osasuna","Al Ahli SFC":"Al Ahli","Al Qadsiah FC":"Al Qadsiah","West Ham United":"West Ham","AEK Athens":"AEK","Borussia Mönchengladbach":"M'gladbach","Eintracht Frankfurt":"Frankfurt","Torino FC":"Torino","Getafe CF":"Getafe","OGC Nice":"Nice","Panathinaikos FC":"Panathinaikos","Wolverhampton Wanderers":"Wolverhampton","1. FSV Mainz 05":"Mainz 05","RCD Espanyol":"Espanyol","Sevilla FC":"Sevilla","Club Brugge KV":"Club Brugge","RC Deportivo A Coruña":"Deportivo","RC Deportivo":"Deportivo","SK Slavia Praha":"Slavia Praha","1. FC Köln":"Köln","1. FC Union Berlin":"Union Berlin","Udinese Calcio":"Udinese","FC Augsburg":"Augsburg","Levante UD":"Levante","RC Strasbourg Alsace":"Strasbourg","Celtic FC":"Celtic","Sporting Clube de Braga":"Braga","VfL Wolfsburg":"Wolfsburg","Deportivo Alavés":"Alavés","Estudiantes de La Plata":"Estudiantes","Girona FC":"Girona"};Object.setPrototypeOf(ALIAS,null);

/* ---------- TURNUVA MANTIĞI ---------- */
const SN=["Grup aşamasında elendi","Son 64’te elendi","Son 32’de elendi","Son 16’da elendi","Çeyrek finalde elendi","Yarı finalde elendi","Finalde kaybetti","Şampiyon "];
const SNL={0:"Ligde alt sıralar",4:"Ligde orta sıralar",5:"Ligi 3. bitirdi",6:"Ligi 2. bitirdi",7:"Lig Şampiyonu "};
const LGN=[4,6,8,10,12,14,16,18,20,22,24];
const isLg=c=>!!(c&&(c.lg||(c.q===0&&c.gs>0)));
const stTxt=(c,st)=>isLg(c)?(SNL[st]||SN[st]):SN[st];
const RN={64:"Son 64",32:"Son 32",16:"Son 16",8:"Çeyrek final",4:"Yarı final",2:"Final"};
const RKM={64:1,32:2,16:3,8:4,4:5};
const DEFC={N:32,gs:4,q:2,gl:1,kl:1,fl:1};
const DEFR={rg:"all",xc:[],gmin:0,gmax:99,amin:0,mmin:0,dmin:0,cap:0,gcap:1,pick:"top",dm:"pot"};
const RGN={all:"Tüm bölgeler",eu:"Sadece Avrupa takımları",non:"Avrupa dışı takımlar"};
const cp=o=>JSON.parse(JSON.stringify(o));
const pw=n=>n>=2&&(n&(n-1))==0;
const rg=n=>Array.from({length:n},(_,i)=>i);
const GL=i=>i<26?String.fromCharCode(65+i):String.fromCharCode(64+Math.floor(i/26))+String.fromCharCode(65+i%26);
const gsz=c=>isLg(c)?c.N:(c.gs||2);
const nG=c=>isLg(c)?1:(c.N/gsz(c));
const adv=c=>isLg(c)?0:(c.gs?nG(c)*c.q:c.N);
const gsOpts=N=>[4,8,16,32,64].filter(x=>x<=N&&N%x==0);
const qOpts=(N,gs)=>{const G=N/gs,o=[];for(let q=1;q<gs;q++)if(pw(G*q))o.push(q);return o};
function fixC(c){
  if(isLg(c)){if(!LGN.includes(c.N))c.N=16;c.gs=c.N;c.q=0;c.lg=1;return c}
  delete c.lg;
  if(![4,8,16,32,64].includes(c.N))c.N=16;
  if(c.gs>0){const go=gsOpts(c.N);if(!go.includes(c.gs))c.gs=go.includes(4)?4:go[0];
    const qo=qOpts(c.N,c.gs);if(!qo.includes(c.q))c.q=qo.includes(2)?2:qo[0]}
  return c}
const resRanks=c=>{if(isLg(c))return[0,4,5,6,7];const o=c.gs?[0]:[];for(let t=adv(c);t>=4;t/=2)o.push(RKM[t]);return o.concat([6,7])};
const leg=n=>n==2?"çift maç":"tek maç";
function koPath(c){if(isLg(c))return "Eleme yok (puan usulü lig)";const o=[];for(let t=adv(c);t>=2;t/=2)o.push(RN[t]);return o.join(" → ")}
function matchInfo(c){
  let gm=0,pt=0,km=0;
  if(isLg(c)){gm=(c.N*(c.N-1)/2)*c.gl;pt=(c.N-1)*c.gl;return{gm,pt,km:0,tot:gm}}
  if(c.gs){gm=nG(c)*(c.gs*(c.gs-1)/2)*c.gl;pt=(c.gs-1)*c.gl}
  for(let t=adv(c);t>=2;t/=2)km+=(t/2)*(t==2?c.fl:c.kl);
  return{gm,pt,km,tot:gm+km}}
const fmt=c=>c.N+" takım · "+(isLg(c)?"puan usulü lig · "+(c.gl==2?"çift devre":"tek devre")+" · eleme yok":(c.gs?nG(c)+" grup × "+c.gs+" takım · gruptan "+c.q+" çıkar":"direkt eleme"));
const gname=(s,i)=>isLg(s.cfg)?"Lig Tablosu":(s.cfg.gs?"Grup "+GL(i):"Eşleşme "+(i+1));
const hasKO=c=>!isLg(c)&&adv(c)>=4;

/* ---------- KURALLAR ---------- */
const rgOk=(r,t)=>r.rg=="all"||(r.rg=="eu")==EU.has(t.c);
const elig=r=>T.map((_,i)=>i).filter(i=>{const t=T[i];
  return rgOk(r,t)&&!r.xc.includes(t.c)&&t.g>=r.gmin&&t.g<=r.gmax&&t.a>=r.amin&&t.o>=r.mmin&&t.d>=r.dmin});
const lim=s=>Math.min(s.rl.cap||99,(!isLg(s.cfg)&&s.rl.gcap)?nG(s.cfg)*s.rl.gcap:99);
function avail(s){const cnt=nob();elig(s.rl).forEach(i=>cnt[T[i].c]=(cnt[T[i].c]||0)+1);const l=lim(s);
  return Object.values(cnt).reduce((a,n)=>a+Math.min(n,l),0)}
const V=t=>t.g*10+(t.a+t.o+t.d)/3;
const $=id=>document.getElementById(id);
const sh=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const avg=(g,f)=>g.reduce((s,i)=>s+T[i][f],0)/g.length;
const fx=n=>(+n).toFixed(1).replace(".",",");
function chooseP(s){
  const r=s.rl,N=s.cfg.N,l=lim(s);let el=elig(r);
  el=r.pick=="rnd"?sh(el):el.sort((a,b)=>V(T[b])-V(T[a]));
  const cnt=nob(),P=[];
  for(const i of el){const k=T[i].c;if((cnt[k]||0)>=l)continue;cnt[k]=(cnt[k]||0)+1;P.push(i);if(P.length==N)break}
  return P}
function ruleLines(s){
  const r=s.rl,o=[RGN[r.rg]];
  if(r.xc.length)o.push("Hariç ülkeler: "+r.xc.map(c=>CN[c][0]).join(", "));
  if(r.gmin||r.gmax<99)o.push("Genel güç: "+(r.gmin||"–")+" ile "+(r.gmax<99?r.gmax:"–")+" arası");
  if(r.amin)o.push("Hücum "+r.amin+"+");
  if(r.mmin)o.push("Orta saha "+r.mmin+"+");
  if(r.dmin)o.push("Defans "+r.dmin+"+");
  if(r.cap)o.push("Turnuvada ülke başına en fazla "+r.cap+" takım");
  o.push(isLg(s.cfg)?(r.cap?"Ligde ülke başına en fazla "+r.cap+" takım":"Ligde ülke sınırı yok"):s.cfg.gs?(r.gcap?"Aynı grupta aynı ülkeden en fazla "+r.gcap+" takım":"Gruplarda ülke sınırı yok"):(r.gcap?"İlk turda aynı ülke eşleşmesin":"Eşleşmelerde ülke sınırı yok"));
  o.push("Katılımcılar: "+(r.pick=="rnd"?"rastgele seçilir":"en güçlü takımlar"));
  o.push("Kura: "+(r.dm=="rnd"?"tamamen rastgele":"torbalı (güç dengeli)"));
  return o}

/* ---------- KURA ÜRETİMİ ---------- */
function genDraw(s,tries,tight,ms){ms=ms||900;tight=tight||1;const t0=Date.now();
  const c=s.cfg,P=s.P,z=gsz(c),G=P.length/z,gc=isLg(c)?(s.rl.cap||99):(s.rl.gcap||99),pot=s.rl.dm!="rnd";
  const base=pot?P.slice().sort((x,y)=>V(T[y])-V(T[x])):null;
  const tg=.55*Math.sqrt(8/z)*tight,ta=1.3*Math.sqrt(8/z)*tight;
  let best=null,bs=1e9;
  for(let tr=0;tr<tries&&(tr==0||Date.now()-t0<ms);tr++){
    const src=pot?base:sh(P),pots=[];
    for(let k=0;k<z;k++)pots.push(src.slice(k*G,k*G+G));
    const GR=rg(G).map(()=>[]),seq=[];let ok=true;
    for(const pt of pots){
      const ts=sh(pt),used=new Set(),res=[];let nodes=0;
      const dfs=k=>{if(k==ts.length)return true;if(++nodes>8000)return false;
        for(const g of sh(rg(G))){
          if(used.has(g)||GR[g].filter(i=>T[i].c==T[ts[k]].c).length>=gc)continue;
          used.add(g);res.push([ts[k],g]);GR[g].push(ts[k]);
          if(dfs(k+1))return true;
          used.delete(g);res.pop();GR[g].pop()}
        return false};
      if(!dfs(0)){ok=false;break}
      seq.push(...res)}
    if(!ok)continue;
    const gs=GR.map(g=>avg(g,"g")),as=GR.map(g=>avg(g,"a")),a=Math.max(...gs)-Math.min(...gs),b=Math.max(...as)-Math.min(...as),sc=a+b*.4;
    if(sc<bs){bs=sc;best={G:GR,seq}}
    if(!pot||(a<=tg&&b<=ta))break}
  return best}

function grpCard(g,gi){
  const s=cur(),ravg=f=>g.reduce((a,i)=>a+RT(s,i)[f],0)/g.length;
  const d=st.dr,hl=st.tab==2&&d&&st.k>0&&st.k<=d.seq.length&&d.seq[st.k-1][1]==gi,mn=s.my!=null&&g.includes(s.my);
  const dd=mn&&gInfo(s).includes("☠"),pc=g.length?Math.max(6,Math.min(100,(ravg("g")-70)/18*100)):0;
  const qL=(s.gqs&&s.gqs[gi])||[],qMax=s.cfg.q||2,lg=isLg(s.cfg);
  const sim=ensureSim(s),rows=(s.cfg.gs||lg)?calcGroupTable(s,gi):[];
  const hasPlayed=rows.some(r=>r.o>0);
  if(st.tab==2||!hasPlayed){
    const gl=lg?"★":s.cfg.gs?GL(gi):gi+1,avg=f=>g.length?fx(ravg(f)):"—";
    const head=`<div class="kgh"><span class="kgl">${gl}</span><div class="kgt"><b>${gname(s,gi)}</b><small>${g.length} takım${mn?` · <i class="kgm">★ Senin grubun</i>`:""}</small></div></div>`+
      (g.length?`<i class="gb kgb"><u style="width:${pc}%"></u></i><div class="kgs"><span><em>GEN</em><b>${avg("g")}</b></span><span><em>HÜC</em><b>${avg("a")}</b></span><span><em>DEF</em><b>${avg("d")}</b></span></div>`:"");
    return `<div class="card kgc${hl?" hl":""}${mn?" mine":""}${dd?" dead":""}">${head}`+
    g.slice().sort((x,y)=>{const qx=qL.indexOf(x),qy=qL.indexOf(y);if(qx>=0||qy>=0)return (qx<0?99:qx)-(qy<0?99:qy);return V(RT(s,y))-V(RT(s,x))}).map(i=>{
      const ti=RT(s,i),qr=qL.indexOf(i),qBadge=qr>=0?`<span class="qbdg">${qr+1}. Çıktı ✓</span>`:"";
      return `<button class="row tb kr ${qr>=0?"qrow":""}${i===s.my?" kme":""}" data-a="tinfo" data-i="${i}" aria-label="${esc(ti.n)} kadrosunu incele"><span class="cc">${fl(ti.c)}</span>${badge(i,26)}<span class="n kn"><span class="kt">${nm(i)}</span><small title="${esc(CN[ti.c][0])}"><span><i>HÜC</i> ${ti.a}</span><span><i>ORT</i> ${ti.o}</span><span><i>DEF</i> ${ti.d}</span></small></span>${qBadge}${rb(ti.g)}<span class="chev">›</span></button>`;
    }).join("")+(g.length?"":`<div class="row empty">—</div>`)+`</div>`;
  }
  const maxW=Math.max(sim.w,mn?(s.mt||[]).filter(m=>m.rd==="Grup").length:0);
  const gl=lg?"★":s.cfg.gs?GL(gi):gi+1;
  const calIc='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>';
  const head=`<div class="pt-hd">`+
    `<span class="kgl">${gl}</span>`+
    `<div class="kgt"><b>${gname(s,gi)}</b><small>Gen ${fx(ravg("g"))}${lg?" · Puan Ligi":` · İlk ${qMax} çıkar`}${mn?` · <i class="kgm">★ Senin grubun</i>`:""}</small></div>`+
    `${maxW?`<span class="xfpill ${mn?"gold":"emr"}">${maxW}. Hafta</span>`:""}`+
    `</div><i class="gb kgb"><u style="width:${pc}%"></u></i>`;
  const bodyRows=rows.map((r,idx)=>{
    const i=r.ti,ti=RT(s,i),isQ=!lg&&idx<qMax,qr=qL.indexOf(i);
    const okQ=isQ||qr>=0,lead1=idx===0&&(okQ||lg),tier=lead1?" t1":okQ?" t2":"";
    const isCut=!lg&&idx===qMax-1&&idx<rows.length-1;
    const avStr=(r.gd>0?"+":r.gd<0?"−":"")+Math.abs(r.gd);
    const avCls=r.gd>0?" pos":r.gd<0?" neg":"";
    const tName=i===s.my?`<i class="pt-st">★</i> ${esc(ti.n)}`:esc(ti.n);
    return `<button class="gtbl row tb pt-r${okQ?" qrow":""}${tier}${i===s.my?" myrow":""}${isCut?" qcut":""}" data-a="tinfo" data-i="${i}" aria-label="${esc(ti.n)} kadrosunu incele">`+
      `<span class="grk2${isQ?" q":""}${lead1?" q1":""}">${idx+1}</span>`+
      `<span class="gnm">${badge(i,20)}<span class="n">${tName}</span></span>`+
      `<span class="pt-n">${r.o}</span><span class="pt-n">${r.w}</span><span class="pt-n mut">${r.d}</span><span class="pt-n mut">${r.l}</span><span class="pt-n">${r.gf}</span><span class="pt-n mut">${r.ga}</span><span class="pt-av${avCls}">${avStr}</span><b class="gpts">${r.pts}</b>`+
      `</button>`;
  }).join("");
  return `<div class="card kgc ptbl${mn?" mine":""}${dd?" dead":""}">${head}`+
  `<div class="gtbl hd pt-col"><span class="grk2">#</span><span class="gnm">TAKIM</span><span title="Oynanan">O</span><span title="Galibiyet">G</span><span title="Beraberlik">B</span><span title="Mağlubiyet">M</span><span title="Attığı Gol">AG</span><span title="Yediği Gol">YG</span><span title="Averaj">AV</span><span class="gpts" title="Puan">P</span></div>`+
  `<div class="pt-rows">${bodyRows}</div>`+
  `<div class="gleg pt-leg"><span><i class="lg1"></i>${lg?"Lider":"1. sıra"}</span>${lg?"":`<span><i class="lg2"></i>Gruptan çıkar</span>`}${mn?`<span><i class="lgm"></i>Senin takımın</span>`:""}</div>`+
  (maxW?`<button class="fxlink pfxlink" data-t="8"><span class="pfx-l">${calIc}<span>Hafta sonuçları ve fikstür</span></span><span class="pfx-r">›</span></button>`:"")+
  `</div>`}

/* ---------- VERİ ---------- */
const today=()=>new Date().toLocaleDateString("tr-TR");
const esc=x=>String(x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const nextNo=()=>{const L=store.seasons.map(x=>{const m=/^Sezon (\d+)$/.exec(x.name||"");return m?+m[1]:0});return Math.max(store.nx||0,...L)+1};
const mk=(id,n,prev)=>({id,name:"Sezon "+n,date:today(),G:null,my:null,res:null,pl:[],mt:[],ts:nob(),cfg:prev?cp(prev.cfg):cp(DEFC),rl:prev?cp(prev.rl):cp(DEFR),P:null,lk:false,oy:prev&&prev.oy?cp(prev.oy):Object.assign(nob(),{d:"",h:"",c:""})});
const okS=o=>o&&Array.isArray(o.seasons)&&o.seasons.length;
let DROP=[];
function remap(o){
  const tn=o.tn;
  if(!tn||(tn.length==T.length&&tn.every((n,i)=>n==TN[i])))return o;
  const m2=i=>{const nk=ALIAS[tn[i]]||tn[i];const j=IX[nk];return j===undefined?null:j};
  const m=i=>{const j=m2(i);if(j===null&&tn[i]!==undefined)DROP.push(tn[i]);return j};
  const rmMap=mp=>{
    if(!mp||typeof mp!=="object")return nob();
    const out=nob();
    Object.entries(mp).forEach(([k,v])=>{
      const sp=k.lastIndexOf("|");
      if(sp>0){const ti=m2(+k.slice(sp+1));if(ti!=null)out[k.slice(0,sp)+"|"+ti]=(out[k.slice(0,sp)+"|"+ti]||0)+(+v||0)}
    });
    return out};
  const rmS=s=>{
    if(s.G)s.G=s.G.map(g=>g.map(m).filter(x=>x!==null));
    if(s.gqs&&typeof s.gqs=="object")Object.keys(s.gqs).forEach(k=>{if(Array.isArray(s.gqs[k]))s.gqs[k]=s.gqs[k].map(m).filter(x=>x!==null)});
    if(s.sim&&typeof s.sim=="object"){
      if(s.sim.gm&&typeof s.sim.gm=="object")Object.keys(s.sim.gm).forEach(k=>{if(Array.isArray(s.sim.gm[k]))s.sim.gm[k]=s.sim.gm[k].map(wk=>Array.isArray(wk)?wk.map(a=>{if(!Array.isArray(a)||a.length<4)return null;const t1=m2(a[0]),t2=m2(a[1]);if(t1==null||t2==null)return null;if(a.length>=8)return [t1,t2,+a[2]||0,+a[3]||0,Array.isArray(a[4])?a[4]:[],Array.isArray(a[5])?a[5]:[],Array.isArray(a[6])?a[6]:[],Array.isArray(a[7])?a[7]:[]];return a.length>4?[t1,t2,+a[2]||0,+a[3]||0,Array.isArray(a[4])?a[4]:[],Array.isArray(a[5])?a[5]:[]]:[t1,t2,+a[2]||0,+a[3]||0]}).filter(Boolean):[])});
      if(s.sim.ko&&typeof s.sim.ko=="object")Object.keys(s.sim.ko).forEach(rd=>{if(Array.isArray(s.sim.ko[rd]))s.sim.ko[rd]=s.sim.ko[rd].map(p=>{if(!p||typeof p!="object")return null;const t1=m2(p.t1),t2=m2(p.t2),w=p.w!=null?m2(p.w):null;return t1!=null&&t2!=null?Object.assign({},p,{t1,t2,w}):null}).filter(Boolean)});
      if(s.sim.sc)s.sim.sc=rmMap(s.sim.sc);
      if(s.sim.as)s.sim.as=rmMap(s.sim.as);
      if(s.sim.mom)s.sim.mom=rmMap(s.sim.mom);
      rebuildSimScorers(s);
    }
    if(s.res&&typeof s.res=="object"){if(s.res.ch!=null)s.res.ch=m2(s.res.ch);if(s.res.ru!=null)s.res.ru=m2(s.res.ru);if(s.res.topG&&s.res.topG.ti!=null)s.res.topG.ti=m2(s.res.topG.ti);if(s.res.mvp&&s.res.mvp.ti!=null)s.res.mvp.ti=m2(s.res.mvp.ti);if(s.res.tots&&typeof s.res.tots=="object"){let okT=true;["F","M","D","K"].forEach(k=>{if(Array.isArray(s.res.tots[k])){s.res.tots[k]=s.res.tots[k].map(p=>{if(!p)return null;const ti=m2(p.ti);return ti!=null?Object.assign({},p,{ti}):null}).filter(Boolean)}else okT=false});if(!okT||s.res.tots.K.length<1||s.res.tots.D.length<4||s.res.tots.M.length<3||s.res.tots.F.length<3)s.res.tots=null}}
    if(s.my!=null)s.my=m(s.my);
    if(s.P)s.P=s.P.map(m).filter(x=>x!==null);
    if(s.sn&&typeof s.sn=="object"){const nsn=nob();Object.entries(s.sn).forEach(([k,v])=>{const nk=ALIAS[k]||k;if(IX[nk]!==undefined)nsn[nk]=v});s.sn=nsn}
    (s.mt||[]).forEach(q=>{if(q&&q.opp!=null)q.opp=m2(q.opp)})};
  o.seasons.forEach(rmS);(o.trash||[]).forEach(t=>{if(t&&t.s)rmS(t.s)});
  return o}
function mig(o){
  DROP=[];
  if(!(o.v>=4)){
    const RK=[0,3,4,5,6,7];
    o.tn=OLDN.map(n=>ALIAS[n]||n);
    o.seasons.forEach(s=>{
      if(s.res)s.res.st=RK[s.res.st]!=null?RK[s.res.st]:0;
      s.cfg={N:64,gs:8,q:2,gl:1,kl:1,fl:1};s.rl=cp(DEFR);
      s.P=(s.G||[]).flat();s.lk=s.P.length>0;if(!s.lk)s.P=null});
    o.v=4}
  remap(o);o.tn=TN;return o}
let st={tab:0,dr:null,k:0,isGenerating:false},store={v:4,tn:TN,cur:1,nx:1,seasons:[mk(1,1)]},loadWarn="";
const K5=["w","d","l","gf","ga"];
const mres=m=>m.gf>m.ga?"w":m.gf<m.ga?"l":(m.pf!=null&&m.pa!=null&&m.pf!==m.pa?(m.pf>m.pa?"w":"l"):"d");
const mscTxt=m=>`${m.gf}–${m.ga}${m.pf!=null&&m.pa!=null?` (P ${m.pf}–${m.pa})`:m.et?" (UZ)":""}`;
function ixOf(n){if(IX[n]!==undefined)return IX[n];const a=ALIAS[n];return a!==undefined&&IX[a]!==undefined?IX[a]:undefined}
function msum(s){const r=Object.assign(nob(),{w:0,d:0,l:0,gf:0,ga:0});(s.mt||[]).forEach(m=>{const a=+m.gf||0,b=+m.ga||0;r[mres(m)]++;r.gf+=a;r.ga+=b});return r}
function reTs(s){const m=msum(s),b=s.tb||nob();s.ts=s.ts||nob();K5.forEach(k=>{s.ts[k]=Math.max(0,(+b[k]||0)+m[k])})}
function baseOf(s){const m=msum(s),b=nob();K5.forEach(k=>{const d=(+(s.ts||{})[k]||0)-m[k];if(d)b[k]=d});return b}
const isKK=n=>{const k=nz(n);return k==="kk"||k==="kendi kalesine"};
function plMsum(s){
  const M=nob();
  const ensure=(n)=>{if(isKK(n))return null;const k=nz(n);if(!k)return null;return M[k]=M[k]||{n:String(n).trim(),g:0,a:0,m:0,mom:0}};
  (s.mt||[]).forEach(m=>{
    const seen=new Set();
    Object.entries(m.sc||{}).forEach(([n,g])=>{if(+g>0){const o=ensure(n);if(o){o.g+=+g;seen.add(nz(n))}}});
    Object.entries(m.as||{}).forEach(([n,a])=>{if(+a>0){const o=ensure(n);if(o){o.a+=+a;seen.add(nz(n))}}});
    if(m.mom){const o=ensure(m.mom);if(o){o.mom+=1;seen.add(nz(m.mom))}}
    seen.forEach(k=>{if(M[k])M[k].m+=1});
  });
  return M}
function rePl(s){
  s.pl=(s.pl||[]).filter(p=>p&&!isKK(p.n));
  const M=plMsum(s);
  const byK=new Map();
  s.pl.forEach(p=>{
    const k=nz(p.n);if(!k)return;
    if(!byK.has(k))byK.set(k,p);
  });
  Object.entries(M).forEach(([k,mv])=>{
    if(!byK.has(k)){
      const f=sqFindAny(mv.n);
      const np={n:f?f.p.n:mv.n,g:0,a:0,m:0,mom:0,k:0,b:Object.assign(nob(),{g:0,a:0,m:0,mom:0,k:0})};
      s.pl.push(np);byK.set(k,np);
    }
  });
  s.pl.forEach(p=>{
    const k=nz(p.n),mv=M[k]||{g:0,a:0,m:0,mom:0};
    if(!p.b||typeof p.b!="object"){
      p.b=Object.assign(nob(),{
        g:Math.max(0,(p.g||0)-mv.g),
        a:Math.max(0,(p.a||0)-mv.a),
        m:Math.max(0,(p.m||0)-mv.m),
        mom:Math.max(0,(p.mom||0)-mv.mom),
        k:p.k||0
      });
    }else{
      p.b=toNob(p.b);
    }
    ["g","a","m","mom","k"].forEach(f=>{
      const base=mv[f]||0,man=+p.b[f]||0;
      p[f]=Math.max(0,base+man);
    });
    if((p.g>0||p.a>0)&&p.m==0)p.m=1;
  });
}
function snapOf(s){const q=nob();(s.P||[]).forEach(i=>{const t=T[i];if(t)q[t.n]=[t.g,t.a,t.o,t.d]});return q}
function hasSn(s){return !!s&&!!s.sn&&typeof s.sn=="object"&&Object.keys(s.sn).length>0}
function withSn(s,fn){
  if(!hasSn(s))return fn();
  const bak=[];
  T.forEach(t=>{const q=s.sn[t.n];if(Array.isArray(q)&&q.length==4&&q.every(Number.isFinite)){bak.push([t,t.g,t.a,t.o,t.d]);t.g=q[0];t.a=q[1];t.o=q[2];t.d=q[3]}});
  try{return fn()}finally{bak.forEach(([t,g,a,o,d])=>{t.g=g;t.a=a;t.o=o;t.d=d})}}
const RT=(s,i)=>{const t=T[i],q=hasSn(s)&&s.sn[t.n];return Array.isArray(q)&&q.length==4?{n:t.n,c:t.c,g:q[0],a:q[1],o:q[2],d:q[3]}:t};
const toNob=o=>{const n=nob();if(o&&typeof o=="object"&&!Array.isArray(o))Object.entries(o).forEach(([k,v])=>{if(k!=="__proto__"&&k!=="constructor"&&k!=="prototype")n[k]=v});return n};
const norm=()=>store.seasons.forEach(s=>{
  s.pl=s.pl||[];s.mt=s.mt||[];s.delM=Array.isArray(s.delM)?s.delM:[];s.ts=toNob(s.ts);s.oy=Object.assign(nob(),{d:"",h:"",c:""},s.oy&&typeof s.oy=="object"?toNob(s.oy):{});
  s.cfg=Object.assign(cp(DEFC),s.cfg||{});fixC(s.cfg);
  s.rl=Object.assign(cp(DEFR),s.rl||{});s.rl.xc=s.rl.xc||[];
  if(s.G===undefined)s.G=null;
  s.gqs=(s.gqs&&typeof s.gqs=="object")?toNob(s.gqs):nob();ensureSim(s);if(!Object.keys(s.sim.sc||{}).length)rebuildSimScorers(s);
  s.P=s.P||null;s.lk=!!s.lk&&!!s.P;
  (s.mt||[]).forEach(m=>{const j=ixOf(m.on);if(j!==undefined)m.opp=j;m.sc=toNob(m.sc);m.as=toNob(m.as);if(m.stats===undefined||typeof m.stats!="object")m.stats=null});
  if(s.sn!=null&&typeof s.sn!="object")s.sn=null;
  if(s.sn)s.sn=toNob(s.sn);
  if(s.lk&&s.P&&!hasSn(s))s.sn=snapOf(s);
  if(s.tb==null||typeof s.tb!="object")s.tb=baseOf(s);else s.tb=toNob(s.tb);
  reTs(s);rePl(s)});if(store.achd)store.achd=toNob(store.achd);
norm();
const cur=()=>store.seasons.find(s=>s.id==store.cur)||store.seasons[0];
const defMst=()=>({myPos:"",oppPos:"",myShots:"",oppShots:"",mySot:"",oppSot:"",myPass:"",oppPass:"",myXg:"",oppXg:""});
const sync=()=>{st.ti=null;st.pi=null;st.totsv=null;st.guide=false;st.dr=null;st.k=0;st.mg=0;st.mo=0;st.mu=0;st.mp=0;st.mpf=0;st.mpa=0;st.mgls=[];st.msc=nob();st.mas=nob();st.mmom="";st.mop=null;st.mlg=null;st.qs=false;st.trm=null;st.fxw=0;st.fxv=null;st.bkv=null;st.med=null;st.mall=false;st.sall=false;st.madv=false;st.isGenerating=false;st.mst=defMst();st.mexp=nob();if(!st.stab)st.stab="m"};
function refreshQuota(reRender){
  if(typeof estimateStorage!=="function")return Promise.resolve(null);
  return estimateStorage().then(est=>{
    if(est){st.qest=est;if(reRender&&st.tab==6)render()}
    return est;
  }).catch(()=>null);
}
if(typeof setSaveStatusCallback==="function"){
  setSaveStatusCallback(ok=>{const prev=!!st.sf;st.sf=!ok;refreshQuota(false);if(prev!==st.sf)render()});
}
let lastSavedRaw="";
const save=(immediate)=>{
  if(st.readFail)return Promise.resolve(false); // okuma hatasında mevcut kaydı boş veriyle ezme (v18.3)
  if(st.staleTab){ntfReload("Başka bir sekmede değişiklik yapıldı, veri kaybı yaşamamak için sayfayı yenileyin.");return Promise.resolve(false)}
  achScan(true);store.v=4;store.tn=TN;
  const raw=lastSavedRaw=JSON.stringify(store);
  try{if(store.theme!==undefined)localStorage.setItem("fc26lig4_theme",store.theme);if(store.motion!==undefined)localStorage.setItem("fc26lig4_motion",String(store.motion))}catch(e){}
  if(typeof queueSave==="function")return queueSave(raw,!!immediate);
  return kv.set("fc26lig4",raw).then(ok=>{const prev=!!st.sf;st.sf=!ok;if(prev!==st.sf)render();return ok})};
const nm=i=>(cur().my===i?"★ ":"")+T[i].n;
const rlb=(r,c,grk)=>{const rk=r.grk||grk;let t=c?stTxt(c,r.st):SN[r.st];if(r.st===0&&c&&!isLg(c)&&rk)t=`Grupta ${rk}. oldun ve elendin`;return t+(r.pts!=null?" · "+r.pts+" puan":"")};
const ask=(m,fn)=>{st.ask={m,fn}};
const sum=(a,f)=>a.reduce((s,p)=>s+p[f],0);
const DIFF=[["Kısıtlama yok (tüm takımlar)",0],["Güçlüleri çıkar",.15],["Orta güç",.4],["Zayıf takımlar",.6]];
const dcut=(s,d)=>Math.min(s.P.length-1,Math.round(s.P.length*(DIFF[d]?DIFF[d][1]:0)));
const cd=(t,b)=>`<div class="card pglass"><h3>${t}</h3>${b}</div>`;
const R2=(a,b)=>`<div class="row"><span class="n">${a}</span><b>${b}</b></div>`;
const tsT=k=>store.seasons.reduce((a,x)=>a+(x.ts[k]||0),0);
function gInfo(s){
  if(!s.G)return "";
  const gi=s.G.findIndex(g=>g.includes(s.my));if(gi<0)return "";
  const rv=s.G[gi].filter(i=>i!==s.my);if(!rv.length)return "";
  const r=s.G.map(g=>avg(g,"g")).map((v,i)=>[v,i]).sort((a,b)=>b[0]-a[0]).findIndex(x=>x[1]==gi)+1;
  return "Rakip ortalaması "+fx(rv.reduce((a,i)=>a+T[i].g,0)/rv.length)+" · "+(s.cfg.gs?"Grup":"Eşleşme")+" gücü "+r+"/"+s.G.length+(s.cfg.gs&&s.G.length>=4&&r<=2?" · ☠ Ölüm grubu":"")}
function sumText(x){const t=x.ts,dna=calcTacticalDNA(x),xgM=(x.mt||[]).filter(m=>m.stats&&m.stats.myXg!=null),totG=xgM.reduce((a,m)=>a+(+m.gf||0),0),totX=xgM.reduce((a,m)=>a+(+m.stats.myXg||0),0),xd=totG-totX;return [`FC 27 · ${x.name}`,fmt(x.cfg),x.my!=null?`Takım: ${T[x.my].n} (${CN[T[x.my].c][0]})`:"",x.res?`Sonuç: ${rlb(x.res,x.cfg,x.grk)}`:"Devam ediyor",(t.w||t.d||t.l||t.gf||t.ga)?`G-B-M: ${t.w||0}-${t.d||0}-${t.l||0} · Gol: ${t.gf||0}/${t.ga||0}`:"",xgM.length?`xG Analizi (${xgM.length} maç): ${totX.toFixed(2).replace(".",",")} xG · Verimlilik ${(xd>0?"+":"")+xd.toFixed(2).replace(".",",")} (${xd>=0?"Mükemmel bitiricilik":"Bitiricilik sorunu"})`:"",dna?`Menajer Kimliği: ${dna.title} (Hücum ${dna.atk} · Kontrol ${dna.ctrl} · Agresyon ${dna.aggr} · Verimlilik ${dna.eff})`:"",x.pl.length?`Oyuncular: ${sum(x.pl,"g")} gol · ${sum(x.pl,"a")} asist`:""].filter(Boolean).join("\n")}
function tsCard(list){const S=list||store.seasons,tK=k=>S.reduce((a,x)=>a+((x.ts||{})[k]||0),0),w=tK("w"),d=tK("d"),l=tK("l"),n=w+d+l;if(!n)return "";
  return cd("Takım toplamları",R2("Maç",n)+R2("G-B-M",w+"-"+d+"-"+l)+R2("Galibiyet oranı","%"+Math.round(w/n*100))+R2("Atılan / yenen gol",tK("gf")+" / "+tK("ga"))+R2("Maç başı gol",fx(tK("gf")/n)))}
function weak(x){if(x.my==null||!x.P||x.P.length<4)return false;return withSn(x,()=>{const p=x.P.slice().sort((a,b)=>V(T[b])-V(T[a]));return p.indexOf(x.my)>=Math.floor(p.length*.6)})}
function achList(raw){const out=achRaw();return raw?out:out.map(a=>a.done?a:(Array.isArray(store.ach)&&store.ach.includes(a.id)?Object.assign({},a,{done:true}):a))}
function achRaw(){
  const S=store.seasons,f=S.filter(x=>x.res),M=[];
  S.forEach(x=>(x.mt||[]).forEach(m=>M.push(m)));
  const top=k=>Math.max(0,...S.map(x=>Math.max(0,...(x.pl||[]).map(p=>p[k]||0))));
  const champ=f.filter(x=>x.res.st==7).length;
  const cupCh=f.filter(x=>!isLg(x.cfg)&&x.res.st==7).length;
  const lgCh=f.filter(x=>isLg(x.cfg)&&x.res.st==7).length;
  const pkWins=M.filter(m=>m.pf!=null&&m.pa!=null&&m.pf>m.pa).length;
  const clCnt=clutchStats(S).reduce((a,o)=>a+o.ga,0);
  let run=0,streak=0;M.forEach(m=>{if(mres(m)=="w"){run++;streak=Math.max(streak,run)}else run=0});
  const B=(id,ic,name,desc,cur,goal)=>({id,ic,name,desc,cur:Math.min(cur,goal),goal,done:cur>=goal}),Y=(id,ic,name,desc,ok)=>B(id,ic,name,desc,ok?1:0,1);
  return [
    Y("c1","🏆","İlk Zafer","Kariyerindeki ilk turnuva veya lig şampiyonluğunu kazan.",champ>=1),
    Y("c_cup","🏆","Kupa Beyi","Eleme usulü bir kupa turnuvasında şampiyonluğa ulaş.",cupCh>=1),
    Y("c_lg","🥇","Lig Maratoncusu","Puan usulü bir lig sezonunu 1. sırada tamamla.",lgCh>=1),
    B("c3","👑","Hanedanlık (3 Kupa)","Kariyerinde toplam 3 kez şampiyonluk kupası kaldır.",champ,3),
    Y("gr","🎟️","Grup Lideri / Çıkışı","Gruplu bir turnuvada grup aşamasını geçip eleme turuna yüksel.",f.some(x=>!isLg(x.cfg)&&x.cfg.gs&&x.res.st>=1)),
    Y("fn","🥈","Final Sahnesi","Bir kupa turnuvasında adını finale yazdır.",f.some(x=>!isLg(x.cfg)&&x.res.st>=6)),
    Y("f2","🔥","Final Abonesi","Üst üste 2 sezonda final oyna veya ilk 2’de bitir.",S.some((x,i)=>i&&x.res&&S[i-1].res&&x.res.st>=6&&S[i-1].res.st>=6)),
    Y("wk","🦁","Peri Masalı (Underdog)","Turnuvanın güç olarak son dilimindeki zayıf bir takımla şampiyon ol.",f.some(x=>x.res.st==7&&weak(x))),
    Y("un","🛡️","Namağlup Zafer","En az 3 maç oynanan bir sezonu hiç yenilgi almadan tamamla.",S.some(x=>{const t=x.ts||{};return !!x.res&&(t.w||0)+(t.d||0)+(t.l||0)>=3&&!t.l})),
    B("st5","⚡","5’te 5 Galibiyet Serisi","Arka arkaya 5 maç kazanarak durdurulamaz bir seri yakala.",streak,5),
    B("cs5","🧤","Demir Perde (5 Temiz Kasa)","Toplam 5 maçı kalende hiç gol görmeden tamamla.",M.filter(m=>m.ga==0).length,5),
    Y("ht","⚽","Hat-Trick Kahramanı","Bir maçta aynı oyuncunla en az 3 gol at.",M.some(m=>Object.entries(m.sc||{}).some(([k,g])=>!isKK(k)&&g>=3))),
    Y("bg","💥","Tarihi Fark (4+ Gol)","Bir maçı en az 4 gol farkla kazan.",M.some(m=>m.gf-m.ga>=4)),
    B("pk2","🎯","Penaltı Ustası","Seri penaltı atışlarına giden 2 eleme maçını kazan.",pkWins,2),
    B("cl10","🌟","Büyük Maç Oyuncusu","Eleme ve final turlarında oyuncularınla toplam 10 gol/asist katkısına ulaş.",clCnt,10),
    B("g20","👟","Altın Ayakkabı (20+ Gol)","Tek bir sezonda bir oyuncunla 20 veya daha fazla gol at.",top("g"),20),
    B("a15","🎩","Asist Kralı (15+ Asist)","Tek bir sezonda bir oyuncunla 15 veya daha fazla asist yap.",top("a"),15),
    B("w10","📈","10 Galibiyet Barajı","Kariyerinde toplam 10 maç galibiyetine ulaş.",tsT("w"),10),
    B("gf50","🚀","50 Gol Barajı","Kariyerinde rakip filelere toplam 50 gol gönder.",tsT("gf"),50),
    B("s5","🎖️","Tecrübeli Menajer (5 Sezon)","Kariyerinde 5 sezonu tamamla.",f.length,5)
  ]}
function achScan(noWrite){try{
  const R=achList(true),now=R.filter(a=>a.done).map(a=>a.id);
  let prev=Array.isArray(store.ach)?store.ach.slice():null;
  if(prev&&store.achv!==2)prev=prev.filter(id=>now.includes(id));
  const all=prev?prev.concat(now.filter(id=>!prev.includes(id))):now.slice(),nw=prev?R.filter(a=>a.done&&!prev.includes(a.id)):[];
  if(nw.length){st.nb=(st.nb||[]).concat(nw.map(a=>a.name));const d=store.achd=toNob(store.achd);nw.forEach(a=>{d[a.id]=today()})}
  if(store.achv!==2||nw.length||JSON.stringify(all)!=JSON.stringify(store.ach)){store.ach=all;store.achv=2;if(!noWrite){if(typeof queueSave==="function")queueSave(JSON.stringify(store),false);else kv.set("fc26lig4",JSON.stringify(store))}}
}catch(e){}}
function achCard(){
  const A=achList(),so=A.slice().sort((x,y)=>(y.done-x.done)||(y.cur/y.goal-x.cur/x.goal));
  return so.map(a=>`<div class="ach${a.done?" un":""}"><div class="pt"><span class="n"><b>${a.ic||"🏅"} ${esc(a.name)}</b></span>${a.done?`${(store.achd||{})[a.id]?`<span class="lb">${esc(store.achd[a.id])}</span> `:""}<b class="ok" aria-label="Kazanıldı">✓ Kazanıldı</b>`:`<b class="lb">${a.cur}/${a.goal}</b>`}</div><div class="lb" style="margin-top:2px">${esc(a.desc||"")}</div>${!a.done&&a.goal>1?`<div class="bk" role="progressbar" aria-label="${esc(a.name)}" aria-valuemin="0" aria-valuemax="${a.goal}" aria-valuenow="${a.cur}"><i style="width:${a.cur/a.goal*100}%"></i></div>`:""}</div>`).join("")}
function chartCard(list){const f=(list||store.seasons).filter(x=>x.res);
  if(f.length<2)return cd("Grafikler",`<div class="note">Grafik için bu kategoride en az 2 biten sezon gerekli.</div>`);
  const n=f.length,L=46,R=294,B=118,Hh=100,slot=(R-L)/n,cx=i=>L+slot*(i+.5),ev=Math.ceil(n/10);
  const ax=f.map((x,i)=>i%ev?"":`<text x="${cx(i)}" y="134" font-size="10" text-anchor="middle" style="fill:var(--mut)">${esc(x.name.replace("Sezon ","S"))}</text>`).join("");
  const gl=(y,t)=>`<line x1="${L}" x2="${R}" y1="${y}" y2="${y}" style="stroke:var(--bd)"/><text x="${L-4}" y="${y+3}" font-size="9" text-anchor="end" style="fill:var(--mut)">${t}</text>`;
  const rk=[...new Set(f.flatMap(x=>resRanks(x.cfg).concat([x.res.st])))].sort((a,b)=>a-b),yk=r=>B-rk.indexOf(r)/Math.max(1,rk.length-1)*Hh,bw=Math.min(34,slot*.62);
  const allLg=f.every(x=>isLg(x.cfg)),LRS={0:"Alt",4:"Orta",5:"3.",6:"2.",7:"Şamp."};const c1=rk.map(r=>gl(yk(r),allLg?(LRS[r]||RS[r]):RS[r])).join("")+f.map((x,i)=>{const h=Math.max(3,B-yk(x.res.st));return `<rect x="${cx(i)-bw/2}" y="${B-h}" width="${bw}" height="${h}" rx="3" style="fill:${x.res.st==7?"var(--gold)":"var(--ac)"}"><title>${esc(x.name)}: ${stTxt(x.cfg,x.res.st)}</title></rect>`}).join("");
  const gv=f.map(x=>sum(x.pl,"g")),av=f.map(x=>sum(x.pl,"a")),mx=Math.max(5,...gv,...av),yv=v=>B-v/mx*Hh,bw2=Math.min(16,slot*.34),tk=[...new Set([0,Math.round(mx/2),mx])];
  const bar=(x,v,c)=>`<rect x="${x}" y="${yv(v)}" width="${bw2}" height="${v>0?B-yv(v):0}" rx="2" style="fill:${c}"/>`;
  const lab=(v,x)=>n<=8&&v>0?`<text x="${x}" y="${yv(v)-3}" font-size="8" text-anchor="middle" style="fill:var(--tx)">${v}</text>`:"";
  const c2=tk.map(v=>gl(yv(v),v)).join("")+f.map((x,i)=>{const xa=cx(i)-bw2-1,xb=cx(i)+1;return bar(xa,gv[i],"var(--ac)")+bar(xb,av[i],"var(--mut)")+lab(gv[i],xa+bw2/2)+lab(av[i],xb+bw2/2)}).join("");
  return cd("Grafikler",`<div class="lb">Ulaşılan derece (altın çubuk: şampiyonluk)</div><svg viewBox="0 0 300 140" style="width:100%" role="img" aria-label="Sezonlara göre ulaşılan derece">${c1}${ax}</svg><div class="lb">Gol (renkli) ve asist (gri)</div><svg viewBox="0 0 300 140" style="width:100%" role="img" aria-label="Sezonlara göre gol ve asist">${c2}${ax}</svg>`)}
function cmpCard(){const S=store.seasons;if(S.length<2)return "";
  const a=S.find(x=>x.id==st.ca)||S[0],b=S.find(x=>x.id==st.cb)||S[1];
  const o=x=>S.map(y=>`<option value="${y.id}" ${y.id==x.id?"selected":""}>${esc(y.name)}</option>`).join("");
  const g=x=>[x.ts.w,x.ts.d,x.ts.l].map(v=>v||0).join("-");
  const rows=[["Format",x=>isLg(x.cfg)?x.cfg.N+" takım · puan ligi":x.cfg.N+" takım"+(x.cfg.gs?" · "+x.cfg.gs+"’lü grup":" · eleme")],["Takım",x=>x.my!=null?T[x.my].n:"—"],["Sonuç",x=>x.res?rlb(x.res,x.cfg,x.grk):"Devam"],["Oyun ayarı",x=>oyTxt(x)||"—"],["Gol",x=>sum(x.pl,"g")],["Asist",x=>sum(x.pl,"a")],["G-B-M",g],["Atılan/yenen",x=>(x.ts.gf||0)+"/"+(x.ts.ga||0)]];
  return `<div class="card pglass pcmp"><h3>Sezon karşılaştır</h3><div class="cmp"><select id="ca" class="sel">${o(a)}</select><select id="cb" class="sel">${o(b)}</select></div>`+rows.map(([l,f])=>`<div class="row"><span class="lb" style="width:82px">${l}</span><span class="n">${esc(f(a))}</span><span class="n">${esc(f(b))}</span></div>`).join("")+`</div>`}
function fmtBytes(b){
  if(!Number.isFinite(b)||b<=0)return "0 KB";
  if(b<1024*1024)return Math.max(1,Math.round(b/1024))+" KB";
  if(b<1024*1024*1024)return (b/(1024*1024)).toFixed(2).replace(".",",")+" MB";
  return (b/(1024*1024*1024)).toFixed(2).replace(".",",")+" GB";
}
const psetCard=(ic,tone,ttl,sub,pill,body)=>`<div class="card pglass pset ${tone}"><div class="pset-h"><span class="aci">${UICO[ic]}</span><div class="pset-t"><b>${ttl}</b>${sub?`<small>${sub}</small>`:""}</div>${pill?`<span class="xfpill ${tone}">${pill}</span>`:""}</div>${body}</div>`;
function quotaCard(){
  const q=st.qest,mode=(q&&q.mode)||((typeof kv!=="undefined"&&kv.mode)?kv.mode():"idb");
  const rawLen=(lastSavedRaw?lastSavedRaw.length:JSON.stringify(store).length)*2;
  const appB=q&&q.appBytes?Math.max(rawLen,q.appBytes):rawLen;
  const usedB=q&&q.usage?Math.max(appB,q.usage):appB;
  const quotaB=q&&q.quota?q.quota:(mode==="ls"?5*1024*1024:0);
  const pctVal=quotaB>0?Math.min(100,(usedB/quotaB)*100):0;
  const pctStr=quotaB>0?(pctVal<0.1&&usedB>0?"<%0,1":"%"+pctVal.toFixed(pctVal<1?2:1).replace(".",",")):"Dinamik";
  const barW=quotaB>0?Math.max(3,Math.round(pctVal)):4;
  const leg=(typeof legacyLsInfo==="function")?legacyLsInfo():{hasLegacy:false,bytes:0};
  const legHtml=leg.hasLegacy?`<div class="pset-sub"><div class="pt"><span class="n">Eski localStorage taşıma yedeği</span><span class="xfpill">${fmtBytes(leg.bytes)}</span></div><div class="note" style="margin:4px 0 8px">IndexedDB’ye geçiş sırasında güvenlik için saklanan eski kopya. Uygulama artık bunu okumaz.</div><button class="btn pset-b" data-a="oldlsx" style="width:100%">Eski localStorage kopyasını sil</button></div>`:"";
  const body=`<div class="pset-kpi">`+
    `<div class="pk2 emr"><b>${fmtBytes(appB)}</b><span>Uygulama Verisi</span></div>`+
    `<div class="pk2 sky"><b>${fmtBytes(usedB)}</b><span>Tarayıcı Toplamı</span></div>`+
    `<div class="pk2 gold"><b>${quotaB>0?fmtBytes(quotaB):"Sınırsız"}</b><span>Toplam Kota</span></div>`+
    `</div>`+
    `<div class="pset-bar"><div class="pset-bl"><span>Depolama Doluluğu</span><b>${pctStr} dolu</b></div><div class="dnabar" style="margin:0" role="progressbar" aria-label="Depolama doluluk oranı" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pctVal)}"><i style="width:${barW}%"></i></div></div>`+
    `<div class="note" style="margin:8px 0 0">${mode==="idb"?"Verilerin yüksek kapasiteli IndexedDB veritabanında güvenle saklanıyor.":"IndexedDB açılamadığı için 5 MB sınırlı localStorage kullanılıyor."}</div>`+legHtml;
  return psetCard("db",mode==="idb"?"emr":"org","Depolama ve Kota","Tarayıcı hafıza durumu",mode==="idb"?"IndexedDB":"localStorage",body);
}
function setView(){const dk=store.theme||"",motOn=store.motion===0?0:1;if(!st.qest)refreshQuota(true);
  const appPref=psetCard("theme","emr","Görünüm ve Deneyim","Tema ve animasyon tercihleri",dk=="light"?"Açık":dk=="dark"?"Koyu":"Oto",
    `<div class="pset-lbl">Tema</div>`+
    `<div class="stabs seg3" role="radiogroup" aria-label="Tema seçimi">${[["","Otomatik"],["light","Taktik Tahtası"],["dark","Gece Stadyumu"]].map(([v,l])=>`<button class="chip ${dk==v?"on":""}" data-a="theme" data-v="${v}">${l}</button>`).join("")}</div>`+
    `<div class="pset-lbl" style="margin-top:12px">Hareket ve Efektler</div>`+
    `<div class="note" style="margin:0 0 8px">Sekme geçişi, kart parlaması, kura ve takım seçimi animasyonu, konfeti ve havai fişek.</div>`+
    `<div class="stabs seg2" style="margin:0" role="radiogroup" aria-label="Hareket tercihi">${[[1,"Açık"],[0,"Kapalı"]].map(([v,l])=>`<button class="chip ${motOn==v?"on":""}" data-a="mot" data-v="${v}">${l}</button>`).join("")}</div>`
  );
  const bkPill=store.lb?dTR(store.lb):"Yedek yok";
  const bkCard=psetCard("backup",store.lb?"emr":"gold","Yedekleme","Sezonların yalnızca bu tarayıcıda saklanır",bkPill,
    `<div class="pset-stat${store.lb?"":" warn"}">${bkInfo()}${st.pers===false?`<br><span class="wr">⚠ Tarayıcı kalıcı depolama iznini onaylamadı; düzenli dosya yedeği alman önerilir.</span>`:""}</div>`+
    `<div class="pset-acts"><button class="btn p pset-pri" data-a="exf">${UICO.backup}<span>Yedeği İndir</span></button><button class="btn pset-sec" data-a="imfb">${UICO.upload}<span>Dosyadan Yükle</span></button></div>`+
    `<input type="file" id="imf" accept=".json,application/json,text/plain" hidden>`+
    (st.bkadv?`<div class="pset-sub"><div class="pset-lbl" style="margin-top:0">Yedek Kodu (Gelişmiş)</div><textarea id="bk" class="f" rows="4" placeholder="Yedek kodu burada görünür ya da buraya yapıştır">${st.bk?esc(st.bk):""}</textarea><div class="bar" style="margin:6px 0"><button class="btn" data-a="ex">Oluştur</button><button class="btn" data-a="cpb">Kopyala</button><button class="btn p" data-a="im">Geri yükle</button></div><button class="chip" data-a="bkadv" style="width:100%">Yedek kodunu gizle</button></div>`:`<button class="pset-link" data-a="bkadv"><span>Yedek kodu ile aktar (gelişmiş)</span><span>›</span></button>`)
  );
  const poolCard=psetCard("shield","sky","Takım Havuzu","EA FC 27 güncel kadroları",`${T.length} takım`,
    `<div class="dnamets" style="margin:0 0 8px"><span class="dnam"><b>${T.length}</b><em>Takım</em></span><span class="dnam"><b>${new Set(T.map(t=>t.c)).size}</b><em>Ülke</em></span><span class="dnam"><b>FC 27</b><em>Veritabanı</em></span></div>`+
    `<div class="note" style="margin:0">Brezilya takımları hariç güncel kulüp kadroları dahildir.</div>`+
    `<details class="dnatip"><summary>Yasal uyarı ve telif bilgisi</summary><p>Bu uygulama ticari olmayan, reklamsız, açık kaynaklı bağımsız bir turnuva takip aracıdır. Electronic Arts Inc. (EA Sports), FIFA, UEFA veya herhangi bir futbol kulübü/federasyonu ile resmi bağlantısı ya da onayı yoktur. Kulüp armaları telif içermez; renk ve harflerden jenerik SVG olarak üretilir.</p></details>`
  );
  const guideCard=psetCard("app","sky","Kullanım Kılavuzu","Adım adım rehber ve kısayollar","6 bölüm",
    `<div class="note" style="margin:0 0 10px">Kurulum, simülasyon, xG/xPts analizi, PNG posterler ve yedekleme hakkında kısa, çevrimdışı rehber.</div>`+
    `<button class="btn pset-sec" data-a="guide" style="width:100%">📖 Kullanım Kılavuzunu Aç</button>`
  );
  return appPref+bkCard+quotaCard()+rcvCard()+trashCard()+appCard()+guideCard+poolCard+resetCard()}

sync();

/* ---------- YEDEK, İÇE AKTARMA, ÇÖP KUTUSU, SIFIRLAMA ---------- */
const newId=()=>{const ids=new Set(store.seasons.map(x=>x.id));let n=Date.now();while(ids.has(n))n++;return n};
const nMatch=()=>store.seasons.reduce((a,x)=>a+((x.mt||[]).length),0);
const dTR=t=>new Date(Number(t)).toLocaleDateString("tr-TR");
function vS(s){
  if(!s||typeof s!="object"||s.id==null||typeof s.name!="string")return false;
  if(s.mt!=null&&!Array.isArray(s.mt))return false;
  if(s.delM!=null&&!Array.isArray(s.delM))delete s.delM;
  if(s.delM)s.delM=s.delM.map(x=>+x).filter(Number.isFinite);
  if(s.pl!=null&&!Array.isArray(s.pl))return false;
  if(s.ts!=null&&typeof s.ts!="object")return false;
  if(s.tb!=null&&typeof s.tb!="object")return false;
  if(s.sn!=null&&typeof s.sn!="object")return false;
  if(s.gqs!=null&&typeof s.gqs!="object")return false;
  if(s.gqs){Object.keys(s.gqs).forEach(k=>{if(!Array.isArray(s.gqs[k]))delete s.gqs[k];else s.gqs[k]=s.gqs[k].map(x=>+x).filter(Number.isInteger)})}
  if(s.sim!=null&&typeof s.sim!="object")delete s.sim;
  if(s.res!=null&&!(typeof s.res=="object"&&Number.isInteger(s.res.st)&&s.res.st>=0&&s.res.st<=7))return false;
  s.date=String(s.date||"");
  if(s.res){s.res.date=String(s.res.date||"");if(s.res.pts!=null&&!Number.isFinite(+s.res.pts))s.res.pts=null;if(s.res.grk!=null&&!Number.isFinite(+s.res.grk))s.res.grk=null}
  for(const m of (s.mt||[])){
    if(!m||typeof m!="object"||!Number.isFinite(+m.gf)||!Number.isFinite(+m.ga))return false;
    m.gf=+m.gf;m.ga=+m.ga;m.on=String(m.on||"");m.rd=String(m.rd||"");
    if(m.gls!=null){if(!Array.isArray(m.gls))delete m.gls;else m.gls=m.gls.filter(g=>g&&typeof g=="object"&&g.sc).map(g=>({sc:String(g.sc||"").slice(0,30),as:String(g.as||"").slice(0,30)}))}
    if(m.stats!=null&&typeof m.stats!="object")m.stats=null}
  return true}
function vBk(o){
  if(!o||typeof o!="object"||!okS(o))return null;
  if(!o.seasons.every(vS))return null;
  o.trash=Array.isArray(o.trash)?o.trash.filter(t=>t&&vS(t.s)):[];
  if(o.delS!=null&&!Array.isArray(o.delS))delete o.delS;
  if(o.delS)o.delS=o.delS.map(x=>+x).filter(Number.isFinite);
  if(o.ach!=null&&!Array.isArray(o.ach))delete o.ach;
  if(o.achd!=null&&typeof o.achd!="object")delete o.achd;
  return o}
function b64Dec(s){const bin=atob(s.replace(/\s+/g,""));if(typeof TextDecoder!="undefined"){const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new TextDecoder("utf-8").decode(u)}return decodeURIComponent(escape(bin))}
function b64Enc(s){if(typeof TextEncoder!="undefined"){const u=new TextEncoder().encode(s);let b="";for(let i=0;i<u.length;i++)b+=String.fromCharCode(u[i]);return btoa(b)}return btoa(unescape(encodeURIComponent(s)))}
function parseBk(t){t=(t||"").trim();if(!t)return null;let o;
  try{o=JSON.parse(t)}catch(e){try{o=JSON.parse(b64Dec(t))}catch(e2){return null}}
  return vBk(o)}
function mergeSeasons(loc,inc){
  const newer=(inc.ut||0)>(loc.ut||0)?inc:loc,older=newer===inc?loc:inc;
  const sOld=cp(older),sNew=cp(newer);
  rePl(sOld);rePl(sNew);
  const out=cp(sNew),delSet=new Set([...(sOld.delM||[]),...(sNew.delM||[])]);
  out.delM=Array.from(delSet);
  const mMap=new Map();
  (sOld.mt||[]).forEach(m=>{if(m&&m.id!=null&&!delSet.has(m.id))mMap.set(m.id,cp(m))});
  (sNew.mt||[]).forEach(m=>{if(m&&m.id!=null&&!delSet.has(m.id))mMap.set(m.id,cp(m))});
  out.mt=Array.from(mMap.values()).sort((a,b)=>(a.id||0)-(b.id||0));
  const pMap=new Map();
  (sOld.pl||[]).forEach(p=>{if(p&&p.n)pMap.set(nz(p.n),cp(p))});
  (sNew.pl||[]).forEach(p=>{
    if(!p||!p.n)return;
    const k=nz(p.n),prev=pMap.get(k),np=cp(p);
    if(prev){
      const ob=prev.b||{},nb=np.b||{};
      np.b=Object.assign(nob(),{
        g:Math.max(+ob.g||0,+nb.g||0),
        a:Math.max(+ob.a||0,+nb.a||0),
        m:Math.max(+ob.m||0,+nb.m||0),
        mom:Math.max(+ob.mom||0,+nb.mom||0),
        k:Math.max(+ob.k||0,+nb.k||0)
      });
      if(!np.r&&prev.r)np.r=prev.r;
    }
    pMap.set(k,np);
  });
  out.pl=Array.from(pMap.values());
  if(sOld.tb&&typeof sOld.tb==="object"){
    out.tb=toNob(out.tb);
    K5.forEach(k=>{if(!out.tb[k]&&sOld.tb[k])out.tb[k]=sOld.tb[k]});
  }
  const simO=ensureSim(sOld),simN=ensureSim(out);
  if(simO.w>simN.w)simN.w=simO.w;
  Object.keys(simO.gm||{}).forEach(gi=>{
    const wO=simO.gm[gi],wN=simN.gm[gi];
    if(!Array.isArray(wO))return;
    if(!Array.isArray(wN)){simN.gm[gi]=cp(wO);return}
    wO.forEach((wk,idx)=>{if(Array.isArray(wk)&&wk.length&&(!Array.isArray(wN[idx])||!wN[idx].length))wN[idx]=cp(wk)});
  });
  Object.keys(simO.ko||{}).forEach(rd=>{
    const pO=simO.ko[rd],pN=simN.ko[rd];
    if(!Array.isArray(pO)||!pO.length)return;
    if(!Array.isArray(pN)||!pN.length){simN.ko[rd]=cp(pO);return}
    pO.forEach((tie,idx)=>{if(tie&&tie.w!=null&&pN[idx]&&pN[idx].w==null)pN[idx]=cp(tie)});
  });
  Object.entries(simO.sc||{}).forEach(([k,v])=>{if((+v||0)>(simN.sc[k]||0))simN.sc[k]=+v});
  Object.entries(simO.as||{}).forEach(([k,v])=>{if((+v||0)>(simN.as[k]||0))simN.as[k]=+v});
  Object.entries(simO.mom||{}).forEach(([k,v])=>{if((+v||0)>(simN.mom[k]||0))simN.mom[k]=+v});
  if(sOld.gqs&&typeof sOld.gqs==="object"){
    out.gqs=toNob(out.gqs);
    Object.keys(sOld.gqs).forEach(gi=>{if((!Array.isArray(out.gqs[gi])||!out.gqs[gi].length)&&Array.isArray(sOld.gqs[gi]))out.gqs[gi]=sOld.gqs[gi].slice()});
  }
  if(!out.gq&&sOld.gq)out.gq=sOld.gq;
  if(!out.grk&&sOld.grk)out.grk=sOld.grk;
  if(!out.res&&sOld.res)out.res=cp(sOld.res);
  reTs(out);rePl(out);
  if(out.G&&!isLg(out.cfg))syncUserMatchesToBracket(out);
  rebuildSimScorers(out);
  return out}
async function mergeBk(o){
  const snapOk=await snapKeep("fc26lig4_birlesme_oncesi");
  DROP=[];mig(o);const dr=[...new Set(DROP)];DROP=[];let add=0,upd=0,same=0,skp=0;
  const delSSet=new Set([...(store.delS||[]),...(o.delS||[])]);
  store.delS=Array.from(delSSet);
  store.seasons=store.seasons.filter(x=>!delSSet.has(x.id));
  o.seasons.forEach(s=>{
    if(delSSet.has(s.id)){skp++;return}
    const l=store.seasons.find(x=>x.id==s.id&&x.name==s.name&&x.date==s.date);
    if(l){
      const merged=mergeSeasons(l,s);
      if(JSON.stringify(merged)!==JSON.stringify(l)){store.seasons[store.seasons.indexOf(l)]=merged;upd++}
      else same++;
      return}
    if(store.seasons.some(x=>x.id==s.id))s.id=newId();
    store.seasons.push(s);add++});
  if(!store.seasons.length){store.nx=1;store.seasons.push(mk(Date.now(),1));store.cur=store.seasons[0].id}
  else if(!store.seasons.some(x=>x.id==store.cur))store.cur=store.seasons[store.seasons.length-1].id;
  store.trash=(store.trash||[]).concat(o.trash||[]).filter(t=>t&&t.s&&!store.seasons.some(x=>x.id==t.s.id)).slice(0,10);
  store.ach=Array.from(new Set((store.ach||[]).concat(o.ach||[])));store.achd=Object.assign(nob(),toNob(o.achd),toNob(store.achd));
  norm();store.seasons.sort((a,b)=>a.id-b.id);sync();
  st.tab=7;
  return "Birleştirildi "+(snapOk?"(önceki durum Kurtarma’ya saklandı)":"(UYARI: önceki durum saklanamadı, depolama dolu olabilir)")+": "+add+" yeni, "+upd+" birleştirilen, "+same+" aynı sezon"+(skp?" · "+skp+" silinmiş sezon atlandı":"")+(dr.length?" · "+dr.length+" takım güncel listede yok, atlandı":"")}
function readImp(f){
  if(f.size>20e6){ask("Dosya çok büyük, geçerli bir yedek olmayabilir.");render();return}
  const r=new FileReader();
  r.onload=()=>{const o=parseBk(String(r.result||""));if(!o)ask("Bu dosya geçerli bir yedek değil.");else st.imp={o,src:f.name};render()};
  r.onerror=()=>{ask("Dosya okunamadı.");render()};
  r.readAsText(f)}
const impDlg=()=>{const o=st.imp.o,n=o.seasons.length,m=o.seasons.reduce((a,s)=>a+((s.mt||[]).length),0);
  return `<div class="dlg"><div class="dbox" role="dialog" aria-modal="true"><div class="rs">Yedeği yükle</div><div class="note" style="margin:0 0 8px">${n} sezon · ${m} maç bulundu (${esc(st.imp.src||"yedek")}).</div>${impWarn(o)}<button class="btn p opt" data-a="impm">Birleştir<small>Aynı sezonların maçları güvenle birleşir; sildiğin maç ve sezonlar geri gelmez</small></button><button class="btn opt" data-a="impr">Hepsini değiştir<small>Bu cihazdaki tüm kayıtlar yedekle değiştirilir</small></button><div class="bar"><button class="btn" data-a="no">Vazgeç</button></div></div></div>`};
async function exportFile(){
  const pl=store.lb,pm=store.lbm;
  store.tn=TN;store.v=4;store.app=VER;store.lb=Date.now();store.lbm=nMatch();
  const name=bkName(),json=JSON.stringify(store);
  let ok=false;
  try{
    const f=new File([json],name,{type:"application/json"});
    if(navigator.canShare&&navigator.canShare({files:[f]})){
      try{await navigator.share({files:[f],title:"FC 27 Lig yedeği"});ok=true}
      catch(e){if(e&&e.name=="AbortError"){store.lb=pl;store.lbm=pm;return}}}
    if(!ok){const u=URL.createObjectURL(f),a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);ok=true}
  }catch(e){}
  if(!ok){store.lb=pl;store.lbm=pm;ask("Yedek dosyası oluşturulamadı. Yedek kodunu kopyalamayı dene.");render();return}
  await save(true);render();ntf("Yedek alındı: "+name)}
const bkInfo=()=>store.lb?"Son yedek: <b>"+dTR(store.lb)+"</b> · o günden beri <b>"+Math.max(0,nMatch()-(store.lbm||0))+"</b> maç eklendi.":"Henüz yedek almadın.";
function isIosBrowser(){
  try{
    const ua=navigator.userAgent||"";
    const isIOS=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
    const isStandalone=("standalone" in navigator&&navigator.standalone===true)||(typeof matchMedia=="function"&&matchMedia("(display-mode: standalone)").matches);
    return isIOS&&!isStandalone;
  }catch(e){return false}
}
function iosPwaRemind(){
  if(store.iosok||st.iosWarnDismissed||!isIosBrowser())return "";
  return `<div class="big" role="alert" style="text-align:left;border:2px solid var(--gold)"><b>📲 Verilerinizin Silinmemesi İçin Uygulamayı Ana Ekranınıza Ekleyin</b><div class="note" style="margin:4px 0 8px">iOS Safari, ana ekrana eklenmeyen sitelerin tarayıcı verilerini (<code>IndexedDB</code> / <code>localStorage</code>) 7 gün sonra otomatik silebilir. Verilerinizin silinmemesi için uygulamayı ana ekranınıza ekleyin: Safari alt çubuğundan <b>Paylaş</b> simgesine ve ardından <b>"Ana Ekrana Ekle"</b> seçeneğine dokunun.</div><button class="chip" data-a="iosok">Anladım, gizle</button></div>`;
}
function bkRemind(){
  const s=cur(),t=nMatch(),nw=Math.max(0,t-(store.lbm||0)),days=store.lb?(Date.now()-store.lb)/864e5:0;
  const sFin=!!(s&&s.res&&(nw>=1||!store.lb||(s.ut&&store.lb&&s.ut>store.lb)));
  const need=sFin||(store.lb?(nw>=10||(nw>=1&&days>=14)||days>=30):t>=5);
  if(!need)return "";
  const msg=sFin?(store.lb?`${esc(s.name)} bitti · son yedekten beri ${nw} yeni kayıt.`:`${esc(s.name)} bitti · henüz hiç yedek almadın.`):(store.lb?(nw>0?`Son yedekten (${dTR(store.lb)}) beri ${nw} maç eklendi.`:`Son yedeğinin üzerinden ${Math.floor(days)} gün geçti.`):`${t} maç kaydettin, henüz yedek yok. Verilerini güvenceye al.`);
  return `<div class="bks pbks" role="status"><span class="pbks-ic">${UICO.backup}</span><div class="bkt"><b>Yedek Zamanı</b><span>${msg}</span> <button class="bkl" data-t="6">Ayarlar ›</button></div><button class="btn pbks-btn" data-a="exf">Yedekle</button></div>`}
const sfBan=()=>`<div class="big" role="alert" style="text-align:left"><b class="wr">Değişiklikler kaydedilemedi.</b><div class="note" style="margin:4px 0 8px">Tarayıcı depolaması dolu ya da kapalı olabilir (özel sekme?). Sekmeyi kapatırsan son girdiğin veriler kaybolur. Şimdi yedek al.</div><button class="btn p" data-t="6">Yedek al</button></div>`;
function delSeason(id){
  const x=store.seasons.find(q=>q.id==id);if(!x)return;
  store.delS=Array.from(new Set([...(store.delS||[]),x.id]));
  store.trash=[{s:x,t:Date.now()}].concat(store.trash||[]).slice(0,10);
  store.seasons=store.seasons.filter(q=>q.id!=id);
  const fresh=!store.seasons.length;
  if(fresh){store.nx=1;store.seasons.push(mk(Date.now(),1))}
  if(fresh||store.cur==id)store.cur=store.seasons[store.seasons.length-1].id;
  sync();st.mode=null;
  return fresh?"Sezon silindi, boş yeni sezon açıldı":"Sezon silindi · Ayarlar › Son silinenler’den geri getirilebilir"}
function restoreSeason(id){
  const j=(store.trash||[]).findIndex(t=>t.s.id==id);if(j<0)return;
  const s=store.trash.splice(j,1)[0].s;
  store.delS=(store.delS||[]).filter(x=>x!=s.id);
  if(store.seasons.some(x=>x.id==s.id))s.id=newId();
  store.seasons.push(s);norm();store.seasons.sort((a,b)=>a.id-b.id);
  return "Sezon geri getirildi: "+s.name}
const slug=s=>String(s||"").replace(/ı/g,"i").replace(/İ/g,"I").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,20);
const bkName=()=>"fc27-yedek-"+(slug(store.owner)?slug(store.owner)+"-":"")+new Date().toISOString().slice(0,10)+".json";
function ownDiff(o){return !!(o&&o.owner&&store.owner&&nz(o.owner)!==nz(store.owner))}
function verGt(a,b){const x=String(a).split(".").map(Number),y=String(b).split(".").map(Number);for(let i=0;i<3;i++){const p=x[i]||0,q=y[i]||0;if(p!==q)return p>q}return false}
function impWarn(o){let h="";
  if(ownDiff(o))h+=`<div class="note wr" role="alert" style="margin:0 0 8px">Bu yedek <b>${esc(o.owner)}</b> adına, bu cihazdaki kayıtlar <b>${esc(store.owner)}</b> adına. “Hepsini değiştir” kendi kayıtlarını siler. Emin değilsen vazgeç.</div>`;
  if(o&&o.app&&verGt(o.app,VER))h+=`<div class="note wr" role="alert" style="margin:0 0 8px">Bu yedek daha yeni bir sürümde (v${esc(o.app)}) alınmış. Önce uygulamayı güncelle.</div>`;
  return h}
async function snapKeep(k){
  const raw=JSON.stringify(store);
  if(await kv.set(k,raw))return true;
  const others=RCV.map(x=>x[0]).filter(x=>x!==k&&rcvGet(x));
  for(const ok of others){await kv.del(ok);if(await kv.set(k,raw))return true}
  return false}
const ownDlg=()=>`<div class="dlg"><div class="dbox" role="dialog" aria-modal="true"><div class="rs">Bu kimin kayıtları?</div><div class="note" style="margin:0 0 8px">Adın yedek dosyasının adına yazılır; başkasının yedeğini yanlışlıkla yüklemeni engeller.</div><input id="ow" class="f" maxlength="20" value="${esc(store.owner||"")}" aria-label="Ad" autocomplete="off"><div class="bar"><button class="btn p" data-a="owns">Kaydet</button><button class="btn" data-a="owno">Şimdilik atla</button></div></div></div>`;
async function resetAll(){
  if(!(await snapKeep("fc26lig4_sifirlanan")))return "Sıfırlanmadı: eski kayıt güvenliğe alınamadı (depolama dolu olabilir). Önce yedek al ya da Kurtarma kayıtlarını sil.";
  const th=store.theme,mo=store.motion,ow=store.owner;
  store={v:4,tn:TN,cur:1,nx:1,seasons:[mk(1,1)]};if(ow)store.owner=ow;
  if(th)store.theme=th;if(mo!==undefined)store.motion=mo;
  norm();sync();st.tab=7;st.bk="";return "Tüm veriler sıfırlandı"}
function trashCard(){const L=store.trash||[];if(!L.length)return "";
  return psetCard("trash","org","Son Silinenler","Silinen sezonlar buradan geri alınabilir",`${L.length}/10`,
    L.map(t=>`<div class="pc"><div class="pt"><span class="n">${esc(t.s.name)}</span><button class="btn" data-a="trs" data-id="${esc(t.s.id)}">Geri getir</button></div><div class="lb">${t.s.my!=null&&T[t.s.my]?esc(T[t.s.my].n)+" · ":""}${(t.s.mt||[]).length} maç · silinme: ${dTR(t.t)}</div></div>`).join("")+`<div class="bar" style="margin:8px 0 0"><button class="btn" data-a="trse" style="width:100%">Çöpü boşalt</button></div>`)}
/* RCV ve rcvGet artık storage.js üzerinden yüklenir */
function rcvCard(){const L=RCV.filter(([k])=>rcvGet(k));if(!L.length)return "";
  return psetCard("shield","gold","Kurtarma Kopyaları","Otomatik saklanan güvenlik kopyaları",`${L.length} kayıt`,
    `<div class="note" style="margin:0 0 8px">Ham veriyi yedek kutusuna alıp “Geri yükle”yi deneyebilirsin.</div>`+L.map(([k,l])=>`<div class="pc"><div class="pt"><span class="n">${l}</span><span class="xfpill">${Math.max(1,Math.round(rcvGet(k).length/1024))} KB</span></div><div class="bar" style="margin:6px 0 0"><button class="btn" data-a="rcv" data-k="${k}" style="flex:1">Yedek kutusuna al</button><button class="btn" data-a="rcvx" data-k="${k}">Sil</button></div></div>`).join(""))}
const resetCard=()=>`<div class="pfold dgr${st.rstopen?" open":""}"><button class="acbtn dgrbtn${st.rstopen?" open":""}" data-a="rstopen" aria-expanded="${!!st.rstopen}"><span class="aci">${UICO.bug}</span><span class="act"><b>Veri Sıfırlama</b><small>Tehlikeli bölge · tüm kayıtları temizler</small></span><span class="acr"><span class="acc" aria-hidden="true">${UICO.chev}</span></span></button>${st.rstopen?`<div class="acbody"><div class="note" style="margin:0 0 10px">Tüm sezonları ve ayarları siler. Silmeden önce eski kayıt otomatik olarak Kurtarma bölümüne kopyalanır.</div><button class="btn kreset" data-a="rst" style="margin-top:0">Tüm verileri sıfırla</button></div>`:""}</div>`;

/* ---------- TAKIM VE KURA KİLİDİ ---------- */
const hasData=s=>(s.mt||[]).length>0||(s.pl||[]).length>0||!!s.res||Object.values(s.tb||{}).some(v=>v);
const tmLock=s=>!!s.G||(s.mt||[]).length>0;
function wipeS(s){s.delM=Array.from(new Set([...(s.delM||[]),...(s.mt||[]).map(m=>m.id).filter(Boolean)]));s.mt=[];s.pl=[];s.res=null;s.gq=null;s.gqs=nob();s.sim={m:0,w:0,gm:nob(),ko:nob(),sc:nob()};s.ts=nob();s.tb=nob();reTs(s)}
function doUnlock(s){const had=hasData(s);wipeS(s);s.lk=false;s.P=null;s.G=null;s.my=null;s.sn=null;s.dn=0;st.mode=null;st.tp=false;st.dr=null;st.k=0;sync();return had?"Kurulum açıldı, sezon verileri sıfırlandı":"Kurulum açıldı, takım ve kura silindi"}
function doReset(s){const had=hasData(s);wipeS(s);s.G=null;s.my=null;st.mode=null;st.dr=null;st.k=0;sync();return had?"Takım ve kura sıfırlandı, sezon verileri silindi":"Takım ve kura sıfırlandı"}
const lockNote=(s,lk)=>lk?`<div class="klock tlock"><div class="klh"><span class="kli">${KI.lock}</span><div class="klt"><b>Takım Kilitli</b><small>Kura onaylandı${(s.mt||[]).length?" ve maç girildi":""}. Değiştirmek ${hasData(s)?"kurayı ve bu sezonun maç, oyuncu, sonuç kayıtlarını sıfırlar.":"kurayı sıfırlar."}</small></div></div><button class="btn kreset" data-a="chteam">${KI.reset}<span>Takımı Değiştir</span></button></div>`:`<div class="klock tlock"><div class="klh"><span class="kli">${KI.lock}</span><div class="klt"><b>Kura Çekimi Başladı</b><small>Takım değiştirilemez. Devam etmek için önce çekilen kurayı iptal et.</small></div></div><button class="btn kreset" data-a="dcancel">${KI.reset}<span>Kurayı İptal Et</span></button></div>`;
const KI={lock:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="9.5" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2"/></svg>',reset:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 1 0 2.4-5.5M4.5 4.5v4h4"/></svg>',pot:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17M3.5 12h17M6 6.5c2.2 1.6 3.4 3.4 3.4 5.5S8.2 15.9 6 17.5M18 6.5c-2.2 1.6-3.4 3.4-3.4 5.5s1.2 3.9 3.4 5.5"/></svg>'};
const lockDraw=s=>`<div class="klock"><div class="klh"><span class="kli">${KI.lock}</span><div class="klt"><b>Kura onaylandı</b><small>${s.dn>1?s.dn+". denemede kesinleşti · ":""}Yeniden çekmek için önce sıfırla.</small></div></div><button class="btn kreset" data-a="chteam">${KI.reset}<span>Kurayı ve takımı sıfırla</span></button></div>`;

/* ---------- KURULUM SEKMESİ ---------- */
const chp=(a,k,v,l,on)=>`<button class="chip ${on?"on":""}" data-a="${a}" data-k="${k}" data-v="${v}">${l}</button>`;
const sel=(at,k,opts,c)=>`<select class="sel" data-${at}="${k}">${opts.map(([v,l])=>`<option value="${v}" ${v==c?"selected":""}>${l}</option>`).join("")}</select>`;
const rrow=(l,h)=>`<div class="rr"><span class="lb">${l}</span>${h}</div>`;
const R3=(a,b)=>`<div class="row" style="align-items:flex-start"><span style="flex:0 0 auto">${a}</span><b style="flex:1;text-align:right">${b}</b></div>`;
const TPLI=[
  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.8 12h16.4M12 3.5a12 12 0 0 1 0 17M12 3.5a12 12 0 0 0 0 17"/></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5v1.5A3 3 0 0 0 8 10.5M16 6h3v1.5a3 3 0 0 1-3 3M12 13v4M8.5 20h7"/></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h5v5H4M4 13h5v5H4M9 8.5h4v7H9M13 12h7"/></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="7" cy="6" r="1.3" fill="currentColor"/><circle cx="7" cy="12" r="1.3" fill="currentColor"/><circle cx="7" cy="18" r="1.3" fill="currentColor"/></svg>'
];
function setupBlueprint(s){
  const c=s.cfg,mi=matchInfo(c),lg=isLg(c);
  const kpi2=lg?["Tek Lig","Puan Usulü"]:c.gs?[`${nG(c)}×${c.gs}`,"Grup Yapısı"]:["Eleme","Grup Yok"];
  const kpis=`<div class="pset-kpi">`+
    `<div class="pk2 emr"><b>${c.N}</b><span>Takım</span></div>`+
    `<div class="pk2 sky"><b>${kpi2[0]}</b><span>${kpi2[1]}</span></div>`+
    `<div class="pk2 gold"><b>${mi.tot}</b><span>Toplam Maç</span></div>`+
    `</div>`;
  let specs=[];
  if(lg){
    specs=[["Lig Maçları",`${leg(c.gl)} (${mi.pt} maç/takım)`],["Format","Eleme yok · puanla şampiyonluk"]];
  }else{
    if(c.gs){
      specs.push(["Gruptan Çıkan",`${c.q} takım (${adv(c)} takım elemeye)`]);
      specs.push(["Grup Maçları",`${leg(c.gl)} (${mi.pt} maç/takım)`]);
    }
    if(hasKO(c))specs.push(["Eleme Turları",leg(c.kl)]);
    specs.push(["Final Maçı",leg(c.fl)]);
  }
  const specHtml=`<div class="su-specs">${specs.map(([l,v])=>`<div class="su-sp"><span>${l}</span><b>${v}</b></div>`).join("")}</div>`;
  let pathHtml="";
  if(!lg){
    const rdsList=[];for(let t=adv(c);t>=2;t/=2)rdsList.push(RN[t]);
    pathHtml=`<div class="su-path"><span class="pset-lbl" style="margin:0 0 6px">Eleme Yolu</span><div class="su-chain">${rdsList.map((rn,idx)=>`<span class="su-node${idx===rdsList.length-1?" fin":""}">${idx===rdsList.length-1?"🏆 ":""}${rn}</span>`).join('<span class="su-arr">›</span>')}</div></div>`;
  }
  return kpis+specHtml+pathHtml}
function suTeamGrid(list){
  return `<div class="su-tgrid">${list.map(i=>`<button class="su-trow" data-a="tinfo" data-i="${i}" aria-label="${esc(T[i].n)} kadrosunu incele">${fl(T[i].c)}<span class="n">${nm(i)}</span>${rb(T[i].g)}</button>`).join("")}</div>`}
function lockedView(s){
  const PS=s.P.slice().sort((x,y)=>V(T[y])-V(T[x]));
  const rulesPills=`<div class="dnamets" style="margin:10px 0 0">${ruleLines(s).map(x=>`<span class="dnam"><em>${esc(x)}</em></span>`).join("")}</div>`;
  const mainCard=psetCard("app","emr","Kurulum Tamamlandı",esc(s.name)+" · kurallar kilitlendi","Hazır",
    setupBlueprint(s)+rulesPills+
    `<div class="su-acts" style="margin-top:12px"><button class="btn p pset-pri" data-t="1" style="flex:1.4">Takım Seçimine Geç ›</button><button class="btn pset-sec" data-a="tpl" style="flex:1">${st.tp?"Gizle":"Katılımcılar ("+s.P.length+")"}</button></div>`+
    `<button class="pset-link" data-a="unlock"><span>Kurulumu düzenle / kilidi aç</span><span>›</span></button>`
  );
  const partCard=st.tp?psetCard("shield","sky","Turnuva Katılımcıları","Güce göre sıralı",`${PS.length} takım`,suTeamGrid(PS)):"";
  return mainCard+partCard}
function setupView(s){
  if(s.lk)return lockedView(s);
  const c=s.cfg,r=s.rl,M=elig(r).length,A=avail(s),okp=A>=c.N;
  const cc=nob();T.forEach(t=>{if(rgOk(r,t))cc[t.c]=(cc[t.c]||0)+1});
  const cs=Object.keys(cc).sort((a,b)=>cc[b]-cc[a]||TR_CMP(CN[a][0],CN[b][0]));
  const gsO=gsOpts(c.N),qO=c.gs?qOpts(c.N,c.gs):[];
  const sc=[[0,"Yok"],70,72,74,75,76,77,78,80,82,84,86,88].map(v=>Array.isArray(v)?v:[v,v+"+"]);
  const gmn=[[0,"Yok"]].concat(rg(15).map(i=>[71+i,71+i])),gmx=[[99,"Yok"]].concat(rg(15).map(i=>[85-i,85-i]));
  const capO=[[0,"Sınırsız"]].concat([1,2,3,4,5,6,8,10,12].map(v=>[v,"En fazla "+v]));
  const gcO=c.gs?[[0,"Sınırsız"],[1,"En fazla 1"],[2,"En fazla 2"],[3,"En fazla 3"],[4,"En fazla 4"],[5,"En fazla 5"]]:[[0,"Sınırsız"],[1,"Aynı ülke eşleşmesin"]];
  const lgMode=isLg(c),isDefRl=JSON.stringify(r)==JSON.stringify(DEFR);
  const hero=`<div class="su-hero"><div class="su-htop"><span class="ph-ey"><i class="ph-dot"></i>TURNUVA MİMARI</span><span class="xfpill emr">${esc(s.name)}</span></div><h2>Turnuvanı Tasarla</h2><p>Hazır bir şablon seç veya formatı ve havuz kurallarını dilediğin gibi özelleştir.</p></div>`;

  // 1) Turnuva Formatı Kartı
  const tplGrid=`<div class="su-tpl">${TPL.map((p,i)=>`<button class="su-tcard${tplOn(c,p)?" on":""}" data-a="tmpl" data-v="${i}"><span class="su-tic">${TPLI[i]}</span><span class="su-tm"><b>${p[0]}</b><small>${p[1]}</small></span></button>`).join("")}</div>`;
  const segBtn=(a,k,v,l,on)=>`<button class="chip ${on?"on":""}" data-a="${a}" data-k="${k}" data-v="${v}">${l}</button>`;
  let dt=`<div class="su-div"></div>`;
  dt+=`<div class="pset-lbl">Aşamalar / Mod</div><div class="stabs seg3" style="margin-bottom:11px">${segBtn("gmode","",1,"Gruplu",!lgMode&&!!c.gs)}${segBtn("gmode","",0,"Direkt Eleme",!lgMode&&!c.gs)}${segBtn("gmode","",2,"Puan Ligi",lgMode)}</div>`;
  if(lgMode){
    dt+=`<div class="pset-lbl">Lig Takım Sayısı <small style="text-transform:none;font-weight:400">(en fazla 24)</small></div><div class="su-nums">${LGN.map(n=>`<button class="su-nbtn${c.N==n?" on":""}" data-a="cfg" data-k="N" data-v="${n}">${n}</button>`).join("")}</div>`;
    dt+=`<div class="su-mgrid"><div class="su-mrow"><span>Lig Maçları</span><div class="stabs seg2">${segBtn("cfg","gl",1,"1 Devre",c.gl==1)}${segBtn("cfg","gl",2,"2 Devre",c.gl==2)}</div></div></div>`;
  }else{
    dt+=`<div class="pset-lbl">Katılacak Takım Sayısı</div><div class="stabs su-s5" style="margin-bottom:11px">${[4,8,16,32,64].map(n=>segBtn("cfg","N",n,n,c.N==n)).join("")}</div>`;
    if(c.gs){
      dt+=`<div class="pset-lbl">Grup Büyüklüğü</div><div class="stabs" style="grid-template-columns:repeat(${gsO.length},1fr);margin-bottom:11px">${gsO.map(n=>segBtn("cfg","gs",n,n+"’lü",c.gs==n)).join("")}</div>`;
      dt+=`<div class="pset-lbl">Gruptan Çıkacak Takım</div><div class="stabs" style="grid-template-columns:repeat(${qO.length},1fr);margin-bottom:11px">${qO.map(n=>segBtn("cfg","q",n,n+" takım",c.q==n)).join("")}</div>`;
    }
    const mrows=[];
    if(c.gs)mrows.push(`<div class="su-mrow"><span>Grup Maçları</span><div class="stabs seg2">${segBtn("cfg","gl",1,"Tek maç",c.gl==1)}${segBtn("cfg","gl",2,"Çift maç",c.gl==2)}</div></div>`);
    if(hasKO(c))mrows.push(`<div class="su-mrow"><span>Eleme Turları</span><div class="stabs seg2">${segBtn("cfg","kl",1,"Tek maç",c.kl==1)}${segBtn("cfg","kl",2,"Çift maç",c.kl==2)}</div></div>`);
    mrows.push(`<div class="su-mrow"><span>Final Maçı</span><div class="stabs seg2">${segBtn("cfg","fl",1,"Tek maç",c.fl==1)}${segBtn("cfg","fl",2,"Çift maç",c.fl==2)}</div></div>`);
    dt+=`<div class="su-mgrid">${mrows.join("")}</div>`;
  }
  const tmMatch=TPL.some(p=>tplOn(c,p)),dflt=tmMatch&&!lgMode&&c.gl==1&&c.kl==1&&c.fl==1,openDt=!dflt||st.cust||lgMode;
  const custToggle=dflt?`<button class="pset-link" data-a="cust"><span>${st.cust?"Ayrıntılı ayarları gizle":"Takım, grup ve maç sayısını özelleştir"}</span><span>${st.cust?"▴":"▾"}</span></button>`:"";
  const card1=psetCard("trophy","emr","1 · Turnuva Formatı","Şablon ve maç düzeni",`${c.N} takım`,tplGrid+(openDt?dt:"")+custToggle);

  // 2) Gelişmiş Kurallar Katlanır Panel (.pfold)
  const advBody=`<div class="pset-lbl">Takım Bölgesi</div>`+
    `<div class="stabs seg3" style="margin-bottom:11px">${Object.keys(RGN).map(k=>segBtn("rl","rg",k,k=="all"?"Tümü":k=="eu"?"Avrupa":"Avrupa Dışı",r.rg==k)).join("")}</div>`+
    `<div class="su-cthd"><span class="pset-lbl" style="margin:0">Ülkeler <small style="text-transform:none;font-weight:400">(dokunarak çıkar / ekle)</small></span>${r.xc.length?`<button class="sf-clr" data-a="xcall">Hepsini seç</button>`:""}</div>`+
    `<div class="su-cgrid">${cs.map(k=>`<button class="su-cchip${!r.xc.includes(k)?" on":""}" data-a="xc" data-v="${k}">${fl(k)}<span>${CN[k][0]}</span><em>${cc[k]}</em></button>`).join("")}</div>`+
    `<div class="pset-lbl" style="margin-top:12px">Takım Gücü ve Ülke Sınırları</div>`+
    `<div class="su-fgrid">`+
      `<div class="su-fld"><label>Genel En Az</label>${sel("rs","gmin",gmn,r.gmin)}</div>`+
      `<div class="su-fld"><label>Genel En Çok</label>${sel("rs","gmax",gmx,r.gmax)}</div>`+
      `<div class="su-fld"><label>Hücum</label>${sel("rs","amin",sc,r.amin)}</div>`+
      `<div class="su-fld"><label>Orta Saha</label>${sel("rs","mmin",sc,r.mmin)}</div>`+
      `<div class="su-fld"><label>Defans</label>${sel("rs","dmin",sc,r.dmin)}</div>`+
      `<div class="su-fld"><label>Ülke Limiti (Turnuva)</label>${sel("rs","cap",capO,r.cap)}</div>`+
      `<div class="su-fld full"><label>${c.gs?"Aynı Grupta Aynı Ülkeden":"İlk Turda Aynı Ülke"}</label>${sel("rs","gcap",gcO,r.gcap)}</div>`+
    `</div>`+
    `<div class="su-mgrid" style="margin-top:11px">`+
      `<div class="su-mrow"><span>Katılımcı Seçimi</span><div class="stabs seg2">${segBtn("rl","pick","top","En Güçlü",r.pick=="top")}${segBtn("rl","pick","rnd","Rastgele",r.pick=="rnd")}</div></div>`+
      `<div class="su-mrow"><span>Kura Yöntemi</span><div class="stabs seg2">${segBtn("rl","dm","pot","Torbalı",r.dm=="pot")}${segBtn("rl","dm","rnd","Rastgele",r.dm=="rnd")}</div></div>`+
    `</div>`;
  const card2=`<div class="pfold ${isDefRl?"sky":"gold"}${st.adv?" open":""}"><button class="acbtn${st.adv?" open":""}" data-a="adv" aria-expanded="${!!st.adv}"><span class="aci">${UICO.sliders}</span><span class="act"><b>Gelişmiş Kurallar</b><small>${isDefRl?"Varsayılan havuz ve torbalı kura":"Özel güç, bölge veya ülke kuralları aktif"}</small></span><span class="acr"><span class="xfpill ${isDefRl?"sky":"gold"}">${isDefRl?"Varsayılan":"Özel"}</span><span class="acc" aria-hidden="true">${UICO.chev}</span></span></button>${st.adv?`<div class="acbody">${advBody}</div>`:""}</div>`;

  // 3) Özet & Takım Havuzu Onay Kartı
  const poolPct=Math.min(100,Math.round((A/Math.max(1,c.N))*100));
  const poolBox=`<div class="su-pool ${okp?"ok":"bad"}">`+
    `<div class="su-ph"><span>Takım Havuzu Durumu</span><b>${A} / ${c.N} ${okp?"✓":"✗"}</b></div>`+
    `<div class="su-pbar"><i style="width:${poolPct}%"></i></div>`+
    `<div class="su-ptx">${M} takım kurallara uyuyor${A<M?` · ülke sınırından sonra <b>${A}</b>`:""}${okp?" · turnuva başlatılabilir.":" — yeterli takım yok, kuralları gevşet veya takım sayısını azalt."}</div>`+
  `</div>`;
  const rlPills=`<div class="dnamets" style="margin:10px 0 0">${ruleLines(s).map(x=>`<span class="dnam"><em>${esc(x)}</em></span>`).join("")}</div>`;
  const elList=st.te?`<div class="su-elw"><div class="pset-lbl" style="margin:12px 0 7px">Kurallara Uyan Takımlar (${M})</div>${suTeamGrid(elig(r).sort((a,b)=>V(T[b])-V(T[a])))}</div>`:"";
  const card3=psetCard("shield",okp?"emr":"org","2 · Kurulum Özeti","Onay öncesi son kontrol",okp?"Hazır":"Yetersiz",
    setupBlueprint(s)+rlPills+poolBox+
    `<div class="su-acts"><button class="btn p pset-pri su-go" data-a="lock" ${okp?"":"disabled"}>✓ Kurulumu Onayla</button><button class="btn pset-sec" data-a="tel">${st.te?"Takımları Gizle":`Uygun Takımlar (${M})`}</button></div>`+
    elList
  );

  return hero+card1+card2+card3}
/* ---------- DİĞER SEKMELER ---------- */
function qualSummary(s){
  if(!s.cfg.gs||isLg(s.cfg)||!s.G)return "";
  const gqs=s.gqs||{},qMax=s.cfg.q||2,totNeed=s.G.length*qMax;
  const allQ=[];s.G.forEach((g,gi)=>{((gqs[gi])||[]).forEach((ti,idx)=>allQ.push({ti,gi,rk:idx+1}))});
  if(!allQ.length)return "";
  return `<div class="card pglass" style="margin:0 0 10px"><h3>Gruptan çıkanlar <small>${allQ.length}/${totNeed} takım</small></h3><div class="pg">${allQ.map(o=>`<button class="row tb${o.ti===s.my?" kme":""}" data-a="tinfo" data-i="${o.ti}" aria-label="${esc(T[o.ti].n)} kadrosunu incele"><span class="qbdg">${GL(o.gi)}${o.rk}</span>${badge(o.ti,18)}<span class="n">${nm(o.ti)}</span>${rb(T[o.ti].g)}</button>`).join("")}</div></div>`}
function simBarHtml(s){
  if(!s.G)return "";
  const sim=ensureSim(s),lg=isLg(s.cfg),hasGrp=!!s.cfg.gs||lg;
  const totW=hasGrp?((s.cfg.gs||s.cfg.N)-1)*(s.cfg.gl||1):0;
  const myGm=(s.mt||[]).filter(m=>m.rd==="Grup").length;
  const nextW=sim.w+1,canSim=hasGrp&&sim.w<totW&&(myGm>=nextW||!!s.res),allGrpDone=!hasGrp||sim.w>=totW;
  const modeDesc=(SIM_MODES.find(x=>x[0]===sim.m)||SIM_MODES[0])[2];
  const out=getTourneyOutcome(s);
  let btnHtml="";
  if(out&&out.done){
    btnHtml=s.res
      ? `<span class="gd" style="font-size:13px;flex:1">🏆 Turnuva Tamamlandı · Şampiyon: <b>${esc(T[out.ch].n)}</b></span>`
      : `<button class="btn p cta" data-a="fintrn" style="flex:1">🏆 Turnuvayı Sonlandır (Şampiyon: ${esc(T[out.ch].n)})</button>`;
  }else if(!allGrpDone){
    if(canSim)btnHtml=`<button class="btn p pset-pri" data-a="simw" style="flex:1">${UICO.bolt}<span>${nextW}. Hafta Maçlarını Simüle Et</span></button>`;
    else btnHtml=`<button class="btn p qgo" data-a="qs" style="flex:1">⚽ Önce ${nextW}. Hafta Maçını Gir (${myGm}/${nextW})</button>`;
  }else{
    btnHtml=`<span class="gd" style="font-size:13px;flex:1">✓ ${lg?"Lig":"Grup"} haftaları (${totW}/${totW}) tamamlandı · Eleme ağacı hazır</span>`;
  }
  const needMe=!(out&&out.done)&&!allGrpDone&&!canSim;
  return `<div class="card pglass pset ${needMe?"gold":"emr"} simbar${needMe?" needme":""}" style="margin:0 0 10px">`+
    `<div class="pset-h"><span class="aci">${UICO.bolt}</span><div class="pset-t"><b>Turnuva Simülasyon Merkezi</b><small>${esc(modeDesc)}</small></div>${hasGrp?`<span class="xfpill ${needMe?"gold":"emr"}">${sim.w}/${totW} Hafta</span>`:""}</div>`+
    `<div class="stabs seg3" style="margin:0 0 10px" role="radiogroup" aria-label="Simülasyon modu">${SIM_MODES.map(([k,l])=>`<button class="chip ${sim.m===k?"on":""}" data-a="simm" data-v="${k}">${l}</button>`).join("")}</div>`+
    `<div class="bar" style="margin:0;align-items:center">${btnHtml}${hasGrp&&sim.w>0&&(!out||!s.res)?`<button class="btn pset-sec" data-a="simu" title="Son haftayı geri al">↩ Geri Al</button>`:""}</div>`+
  `</div>`;
}
const koLink=s=>{
  if(isLg(s.cfg)||!s.G)return "";
  const ko=ensureSim(s).ko;if(!Object.keys(ko).some(rd=>Array.isArray(ko[rd])&&ko[rd].length))return "";
  return `<div class="bar" style="margin-bottom:10px"><button class="btn p qgo" data-t="8" style="flex:1">🏆 Eleme Ağacı ve Maç Girişi › Fikstür</button></div>`};
const groupsView=s=>{
  if(!s.lk)return `<div class="big">Önce turnuvayı kur.<br><button class="btn p" data-t="0" style="margin-top:10px">Kuruluma git</button></div>`;
  if(!s.G)return `<div class="big">${isLg(s.cfg)?"Lig tablosu":"Gruplar"} henüz belirlenmedi.<br><button class="btn p" data-t="${s.my==null?1:2}" style="margin-top:10px">${s.my==null?"Takım seç":"Kuraya git"}</button></div>`;
  const lg=isLg(s.cfg),hasTbl=(s.sim&&s.sim.w>0)||(s.mt||[]).some(m=>m.rd==="Grup");
  return simBarHtml(s)+koLink(s)+`<div class="bar"><button class="btn p" data-a="kurag" style="flex:1">${lg?"Lig tablosunu paylaş":"Kurayı görsel olarak paylaş"}</button></div>`+qualSummary(s)+`<div class="note" style="margin:0 0 8px">${fmt(s.cfg)}${hasTbl?" · Puan eşitliğinde sırasıyla genel averaj (AV), atılan gol (AG) ve takım gücü baz alınır.":""}</div><div class="grid${hasTbl?" tblgrid":""}">${s.G.map((g,i)=>[g,i]).sort((a,b)=>b[0].includes(s.my)-a[0].includes(s.my)).map(([g,i])=>grpCard(g,i)).join("")}</div>`+`<p class="note">${lg?"Lig usulü: tüm haftalar tamamlandığında «Turnuvayı Sonlandır» ile şampiyonu kaydedebilirsin.":"Grup maçları bittiğinde Eleme Ağacı (Bracket) otomatik kurulur; elensen bile finale kadar tüm turları simüle edebilirsin."}</p>`};

function stage(s,k,N,Gn,pot,last){
  const mine=last[0]===s.my,t=T[last[0]];
  const cf=mine?`<div class="cf">${rg(28).map(()=>`<i style="left:${Math.random()*100|0}%;background:hsl(${Math.random()*360|0} 80% 55%);animation-delay:${(Math.random()*.5).toFixed(2)}s"></i>`).join("")}</div>`:"";
  return `${cf}<div class="lb">${k}/${N} · ${pot?"Torba":"Tur"} ${Math.floor((k-1)/Gn)+1}</div><div class="rv"><span class="ball">${badge(last[0],24)}</span><span class="rn"><b>${esc(t.n)}</b><span>${fl(t.c)} → ${gname(s,last[1])}</span>${mine?`<b class="gd">★ Senin takımın!</b>`:""}</span></div>`}
function drawView(s){
  if(!s.lk)return `<div class="big">Kura için önce turnuvayı kur.<br><button class="btn p" data-t="0" style="margin-top:10px">Kuruluma git</button></div>`;
  if(s.my==null)return `<div class="big">Kurayı çekmeden önce takımını seçmelisin.<br><button class="btn p" data-t="1" style="margin-top:10px">Takım seç</button></div>`;
  const c=s.cfg,Gn=nG(c),N=s.P.length,d=st.dr,k=st.k,G=s.G&&!d?s.G.map(g=>g.slice()):rg(Gn).map(()=>[]);
  if(d)d.seq.slice(0,k).forEach(([t,g])=>G[g].push(t));
  const last=d&&k>0?d.seq[k-1]:null,done=d&&k>=d.seq.length,pot=s.rl.dm!="rnd";
  const info=(pot?`Torbalı kura: takımlar güce göre ${gsz(c)} torbaya ayrılır, her ${c.gs?"gruba":"eşleşmeye"} her torbadan bir takım düşer.`:"Tamamen rastgele kura.")+(s.rl.gcap?(c.gs?` Aynı grupta aynı ülkeden en fazla ${s.rl.gcap} takım.`:" Aynı ülke eşleşmez."):"");
  return (s.G&&!d?lockDraw(s):`<div class="bar"><button class="btn p" data-a="new">Yeni kura hazırla</button><button class="btn" data-a="bal">En dengeli kurayı otomatik kur</button></div>`)+(s.dn&&!(s.G&&!d)?`<div class="note" style="margin:0 0 8px">Bu sezon hazırlanan kura sayısı: <b>${s.dn}</b></div>`:"")+
  (d?`<div class="dock"><div class="big ${last?"":"pop"}">${last?stage(s,k,N,Gn,pot,last):`<div>Kura hazır. Takımları tek tek çek.</div>`}</div><div class="bar">${done?`<button class="btn p" data-a="use">Bu kurayı kullan</button>`:`<button class="btn p" data-a="next">Sıradaki takımı çek</button><button class="btn" data-a="all">Hepsini göster</button>`}</div></div>`:kInfo(s,c,Gn,N,pot))+
  `<div class="grid">${G.map((g,i)=>grpCard(g,i)).join("")}</div>`}
function kInfo(s,c,Gn,N,pot){
  const gp=s.rl.gcap,un=c.gs?"grup":"eşleşme",lg=isLg(c);
  const chips=[`<span class="kchip"><b>${N}</b> takım</span>`];
  if(!lg)chips.push(`<span class="kchip"><b>${Gn}</b> ${un}</span>`);
  if(pot)chips.push(`<span class="kchip"><b>${gsz(c)}</b> torba</span>`);
  if(gp)chips.push(`<span class="kchip kchip-w">${c.gs?`Aynı ülkeden en fazla <b>${gp}</b>`:"Aynı ülke eşleşmez"}</span>`);
  const ds=pot?`Takımlar güce göre ${gsz(c)} torbaya ayrılır; her ${c.gs?"gruba":"eşleşmeye"} her torbadan bir takım düşer.`:"Takımlar tamamen rastgele dağıtılır.";
  return `<div class="kinfo"><div class="kih"><span class="kii">${KI.pot}</span><div class="kit"><b>${pot?"Torbalı kura":"Rastgele kura"}</b><small>${ds}</small></div></div><div class="kchips">${chips.join("")}</div></div>`}

function tcard(s){
  const t=RT(s,s.my),gi=s.G?s.G.findIndex(g=>g.includes(s.my)):-1,tr=t.g>=85?1:t.g>=80?2:t.g>=75?3:0;
  const st3=[["HÜC",t.a],["ORT",t.o],["DEF",t.d]].map(([l,v])=>`<div><b>${v}</b><span>${l}</span></div>`).join("");
  return `<div class="tcw"><div class="tc t${tr}"><div class="tcin">${tr?`<i class="foil"></i>`:""}<i class="gl"></i><div class="tt"><div class="ovr"><b data-cu>${t.g}</b><span>GENEL</span>${fl(t.c)}</div>${badge(s.my,92)}</div><div class="tcn">★ ${esc(t.n)}</div><div class="tcc">${CN[t.c][0]}</div><div class="st3">${st3}</div>${difHtml(s)}</div></div></div><div class="tcap">${gi>=0?gname(s,gi)+" · "+gInfo(s):"Kura bekleniyor"}</div>`}
function grpPts(s){const g=(s.mt||[]).filter(m=>m.rd=="Grup");return g.length?g.reduce((a,m)=>a+(m.gf>m.ga?3:m.gf==m.ga?1:0),0):""}
function recentCooldownSet(s){
  const idx=store.seasons.findIndex(x=>x.id==s.id);
  const prev=idx>=0?store.seasons.slice(Math.max(0,idx-3),idx):store.seasons.filter(x=>x.id!=s.id).slice(-3);
  return new Set(prev.map(x=>x.my).filter(v=>v!=null))}
function teamView(s){
  if(!s.lk)return `<div class="big">Önce turnuvayı kur: kuralları ve formatı seç.<br><button class="btn p" data-t="0" style="margin-top:10px">Kuruluma git</button></div>`;
  const PS=s.P.slice().sort((x,y)=>V(T[y])-V(T[x])),dv=store.diff||0,dk=dcut(s,dv),cdSet=recentCooldownSet(s),cdNames=[...cdSet].filter(i=>T[i]).map(i=>T[i].n);
  let h="";
  if(s.my!=null){
    const sqLen=squadOf(s.my).length;
    h+=tcard(s)+`<button class="tm-sqbtn" data-a="tinfo" data-i="${s.my}" aria-label="${esc(T[s.my].n)} kadrosunu incele"><span class="aci">${UICO.shield}</span><span class="tm-sqt"><b>Takımı İncele · Kadro</b><small>${sqLen?sqLen+" oyuncu · İlk 11 ve yedekler":"Kulüp detayları"}</small></span><span class="tm-sqc" aria-hidden="true">›</span></button>`;
  }else{
    h+=`<div class="su-hero"><div class="su-htop"><span class="ph-ey"><i class="ph-dot"></i>ADIM 2 · TAKIM SEÇİMİ</span><span class="xfpill emr">${s.P.length} kulüp</span></div><h2>Kulübünü Belirle</h2><p>${esc(fmt(s.cfg))}</p></div>`;
  }
  const lk6=tmLock(s),pend=!lk6&&!!st.dr&&s.my!=null;
  if(lk6||pend){
    h+=lockNote(s,lk6);
  }else{
    const pickBody=`<div class="su-fld" style="margin-bottom:10px"><label for="df">Rastgele Seçim Zorluğu</label><select id="df" class="sel">${DIFF.map((d,i)=>{const kc=dcut(s,i);return `<option value="${i}" ${dv==i?"selected":""}>${d[0]}${kc?` (ilk ${kc} hariç)`:""}</option>`}).join("")}</select></div>`+
      `<div class="tm-opts">`+
        `<button class="su-tcard${st.mode=="rnd"?" on":""}" data-a="pick"><span class="su-tic">${UICO.spark}</span><span class="su-tm"><b>Benim İçin Takım Seç</b><small>${(DIFF[dv]||DIFF[0])[0]} · 3 sezon bekleme kuralı</small></span></button>`+
        `<button class="su-tcard${st.mode=="man"?" on":""}" data-a="mman"><span class="su-tic">${UICO.sliders}</span><span class="su-tm"><b>Takımımı Kendim Seçeyim</b><small>${s.P.length} katılımcı arasından seç</small></span></button>`+
      `</div>`+
      (st.mode=="man"?`<div class="su-fld" style="margin-top:10px"><label for="mt">Katılımcı Kulüp</label><select id="mt" class="sel"><option value="">Takım seç…</option>${PS.map(i=>`<option value="${i}" ${s.my===i?"selected":""}>${T[i].n} (${T[i].c} · ${T[i].g})</option>`).join("")}</select></div>`:"")+
      `<div class="note" style="margin:10px 0 0">${dk?`Rastgele seçimde en güçlü ${dk} takım hariç tutulur.`:`${s.P.length} katılımcının tamamı arasından çekilir.`}${cdNames.length?` <b>Son 3 sezon hariç:</b> ${esc(cdNames.join(", "))}.`:""}</div>`;
    h+=psetCard("shield","emr","Kulüp Seçimi","Kuradan önce takımını belirle",`${s.P.length} aday`,pickBody);
  }
  if(!(s.G||s.res||(s.mt||[]).length))return h;
  if(s.my==null){
    return h+`<div id="fincard">${psetCard("trophy","gold","Sezonu Bitir",esc(s.name),null,`<div class="note" style="margin:0">Önce bir takım seç.</div>`)}</div>`;
  }
  const ro=resRanks(s.cfg),lg=isLg(s.cfg);if(s.res&&!ro.includes(s.res.st)){ro.push(s.res.st);ro.sort((a,b)=>a-b)}
  const c=s.res?s.res.st:(lg?7:ro[0]),isChamp=s.res&&s.res.st==7,hasPtsAuto=!(s.res&&s.res.pts!=null)&&grpPts(s)!=="";
  const savedBanner=s.res?`<div class="fin-ban${isChamp?" gold":""}"><span class="fin-bic">${UICO.trophy}</span><div class="fin-bm"><b>${esc(rlb(s.res,s.cfg,s.grk))}</b><small>Kaydedildi · ${esc(s.res.date||"")}</small></div></div>`:"";
  const rkSel=!lg&&s.cfg.gs?`<div class="su-fld"><label for="fgrk">Gruptaki Sıran</label><select id="fgrk" class="sel">${rg(s.cfg.gs||4).map(i=>{const rk=(s.res&&s.res.grk)||s.grk||Math.min(s.cfg.gs||4,(s.cfg.q||2)+1);return `<option value="${i+1}" ${rk===i+1?"selected":""}>${i+1}. sıra</option>`}).join("")}</select></div>`:"";
  const ptsFld=`<div class="su-fld${!rkSel?" full":""}"><label for="pts">${lg?"Lig Puanı":"Grup Puanı"}</label><input id="pts" class="sel fin-inp" inputmode="numeric" maxlength="3" placeholder="${lg?"Toplam puan":"Grup puanı"}" value="${s.res&&s.res.pts!=null?s.res.pts:grpPts(s)}"></div>`;
  const finBody=savedBanner+
    `<div class="su-fld" style="margin-bottom:10px"><label for="stg">${lg?"Ligi Hangi Sırada Tamamladın?":"Turnuva Senin İçin Nerede Bitti?"}</label><select id="stg" class="sel">${ro.map(i=>`<option value="${i}" ${c==i?"selected":""}>${stTxt(s.cfg,i)}</option>`).join("")}</select></div>`+
    `<div id="ptw" style="display:${c==0||lg?"block":"none"}"><div class="su-fgrid" style="margin-bottom:${hasPtsAuto?"6px":"10px"}">${rkSel}${ptsFld}</div>${hasPtsAuto?`<div class="fin-hint">✓ ${lg?"Ligdeki":"Gruptaki"} puanın maç kayıtlarından otomatik hesaplandı, dilersen değiştirebilirsin.</div>`:""}</div>`+
    `<div class="su-fld" style="margin-bottom:12px"><label for="note">Sezon Notu <small style="font-weight:400">(isteğe bağlı)</small></label><input id="note" class="sel fin-inp" maxlength="200" placeholder="Örn: Penaltılarla elendik, harika sezondu…" value="${s.res?esc(s.res.note||""):""}"></div>`+
    `<div class="fin-acts${s.res?" saved":""}">`+
      `<button class="btn p pset-pri fin-save" data-a="fin">✓ ${s.res?"Sonucu Güncelle":"Sezonu Kaydet"}</button>`+
      (s.res?`<button class="btn pset-sec" data-a="karne">${UICO.trophy}<span>Karne</span></button><button class="mb sc-ic dl fin-del" data-a="unfin" aria-label="Sonucu sil" title="Sonucu sil">${SBI.del}</button>`:"")+
    `</div>`;
  return h+`<div id="fincard" class="fin-wrap">${psetCard("trophy",isChamp?"gold":"emr","Sezonu Bitir","Sonucu ve kariyer kaydını onayla",esc(s.name),finBody)}</div>`}

const rds=c=>{const o=c.gs?["Grup"]:[];for(let t=adv(c);t>=2;t/=2)o.push(RN[t]);return o};
function getOrAddPl(s,n){
  if(isKK(n))return null;
  const k=nz(n);if(!k)return null;
  let p=s.pl.find(x=>nz(x.n)==k);
  if(!p){const f=sqFindAny(n);p={n:f?f.p.n:String(n).trim(),g:0,a:0,m:0,mom:0,k:0,b:Object.assign(nob(),{g:0,a:0,m:0,mom:0,k:0})};s.pl.push(p)}
  return p}
function mApply(s){reTs(s);rePl(s)}
function glsFromLegacy(m,gf){
  const out=[];
  if(Array.isArray(m&&m.gls)&&m.gls.length){
    m.gls.forEach(g=>{const sc=g&&g.sc?String(g.sc):"",as=g&&g.as?String(g.as):"";out.push({sc,as,na:!!(sc&&!isKK(sc)&&!as)})});
  }else if(m){
    const scList=[],asList=[];
    Object.entries(m.sc||{}).forEach(([n,c])=>{for(let i=0;i<(+c||0);i++)scList.push(n)});
    Object.entries(m.as||{}).forEach(([n,c])=>{for(let i=0;i<(+c||0);i++)asList.push(n)});
    for(let i=0;i<scList.length;i++){
      const sc=scList[i];
      let as="";
      if(!isKK(sc)&&asList.length){
        const idx=asList.findIndex(a=>nz(a)!==nz(sc));
        as=idx>=0?asList.splice(idx,1)[0]:asList.shift();
      }
      out.push({sc,as,na:!isKK(sc)&&!as});
    }
  }
  const n=gf!=null?gf:(m?+m.gf||0:0);
  while(out.length<n)out.push({sc:"",as:"",na:false});
  return out.slice(0,n);
}
function syncGlsToMaps(){
  const sc=nob(),as=nob();
  (st.mgls||[]).forEach(g=>{
    if(g&&g.sc){
      sc[g.sc]=(sc[g.sc]||0)+1;
      if(!isKK(g.sc)&&g.as)as[g.as]=(as[g.as]||0)+1;
    }
  });
  st.msc=sc;st.mas=as;
}
function ensureMgls(gf){
  st.mgls=Array.isArray(st.mgls)?st.mgls:[];
  while(st.mgls.length<gf)st.mgls.push({sc:"",as:"",na:false});
  if(st.mgls.length>gf)st.mgls.length=gf;
  syncGlsToMaps();
}
const lgs=(c,rd)=>rd=="Grup"?c.gl:(rd==RN[2]?c.fl:c.kl);
function nextGrpOpp(riv,gpFn,gl){
  const maxL=gl||1;
  for(let l=1;l<=maxL;l++){
    const f=riv.find(i=>gpFn(i)<l);
    if(f!==undefined)return f;
  }
  return undefined}
function autoStage(s){
  const c=s.cfg,RD=rds(c),ms=s.mt||[];
  if(c.gs){const need=(c.gs-1)*c.gl,gm=ms.filter(m=>m.rd=="Grup").length;if(gm<need&&!s.gq&&!ms.some(m=>m.rd!="Grup"))return "Grup"}
  const ko=RD.filter(r=>r!="Grup");
  for(const rd of ko){if(ms.filter(m=>m.rd==rd).length<lgs(c,rd))return rd}
  return RD[RD.length-1]}
const legInfo=s=>{const L=lgs(s.cfg,st.mrd),dn=(s.mt||[]).filter(m=>m.id!==st.med&&m.opp===st.mop&&m.rd==st.mrd).length;return{L,dn,lg:L>1?(st.mlg||Math.min(L,dn+1)):0}};
function matchCard(s,sheet){
  const c=s.cfg,RD=rds(c),ms=s.mt||[],edM=st.med?ms.find(x=>x.id==st.med):null;
  if(!RD.includes(st.mrd))st.mrd=autoStage(s);
  const gi=s.G?s.G.findIndex(g=>g.includes(s.my)):-1,riv=gi>=0?s.G[gi].filter(i=>i!==s.my):[];
  const autoKo=st.mrd!=="Grup"&&!edM?getAutoKoOpponent(s,st.mrd):null;if(autoKo!=null)st.mop=autoKo;
  const cm=(i,rd)=>ms.filter(m=>m.id!==st.med&&m.opp===i&&m.rd==rd).length,gp=i=>cm(i,"Grup");
  const qSet=new Set(Object.values(s.gqs||{}).flat().filter(i=>i!==s.my));
  const qList=s.P.filter(i=>qSet.has(i)&&!riv.includes(i)).sort((a,b)=>V(T[b])-V(T[a]));
  const oth=s.P.filter(i=>i!==s.my&&!riv.includes(i)&&!qSet.has(i)).sort((a,b)=>V(T[b])-V(T[a]));
  const allOth=qList.concat(oth);
  if(st.mop==null||(!riv.includes(st.mop)&&!allOth.includes(st.mop))){
    const koFirst=st.mrd!="Grup"?ms.find(m=>m.id!==st.med&&m.rd==st.mrd&&m.opp!=null):null;
    const nx=st.mrd=="Grup"?nextGrpOpp(riv,gp,c.gl):(koFirst?koFirst.opp:qList[0]);
    st.mop=nx!==undefined?nx:(riv.length?riv[0]:allOth[0])}
  const LG=legInfo(s),pv=ms.filter(m=>m.id!==st.med&&m.opp===st.mop&&m.rd==st.mrd&&m.lg!==LG.lg),gf=st.mg||0,ga=st.mo||0,sc=st.msc||{};
  const opt=i=>`<option value="${i}" ${st.mop===i?"selected":""}>${esc(T[i].n)}${qSet.has(i)?" (Çıktı ✓)":""}${riv.includes(i)&&gp(i)?(gp(i)>=c.gl?" ✓":" "+gp(i)+"/"+c.gl):""}</option>`;
  const cnt=(a,v)=>`<div class="ct"><button class="mb" data-a="${a}" data-d="-1">−</button><b class="sc2${st.bump===a?(st.bumpUp?" bump up":" bump"):""}">${v}</b><button class="mb" data-a="${a}" data-d="1">+</button></div>`;
  const FD=dotsOf(ms);
  let h=`<div class="qh"><span class="rs">${edM?"Maçı düzenle":"Maç sonucu"}</span><span class="fm">${FD}</span><button class="btn" data-a="qx">Kapat</button></div>
  <div class="rr"><span class="lb">Rakip</span><select id="mop" class="sel" style="flex:1">${riv.length?`<optgroup label="Grup rakipleri">${riv.map(opt).join("")}</optgroup>`:""}${qList.length?`<optgroup label="Gruptan çıkanlar (${qList.length})">${qList.map(opt).join("")}</optgroup>`:""}<optgroup label="Diğer takımlar">${oth.map(opt).join("")}</optgroup></select><button class="btn" data-a="tinfo" data-i="${st.mop}" aria-label="Rakip kadrosunu incele" style="padding:8px 12px">Kadro</button></div>
  ${vsLine(s,st.mop)}${predLine(s,st.mop)}<div class="rr"><span class="lb">Aşama</span><select id="mrd" class="sel" style="flex:1">${RD.map(x=>`<option ${st.mrd==x?"selected":""}>${x}</option>`).join("")}</select></div>${LG.L>1?`<div class="rr"><span class="lb">Maç</span><select id="mlg" class="sel" style="flex:1">${[1,2].map(n=>`<option value="${n}" ${LG.lg==n?"selected":""}>${n}. maç</option>`).join("")}</select></div>${pv.length?`<div class="note" style="margin:0">Önceki maç: ${pv.map(m=>m.gf+"–"+m.ga).join(", ")}</div>`:""}`:""}
  <div class="msc scb" style="--t1:${bspec(s.my).c1};--t2:${bspec(st.mop).c1}"><div>${crs(s.my,48)}<div class="lb">${esc(T[s.my].n)}</div>${cnt("mg",gf)}</div><b class="vsx">VS</b><div>${crs(st.mop,48)}<div class="lb">${esc(T[st.mop].n)}</div>${cnt("mo",ga)}</div></div><div class="note" style="margin:-2px 0 8px">Rakibin golcü ve asistçileri, rakip skoru girilince kadro gücüne göre otomatik belirlenir.</div>`;
  if(st.mrd!="Grup"){
    const totF=pv.reduce((a,m)=>a+m.gf,0)+gf,totA=pv.reduce((a,m)=>a+m.ga,0)+ga,canP=(LG.L==1&&gf==ga)||(LG.L>1&&pv.length>0&&totF==totA);
    if(canP&&!st.mp&&st.mp!==0)st.mp=1;
    h+=`<div class="cw" style="justify-content:center;margin:4px 0 8px"><button class="chip ${st.mu?"on":""}" data-a="mu">Uzatma (UZ)</button><button class="chip ${st.mp?"on":""}" data-a="mp">Penaltılar (P)</button></div>`;
    if(st.mp)h+=`<div class="gq" style="margin:0 0 10px"><div class="lb" style="text-align:center;margin-bottom:4px">Penaltı skoru</div><div class="msc" style="margin:4px 0"><div><div class="lb">${esc(T[s.my].n)}</div><div class="ct"><button class="mb" data-a="mpf" data-d="-1">−</button><b style="font-size:28px;font-family:var(--num);min-width:28px">${st.mpf||0}</b><button class="mb" data-a="mpf" data-d="1">+</button></div></div><b>P</b><div><div class="lb">${esc(T[st.mop].n)}</div><div class="ct"><button class="mb" data-a="mpa" data-d="-1">−</button><b style="font-size:28px;font-family:var(--num);min-width:28px">${st.mpa||0}</b><button class="mb" data-a="mpa" data-d="1">+</button></div></div></div></div>`;
  }
  if(gf>0)h+=scorerUI(s,gf,sc);
  h+=advFormUI(s);
  h+=`<div class="bar" style="margin:10px 0 0"><button class="btn p" data-a="msave" style="flex:1">${edM?"Değişiklikleri kaydet":"Maçı kaydet"}</button>${edM?`<button class="btn" data-a="qx">Vazgeç</button>`:""}</div>`;
  h+=`<div class="note">Maçı bitirince skoru gir. G-B-M, atılan/yenen gol ve oyuncu golleri otomatik güncellenir.</div>`;
  return h}
function statView(s){
  if(s.my==null)return `<div class="big">İstatistik girmek için önce Takımım sekmesinden takım seç.</div>`;
  const ms=s.mt||[];
  const sub=["m","a","w"].includes(st.stab)?st.stab:"m";
  const nav=`<div class="stabs" role="tablist" aria-label="İstatistik bölümleri">`+
    [["m",`Maçlar${ms.length?` (${ms.length})`:""}`],["a","Analiz"],["w","Ödüller"]].map(([k,l])=>
      `<button class="chip ${sub==k?"on":""}" role="tab" aria-selected="${sub==k}" data-a="stab" data-v="${k}">${l}</button>`
    ).join("")+`</div>`;
  let body="";
  if(sub=="m"){
    body=matchLog(s)+etPkCard(ms);
  }else if(sub=="a"){
    const xgH=xgSummaryCard(ms);
    body=tacticalDnaCard(s)+
      (xgH||`<div class="card pglass"><h3>xG, xPts & Verimlilik</h3>${emp("Maç kaydederken «Gelişmiş İstatistik Ekle» alanını doldurduğunda detaylı xG ve verimlilik analizi burada oluşur.")}</div>`)+
      oppTierCard(ms.map(m=>({m,x:s})))+marginCard(ms)+posDistCard([s]);
  }else{
    body=awardsCard(s)||cd("Sezon ödülleri",emp("Maçlarda gol, asist veya maçın adamı (MOTM) kaydedildikçe MVP, Altın Ayakkabı ve diğer sezon ödülleri burada belirir."));
  }
  return nav+body}

const cupSvg=on=>{const k=on?'fill="#e0b43a" stroke="#b8860b" stroke-width="1"':'fill="none" stroke="var(--mut)" stroke-width="1.5" stroke-dasharray="3 3"',hs=on?'stroke="#b8860b" stroke-width="3"':'stroke="var(--mut)" stroke-width="2" stroke-dasharray="3 3"';
  return `<svg viewBox="0 0 48 56" aria-hidden="true"><path d="M13 4h22v14c0 8-5 13-11 13S13 26 13 18z" ${k}/><path d="M13 8H6c0 8 4 12 8 13M35 8h7c0 8-4 12-8 13" fill="none" ${hs}/><rect x="21" y="31" width="6" height="9" ${k}/><rect x="14" y="40" width="20" height="5" rx="1" ${on?'fill="#8a5a24"':k}/><rect x="10" y="45" width="28" height="7" rx="1" ${on?'fill="#6b4220"':k}/>${on?'<path d="M17 8v10c0 4 2 7 4 8" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none"/>':""}</svg>`};
function vitrinCard(){
  const ch=store.seasons.filter(x=>x.res&&x.res.st==7&&x.my!=null).reverse();
  const showCh=(st.vitall||ch.length<=3)?ch:ch.slice(0,3);
  const its=showCh.map(x=>{const t=T[x.my],w=x.ts;return `<div class="it"><span class="cupw">${cupSvg(true)}</span><b>${esc(x.name)}</b><span>${esc(t.n)}</span>${(w.w||w.d||w.l)?`<span>${w.w||0}-${w.d||0}-${w.l||0}</span>`:""}</div>`});
  const tot=Math.max(3,Math.ceil(its.length/3)*3);
  while(its.length<tot)its.push(`<div class="it gh">${cupSvg(false)}<span>Boş raf</span></div>`);
  let rows="";for(let i=0;i<its.length;i+=3)rows+=`<div class="shelf">${its.slice(i,i+3).join("")}</div>`;
  const moreBtn=ch.length>3?`<div class="bar" style="margin:8px 0 0"><button class="chip" data-a="vitall" style="width:100%">${st.vitall?"Sadece son 3 kupayı göster":"Tüm kupaları göster ("+ch.length+" kupa)"}</button></div>`:"";
  return cd(`Kupa dolabı <small>${ch.length} kupa</small>`,rows+moreBtn+(ch.length?"":`<div class="note">İlk şampiyonlukta kupa buraya dizilir.</div>`))}
function histView(){
  const ss=store.seasons.slice().reverse(),hmod=st.hmod||"all";
  const filtS=ss.filter(x=>hmod=="all"||(hmod=="lg"?isLg(x.cfg):!isLg(x.cfg)));
  const fin=filtS.filter(x=>x.res),n=fin.length;
  const cnt=SN.map((_,i)=>fin.filter(x=>x.res.st==i).length),mx=Math.max(1,...cnt);
  const gp=fin.filter(x=>!isLg(x.cfg)&&x.res.st==0&&x.res.pts!=null).map(x=>x.res.pts);
  const lgp=fin.filter(x=>isLg(x.cfg)&&x.res.pts!=null).map(x=>x.res.pts);
  const best=n?Math.max(...fin.map(x=>x.res.st)):-1;
  const P=nob();ss.forEach(x=>x.pl.forEach(p=>{const k=p.n.toLowerCase(),o=P[k]=P[k]||{n:p.n,g:0,a:0,m:0,mom:0,ga:0};o.g+=p.g||0;o.a+=p.a||0;o.m+=p.m||0;o.mom+=p.mom||0;o.ga=(o.g||0)+(o.a||0)}));
  const pl=Object.values(P);
  const hofRow=(nm,sub,val,i)=>{const isP=!nm.includes("&");const inner=`${i<3?`<span class="mdl m${i+1}">${i+1}</span>`:`<span class="hof-rk">${i+1}</span>`}<span class="hof-nm"><b>${esc(nm)}</b>${sub?`<small>${sub}</small>`:""}</span><span class="hof-v">${val}</span>`;return isP?`<button class="hof-r tap${i===0?" r1":""}" data-a="pinfo" data-n="${esc(nm)}" aria-label="${esc(nm)} profilini aç">${inner}</button>`:`<div class="hof-r${i===0?" r1":""}">${inner}</div>`};
  const topList=(f)=>pl.filter(p=>p[f]>0).sort((a,b)=>b[f]-a[f]);
  const gaList=pl.filter(p=>p.ga>0).sort((a,b)=>b.ga-a.ga||b.g-a.g);
  const gapmList=pl.filter(p=>p.m>=2&&p.ga>0).sort((a,b)=>(b.ga/b.m)-(a.ga/a.m)||b.ga-a.ga);
  const gpmList=pl.filter(p=>p.m>=3&&p.g>0).sort((a,b)=>(b.g/b.m)-(a.g/a.m)||b.g-a.g);
  const clL=clutchStats(store.seasons),ds=duoStats(store.seasons),gL=topList("g"),aL=topList("a"),mL=topList("mom");
  const topGA=gaList.slice(0,5).map((p,i)=>hofRow(p.n,`${p.g}G + ${p.a}A`,p.ga,i)).join("")||`<div class="note" style="margin:4px 0">Henüz skor katkısı yok.</div>`;
  const topG=gL.slice(0,5).map((p,i)=>hofRow(p.n,p.m?`${p.m} maç`:`` ,`${p.g}G`,i)).join("")||`<div class="note" style="margin:4px 0">Veri yok.</div>`;
  const topA=aL.slice(0,5).map((p,i)=>hofRow(p.n,p.m?`${p.m} maç`:``,`${p.a}A`,i)).join("")||`<div class="note" style="margin:4px 0">Veri yok.</div>`;
  const topMom=mL.slice(0,5).map((p,i)=>hofRow(p.n,`${p.g}G · ${p.a}A`,`${p.mom}★`,i)).join("")||`<div class="note" style="margin:4px 0">Maçın adamı kaydı henüz yok.</div>`;
  const topClutch=clL.slice(0,5).map((p,i)=>hofRow(p.n,`${p.g}G + ${p.a}A${p.fg+p.fa?` · Finalde ${p.fg}G ${p.fa}A`:""}${p.mom?` · ${p.mom}★`:""}`,p.ga,i)).join("")||`<div class="note" style="margin:4px 0">Eleme turlarında gol/asist kaydı henüz yok.</div>`;
  const topDuos=ds.duos.slice(0,5).map((d,i)=>hofRow(d.n,`${d.m} maçta birlikte`,d.tot,i)).join("")||`<div class="note" style="margin:4px 0">Aynı maçta gol ve asist yapan ikili henüz yok.</div>`;
  const topBoth=ds.both.slice(0,5).map((b,i)=>hofRow(b.n,`toplam ${b.g}G + ${b.a}A`,`${b.c} maç`,i)).join("")||`<div class="note" style="margin:4px 0">Aynı maçta hem gol hem asist yapan oyuncu henüz yok.</div>`;
  const topGAPM=gapmList.slice(0,5).map((p,i)=>hofRow(p.n,`${p.ga} katkı / ${p.m}M`,fx(p.ga/p.m),i)).join("")||`<div class="note" style="margin:4px 0">En az 2 maç oynayan oyuncu yok.</div>`;
  const topGpm=gpmList.slice(0,5).map((p,i)=>hofRow(p.n,`${p.g}G / ${p.m}M`,fx(p.g/p.m),i)).join("")||`<div class="note" style="margin:4px 0">En az 3 maç oynayan golcü yok.</div>`;
  const TM=nob();ss.filter(x=>x.res).forEach(x=>{if(x.my==null)return;const o=TM[x.my]=TM[x.my]||{i:x.my,n:T[x.my].n,k:0,b:-1,lg:isLg(x.cfg)};o.k++;if(x.res.st>=o.b){o.b=x.res.st;o.lg=isLg(x.cfg)}});
  const card=(t,b)=>`<div class="card pglass"><h3>${t}</h3>${b}</div>`;
  const R=(a,b)=>`<div class="row${b===0?" z":""}"><span class="n">${a}</span><b>${b}</b></div>`;
  const isL=hmod=="lg",isC=hmod=="cup";
  const A1=card(isL?"Lig toplu istatistik":isC?"Kupa toplu istatistik":"Toplu istatistik",
    R("Sezon / biten",filtS.length+" / "+n)+
    R("Şampiyonluk",cnt[7])+
    (isL?R("İkincilik",cnt[6])+R("İlk 3 (podyum)",cnt[5]+cnt[6]+cnt[7]):R("Finale kalma",cnt[6]+cnt[7])+R("Yarı final ve üstü",cnt[5]+cnt[6]+cnt[7]))+
    (best>=0?R("En iyi sonuç",isL?(SNL[best]||SN[best]):SN[best]):""));
  const distKeys=isL?[0,4,5,6,7]:SN.map((_,i)=>i).filter(i=>i==0||i>=2||cnt[i]>0);
  const A2=distKeys.some(i=>cnt[i]>0)?card(isL?"Lig sıralama dağılımı":"Sonuç dağılımı",distKeys.map(i=>`<div class="row${cnt[i]?"":" z"}"><span class="n" style="flex:0 0 150px">${isL?(SNL[i]||SN[i]):SN[i]}</span><div class="bk"><i style="width:${cnt[i]/mx*100}%"></i></div><b>${cnt[i]}</b></div>`).join("")):"";
  const A3=(!isL&&gp.length?card("Grupta elenme puanları",R("Ortalama",fx(gp.reduce((a,b)=>a+b,0)/gp.length))+R("En düşük / en yüksek",Math.min(...gp)+" / "+Math.max(...gp))):"")+
           ((isL||hmod=="all")&&lgp.length?card("Lig puan istatistikleri",R("Ortalama lig puanı",fx(lgp.reduce((a,b)=>a+b,0)/lgp.length))+R("En düşük / en yüksek puan",Math.min(...lgp)+" / "+Math.max(...lgp))):"");
  const totG=sum(pl,"g"),totA=sum(pl,"a"),totM=sum(pl,"mom");
  const hofBlk=(ttl,sub,ic,body)=>`<div class="hof-sec"><div class="hof-sh"><span class="xshi">${XGI[ic]||XGI.pts}</span><div><b>${ttl}</b>${sub?`<small>${sub}</small>`:""}</div></div>${body}</div>`;
  const A4=`<div class="card pglass phof"><h3>Kariyer Yıldızları<small>tüm sezonlar</small></h3>`+
    `<div class="hof-kpi"><div class="hk g"><b>${totG}</b><span>Toplam Gol</span></div><div class="hk a"><b>${totA}</b><span>Toplam Asist</span></div><div class="hk m${totM?"":" z"}"><b>${totM}</b><span>Toplam MOTM</span></div></div>`+
    hofBlk("Skor Katkısı Krallığı","Gol + Asist toplamı","pts",topGA)+
    hofBlk("Gol Krallığı","En çok gol atanlar","fin",topG)+
    hofBlk("Asist Krallığı","En çok asist yapanlar","ctrl",topA)+
    xgSec("Clutch Yıldızları","Eleme ve final maçları katkısı",topClutch,true,"shot",clL.length?`${clL[0].n.split(" ").pop()} (${clL[0].ga})`:"0")+
    xgSec("Altın İkililer","Aynı maçta gol + asist işbirliği",topDuos,true,"ctrl",ds.duos.length?`${ds.duos[0].tot} gol`:"0")+
    xgSec("Çift Yönlü Yıldızlar","Aynı maçta hem gol hem asist",topBoth,true,"pts",ds.both.length?`${ds.both[0].c} maç`:"0")+
    xgSec("Maçın Adamı (MOTM)","En çok MOTM seçilenler",topMom,true,"pts",mL.length?`${mL[0].mom}★`:"0")+
    xgSec("Maç Başı Verimlilik","G+A/Maç (2+M) ve Gol/Maç (3+M)",`<div class="hof-sub">G+A / Maç (en az 2 maç)</div>${topGAPM}<div class="hof-sub" style="margin-top:10px">Gol / Maç (en az 3 maç)</div>${topGpm}`,true,"tr",gapmList.length?fx(gapmList[0].ga/gapmList[0].m):"")+
    `</div>`;
  const tmList=Object.values(TM).sort((a,b)=>b.k-a.k);
  const A5=`<div class="card pglass ptms"><h3>Oynanan takımlar<small>${tmList.length} kulüp</small></h3>`+(tmList.length?tmList.map(o=>`<button class="row tb ptms-r" data-a="tinfo" data-i="${o.i}">${badge(o.i,26)}<span class="n"><b>${esc(o.n)}</b><small class="pm">${o.lg?(SNL[o.b]||SN[o.b]):SN[o.b]}</small></span><span class="xfpill">${o.k} sezon</span></button>`).join(""):`<div class="note">Henüz tamamlanan sezon yok.</div>`)+`</div>`;
  const A6c=x=>{
    const tm2=x.my!=null&&T[x.my]?T[x.my]:null,cb=tm2?bspec(x.my):null,isCur=x.id==store.cur,ch=x.res&&x.res.st==7,lg=isLg(x.cfg);
    const g=x.ts||{},mCnt=(g.w||0)+(g.d||0)+(g.l||0),pG=sum(x.pl,"g"),pA=sum(x.pl,"a");
    const sty=cb?` style="--sc1:${cb.c1};--sc2:${cb.c2}"`:"";
    const stCls=ch?"gold":x.res?"fin":"live";
    const pills=[];
    if(mCnt)pills.push(`<span class="dnam"><b>${g.w||0}-${g.d||0}-${g.l||0}</b><em>G-B-M</em></span>`);
    if(mCnt)pills.push(`<span class="dnam"><b>${g.gf||0}/${g.ga||0}</b><em>Gol</em></span>`);
    if(pG||pA)pills.push(`<span class="dnam"><b>${pG}G · ${pA}A</b><em>Oyuncular</em></span>`);
    if(x.res&&x.res.mvp)pills.push(`<span class="dnam pos"><b>★ ${esc(x.res.mvp.n)}</b><em>MVP</em></span>`);
    return `<div class="card pglass scard${isCur?" iscur":""}${ch?" champ":""}"${sty}>`+
      `<div class="sc-hd">`+
        `<div class="sc-bdg">${tm2?badge(x.my,40):`<span class="sbph" style="width:40px;height:44px">⚽</span>`}</div>`+
        `<div class="sc-m"><div class="sc-nm"><b>${esc(x.name)}</b>${isCur?`<span class="sc-cur">Aktif</span>`:""}</div><div class="sc-tm">${tm2?`${fl(tm2.c)} <span>${esc(tm2.n)}</span>`:"<span>Takım seçilmedi</span>"}</div></div>`+
        `<div class="sc-r"><span class="xfpill ${lg?"sky":"gold"}">${lg?"Lig":"Kupa"}</span><small>${esc(x.date||"")}</small></div>`+
      `</div>`+
      `<div class="sc-mid"><span class="sc-st ${stCls}">${x.res?esc(rlb(x.res,x.cfg,x.grk)):"Devam ediyor"}</span><span class="sc-fmt">${esc(fmt(x.cfg))}</span></div>`+
      (pathSvg(x)?`<div class="sc-path">${pathSvg(x)}</div>`:"")+
      (pills.length?`<div class="dnamets" style="margin:8px 0 0">${pills.join("")}</div>`:"")+
      (x.res&&x.res.note?`<div class="sc-note">${esc(x.res.note)}</div>`:"")+
      `<div class="sc-acts">`+
        `<button class="btn ${isCur?"pset-sec":"p pset-pri"}" data-a="open" data-id="${x.id}">${isCur?"Açık":"Aç"}</button>`+
        `<button class="btn pset-sec" data-a="karne" data-id="${x.id}">Karne</button>`+
        (x.res&&x.res.tots?`<button class="btn pset-sec" data-a="totsv" data-id="${x.id}">En İyi 11</button><button class="mb sc-ic" data-a="sum" data-id="${x.id}" aria-label="Sezon metin özeti" title="Metin özeti"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h12v14H6zM9 9h6M9 13h6M9 17h4"/></svg></button>`:`<button class="btn pset-sec" data-a="sum" data-id="${x.id}">Özet</button>`)+
        `<button class="mb sc-ic" data-a="ren" data-id="${x.id}" aria-label="Sezon adını değiştir" title="Adı değiştir">${SBI.edit}</button>`+
        `<button class="mb sc-ic dl" data-a="del" data-id="${x.id}" aria-label="Sezonu sil" title="Sil">${SBI.del}</button>`+
      `</div>`+
    `</div>`;
  };
  const A=achList(),achDone=A.filter(a=>a.done).length,achOp=!!(st.hm&&st.hm.ach);
  const achFold=`<div class="pfold gold${achOp?" open":""}"><button class="acbtn${achOp?" open":""}" data-a="hm" data-k="ach" aria-expanded="${achOp}"><span class="aci">${UICO.trophy}</span><span class="act"><b>Rozetler</b><small>Kariyer başarımları</small></span><span class="acr"><span class="xfpill">${achDone}/${A.length}</span><span class="acc" aria-hidden="true">${UICO.chev}</span></span></button>${achOp?`<div class="acbody">${achCard()}</div>`:""}</div>`;
  const cupCnt=ss.filter(x=>!isLg(x.cfg)).length,lgCnt=ss.filter(x=>isLg(x.cfg)).length;
  const modBar=`<div class="stabs seg3" style="margin:0 0 10px" role="tablist" aria-label="Kariyer türü">${[["all",`Tümü (${ss.length})`],["cup",`Kupa (${cupCnt})`],["lg",`Lig (${lgCnt})`]].map(([k,l])=>`<button class="chip ${hmod==k?"on":""}" role="tab" aria-selected="${hmod==k}" data-a="hmod" data-v="${k}">${l}</button>`).join("")}</div>`;
  const ht=(st.ht&&st.ht!="b")?st.ht:"o",nav=`<div class="stabs htabs" role="tablist" aria-label="Geçmiş bölümleri">${[["o","Özet"],["r","Rekorlar"],["s","Sezonlar"],["p","Rakipler"],["m","Maçlar"]].map(([k,l])=>`<button class="chip ${ht==k?"on":""}" role="tab" aria-selected="${ht==k}" data-a="ht" data-v="${k}">${l}</button>`).join("")}</div>`;
  const ovBody=!filtS.length?cd(isL?"Lig kariyeri":"Kupa kariyeri",emp(isL?"Henüz puan usulü lig sezonu oluşturmadın. Kurulumdan «Lig» şablonunu seçerek başlayabilirsin.":"Henüz kupa sezonu bulunmuyor.")):careerCard(hmod)+xpCard(hmod)+powerCard(hmod)+A1+A2+A3+tsCard(filtS)+chartCard(filtS);
  const body=ht=="r"?recCard()+A4+posDistCard(store.seasons)+A5+cmpCard():ht=="s"?seasonsView(ss,A6c):ht=="p"?oppCard():ht=="m"?matchTab():modBar+ovBody+achFold;
  return vitrinCard()+nav+body}

const TPL=[["Dünya Kupası","32 takım · 8 grup × 4",32,4,2],["Klasik 64","64 takım · 8 grup × 8",64,8,2],["Mini Lig","16 takım · 4 grup × 4",16,4,2],["Direkt Eleme","8 takım · grup yok",8,0,0],["Lig","4–24 takım · eleme yok",16,16,0]];
const tplOn=(c,p)=>p[4]===0&&p[2]===p[3]?isLg(c):(c.N==p[2]&&(c.gs||0)==p[3]&&(!p[3]||c.q==p[4])&&!isLg(c));
/* ---------- SEZON ANA EKRANI, 5'Lİ GEZİNME, HIZLI SKOR PANELİ ---------- */
const crs=(i,w)=>`<div style="display:flex;justify-content:center;margin-bottom:2px">${badge(i,w||36)}</div>`;
const PITCH='<svg viewBox="0 0 96 64" aria-hidden="true"><rect x="4" y="4" width="88" height="56" rx="3"/><path d="M48 4v56"/><circle cx="48" cy="32" r="9"/><rect x="4" y="20" width="12" height="24"/><rect x="80" y="20" width="12" height="24"/></svg>';
function tourneyTots(s,st2){
  if(s&&s.res&&s.res.tots&&["F","M","D","K"].every(k=>Array.isArray(s.res.tots[k])&&s.res.tots[k].length&&s.res.tots[k].every(p=>p&&T[p.ti])))return s.res.tots;
  if(!st2||!st2.teams||!st2.teams.length)return null;
  const tmMap=nob();st2.teams.forEach(t=>{if(t.o>0)tmMap[t.ti]=t});
  const pool=nob();
  const put=(n,ti,pos,grp,ovr,g,a,mom)=>{
    if(!n||isKK(n)||ti==null||!T[ti]||!tmMap[ti])return;
    const k=nz(n)+"|"+ti;
    if(!pool[k])pool[k]={n,ti,pos:pos||"CM",grp:grp||"M",ovr:ovr||75,g:0,a:0,mom:0,mine:ti===s.my};
    if(g)pool[k].g=Math.max(pool[k].g,g);
    if(a)pool[k].a=Math.max(pool[k].a,a);
    if(mom)pool[k].mom=Math.max(pool[k].mom,mom);
  };
  (st2.players||[]).forEach(p=>{
    const f=sqFind(p.ti,p.n)||(sqFindAny(p.n)&&sqFindAny(p.n).p);
    put(p.n,p.ti,f?f.p:"CM",f?f.g:"M",f?f.o:76,p.g||0,p.a||0,p.mom||0);
  });
  Object.values(tmMap).forEach(tm=>{
    const sq=squadOf(tm.ti);if(!sq.length)return;
    const addTop=(gCode,cnt)=>{
      sq.filter(p=>p.g===gCode).sort((a,b)=>(a.t==="S"?0:1)-(b.t==="S"?0:1)||b.o-a.o).slice(0,cnt)
        .forEach(p=>put(p.n,tm.ti,p.p,p.g,p.o,0,0,0));
    };
    addTop("K",1);addTop("D",4);addTop("M",3);addTop("F",3);
  });
  const list=Object.values(pool).map(p=>{
    const tm=tmMap[p.ti],cs=tm?tm.cs:0,gaPm=tm&&tm.o?tm.ga/tm.o:1.5,wr=tm&&tm.o?tm.w/tm.o:0;
    let sc=0;
    if(p.grp==="K")sc=p.mom*6+cs*4.5+Math.max(0,2.2-gaPm)*3.5+wr*2.5+p.ovr*0.12+p.g*5+p.a*3;
    else if(p.grp==="D")sc=p.g*5.5+p.a*4+p.mom*4.5+cs*2.8+Math.max(0,2.0-gaPm)*2.0+wr*1.8+p.ovr*0.10;
    else if(p.grp==="M")sc=p.g*3.8+p.a*3.2+p.mom*3.5+wr*1.5+p.ovr*0.08;
    else sc=p.g*4.0+p.a*2.5+p.mom*3.5+wr*1.2+p.ovr*0.08;
    return Object.assign(p,{sc,cs,mvp:3*p.g+2*p.a+2*p.mom});
  });
  const pick=(gCode,n)=>list.filter(p=>p.grp===gCode).sort((a,b)=>b.sc-a.sc||b.mvp-a.mvp||b.ovr-a.ovr||TR_CMP(a.n,b.n)).slice(0,n);
  const K=pick("K",1),D=pick("D",4),M=pick("M",3),F=pick("F",3);
  if(K.length<1||D.length<4||M.length<3||F.length<3)return null;
  return{F,M,D,K};
}
function totsPitchHtml(xi){
  const shortNm=n=>{const ps=String(n||"").trim().split(/\s+/);return ps.length>1&&n.length>12?ps[ps.length-1]:n};
  const node=p=>{
    const stat=p.g||p.a?`${p.g?p.g+"G":""}${p.g&&p.a?" ":""}${p.a?p.a+"A":""}`:(p.mom?`${p.mom}★`:(p.cs?`${p.cs} TK`:`${p.ovr}`));
    const act=p.mine?`data-a="pinfo" data-n="${esc(p.n)}"`:`data-a="tinfo" data-i="${p.ti}"`;
    return `<button class="tots-pl${p.mine?" mine":""}" ${act} aria-label="${esc(p.n)} (${esc(T[p.ti].n)})">`+
      `<span class="tots-bdg">${badge(p.ti,26)}<i class="tots-pos p-${p.grp}">${esc(p.pos)}</i></span>`+
      `<b class="tots-nm">${p.mine?"★ ":""}${esc(shortNm(p.n))}</b>`+
      `<span class="tots-st">${stat}${p.mom&&(p.g||p.a)?` · ${p.mom}★`:""}</span>`+
    `</button>`;
  };
  return `<div class="tots-pitch" role="region" aria-label="Turnuvanın En İyi 11'i 4-3-3 dizilişi">`+
    `<svg class="tots-lines" viewBox="0 0 360 440" preserveAspectRatio="none" aria-hidden="true">`+
      `<rect x="10" y="10" width="340" height="420" rx="8"/>`+
      `<line x1="10" y1="220" x2="350" y2="220"/>`+
      `<circle cx="180" cy="220" r="46"/><circle cx="180" cy="220" r="3" fill="currentColor"/>`+
      `<rect x="92" y="10" width="176" height="64"/><rect x="134" y="10" width="92" height="24"/>`+
      `<rect x="92" y="366" width="176" height="64"/><rect x="134" y="406" width="92" height="24"/>`+
    `</svg>`+
    `<div class="tots-rows">`+
      `<div class="tots-row r3">${xi.F.map(node).join("")}</div>`+
      `<div class="tots-row r3">${xi.M.map(node).join("")}</div>`+
      `<div class="tots-row r4">${xi.D.map(node).join("")}</div>`+
      `<div class="tots-row r1">${xi.K.map(node).join("")}</div>`+
    `</div>`+
  `</div>`;
}
function totsPitchCard(s,st2){
  const xi=tourneyTots(s,st2);if(!xi)return "";
  const pitch=totsPitchHtml(xi)+`<div class="bar" style="margin:10px 0 0"><button class="btn pset-sec" data-a="totsg" data-id="${s.id}" style="width:100%"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg><span>En İyi 11’i Görsel Olarak Paylaş</span></button></div><div class="note" style="margin:8px 0 0">Gol, asist, MOTM ve temiz kasa performansına göre otomatik 4-3-3 seçilir. Oyuncuya dokunarak profil/kadro inceleyebilirsin.</div>`;
  return psetCard("trophy","gold","Turnuvanın En İyi 11’i",s.res&&s.res.tots?"Sezon arşivi · 4-3-3":"Canlı performans seçkisi · 4-3-3","TOTS",pitch);
}
function totsDlg(){
  const x=store.seasons.find(y=>y.id==st.totsv);if(!x)return "";
  const xi=tourneyTots(x,tourneyStats(x));if(!xi)return "";
  const mvp=x.res&&x.res.mvp;
  return `<div class="dlg ti"><button class="tibk" data-a="no" aria-label="Kapat"></button><div class="dbox tisheet" role="dialog" aria-modal="true" aria-label="${esc(x.name)} En İyi 11">`+
    `<div class="tots-dlg-hd"><div><b>${esc(x.name)} · En İyi 11</b><small>${mvp?`Turnuva MVP: ${esc(mvp.n)} (${mvp.g}G ${mvp.a}A ${mvp.mom}★)`:esc(fmt(x.cfg))}</small></div><button class="mb sc-ic" data-a="no" aria-label="Kapat">✕</button></div>`+
    totsPitchHtml(xi)+
    `<div class="bar" style="margin:10px 0 0"><button class="btn p pset-pri" data-a="totsg" data-id="${x.id}" style="flex:1">Görsel Olarak Paylaş</button><button class="btn pset-sec" data-a="no">Kapat</button></div>`+
  `</div></div>`;
}
function tstatView(s){
  if(!s.G||!s.G.length)return `<div class="card pglass">${emp("Turnuva istatistikleri kura sonrası burada görünür.")}</div>`;
  const st2=tourneyStats(s);
  if(!st2.matches.length)return `<div class="card pglass">${emp("Henüz oynanmış maç yok. İstatistikler maçlar oynandıkça dolar.")}</div>`;
  const P=st2.players,TMS=st2.teams;
  const prow=(o,i,val)=>`<button class="row tb${o.mine?" myrow":""}" data-a="tinfo" data-i="${o.ti}">${i<3?`<span class="mdl m${i+1}">${i+1}</span>`:`<span class="lb" style="width:20px;font-weight:700;text-align:center">${i+1}</span>`}${badge(o.ti,22)}<span class="n"><b>${o.mine?"★ ":""}${esc(o.n)}</b> <small class="pm">${esc(T[o.ti].n)}</small></span><span class="g">${val}</span></button>`;
  const CROWN='<svg class="lcr" viewBox="0 0 24 20" aria-hidden="true"><path d="M2 17h20l1.5-11-6 4.5L12 2 6.5 10.5.5 6z"/><rect x="2" y="18" width="20" height="2" rx="1"/></svg>';
  const lead=(o,big,unit,sub)=>`<button class="lead tb" data-a="tinfo" data-i="${o.ti}"><span class="lbd">${CROWN}${badge(o.ti,40)}</span><span class="ln"><b>${o.mine?"★ ":""}${esc(o.n)}</b><small>${esc(T[o.ti].n)}</small><small class="lsub">${sub}</small></span><span class="lnum"><b>${big}</b><i>${unit}</i></span></button>`;
  const podium=(arr,big,unit,sub,val)=>arr.length?lead(arr[0],big(arr[0]),unit,sub(arr[0]))+arr.slice(1).map((o,j)=>prow(o,j+1,val(o))).join(""):"";
  const trow=(o,i,val)=>`<button class="row tb${o.ti===s.my?" myrow":""}" data-a="tinfo" data-i="${o.ti}">${i<3?`<span class="mdl m${i+1}">${i+1}</span>`:`<span class="lb" style="width:20px;font-weight:700;text-align:center">${i+1}</span>`}${badge(o.ti,22)}<span class="n"><b>${o.ti===s.my?"★ ":""}${esc(T[o.ti].n)}</b></span><span class="g">${val}</span></button>`;
  const by=(f,tie)=>(a,b)=>(b[f]-a[f])||(tie?tie(a,b):0)||TR_CMP(a.n,b.n);
  const mvp=P.filter(o=>o.mvp>0).sort(by("mvp",(a,b)=>b.g-a.g||b.a-a.a)).slice(0,5);
  const gol=P.filter(o=>o.g>0).sort(by("g",(a,b)=>b.a-a.a)).slice(0,10);
  const asi=P.filter(o=>o.a>0).sort(by("a",(a,b)=>b.g-a.g)).slice(0,10);
  const ht=P.filter(o=>o.ht>0).sort(by("ht",(a,b)=>b.g-a.g)).slice(0,5);
  const gt=TMS.filter(o=>o.o>0);
  const topGf=gt.slice().sort((a,b)=>b.gf-a.gf||(b.gf-b.ga)-(a.gf-a.ga)).slice(0,5);
  const topDef=gt.slice().sort((a,b)=>a.ga/a.o-b.ga/b.o||b.o-a.o).slice(0,5);
  const topW=gt.slice().sort((a,b)=>b.w-a.w||(b.gf-b.ga)-(a.gf-a.ga)).slice(0,5);
  const topCs=gt.filter(o=>o.cs>0).sort((a,b)=>b.cs-a.cs||a.ga-b.ga||b.o-a.o).slice(0,5);
  const topAv=gt.slice().sort((a,b)=>(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf).slice(0,5);
  const M=st2.matches,totG=M.reduce((a,m)=>a+m.g1+m.g2,0);
  const big=M.slice().sort((a,b)=>Math.abs(b.g1-b.g2)-Math.abs(a.g1-a.g2)||(b.g1+b.g2)-(a.g1+a.g2))[0];
  const hi=M.slice().sort((a,b)=>(b.g1+b.g2)-(a.g1+a.g2))[0];
  const mline=m=>`<div class="simm"><button class="tl" data-a="tinfo" data-i="${m.t1}">${esc(T[m.t1].n)}</button><b>${m.g1}–${m.g2}</b><button class="tl" data-a="tinfo" data-i="${m.t2}">${esc(T[m.t2].n)}</button></div>`;
  let h=totsPitchCard(s,st2);
  if(mvp.length)h+=psetCard("trophy","gold","Turnuva MVP’si","3×gol + 2×asist + 2×MOTM",`ilk ${mvp.length}`,podium(mvp,o=>o.mvp,"puan",o=>`${o.g}G ${o.a}A ${o.mom}MA`,o=>`${o.mvp} p <small>${o.g}G ${o.a}A ${o.mom}MA</small>`));
  if(gol.length)h+=psetCard("boot","gold","Gol Krallığı","Turnuvanın en golcü oyuncuları",`ilk ${gol.length}`,podium(gol,o=>o.g,"gol",o=>`${o.a} asist`,o=>`${o.g}G`));
  h+=psetCard("play","sky","Asist Krallığı","En çok gol pası verenler",asi.length?`ilk ${asi.length}`:"0",asi.length?podium(asi,o=>o.a,"asist",o=>`${o.g} gol`,o=>`${o.a}A`):`<div class="note" style="margin:0">Asist verisi oynanan maçlardan toplanır; henüz asist kaydı yok.</div>`);
  if(ht.length)h+=psetCard("spark","gold","Hat-Trick Yapanlar","Tek maçta 3+ gol atanlar",`${ht.length} oyuncu`,ht.map((o,i)=>prow(o,i,`${o.ht}×`)).join(""));
  h+=psetCard("bolt","emr","En Golcü Takımlar","Toplam atılan gol liderleri","ilk 5",topGf.map((o,i)=>trow(o,i,`${o.gf} gol`)).join(""));
  h+=psetCard("shield","sky","En Az Gol Yiyen Takımlar","Savunma liderleri","maç başı",topDef.map((o,i)=>trow(o,i,`${(o.ga/o.o).toFixed(2)} <small>(${o.ga})</small>`)).join(""));
  h+=psetCard("flame","gold","En Çok Kazanan Takımlar","Galibiyet sayısı liderleri","ilk 5",topW.map((o,i)=>trow(o,i,`${o.w} G`)).join(""));
  if(topCs.length)h+=psetCard("shield","emr","En Çok Temiz Kasa","Gol yemeden bitirilen maçlar",`ilk ${topCs.length}`,topCs.map((o,i)=>trow(o,i,`${o.cs} maç <small>(${o.o}M)</small>`)).join(""));
  if(topAv.length)h+=psetCard("bolt","sky","En İyi Averaj","Atılan − yenen gol farkı","ilk 5",topAv.map((o,i)=>{const av=o.gf-o.ga;return trow(o,i,`${av>0?"+":""}${av} <small>(${o.gf}/${o.ga})</small>`)}).join(""));
  const sumBody=`<div class="pset-kpi" style="margin-bottom:10px">`+
    `<div class="pk2 sky"><b>${M.length}</b><span>Toplam Maç</span></div>`+
    `<div class="pk2 emr"><b>${totG}</b><span>Toplam Gol</span></div>`+
    `<div class="pk2 gold"><b>${(totG/M.length).toFixed(2).replace(".",",")}</b><span>Gol / Maç</span></div>`+
    `</div>`+
    (big?`<div class="pset-lbl" style="margin-top:4px">En Farklı Skor · ${esc(big.rd)}</div>${mline(big)}`:"")+
    (hi?`<div class="pset-lbl" style="margin-top:8px">En Gollü Maç · ${esc(hi.rd)}</div>${mline(hi)}`:"");
  h+=psetCard("radar","emr","Turnuva Özeti","Genel tempo ve rekor skorlar",`${M.length} maç`,sumBody);
  return h+`<p class="note">Rakip ve yapay zekâ maçlarındaki golcü ve asistçiler kadro gücüne göre simüle edilir; senin takımının verileri girdiğin maçlardan gelir.</p>`}
function fixtureView(s){
  if(!s.G||!s.G.length)return emp("Henüz kura çekilmedi. Fikstür kura sonrası burada görünür.");
  const sim=ensureSim(s),gl=s.cfg.gl||1,myGm=(s.mt||[]).filter(m=>m.rd==="Grup");
  const totW=Math.max(0,...s.G.map(g=>Math.max(0,g.length-1)))*gl;
  const maxW=Math.min(totW||Infinity,Math.max(sim.w||0,myGm.length));
  const koHtml=koBracketCard(s);
  if(!totW)return koHtml||emp("Bu turnuvada oynanacak grup/lig maçı bulunamadı.");
  const selW=(st.fxw===999||(st.fxw>=1&&st.fxw<=totW))?st.fxw:(maxW||1);
  const fxSide=(i,cls,st2)=>`<button class="ftm ${cls}${st2?" "+st2:""}" data-a="tinfo" data-i="${i}" aria-label="${esc(T[i].n)} kadrosunu incele">${badge(i,34)}<span class="nm">${esc(T[i].n)}</span></button>`;
  const row=(t1,t2,done,g1,g2,mine,det)=>{
    const w1=done&&g1>g2,w2=done&&g2>g1,res=mine&&done?(g1>g2?" w":g1<g2?" l":" d"):"";
    const sc=done
      ?`<div class="fsc" role="img" aria-label="${esc(T[t1].n)} ${g1}, ${esc(T[t2].n)} ${g2}"><span${w2?' class="lose"':""}>${g1}</span><i></i><span${w1?' class="lose"':""}>${g2}</span></div>`
      :`<div class="fsc vs"><span>vs</span></div>`;
    return `<div class="fxm${mine?" mine":""}${res}"><div class="fmt">${fxSide(t1,"h",w1?"win":w2?"lose":"")}${sc}${fxSide(t2,"a",w2?"win":w1?"lose":"")}</div>${det||""}</div>`};
  const seqC=nob();
  const nextOpp=(gi,w)=>{
    if(!seqC[gi]){
      const riv=s.G[gi].filter(x=>x!==s.my),cnt=nob(),sq=[];
      myGm.forEach(m=>{if(m.opp!=null)cnt[m.opp]=(cnt[m.opp]||0)+1});
      for(let k=myGm.length;k<totW;k++){const o=nextGrpOpp(riv,i=>cnt[i]||0,gl);sq.push(o===undefined?null:o);if(o!==undefined)cnt[o]=(cnt[o]||0)+1}
      seqC[gi]=sq}
    const o=seqC[gi][w-myGm.length-1];return o==null?null:o};
  const othersPairs=(gi,w,opp)=>{
    const g=s.G[gi],half=g.length-1;if(half<1)return [];
    const base=circleRounds([s.my,...g.filter(x=>x!==s.my)],false),isSec=w>half;
    const fnd=opp==null?null:base.find(r=>r.some(([a,b])=>(a===s.my&&b===opp)||(b===s.my&&a===opp)));
    return (fnd||base[(w-1)%half]||[]).filter(([a,b])=>a!==s.my&&b!==s.my).map(([a,b])=>isSec?[b,a]:[a,b])};
  const wkData=(gi,w)=>{
    const g=s.G[gi],mn=s.my!=null&&g.includes(s.my),its=[];let played=0,total=0,myOpp=null;
    if(mn){
      const m=myGm[w-1];total++;
      if(m&&m.opp!=null&&T[m.opp]){played++;myOpp=m.opp;its.push(row(s.my,m.opp,true,m.gf,m.ga,true,fxUserDet(s,m)))}
      else if(w>myGm.length){myOpp=nextOpp(gi,w);if(myOpp!=null&&T[myOpp])its.push(row(s.my,myOpp,false,0,0,true,""))}
    }
    const wkM=sim.gm[gi]&&sim.gm[gi][w-1];
    if(wkM&&wkM.length){wkM.forEach(m=>{const[t1,t2,g1,g2,s1,s2,a1,a2]=m;if(T[t1]&&T[t2]){played++;total++;its.push(row(t1,t2,true,g1,g2,false,fxSimDet(t1,t2,g1,g2,s1,s2,a1,a2)))}})}
    else (mn?othersPairs(gi,w,myOpp):simWeekPairs(s,gi,w)).forEach(([t1,t2])=>{if(T[t1]&&T[t2]){total++;its.push(row(t1,t2,false,0,0,false,""))}});
    return {h:its.join(""),played,total}};
  const wkTabs=`<div class="wktabs" role="group" aria-label="Hafta seç">${rg(totW).map(i=>`<button class="chip ${selW===i+1?"on":""}${i+1>maxW?" up":""}" data-a="fxw" data-v="${i+1}" ${selW===i+1?'aria-current="true"':""}>${i+1}. Hafta</button>`).join("")}${totW>1?`<button class="chip ${selW===999?"on":""}" data-a="fxw" data-v="999">Tümü</button>`:""}</div>`;
  const weeks=selW===999?rg(totW).map(i=>i+1):[selW];
  const order=s.G.map((g,gi)=>gi).sort((a,b)=>(s.G[b].includes(s.my)?1:0)-(s.G[a].includes(s.my)?1:0));
  const body=weeks.map(w=>{
    let pl=0,tt=0;
    const blks=order.map(gi=>{const d=wkData(gi,w);pl+=d.played;tt+=d.total;return d.h?`<div class="wkblk">${s.G.length>1?`<div class="fgh"><span>${gname(s,gi)}</span></div>`:""}<div class="fml">${d.h}</div></div>`:""}).join("");
    const pct=tt?Math.round(pl/tt*100):0;
    return `<section class="fxw"><div class="fwh"><h3>${w}. Hafta</h3>${tt?`<span class="fwp"><b>${pl}/${tt}</b> maç oynandı</span>`:""}</div>${tt?`<div class="fwbar" role="progressbar" aria-label="Oynanan maç" aria-valuemin="0" aria-valuemax="${tt}" aria-valuenow="${pl}"><i style="width:${pct}%"></i></div>`:""}${blks||`<div class="note">Bu hafta için maç yok.</div>`}</section>`}).join("");
  const unp=weeks.some(w=>w>maxW)?`<div class="note" style="margin:0 0 8px">Oynanmamış maçlarda senin rakibin, maç giriş ekranındaki sırayla aynıdır (sıradaki oynanmamış grup rakibi). Rakibi giriş ekranında değiştirirsen fikstür de ona göre güncellenir.</div>`:"";
  if(koHtml){
    const fxv=st.fxv==="grp"?"grp":"ko";
    const swBar=`<div class="stabs seg2" style="margin:0 0 10px" role="tablist" aria-label="Fikstür görünümü"><button class="chip ${fxv==="ko"?"on":""}" role="tab" aria-selected="${fxv==="ko"}" data-a="fxv" data-v="ko">🏆 Eleme Ağacı</button><button class="chip ${fxv==="grp"?"on":""}" role="tab" aria-selected="${fxv==="grp"}" data-a="fxv" data-v="grp">📅 Grup Fikstürü</button></div>`;
    return swBar+(fxv==="ko"?koHtml:wkTabs+body+unp);
  }
  return wkTabs+body+unp}
const emp=t=>`<div class="emp">${PITCH}${t}</div>`;
const qOk=s=>!!(s.lk&&s.my!=null&&s.G&&s.P);
const NAV5=[["Sezon",'<path d="M5 21V4M5 5h11l-2 3.5L16 12H5"/>',[7,0,1],7],["Turnuva",'<path d="M4 6h5M4 18h5M9 6v12M9 12h6M15 12h5"/>',[2,3,8,9],2],["İstat.",'<path d="M5 20V10M12 20V4M19 20v-7"/>',[4],4],["Geçmiş",'<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M12 13v4M8 20h8"/>',[5],5],["Ayarlar",'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',[6],6]];
const tabPre=t=>t==0||t==1?`<div class="bar"><button class="chip backpill" data-t="7">‹ Sezon</button></div>`:t==2||t==3||t==8||t==9?`<div class="stabs ttabs" role="tablist" aria-label="Turnuva bölümleri">${[[2,"Kura"],[3,"Gruplar"],[8,"Fikstür"],[9,"İstatistik"]].map(([id,lb])=>`<button class="chip ${t==id?"on":""}" role="tab" aria-selected="${t==id}" ${t==id?'aria-current="page"':""} data-t="${id}">${lb}</button>`).join("")}</div>`:"";
const FDL={w:"Galibiyet (G)",d:"Beraberlik (B)",l:"Mağlubiyet (M)"};
const dotsOf=ms=>ms.slice(-5).map(m=>{const r=mres(m);return `<i class="fd ${r}" role="img" aria-label="${FDL[r]}" title="${FDL[r]}: ${esc(m.on)} ${m.gf}-${m.ga}"></i>`}).join("");
const SBI={
  edit:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19.2 8.8a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M14 7l3 3"/></svg>',
  card:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="3"/><circle cx="9" cy="10.2" r="1.5"/><path d="M4 17.5l5-4.5 3.5 3 3-2.5 4.5 4"/></svg>',
  del:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 7V4.5h4V7M7 7l.8 12.5h8.4L17 7M10.5 11v5M13.5 11v5"/></svg>'
};
const sbF2=x=>(+x).toFixed(2).replace(".",","),sbFP=x=>"%"+Math.round(+x),sbFI=x=>String(Math.round(+x));
function sbCmp(label,a,b,f){
  const has=a!=null&&b!=null,lead=has&&a!==b?(a>b?"l":"r"):"";
  const cls=(side)=>lead?(lead==side?" ld":" lo"):"";
  const bar=has&&(a>0||b>0)?`${a>0?`<i class="${lead=="r"?"dim":""}" style="flex:${a}"></i>`:""}${b>0?`<i class="o${lead=="l"?" dim":""}" style="flex:${b}"></i>`:""}`:"";
  return `<div class="sbr"><b class="a${cls("l")}">${a==null?"—":f(a)}</b><span>${label}</span><b class="b${cls("r")}">${b==null?"—":f(b)}</b><div class="sbb">${bar}</div></div>`;
}
function sbRow(s,m,isFirst){
  const r=mres(m),oi=m.opp!=null&&T[m.opp]?m.opp:ixOf(m.on),me=s.my!=null&&T[s.my]?s.my:null;
  const sub=m.pf!=null&&m.pa!=null?`<small>P ${m.pf}–${m.pa}</small>`:m.et?`<small>UZ</small>`:"";
  // --- Goller / asistler / maçın adamı: sarmalanan rozetler (tek satırda kesilmez) ---
  const evs=[];
  if(Array.isArray(m.gls)&&m.gls.some(g=>g&&g.sc)){
    m.gls.filter(g=>g&&g.sc).forEach(g=>evs.push(isKK(g.sc)?`<span class="sbev og"><i>⚽</i><b>Kendi Kalesine (KK)</b></span>`:`<span class="sbev"><i>⚽</i><b>${esc(g.sc)}</b>${g.as?`<em>👟 ${esc(g.as)}</em>`:""}</span>`));
  }else{
    Object.entries(m.sc||{}).filter(e=>e[1]>0).forEach(([n,g])=>evs.push(`<span class="sbev${isKK(n)?" og":""}"><i>⚽</i><b>${isKK(n)?"Kendi Kalesine (KK)":esc(n)}</b>${g>1?`<em>×${g}</em>`:""}</span>`));
    Object.entries(m.as||{}).filter(e=>e[1]>0).forEach(([n,a])=>evs.push(`<span class="sbev as"><i>👟</i><b>${esc(n)}</b>${a>1?`<em>×${a}</em>`:""}</span>`));
  }
  const oppMom=!m.mom&&(m.omom||(m.opp!=null?pickOppMom(m.opp,m.og,m.gf,m.ga):""));
  if(m.mom)evs.push(`<span class="sbev mom" title="Maçın adamı"><i>★</i><b>${esc(m.mom)}</b></span>`);
  else if(oppMom)evs.push(`<span class="sbev mom" title="Maçın adamı"><i>★</i><b>${esc(oppMom)}</b><em>${esc(m.on)}</em></span>`);
  const evHtml=evs.length?`<div class="sbevs">${evs.join("")}</div>`:"";
  // --- İstatistik paneli: Sen – Rakip karşılaştırma çubukları ---
  const des=matchDeserve(m),eff=xgEffInfo(m),stObj=m.stats;
  let panel="";
  if(stObj){
    const rows=[];
    if(stObj.myXg!=null||stObj.oppXg!=null)rows.push(sbCmp("xG",stObj.myXg,stObj.oppXg,sbF2));
    if(stObj.myPos!=null)rows.push(sbCmp("Topla oynama",stObj.myPos,stObj.oppPos??(100-stObj.myPos),sbFP));
    if(stObj.myShots!=null||stObj.oppShots!=null)rows.push(sbCmp("Şut",stObj.myShots,stObj.oppShots,sbFI));
    if(stObj.mySot!=null||stObj.oppSot!=null)rows.push(sbCmp("İsabetli şut",stObj.mySot,stObj.oppSot,sbFI));
    if(stObj.myPass!=null||stObj.oppPass!=null)rows.push(sbCmp("Pas isabeti",stObj.myPass,stObj.oppPass,sbFP));
    const chips=[];
    if(stObj.oppSot!=null){const sv=Math.max(0,stObj.oppSot-(+m.ga||0));chips.push(`<span class="sbchip" title="Kaleci kurtarışı: rakibin isabetli şutlarından gole dönüşmeyenler">Kurtarış <b>${sv}/${stObj.oppSot}</b></span>`)}
    if(eff)chips.push(`<span class="xgeff ${eff.cls}" title="${esc(eff.t)} · Gol − xG: attığın gol ile pozisyonlarının değeri arasındaki fark">Gol − xG: ${eff.s}</span>`);
    if(rows.length||chips.length){
      const open=(st.mexp&&m.id in st.mexp)?!!st.mexp[m.id]:!!isFirst;
      const sumMini=[];
      if(stObj.myXg!=null&&stObj.oppXg!=null)sumMini.push(`xG ${sbF2(stObj.myXg)}–${sbF2(stObj.oppXg)}`);
      if(stObj.myPos!=null)sumMini.push(`%${Math.round(stObj.myPos)} top`);
      if(stObj.myShots!=null)sumMini.push(`${stObj.myShots} şut`);
      panel=`<button class="sbtog${open?" on":""}" data-a="mexp" data-id="${m.id}" data-def="${isFirst?1:0}" aria-expanded="${open}"><span>📊 Maç İstatistikleri${!open&&sumMini.length?` <small>· ${sumMini.join(" · ")}</small>`:""}</span><i>${open?"▴":"▾"}</i></button>`+
        (open?`<div class="sbst">${rows.length?`<div class="sbsth"><span>Sen</span><span>Rakip</span></div>${rows.join("")}`:""}${chips.length?`<div class="sbchips">${chips.join("")}</div>`:""}</div>`:"");
    }
  }
  const why=deserveWhy(m,des);
  const callout=des?`<div class="sbv ${des.k}"><b><span aria-hidden="true">${des.ic}</span>${esc(des.t)}</b>${why?`<p>${esc(why)}</p>`:""}</div>`:"";
  const crest=i=>i!=null&&i>=0&&T[i]?badge(i,38):`<span class="sbph" aria-hidden="true">⚽</span>`;
  const myN=me!=null?esc(T[me].n):"Takımım";
  const act=`<div class="sbact"><button class="mb" data-a="medit" data-id="${m.id}" aria-label="Maçı düzenle" title="Maçı düzenle">${SBI.edit}</button><button class="mb" data-a="mkart" data-id="${m.id}" aria-label="Maç kartı oluştur" title="Maç kartı oluştur">${SBI.card}</button><button class="mb dl" data-a="mdel" data-id="${m.id}" aria-label="Maçı sil" title="Maçı sil">${SBI.del}</button></div>`;
  return `<div class="sbcard sb-${r}${des&&(des.k=="unlucky"||des.k=="undeserved")?" "+des.k:""}"><div class="sbtop"><span class="sbrd">${esc(m.rd)}${m.lg?" · "+m.lg+". maç":""}</span>${act}</div><div class="sbmain"><div class="sbtm hm">${crest(me)}<span class="n">${myN}</span></div><div class="sbsc ${r}" aria-label="${{w:"Galibiyet",d:"Beraberlik",l:"Mağlubiyet"}[r]}">${m.gf} – ${m.ga}${sub}</div><div class="sbtm aw">${crest(oi)}<span class="n">${esc(m.on)}</span></div></div>${panel}${callout}${evHtml}</div>`}
function matchLog(s){const ms=s.mt||[],showM=st.mall?ms.slice().reverse():ms.slice(-8).reverse();
  return `<div class="card pglass" style="margin-top:0"><h3>Maç günlüğü<span class="fm">${dotsOf(ms)}</span></h3>`+
  (ms.length?`<div class="rt sbhd"><span>${st.mall?"Tüm maçlar ("+ms.length+")":"Son maçlar"}</span></div>`+showM.map((m,idx)=>sbRow(s,m,idx===0)).join("")+(ms.length>8?`<div class="bar" style="margin:8px 0 0"><button class="chip" data-a="mall" style="width:100%">${st.mall?"Daha az göster":"Tüm maçları göster ("+ms.length+")"}</button></div>`:""):emp("Maç sonuçlarını Kura › Gruplar ekranından girebilirsin. G-B-M, gol ve oyuncu golleri otomatik güncellenir."))+`</div>`}
const sheetHtml=(s,fresh)=>`<button class="qbk${fresh?" in":""}" data-a="qx" aria-label="Kapat"></button><div class="sheet${fresh?" in":""}" role="dialog" aria-label="Maç sonucu">${matchCard(s,true)}</div>`;
function grpState(s){
  if(s.my==null||!s.G||!s.cfg.gs)return null;
  const gi=s.G.findIndex(g=>g.includes(s.my));if(gi<0)return null;
  const need=(s.cfg.gs-1)*s.cfg.gl,ms=s.mt||[],gm=ms.filter(m=>m.rd=="Grup");
  let pts=0,gf=0,ga=0;
  gm.forEach(m=>{const a=+m.gf||0,b=+m.ga||0;gf+=a;ga+=b;pts+=a>b?3:a==b?1:0});
  const ko=ms.some(m=>m.rd!="Grup"),done=gm.length>=need,gq=s.gq==1||ko;
  const rem=s.G[gi].filter(i=>i!==s.my&&gm.filter(m=>m.opp===i).length<s.cfg.gl);
  return{gi,need,played:gm.length,pts,gd:gf-ga,done,ko,gq,pend:done&&!gq&&!s.res,rem}}
function grpBox(s){
  const g=grpState(s);if(!g)return "";
  const lg=isLg(s.cfg),gd=(g.gd>0?"+":g.gd<0?"−":"")+Math.abs(g.gd),gs=s.cfg.gs||4;
  const pct=g.need?Math.min(100,Math.round(g.played/g.need*100)):0;
  const gdCls=g.gd>0?" pos":g.gd<0?" neg":"";
  const rows=calcGroupTable(s,g.gi),hasTbl=rows.some(r=>r.o>0);
  const myRk=hasTbl?(rows.findIndex(r=>r.ti===s.my)+1):0;
  const qMax=s.cfg.q||2,rkCls=myRk===1?" r1":(!lg&&myRk>0&&myRk<=qMax)?" rq":"";
  const gl=lg?"★":GL(g.gi);
  let h=`<div class="card pgrp">
    <div class="pgh">
      <span class="pgl">${gl}</span>
      <div class="pgt">
        <b>${lg?"Lig Durumu":"Grubum"}</b>
        <small>${lg?`${s.cfg.N} takımlı lig`:`${gname(s,g.gi)} · ${gs} takım`}</small>
      </div>
      ${myRk?`<span class="pgrk${rkCls}">${myRk}. Sıra</span>`:""}
    </div>
    <div class="pgprog" role="progressbar" aria-label="Oynanan maç" aria-valuemin="0" aria-valuemax="${g.need}" aria-valuenow="${g.played}">
      <div class="pgpt"><span>İlerleme</span><b>${g.played} / ${g.need} maç</b></div>
      <div class="pgpb"><i style="width:${pct}%"></i></div>
    </div>
    <div class="pgkpi">
      <div class="pk"><span>Oynanan</span><b>${g.played}<small>/${g.need}</small></b></div>
      <div class="pk hi"><span>Puan</span><b>${g.pts}</b></div>
      <div class="pk${gdCls}"><span>Averaj</span><b>${gd}</b></div>
    </div>`;
  if(!lg&&s.cfg.gs&&!g.done&&hasTbl&&rows.length>qMax){
    const myRow=rows.find(r=>r.ti===s.my);
    if(myRow){
      const myRem=Math.max(0,g.need-myRow.o),myPts=myRow.pts,myMax=myPts+myRem*3;
      const others=rows.filter(r=>r.ti!==s.my);
      const aheadLocked=others.filter(r=>r.pts>myMax).length;
      const canBeatMe=others.filter(r=>r.pts+Math.max(0,g.need-r.o)*3>=myPts).length;
      let mCls="",mTxt="";
      if(canBeatMe<qMax){mCls="ok";mTxt="✓ Gruptan çıkmayı garantiledin!"}
      else if(aheadLocked>=qMax){mCls="dead";mTxt="✗ Matematiksel olarak gruptan çıkma şansın kalmadı"}
      else if(myRem<=2){
        const potSorted=others.map(r=>r.pts+Math.max(0,g.need-r.o)*3).sort((a,b)=>b-a);
        const needLock=Math.max(0,(potSorted[qMax-1]||0)+1-myPts);
        if(needLock>0&&needLock<=myRem*3){mCls="info";mTxt=`🎯 Çıkmayı garantilemek için kalan ${myRem} maçta ${needLock} puan yetiyor`}
        else{mCls="warn";mTxt=myRem===1?"🔥 Son maç · Gruptan çıkış kaderini bu maç belirleyecek":`⚡ Son ${myRem} maç · Çıkış hattı için kritik viraj`}
      }
      if(mTxt)h+=`<div class="pgmath ${mCls}">${mTxt}</div>`;
    }
  }
  if(!g.done&&g.rem.length){
    h+=`<div class="pgrem">
      <div class="pgrl">Kalan ${lg?"lig":"grup"} rakipleri (${g.rem.length})</div>
      <div class="pgchips">${g.rem.map(i=>`<button class="pgchip" data-a="tinfo" data-i="${i}" aria-label="${esc(T[i].n)} kadrosunu incele">${badge(i,16)}<span>${esc(T[i].n)}</span></button>`).join("")}</div>
    </div>`;
  }
  if(lg){
    if(g.done&&!s.res){
      const out=getTourneyOutcome(s);
      h+=out&&out.done
        ? `<div class="gq"><b>Lig tamamlandı!</b><div class="note" style="margin:2px 0 8px">Ligi <b>${out.myRk}. sırada</b> (${g.pts} puan, ${gd} averaj) bitirdin. Şampiyon: <b>${esc(T[out.ch].n)}</b>.</div><button class="btn p cta" data-a="fintrn">🏆 Turnuvayı Sonlandır ve Kaydet</button></div>`
        : `<div class="gq"><b>Lig maçların tamamlandı!</b><div class="note" style="margin:2px 0 8px">Toplam <b>${g.pts} puan</b> (${gd} averaj) topladın. Son haftayı da simüle edip ligi sonlandırabilirsin:</div><div class="bar" style="margin:0"><button class="btn p" data-a="lgchamp" style="flex:1">🏆 Şampiyon oldum (1.)</button><button class="btn" data-a="gofin" style="flex:1">Diğer sıra seç…</button></div></div>`;
    }
    const sim=ensureSim(s),totW=(s.cfg.N-1)*(s.cfg.gl||1);
    if(sim.w<totW&&g.played>sim.w)h+=`<div class="bar" style="margin:10px 0 0"><button class="btn p" data-a="simw" style="flex:1">⚡ ${sim.w+1}. Hafta Maçlarını Simüle Et</button></div>`;
    return h+`</div>`;
  }
  if(g.pend){
    const rk=st.grk||s.grk||1;
    h+=`<div class="gq"><b>Gruptan çıktın mı?</b><div class="note" style="margin:2px 0 6px">Gruptaki sıranı seçip onayla:</div><div class="grk">${rg(gs).map(i=>`<button class="chip ${rk===i+1?"on":""}" data-a="grk" data-v="${i+1}">${i+1}. sıra</button>`).join("")}</div><div class="bar" style="margin:0"><button class="btn p" data-a="gqy" style="flex:1">Evet, çıktım</button><button class="btn" data-a="gqn" style="flex:1">Hayır, elendim</button></div></div>`;
  }else if(g.gq&&!s.res){
    h+=`<div class="pgst ok">✓ Gruptan ${s.grk?s.grk+". sırada ":""}çıktın · Eleme turundasın</div>`;
  }
  const sim=ensureSim(s),totW=((s.cfg.gs||s.cfg.N)-1)*(s.cfg.gl||1);
  if(sim.w<totW&&g.played>sim.w)h+=`<div class="bar" style="margin:10px 0 0"><button class="btn p" data-a="simw" style="flex:1">⚡ ${sim.w+1}. Hafta Maçlarını Simüle Et</button></div>`;
  const gi=gInfo(s);
  if(gi&&!g.pend){
    const isDead=gi.includes("☠");
    h+=`<div class="pgft${isDead?" dead":""}">${esc(gi)}</div>`;
  }
  return h+`</div>`}
function koBox(s){
  if(!s.G||s.my==null||isLg(s.cfg))return "";
  const g=grpState(s),koM=(s.mt||[]).filter(m=>m.rd!="Grup");
  const sim=ensureSim(s),totW=s.cfg.gs?(s.cfg.gs-1)*(s.cfg.gl||1):0;
  if(s.cfg.gs&&!(g&&g.gq)&&!koM.length&&sim.w<totW)return "";
  const R=rds(s.cfg).filter(r=>r!="Grup");if(!R.length)return "";
  initKoBracket(s,false);
  const rows=R.map(rd=>{
    const ms=koM.filter(m=>m.rd==rd);
    const pairs=sim.ko[rd]||[],myTie=pairs.find(p=>p.t1===s.my||p.t2===s.my);
    if(!ms.length){
      const autoOp=myTie?(myTie.t1===s.my?myTie.t2:myTie.t1):null;
      const doneCnt=pairs.filter(p=>p.w!=null).length;
      return `<div class="kord ${autoOp!=null?"cur":"np"}"><div class="koht"><span>${rd}${autoOp!=null?` · Rakip: ${esc(T[autoOp].n)}`:""}</span><small>${pairs.length?`${doneCnt}/${pairs.length} eşleşme`:"Bekleniyor"}</small></div></div>`;
    }
    const op=ms[0].on,sc=ms.map(mscTxt).join(" , "),gf=ms.reduce((a,m)=>a+m.gf,0),ga=ms.reduce((a,m)=>a+m.ga,0),last=ms[ms.length-1];
    const needL=lgs(s.cfg,rd),doneL=ms.length>=needL;
    const pWin=last.pf!=null&&last.pa!=null&&last.pf!==last.pa?(last.pf>last.pa?1:-1):0;
    const w=!doneL?"cur":(gf>ga||pWin>0?"win":gf<ga||pWin<0?"":"cur");
    return `<div class="kord ${w||"lose"}"><div class="koht"><span>${rd} · ${esc(op)}</span><b>${sc}</b></div><div class="lb">Toplam: ${gf}–${ga}${last.pf!=null&&last.pa!=null?` · Penaltı: ${last.pf}–${last.pa}`:last.et?" · Uzatma":""}</div></div>`;
  }).join("");
  const out=getTourneyOutcome(s);
  const activeRd=R.find(rd=>Array.isArray(sim.ko[rd])&&sim.ko[rd].some(p=>p.w==null));
  let koSimBar="";
  if(out&&out.done&&!s.res){
    koSimBar=`<div class="bar" style="margin:8px 0 0"><button class="btn p cta" data-a="fintrn" style="flex:1">🏆 Turnuvayı Sonlandır (Şampiyon: ${esc(T[out.ch].n)})</button></div>`;
  }else if(activeRd){
    const myTie=(sim.ko[activeRd]||[]).find(p=>p.t1===s.my||p.t2===s.my);
    const waitMe=myTie&&myTie.w==null&&!s.res;
    koSimBar=`<div class="bar" style="margin:8px 0 0">${waitMe?`<button class="btn p" data-t="3" style="flex:1">⚽ ${activeRd} Maçı · Kura › Gruplar’dan gir (Rakip: ${esc(T[myTie.t1===s.my?myTie.t2:myTie.t1].n)})</button>`:`<button class="btn p" data-a="simko" style="flex:1">⚡ ${activeRd} Turunu Simüle Et</button>${R.indexOf(activeRd)<R.length-1?`<button class="btn" data-a="simallko" style="flex:1">⏩ Finale Kadar Simüle Et</button>`:""}`}</div>`;
  }
  return cd("Eleme yolu",`<div class="kobr">${rows}</div>`+koSimBar)}
function tmini(s){
  const t=RT(s,s.my),tr=t.g>=85?1:t.g>=80?2:t.g>=75?3:0,gi=s.G?s.G.findIndex(g=>g.includes(s.my)):-1;
  const bar=v=>Math.max(12,Math.min(100,Math.round((v-55)/40*100)));
  const stats=[["HÜC",t.a],["ORT",t.o],["DEF",t.d]].map(([l,v])=>`<div class="tmst"><div class="tmsh"><span>${l}</span><b>${v}</b></div><i class="tmsb"><u style="width:${bar(v)}%"></u></i></div>`).join("");
  return `<button class="tmini ptmini t${tr}" data-t="1" aria-label="${esc(t.n)} takım kartını aç">
    <div class="ptm-top">
      <div class="ptm-bdg">${badge(s.my,46)}</div>
      <div class="ptm-info">
        <div class="ptm-nm"><span>★</span><b>${esc(t.n)}</b></div>
        <div class="ptm-sub">${fl(t.c)} <span>${CN[t.c][0]}</span>${gi>=0?`<i class="ptm-dot">·</i><em>${gname(s,gi)}</em>`:""}</div>
      </div>
      <div class="ptm-ovr"><b>${t.g}</b><span>GEN</span></div>
      <span class="ptm-chv" aria-hidden="true">›</span>
    </div>
    <div class="ptm-stats">${stats}</div>
  </button>`}
function seasonStatBox(s){
  const t=s.ts||{},w=t.w||0,d=t.d||0,l=t.l||0,n=w+d+l;
  if(!n)return "";
  const gf=t.gf||0,ga=t.ga||0,gd=gf-ga,wr=Math.round(w/n*100),ms=s.mt||[];
  const gdStr=(gd>0?"+":gd<0?"−":"")+Math.abs(gd);
  return `<div class="card pstat">
    <div class="psh">
      <h3>Sezon Performansı</h3>
      <span class="pswr">%${wr} Galibiyet</span>
    </div>
    ${sbar({w,d,l})}
    <div class="psgbm">
      <div class="psg w"><b>${w}</b><span>Galibiyet</span></div>
      <div class="psg d"><b>${d}</b><span>Beraberlik</span></div>
      <div class="psg l"><b>${l}</b><span>Mağlubiyet</span></div>
    </div>
    <div class="psbot">
      <div class="psbox">
        <span>Atılan / Yenen Gol</span>
        <b>${gf} <small>/</small> ${ga} <em class="${gd>0?"pos":gd<0?"neg":""}">(${gdStr})</em></b>
      </div>
      <div class="psbox fm">
        <span>Son Form</span>
        <div class="fm">${dotsOf(ms)||`<small class="lb">—</small>`}</div>
      </div>
    </div>
  </div>`}
const PITCH_ART=`<div class="pitchart" aria-hidden="true"><svg viewBox="0 0 320 190" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="308" height="178" rx="10"/><path d="M160 6V184"/><circle cx="160" cy="95" r="28"/><circle cx="160" cy="95" r="2.5" fill="currentColor"/><path d="M6 52H52V138H6M314 52H268V138H314"/><path d="M6 76H24V114H6M314 76H296V114H314"/></svg><p>Maçları girdikçe istatistikler ve rozetler kendiliğinden oluşur.</p></div>`;
function homeView(s){
  const ms=s.mt||[],has=s.my!=null,fin=!!s.res;
  const S=[["Kurulum",s.lk,"t",0],["Takım",has,"t",1],["Kura",!!s.G,"t",2],["Oyna",ms.length>0||fin,"t",3],["Bitir",fin,"a","gofin"]];
  const ci=S.findIndex(x=>!x[1]);
  let h=`<div class="prog pprog">${S.map((x,i)=>`<button class="stp ${x[1]?"dn":i==ci?"cu":""}" data-${x[2]}="${x[3]}"><i>${x[1]?"✓":i+1}</i><span>${x[0]}</span></button>`).join("")}</div>`;
  let ey="",ttl="",txt="",mid="",main="",sec="",opCol="";
  const playIc='<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="7 4 20 12 7 20 7 4"/></svg>';
  const flagIc='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4M5 5h11l-2 3.5L16 12H5"/></svg>';
  if(!s.lk){
    ey="ADIM 1 · KURULUM";ttl="Turnuvayı Kur";txt="Hazır bir şablon seç veya kendi lig kurallarını belirle.";
    mid=`<div class="ph-head"><span class="ph-em">${UICO.sliders}</span><div><div class="rs">${esc(ttl)}</div><div class="hn">${esc(txt)}</div></div></div>`;
    main=`<button class="btn p ph-cta" data-t="0">${playIc}<span>Kurulumu Başlat</span></button>`;
  }else if(!has){
    ey="ADIM 2 · TAKIM SEÇİMİ";ttl="Takımını Seç";txt="Kura çekiminden önce sahaya çıkacağın kulübü belirle.";
    mid=`<div class="ph-head"><span class="ph-em">${UICO.shield}</span><div><div class="rs">${esc(ttl)}</div><div class="hn">${esc(txt)}</div></div></div>`;
    main=`<button class="btn p ph-cta" data-t="1">${playIc}<span>Takımı Seç</span></button>`;
  }else if(!s.G){
    ey="ADIM 3 · KURA ÇEKİMİ";ttl="Kura Zamanı";txt=T[s.my].n+" hazır. Gruplar ve eşleşmeler kurayla belirlenecek.";
    mid=`<div class="ph-head"><div class="ph-crest">${badge(s.my,46)}</div><div><div class="rs">${esc(ttl)}</div><div class="hn">${esc(txt)}</div></div></div>`;
    main=`<button class="btn p ph-cta" data-t="2">${UICO.spark}<span>Kurayı Çek</span></button>`;
  }else if(!fin){
    const gi=s.G.findIndex(g=>g.includes(s.my)),riv=gi>=0?s.G[gi].filter(i=>i!==s.my):[];
    const nxGrp=s.cfg.gs?nextGrpOpp(riv,i=>ms.filter(m=>m.opp===i&&m.rd=="Grup").length,s.cfg.gl):(ms.length?undefined:riv[0]);
    const stg=autoStage(s),nxKo=nxGrp===undefined&&stg!=="Grup"?getAutoKoOpponent(s,stg):null;
    const opp=nxGrp!==undefined?nxGrp:(nxKo!=null&&T[nxKo]?nxKo:null);
    const gz=grpState(s);
    if(opp!=null&&T[opp]){
      const me=RT(s,s.my),op=RT(s,opp),df=me.g-op.g,hh=h2h(opp);
      const cbOp=bspec(opp);if(cbOp&&cbOp.c1)opCol=` style="--op1:${cbOp.c1}"`;
      ey=stg==="Grup"?(isLg(s.cfg)?"SIRADAKİ LİG MAÇI":`SIRADAKİ MAÇ · ${gname(s,gi).toUpperCase()}`):`SIRADAKİ MAÇ · ${stg.toUpperCase()}`;
      const vsSub=hh?`${hh.o.w}G ${hh.o.d}B ${hh.o.l}M`:(df===0?"Eşit güç":(df>0?`+${df} GEN`:`${df} GEN`));
      mid=`<div class="ph-vs">`+
        `<div class="ph-tm">${badge(s.my,50)}<b>${esc(me.n)}</b><span class="ph-g">${me.g} GEN</span></div>`+
        `<div class="ph-mid"><span class="ph-vsb">VS</span><span class="ph-sub">${esc(vsSub)}</span></div>`+
        `<button class="ph-tm op" data-a="tinfo" data-i="${opp}" aria-label="${esc(op.n)} kadrosunu incele">${badge(opp,50)}<b>${esc(op.n)}</b><span class="ph-g">${op.g} GEN · Kadro ›</span></button>`+
        `</div>`;
    }else{
      ey=isLg(s.cfg)?"LİG TAMAMLANDI":(gz&&gz.pend?"GRUP AŞAMASI BİTTİ":"SAHAYA ÇIK");
      ttl=isLg(s.cfg)?"Lig Maçları Bitti":(gz&&gz.pend?"Gruptan Çıktın mı?":"Sahaya Çık");
      txt=isLg(s.cfg)?"Lig dereceni kaydedip sezonu tamamlayabilirsin.":(gz&&gz.pend?"Aşağıdan gruptaki sıranı seçip eleme turuna geç.":"Sıradaki maçı Turnuva ekranından gir veya sezonu bitir.");
      mid=`<div class="ph-head"><div class="ph-crest">${badge(s.my,46)}</div><div><div class="rs">${esc(ttl)}</div><div class="hn">${esc(txt)}</div></div></div>`;
    }
    main=`<button class="btn p ph-cta" data-t="3">${playIc}<span>Maç Merkezi · Skoru Gir</span></button>`;
    sec=`<button class="btn ph-sec" data-a="gofin">${flagIc}<span>Sezonu Bitir</span></button>`;
  }else{
    const ch=s.res.st==7,ts=s.ts||{};
    ey=ch?"ŞAMPİYONLUK SEZONU":"SEZON TAMAMLANDI";
    ttl=rlb(s.res,s.cfg,s.grk);
    txt=`${ts.w||0}G · ${ts.d||0}B · ${ts.l||0}M · ${ts.gf||0}/${ts.ga||0} gol`;
    mid=`<div class="ph-head"><div class="ph-crest">${badge(s.my,48)}</div><div><div class="rs">${esc(ttl)}</div><div class="hn">${esc(txt)}</div></div></div>`;
    main=`<button class="btn p ph-cta" data-a="ns">${UICO.spark}<span>Yeni Sezon Başlat</span></button>`;
    sec=`<button class="btn ph-sec" data-a="karne" data-id="${s.id}">${UICO.trophy}<span>Karneyi Paylaş</span></button>`;
  }
  const topBar=`<div class="ph-top"><span class="ph-ey"><i class="ph-dot"></i>${esc(ey)}</span>${!fin?stkPill():""}</div>`;
  const acts=`<div class="ph-acts${sec?" two":""}">${main}${sec}</div>`;
  h+=`<div class="big hero phero${fin&&s.res.st==7?" gold":""}"${opCol}>${topBar}${mid}${acts}</div>`;
  if(!s.lk)h+=PITCH_ART;h+=iosPwaRemind()+bkRemind();
  const fold=(id,ic,tone,ttl,sub,pill,bodyFn)=>{const op=!!(st.hm&&st.hm[id]);return `<div class="pfold ${tone}${op?" open":""}"><button class="acbtn${op?" open":""}" data-a="hm" data-k="${id}" aria-expanded="${op}"><span class="aci">${UICO[ic]}</span><span class="act"><b>${ttl}</b>${sub?`<small>${sub}</small>`:""}</span><span class="acr">${pill?`<span class="xfpill">${pill}</span>`:""}<span class="acc" aria-hidden="true">${UICO.chev}</span></span></button>${op?`<div class="acbody">${bodyFn()}</div>`:""}</div>`};
  if(has){
    h+=tmini(s)+grpBox(s)+koBox(s)+seasonStatBox(s);
    const hasAw=(s.pl||[]).some(p=>(p.g||0)+(p.a||0)+(p.mom||0)+(p.m||0)>0);
    if(hasAw){const aw=seasonAwards(s);if(aw)h+=fold("aw","trophy","gold","Sezon Ödülleri",s.res?"Kesinleşti":"Canlı liderler",esc(aw.mvp.n.split(" ").pop())+" · "+aw.mvp.g+"G",()=>awardsCard(s,true))}
    const rvL=!fin?rivals(s):[];
    if(rvL.length)h+=fold("an","radar","sky","Rakip Analizi","Grup rakipleriyle güç farkın",rvL.length+" rakip",()=>analCard(s));
    h+=fold("oy","sliders","emr","Oyun Ayarları","Zorluk, yarı süresi ve kontrol",esc(oyTxt(s)||"Seçilmedi"),()=>oyCard(s));
  }
  return h}
/* ---------- OYUNCU ADI TAMAMLAMA / KADRO TAŞIMA ---------- */
/* ---------- KADRO: İNCELE, OYUNCU EKLE, GOL ATANLAR ---------- */
const SQL={K:"Kaleciler",D:"Defans",M:"Orta saha",F:"Forvet"};

const pmeta=(s,n)=>{const p=sqFind(s.my,n);if(p)return ` <small class="pm">${p.p}</small>`;const a=sqFindAny(n);return a?` <small class="pm">${a.p.p} · transfer (${esc(T[a.i].n)})</small>`:` <small class="pm">transfer</small>`};
const sqChips=(a,c)=>`<div class="cw">${[["A","Hepsi"],["F","Forvet"],["M","Orta saha"],["D","Defans"],["K","Kaleci"]].map(([k,l])=>`<button class="chip${c==k?" on":""}" data-a="${a}" data-v="${k}">${l}</button>`).join("")}</div>`;
function tiSeasonStats(s,ti){
  const map=nob();
  if(!s||ti==null)return map;
  if(ti===s.my){
    (s.pl||[]).forEach(p=>{
      if(!p||!p.n||isKK(p.n))return;
      const g=+p.g||0,a=+p.a||0,mom=+p.mom||0;
      if(g||a||mom)map[nz(p.n)]={n:p.n,g,a,mom};
    });
    return map;
  }
  const hasSim=s.G&&((s.mt||[]).length||(s.sim&&(s.sim.w>0||Object.keys(s.sim.ko||{}).length)));
  if(hasSim){
    tourneyStats(s).players.forEach(p=>{
      if(p.ti===ti&&(p.g||p.a||p.mom))map[nz(p.n)]={n:p.n,g:p.g||0,a:p.a||0,mom:p.mom||0};
    });
  }
  return map;
}
function tiBody(i){
  const L=squadOf(i),f=st.tif||"A",tq=nz(st.tiq||"");
  if(!L.length)return `<div class="note">Bu takım için kadro verisi yok.</div>`;
  const stMap=tiSeasonStats(cur(),i);
  const row=p=>{
    const ps=stMap[nz(p.n)];
    const bdg=ps?`<span class="sqst" aria-label="Sezon istatistiği">${ps.g?`<i class="sg">${ps.g}G</i>`:""}${ps.a?`<i class="sa">${ps.a}A</i>`:""}${ps.mom?`<i class="sm">${ps.mom}★</i>`:""}</span>`:"";
    return `<div class="sqr${p.t=="R"?" rz":""}${ps?" hasst":""}"><span class="sqn">${p.j||""}</span><span class="sqm"><span class="sqnm">${esc(p.n)}${p.t=="S"?`<i class="xi" aria-label="İlk 11">●</i>`:""}</span>${bdg}</span><span class="sqp p-${p.g}">${p.p}</span><span class="sqa">${p.a}</span><span class="sqo">${rb(p.o)}</span></div>`;
  };
  let body="";
  ["K","D","M","F"].filter(g=>f=="A"||f==g).forEach(g=>{const G=L.filter(p=>p.g==g&&(!tq||nz(p.n).includes(tq)));if(G.length)body+=`<div class="rt">${SQL[g]} <small>${G.length}</small></div>`+G.map(row).join("")});
  return body+(tq&&body.indexOf("sqr")<0?`<div class="note">Bu kadroda “${esc(st.tiq)}” bulunamadı.</div>`:"");
}
function tiDlg(){
  const i=st.ti;if(i==null||!T[i])return "";
  const s=cur(),r=RT(s,i),L=squadOf(i),f=st.tif||"A";
  const mine=i===s.my,riv=!mine&&s.my!=null&&rivals(s).includes(i);
  const tag=mine?` · <b>Senin takımın</b>`:riv?` · <b>Grup rakibin</b>`:"";
  const xi=L.filter(p=>p.t=="S"),ag=L.length?L.reduce((a,p)=>a+p.a,0)/L.length:0,xo=xi.length?xi.reduce((a,p)=>a+p.o,0)/xi.length:0;
  const stVals=Object.values(tiSeasonStats(s,i));
  const topSc=stVals.filter(x=>x.g>0).sort((a,b)=>b.g-a.g||b.a-a.a)[0];
  const topAs=stVals.filter(x=>x.a>0).sort((a,b)=>b.a-a.a||b.g-a.g)[0];
  const snStrip=stVals.length?`<div class="ti-sn"><span class="ti-snl">${esc(s.name)}</span>${topSc?`<span class="sqst"><i class="sg">⚽ ${esc(topSc.n)} (${topSc.g}G)</i></span>`:""}${topAs?`<span class="sqst"><i class="sa">👟 ${esc(topAs.n)} (${topAs.a}A)</i></span>`:""}</div>`:"";
  return `<div class="dlg ti"><button class="tibk" data-a="no" aria-label="Kapat"></button><div class="dbox tisheet" role="dialog" aria-label="${esc(T[i].n)} kadrosu"><div class="tih">${badge(i,46)}<div class="tim"><b>${esc(T[i].n)}</b><span>${fl(T[i].c)} ${CN[T[i].c][0]}${tag}</span></div><div class="tmo2"><b>${r.g}</b><i>GEN</i></div></div><div class="tix"><span>HÜC<b>${r.a}</b></span><span>ORT<b>${r.o}</b></span><span>DEF<b>${r.d}</b></span></div>${snStrip}${L.length?`<div class="note" style="margin:8px 0 4px">${L.length} oyuncu · yaş ort. ${fx(ag)} · ilk 11 ort. ${fx(xo)}</div>${sqChips("tif",f)}<input id="tiq" class="f" type="search" placeholder="Kadroda oyuncu ara" value="${esc(st.tiq||"")}" autocomplete="off" aria-label="Kadroda oyuncu ara"><div class="sqh"><span class="sqn">No</span><span class="sqm">Oyuncu</span><span class="sqp">Poz</span><span class="sqa">Yaş</span><span class="sqo">GEN</span></div>`:""}<div id="tiL">${tiBody(i)}</div>${L.length?`<div class="note">● ilk 11 · soluk satırlar rezerv · renkli rozetler bu sezonun gol/asist/MOTM katkısını gösterir.</div>`:""}<div class="bar"><button class="btn p" data-a="no" style="flex:1">Kapat</button></div></div></div>`}
let ALLDL_DONE=false;
function ensureAllPlayersDatalist(){
  if(ALLDL_DONE)return;const dl=$("allpl");if(!dl)return;
  const seen=new Set(),out=[];
  pidx().slice().sort((a,b)=>b.p.o-a.p.o).forEach(o=>{const k=nz(o.p.n);if(!seen.has(k)){seen.add(k);out.push(`<option value="${esc(o.p.n)}">${esc(T[o.i].n)} · ${o.p.p} ${o.p.o}</option>`)}});
  dl.innerHTML=out.join("");ALLDL_DONE=true}
document.addEventListener("focusin",e=>{if(e.target&&e.target.getAttribute&&e.target.getAttribute("list")=="allpl")ensureAllPlayersDatalist()});
function trBox(kind,s){
  const ti=st.trtm!=null?st.trtm:(st.mop!=null&&st.mop!==s.my?st.mop:(s.my===0?1:0)),tL=squadOf(ti),ord="FMDK";
  const tOpts=T.map((t,idx)=>({t,idx})).filter(o=>o.idx!==s.my).sort((a,b)=>TR_CMP(a.t.n,b.t.n)).map(({t,idx})=>`<option value="${idx}" ${idx===ti?"selected":""}>${esc(t.n)} (${t.c} · ${t.g})</option>`).join("");
  const pOpts=tL.slice().sort((a,b)=>ord.indexOf(a.g)-ord.indexOf(b.g)||b.o-a.o).map(p=>`<option value="${esc(p.n)}">${esc(p.n)} · ${p.p} (${p.o})</option>`).join("");
  const isSc=kind.startsWith("sc:"),isAs=kind.startsWith("as:"),gIdx=isSc||isAs?(+kind.split(":")[1]+1):0;
  const lbl=isSc?`${gIdx}. gol için golcü`:isAs?`${gIdx}. gol için asistçi`:"Maçın Adamı";
  return `<div class="gq" style="margin:6px 0 8px"><div class="pt" style="margin-bottom:6px"><b>Başka takımdan / transfer (${lbl})</b><button class="chip" data-a="trclose" style="min-height:30px;padding:2px 8px">Kapat</button></div><div class="lb">1. Oyuncu ara veya adını direkt yaz (tüm FC 27 veritabanı):</div><div class="bar" style="margin:4px 0 8px"><input id="trinp" class="f" style="flex:1;margin:0" maxlength="30" placeholder="Örn: Osimhen, Mbappé, Haaland…" list="allpl" autocomplete="off"><button class="btn p" data-a="tradd" data-k="${kind}">Seç</button></div><div class="lb">2. Veya kulüp seçip kadrosundan bul:</div><div class="rr" style="margin:4px 0 0"><select id="trtm" class="sel" style="flex:1">${tOpts}</select><select id="trpl" class="sel" data-k="${kind}" style="flex:1"><option value="">Oyuncu seç…</option>${pOpts}</select></div></div>`}
function scorerUI(s,gf,sc){
  ensureMgls(gf);
  const L=squadOf(s.my),gls=st.mgls||[];
  const opts=["F","M","D","K"].map(g=>{const G=L.filter(p=>p.g==g);return G.length?`<optgroup label="${SQL[g]}">${G.map(p=>`<option value="${esc(p.n)}">${esc(p.n)} · ${p.p} ${p.o}</option>`).join("")}</optgroup>`:""}).join("");
  const ex=s.pl.filter(p=>!isKK(p.n)&&!L.some(x=>nz(x.n)==nz(p.n)));
  const stPl=s.pl.filter(p=>!isKK(p.n)&&(p.g||0)+(p.a||0)+(p.mom||0)>0).sort((a,b)=>((b.g||0)*2+(b.a||0))-((a.g||0)*2+(a.a||0)));
  const stOpt=stPl.length?`<optgroup label="Bu sezon skora katkı verenler">${stPl.map(p=>`<option value="${esc(p.n)}">${esc(p.n)} (${p.g||0}G · ${p.a||0}A)</option>`).join("")}</optgroup>`:"";
  const exOpt=ex.length?`<optgroup label="Transferler / Eklenenler">${ex.map(p=>`<option value="${esc(p.n)}">${esc(p.n)}${p.g||p.a?` (${p.g||0}G · ${p.a||0}A)`:""}</option>`).join("")}</optgroup>`:"";
  // Hızlı golcü adayları
  const qSc=[],addSc=n=>{if(n&&!isKK(n)&&!qSc.includes(n)&&qSc.length<8)qSc.push(n)};
  s.pl.filter(p=>(p.g||0)>0).sort((a,b)=>b.g-a.g||(b.a||0)-(a.a||0)).forEach(p=>addSc(p.n));
  ex.forEach(p=>addSc(p.n));
  s.pl.filter(p=>(p.a||0)+(p.m||0)>0).sort((a,b)=>(b.a||0)-(a.a||0)).forEach(p=>addSc(p.n));
  L.filter(p=>p.t!="R"&&(p.g=="F"||p.g=="M")).sort((a,b)=>(a.g=="F"?0:1)-(b.g=="F"?0:1)||b.o-a.o).forEach(p=>addSc(p.n));
  s.pl.forEach(p=>addSc(p.n));
  // Hızlı asistçi adayları
  const qAs=[],addAs=n=>{if(n&&!isKK(n)&&!qAs.includes(n)&&qAs.length<8)qAs.push(n)};
  s.pl.filter(p=>(p.a||0)>0).sort((a,b)=>b.a-a.a||(b.g||0)-(a.g||0)).forEach(p=>addAs(p.n));
  ex.forEach(p=>addAs(p.n));
  s.pl.filter(p=>(p.g||0)+(p.m||0)>0).sort((a,b)=>(b.g||0)-(a.g||0)).forEach(p=>addAs(p.n));
  L.filter(p=>p.t!="R"&&(p.g=="M"||p.g=="F")).sort((a,b)=>(a.g=="M"?0:1)-(b.g=="M"?0:1)||b.o-a.o).forEach(p=>addAs(p.n));
  s.pl.forEach(p=>addAs(p.n));
  const doneCnt=gls.filter(g=>g&&g.sc).length;
  let h=`<div class="lb" style="margin-top:4px">Gol ve asist detayları (${doneCnt}/${gf} gol seçildi)</div>`;
  gls.forEach((g,idx)=>{
    const hasSc=!!(g&&g.sc),og=hasSc&&isKK(g.sc),hasAs=hasSc&&!og&&!!g.as,noAs=hasSc&&!og&&!hasAs&&!!g.na;
    const isCompact=og||hasAs||noAs;
    const scTrKey="sc:"+idx,asTrKey="as:"+idx;
    if(isCompact){
      h+=`<div class="glbox done compact${og?" og":""}">`+
        `<span class="glnum">#${idx+1}</span>`+
        `<div class="glc-m">`+
          (og?`<b>⚽ Kendi Kalesine (KK)</b>`:`<b>⚽ ${esc(g.sc)}</b>${hasAs?`<span class="glc-as">👟 ${esc(g.as)}</span>`:`<span class="glc-na">Asist yok</span>`}`)+
        `</div>`+
        `<div class="glc-acts">`+
          (noAs?`<button class="chip glc-btn" data-a="glasopen" data-g="${idx}" title="Asist ekle">+ Asist</button>`:"")+
          (hasAs?`<button class="chip glc-btn" data-a="glasclr" data-g="${idx}" title="Asisti kaldır" aria-label="Asisti kaldır">👟✕</button>`:"")+
          `<button class="chip glc-btn" data-a="glclr" data-g="${idx}" title="Golcüyü değiştir" aria-label="Golcüyü değiştir">✎</button>`+
        `</div>`+
      `</div>`;
      return;
    }
    h+=`<div class="glbox${hasSc?" done":""}">`;
    h+=`<div class="glhd"><span class="glnum">${idx+1}. GOL</span>${hasSc?`<button class="chip" data-a="glclr" data-g="${idx}" style="min-height:28px;padding:2px 10px;font-size:12px">Golcüyü değiştir</button>`:`<span class="lb">Golü kim attı?</span>`}</div>`;
    if(!hasSc){
      h+=`<div class="qk">${qSc.map(n=>`<button class="chip" data-a="glsc" data-g="${idx}" data-n="${esc(n)}">${esc(n)}</button>`).join("")}<button class="chip" data-a="glsc" data-g="${idx}" data-n="KK" style="border-color:var(--wr);color:var(--wr)">⚽ Kendi Kalesine (KK)</button><button class="chip ${st.trm==scTrKey?"on":""}" data-a="tropen" data-k="${scTrKey}">+ Başka / transfer</button></div>`;
      if(st.trm==scTrKey)h+=trBox(scTrKey,s);
      if(opts||ex.length||stPl.length)h+=`<select class="sel f" data-glsc="${idx}"><option value="">Kadrodan golcü seç…</option><option value="KK">⚽ Kendi Kalesine (KK)</option>${stOpt}${exOpt}${opts}</select>`;
    }else{
      const asCand=qAs.filter(n=>nz(n)!==nz(g.sc));
      h+=`<div class="pt" style="margin-bottom:6px"><span><b>⚽ Gol: ${esc(g.sc)}</b>${pmeta(s,g.sc)}</span><span class="lb">Asist bekleniyor</span></div>`;
      h+=`<div class="qk"><button class="chip" data-a="glasno" data-g="${idx}" style="border-color:var(--ac);color:var(--ac);font-weight:600">Asist yok ✓</button>${asCand.map(n=>`<button class="chip" data-a="glas" data-g="${idx}" data-n="${esc(n)}">👟 ${esc(n)}</button>`).join("")}<button class="chip ${st.trm==asTrKey?"on":""}" data-a="tropen" data-k="${asTrKey}">+ Başka / transfer</button></div>`;
      if(st.trm==asTrKey)h+=trBox(asTrKey,s);
      if(opts||ex.length||stPl.length)h+=`<select class="sel f" data-glas="${idx}"><option value="">Kadrodan asistçi seç (isteğe bağlı)…</option>${stOpt}${exOpt}${opts}</select>`;
    }
    h+=`</div>`;
  });
  const mom=st.mmom||"";
  const allMomNames=new Set([...L.map(p=>p.n),...ex.map(p=>p.n)]);
  const customMom=mom&&!allMomNames.has(mom)?`<option value="${esc(mom)}" selected>${esc(mom)} (Transfer)</option>`:"";
  const momOpts=["F","M","D","K"].map(g=>{const G=L.filter(p=>p.g==g);return G.length?`<optgroup label="${SQL[g]}">${G.map(p=>`<option value="${esc(p.n)}" ${mom===p.n?"selected":""}>${esc(p.n)} · ${p.p} ${p.o}</option>`).join("")}</optgroup>`:""}).join("");
  const momEx=ex.length?`<optgroup label="Transferler / Eklenenler">${ex.map(p=>`<option value="${esc(p.n)}" ${mom===p.n?"selected":""}>${esc(p.n)}</option>`).join("")}</optgroup>`:"";
  h+=`<div class="rr" style="margin-top:8px"><span class="lb">Maçın Adamı (MOTM)</span><select id="mmom" class="sel" style="flex:1"><option value="">Seçilmedi (Otomatik rakipten seçilir)</option>${customMom}${momEx}${momOpts}</select><button class="chip ${st.trm=="mom"?"on":""}" data-a="tropen" data-k="mom" style="padding:6px 10px">+ Başka</button></div>`;
  if(st.trm=="mom")h+=trBox("mom",s);
  return h}
document.addEventListener("keydown",e=>{
  if(e.key=="Tab"){const modal=document.querySelector("#dlg .dbox, #qs .sheet");if(modal){const f=[...modal.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),a[href]')];if(f.length){const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}return}}
  if(e.key=="Escape"){if(st.qs){st.qs=false;st.med=null;render();return}if(st.pi||st.totsv||st.guide||st.ti!=null||st.gs||st.ask||st.sum||st.img||st.ren||st.imp){st.pi=null;st.totsv=null;st.guide=false;st.ti=null;st.gs=false;st.ask=null;st.sum=null;clrImg();st.ren=null;st.imp=null;st.tiq="";render();return}}
  if(e.target&&e.target.id=="rn"){if(e.key=="Enter"){e.preventDefault();document.querySelector('[data-a="rens"]').click()}else if(e.key=="Escape"){document.querySelector('[data-a="no"]').click()}return}
  if(e.key=="Enter"&&e.target&&e.target.id=="trinp"){e.preventDefault();const b=document.querySelector('[data-a="tradd"]');if(b)b.click()}
});

/* ---------- ZORLUK YILDIZI VE RAKİP ANALİZİ ---------- */
const DL=["Çok kolay","Kolay","Orta","Zor","Çok zor"];
function diffOf(s){if(s.my==null||!s.P||s.P.length<2)return -1;const p=s.P.slice().sort((a,b)=>V(T[b])-V(T[a])),r=p.indexOf(s.my);return r<0?-1:Math.min(4,Math.floor(r/(p.length-1)*5))}
function difHtml(s){const d=diffOf(s);if(d<0)return "";return `<div class="dif" role="img" aria-label="Zorluk: ${DL[d]}, 5 üzerinden ${d+1}"><span>Zorluk</span><span class="stars" aria-hidden="true">${"★".repeat(d+1)+"☆".repeat(4-d)}</span><b>${DL[d]}</b></div>`}
const DIM=[["g","Gen","Genel"],["a","Hüc","Hücum"],["o","Ort","Orta saha"],["d","Def","Defans"]];
const sg=n=>n>0?"+"+n:""+n;
const dcl=d=>d>0?"wr":d<0?"gd":"";
function rivals(s){if(s.my==null||!s.G)return [];const g=s.G.find(g=>g.includes(s.my));return g?g.filter(i=>i!==s.my):[]}
function edge(me,i){const b=T[i],d=[["hücumu","a"],["orta sahası","o"],["defansı","d"]].map(([l,k])=>[l,b[k]-me[k]]).sort((x,y)=>y[1]-x[1])[0];return d[1]>0?d[0]+" "+d[1]+" puan yüksek":"hiçbir alanda senden üstün değil"}
function genTxt(me,i){const d=T[i].g-me.g;return d>0?"genel gücü "+d+" puan yüksek":d<0?"genel gücü "+(-d)+" puan düşük":"senle aynı güçte"}
function analCard(s){
  const R=rivals(s);if(!R.length)return "";
  const me=T[s.my],so=R.slice().sort((x,y)=>V(T[y])-V(T[x])),hi=so[0],lo=so[so.length-1];
  const dv=i=>[["a","Hüc"],["o","Ort"],["d","Def"]].map(([k,l])=>`${l}<b class="${dcl(T[i][k]-me[k])}">${sg(T[i][k]-me[k])}</b>`).join(" ");
  let h=`<div>En tehlikeli rakip: <b>${esc(T[hi].n)}</b> (${T[hi].g}), ${edge(me,hi)}.</div>`;
  if(so.length>1)h+=`<div style="margin-top:4px">En kolay rakip: <b>${esc(T[lo].n)}</b> (${T[lo].g}), ${genTxt(me,lo)}.</div>`;
  h+=`<div class="rt">Rakiplerin sana göre farkı</div>`+so.map(i=>`<button class="row tb" data-a="tinfo" data-i="${i}" aria-label="${esc(T[i].n)} kadrosunu incele"><span class="cc">${fl(T[i].c)}</span><span class="n">${esc(T[i].n)}</span><span class="dl">${dv(i)}</span>${rb(T[i].g)}<span class="chev">›</span></button>`).join("")+`<div class="note">Hüc hücum, Ort orta saha, Def defans. Kırmızı: rakip önde, yeşil: sen öndesin. Satıra basınca takımın kadrosu açılır.</div>`;
  return cd(`Rakip analizi<small>${gname(s,s.G.findIndex(g=>g.includes(s.my)))}</small>`,h)}
const vsLine=(s,i)=>{if(s.my==null||i==null||!T[i])return "";const a=T[s.my],b=T[i];return h2hLine(i)+`<div class="note" style="margin:0 0 6px">Rakip sana göre: ${DIM.map(([k,l])=>`${l} ${b[k]} (<span class="${dcl(b[k]-a[k])}">${sg(b[k]-a[k])}</span>)`).join(" · ")}</div>`};

/* ---------- RASTGELE TAKIM: SLOT ANİMASYONU ---------- */
const reelHtml=i=>`<span class="rc">${fl(T[i].c)}<span class="n">${esc(T[i].n)}</span>${rb(T[i].g)}</span>`;
const slotDlg=()=>{const r=st.slot.r;return `<div class="dlg"><div class="dbox" role="dialog" aria-modal="true"><div class="rs">Takımın çekiliyor…</div><div class="reel"><div class="rl" id="r0">${reelHtml(r[0])}</div><div class="rl on" id="r1">${reelHtml(r[1])}</div><div class="rl" id="r2">${reelHtml(r[2])}</div></div><div class="bar"><button class="btn" data-a="skip">Atla</button></div></div></div>`};
function spin(s){
  if(st.slot)return;
  const PS=s.P.slice().sort((x,y)=>V(T[y])-V(T[x])),baseC=PS.slice(dcut(s,store.diff||0)),cdSet=recentCooldownSet(s);
  const filtC=baseC.filter(i=>!cdSet.has(i)&&i!==s.my);
  const c=filtC.length?filtC:(baseC.filter(i=>i!==s.my).length?baseC.filter(i=>i!==s.my):baseC);
  const pk=()=>c[Math.random()*c.length|0],fin=pk(),snap=JSON.stringify(store);
  let over=false;
  const done=()=>{if(over)return;over=true;clearTimeout(st.slt);st.slot=null;s.my=fin;st.mode="rnd";save();render();flush("Takımın: "+T[fin].n,snap)};
  if(rm()||c.length<2){done();return}
  const N=22;let k=0,r=[pk(),pk(),pk()];
  st.slot={r,done};st.mode="rnd";render();
  try{navigator.vibrate&&navigator.vibrate(20)}catch(e){}
  const paint=()=>{[0,1,2].forEach(j=>{const e=$("r"+j);if(e)e.innerHTML=reelHtml(r[j])});if(st.slot)st.slot.r=r};
  const tick=()=>{
    if(over)return;
    k++;
    let nx=k==N-1?fin:pk();
    if(k!=N-1&&c.length>2)for(let g=0;g<6&&(nx===r[1]||nx===r[2]);g++)nx=pk();
    r=[r[1],r[2],nx];paint();
    if(k>=N){const e=$("r1");if(e)e.classList.add("win");try{navigator.vibrate&&navigator.vibrate([60,40,120])}catch(x){}st.slt=setTimeout(done,900);return}
    st.slt=setTimeout(tick,55+Math.pow(k/N,2)*240)};
  st.slt=setTimeout(tick,60)}

/* ---------- BİLDİRİM (yeni rozet) ---------- */
const ntf=m=>{st.snap=null;$("toast").innerHTML=`<span>${esc(m)}</span><button class="btn" data-a="tx">Tamam</button>`;$("toast").hidden=false;clearTimeout(tmr);tmr=setTimeout(hideToast,5000)};
const ntfReload=m=>{st.snap=null;const el=$("toast");if(!el)return;el.innerHTML=`<span>⚠️ ${esc(m)}</span><button class="btn" data-a="reload">Sayfayı Yenile</button>`;el.hidden=false;clearTimeout(tmr)};
const flush=(un,snap)=>{const nb=st.nb||[];st.nb=[];const bm=nb.length?"🏆 Yeni rozet: "+nb.join(", "):"";if(un)toast(un+(bm?" · "+bm:""),snap);else if(bm)ntf(bm)};

/* ---------- HAREKET TERCİHİ ---------- */
const rm=()=>store.motion===0||matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- KULÜP ARMALARI (takım adından üretilir) ---------- */
const BP=["M0 18H46V30H0Z","M23 0H46V53H23Z","M0 30L30 0H46V10L4 53H0Z","M0 10H46V17H0ZM0 24H46V31H0ZM0 38H46V45H0Z","M0 14L23 30L46 14V26L23 42L0 26Z","M0 0H23V26H0ZM23 26H46V53H23Z"];
const SHD="M3 3H43V32Q43 44 23 50Q3 44 3 32Z";
const CLBC={
"Real Madrid":["#ffffff","#d4a017",2,"RMA"],"Barcelona":["#004d98","#a50044",3,"BAR"],"PSG":["#004170","#da291c",1,"PSG"],
"Liverpool":["#c8102e","#f6eb61",0,"LIV"],"Man City":["#6cabdd","#1c2c5b",0,"MCI"],"Bayern":["#dc052d","#ffffff",5,"BAY"],
"Arsenal":["#ef0107","#ffffff",1,"ARS"],"Lombardia FC":["#010e80","#111111",3,"INT"],"Atlético Madrid":["#cb3524","#ffffff",3,"ATM"],
"Chelsea":["#034694","#dba111",0,"CHE"],"Dortmund":["#fde100","#111111",2,"BVB"],"Milano FC":["#fb090b","#111111",3,"MIL"],
"Newcastle":["#111111","#ffffff",3,"NEW"],"Aston Villa":["#670e36","#95bfe5",1,"AVL"],"Napoli":["#12a0d7","#ffffff",0,"NAP"],
"Man United":["#da291c","#fbe122",1,"MUN"],"Tottenham":["#132257","#ffffff",1,"TOT"],"Juventus":["#111111","#ffffff",3,"JUV"],
"Roma":["#8e1f2f","#f0bc42",1,"ROM"],"Athletic Bilbao":["#ee2523","#ffffff",3,"ATH"],"Galatasaray":["#a90432","#fdb912",1,"GS"],
"Fenerbahçe":["#002d72","#ffed00",3,"FB"],"Beşiktaş":["#111111","#ffffff",3,"BJK"],"Trabzonspor":["#6c1d45","#38b6ff",3,"TS"],
"Sporting":["#008057","#ffffff",0,"SCP"],"Benfica":["#e83030","#ffffff",2,"SLB"],"Porto":["#00428c","#ffffff",3,"FCP"],
"Braga":["#c8102e","#ffffff",1,"SCB"],"Leverkusen":["#e32221","#111111",0,"B04"],"Leipzig":["#dd0741","#ffffff",4,"RBL"],
"Marseille":["#2faee0","#ffffff",4,"OM"],"Monaco":["#e51b22","#ffffff",2,"ASM"],"Lyon":["#14387f","#da291c",4,"OL"],
"Lille":["#e01e13","#1d2342",4,"LIL"],"Ajax":["#ffffff","#d2122e",1,"AJA"],"PSV":["#ed1c24","#ffffff",3,"PSV"],
"Feyenoord":["#ed1c24","#ffffff",1,"FEY"],"Al Hilal":["#004b9b","#ffffff",0,"HIL"],"Al Nassr":["#fdd116","#003893",2,"NAS"],
"Al Ahli":["#006838","#ffffff",1,"AHL"],"Al Ittihad":["#f7c800","#111111",3,"ITT"],"Villarreal":["#f5e114","#005187",0,"VIL"],
"Real Betis":["#0bb363","#ffffff",3,"BET"],"Real Sociedad":["#0067b1","#ffffff",3,"RSO"],"Sevilla":["#ffffff","#d41920",2,"SEV"],
"Valencia":["#ffffff","#111111",1,"VAL"],"Bergamo Calcio":["#1e71b8","#111111",3,"ATA"],"Latium":["#87d8f7","#ffffff",0,"LAZ"],
"Fiorentina":["#482e92","#ffffff",4,"FIO"],"Bologna":["#1a2f48","#a21c26",3,"BOL"],"Celtic":["#018749","#ffffff",0,"CEL"],
"Boca Juniors":["#003399","#ffcc00",0,"BOC"],"River Plate":["#ffffff","#e41b17",2,"RIV"],
"Olympiacos":["#d00027","#ffffff",3,"OLY"],"Panathinaikos":["#00793a","#ffffff",0,"PAO"],
"AEK":["#f7c600","#111111",2,"AEK"],"PAOK":["#111111","#ffffff",3,"PAOK"],
"Club Brugge":["#00559b","#111111",3,"CLU"],"West Ham":["#7a263a","#1bb1e7",4,"WHU"],
"Everton":["#003399","#ffffff",2,"EVE"],"Brighton":["#0057b8","#ffffff",3,"BHA"],"Crystal Palace":["#1b458f","#c4122e",3,"CRY"],
"Nottingham Forest":["#dd0000","#ffffff",1,"NFO"],"Frankfurt":["#e1000f","#111111",3,"SGE"],"Stuttgart":["#ffffff","#e32219",0,"VFB"],
"Wolfsburg":["#65b32e","#ffffff",4,"WOB"],
"Deportivo":["#003399","#ffffff",3,"DEP"],"Club América":["#f5d000","#002d62",4,"AME"],"Toluca":["#c8102e","#ffffff",1,"TOL"],"Hull City":["#f5a122","#111111",3,"HUL"]
};
const bsp=nob();
function bspec(i){const n=T[i].n;if(bsp[n])return bsp[n];
  if(CLBC[n]){const [c1,c2,pi,ini]=CLBC[n];return bsp[n]={c1,c2,p:BP[pi],ini}}
  let x=2166136261;for(const ch of n)x=Math.imul(x^ch.charCodeAt(0),16777619)>>>0;
  const h=x%360,h2=(h+[30,60,150,180,210][(x>>>9)%5])%360,li=(x>>>5)&1;
  const ini=n.split(/[\s.\-']+/).filter(Boolean).map(w=>w[0]).join("").slice(0,3).toUpperCase();
  return bsp[n]={c1:`hsl(${h},55%,32%)`,c2:li?`hsl(${h2},75%,58%)`:"#f1f1ea",p:BP[(x>>>13)%6],ini}}
function badge(i,w){const b=bspec(i),fs=b.ini.length>2?14:b.ini.length==2?17:21;
  return `<svg class="bd" viewBox="0 0 46 53" width="${w}" height="${Math.round(w*53/46)}" ${w<40?'aria-hidden="true"':`role="img" aria-label="${esc(T[i].n)} arması"`}><g clip-path="url(#shd-clip)"><rect width="46" height="53" fill="${b.c1}"/><path d="${b.p}" fill="${b.c2}"/></g><path d="${SHD}" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2"/><text x="23" y="29" text-anchor="middle" dominant-baseline="central" font-size="${fs}" font-weight="700" fill="#fff" style="font-family:var(--num);paint-order:stroke;stroke:rgba(0,0,0,.55);stroke-width:2.6px;stroke-linejoin:round">${esc(b.ini)}</text></svg>`}
function drawBadge(c,i,x,y,w){const b=bspec(i),k=w/46,fs=b.ini.length>2?14:b.ini.length==2?17:21,sh=new Path2D(SHD);
  c.save();c.translate(x,y);c.scale(k,k);
  c.save();c.clip(sh);c.fillStyle=b.c1;c.fillRect(0,0,46,53);c.fillStyle=b.c2;c.fill(new Path2D(b.p));c.restore();
  c.lineWidth=2;c.strokeStyle="rgba(255,255,255,.9)";c.stroke(sh);
  c.font="700 "+fs+"px "+NUMF;c.textAlign="center";c.textBaseline="middle";c.lineJoin="round";c.lineWidth=2.6;c.strokeStyle="rgba(0,0,0,.55)";c.strokeText(b.ini,23,29);c.fillStyle="#fff";c.fillText(b.ini,23,29);
  c.restore()}

/* ---------- KART EĞİMİ (dokun / sürükle) ---------- */
const tcReset=()=>document.querySelectorAll(".tcw.on").forEach(w=>{w.classList.remove("on");["--rx","--ry","--gx","--gy"].forEach(p=>w.style.removeProperty(p))});
document.addEventListener("pointermove",e=>{
  const w=e.target.closest&&e.target.closest(".tcw");if(!w||rm())return;
  const r=w.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  w.style.setProperty("--ry",((x-.5)*18).toFixed(1)+"deg");w.style.setProperty("--rx",((.5-y)*14).toFixed(1)+"deg");
  w.style.setProperty("--gx",(x*100).toFixed(0)+"%");w.style.setProperty("--gy",(y*100).toFixed(0)+"%");w.classList.add("on")});
document.addEventListener("pointerup",tcReset);document.addEventListener("pointercancel",tcReset);
document.addEventListener("pointerout",e=>{const w=e.target.closest&&e.target.closest(".tcw");if(w&&!(e.relatedTarget&&e.relatedTarget.closest&&e.relatedTarget.closest(".tcw")))tcReset()});

/* ---------- HAVAI FİŞEK (galibiyet) ---------- */
function fireworks(lv){if(rm())return;
  const cv=document.createElement("canvas");cv.className="fwx";cv.setAttribute("aria-hidden","true");
  const dpr=Math.min(window.devicePixelRatio||1,2),W=innerWidth,H=innerHeight;
  cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);document.body.appendChild(cv);
  const c=cv.getContext("2d");if(!c){cv.remove();return}
  c.scale(dpr,dpr);
  const PAL=[["#f8e08a","#d4a017"],["#3ee6a8","#0f9d6b"],["#ff4fa3","#ff9ad0"],["#ff7a7a","#ffb347"],["#7ab8ff","#c58bff"]];
  const nb=lv>=3?9:lv==2?7:5,per=lv>=3?100:lv==2?85:70,rk=[],P=[];
  const sched=rg(nb).map(i=>i*340+Math.random()*180);
  const t0=performance.now();let last=t0,li=0;
  function boom(x,y){const pal=PAL[Math.random()*PAL.length|0],ring=Math.random()<.4;
    for(let i=0;i<per;i++){const a=Math.PI*2*i/per+Math.random()*.08,v=ring?3.6:1.2+Math.random()*3.8;
      P.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,d:.007+Math.random()*.01,c:pal[i%2],r:1.3+Math.random()*1.4})}}
  function frame(now){
    const dt=Math.min(40,now-last),k=dt/16.7;last=now;
    while(li<sched.length&&now-t0>=sched[li]){li++;
      rk.push({x:W*(.12+Math.random()*.76),y:H+8,ty:H*(.14+Math.random()*.3),vy:-(H*.016+Math.random()*3)})}
    c.globalCompositeOperation="destination-out";c.fillStyle="rgba(0,0,0,.2)";c.fillRect(0,0,W,H);
    c.globalCompositeOperation="source-over";
    for(let i=rk.length-1;i>=0;i--){const r=rk[i];r.y+=r.vy*k;r.vy*=Math.pow(.985,k);
      c.globalAlpha=1;c.fillStyle="#f5b301";c.beginPath();c.arc(r.x,r.y,2,0,6.2832);c.fill();
      if(r.y<=r.ty||r.vy>-2){boom(r.x,r.y);rk.splice(i,1)}}
    for(let i=P.length-1;i>=0;i--){const p=P[i];
      p.vx*=Math.pow(.985,k);p.vy=p.vy*Math.pow(.985,k)+.045*k;p.x+=p.vx*k;p.y+=p.vy*k;p.l-=p.d*k;
      if(p.l<=0){P.splice(i,1);continue}
      c.globalAlpha=Math.min(1,p.l*1.4);c.fillStyle=p.c;c.beginPath();c.arc(p.x,p.y,p.r,0,6.2832);c.fill()}
    c.globalAlpha=1;
    if(li<sched.length||rk.length||P.length)requestAnimationFrame(frame);else cv.remove()}
  requestAnimationFrame(frame);
  try{navigator.vibrate&&navigator.vibrate([60,40,60,40,160])}catch(e){}
  setTimeout(()=>cv.remove(),9000)}

/* ---------- KONFETİ ---------- */
function confetti(){if(rm())return;
  const d=document.createElement("div");d.className="cfx";d.setAttribute("aria-hidden","true");
  const C=["#f8e08a","#d4a017","#0f9d6b","#ffffff","#e0b43a","#3ee6a8"];
  d.innerHTML=rg(70).map(()=>`<i style="left:${Math.random()*100|0}%;background:${C[Math.random()*C.length|0]};animation-delay:${(Math.random()*.8).toFixed(2)}s;width:${6+Math.random()*6|0}px"></i>`).join("");
  document.body.appendChild(d);
  try{navigator.vibrate&&navigator.vibrate([80,40,80,40,200])}catch(e){}
  setTimeout(()=>d.remove(),3600)}

/* ---------- REKORLAR ---------- */
function recCard(){
  const S=store.seasons,M=[];S.forEach(x=>(x.mt||[]).forEach(m=>M.push({m,s:x.name})));
  if(!M.length)return `<div class="card pglass prec"><h3>Rekorlar</h3>${emp("Maç sonuçları girildikçe rekorlar burada toplanır.")}</div>`;
  const mxb=f=>M.reduce((a,b)=>f(b.m)>f(a.m)?b:a);
  const bw=mxb(m=>mres(m)=="w"?m.gf-m.ga:-99),mg=mxb(m=>m.gf+m.ga),ms=mxb(m=>m.gf);
  let ws=0,us=0,wb=0,ub=0;M.forEach(({m})=>{const r=mres(m);ws=r=="w"?ws+1:0;us=r!="l"?us+1:0;wb=Math.max(wb,ws);ub=Math.max(ub,us)});
  const cs=M.filter(x=>x.m.ga==0).length;
  const bs=S.filter(x=>x.res).sort((a,b)=>b.res.st-a.res.st||(b.ts.w||0)-(a.ts.w||0))[0];
  const mTile=(lbl,ic,cls,x)=>{const r=mres(x.m);return `<div class="rec-tile ${cls}"><span class="reci">${XGI[ic]||XGI.pts}</span><div class="recm"><span class="recl">${lbl}</span><b>${esc(x.m.on)}</b><small>${esc(x.s)}${x.m.rd?` · ${esc(x.m.rd)}`:""}</small></div><span class="rec-sc ${r}">${x.m.gf}–${x.m.ga}</span></div>`};
  const tiles=(mres(bw.m)=="w"?mTile("En Büyük Galibiyet","pts","gold",bw):"")+
    mTile("En Çok Gol Atılan Maç","shot","sky",mg)+
    mTile("En Çok Attığın Gol","fin","emr",ms);
  const kpis=`<div class="rec-kpi">`+
    `<div class="rkpi emr${wb?"":" z"}"><b>${wb}</b><span>Galibiyet Serisi</span></div>`+
    `<div class="rkpi sky${ub?"":" z"}"><b>${ub}</b><span>Yenilmezlik</span></div>`+
    `<div class="rkpi gold${cs?"":" z"}"><b>${cs}</b><span>Temiz Kasa</span></div>`+
    `</div>`;
  const bestH=bs?`<div class="rec-best"><span class="reci">${XGI.pts}</span><div><span class="recl">En İyi Sezon</span><b>${esc(bs.name)} · ${esc(rlb(bs.res,bs.cfg,bs.grk))}</b></div></div>`:"";
  return `<div class="card pglass prec"><h3>Rekorlar<small>${M.length} maç · ${S.length} sezon</small></h3><div class="rec-list">${tiles}</div>${kpis}${bestH}</div>`}

let tmr;
const hideToast=()=>{clearTimeout(tmr);$("toast").hidden=true;st.snap=null};
const toast=(m,snap)=>{st.snap=snap;$("toast").innerHTML=`<span>${esc(m)}</span><button class="btn" data-a="undo">Geri al</button>`;$("toast").hidden=false;clearTimeout(tmr);tmr=setTimeout(hideToast,4000)};
function render(){
  const qsEl=document.querySelector("#qs .sheet"),qsTop=qsEl?qsEl.scrollTop:0;
  const tiEl=document.querySelector("#dlg .tisheet"),tiTop=tiEl?tiEl.scrollTop:0;
  const ae=document.activeElement,aeId=ae&&ae.id?ae.id:null,aeSel=ae&&typeof ae.selectionStart=="number"?ae.selectionStart:null;
  const de=document.documentElement;if(store.theme)de.setAttribute("data-theme",store.theme);else de.removeAttribute("data-theme");syncThemeColor();if(store.motion===0)de.setAttribute("data-motion","off");else de.removeAttribute("data-motion");
  $("sbar").innerHTML=`<select id="ss" class="sel">${store.seasons.map(x=>`<option value="${x.id}" ${x.id==store.cur?"selected":""}>${esc(x.name)}${x.res?" ✓":""}</option>`).join("")}</select><button class="btn" data-a="ns" aria-label="Yeni sezon">＋</button><button class="btn" data-a="gs" aria-label="Ara"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg></button>`;
  $("tabs").innerHTML=NAV5.map(([t,ic,g,d])=>{const on=g.includes(st.tab);return `<button role="tab" aria-selected="${on}" ${on?'aria-current="page"':""} class="${on?"cur":""}" data-t="${d}"><svg viewBox="0 0 24 24" aria-hidden="true">${ic}</svg><span>${t}</span></button>`}).join("");
  const sx=st.sum&&store.seasons.find(x=>x.id==st.sum);
  $("dlg").innerHTML=st.slot?slotDlg():st.own?ownDlg():st.gs?gsDlg():st.img?imgDlg():st.ren?`<div class="dlg"><div class="dbox" role="dialog" aria-modal="true"><div class="rs">Sezon adını değiştir</div><input id="rn" class="f" maxlength="24" value="${esc(st.ren.v)}" aria-label="Sezon adı" autocomplete="off"><div class="bar"><button class="btn p" data-a="rens">Kaydet</button><button class="btn" data-a="no">Vazgeç</button></div></div></div>`:st.imp?impDlg():sx?`<div class="dlg"><div class="dbox" role="dialog" aria-modal="true"><div class="rs">${esc(sx.name)} özeti</div><textarea id="sx" class="f" rows="6" readonly>${esc(sumText(sx))}</textarea><div class="bar"><button class="btn p" data-a="cp">Kopyala</button><button class="btn" data-a="no">Kapat</button></div></div></div>`:st.ask?`<div class="dlg"><div class="dbox" role="dialog" aria-modal="true"><div>${esc(st.ask.m)}</div><div class="bar">${st.ask.fn?`<button class="btn p" data-a="yes">Evet</button><button class="btn" data-a="no">Vazgeç</button>`:`<button class="btn p" data-a="no">Tamam</button>`}</div></div></div>`:st.guide?guideDlg():st.totsv?totsDlg():st.pi?plDlg():st.ti!=null?withSn(cur(),tiDlg):"";
  const s0=cur();
  {const de2=document.documentElement;let cb=null;try{cb=(s0&&s0.my!=null&&T[s0.my])?bspec(s0.my):null}catch(e){cb=null}
  if(cb&&cb.c1&&cb.c2){de2.style.setProperty("--club1",cb.c1);de2.style.setProperty("--club2",cb.c2);de2.setAttribute("data-club","1")}else{de2.removeAttribute("data-club");de2.style.removeProperty("--club1");de2.style.removeProperty("--club2")}}
  const chg=st.lt!==st.tab;st.lt=st.tab;if(st.qs&&!qOk(s0))st.qs=false;
  const fresh=st.qs&&!$("qs").firstChild,qsOnly=!!(st.qs&&!fresh&&!chg&&$("app").firstChild);
  if(!qsOnly){
    let viewHtml="";try{viewHtml=withSn(s0,()=>([setupView,teamView,drawView,groupsView,statView,histView,setView,homeView,fixtureView,tstatView][st.tab]||homeView)(s0))}catch(err){elog("render",err&&err.message,err&&err.stack);viewHtml=`<div class="big"><b class="wr">Görünüm yüklenirken hata oluştu</b><div class="note" style="margin:6px 0">${esc(err&&err.message?err.message:String(err))}</div><button class="btn p" data-t="7">Ana ekrana dön</button></div>`}
    $("app").innerHTML=(st.upd?updBan():"")+(st.sf?sfBan():"")+tabPre(st.tab)+viewHtml;
    const ap=$("app");if(chg||st.lht!==st.ht){ap.classList.remove("sw");void ap.offsetWidth;ap.classList.add("sw");clearTimeout(st.swt);st.swt=setTimeout(()=>ap.classList.remove("sw"),800)}st.lht=st.ht;
  }
  $("qs").innerHTML=st.qs?withSn(s0,()=>sheetHtml(s0,fresh)):"";st.bump=null;st.bumpUp=false;
  document.body.classList.toggle("qo",!!st.qs);
  if(chg&&!rm())document.querySelectorAll("[data-cu]").forEach(e=>{const v=+e.textContent,t0=performance.now();const f=n=>{const p=Math.min(1,(n-t0)/600);e.textContent=Math.round(v*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)});
  {const wc=st.tab==8&&document.querySelector(".wktabs .chip.on");if(wc&&wc.scrollIntoView)try{wc.scrollIntoView({inline:"center",block:"nearest"})}catch(e){}}
  const qsAfter=document.querySelector("#qs .sheet");if(qsAfter&&qsTop)qsAfter.scrollTop=qsTop;
  const tiAfter=document.querySelector("#dlg .tisheet");if(tiAfter&&tiTop)tiAfter.scrollTop=tiTop;
  if(st.isGenerating){
    const actMap={kura:"kurag",karne:"karne",mac:"mkart",kariyer:"kariyer",tots:"totsg",ko:"kog"},targetAct=actMap[st.isGenerating];
    document.querySelectorAll('[data-a="kurag"],[data-a="karne"],[data-a="mkart"],[data-a="kariyer"],[data-a="totsg"],[data-a="kog"]').forEach(btn=>{
      btn.disabled=true;
      const bid=btn.dataset.id!=null?+btn.dataset.id:null;
      if(btn.dataset.a===targetAct&&(st.genId==null||bid==null||bid===st.genId)){
        if(!btn.classList.contains("gcd"))btn.textContent=btn.dataset.a==="mkart"?"⏳":"⏳ Hazırlanıyor…";
      }
    });
  }
  const focusEl=aeId?$(aeId):null;
  if(focusEl&&document.activeElement!==focusEl){focusEl.focus();if(aeSel!=null&&typeof focusEl.setSelectionRange=="function")try{focusEl.setSelectionRange(aeSel,aeSel)}catch(e){}}}

const UI_ONLY=new Set(["stab","mexp","fxw","fxv","bkv","adv","cust","roall","vitall","sall","rstopen","sfopen","hm","grk","tropen","trclose","bkadv","madv","qs","medit","mall","qx","gofin","mg","mo","mu","mp","mpf","mpa","glsc","glas","glclr","glasclr","glasno","glasopen","tel","tpl","ht","hmod","sfm","sfr","sv","sfd","sfx","ro","dcancel","next","all","no","tinfo","pinfo","totsv","guide","gs","gsgo","tif","ren","own","owno","mman","ex","im","rcv","sum","oldlsx"]);
document.addEventListener("click",async e=>{
  const b=e.target.closest("button");if(!b)return;
  if(b.dataset.t!==undefined){hideToast();st.tab=+b.dataset.t;if(st.tab==6)refreshQuota(true);render();scrollTo(0,0);return}
  const a=b.dataset.a;if(!a)return;
  if(a=="reload"){location.reload();return}
  if(a=="tx"){hideToast();return}
  if(st.staleTab){ntfReload("Başka bir sekmede değişiklik yapıldı, veri kaybı yaşamamak için sayfayı yenileyin.");return}
  if(a!="undo")hideToast();
  const s=cur(),id=+b.dataset.id,i=+b.dataset.i,dv=b.dataset.v,dk=b.dataset.k,uiOnly=UI_ONLY.has(a);let un=null;const snap=uiOnly?null:(lastSavedRaw||JSON.stringify(store));
  if(a=="cfg"){s.cfg[dk]=+dv;if(isLg(s.cfg)&&dk=="N")s.cfg.gs=s.cfg.N;if(dk=="N"||dk=="gs")s.G=null;fixC(s.cfg)}
  else if(a=="tmpl"){const p=TPL[+dv];if(p[4]===0&&p[2]===p[3]){s.cfg.lg=1;if(!LGN.includes(s.cfg.N))s.cfg.N=p[2];s.cfg.gs=s.cfg.N;s.cfg.q=0;st.cust=true}else{delete s.cfg.lg;s.cfg.N=p[2];s.cfg.gs=p[3];s.cfg.q=p[4]}s.G=null;fixC(s.cfg)}
  else if(a=="adv")st.adv=!st.adv;
  else if(a=="cust")st.cust=!st.cust;
  else if(a=="roall")st.roall=!st.roall;
  else if(a=="vitall")st.vitall=!st.vitall;
  else if(a=="sall")st.sall=!st.sall;
  else if(a=="iosok"){store.iosok=1;st.iosWarnDismissed=true}
  else if(a=="rstopen")st.rstopen=!st.rstopen;
  else if(a=="hm"){st.hm=st.hm||nob();st.hm[dk]=!st.hm[dk]}
  else if(a=="lgchamp"){const pt=grpPts(s);s.res={st:7,pts:pt===""?null:pt,note:"",date:today()};st.cel=1;st.tab=7;un="Lig Şampiyonu olarak kaydedildi 🏆"}
  else if(a=="grk")st.grk=+dv;
  else if(a=="gqy"){s.gq=1;s.grk=st.grk||1;if(s.G&&s.my!=null){const gi=s.G.findIndex(g=>g.includes(s.my));if(gi>=0){s.gqs=s.gqs||nob();const l=(s.gqs[gi]=s.gqs[gi]||[]).filter(x=>x!==s.my);l.splice(Math.min(l.length,(s.grk||1)-1),0,s.my);s.gqs[gi]=l.slice(0,s.cfg.q||2)}}initKoBracket(s,true);st.mrd=autoStage(s);un="Gruptan "+s.grk+". sırada çıktın · eleme ağacı kuruldu"}
  else if(a=="gqn"){const pt=grpPts(s),rk=st.grk||Math.min(s.cfg.gs||4,(s.cfg.q||2)+1);ask(`Grupta ${rk}. oldun ve elendin olarak kaydedilsin mi? Grup puanın: ${pt===""?0:pt}.`,()=>{s.grk=rk;s.res={st:0,grk:rk,pts:pt===""?null:pt,note:"",date:today()};if(s.G&&s.my!=null){const gi=s.G.findIndex(g=>g.includes(s.my));if(gi>=0&&s.gqs&&s.gqs[gi])s.gqs[gi]=s.gqs[gi].filter(x=>x!==s.my)}return `Sezon kaydedildi · Grupta ${rk}. oldun ve elendin`});render();return}

  else if(a=="fxw"){st.fxw=+dv}
  else if(a=="fxv"){st.fxv=dv}
  else if(a=="bkv"){st.bkv=dv}
  else if(a=="stab"){st.stab=dv}
  else if(a=="mexp"){st.mexp=st.mexp||nob();const curOpen=(id in st.mexp)?!!st.mexp[id]:(b.dataset.def==="1");st.mexp[id]=!curOpen}
  else if(a=="simm"){ensureSim(s).m=+dv}
  else if(a=="simw"){const msg=simNextWeek(s);if(msg&&msg.startsWith("Önce")){ask(msg);render();return}un=msg}
  else if(a=="simu"){un=simUndoWeek(s)}
  else if(a=="simko"){const msg=simKoStage(s,true);if(msg&&msg.startsWith("Önce")){ask(msg);render();return}un=msg}
  else if(a=="simallko"){const msg=simKoStage(s,false);if(msg&&msg.startsWith("Önce")){ask(msg);render();return}un=msg}
  else if(a=="fintrn"){const msg=finishTournament(s);if(msg&&msg.startsWith("Turnuvayı sonlandırmak")){ask(msg);render();return}un=msg}
  else if(a=="tropen"){st.trm=st.trm==dk?null:dk;setTimeout(()=>{const el=$("trinp");if(el)el.focus()},30)}
  else if(a=="trclose")st.trm=null;
  else if(a=="tradd"){const inp=$("trinp"),v=inp?inp.value.trim().slice(0,30):"";if(!v)return;const fnd=sqFindAny(v),nm=fnd?fnd.p.n:v;getOrAddPl(s,nm);ensureMgls(st.mg||0);if(dk&&dk.startsWith("sc:")){const gi=+dk.split(":")[1];if(st.mgls[gi]){st.mgls[gi].sc=nm;st.mgls[gi].as=""}}else if(dk&&dk.startsWith("as:")){const gi=+dk.split(":")[1];if(st.mgls[gi]&&nz(st.mgls[gi].sc)!==nz(nm))st.mgls[gi].as=nm}else if(dk=="mom")st.mmom=nm;syncGlsToMaps();st.trm=null}
  else if(a=="bkadv")st.bkadv=!st.bkadv;
  else if(a=="madv"){st.madv=!st.madv}
  else if(a=="qs"){if(!qOk(s)){ask("Maç girmek için önce kurulumu, takım seçimini ve kurayı tamamla.");render();return}st.qs=true;st.med=null;st.mrd=autoStage(s);st.mg=0;st.mo=0;st.mgls=[];st.msc=nob();st.mas=nob();st.mmom="";st.mop=null;st.mlg=null;st.mu=0;st.mp=undefined;st.mpf=0;st.mpa=0;st.trm=null;st.madv=false;st.mst=defMst()}
  else if(a=="medit"){const m=s.mt.find(x=>x.id==id);if(!m)return;st.med=m.id;st.qs=true;st.mrd=m.rd;st.mop=m.opp!=null&&T[m.opp]?m.opp:ixOf(m.on);st.mlg=m.lg||null;st.mg=m.gf||0;st.mo=m.ga||0;st.mu=m.et?1:0;st.mp=m.pf!=null&&m.pa!=null?1:0;st.mpf=m.pf||0;st.mpa=m.pa||0;st.mgls=glsFromLegacy(m,m.gf||0);syncGlsToMaps();st.mmom=m.mom||"";st.trm=null;st.madv=!!m.stats;st.mst=Object.assign(defMst(),m.stats?Object.fromEntries(Object.entries(m.stats).map(([k,v])=>[k,v!=null?String(v):""])):{})}
  else if(a=="mall")st.mall=!st.mall;
  else if(a=="qx"){st.qs=false;st.med=null}
  else if(a=="gofin")st.tab=1;
  else if(a=="undo"){if(st.snap){lastSavedRaw=st.snap;store=JSON.parse(st.snap);norm();sync()}hideToast()}
  else if(a=="mg"){st.mg=Math.max(0,(st.mg||0)+ +b.dataset.d);st.bump="mg";st.bumpUp=+b.dataset.d>0;ensureMgls(st.mg)}
  else if(a=="mo"){st.mo=Math.max(0,(st.mo||0)+ +b.dataset.d);st.bump="mo";st.bumpUp=+b.dataset.d>0}
  else if(a=="mu")st.mu=st.mu?0:1;
  else if(a=="mp"){st.mp=st.mp?0:1;if(st.mp)st.mu=1}
  else if(a=="mpf")st.mpf=Math.max(0,(st.mpf||0)+ +b.dataset.d);
  else if(a=="mpa")st.mpa=Math.max(0,(st.mpa||0)+ +b.dataset.d);
  else if(a=="glsc"){const gi=+b.dataset.g,n=b.dataset.n;if(!n)return;ensureMgls(st.mg||0);if(st.mgls[gi]){st.mgls[gi].sc=n;st.mgls[gi].na=false;if(isKK(n)||nz(st.mgls[gi].as)===nz(n))st.mgls[gi].as="";syncGlsToMaps();st.trm=null}}
  else if(a=="glas"){const gi=+b.dataset.g,n=b.dataset.n;if(!n)return;ensureMgls(st.mg||0);if(st.mgls[gi]&&st.mgls[gi].sc&&!isKK(st.mgls[gi].sc)&&nz(st.mgls[gi].sc)!==nz(n)){st.mgls[gi].as=n;st.mgls[gi].na=false;syncGlsToMaps();st.trm=null}}
  else if(a=="glasno"){const gi=+b.dataset.g;ensureMgls(st.mg||0);if(st.mgls[gi]){st.mgls[gi].as="";st.mgls[gi].na=true;syncGlsToMaps();st.trm=null}}
  else if(a=="glasopen"){const gi=+b.dataset.g;ensureMgls(st.mg||0);if(st.mgls[gi]){st.mgls[gi].na=false}}
  else if(a=="glclr"){const gi=+b.dataset.g;ensureMgls(st.mg||0);if(st.mgls[gi]){st.mgls[gi]={sc:"",as:"",na:false};syncGlsToMaps()}}
  else if(a=="glasclr"){const gi=+b.dataset.g;ensureMgls(st.mg||0);if(st.mgls[gi]){st.mgls[gi].as="";st.mgls[gi].na=false;syncGlsToMaps()}}
  else if(a=="msave"){const op=st.mop;if(op==null)return;
    if(!st.med&&st.mrd==="Grup"){
      const maxGl=s.cfg.gl||1,playedVsOp=(s.mt||[]).filter(m=>m.rd==="Grup"&&m.opp===op).length;
      if(playedVsOp>=maxGl){ask(`${T[op].n} ile bu gruptaki ${maxGl} maç hakkını zaten tamamladın. Sıradaki grup rakibini seç veya mevcut maçı düzenle.`);render();return}
    }
    ensureMgls(st.mg||0);
    if(st.trm){const inp=$("trinp"),tv=inp?inp.value.trim().slice(0,30):"";if(tv){const fnd=sqFindAny(tv),nm=fnd?fnd.p.n:tv;getOrAddPl(s,nm);if(st.trm.startsWith("sc:")){const gi=+st.trm.split(":")[1];if(st.mgls[gi]){st.mgls[gi].sc=nm;st.mgls[gi].as=""}}else if(st.trm.startsWith("as:")){const gi=+st.trm.split(":")[1];if(st.mgls[gi]&&nz(st.mgls[gi].sc)!==nz(nm))st.mgls[gi].as=nm}else if(st.trm=="mom")st.mmom=nm;syncGlsToMaps()}st.trm=null}
    syncGlsToMaps();
    const isKO=st.mrd!="Grup",et=isKO&&(st.mu||st.mp)?1:0,pf=isKO&&st.mp?(st.mpf||0):null,pa=isKO&&st.mp?(st.mpa||0):null;
    const oldM=st.med?s.mt.find(x=>x.id==st.med):null;
    const csr=cleanStatsW(st.mst),mStats=csr.s;st.stwarn=csr.warns.length?csr.warns.join(" · "):null;
    const cleanGls=(st.mgls||[]).slice(0,st.mg||0).filter(g=>g&&g.sc).map(g=>({sc:g.sc,as:isKK(g.sc)?"":(g.as||"")}));
    const m={id:oldM?oldM.id:Date.now(),opp:op,on:T[op].n,rd:st.mrd,lg:legInfo(s).lg,gf:st.mg||0,ga:st.mo||0,et,pf,pa,gls:cleanGls,sc:toNob(Object.fromEntries(Object.entries(st.msc||{}).filter(e=>e[1]>0))),as:toNob(Object.fromEntries(Object.entries(st.mas||{}).filter(e=>e[1]>0))),mom:st.mmom||"",stats:mStats};
    {const pr=oldM&&oldM.pr?oldM.pr:(predict(s,op)?[predict(s,op).w,predict(s,op).d,predict(s,op).l]:null);if(pr)m.pr=pr}[...Object.keys(m.sc),...Object.keys(m.as),...(m.mom?[m.mom]:[])].forEach(n=>getOrAddPl(s,n));
    {const sqO=squadOf(op),nO=m.ga||0,old=oldM&&oldM.opp===op&&Array.isArray(oldM.og)?oldM.og.slice(0,nO):[];
      const need=nO-old.length;
      if(need>0&&sqO.length){const ix=simGoalAssign(op,need),as=simAssistsFor(op,ix);ix.forEach((v,k)=>old.push({sc:sqO[v].n,as:as[k]>=0&&sqO[as[k]]?sqO[as[k]].n:""}))}
      m.og=old;
      m.omom=m.mom?"":(pickOppMom(op,old,m.gf,m.ga)||"")}
    if(oldM)s.mt[s.mt.indexOf(oldM)]=m;else s.mt.push(m);
    const des=matchDeserve(m);
    mApply(s);syncUserMatchesToBracket(s);st.med=null;st.mg=0;st.mo=0;st.mu=0;st.mp=undefined;st.mpf=0;st.mpa=0;st.mgls=[];st.msc=nob();st.mas=nob();st.mmom="";st.mop=null;st.mlg=null;st.qs=false;st.madv=false;st.mst=defMst();un=(oldM?"Güncellendi · ":"Kaydedildi · ")+m.on+" "+mscTxt(m)+(des&&des.k!="fair"?" · "+des.t:"")+(st.stwarn?" ("+st.stwarn+")":"");st.stwarn=null;if(!oldM){const df=m.gf-m.ga,pw=pf!=null&&pa!=null&&pf>pa;st.fw=df>0?(df>=3?3:df==2?2:1):(pw?2:0)}}
  else if(a=="mdel"){const m=s.mt.find(x=>x.id==id);if(m){s.delM=Array.from(new Set([...(s.delM||[]),m.id]));s.mt=s.mt.filter(x=>x.id!=id);mApply(s);un="Maç silindi"}}
  else if(a=="kurag"){mkImg("kura",s);return}
  else if(a=="kog"){mkImg("ko",s);return}
  else if(a=="totsg"){mkImg("tots",store.seasons.find(y=>y.id==id)||s);return}
  else if(a=="totsv"){st.totsv=id}
  else if(a=="guide"){st.guide=true}
  else if(a=="karne"){mkImg("karne",store.seasons.find(y=>y.id==id)||s);return}
  else if(a=="mkart"){const q=findM(id);if(!q)return;mkImg("mac",q);return}
  else if(a=="kariyer"){mkImg("kariyer",{name:"ozet"});return}
  else if(a=="shimg"){const im=st.img;if(!im)return;
    try{const f=new File([im.blob],im.name,{type:"image/png"});if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:im.title}).catch(()=>{});return}}catch(e){}
    im.msg="Bu tarayıcı doğrudan paylaşmayı desteklemiyor. İndir düğmesini kullan ya da görsele basılı tutup kaydet.";render();return}
  else if(a=="gmode"){const m=+dv;if(m==2){s.cfg.lg=1;if(!LGN.includes(s.cfg.N))s.cfg.N=16;s.cfg.gs=s.cfg.N;s.cfg.q=0}else{delete s.cfg.lg;if(![4,8,16,32,64].includes(s.cfg.N))s.cfg.N=16;s.cfg.gs=m?(s.cfg.gs&&s.cfg.gs<s.cfg.N?s.cfg.gs:4):0;if(!s.cfg.q)s.cfg.q=2}s.G=null;fixC(s.cfg)}
  else if(a=="rl")s.rl[dk]=dv;
  else if(a=="xc"){const x=s.rl.xc,j=x.indexOf(dv);if(j<0)x.push(dv);else x.splice(j,1)}
  else if(a=="xcall")s.rl.xc=[];
  else if(a=="tel")st.te=!st.te;
  else if(a=="tpl")st.tp=!st.tp;
  else if(a=="ht")st.ht=dv;
  else if(a=="hmod")st.hmod=dv;
  else if(a=="sfm")st.sfm=dv;
  else if(a=="sfr")st.sfr=dv;
  else if(a=="sv")st.sv=dv;
  else if(a=="upchk"){st.uchk="Denetleniyor…";render();(SWR?SWR.update():Promise.reject()).then(()=>new Promise(r=>setTimeout(r,2500))).then(()=>{st.uchk=st.upd?"Yeni sürüm bulundu.":"Güncelsin.";render()}).catch(()=>{st.uchk=SWR?"Denetlenemedi, çevrimdışı olabilirsin.":"Bu tarayıcıda otomatik güncelleme yok.";render()});return}
  else if(a=="errcp"){const t=errReport(),fb=()=>{st.rep=t;render()};try{navigator.clipboard.writeText(t).then(()=>ntf("Hata raporu kopyalandı")).catch(fb)}catch(e){fb()}return}
  else if(a=="elclr"){try{localStorage.removeItem(ELK)}catch(e){}st.rep=null;render();ntf("Hata günlüğü temizlendi");return}
  else if(a=="sfd")st.sfd=dv;
  else if(a=="sfopen")st.sfopen=!st.sfopen;
  else if(a=="sfx"){st.sfm="all";st.sfr="all";st.sft="";st.sfc=""}
  else if(a=="ro")st.ro=st.ro==dv?null:dv;
  else if(a=="mot")store.motion=+dv;
  else if(a=="lock"){
    const A=avail(s);
    if(A<s.cfg.N)ask("Kurallara uyan yeterli takım yok ("+A+"/"+s.cfg.N+"). Kuralları gevşet veya takım sayısını azalt.");
    else{s.P=chooseP(s);s.sn=snapOf(s);s.dn=0;s.lk=true;s.G=null;s.my=null;st.mode=null;st.te=false;sync();st.tab=1}}
  else if(a=="unlock"){if(hasData(s)){ask("Kurulum açılırsa takım ve kura silinir. Bu sezonun "+(s.mt||[]).length+" maçı, takım istatistikleri, oyuncu listesi ve sonucu da sıfırlanır. Devam edilsin mi?",()=>doUnlock(s));render();return}un=doUnlock(s)}
  else if(a=="chteam"){if(hasData(s)){ask("Takım ve kura sıfırlanır. Bu sezonun "+(s.mt||[]).length+" maçı, takım istatistikleri, oyuncu listesi ve sonucu da silinir. Devam edilsin mi?",()=>doReset(s));render();return}un=doReset(s)}
  else if(a=="dcancel"){st.dr=null;st.k=0}
  else if(a=="new"){if(s.G){ask("Kura onaylandı. Yeniden çekmek için önce kurayı sıfırla.");render();return}st.dr=withSn(s,()=>genDraw(s,1500,1));st.k=0;if(st.dr)s.dn=(s.dn||0)+1;else ask("Bu kurallarla kura üretilemedi. Kurulumda ülke sınırını gevşetip tekrar dene.")}
  else if(a=="next"){st.k++;const q=st.dr&&st.dr.seq[st.k-1];if(q&&q[0]===s.my){try{navigator.vibrate&&navigator.vibrate([70,50,140])}catch(e){}}}
  else if(a=="all"&&st.dr)st.k=st.dr.seq.length;
  else if(a=="use"){if(!st.dr||s.G)return;s.G=st.dr.G.map(g=>g.slice());sync();st.tab=3}
  else if(a=="bal"){if(s.G){ask("Kura onaylandı. Yeniden çekmek için önce kurayı sıfırla.");render();return}const d=withSn(s,()=>genDraw(s,4000,.4,1500));if(d){s.dn=(s.dn||0)+1;s.G=d.G.map(g=>g.slice());sync();st.tab=3;un="Gruplar otomatik kuruldu"}else ask("Bu kurallarla kura üretilemedi. Kurulumda ülke sınırını gevşetip tekrar dene.")}
  else if(a=="yes"){const f=st.ask&&st.ask.fn;st.ask=null;if(f){const r=await f();if(typeof r=="string")un=r}}
  else if(a=="no"){st.ask=null;st.sum=null;clrImg();st.ren=null;st.imp=null;st.ti=null;st.pi=null;st.totsv=null;st.guide=false;st.gs=false;st.tiq=""}
  else if(a=="pinfo"){st.pi=b.dataset.n||null}
  else if(a=="tinfo"){st.ti=i;st.tif="A";st.tiq=""}
  else if(a=="gs"){st.gs=true;st.gsq="";setTimeout(()=>{const e=$("gsq");if(e)e.focus()},60)}
  else if(a=="gsgo"){st.gs=false;st.ti=i;st.tif="A";st.tiq=b.dataset.n||""}
  else if(a=="tif")st.tif=dv
  else if(a=="ren"){const x=store.seasons.find(q=>q.id==id);if(!x)return;st.ren={id:x.id,v:x.name};setTimeout(()=>{const e=$("rn");if(e){e.focus();e.select()}},30)}
  else if(a=="own"){st.own=1}
  else if(a=="owno"){st.own=0}
  else if(a=="owns"){const v=($("ow").value||"").replace(/\s+/g," ").trim().slice(0,20);if(!v){$("ow").focus();return}store.owner=v;st.own=0;un="Kayıtlar "+v+" adına"}
  else if(a=="rens"){const v=($("rn").value||"").replace(/\s+/g," ").trim().slice(0,24),x=st.ren?store.seasons.find(q=>q.id==st.ren.id):null;if(!v){$("rn").focus();return}if(x){x.name=v;un="Sezon adı değiştirildi"}st.ren=null}
  else if(a=="mman")st.mode="man";
  else if(a=="ns"){store.nx=nextNo();const n=mk(Date.now(),store.nx,s);store.seasons.push(n);store.cur=n.id;sync();st.mode=null;st.tab=7}
  else if(a=="pick"){if(tmLock(s)||st.dr){ask("Takım kilitli. Değiştirmek için önce Takımı değiştir ya da Kurayı iptal et’i kullan.");render();return}withSn(s,()=>spin(s));return}
  else if(a=="fin"){const c=+$("stg").value,p=$("pts").value,fg=$("fgrk"),prevR=s.res||{},was=prevR.st==7,lg=isLg(s.cfg),rk=c==0&&!lg&&fg?+fg.value:(s.grk||null);if(c==0&&rk)s.grk=rk;const snap=snapshotSeasonAwards(s);s.res={st:c,grk:c==0&&!lg?rk:null,pts:(c==0||lg)&&p!==""&&Number.isFinite(+p)?+p:null,ch:prevR.ch!=null?prevR.ch:(c==7?s.my:null),ru:prevR.ru!=null?prevR.ru:null,topG:prevR.topG||snap.topG,mvp:prevR.mvp||snap.mvp,tots:prevR.tots||snap.tots,note:$("note").value.trim().slice(0,200),date:today()};if(c==0){s.gq=null;if(s.G&&s.my!=null){const gi=s.G.findIndex(g=>g.includes(s.my));if(gi>=0&&s.gqs&&s.gqs[gi])s.gqs[gi]=s.gqs[gi].filter(x=>x!==s.my)}}if(c==7&&!was){st.cel=1;st.tab=7}}
  else if(a=="unfin"){s.res=null;un="Sonuç silindi"}
  else if(a=="skip"){if(st.slot&&st.slot.done)st.slot.done();return}
  else if(a=="open"){store.cur=id;sync();st.mode=null;st.tab=7}
  else if(a=="del"){const x=store.seasons.find(q=>q.id==id);if(!x)return;
    ask("“"+x.name+"” silinsin mi? "+(x.mt||[]).length+" maç ve sezonun tüm kayıtları çöp kutusuna taşınır (Ayarlar › Son silinenler).",()=>delSeason(id));render();return}
  else if(a=="theme")store.theme=dv;
  else if(a=="ex"){st.bkadv=true;store.tn=TN;store.v=4;st.bk=b64Enc(JSON.stringify(store))}
  else if(a=="cp"||a=="cpb"){const t=$(a=="cp"?"sx":"bk");t.select();if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t.value).catch(()=>{try{document.execCommand("copy")}catch(e){}})}else{try{document.execCommand("copy")}catch(e){}}if(a=="cpb"&&st.bk&&t.value==st.bk){store.lb=Date.now();store.lbm=nMatch();save()}b.textContent="Kopyalandı";return}
  else if(a=="im"){const o=parseBk($("bk").value);if(o)st.imp={o,src:"yedek kodu"};else ask("Yedek kodu geçersiz.")}
  else if(a=="exf"){exportFile();return}
  else if(a=="imfb"){const e=$("imf");if(e)e.click();return}
  else if(a=="impm"&&st.imp){const o=st.imp.o;st.imp=null;un=await mergeBk(o)}
  else if(a=="impr"&&st.imp){const o=st.imp.o;if(!(await snapKeep("fc26lig4_degisim_oncesi"))){st.imp=null;ask("Yedek yüklenmedi: mevcut kayıtlar güvenliğe alınamadı (depolama dolu olabilir). Önce Kurtarma kayıtlarını sil ya da yedek al.")}else{const th=store.theme,mo=store.motion,ow0=store.owner;st.imp=null;DROP=[];store=mig(o);if(!store.owner&&ow0)store.owner=ow0;if(store.theme===undefined&&th!==undefined)store.theme=th;if(store.motion===undefined&&mo!==undefined)store.motion=mo;const dr=[...new Set(DROP)];DROP=[];norm();sync();st.tab=7;un="Yedek yüklendi, mevcut kayıtlar değiştirildi"+(dr.length?" · "+dr.length+" takım güncel listede yok, atlandı":"")}}
  else if(a=="trs"){un=restoreSeason(id)}
  else if(a=="trse"){ask("Çöp kutusundaki tüm sezonlar kalıcı olarak silinsin mi?",()=>{store.trash=[]});render();return}
  else if(a=="rcv"){if(RCV.some(x=>x[0]==dk)){st.bk=(await kv.get(dk))||rcvGet(dk)||"";st.bkadv=true}}
  else if(a=="rcvx"){ask("Bu kayıt kalıcı olarak silinsin mi?",async()=>{await kv.del(dk);await refreshQuota(false)});render();return}
  else if(a=="oldlsx"){const leg=(typeof legacyLsInfo==="function")?legacyLsInfo():{hasLegacy:false,bytes:0};if(!leg.hasLegacy)return;ask("IndexedDB’ye geçiş sırasında güvenlik için tutulan eski localStorage kopyası ("+fmtBytes(leg.bytes)+") kalıcı olarak silinsin mi? Güncel IndexedDB verilerin bundan etkilenmez.",async()=>{const ok=await clearLegacyLs();await refreshQuota(false);return ok?"Eski localStorage kopyası temizlendi":"Temizlenemedi: IndexedDB ana kaydı doğrulanamadı"});render();return}
  else if(a=="rst"){ask("Tüm sezonlar, maçlar ve ayarlar silinecek. Önce yedek almanı öneririm. Devam edilsin mi?",()=>resetAll());render();return}
  else if(a=="sum")st.sum=id;
  else return;
  if(!uiOnly){s.ut=Date.now();save()}render();if(!uiOnly||un)flush(un,snap);if(st.cel){st.cel=0;scrollTo(0,0);confetti()}if(st.fw){const f=st.fw;st.fw=0;fireworks(f)}if(a=="gofin"){const e=$("fincard");if(e)e.scrollIntoView({block:"start"})}
  if(a=="next"){try{const e=document.querySelector(".card.hl");if(e&&e.scrollIntoView)e.scrollIntoView({block:"center",behavior:rm()?"auto":"smooth"})}catch(x){}}});
document.addEventListener("change",e=>{
  if(st.staleTab){ntfReload("Başka bir sekmede değişiklik yapıldı, veri kaybı yaşamamak için sayfayı yenileyin.");return}
  hideToast();
  const d=e.target.dataset,v=e.target.value;
  if(d.rs){cur().rl[d.rs]=+v;save();render()}
  else if(d.sg){const s=cur();s.oy=s.oy?toNob(s.oy):Object.assign(nob(),{d:"",h:"",c:""});s.oy[d.sg]=v;save();render()}
  else if(e.target.id=="df"){store.diff=+v;save();render()}
  else if(e.target.id=="sft"){st.sft=v;render()}
  else if(e.target.id=="sfc"){st.sfc=v;render()}
  else if(e.target.id=="ca"){st.ca=+v;render()}
  else if(e.target.id=="cb"){st.cb=+v;render()}
  else if(e.target.id=="ss"){store.cur=+e.target.value;sync();st.mode=null;save();render()}
  else if(e.target.id=="mt"){if(tmLock(cur())||st.dr)return;if(e.target.value!==""){cur().my=+e.target.value;st.mode="man";save();render()}}
  else if(d.glsc!==undefined){const gi=+d.glsc;if(v){ensureMgls(st.mg||0);if(st.mgls[gi]){st.mgls[gi].sc=v;if(isKK(v)||nz(st.mgls[gi].as)===nz(v))st.mgls[gi].as="";syncGlsToMaps();st.trm=null}}render()}
  else if(d.glas!==undefined){const gi=+d.glas;if(v){ensureMgls(st.mg||0);if(st.mgls[gi]&&st.mgls[gi].sc&&!isKK(st.mgls[gi].sc)&&nz(st.mgls[gi].sc)!==nz(v)){st.mgls[gi].as=v;syncGlsToMaps();st.trm=null}}render()}
  else if(e.target.id=="mmom"){st.mmom=v;render()}
  else if(e.target.id=="trtm"){st.trtm=+v;render()}
  else if(e.target.id=="trpl"){if(v){const s=cur(),kind=d.k||"";getOrAddPl(s,v);ensureMgls(st.mg||0);if(kind.startsWith("sc:")){const gi=+kind.split(":")[1];if(st.mgls[gi]){st.mgls[gi].sc=v;st.mgls[gi].as=""}}else if(kind.startsWith("as:")){const gi=+kind.split(":")[1];if(st.mgls[gi]&&nz(st.mgls[gi].sc)!==nz(v))st.mgls[gi].as=v}else if(kind=="mom")st.mmom=v;syncGlsToMaps();st.trm=null;s.ut=Date.now();save()}render()}
  else if(e.target.id=="mop"){st.mop=+v;st.mlg=null;render()}
  else if(e.target.id=="mrd"){st.mrd=v;st.mlg=null;st.mu=0;st.mp=undefined;render()}
  else if(e.target.id=="mlg"){st.mlg=+v;render()}
  else if(e.target.id=="imf"){const f=e.target.files&&e.target.files[0];e.target.value="";if(f)readImp(f)}
  else if(e.target.id=="stg")$("ptw").style.display=(e.target.value=="0"||isLg(cur().cfg))?"block":"none";flush()});
/* ---------- YENİ: SÜRÜM, HATA RAPORU, OYUN AYARLARI, REKABET, MAÇ KARTI, ARAMA ---------- */
function errReport(){const S=store.seasons,nm=S.reduce((a,x)=>a+(x.mt||[]).length,0),L=elogGet().slice().reverse();let sz="?";try{sz=Math.round(JSON.stringify(store).length/1024)+" KB"}catch(e){}const bm=(typeof kv!=="undefined"&&kv.mode)?kv.mode():"?";
  return ["FC 27 Grup Ligi · hata raporu","Sürüm: "+VER+" ("+bm+")","Tarih: "+new Date().toISOString(),"Tarayıcı: "+navigator.userAgent,"Ekran: "+innerWidth+"x"+innerHeight+(matchMedia("(display-mode: standalone)").matches?" · kurulu uygulama":""),"Sezon: "+S.length+" · maç: "+nm+" · kayıt boyutu: "+sz,"Sekme: "+st.tab+(st.sf?" · kayıt hatası var":"")+(loadWarn?" · açılış uyarısı: "+loadWarn.slice(0,120):""),"","Son hatalar ("+L.length+"):"].concat(L.length?L.map(o=>"- "+new Date(o.t).toISOString().slice(0,19)+" ["+o.k+"] "+o.m+(o.w?" @ "+o.w:"")):["(kayıtlı hata yok)"]).join("\n")}
const updBan=()=>`<div class="big" role="status" style="text-align:left"><b>Yeni sürüm var</b><div class="note" style="margin:4px 0 8px">Uygulama güncellendi. Yenileyince yeni sürümü kullanırsın, verilerin korunur.</div><button class="btn p" data-a="reload">Yenile</button></div>`;
const appCard=()=>{const n=elogGet().length;
  return psetCard("app","emr","Uygulama","Sürüm ve profil bilgileri","v"+VER,
    `<div class="pset-row"><div><span class="pset-rl">Kayıt Sahibi</span><b>${esc(store.owner||"Belirtilmedi")}</b></div><button class="chip" data-a="own" style="min-height:36px">Değiştir</button></div>`+
    `<div class="note" style="margin:8px 0 10px">${st.upd?"Yeni sürüm hazır, yenileyince kullanılır.":esc(st.uchk||"Güncellemeler açılışta kendiliğinden denetlenir.")}</div>`+
    `<button class="btn${st.upd?" p pset-pri":" pset-sec"}" data-a="${st.upd?"reload":"upchk"}" style="width:100%">${st.upd?"Yeni Sürümü Yükle (Yenile)":"Güncellemeyi Denetle"}</button>`
  )
  +psetCard("bug",n?"org":"emr","Hata Raporu","Tanılama günlüğü",n?`${n} hata`:"Temiz",
    `<div class="note" style="margin:0 0 10px">${n?n+" hata kaydedildi.":"Kayıtlı hata yok."} Sorun yaşarsan raporu kopyalayıp paylaşabilirsin; sezon ve maç verilerin rapora girmez.</div>`+
    `<div class="bar" style="margin:0"><button class="btn pset-sec" data-a="errcp" style="flex:1">Hata Raporunu Kopyala</button>${n?`<button class="btn" data-a="elclr">Temizle</button>`:""}</div>`+
    `${st.rep?`<textarea id="rp" class="f" rows="6" readonly>${esc(st.rep)}</textarea><div class="note">Otomatik kopyalanamadı. Metni seçip kopyala.</div>`:""}`
  )};

/* Oyun ayarları: zorluk, yarı süresi, kontrol (sezon başına) */
const OYD=["Acemi","Amatör","Yarı Profesyonel","Profesyonel","Dünya Klasmanı","Efsane","Ultimate"],OYH=["4","5","6","8","10","12","15","20"],OYC=["Klasik","Alternatif","Diğer"];
const oyOf=x=>(x&&x.oy)||{},oyTxt=x=>{const o=oyOf(x);return [o.d,o.h?o.h+" dk":"",o.c].filter(Boolean).join(" · ")};
function oyCard(s){const o=oyOf(s),op=a=>[["","Seçilmedi"]].concat(a.map(v=>[v,v]));
  return cd(`Oyun ayarları<small>${esc(s.name)}</small>`,`<div class="note" style="margin:0 0 6px">Zorluk, yarı süresi ve kontrol sonuçları etkiler. İstatistikleri zorluğa göre süzebilirsin.</div>`+rrow("Zorluk",sel("sg","d",op(OYD),o.d||""))+rrow("Yarı süresi",sel("sg","h",[["","Seçilmedi"]].concat(OYH.map(v=>[v,v+" dk"])),o.h||""))+rrow("Kontrol",sel("sg","c",op(OYC),o.c||"")))}
const dOf=e=>oyOf(e.x).d||"—";
function oyFilter(A0,fd){if(!A0.some(e=>oyOf(e.x).d))return "";const set=[...new Set(A0.map(dOf))];
  return cd("Zorluğa göre süz",`<div class="cw" style="margin:0">${[["","Tümü"]].concat(set.map(v=>[v,v=="—"?"Seçilmedi":v])).map(([v,l])=>`<button class="chip ${fd==v?"on":""}" data-a="sfd" data-v="${esc(v)}">${esc(l)}</button>`).join("")}</div>`)}
function oyDiff(A0){const set=[...new Set(A0.map(dOf))].filter(v=>v!="—");if(set.length<2)return "";
  return cd("Zorluğa göre başarı",set.sort((a,b)=>OYD.indexOf(a)-OYD.indexOf(b)).map(d=>{const o=tally(A0.filter(e=>dOf(e)==d).map(e=>e.m));return `<div class="mstg"><div class="mstt"><b>${esc(d)}</b><span class="lb">${o.n} maç · ${gbmT(o)} · %${Math.round(o.w/o.n*100)}</span></div>${sbar(o)}</div>`}).join("")+`<div class="note">Aynı takımla farklı zorlukta galibiyet oranın nasıl değişiyor, buradan görebilirsin.</div>`)}

/* Rekabet: seri, eleyen, intikam */
function rivBlk(o){const L=o.m.map(q=>q.m),n=L.length;if(!n)return "";let cw=0,cl=0,bw=0,bl=0;
  L.forEach(m=>{const r=mres(m);cw=r=="w"?cw+1:0;cl=r=="l"?cl+1:0;bw=Math.max(bw,cw);bl=Math.max(bl,cl)});
  const last=L[n-1],prev=L[n-2],el=(elimData().find(e=>e[0]==o.n)||[0,0])[1];
  const pills=[`<span class="dnam${cw?" pos":cl?" neg":""}"><b>${cw?cw+"G":cl?cl+"M":"1B"}</b><em>Aktif Seri</em></span>`];
  if(bw>=2)pills.push(`<span class="dnam pos"><b>${bw}</b><em>En Uzun G</em></span>`);
  if(bl>=2)pills.push(`<span class="dnam neg"><b>${bl}</b><em>En Uzun M</em></span>`);
  if(el)pills.push(`<span class="dnam neg"><b>${el}×</b><em>Eledi</em></span>`);
  let note="";
  if(mres(last)=="l")note=`<div class="podt-nt wr"><b>İntikam zamanı:</b> son maçı ${last.gf}–${last.ga} kaybettin${el?`, üstelik seni ${el} kez elemiş`:""}.</div>`;
  else if(prev&&mres(prev)=="l"&&mres(last)=="w")note=`<div class="podt-nt emr"><b>İntikamı aldın:</b> önceki maçı ${prev.gf}–${prev.ga} kaybetmiştin, sonra yendin.</div>`;
  return `<div class="dnamets" style="margin:0 0 8px">${pills.join("")}</div>${note}`}
function revCard(L){const R=L.filter(o=>mres(o.m[o.m.length-1].m)=="l").sort((a,b)=>b.m[b.m.length-1].m.id-a.m[a.m.length-1].m.id).slice(0,5);if(!R.length)return "";
  const rows=R.map(o=>{const l=o.m[o.m.length-1].m,ti=T.findIndex(t=>t.n==o.n),el=(elimData().find(e=>e[0]==o.n)||[0,0])[1];
    return `<button class="rev-r" data-a="ro" data-v="${esc(o.n)}">${ti>=0?`${fl(T[ti].c)}${badge(ti,26)}`:""}<span class="rev-nm"><b>${esc(o.n)}</b><small>${esc(l.rd)}${el?` · seni ${el} kez eledi`:""}</small></span><span class="rec-sc l">${l.gf}–${l.ga}</span></button>`}).join("");
  return psetCard("flame","dgr","İntikam Listesi","Son maçını kaybettiğin rakipler",`${R.length} hedef`, `<div class="rev-list">${rows}</div>`)}

/* Global arama */
let PIX=null,TIX=null;
const pidx=()=>PIX||(PIX=T.flatMap((t,i)=>squadOf(i).map(p=>({i,p,k:nz(p.n)}))));
const tidx=()=>TIX||(TIX=T.map((t,i)=>({i,k:nz(t.n+" "+CN[t.c][0])})));
function gsRes(q){const w=nz(q).split(/\s+/).filter(Boolean);
  if(!w.length)return `<div class="note">Takım adı, ülke ya da oyuncu adı yaz. Örnek: “osimhen”, “napoli”, “türkiye”.</div>`;
  const ok=k=>w.every(x=>k.includes(x)),tm=tidx().filter(o=>ok(o.k)).slice(0,8),pl=pidx().filter(o=>ok(o.k)).sort((a,b)=>b.p.o-a.p.o).slice(0,25);
  if(!tm.length&&!pl.length)return `<div class="note">“${esc(q)}” için sonuç yok.</div>`;
  return (tm.length?`<div class="rt">Takımlar <small>${tm.length}</small></div>`+tm.map(o=>`<button class="row tb" data-a="gsgo" data-i="${o.i}"><span class="cc">${fl(T[o.i].c)}</span><span class="n">${esc(T[o.i].n)}</span>${rb(T[o.i].g)}</button>`).join(""):"")
   +(pl.length?`<div class="rt">Oyuncular <small>${pl.length}</small></div>`+pl.map(o=>`<button class="row tb" data-a="gsgo" data-i="${o.i}" data-n="${esc(o.p.n)}"><span class="cc">${fl(T[o.i].c)}</span><span class="n">${esc(o.p.n)} <small class="pm">${o.p.p}</small></span><span class="lb">${esc(T[o.i].n)}</span>${rb(o.p.o)}</button>`).join(""):"")}
function guideDlg(){
  const sec=(ttl,body,open)=>`<details class="xgl gsec"${open?" open":""}><summary>${ttl}</summary><div class="gbody">${body}</div></details>`;
  return `<div class="dlg ti"><button class="tibk" data-a="no" aria-label="Kapat"></button><div class="dbox tisheet" role="dialog" aria-modal="true" aria-label="Kullanım Kılavuzu">`+
    `<div class="tots-dlg-hd"><div><b>FC 27 Lig · Kullanım Kılavuzu</b><small>Sürüm v${VER} · Çevrimdışı Hızlı Rehber</small></div><button class="mb sc-ic" data-a="no" aria-label="Kapat">✕</button></div>`+
    sec("1. Hızlı Başlangıç (5 Adım)",
      `<ol class="glist"><li><b>Kurulum:</b> Hazır şablonlardan (Dünya Kupası, Klasik 64, Mini Lig, Direkt Eleme, Lig) birini seç veya gelişmiş kurallarla özelleştirip onayla.</li><li><b>Takım Seçimi:</b> Rastgele çekiliş (son 3 sezon tekrarsız) veya manuel seçimle kulübünü belirle.</li><li><b>Kura:</b> Torbalı veya rastgele kurayı tek tek çek ya da en dengeli kurayı otomatik kur.</li><li><b>Oyna:</b> <i>Turnuva › Gruplar</i> ekranındaki Maç Merkezinden skorlarını gir ve haftaları simüle et.</li><li><b>Bitir:</b> Turnuva bittiğinde <b>Turnuvayı Sonlandır</b> ile şampiyonu, MVP’yi ve En İyi 11’i arşive kaydet.</li></ol>`,true)+
    sec("2. Simülasyon & Eleme Ağacı",
      `<ul class="glist"><li><b>3 Simülasyon Modu:</b> <i>Gerçekçi</i> (gerçek futbol skorları ve İlk 11/kaleci etkisi), <i>Dengeli</i> ve <i>Sürprizli</i>.</li><li><b>Haftalık İlerleme:</b> Kendi hafta maçını girdikten sonra <b>Haftayı Simüle Et</b> açılır; hata yaparsan <b>↩ Geri Al</b> ile son haftayı geri alabilirsin.</li><li><b>Eleme Ağacı:</b> Gruplar bitince çapraz eşleşmeler otomatik kurulur. Elensen bile <b>Finale Kadar Simüle Et</b> ile turnuvanın şampiyonunu görebilirsin.</li><li><b>Görünüm:</b> <i>Ağaç Görünümü</i> yatay kaydırılabilir diyagram sunar; gol/asist detayları için <i>Detaylı Liste</i>’ye geçebilirsin.</li></ul>`)+
    sec("3. Maç Girişi & Gelişmiş Analitik",
      `<ul class="glist"><li><b>Gol & Asist:</b> Her gol için golcüyü ve isteğe bağlı asistçiyi seç; rakibin kendi kalesine golü için <b>KK</b> kullan.</li><li><b>5 Altın Veri (Opsiyonel):</b> Topla Oynama, Toplam/İsabetli Şut, Pas İsabeti ve xG girerek <b>xG/xPts</b>, <b>Hak Ediş</b> ve <b>Taktiksel DNA</b> radarını aç.</li><li><b>Otomatik MOTM:</b> Kendi takımından Maçın Adamı seçmezsen sistem rakipten en etkili oyuncuyu otomatik belirler.</li></ul>`)+
    sec("4. Paylaşılabilir PNG Posterler (6 Tür)",
      `<ul class="glist"><li><b>Kura / Lig Tablosu:</b> <i>Turnuva › Gruplar</i> ekranından.</li><li><b>Eleme Ağacı (Bracket):</b> <i>Turnuva › Fikstür › Eleme Ağacı</i> altından.</li><li><b>Turnuvanın En İyi 11’i (TOTS):</b> <i>Turnuva › İstatistik</i> veya <i>Geçmiş › Sezonlar</i> arşivinden.</li><li><b>Maç Kartı:</b> <i>İstat. › Maçlar</i> içindeki her maçın görsel ikonundan.</li><li><b>Sezon Karnesi & Kariyer Özeti:</b> <i>Takımım</i> veya <i>Geçmiş</i> ekranlarından.</li></ul>`)+
    sec("5. Kadro, Oyuncu Profili & Arama",
      `<ul class="glist"><li><b>Kadro İnceleme:</b> Uygulamadaki herhangi bir takım adına dokunarak İlk 11, yedekler, mevki rozetleri ve sezon gol/asist sayılarını görebilirsin.</li><li><b>Oyuncu Profili:</b> <i>Sezon Ödülleri</i>, <i>Kariyer Yıldızları</i> ve <i>TOTS</i> kartlarında kendi oyuncularına dokunarak kariyer grafiği, en çok gol attığı rakipler ve asist partnerlerini incele.</li><li><b>Global Arama:</b> Sağ üstteki büyüteçten 108 kulüp ve 3.200+ oyuncu içinde anında ara.</li></ul>`)+
    sec("6. Yedekleme & Telefon Kurulumu (PWA)",
      `<ul class="glist"><li><b>Ana Ekrana Ekle:</b> iOS Safari’de <i>Paylaş › Ana Ekrana Ekle</i>, Android Chrome’da <i>Uygulamayı Yükle</i> ile tam ekran yerel uygulama deneyimi ve 7 günlük veri silinmesine karşı koruma sağla.</li><li><b>Kısayollar:</b> Ana ekrandaki uygulama ikonuna uzun basarak <i>Maç Merkezi</i>, <i>İstatistikler</i> veya <i>Yeni Sezon</i>’a doğrudan geç.</li><li><b>Yedekleme:</b> Tüm veriler cihazında (IndexedDB) tutulur. <i>Ayarlar › Yedeği İndir</i> ile düzenli JSON yedeği al; başka cihazda <i>Birleştir</i> seçeneğiyle güvenle eşitle.</li></ul>`)+
    `<div class="bar" style="margin:12px 0 0"><button class="btn p" data-a="no" style="flex:1">Kapat</button></div>`+
  `</div></div>`;
}
const gsDlg=()=>`<div class="dlg ti"><button class="tibk" data-a="no" aria-label="Kapat"></button><div class="dbox tisheet" role="dialog" aria-modal="true" aria-label="Ara"><input id="gsq" class="f" type="search" placeholder="Oyuncu veya takım ara" value="${esc(st.gsq||"")}" autocomplete="off" aria-label="Oyuncu veya takım ara"><div id="gsr">${gsRes(st.gsq||"")}</div><div class="bar"><button class="btn p" data-a="no" style="flex:1">Kapat</button></div></div></div>`;
document.addEventListener("input",e=>{const t=e.target,mk=t.dataset&&t.dataset.mst;
  if(mk){
    st.mst=st.mst||defMst();st.mst[mk]=t.value;
    if(mk=="myPos"||mk=="oppPos"){
      const n=parseInt(t.value);
      if(Number.isFinite(n)&&n>=0&&n<=100){
        const ok=mk=="myPos"?"oppPos":"myPos",comp=String(100-n);
        st.mst[ok]=comp;const oe=$("mst_"+ok);if(oe)oe.value=comp;
      }
    }
  }
  else if(t.id=="gsq"){st.gsq=t.value;const r=$("gsr");if(r)r.innerHTML=gsRes(t.value)}
  else if(t.id=="tiq"){st.tiq=t.value;const b=$("tiL");if(b&&st.ti!=null)b.innerHTML=tiBody(st.ti)}});

// --- Başlatma (v18.2): IndexedDB arka ucu, taşıma doğrulaması, yazma kuyruğu ve kota ---
async function initApp(){
  loadWarn="";store=null;DROP=[];
  const stInfo=(typeof kv.init==="function")?await kv.init():{mode:"ls",warn:""};
  await rcvRefresh();
  const r4=await kv.get("fc26lig4");
  if(r4){
    try{const o=JSON.parse(r4);if(!okS(o))throw 0;store=mig(o)}
    catch(e){
      store=null;
      const oldBz=await kv.get("fc26lig4_bozuk");
      const savedOk=(oldBz===r4)||await kv.set("fc26lig4_bozuk",r4);
      loadWarn=savedOk?"Kayıtlı veri okunamadı. Ham veri silinmedi, Ayarlar › Kurtarma bölümünde saklanıyor. Şimdilik boş bir sezonla başlandı.":"Kayıtlı veri okunamadı ve ham veri saklanamadı (depolama dolu olabilir). Boş bir sezonla başlandı.";
    }
  }else if(r4===null&&typeof hadMainReadFailure==="function"&&hadMainReadFailure()){
    st.readFail=true; // kayıt var olabilir ama okunamadı: hiçbir şey yazma
  }else if(r4===null){
    const r3=await kv.get("fc26lig3");
    if(r3){try{const o=JSON.parse(r3);if(okS(o))store=mig(o)}catch(e){}}
  }
  if(!store){
    store={v:4,tn:TN,cur:1,nx:1,seasons:[mk(1,1)]};
    try{const th=localStorage.getItem("fc26lig4_theme"),mo=localStorage.getItem("fc26lig4_motion");if(th)store.theme=th;if(mo!==null&&mo!=="")store.motion=+mo}catch(e){}
  }
  norm();sync();
  st.tab=7;
  const hsh=location.hash;
  if(hsh=="#kura")st.tab=2;
  else if(hsh=="#gruplar")st.tab=3;
  else if(hsh=="#istat")st.tab=4;
  else if(hsh=="#mac"){st.tab=7;st.qs=true}
  else if(hsh=="#yenisezon"){
    const prevS=cur();store.nx=nextNo();
    const ns=mk(Date.now(),store.nx,prevS);
    store.seasons.push(ns);store.cur=ns.id;sync();st.mode=null;st.tab=0;
    try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}
  }
  if(DROP.length){
    if(r4&&(await kv.get("fc26lig4_liste_oncesi"))===null)await kv.set("fc26lig4_liste_oncesi",r4);
    if(!loadWarn)loadWarn="Takım listesi güncellendi. Şu takımlar listede olmadığı için eski sezonlardan çıkarıldı: "+[...new Set(DROP)].join(", ")+".";
    DROP=[];
  }
  if(!store.owner)st.own=1;
  await save(true);
  await refreshQuota(false);
  if(st.readFail){render();ntfReload("Kayıtlı verine şu an erişilemedi. Verilerin silinmedi; hiçbir şey kaydedilmiyor. Sayfayı yenileyip tekrar dene.");return}
  if(loadWarn)ask(loadWarn);
  else if(stInfo&&stInfo.warn)ntf(stInfo.warn);
  render();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initApp);
else initApp();


// --- Çoklu sekme Race Condition koruması (BroadcastChannel + storage event yedekli) ---
function markStaleTab(){
  if(st.staleTab)return;
  st.staleTab=true;
  ntfReload("Başka bir sekmede değişiklik yapıldı, veri kaybı yaşamamak için sayfayı yenileyin.");
}
if(typeof setRemoteUpdateCallback==="function"){
  setRemoteUpdateCallback(()=>markStaleTab());
}
window.addEventListener("storage",e=>{
  if(e.key==="fc26lig4"&&e.newValue&&e.newValue!==e.oldValue){
    markStaleTab();
  }
});
// --- PWA: service worker kaydı + kalıcı depolama isteği ---
if("serviceWorker" in navigator){const had=!!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener("controllerchange",()=>{if(had&&!st.upd){st.upd=true;render()}});
  navigator.serviceWorker.addEventListener("message",e=>{if(had&&e.data&&e.data.type==="SW_UPDATED"&&!st.upd){st.upd=true;render()}});
  addEventListener("load",()=>{navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).then(r=>{SWR=r;r.update().catch(()=>{})}).catch(e=>elog("sw",e&&e.message))});
  document.addEventListener("visibilitychange",()=>{if(!document.hidden&&SWR)SWR.update().catch(()=>{})})}
try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().then(ok=>{st.pers=!!ok;if(!ok)render()}).catch(()=>{})}catch(e){}
// --- Mobil yakınlaştırma (iki parmak / pinch-zoom) koruması (v19.3) ---
(function(){
  const noPinch=e=>{if(e.cancelable)e.preventDefault()};
  document.addEventListener("gesturestart",noPinch,{passive:false});
  document.addEventListener("gesturechange",noPinch,{passive:false});
  document.addEventListener("gestureend",noPinch,{passive:false});
  document.addEventListener("touchstart",e=>{if(e.touches&&e.touches.length>1&&e.cancelable)e.preventDefault()},{passive:false});
  document.addEventListener("touchmove",e=>{if(e.touches&&e.touches.length>1&&e.cancelable)e.preventDefault()},{passive:false});
})();
// --- Dinamik PWA theme-color (v20.0) ---
function syncThemeColor(){
  try{
    const dark=store.theme==="dark"||(!store.theme&&typeof matchMedia==="function"&&matchMedia("(prefers-color-scheme:dark)").matches);
    const m=document.querySelector('meta[name="theme-color"]');
    if(m)m.setAttribute("content",dark?"#0b1622":"#2f8f5b");
  }catch(e){}
}
try{
  if(typeof matchMedia==="function"){
    const mq=matchMedia("(prefers-color-scheme:dark)");
    if(mq.addEventListener)mq.addEventListener("change",syncThemeColor);
  }
}catch(e){}

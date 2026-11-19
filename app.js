/* ---------- SÜRÜM VE HATA GÜNLÜĞÜ ---------- */
const VER="18.40",ELK="fc26lig4_log";const nob=()=>Object.create(null);let SWR=null;
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
const SIM_PWC=nob();
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
  const tm=ti=>TM[ti]=TM[ti]||{ti,o:0,w:0,d:0,l:0,gf:0,ga:0};
  const addM=(t1,t2,g1,g2,rd)=>{
    if(!T[t1]||!T[t2]||!Number.isFinite(g1)||!Number.isFinite(g2))return;
    const a=tm(t1),b=tm(t2);a.o++;b.o++;a.gf+=g1;a.ga+=g2;b.gf+=g2;b.ga+=g1;
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
  const topS=tourneyTopScorers(s,1)[0]||null;
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
    note:s.res&&s.res.note?s.res.note:autoNote.slice(0,200),
    date:today()
  };
  pruneSimDetails(s);
  if(out.st===7&&!wasChamp){st.cel=1;st.tab=7}
  else st.tab=7;
  return `Turnuva sonlandırıldı! 🏆 Şampiyon: ${T[out.ch].n}`}

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
  const rdBlocks=RDs.filter(rd=>Array.isArray(ko[rd])&&ko[rd].length).map(rd=>{
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
  return `<div class="card" style="margin-bottom:10px"><h3>🏆 Eleme Ağacı (Bracket)<small>${out&&out.done?`Şampiyon: ${esc(T[out.ch].n)}`:(userElim?"Elendin · Turnuva devam ediyor":koPath(s.cfg))}</small></h3>${simBtns}${rdBlocks}</div>`}

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
    if(s.res&&typeof s.res=="object"){if(s.res.ch!=null)s.res.ch=m2(s.res.ch);if(s.res.ru!=null)s.res.ru=m2(s.res.ru);if(s.res.topG&&s.res.topG.ti!=null)s.res.topG.ti=m2(s.res.topG.ti)}
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
const sync=()=>{st.ti=null;st.dr=null;st.k=0;st.mg=0;st.mo=0;st.mu=0;st.mp=0;st.mpf=0;st.mpa=0;st.mgls=[];st.msc=nob();st.mas=nob();st.mmom="";st.mop=null;st.mlg=null;st.qs=false;st.trm=null;st.fxw=0;st.med=null;st.mall=false;st.sall=false;st.madv=false;st.isGenerating=false;st.mst=defMst();st.mexp=nob();if(!st.stab)st.stab="m"};
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
const cd=(t,b)=>`<div class="card" style="margin-top:10px"><h3>${t}</h3>${b}</div>`;
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
function expSt(r,c){r=Math.ceil(r);if(r<=1)return 7;if(r==2)return 6;if(isLg(c))return r==3?5:r<=Math.ceil(c.N/2)?4:0;if(c.gs&&r>adv(c))return 0;let t=1;while(t<r)t*=2;return RKM[t]!==undefined?RKM[t]:0}
function xpData(mode){return store.seasons.filter(x=>(!mode||mode=="all"||(mode=="lg"?isLg(x.cfg):!isLg(x.cfg)))&&x.res&&x.my!=null&&T[x.my]&&x.cfg&&x.P&&x.P.length>=4&&x.P.includes(x.my)).map(x=>withSn(x,()=>{
  const m=V(T[x.my]),gt=x.P.filter(i=>V(T[i])>m).length,eq=x.P.filter(i=>V(T[i])==m).length,r=1+gt+(eq-1)/2,N=x.P.length;
  const rk=resRanks(x.cfg),pos=v=>{let i=-1;rk.forEach((q,j)=>{if(q<=v)i=j});return i},ex=expSt(r,x.cfg),ac=x.res.st;
  return{x,r:Math.ceil(r),N,g:T[x.my].g,p:N>1?(Math.ceil(r)-1)/(N-1):0,ex,ac,d:pos(ac)-pos(ex)}}))}
const dc=d=>d>0?"p":d<0?"n":"z";
function xpCard(mode){const D=xpData(mode);
  if(!D.length)return cd("Beklenene göre performans",emp("Seçili kategoride takım ve kura seçilmiş, sonucu girilmiş sezonlar burada beklentiyle karşılaştırılır."));
  const tot=D.reduce((a,o)=>a+o.d,0),up=D.filter(o=>o.d>0).length,dn=D.filter(o=>o.d<0).length;
  const rows=D.slice().reverse().slice(0,10).map(o=>{const lg=isLg(o.x.cfg),uLbl=lg?"kademe":"tur";return `<div class="xpr"><div class="xpt"><b>${esc(o.x.name)} · ${esc(T[o.x.my].n)}</b><span class="xpd ${dc(o.d)}">${o.d?dI(o.d)+" "+uLbl:"beklenen"}</span></div><div class="xps">Güç ${o.g} · ${o.r}./${o.N} · beklenen: ${esc(stTxt(o.x.cfg,o.ex).trim())} → ulaşılan: ${esc(rlb(o.x.res,o.x.cfg,o.x.grk).split(" · ")[0].trim())}</div></div>`}).join("");
  return cd("Beklenene göre performans",`<div class="mtl"><div><b>${dI(tot)}</b><span>toplam fark</span></div><div><b>${up}</b><span>beklentinin üstü</span></div><div><b>${dn}</b><span>beklentinin altı</span></div></div>`+rows+`<div class="note">Beklenen derece, takımının o sezonki rakipler arasındaki güç sırasından çıkar (1. şampiyon, 2. ikinci/finalist vb.).</div>`)}
function powerCard(mode){const D=xpData(mode);if(D.length<2)return "";
  const gs=D.map(o=>o.g),g0=Math.min(...gs)-1,g1=Math.max(...gs)+1,gw=Math.max(4,g1-g0),X=g=>36+(g-g0)/gw*252,Y=v=>140-v/7*128,seen=nob();
  const LRS={0:"Alt",4:"Orta",5:"3.",6:"2.",7:"Şamp."},gKeys=mode=="lg"?[0,4,5,6,7]:[0,3,4,5,6,7],grid=gKeys.map(v=>`<line class="gl" x1="30" x2="294" y1="${Y(v)}" y2="${Y(v)}"/><text x="2" y="${Y(v)+3}">${mode=="lg"?(LRS[v]||RS[v]):RS[v]}</text>`).join("");
  const pts=D.map(o=>{const k=o.g+"_"+o.ac,j=seen[k]=(seen[k]||0)+1;return `<circle class="${dc(o.d)}" cx="${(X(o.g)+(j-1)*9).toFixed(1)}" cy="${Y(o.ac).toFixed(1)}" r="5.5" style="stroke:var(--card)" stroke-width="1.5"><title>${esc(o.x.name)} · ${esc(T[o.x.my].n)} · güç ${o.g} · ${esc(stTxt(o.x.cfg,o.ac).trim())}</title></circle>`}).join("");
  const xt=[g0+1,Math.round((g0+g1)/2),g1-1].map(g=>`<text x="${X(g).toFixed(1)}" y="158" text-anchor="middle">${g}</text>`).join("");
  const sc=`<svg class="scp" viewBox="0 0 300 164" style="width:100%" role="img" aria-label="Takım gücüne göre ulaşılan derece">${grid}${pts}${xt}</svg><div class="note" style="margin:0 0 6px">Yatay: takımın genel gücü. Dikey: ulaştığın derece. Yeşil beklentinin üstü, kırmızı altı, gri beklenen.</div>`;
  const grp=[["Güçlü takım","ilk üçte biri",o=>o.p<1/3],["Orta takım","orta üçte biri",o=>o.p>=1/3&&o.p<2/3],["Zayıf takım","son üçte biri",o=>o.p>=2/3]];
  const av=L=>L.reduce((a,o)=>a+o.d,0)/L.length,rs=grp.map(([t,sb,f])=>{const L=D.filter(f);return L.length?`<div class="row"><span class="n">${t}<span class="lb"> · ${sb}</span></span><span class="lb">${L.length} sezon · güç ${(L.reduce((a,o)=>a+o.g,0)/L.length).toFixed(0)} · ${L.filter(o=>o.ac==7).length} şamp.</span><b>${d1(av(L))}</b></div>`:""}).join("");
  const st_=D.filter(grp[0][2]),wk=D.filter(grp[2][2]);let tip="Daha net bir yorum için güçlü ve zayıf takımlarla en az 2’şer sezon gerekir.";
  if(st_.length>=2&&wk.length>=2){const df=av(wk)-av(st_);tip=df>=.5?"Zayıf takımla daha iyi oynuyorsun: beklentinin ortalama "+d1(av(wk))+" kademe üstündesin.":df<=-.5?"Güçlü takımla daha iyi oynuyorsun, zayıf takımda beklentinin altında kalıyorsun.":"Takım gücü ne olursa olsun beklentiyle uyumlu oynuyorsun."}
  return cd("Takım gücü ve sonuç",sc+rs+`<div class="note"><b>${tip}</b> Sağdaki değer, sezon başına ortalama fark.</div>`)}
/* ---------- SEZON YOLU / FİLTRE / GALERİ ---------- */
function pathSvg(x){if(!x.res||!x.cfg)return "";const rk=resRanks(x.cfg),n=rk.length,W=n*40,sv=x.res.st,ch=sv==7,cx=i=>20+i*40,lg=isLg(x.cfg),LRS={0:"Alt",4:"Orta",5:"3.",6:"2.",7:"Şamp."};
  let li=-1;rk.forEach((r,i)=>{if(r<=sv)li=i});
  const cl=ch?" ch":"",ln=rk.slice(1).map((r,j)=>`<line class="${j<li?"ln"+cl:"lm"}" x1="${cx(j)}" x2="${cx(j+1)}" y1="14" y2="14"/>`).join("");
  const nd=rk.map((r,i)=>`<circle class="${i<li?"dn"+cl:i==li?"dn "+(ch?"ch":"el"):"em"}" cx="${cx(i)}" cy="14" r="5.5"/><text x="${cx(i)}" y="31" text-anchor="middle">${lg?(LRS[r]||RS[r]):RS[r]}</text>`).join("");
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
  const cx=i=>(i+.5)*300/n,y=v=>100-v/3*88;
  const gr=[0,1,2,3].map(v=>`<line x1="14" x2="300" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--bd)" stroke-dasharray="${v?"3 3":"0"}"/><text x="2" y="${y(v)+3}" font-size="9" style="fill:var(--mut)">${v}</text>`).join("");
  const ln=ma.map((v,i)=>(i?"L":"M")+cx(i).toFixed(1)+" "+y(v).toFixed(1)).join("");
  const col=r=>r=="w"?"var(--ac)":r=="l"?"var(--wr)":"var(--mut)";
  const dots=L.map((m,i)=>`<circle cx="${cx(i).toFixed(1)}" cy="${y(ma[i]).toFixed(1)}" r="5" style="fill:${col(mres(m))};stroke:var(--card)" stroke-width="2"><title>${esc(m.on)} ${m.gf}-${m.ga}</title></circle>`).join("");
  const LT={w:"G",d:"B",l:"M"},tot=L.reduce((a,m)=>a+pt(m),0);
  let tr="";if(n>=6){const r=ma.slice(-3).reduce((a,b)=>a+b,0)/3,e=L.slice(0,-3).reduce((a,m)=>a+pt(m),0)/(n-3),d=r-e;tr=d>=.5?" Form yükselişte.":d<=-.5?" Form düşüşte.":""}
  return cd(`Form<small>son ${n} maç</small>`,`<div class="note" style="margin:0 0 4px">Maç başı <b>${f2(tot,n)}</b> puan.${tr}</div><svg viewBox="0 0 300 108" style="width:100%" role="img" aria-label="Hareketli ortalama puan"><g>${gr}</g><path d="${ln}" fill="none" stroke-width="2.5" style="stroke:var(--ac)"/>${dots}</svg><div class="mfr">${L.map(m=>`<div class="mfc"><i class="${mres(m)}">${LT[mres(m)]}</i><span>${m.gf}-${m.ga}</span></div>`).join("")}</div><div class="note">Çizgi: son 3 maçın ortalama puanı (G=3, B=1, M=0).</div>`)}
function matchTab(){const A0=allM(),ds=new Set(A0.map(dOf)),fd=ds.has(st.sfd)?st.sfd:"",A=fd?A0.filter(e=>dOf(e)==fd):A0,ML=A.map(e=>e.m),fb=oyFilter(A0,fd);
  if(!ML.length)return fb+cd("Maç istatistikleri",emp("Maç sonuçları girildikçe ortalamalar, form ve skorlar burada görünür."));
  const curS=store.seasons.find(x=>x.id==store.cur),C=tally(ML),S=tally((curS&&curS.mt)||[]),ad=C.gf-C.ga;
  const c1=cd("Genel görünüm<small>kariyer</small>",`<div class="mtl">${tile(C.n,"maç")}${tile(pct(C.w,C.n),"galibiyet")}${tile((ad>0?"+":"")+ad,"averaj",C.gf+" - "+C.ga)}</div>`+sbar(C)+`<div class="mgl"><span class="w">${C.w} G</span><span class="d">${C.d} B</span><span class="l">${C.l} M</span></div>`);
  const sv=f=>S.n?"bu sezon "+f(S):"";
  const c3=cd("Maç başına",`<div class="mtl c2">${tile(f2(C.gf,C.n),"atılan gol",sv(o=>f2(o.gf,o.n)))}${tile(f2(C.ga,C.n),"yenen gol",sv(o=>f2(o.ga,o.n)))}${tile(pct(C.cs,C.n),"temiz kasa",sv(o=>pct(o.cs,o.n)))}${tile(f2(C.w*3+C.d,C.n),"puan",sv(o=>f2(o.w*3+o.d,o.n)))}</div>`);
  const grp=[["Grup maçları",m=>m.rd=="Grup"],["Eleme maçları",m=>m.rd!="Grup"&&m.rd!=RN[2]],["Final",m=>m.rd==RN[2]]];
  const st1=grp.map(([t,f])=>{const o=tally(ML.filter(f));return o.n?`<div class="mstg"><div class="mstt"><b>${t}</b><span class="lb">${o.n} maç · ${gbmT(o)} · %${Math.round(o.w/o.n*100)}</span></div>${sbar(o)}</div>`:""}).join("");
  const go=tally(ML.filter(grp[0][1])),ko=tally(ML.filter(grp[1][1]));
  const tip=go.n>=3&&ko.n>=3?(go.w/go.n-ko.w/ko.n>=.15?"Grupta daha iyisin, eleme maçlarında düşüyorsun.":ko.w/ko.n-go.w/go.n>=.15?"Eleme maçlarında grup maçlarından daha iyisin.":""):"";
  const c4=cd("Aşamaya göre başarı",st1+(tip?`<div class="note">${tip}</div>`:""));
  const k=streaks(ML),c5=cd("Seriler",`<div class="mtl c2">${tile(k.u,"maçtır yenilmiyorsun","en uzun "+k.bu)}${tile(k.w,"galibiyet serisi","en uzun "+k.bw)}</div>`);
  const SC=nob();ML.forEach(m=>{const q=m.gf+"–"+m.ga;SC[q]=SC[q]||{n:0,r:mres(m)};SC[q].n++});
  const sl=Object.entries(SC).sort((a,b)=>b[1].n-a[1].n).slice(0,6),mx=sl[0][1].n;
  const c6=cd("En sık biten skorlar",sl.map(([q,o])=>`<div class="row"><span class="n" style="flex:0 0 48px">${q}</span><div class="bk mbr"><i class="${o.r}" style="width:${o.n/mx*100}%"></i></div><b>${o.n}</b></div>`).join("")+`<div class="note">Yeşil: galibiyet, gri: beraberlik, kırmızı: mağlubiyet.</div>`);
  const CO=nob();ML.forEach(m=>{const ti=T.findIndex(t=>t.n==m.on);if(ti<0)return;(CO[T[ti].c]=CO[T[ti].c]||[]).push(m)});
  const cl=Object.entries(CO).map(([c,L])=>({c:c,o:tally(L)})).sort((a,b)=>b.o.n-a.o.n),cm=cl[0]?cl[0].o.n:1;
  const bst=cl.filter(x=>x.o.n>=3).sort((a,b)=>b.o.w/b.o.n-a.o.w/a.o.n)[0];
  const c7=cl.length?cd("Rakip ülkeler",(bst?`<div class="note" style="margin:0 0 6px">En başarılı olduğun ülke: <b>${CN[bst.c][0]}</b> (%${Math.round(bst.o.w/bst.o.n*100)} galibiyet)</div>`:"")+cl.slice(0,8).map(x=>`<div class="row"><span class="n" style="flex:0 0 110px">${fl(x.c)} ${CN[x.c][0]}</span><div class="bk"><i style="width:${x.o.n/cm*100}%"></i></div><b>${x.o.n}</b><span class="lb" style="min-width:38px;text-align:right">%${Math.round(x.o.w/x.o.n*100)}</span></div>`).join("")+`<div class="note">Sağdaki: o ülkeye karşı galibiyet oranı.</div>`):"";
  return fb+tacticalDnaCard(curS)+xgSummaryCard(ML)+c1+formCard(ML)+c3+c4+c5+etPkCard(ML)+c6+surCard(ML)+oyDiff(A0)+c7}
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
  return cd("Uzatma ve penaltı karnesi<small>kırılma anları</small>",h+rec)}
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
    const asMap=nob();as.forEach(([n,a])=>{asMap[n.toLowerCase()]={n,a}});
    sc.forEach(([sn,g])=>{
      const sk=sn.toLowerCase();
      if(asMap[sk]){const o=B[sk]=B[sk]||{n:sn,c:0,g:0,a:0};o.c++;o.g+=g;o.a+=asMap[sk].a}
    });
    if(Array.isArray(m.gls)&&m.gls.length){
      const mPairs=new Set();
      m.gls.forEach(g=>{
        if(!g||!g.sc||isKK(g.sc)||!g.as||isKK(g.as))return;
        const sn=String(g.sc).trim(),an=String(g.as).trim(),sk=sn.toLowerCase(),ak=an.toLowerCase();
        if(!sk||!ak||sk===ak)return;
        const k1=sk<ak?sk:ak,k2=sk<ak?ak:sk,key=k1+"|"+k2;
        const n1=sk<ak?sn:an,n2=sk<ak?an:sn;
        const o=D[key]=D[key]||{n:n1+" & "+n2,m:0,tot:0};
        o.tot+=1;mPairs.add(key);
      });
      mPairs.forEach(key=>{if(D[key])D[key].m+=1});
    }else{
      sc.forEach(([sn,g])=>{
        const sk=sn.toLowerCase();
        as.forEach(([an,a])=>{
          const ak=an.toLowerCase();if(sk==ak)return;
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
  chev:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>'
};
function awardsCard(s,inFold){
  const aw=seasonAwards(s);if(!aw)return "";
  const mvpPills=[`<span class="awp"><b>${aw.mvp.g}</b>G</span>`,`<span class="awp"><b>${aw.mvp.a}</b>A</span>`];
  if(aw.mvp.mom)mvpPills.push(`<span class="awp gld"><b>${aw.mvp.mom}</b>★</span>`);
  const hero=`<div class="awd mvp"><span class="awic">${UICO.trophy}</span><div class="awm"><div class="awi">Sezonun MVP’si</div><b>${esc(aw.mvp.n)}</b></div><div class="awps">${mvpPills.join("")}</div></div>`;
  const mkA=(cls,ic,lbl,nm,stat)=>`<div class="awd ${cls}"><div class="awtop"><span class="awic sm">${UICO[ic]}</span><span class="awi">${lbl}</span></div><b>${esc(nm)}</b><span class="awst">${stat}</span></div>`;
  const items=[];
  if(aw.boot)items.push(mkA("gold","boot","Altın Ayakkabı",aw.boot.n,`${aw.boot.v} gol`));
  if(aw.play)items.push(mkA("sky","play","Oyun Kurucu",aw.play.n,`${aw.play.v} asist`));
  if(aw.ga)items.push(mkA("emr","bolt","Skor Katkısı",aw.ga.n,`${aw.ga.v} katkı (${aw.ga.g}G + ${aw.ga.a}A)`));
  if(aw.clutch)items.push(mkA("org","flame","Eleme Yıldızı",aw.clutch.n,`Elemede ${aw.clutch.g}G · ${aw.clutch.a}A`));
  if(aw.wk)items.push(mkA("pur","gem",`Genç Yıldız (${aw.wk.age})`,aw.wk.n,`${aw.wk.g}G · ${aw.wk.a}A${aw.wk.mom?` · ${aw.wk.mom}★`:""}`));
  if(aw.duo)items.push(mkA("teal","duo","Altın İkili",aw.duo.n,`${aw.duo.m} maçta ${aw.duo.tot} ortak gol`));
  const grid=`<div class="aw-wrap">${hero}${items.length?`<div class="awg">${items.join("")}</div>`:""}</div>`;
  if(inFold)return `<div class="aw-subbar"><span class="lb">${s.res?"Sezon ödülleri kesinleşti":"Canlı sezon liderleri"}</span></div>${grid}`;
  return `<div class="card pglass paw"><h3>Sezon ödülleri<small>${s.res?"kesinleşti":"canlı liderler"}</small></h3>${grid}</div>`}
function careerData(mode){
  const S=store.seasons.filter(x=>!mode||mode=="all"||(mode=="lg"?isLg(x.cfg):!isLg(x.cfg)));
  const f=S.filter(x=>x.res),act=S.filter(x=>x.res||(x.mt||[]).length||(x.ts&&((x.ts.w||0)+(x.ts.d||0)+(x.ts.l||0)))),t={w:0,d:0,l:0,gf:0,ga:0},P=nob();
  S.forEach(x=>{const q=x.ts||{};for(const k in t)t[k]+=q[k]||0;(x.pl||[]).forEach(p=>{const q=p.n.toLowerCase(),o=P[q]=P[q]||{n:p.n,g:0,a:0,mom:0,ga:0};o.g+=p.g||0;o.a+=p.a||0;o.mom+=p.mom||0;o.ga=(o.g||0)+(o.a||0)})});
  const pl=Object.values(P),top=k=>pl.filter(p=>p[k]>0).sort((a,b)=>b[k]-a[k]),topT=k=>{const L=top(k);if(!L.length)return null;const mx=L[0][k],ties=L.filter(p=>p[k]==mx);return{n:ties.map(p=>p.n).join(", "),v:mx}};
  const ds=duoStats(S);
  return{mode:mode||"all",n:f.length||act.length,finN:f.length,ch:f.filter(x=>x.res.st==7).length,fin:f.filter(x=>x.res.st>=6).length,pod:f.filter(x=>x.res.st>=5).length,t,best:f.length?Math.max(...f.map(x=>x.res.st)):-1,g:topT("g"),a:topT("a"),ga:topT("ga"),mom:topT("mom"),duo:ds.duos[0]||null}}
function careerCard(mode){const d=careerData(mode);if(!d.n&&!(d.t.w+d.t.d+d.t.l))return "";
  const isL=mode=="lg",isC=mode=="cup",ttl=isL?"Lig kariyer özeti":isC?"Kupa kariyer özeti":"Kariyer özeti <small>tümü</small>";
  const col3=isL?`<div><b>${d.pod}</b><span>ilk 3 (podyum)</span></div>`:`<div><b>${d.fin}</b><span>${isC?"finale kalma":"final / ilk 2"}</span></div>`;
  return cd(ttl,`<div class="mtl"><div><b>${d.n}</b><span>${isL?"lig sezonu":isC?"kupa sezonu":"sezon"}</span></div><div><b>${d.ch}</b><span>şampiyonluk</span></div>${col3}</div><div class="mrec">${d.t.w} G · ${d.t.d} B · ${d.t.l} M · ${d.t.gf}/${d.t.ga} gol</div><div class="bar" style="margin:8px 0 0"><button class="btn" data-a="kariyer">Özeti paylaş</button></div>`)}
async function kariyerCv(){const mode=st.hmod||"all",d=careerData(mode),isL=mode=="lg",isC=mode=="cup",W=1080;
  const bestMap=isL?SNL:SN;
  const lines=[];
  if(d.best>=0)lines.push(["🏆 En iyi sonuç: "+(bestMap[d.best]||SN[d.best]).trim(),"#f8fafc"]);
  if(d.ga)lines.push(["⚡ Skor katkısı lideri: "+d.ga.n+" · "+d.ga.v+" (G+A)","#fbeaa8"]);
  if(d.g)lines.push(["⚽ En golcü: "+d.g.n+" · "+d.g.v+" gol","#f0c24b"]);
  if(d.a)lines.push(["🎯 Asist lideri: "+d.a.n+" · "+d.a.v+" asist","#e2e8f0"]);
  if(d.mom)lines.push(["★ Maçın adamı lideri: "+d.mom.n+" · "+d.mom.v+" MOTM","#3ee6a8"]);
  if(d.duo)lines.push(["🤝 Altın ikili: "+d.duo.n+" · "+d.duo.m+" maçta "+d.duo.tot+" ortak gol","#38bdf8"]);
  const boxH=lines.length?76+lines.length*54+20:0,H=Math.max(1400,1080+(boxH?boxH+36:0)+76);
  const cv=mkCv(W,H),c=cv.getContext("2d");
  dkBg(c,W,H);
  tx(c,isL?"LİG KARİYER ÖZETİ":isC?"KUPA KARİYER ÖZETİ":"KARİYER ÖZETİ",54,74,62,"#fbeaa8");tx(c,d.n+" sezon · "+(d.t.w+d.t.d+d.t.l)+" maç",54,142,34,"#94a3b8","left",500);
  c.fillStyle=d.ch>0?grad(c,40,1040,"#fbeaa8","#d4a017"):grad(c,40,1040,"#132235","#0d1826");
  rr(c,40,236,1000,290,30);c.fill();c.lineWidth=3;c.strokeStyle=d.ch>0?"#fbeaa8":"#d4a017";c.stroke();
  const hCol=d.ch>0?"#2b2000":"#fbeaa8",sCol=d.ch>0?"#4a3600":"#94a3b8";
  tx(c,d.ch,290,356,160,hCol,"center");tx(c,"ŞAMPİYONLUK",290,464,34,sCol,"center",700);
  c.fillStyle=d.ch>0?"rgba(0,0,0,.18)":"#223549";c.fillRect(538,280,4,200);
  tx(c,d.n,790,356,160,hCol,"center");tx(c,"SEZON",790,464,34,sCol,"center",700);
  [[d.t.w,"Galibiyet","#3ee6a8"],[d.t.d,"Beraberlik","#94a3b8"],[d.t.l,"Mağlubiyet","#ff6b6b"]].forEach(([v,l,col],i)=>{
    const bx=40+i*340;c.fillStyle="#101c2b";rr(c,bx,564,320,210,24);c.fill();c.lineWidth=2;c.strokeStyle="#223549";c.stroke();
    tx(c,v,bx+160,650,130,col,"center");tx(c,l,bx+160,740,32,"#94a3b8","center",600)});
  const av=d.t.gf-d.t.ga;
  [["Atılan gol",d.t.gf,"#f8fafc"],["Yenen gol",d.t.ga,"#f8fafc"],["Averaj",(av>0?"+":"")+av,"#f0c24b"],[isL?"İlk 3 (podyum)":"Finale kalma",isL?d.pod:d.fin,"#f0c24b"]].forEach(([l,val,vc],i)=>{
    const bx=40+i*255;c.fillStyle="#101c2b";rr(c,bx,808,235,142,22);c.fill();c.lineWidth=2;c.strokeStyle="#223549";c.stroke();
    tx(c,val,bx+117,860,66,vc,"center");tx(c,l,bx+117,922,28,"#94a3b8","center",600)});
  if(lines.length){
    const by=986;
    c.fillStyle="#101c2b";rr(c,40,by,1000,boxH,26);c.fill();c.lineWidth=2;c.strokeStyle="#2b425b";c.stroke();
    tx(c,"KARİYER LİDERLERİ VE REKORLAR",70,by+44,32,"#f0c24b","left",700);
    c.font="600 36px "+NUMF;
    lines.forEach(([txt,col],idx)=>{
      const ry=by+94+idx*54;
      if(idx>0){c.fillStyle="#1e3148";c.fillRect(70,ry-28,940,1.5)}
      tx(c,fit(c,txt,940),70,ry,36,col,"left",600);
    });
  }
  tx(c,"FC 27 GRUP LİGİ",W/2,H-36,28,"#f0c24b","center",600);
  return cv}
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
  return appPref+bkCard+quotaCard()+rcvCard()+trashCard()+appCard()+poolCard+resetCard()}

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
  return `<div class="card" style="margin-bottom:10px"><h3>Gruptan çıkanlar <small>${allQ.length}/${totNeed} takım</small></h3><div class="pg">${allQ.map(o=>`<button class="row tb" data-a="tinfo" data-i="${o.ti}"><span class="qbdg">${GL(o.gi)}${o.rk}</span>${badge(o.ti,20)}<span class="n">${nm(o.ti)}</span>${rb(T[o.ti].g)}</button>`).join("")}</div></div>`}
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
    if(canSim)btnHtml=`<button class="btn p" data-a="simw" style="flex:1">⚡ ${nextW}. Hafta Maçlarını Simüle Et</button>`;
    else btnHtml=`<button class="btn p qgo" data-a="qs" style="flex:1">⚽ Önce ${nextW}. Hafta Maçını Gir (${myGm}/${nextW})</button>`;
  }else{
    btnHtml=`<span class="gd" style="font-size:13px;flex:1">✓ ${lg?"Lig":"Grup"} haftaları (${totW}/${totW}) tamamlandı · Eleme ağacı hazır</span>`;
  }
  const needMe=!(out&&out.done)&&!allGrpDone&&!canSim;
  return `<div class="card simbar${needMe?" needme":""}" style="margin-bottom:10px"><div class="pt" style="flex-wrap:wrap;gap:6px"><b>⚡ Turnuva Simülasyon Merkezi</b>${hasGrp?`<span class="lb">Hafta: <b>${sim.w}/${totW}</b></span>`:""}</div><div class="cw" style="margin:6px 0">${SIM_MODES.map(([k,l])=>`<button class="chip ${sim.m===k?"on":""}" data-a="simm" data-v="${k}" style="flex:1;text-align:center">${l}</button>`).join("")}</div><div class="note" style="margin:0 0 8px">${esc(modeDesc)}</div><div class="bar" style="margin:0;align-items:center">${btnHtml}${hasGrp&&sim.w>0&&(!out||!s.res)?`<button class="btn" data-a="simu" title="Son haftayı geri al">↩ Geri Al</button>`:""}</div></div>`;
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
      (xgH||`<div class="card" style="margin-top:10px"><h3>xG, xPts & Verimlilik</h3>${emp("Maç kaydederken «Gelişmiş İstatistik Ekle» alanını doldurduğunda detaylı xG ve verimlilik analizi burada oluşur.")}</div>`)+
      posDistCard([s]);
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
  const hofRow=(nm,sub,val,i)=>`<div class="hof-r${i===0?" r1":""}">${i<3?`<span class="mdl m${i+1}">${i+1}</span>`:`<span class="hof-rk">${i+1}</span>`}<span class="hof-nm"><b>${esc(nm)}</b>${sub?`<small>${sub}</small>`:""}</span><span class="hof-v">${val}</span></div>`;
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
  const card=(t,b)=>`<div class="card" style="margin-top:10px"><h3>${t}</h3>${b}</div>`;
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
        `<button class="btn pset-sec" data-a="sum" data-id="${x.id}">Özet</button>`+
        `<button class="mb sc-ic" data-a="ren" data-id="${x.id}" aria-label="Sezon adını değiştir" title="Adı değiştir">${SBI.edit}</button>`+
        `<button class="mb sc-ic dl" data-a="del" data-id="${x.id}" aria-label="Sezonu sil" title="Sil">${SBI.del}</button>`+
      `</div>`+
    `</div>`;
  };
  const A=achList(),achDone=A.filter(a=>a.done).length,achOp=!!(st.hm&&st.hm.ach);
  const achFold=`<div class="pfold gold${achOp?" open":""}"><button class="acbtn${achOp?" open":""}" data-a="hm" data-k="ach" aria-expanded="${achOp}"><span class="aci">${UICO.trophy}</span><span class="act"><b>Rozetler</b><small>Kariyer başarımları</small></span><span class="acr"><span class="xfpill">${achDone}/${A.length}</span><span class="acc" aria-hidden="true">${UICO.chev}</span></span></button>${achOp?`<div class="acbody">${achCard()}</div>`:""}</div>`;
  const cupCnt=ss.filter(x=>!isLg(x.cfg)).length,lgCnt=ss.filter(x=>isLg(x.cfg)).length;
  const modBar=`<div class="sfb" style="margin:10px 0 4px">${[["all",`Tümü (${ss.length})`],["cup",`🏆 Kupa Kariyeri (${cupCnt})`],["lg",`📋 Lig Kariyeri (${lgCnt})`]].map(([k,l])=>`<button class="chip ${hmod==k?"on":""}" data-a="hmod" data-v="${k}" style="flex:1;text-align:center">${l}</button>`).join("")}</div>`;
  const ht=(st.ht&&st.ht!="b")?st.ht:"o",nav=`<div class="stabs htabs" role="tablist" aria-label="Geçmiş bölümleri">${[["o","Özet"],["r","Rekorlar"],["s","Sezonlar"],["p","Rakipler"],["m","Maçlar"]].map(([k,l])=>`<button class="chip ${ht==k?"on":""}" role="tab" aria-selected="${ht==k}" data-a="ht" data-v="${k}">${l}</button>`).join("")}</div>`;
  const ovBody=!filtS.length?cd(isL?"Lig kariyeri":"Kupa kariyeri",emp(isL?"Henüz puan usulü lig sezonu oluşturmadın. Kurulumdan «Lig» şablonunu seçerek başlayabilirsin.":"Henüz kupa sezonu bulunmuyor.")):careerCard(hmod)+xpCard(hmod)+powerCard(hmod)+A1+A2+A3+tsCard(filtS)+chartCard(filtS);
  const body=ht=="r"?recCard()+A4+posDistCard(store.seasons)+A5+cmpCard():ht=="s"?seasonsView(ss,A6c):ht=="p"?oppCard():ht=="m"?matchTab():modBar+ovBody+achFold;
  return vitrinCard()+nav+body}

/* ---------- PAYLAŞILABİLİR GÖRSELLER ---------- */
const NUMF='"FC Sayi","Barlow Condensed","Oswald","Bahnschrift","Avenir Next Condensed","Roboto Condensed","Arial Narrow",sans-serif';
const TCOL={1:["#fbeaa8","#e0b43a","#2b2000"],2:["#f3f6f8","#b9c3cb","#1b2328"],3:["#f0c9a2","#be7f47","#2a1500"],0:["#ffffff","#dfeee6","#12211a"]};
const tierOf=v=>v>=85?1:v>=80?2:v>=75?3:0;
const flagCache=nob();
const flagImg=k=>flagCache[k]||(flagCache[k]=new Promise(res=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>res(null);i.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" width="72" height="48">${FLG[k]||""}</svg>`)}));
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
const tx=(c,t,x,y,sz,col,al,wt)=>{c.font=(wt||700)+" "+sz+"px "+NUMF;c.fillStyle=col;c.textAlign=al||"left";c.textBaseline="middle";c.fillText(String(t),x,y)};
const fit=(c,t,w)=>{if(c.measureText(t).width<=w)return t;while(t.length>2&&c.measureText(t+"…").width>w)t=t.slice(0,-1);return t+"…"};
const grad=(c,x0,x1,a,b)=>{const g=c.createLinearGradient(x0,0,x1,0);g.addColorStop(0,a);g.addColorStop(1,b);return g};
const mkCv=(w,h)=>{const cv=document.createElement("canvas");cv.width=w;cv.height=h;return cv};
async function kuraCv(s){
  const G=s.G,gs=G[0].length,n=G.length,cols=n<=1?1:n<=8?2:3,W=1080,P=36,gap=20,cw=(W-2*P-gap*(cols-1))/cols,fs=cols==3?24:30,rh=cols==3?42:50,hh=62,ch=hh+gs*rh+16,rows=Math.ceil(n/cols),HH=210,H=HH+P+rows*ch+(rows-1)*gap+P+64;
  const cv=mkCv(W,H),c=cv.getContext("2d");
  dkBg(c,W,H);
  tx(c,"FC 27 · "+s.name.toUpperCase()+" KURASI",P,74,60,"#fbeaa8");tx(c,fmt(s.cfg)+" · "+s.date,P,142,30,"#94a3b8","left",500);
  const myg=s.my!=null?G.findIndex(g=>g.includes(s.my)):-1,imgs=nob();
  await Promise.all([...new Set(G.flat().map(i=>T[i].c))].map(async k=>{imgs[k]=await flagImg(k)}));
  withSn(s,()=>G.forEach((g,gi)=>{
    const x=P+(gi%cols)*(cw+gap),y=HH+Math.floor(gi/cols)*(ch+gap),mine=gi==myg;
    c.fillStyle=mine?"#13283c":"#101c2b";rr(c,x,y,cw,ch,20);c.fill();c.lineWidth=mine?4:2;c.strokeStyle=mine?"#f0c24b":"#24384d";c.stroke();
    tx(c,gname(s,gi),x+16,y+hh/2,34,mine?"#fbeaa8":"#f8fafc");
    tx(c,"ORT "+fx(avg(g,"g")),x+cw-16,y+hh/2,26,mine?"#f0c24b":"#94a3b8","right",600);
    g.slice().sort((a,b)=>V(T[b])-V(T[a])).forEach((i,r)=>{
      const yy=y+hh+r*rh+rh/2,t=T[i],tc=TCOL[tierOf(t.g)],im=imgs[t.c],bw=48,bx=x+cw-16-bw;
      c.fillStyle="#1e3148";c.fillRect(x+16,y+hh+r*rh,cw-32,1.5);
      drawBadge(c,i,x+12,yy-15,26);if(im)c.drawImage(im,x+44,yy-10,30,20);
      const qL=(s.gqs&&s.gqs[gi])||[],qr=qL.indexOf(i);
      c.font="700 "+fs+"px "+NUMF;
      tx(c,fit(c,(i===s.my?"★ ":"")+(qr>=0?`[${qr+1}] `:"")+t.n,cw-156),x+82,yy,fs,i===s.my?"#fbeaa8":qr>=0?"#3ee6a8":"#e2e8f0");
      c.fillStyle=grad(c,bx,bx+bw,tc[0],tc[1]);rr(c,bx,yy-16,bw,32,8);c.fill();
      tx(c,t.g,bx+bw/2,yy,fs-2,tc[2],"center")})}));
  tx(c,"FC 27 GRUP LİGİ",W/2,H-34,28,"#f0c24b","center",600);
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
    const cv=kind=="kura"?await kuraCv(x):kind=="kariyer"?await kariyerCv():kind=="mac"?await macCv(x):await karneCv(x);
    const blob=await new Promise(r=>cv.toBlob(r,"image/png"));
    const url=blob&&typeof URL!="undefined"&&URL.createObjectURL?URL.createObjectURL(blob):cv.toDataURL("image/png");
    clrImg();hideToast();
    st.img={title:kind=="kariyer"?"Kariyer özeti":kind=="mac"?"Maç kartı":x.name+(kind=="kura"?" kurası":" karnesi"),name:"fc27-"+kind+"-"+x.name.replace(/[^\wÀ-ɏ]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase()+".png",url,blob,msg:"",x,w:cv.width,h:cv.height,anim:kind=="karne"&&!rm()};
  }catch(e){hideToast();ask("Görsel oluşturulamadı.")}
  finally{st.isGenerating=false;st.genId=null;render()}
  if(st.img&&st.img.anim)playKarne(st.img)}
const imgDlg=()=>{const shIc='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>';return `<div class="dlg"><div class="dbox wide pimgdlg" role="dialog" aria-modal="true"><div class="pimg-hd"><span class="aci">${UICO.trophy}</span><div class="pimg-t"><b>${esc(st.img.title)}</b><small>Yüksek çözünürlüklü PNG kartı</small></div><button class="mb sc-ic" data-a="no" aria-label="Kapat">✕</button></div><div class="pimg-stage">${st.img.anim?`<canvas id="kcv" class="shimg" width="${st.img.w||1080}" height="${st.img.h||1400}" role="img" aria-label="${esc(st.img.title)}"></canvas>`:`<img class="shimg" src="${st.img.url}" alt="${esc(st.img.title)}">`}</div><div class="pimg-nt">${esc(st.img.msg||"Görsele basılı tutarak da galeriye kaydedebilirsin.")}</div><div class="pimg-acts"><button class="btn p pset-pri" data-a="shimg">${shIc}<span>Paylaş</span></button><a class="btn pset-sec" href="${st.img.url}" download="${esc(st.img.name)}">${UICO.backup}<span>İndir</span></a></div></div></div>`};
const TPL=[["Dünya Kupası","32 takım · 8 grup × 4",32,4,2],["Klasik 64","64 takım · 8 grup × 8",64,8,2],["Mini Lig","16 takım · 4 grup × 4",16,4,2],["Direkt Eleme","8 takım · grup yok",8,0,0],["Lig","4–24 takım · eleme yok",16,16,0]];
const tplOn=(c,p)=>p[4]===0&&p[2]===p[3]?isLg(c):(c.N==p[2]&&(c.gs||0)==p[3]&&(!p[3]||c.q==p[4])&&!isLg(c));
/* ---------- SEZON ANA EKRANI, 5'Lİ GEZİNME, HIZLI SKOR PANELİ ---------- */
const crs=(i,w)=>`<div style="display:flex;justify-content:center;margin-bottom:2px">${badge(i,w||36)}</div>`;
const PITCH='<svg viewBox="0 0 96 64" aria-hidden="true"><rect x="4" y="4" width="88" height="56" rx="3"/><path d="M48 4v56"/><circle cx="48" cy="32" r="9"/><rect x="4" y="20" width="12" height="24"/><rect x="80" y="20" width="12" height="24"/></svg>';
function tstatView(s){
  if(!s.G||!s.G.length)return emp("Turnuva istatistikleri kura sonrası burada görünür.");
  const st2=tourneyStats(s);
  if(!st2.matches.length)return emp("Henüz oynanmış maç yok. İstatistikler maçlar oynandıkça dolar.");
  const P=st2.players,TMS=st2.teams;
  const prow=(o,i,val)=>`<button class="row tb${o.mine?" myrow":""}" data-a="tinfo" data-i="${o.ti}">${i<3?`<span class="mdl m${i+1}">${i+1}</span>`:`<span class="lb" style="width:20px;font-weight:700">${i+1}</span>`}${badge(o.ti,20)}<span class="n"><b>${o.mine?"★ ":""}${esc(o.n)}</b> <small class="pm">${esc(T[o.ti].n)}</small></span><span class="g">${val}</span></button>`;
  const CROWN='<svg class="lcr" viewBox="0 0 24 20" aria-hidden="true"><path d="M2 17h20l1.5-11-6 4.5L12 2 6.5 10.5.5 6z"/><rect x="2" y="18" width="20" height="2" rx="1"/></svg>';
  const lead=(o,big,unit,sub)=>`<button class="lead tb" data-a="tinfo" data-i="${o.ti}"><span class="lbd">${CROWN}${badge(o.ti,40)}</span><span class="ln"><b>${o.mine?"★ ":""}${esc(o.n)}</b><small>${esc(T[o.ti].n)}</small><small class="lsub">${sub}</small></span><span class="lnum"><b>${big}</b><i>${unit}</i></span></button>`;
  const podium=(arr,big,unit,sub,val)=>arr.length?lead(arr[0],big(arr[0]),unit,sub(arr[0]))+arr.slice(1).map((o,j)=>prow(o,j+1,val(o))).join(""):"";
  const trow=(o,i,val)=>`<button class="row tb${o.ti===s.my?" myrow":""}" data-a="tinfo" data-i="${o.ti}"><span class="lb" style="width:20px;font-weight:700">${i+1}</span>${badge(o.ti,20)}<span class="n"><b>${o.ti===s.my?"★ ":""}${esc(T[o.ti].n)}</b></span><span class="g">${val}</span></button>`;
  const by=(f,tie)=>(a,b)=>(b[f]-a[f])||(tie?tie(a,b):0)||TR_CMP(a.n,b.n);
  const mvp=P.filter(o=>o.mvp>0).sort(by("mvp",(a,b)=>b.g-a.g||b.a-a.a)).slice(0,5);
  const gol=P.filter(o=>o.g>0).sort(by("g",(a,b)=>b.a-a.a)).slice(0,10);
  const asi=P.filter(o=>o.a>0).sort(by("a",(a,b)=>b.g-a.g)).slice(0,10);
  const ht=P.filter(o=>o.ht>0).sort(by("ht",(a,b)=>b.g-a.g)).slice(0,5);
  const gt=TMS.filter(o=>o.o>0);
  const topGf=gt.slice().sort((a,b)=>b.gf-a.gf||(b.gf-b.ga)-(a.gf-a.ga)).slice(0,5);
  const topDef=gt.slice().sort((a,b)=>a.ga/a.o-b.ga/b.o||b.o-a.o).slice(0,5);
  const topW=gt.slice().sort((a,b)=>b.w-a.w||(b.gf-b.ga)-(a.gf-a.ga)).slice(0,5);
  const M=st2.matches,totG=M.reduce((a,m)=>a+m.g1+m.g2,0);
  const big=M.slice().sort((a,b)=>Math.abs(b.g1-b.g2)-Math.abs(a.g1-a.g2)||(b.g1+b.g2)-(a.g1+a.g2))[0];
  const hi=M.slice().sort((a,b)=>(b.g1+b.g2)-(a.g1+a.g2))[0];
  const mline=m=>`<div class="simm"><button class="tl" data-a="tinfo" data-i="${m.t1}">${esc(T[m.t1].n)}</button><b>${m.g1}–${m.g2}</b><button class="tl" data-a="tinfo" data-i="${m.t2}">${esc(T[m.t2].n)}</button></div>`;
  let h="";
  if(mvp.length)h+=cd(`🏅 Turnuva MVP'si <small>puan = 3×gol + 2×asist + 2×maçın adamı</small>`,podium(mvp,o=>o.mvp,"puan",o=>`${o.g}G ${o.a}A ${o.mom}MA`,o=>`${o.mvp} p <small>${o.g}G ${o.a}A ${o.mom}MA</small>`));
  if(gol.length)h+=cd(`👟 Gol Krallığı <small>ilk ${gol.length}</small>`,podium(gol,o=>o.g,"gol",o=>`${o.a} asist`,o=>`${o.g}G`));
  h+=cd(`🎯 Asist Krallığı${asi.length?` <small>ilk ${asi.length}</small>`:""}`,asi.length?podium(asi,o=>o.a,"asist",o=>`${o.g} gol`,o=>`${o.a}A`):`<div class="note">Asist verisi bu sürümden sonra oynanan maçlardan toplanır; henüz asist kaydı yok.</div>`);
  if(ht.length)h+=cd(`🎩 Hat-trick Yapanlar`,ht.map((o,i)=>prow(o,i,`${o.ht}×`)).join(""));
  h+=cd(`⚽ En Golcü Takımlar`,topGf.map((o,i)=>trow(o,i,`${o.gf} gol`)).join(""));
  h+=cd(`🧤 En Az Gol Yiyen Takımlar <small>maç başına</small>`,topDef.map((o,i)=>trow(o,i,`${(o.ga/o.o).toFixed(2)} <small>(${o.ga} gol)</small>`)).join(""));
  h+=cd(`🏆 En Çok Kazanan Takımlar`,topW.map((o,i)=>trow(o,i,`${o.w} G`)).join(""));
  h+=cd(`📈 Turnuva Özeti`,`<div class="note" style="margin:0 0 6px"><b>${M.length}</b> maç · <b>${totG}</b> gol · maç başına <b>${(totG/M.length).toFixed(2)}</b></div>`+(big?`<div class="lb" style="margin:6px 0 2px">En farklı skor · ${esc(big.rd)}</div>${mline(big)}`:"")+(hi?`<div class="lb" style="margin:6px 0 2px">En gollü maç · ${esc(hi.rd)}</div>${mline(hi)}`:""));
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
  return koHtml+wkTabs+body+unp}
const emp=t=>`<div class="emp">${PITCH}${t}</div>`;
const qOk=s=>!!(s.lk&&s.my!=null&&s.G&&s.P);
const NAV5=[["Sezon",'<path d="M5 21V4M5 5h11l-2 3.5L16 12H5"/>',[7,0,1],7],["Turnuva",'<path d="M4 6h5M4 18h5M9 6v12M9 12h6M15 12h5"/>',[2,3,8,9],2],["İstat.",'<path d="M5 20V10M12 20V4M19 20v-7"/>',[4],4],["Geçmiş",'<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M12 13v4M8 20h8"/>',[5],5],["Ayarlar",'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',[6],6]];
const tabPre=t=>t==0||t==1?`<div class="bar"><button class="chip" data-t="7">‹ Sezon</button></div>`:t==2||t==3||t==8||t==9?`<div class="bar"><button class="chip ${t==2?"on":""}" ${t==2?'aria-current="page"':""} data-t="2" style="flex:1;padding-left:4px;padding-right:4px">Kura</button><button class="chip ${t==3?"on":""}" ${t==3?'aria-current="page"':""} data-t="3" style="flex:1;padding-left:4px;padding-right:4px">Gruplar</button><button class="chip ${t==8?"on":""}" ${t==8?'aria-current="page"':""} data-t="8" style="flex:1;padding-left:4px;padding-right:4px">Fikstür</button><button class="chip ${t==9?"on":""}" ${t==9?'aria-current="page"':""} data-t="9" style="flex:1;padding-left:4px;padding-right:4px">İstatistik</button></div>`:"";
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
  return `<div class="card"><h3>Maç günlüğü<span class="fm">${dotsOf(ms)}</span></h3>`+
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
function tiBody(i){
  const L=squadOf(i),f=st.tif||"A",tq=nz(st.tiq||"");
  if(!L.length)return `<div class="note">Bu takım için kadro verisi yok.</div>`;
  const row=p=>`<div class="sqr${p.t=="R"?" rz":""}"><span class="sqn">${p.j||""}</span><span class="sqm">${esc(p.n)}${p.t=="S"?`<i class="xi" aria-label="İlk 11">●</i>`:""}</span><span class="sqp">${p.p}</span><span class="sqa">${p.a}</span><span class="sqo">${rb(p.o)}</span></div>`;
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
  return `<div class="dlg ti"><button class="tibk" data-a="no" aria-label="Kapat"></button><div class="dbox tisheet" role="dialog" aria-label="${esc(T[i].n)} kadrosu"><div class="tih">${badge(i,46)}<div class="tim"><b>${esc(T[i].n)}</b><span>${fl(T[i].c)} ${CN[T[i].c][0]}${tag}</span></div><div class="tmo2"><b>${r.g}</b><i>GEN</i></div></div><div class="tix"><span>HÜC<b>${r.a}</b></span><span>ORT<b>${r.o}</b></span><span>DEF<b>${r.d}</b></span></div>${L.length?`<div class="note" style="margin:8px 0 4px">${L.length} oyuncu · yaş ort. ${fx(ag)} · ilk 11 ort. ${fx(xo)}</div>${sqChips("tif",f)}<input id="tiq" class="f" type="search" placeholder="Kadroda oyuncu ara" value="${esc(st.tiq||"")}" autocomplete="off" aria-label="Kadroda oyuncu ara"><div class="sqh"><span class="sqn">No</span><span class="sqm">Oyuncu</span><span class="sqp">Poz</span><span class="sqa">Yaş</span><span class="sqo">GEN</span></div>`:""}<div id="tiL">${tiBody(i)}</div>${L.length?`<div class="note">● ilk 11 · soluk satırlar rezerv. Kaynak: Topluluk kadro veritabanı (FC 27 uyumlu), oyun içi güncellemelerle değişebilir.</div>`:""}<div class="bar"><button class="btn p" data-a="no" style="flex:1">Kapat</button></div></div></div>`}
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
    const scTrKey="sc:"+idx,asTrKey="as:"+idx;
    h+=`<div class="glbox${hasSc?" done":""}${og?" og":""}">`;
    h+=`<div class="glhd"><span class="glnum">${idx+1}. GOL</span>${hasSc?`<button class="chip" data-a="glclr" data-g="${idx}" style="min-height:28px;padding:2px 10px;font-size:12px">Golcüyü değiştir</button>`:`<span class="lb">Golü kim attı?</span>`}</div>`;
    if(!hasSc){
      h+=`<div class="qk">${qSc.map(n=>`<button class="chip" data-a="glsc" data-g="${idx}" data-n="${esc(n)}">${esc(n)}</button>`).join("")}<button class="chip" data-a="glsc" data-g="${idx}" data-n="KK" style="border-color:var(--wr);color:var(--wr)">⚽ Kendi Kalesine (KK)</button><button class="chip ${st.trm==scTrKey?"on":""}" data-a="tropen" data-k="${scTrKey}">+ Başka / transfer</button></div>`;
      if(st.trm==scTrKey)h+=trBox(scTrKey,s);
      if(opts||ex.length||stPl.length)h+=`<select class="sel f" data-glsc="${idx}"><option value="">Kadrodan golcü seç…</option><option value="KK">⚽ Kendi Kalesine (KK)</option>${stOpt}${exOpt}${opts}</select>`;
    }else if(og){
      h+=`<div class="pt"><span><b>⚽ Kendi Kalesine (KK)</b> <small class="pm">rakip kendi kalesine attı · asist sorulmaz</small></span></div>`;
    }else{
      h+=`<div class="pt"><span><b>⚽ Gol: ${esc(g.sc)}</b>${pmeta(s,g.sc)}</span>${hasAs?`<span class="gd" style="font-size:13px">👟 Asist: ${esc(g.as)} <button class="chip" data-a="glasclr" data-g="${idx}" style="min-height:26px;padding:1px 7px;font-size:11px;margin-left:4px">✕</button></span>`:noAs?`<span class="lb" style="font-size:13px">Asist yok ✓ <button class="chip" data-a="glasopen" data-g="${idx}" style="min-height:26px;padding:1px 8px;font-size:11px;margin-left:4px">+ Asist ekle</button></span>`:`<span class="lb">Asist: Seçilmedi</span>`}</div>`;
      if(!hasAs&&!noAs){
        const asCand=qAs.filter(n=>nz(n)!==nz(g.sc));
        h+=`<div class="lb" style="margin-top:6px">${idx+1}. golün asistini kim yaptı? <small>(İsteğe bağlı)</small></div>`;
        h+=`<div class="qk"><button class="chip" data-a="glasno" data-g="${idx}" style="border-color:var(--ac);color:var(--ac);font-weight:600">Asist yok ✓</button>${asCand.map(n=>`<button class="chip" data-a="glas" data-g="${idx}" data-n="${esc(n)}">👟 ${esc(n)}</button>`).join("")}<button class="chip ${st.trm==asTrKey?"on":""}" data-a="tropen" data-k="${asTrKey}">+ Başka / transfer</button></div>`;
        if(st.trm==asTrKey)h+=trBox(asTrKey,s);
        if(opts||ex.length||stPl.length)h+=`<select class="sel f" data-glas="${idx}"><option value="">Kadrodan asistçi seç (isteğe bağlı)…</option>${stOpt}${exOpt}${opts}</select>`;
      }
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
  if(e.key=="Escape"){if(st.qs){st.qs=false;st.med=null;render();return}if(st.ti!=null||st.gs||st.ask||st.sum||st.img||st.ren||st.imp){st.ti=null;st.gs=false;st.ask=null;st.sum=null;clrImg();st.ren=null;st.imp=null;st.tiq="";render();return}}
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
  const de=document.documentElement;if(store.theme)de.setAttribute("data-theme",store.theme);else de.removeAttribute("data-theme");if(store.motion===0)de.setAttribute("data-motion","off");else de.removeAttribute("data-motion");
  $("sbar").innerHTML=`<select id="ss" class="sel">${store.seasons.map(x=>`<option value="${x.id}" ${x.id==store.cur?"selected":""}>${esc(x.name)}${x.res?" ✓":""}</option>`).join("")}</select><button class="btn" data-a="ns" aria-label="Yeni sezon">＋</button><button class="btn" data-a="gs" aria-label="Ara"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg></button>`;
  $("tabs").innerHTML=NAV5.map(([t,ic,g,d])=>{const on=g.includes(st.tab);return `<button role="tab" aria-selected="${on}" ${on?'aria-current="page"':""} class="${on?"cur":""}" data-t="${d}"><svg viewBox="0 0 24 24" aria-hidden="true">${ic}</svg><span>${t}</span></button>`}).join("");
  const sx=st.sum&&store.seasons.find(x=>x.id==st.sum);
  $("dlg").innerHTML=st.slot?slotDlg():st.own?ownDlg():st.gs?gsDlg():st.img?imgDlg():st.ren?`<div class="dlg"><div class="dbox" role="dialog" aria-modal="true"><div class="rs">Sezon adını değiştir</div><input id="rn" class="f" maxlength="24" value="${esc(st.ren.v)}" aria-label="Sezon adı" autocomplete="off"><div class="bar"><button class="btn p" data-a="rens">Kaydet</button><button class="btn" data-a="no">Vazgeç</button></div></div></div>`:st.imp?impDlg():sx?`<div class="dlg"><div class="dbox" role="dialog" aria-modal="true"><div class="rs">${esc(sx.name)} özeti</div><textarea id="sx" class="f" rows="6" readonly>${esc(sumText(sx))}</textarea><div class="bar"><button class="btn p" data-a="cp">Kopyala</button><button class="btn" data-a="no">Kapat</button></div></div></div>`:st.ask?`<div class="dlg"><div class="dbox" role="dialog" aria-modal="true"><div>${esc(st.ask.m)}</div><div class="bar">${st.ask.fn?`<button class="btn p" data-a="yes">Evet</button><button class="btn" data-a="no">Vazgeç</button>`:`<button class="btn p" data-a="no">Tamam</button>`}</div></div></div>`:st.ti!=null?withSn(cur(),tiDlg):"";
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
    const actMap={kura:"kurag",karne:"karne",mac:"mkart",kariyer:"kariyer"},targetAct=actMap[st.isGenerating];
    document.querySelectorAll('[data-a="kurag"],[data-a="karne"],[data-a="mkart"],[data-a="kariyer"]').forEach(btn=>{
      btn.disabled=true;
      const bid=btn.dataset.id!=null?+btn.dataset.id:null;
      if(btn.dataset.a===targetAct&&(st.genId==null||bid==null||bid===st.genId)){
        if(!btn.classList.contains("gcd"))btn.textContent=btn.dataset.a==="mkart"?"⏳":"⏳ Hazırlanıyor…";
      }
    });
  }
  const focusEl=aeId?$(aeId):null;
  if(focusEl&&document.activeElement!==focusEl){focusEl.focus();if(aeSel!=null&&typeof focusEl.setSelectionRange=="function")try{focusEl.setSelectionRange(aeSel,aeSel)}catch(e){}}}

const UI_ONLY=new Set(["stab","mexp","fxw","adv","cust","roall","vitall","sall","rstopen","sfopen","hm","grk","tropen","trclose","bkadv","madv","qs","medit","mall","qx","gofin","mg","mo","mu","mp","mpf","mpa","glsc","glas","glclr","glasclr","glasno","glasopen","tel","tpl","ht","hmod","sfm","sfr","sv","sfd","sfx","ro","dcancel","next","all","no","tinfo","gs","gsgo","tif","ren","own","owno","mman","ex","im","rcv","sum","oldlsx"]);
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
  else if(a=="no"){st.ask=null;st.sum=null;clrImg();st.ren=null;st.imp=null;st.ti=null;st.gs=false;st.tiq=""}
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
  else if(a=="fin"){const c=+$("stg").value,p=$("pts").value,fg=$("fgrk"),was=s.res&&s.res.st==7,lg=isLg(s.cfg),rk=c==0&&!lg&&fg?+fg.value:(s.grk||null);if(c==0&&rk)s.grk=rk;s.res={st:c,grk:c==0&&!lg?rk:null,pts:(c==0||lg)&&p!==""&&Number.isFinite(+p)?+p:null,note:$("note").value.trim().slice(0,200),date:today()};if(c==0){s.gq=null;if(s.G&&s.my!=null){const gi=s.G.findIndex(g=>g.includes(s.my));if(gi>=0&&s.gqs&&s.gqs[gi])s.gqs[gi]=s.gqs[gi].filter(x=>x!==s.my)}}if(c==7&&!was){st.cel=1;st.tab=7}}
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

/* Maç kartı görseli */
const findM=id=>{for(const x of store.seasons){const m=(x.mt||[]).find(q=>q.id==id);if(m)return{id,x,m,name:"mac-"+id}}return null};
async function macCv(q){const x=q.x,m=q.m,r=mres(m),oi=m.opp!=null&&T[m.opp]?m.opp:ixOf(m.on),me=x.my!=null&&T[x.my]?x.my:null;
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
  if(L.length<3)return cd("Sürpriz maçlar",emp("En az 3 maç girildikten sonra tahmine ters sonuçlar burada listelenir."));
  const dec=L.filter(e=>e.r!="d"&&Math.abs(e.pw-e.pl)>=10),hit=dec.filter(e=>(e.pw>e.pl)==(e.r=="w")).length,E=L.reduce((a,e)=>a+e.pw/100,0),A=L.filter(e=>e.r=="w").length;
  const udog=L.filter(e=>e.pl>e.pw+5),udogW=udog.filter(e=>e.r=="w").length;
  const S=L.filter(e=>e.po!=null&&e.po<=30).sort((a,b)=>a.po-b.po).slice(0,8);
  const rows=S.map(e=>`<div class="row"><i class="fd ${e.r}" role="img" aria-label="${e.r=="w"?"Beklenmedik galibiyet":"Beklenmedik mağlubiyet"}"></i><span class="n">${esc(e.x.name)} · ${esc(e.m.rd)} · ${esc(e.m.on)} ${e.m.gf}–${e.m.ga}</span><b>%${e.po}</b></div>`).join("");
  return cd("Sürpriz maçlar<small>tahmine ters sonuçlar</small>",`<div class="mtl">${tile(dec.length?pct(hit,dec.length):"—","tahmin isabeti",dec.length?dec.length+" net maç":"net favori yok")}${tile(fx(E),"beklenen galibiyet","gerçekte "+A)}${tile(udog.length?pct(udogW,udog.length):"—","underdog galibiyet",udog.length?udogW+"/"+udog.length+" zor maç":"rakip favori yok")}</div>`+(rows?`<div class="rt">En büyük sürprizler</div>${rows}<div class="note">Sağdaki yüzde, o sonucun maç öncesi tahminidir. Underdog: maç öncesi rakibin favori olduğu maçlar.</div>`:`<div class="note">Henüz sürpriz yok: sonuçların çoğu tahminle uyumlu.</div>`))}

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
  const r=mres(m),mx=+st.myXg,ox=+st.oppXg,diff=mx-ox;
  const xp=calcMatchXpts(mx,ox),actPts=r=="w"?3:r=="d"?1:0,pDiff=xp?actPts-xp.xPts:0;
  if(r=="l"&&diff>=0.35&&pDiff<=-1.15)return{k:"unlucky",t:"Şanssız Mağlubiyet",ic:"⚠️",c:"#f97316",bg:"#ea580c",d:diff,xPts:xp.xPts};
  if(r=="w"&&diff<=-0.35&&pDiff>=1.15)return{k:"undeserved",t:"Hak Edilmemiş Galibiyet",ic:"🛡️",c:"#3b82f6",bg:"#1e3a8a",d:diff,xPts:xp.xPts};
  if(r=="w"&&diff>=0.25)return{k:"deserved",t:"Hak Edilmiş Galibiyet",ic:"✓",c:"#12b886",bg:"#0f9d6b",d:diff,xPts:xp.xPts};
  if(r=="d"&&diff>=0.6)return{k:"unlucky",t:"Kaçan Galibiyet (Şanssız)",ic:"⚠️",c:"#f97316",bg:"#ea580c",d:diff,xPts:xp.xPts};
  if(r=="d"&&diff<=-0.6)return{k:"undeserved",t:"Kurtarılan Puan",ic:"🛡️",c:"#3b82f6",bg:"#1e3a8a",d:diff,xPts:xp.xPts};
  return{k:"fair",t:r=="l"&&diff<=-0.25?"Hak Edilmiş Mağlubiyet":"Dengeli Maç",ic:"•",c:"#94a3b8",bg:"#475569",d:diff,xPts:xp?xp.xPts:null};
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
  let h=`<button type="button" class="advbtn ${st.madv?"on":""}" data-a="madv"><span>📊 Gelişmiş İstatistik Ekle (Opsiyonel)${hasAny?" ✓":""}</span><span>${st.madv?"▴":"▾"}</span></button>`;
  if(!st.madv)return h;
  const row=(lbl,sub,k1,k2,ph1,ph2,dec)=>`<div class="advrow"><div class="advinp"><input id="mst_${k1}" class="tin" data-mst="${k1}" inputmode="${dec?"decimal":"numeric"}" maxlength="5" placeholder="${ph1}" value="${esc(q[k1]??"")}"></div><div class="lbl">${lbl}${sub?`<small>${sub}</small>`:""}</div><div class="advinp"><input id="mst_${k2}" class="tin" data-mst="${k2}" inputmode="${dec?"decimal":"numeric"}" maxlength="5" placeholder="${ph2}" value="${esc(q[k2]??"")}"></div></div>`;
  const mp=parseFloat(q.myPos),opP=parseFloat(q.oppPos),pBar=Number.isFinite(mp)&&Number.isFinite(opP)&&mp+opP>0?`<div class="advbar"><i style="width:${mp}%"></i><i style="width:${opP}%"></i></div>`:"";
  h+=`<div class="advbox"><div class="advhd"><span>★ ${esc(me)}</span><span>5 Altın Veri</span><span>${esc(op)}</span></div>`+
    row("Topla Oynama %","otomatik tamamlar","myPos","oppPos","50","50",false)+pBar+
    row("Toplam Şut","maç boyu","myShots","oppShots","10","8",false)+
    row("İsabetli Şut","kaleyi bulan","mySot","oppSot","6","4",false)+
    row("Pas İsabeti %","yüzde","myPass","oppPass","85","82",false)+
    row("xG (Gol Beklentisi)","ondalık (örn. 1.8)","myXg","oppXg","1.5","1.1",true)+
    `<div class="note" style="margin:6px 0 0;text-align:center">Girilen verilerle Hak Ediş, xG Verimliliği ve Taktiksel DNA (Radar) otomatik hesaplanır.</div></div>`;
  return h;
}
function calcTacticalDNA(s){
  const curM=((s&&s.mt)||[]).filter(m=>m.stats);
  const allSt=store.seasons.flatMap(x=>(x.mt||[]).filter(m=>m.stats));
  const src=(curM.length>=1?curM:allSt).slice(-15);
  if(!src.length)return null;
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
  const cl=(v)=>Math.round(Math.max(12,Math.min(99,v)));
  // 1. Hücum Tehdidi (Şut + xG + İsabetli Şut)
  const shScore=Math.min(100,(mShots/16)*100);
  const xgScore=Math.min(100,(mXg/3.0)*100);
  const sotScore=Math.min(100,(mSot/9)*100);
  const atk=cl(shScore*0.4+xgScore*0.45+sotScore*0.15);
  // 2. Top & Pas Kontrolü (Topla Oynama + Pas İsabeti)
  const posScore=Math.max(0,Math.min(100,((mPos-30)/40)*100));
  const pasScore=Math.max(0,Math.min(100,((mPass-65)/28)*100));
  const ctrl=cl(posScore*0.55+pasScore*0.45);
  // 3. Savunma Direnci & Pres (Rakip şutları engelleme + rakipten az şut yeme + baskı)
  const blkRatio=oShots>0?Math.max(0,Math.min(1,(oShots-oSot)/oShots)):0.45;
  const lowPosAggr=Math.max(0,Math.min(100,((62-mPos)/32)*100));
  const suppScore=Math.max(0,Math.min(100,((18-oShots)/14)*100));
  const aggr=cl(lowPosAggr*0.5+blkRatio*100*0.3+suppScore*0.2);
  // 4. Bitiricilik Verimi (Gol / xG + Şut/Gol dönüşümü)
  const totGf=src.reduce((a,m)=>a+(+m.gf||0),0);
  const totXg=src.reduce((a,m)=>a+(m.stats.myXg!=null?+m.stats.myXg:(+m.gf||1)),0);
  const totSh=src.reduce((a,m)=>a+(m.stats.myShots!=null?+m.stats.myShots:10),0);
  const gxRatio=totXg>0.2?totGf/totXg:1;
  const conv=totSh>0?totGf/totSh:0.15;
  const effRaw=Math.min(100,Math.max(10,55+(gxRatio-1)*45+(conv-0.14)*120));
  const eff=cl(effRaw);
  // Menajer Kimliği Ataması (Tutarlı eşikler)
  let title="Dengeli Taktisyen",desc="Savunma ile hücumu dengede tutan, rakibe ve skora göre strateji değiştirebilen komple menajer.",icon="🧠";
  if(mPos>=53&&ctrl>=55&&ctrl>=atk){
    title="Tiki-Taka Ustası";
    desc="Topa hükmeden (%"+Math.round(mPos)+"), yüksek pas isabetiyle oyunu rakip yarı sahaya yıkan pas ve pozisyon oyunu ustası.";
    icon="♟️";
  }else if(mPos<49&&(atk>=50||eff>=62)){
    title="Kontra Atak Dehası";
    desc="Topu rakibe bırakıp (%"+Math.round(mPos)+") kapılan toplarla saniyeler içinde tehlike ve skor üreten geçiş oyunu uzmanı.";
    icon="⚡";
  }else if(atk>=68&&aggr>=60){
    title="Gegenpressing Mimarı";
    desc="Önde yoğun baskı, yüksek şut temposu ve dikine oyunla rakibi bunaltan hücum presi ekolü.";
    icon="🔥";
  }else if(eff>=72&&totGf>totXg){
    title="Klinik Bitirici";
    desc="Az pozisyona girse bile bulduğu fırsatları yüksek yüzdeli gole çeviren soğukkanlı bitiricilik uzmanı.";
    icon="🎯";
  }else if(aggr>=62&&oShots<=9){
    title="Savunma Bakanı (Katı Defans)";
    desc="Kalesini şuta kapatan, rakibe net fırsat tanımayan disiplinli savunma ve direnç ustası.";
    icon="🛡️";
  }else if(atk>=ctrl+8){
    title="Direkt Hücumcu";
    desc="Pas yapmak yerine doğrudan rakip kaleyi düşünen, sık şut deneyip ceza sahasını zorlayan oyun tarzı.";
    icon="🚀";
  }else if(mPos>=51&&mPass>=82){
    title="Kontrollü Oyun Kurucu";
    desc="Topu ayağında güvenli tutup yüksek pas yüzdesiyle (%"+Math.round(mPass)+") oyunu sakin yönlendiren menajer.";
    icon="🧭";
  }
  const xgDiff=totGf-totXg;
  const unluckyCnt=src.filter(m=>{const d=matchDeserve(m);return d&&d.k=="unlucky"}).length;
  const stealCnt=src.filter(m=>{const d=matchDeserve(m);return d&&d.k=="undeserved"}).length;
  const deservedCnt=src.filter(m=>{const d=matchDeserve(m);return d&&d.k=="deserved"}).length;
  const cntK=fn=>src.filter(m=>fn(m)!=null).length;
  const covd={pos:cntK(m=>m.stats.myPos),pass:cntK(m=>m.stats.myPass),shots:cntK(m=>m.stats.myShots),sot:cntK(m=>m.stats.mySot),xg:cntK(m=>m.stats.myXg),oShots:cntK(m=>m.stats.oppShots),oSot:cntK(m=>m.stats.oppSot),oXg:cntK(m=>m.stats.oppXg)};
  const miss=[["Topla oynama",covd.pos],["Pas isabeti",covd.pass],["Şut",covd.shots],["İsabetli şut",covd.sot],["xG",covd.xg],["Rakip şutu",covd.oShots],["Rakip xG",covd.oXg]].filter(x=>!x[1]).map(x=>x[0]);
  return{n,scope:curM.length>=1?"Bu sezon (son "+n+" istatistikli maç)":"Kariyer (son "+n+" istatistikli maç)",atk,ctrl,aggr,eff,title,desc,icon,mPos,mPass,mShots,mSot,mXg,oShots,oXg,mGf,oSot,conv,gxRatio,miss,cov:covd,xgDiff,unluckyCnt,stealCnt,deservedCnt};
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
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Taktiksel DNA Radar Grafiği">${rings}${axes}<polygon points="${poly}" fill="rgba(15,157,107,.28)" stroke="var(--ac)" stroke-width="2.5"/>${dots}${labels}</svg>`;
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
  aggr:{n:"Savunma Direnci & Pres",hi:"Rakibe az şut izin veriyor ve şutlarının çoğunu isabetsiz bırakıyorsun; savunman sağlam.",mid:"Savunman idare ediyor; rakip arada tehlikeli şut bulabiliyor.",lo:"Rakip çok şut çekebiliyor ve isabetli şutları fazla. Savunma hattını sıkılaştırmak puanı yükseltir.",tip:"Yükseltmek için: rakibin şut sayısını ve isabetli şutlarını azalt. Not: düşük topla oynama bu puanı hafifçe artırır (savunma ağırlıklı oyun)."},
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
function tacticalDnaCard(s){
  const dna=calcTacticalDNA(s);
  if(!dna){
    return `<div class="dnacard"><div class="dnahd"><h3 style="margin:0">🧬 Oyun Tarzın & Menajer Kimliği</h3><span class="lb">Taktiksel Analiz</span></div><div class="note" style="margin:6px 0">Maç skoru girerken <b>“Gelişmiş İstatistik Ekle”</b> bölümünden girdiğin verilerle (Topla Oynama, Şut, Pas, xG) nasıl bir futbol oynadığını 100 üzerinden puanlar ve menajer kimliğini belirler.</div></div>`;
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
  const cf=dna.n>=8?["Yüksek güven","l4"]:dna.n>=4?["Orta güven","l3"]:["Düşük güven","l1"];
  const notes=[];
  if(dna.n<4)notes.push(`Yalnızca ${dna.n} maçlık veri var; maç sayısı arttıkça puanlar daha güvenilir olur.`);
  if(dna.miss&&dna.miss.length)notes.push(`Hiç girilmeyen veriler (${dna.miss.join(", ")}) için nötr varsayılan değer kullanıldı.`);
  const totDes=dna.deservedCnt+dna.stealCnt+dna.unluckyCnt;
  const dhkBar=totDes>0?`<div class="dhkbar" role="img" aria-label="Hak ediş dağılımı: ${dna.deservedCnt} hak edilmiş, ${dna.stealCnt} şanslı, ${dna.unluckyCnt} şanssız">${dna.deservedCnt?`<i class="ok" style="flex:${dna.deservedCnt}"></i>`:""}${dna.stealCnt?`<i class="st" style="flex:${dna.stealCnt}"></i>`:""}${dna.unluckyCnt?`<i class="un" style="flex:${dna.unluckyCnt}"></i>`:""}</div>`:"";
  return `<div class="dnacard">
    <div class="dnahd"><div><div class="lb" style="text-transform:uppercase;letter-spacing:.05em;font-weight:700">Oyun Tarzın · ${esc(dna.scope)}</div><div class="dnabdg" style="margin-top:4px"><span>${dna.icon}</span><span>${esc(dna.title)}</span></div></div><span class="dlv ${cf[1]}" title="Puanların kaç maça dayandığına göre güven düzeyi">${cf[0]} · ${dna.n} maç</span></div>
    <div class="note" style="margin:0 0 10px">${esc(dna.desc)}</div>
    <div class="dnasum"><span>💪 En güçlü: <b>${DNASH[best.k]}</b> (${best.v})</span><span>🔧 Geliştirilecek: <b>${DNASH[worst.k]}</b> (${worst.v})</span></div>
    <div class="dnagrid">
      <div class="dnaradar">${radarSvg(dna)}</div>
      <div class="dnalist">${items}</div>
    </div>
    <div class="dhkbox">
      <div class="dhkh"><b>Maç sonuçların hak edildi mi?</b>${totDes?`<span class="lb">${totDes} xG maçı</span>`:""}</div>
      ${dhkBar}
      <div class="dhk3">
        <div class="dhkc ok${dna.deservedCnt?"":" z"}"><span class="dhki">${DHKI.ok}</span><b>${dna.deservedCnt}</b><span>Hak Edilmiş</span></div>
        <div class="dhkc st${dna.stealCnt?"":" z"}"><span class="dhki">${DHKI.st}</span><b>${dna.stealCnt}</b><span>Şanslı</span></div>
        <div class="dhkc un${dna.unluckyCnt?"":" z"}"><span class="dhki">${DHKI.un}</span><b>${dna.unluckyCnt}</b><span>Şanssız</span></div>
      </div>
      <div class="note" style="margin:6px 0 0">Her maçta iki tarafın xG (gol beklentisi) farkına göre hesaplanır; ayrıntı için aşağıdaki xG analizine bak.</div>
    </div>
    ${notes.length?`<div class="note dnawarn">${notes.map(esc).join(" ")}</div>`:""}
    <details class="xgl"><summary>Puanlar nasıl hesaplanıyor?</summary><dl>
      <div><dt>Puan Ölçeği (0–100)</dt><dd><b>35 altı</b> Geliştirilmeli · <b>35–49</b> Orta · <b>50–64</b> İyi · <b>65–79</b> Çok iyi · <b>80+</b> Elit.</dd></div>
      <div><dt>Hücum Tehdidi</dt><dd>Maç başı şut sayısı (%40; 16 şut = tam puan) + xG (%45; 3,0 xG = tam puan) + isabetli şut (%15; 9 isabetli şut = tam puan).</dd></div>
      <div><dt>Top & Pas Kontrolü</dt><dd>Topla oynama (%55; %30 = 0 puan, %70 = tam puan) + pas isabeti (%45; %65 = 0 puan, %93 = tam puan).</dd></div>
      <div><dt>Savunma Direnci & Pres</dt><dd>Düşük topla oynama / savunma ağırlıklı oyun (%50) + rakip şutlarının isabetsiz kalma oranı (%30) + rakibin az şut çekmesi (%20).</dd></div>
      <div><dt>Bitiricilik Verimi</dt><dd>Gol / xG oranı ve gol / şut dönüşümü. Beklentiyle aynı gol sayısı yaklaşık 55 puan verir; fazlası puanı yükseltir.</dd></div>
      <div><dt>Hangi maçlar sayılır?</dt><dd>İstatistik girilmiş en fazla son 15 maç. Bu sezonda istatistikli maç varsa yalnızca bu sezon, yoksa tüm kariyer kullanılır.</dd></div>
    </dl></details>
  </div>`;
}

function xgTrendSvg(arr){
  const W=300,H=132,pl=6,pr=6,pt=12,pb=24,n=arr.length;
  const mx=Math.max(1,...arr.flatMap(m=>[+m.stats.myXg||0,+m.stats.oppXg||0])),sl=(W-pl-pr)/n,bw=Math.max(4,Math.min(14,sl*.34)),hh=H-pt-pb;
  const bars=arr.map((m,i)=>{
    const cx=pl+sl*(i+.5),a=(+m.stats.myXg||0),b=(+m.stats.oppXg||0),ha=a/mx*hh,hb=b/mx*hh,r=mres(m),L={w:"G",d:"B",l:"M"}[r];
    return `<g><title>${esc(m.on)} ${m.gf}–${m.ga} · xG ${xgN2(a)} – ${xgN2(b)}</title><rect class="ba" x="${(cx-bw-1).toFixed(1)}" y="${(pt+hh-ha).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1,ha).toFixed(1)}" rx="2"/><rect class="bb" x="${(cx+1).toFixed(1)}" y="${(pt+hh-hb).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1,hb).toFixed(1)}" rx="2"/><text class="${r}" x="${cx.toFixed(1)}" y="${H-8}" text-anchor="middle" font-weight="700">${L}</text></g>`;
  }).join("");
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Maç maç xG karşılaştırması"><line x1="${pl}" y1="${pt+hh}" x2="${W-pr}" y2="${pt+hh}"/><text x="${pl}" y="9" text-anchor="start">en yüksek ${xgN1(mx)} xG</text>${bars}</svg>`;
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
  if(n>=2){
    if(diff>=.5)ins.push(["pos","fin",`<b>Bitiriciliğin güçlü:</b> ${xgN1(totXg)} xG'lik pozisyondan ${totGf} gol çıkardın (${xgS2(diff)}). Kalıcı olması için şut kalitesini koru.`]);
    else if(diff<=-.5)ins.push(["neg","fin",`<b>Bitiricilik beklentinin altında:</b> ${xgN1(totXg)} xG'ye karşı ${totGf} gol (${xgS2(diff)}). Sakin bitirmeye odaklan.`]);
    else ins.push(["neu","fin",`<b>Gollerin pozisyonlarınla uyumlu:</b> ${totGf} gol, ${xgN1(totXg)} xG. Belirgin bir sapma yok.`]);
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
  const vdCls=n?xgVc(diff,.5):"neu";
  const statusTtl=!n?"Gelişmiş Analiz Hazır":diff>=.5?"Mükemmel Bitiricilik":diff<=-.5?"Bitiricilik Sorunu":"Dengeli Bitiricilik";
  const statusSub=!n?"Girilen maç istatistiklerine göre özet çıkarıldı.":diff>=.5?"Beklentinin üzerinde gol üretiyorsun.":diff<=-.5?"Pozisyon zenginliğine göre gol sayın düşük kalıyor.":"xG beklentisiyle paralel skor üretiyorsun.";
  const head=`<div class="xvd pxvd ${vdCls}"><span class="xvdi">${XGI.fin}</span><div class="xvdm"><b>${statusTtl}</b><span>${statusSub}</span><div class="xvdp"><span class="xvp"><b>${n}/${totalM}</b> xG maçı</span>${nx?`<span class="xvp"><b>${nx}</b> xPts maçı</span>`:""}${n?`<span class="xvp ${vdCls}"><b>${xgS2(diff)}</b> Gol−xG</span>`:""}</div></div></div>`;
  // --- 1. Gol beklentisi ---
  let gol="";
  if(n){
    const t=[xgTile(xgN1(totXg),"Üretilen xG",`gerçekte ${totGf} gol (${xgS2(diff)})`,diff>=.5?"Beklentinin üstünde gol attın: bitiricilik çok iyi.":diff<=-.5?"Pozisyonlar golle sonuçlanmadı: bitiricilik düşük.":"Gol sayın pozisyonlarınla uyumlu.",xgVc(diff,.5))];
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
    xgSec("Gol Beklentisi","Pozisyonların değeri ve gerçek goller",gol,false,"fin")+
    xgSec("Puan Beklentisi","Oyununa göre kaç puan toplamalıydın",puan,false,"pts")+
    xgSec("Şut Kalitesi","Şutların ne kadar tehlikeli ve isabetli",sut,true,"shot",convV!=null?`%${Math.round(convV)}`:(avgSh!=null?`${xgN1(avgSh)}/M`:""))+
    xgSec("Savunma & Kaleci","Rakibe verdiğin pozisyonlar ve kaleci",sav,true,"def",gkV!=null?`%${Math.round(gkV)}`:`${cs} temiz`)+
    xgSec("Oyun Kontrolü","Top ve pas hakimiyeti",kont,true,"ctrl",avgPos!=null?`%${Math.round(avgPos)} top`:(avgPas!=null?`%${Math.round(avgPas)} pas`:""))+
    xgSec("Hak Ediş Dağılımı","Sonuçlar oyununu yansıttı mı",hak,true,"hak",D.length?`${D.length} maç`:"")+
    xgSec("xG Trendi","Son maçlarda pozisyon üretimin",trend,true,"tr",XA.length>=3?`${Math.min(10,XA.length)} maç`:"")+
    gls);
}

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
  if(location.hash=="#kura")st.tab=2;else if(location.hash=="#mac"){st.tab=7;st.qs=true}
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

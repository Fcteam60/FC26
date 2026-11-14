// Yedekteki metin alanlarına HTML yüklemi koyar, tüm sekmeleri çizer, çıplak etiket kaçağı arar.  node tests/xss.js
const fs=require("fs"),vm=require("vm"),path=require("path");
const html=fs.readFileSync(path.join(__dirname,"..","index.html"),"utf8");
const src=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
const OUT=[];const Z=g=>'"><img src=x onerror=alert(1)>'+g;const P=Z('GEN');
const mkEl=()=>new Proxy(function(){},{get:(t,k)=>{if(k==="style"||k==="dataset"||k==="classList")return mkEl();if(k==="firstChild")return null;if(k==="textContent"||k==="value")return "";if(k==="innerHTML")return "";if(k===Symbol.toPrimitive)return()=>"";return mkEl()},set:(t,k,v)=>{if(k==="innerHTML"||k==="textContent"&&0)OUT.push(String(v));return true},apply:()=>mkEl()});
const mem={};
const doc=new Proxy({}, {get:(t,k)=>k==="addEventListener"?()=>{}:k==="hidden"?false:k==="getElementById"?()=>mkEl():mkEl(),set:()=>true});
const ctx={innerWidth:400,innerHeight:800,devicePixelRatio:1,document:doc,localStorage:{getItem:k=>(k in mem?mem[k]:null),setItem:(k,v)=>{mem[k]=String(v)},removeItem:k=>{delete mem[k]}},navigator:{userAgent:"node"},location:{origin:"x",href:"x",search:"",hash:""},history:{replaceState(){}},addEventListener(){},scrollTo(){},requestAnimationFrame(){},matchMedia:()=>({matches:false,addEventListener(){}}),performance,setTimeout:()=>0,clearTimeout(){},console,Date,Math,JSON,Intl,URL,TextEncoder,TextDecoder,atob,btoa,Blob:function(){},File:function(){},FileReader:function(){},Image:function(){},getComputedStyle:()=>({}),CSS:{supports:()=>false}};
ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
// önce temiz bir mağaza kur, sonra zehirli veriyi bellek içi mağazaya yaz
vm.runInContext(src+"\n;globalThis.__x={store:()=>store,T:()=>T,st,render,norm}",ctx);
const X=ctx.__x,T=X.T(),s=X.store().seasons[0];
X.store().owner=Z('OWN');s.name=Z('SNAME');s.oy={d:Z('OYD'),h:Z('OYH'),c:Z('OYC')};s.my=0;s.P=[0,1,2,3];s.G=[[0,1,2,3]];s.lk=true;
s.pl=[{n:Z('PLN'),g:3,a:1,m:2,mom:1,k:0,b:{g:3,a:1,m:2,mom:1,k:0},r:7}];
s.mt=[{id:1,opp:1,on:Z('MON'),rd:Z('MRD'),gf:2,ga:1,et:0,pf:null,pa:null,sc:{[Z('MSC')]:2},as:{[Z('MAS')]:1},mom:Z('MMOM'),stats:{myXg:1.2,oppXg:.5,myShots:5,mySot:2}},{id:2,opp:2,on:T[2].n,rd:"Grup",gf:0,ga:3,et:0,pf:null,pa:null,sc:{},as:{},mom:"",stats:null}];
X.norm();
X.store().trash=[{s:JSON.parse(JSON.stringify(s)),t:Date.now()}];
let errs=0;
for(const flag of [{}, {sum:s.id}, {ren:{id:s.id,v:P}}, {imp:{o:{owner:P,app:P,seasons:[s]},src:P}}, {ask:{m:P}}, {gs:true}]){
  for(let tab=0;tab<8;tab++){Object.keys(X.st).forEach(k=>{if(["sum","ren","imp","ask","gs"].includes(k))delete X.st[k]});Object.assign(X.st,flag,{tab});
    try{X.render()}catch(e){errs++;console.log("render hatası:",tab,JSON.stringify(flag).slice(0,40),e.message)}}}
const all=OUT.join("\n");
const found={};for(const m of all.matchAll(/<img src=x onerror=alert\(1\)>([A-Z]+)/g)){const k=m[1];const i=m.index;(found[k]=found[k]||[]).push(all.slice(Math.max(0,i-90),i).replace(/\s+/g,' '))}
const leak=Object.values(found).reduce((a,b)=>a+b.length,0);
for(const [k,v] of Object.entries(found))console.log('  SIZAN ALAN',k,'x'+v.length,'→ ...'+v[0].slice(-80));
const exampleIdx=all.indexOf("<img src=x");
console.log("çizilen HTML parçası:",OUT.length,"| toplam KB:",Math.round(all.length/1024),"| render hatası:",errs);
console.log("çıplak <img ...onerror> kaçağı:",leak);
if(leak)console.log("   örnek bağlam:",JSON.stringify(all.slice(Math.max(0,exampleIdx-120),exampleIdx+60)));
console.log("kaçışlı hâl görüldü mü:",all.includes("&lt;img src=x onerror=alert(1)&gt;")?"evet":"hayır (alanlar gösterilmemiş olabilir)");
process.exit(leak||errs?1:0);

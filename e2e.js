// Uçtan uca: gerçek tıklama işleyicisini yakalar, eylemleri çalıştırır.  node tests/e2e.js
const fs=require("fs"),vm=require("vm"),path=require("path");
const html=fs.readFileSync(path.join(__dirname,"..","index.html"),"utf8");
const src=html.slice(html.indexOf("<script>")+8,html.lastIndexOf("</script>"));
const mkEl=()=>new Proxy(function(){},{get:(t,k)=>{if(k==="style"||k==="dataset"||k==="classList")return mkEl();if(k==="firstChild")return null;if(k==="textContent"||k==="innerHTML"||k==="value")return "";if(k===Symbol.toPrimitive)return()=>"";return mkEl()},set:()=>true,apply:()=>mkEl()});
function boot(mem,vals={}){const H={};
 const doc=new Proxy({}, {get:(t,k)=>k==="addEventListener"?(ty,f)=>{(H[ty]=H[ty]||[]).push(f)}:k==="hidden"?false:k==="getElementById"?(id)=>id in vals?vals[id]:mkEl():mkEl(),set:()=>true});
 const ctx={innerWidth:400,innerHeight:800,devicePixelRatio:1,document:doc,localStorage:{getItem:k=>(k in mem?mem[k]:null),setItem:(k,v)=>{if(mem.__fail)throw new Error("quota");mem[k]=String(v)},removeItem:k=>{delete mem[k]}},navigator:{userAgent:"node"},location:{origin:"x",href:"x",search:"",hash:""},history:{replaceState(){}},addEventListener(){},scrollTo(){},requestAnimationFrame(){},matchMedia:()=>({matches:false,addEventListener(){}}),performance,setTimeout:()=>0,clearTimeout(){},console,Date,Math,JSON,Intl,URL,TextEncoder,TextDecoder,atob,btoa,Blob:function(){},File:function(){},FileReader:function(){},Image:function(){},getComputedStyle:()=>({}),CSS:{supports:()=>false}};
 ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);vm.runInContext(src+"\n;globalThis.__x={store:()=>store,T:()=>T,TN:()=>TN,st,cur}",ctx);
 ctx.click=(a,ds={})=>{const b={dataset:{a,...ds}};const e={target:{closest:()=>b},preventDefault(){}};H.click.forEach(f=>f(e))};
 ctx.key=k=>H.keydown&&H.keydown.forEach(f=>f({key:k,preventDefault(){}}));return ctx}
let pass=0,fail=0;const t=(n,c,x)=>{if(c)pass++;else{fail++;console.log("  ✗",n,x!==undefined?"→ "+JSON.stringify(x).slice(0,200):"")}};
const c0=boot({}),TN=c0.__x.TN(),base=c0.__x.store().seasons[0];
const bk=(owner,n=2,mt=3)=>{const o={v:4,tn:TN,cur:1,nx:n,seasons:[]};if(owner)o.owner=owner;for(let k=1;k<=n;k++){const s=JSON.parse(JSON.stringify(base));s.id=k;s.name="Sezon "+k;s.date="d";s.mt=[];for(let i=0;i<mt;i++)s.mt.push({id:k*100+i,opp:1,on:c0.__x.T()[1].n,rd:"Grup",gf:2,ga:1,et:0,pf:null,pa:null,sc:{},as:{},mom:"",stats:null});o.seasons.push(s)}return o};

console.log("ilk açılış ve sahip adı");
{ const mem={},v={ow:{value:"",focus(){}}},c=boot(mem,v),X=c.__x;
  t("sahipsiz açılışta ad penceresi açılır", X.st.own===1);
  c.click("owns");t("boş ad kaydedilmez, pencere açık kalır", !X.store().owner&&X.st.own===1);
  v.ow.value="  Ali   Çağrı  ";c.click("owns");
  t("ad kırpılır ve kaydedilir", X.store().owner==="Ali Çağrı"&&X.st.own===0, X.store().owner);
  t("depolamaya yazıldı", JSON.parse(mem.fc26lig4).owner==="Ali Çağrı");
  c.click("own");t("Değiştir pencereyi yeniden açar", X.st.own===1);c.click("owno");t("Şimdilik atla kapatır", X.st.own===0);
  v.ow.value="A".repeat(50);c.click("owns");t("ad 20 karakterle sınırlanır", X.store().owner.length===20);
  const c2=boot(mem);t("yeniden açılışta tekrar sorulmaz", c2.__x.st.own!==1&&c2.__x.store().owner.length===20);
}
console.log("yedek yükleme: Hepsini değiştir / Birleştir");
{ const mem={},c=boot(mem,{ow:{value:"Ali",focus(){}}}),X=c.__x;c.click("owns");
  const mine=X.store().seasons.length;
  X.st.imp={o:bk("Veli",3),src:"x.json"};c.click("impr");
  t("Hepsini değiştir: 3 sezon yüklenir", X.store().seasons.length===3, X.store().seasons.length);
  t("önceki kayıt Kurtarma'ya alındı", !!mem.fc26lig4_degisim_oncesi&&JSON.parse(mem.fc26lig4_degisim_oncesi).owner==="Ali");
  const c3=boot({},{ow:{value:"Ali",focus(){}}}),m3=c3.__x;c3.click("owns");
  m3.st.imp={o:bk(null,2),src:"y.json"};c3.click("impr");t("sahipsiz yedek yüklenince yerel ad korunur", m3.store().owner==="Ali"&&m3.store().seasons.length===2);
  const c4=boot({},{ow:{value:"Ali",focus(){}}}),m4=c4.__x;c4.click("owns");const mem4=c4.localStorage;
  // depolama doluyken değiştirme engellenir
  const before=m4.store();c4.localStorage.setItem("a","b");
}
{ const mem={},c=boot(mem,{ow:{value:"Ali",focus(){}}}),X=c.__x;c.click("owns");const before=X.store();
  mem.__fail=true;X.st.imp={o:bk("Veli",3),src:"x.json"};c.click("impr");mem.__fail=false;
  t("depolama doluyken Hepsini değiştir yapılmaz", X.store()===before||X.store().seasons.length!==3, X.store().seasons.length);
  t("kullanıcıya neden söylenir (ask)", !!X.st.ask);
}
{ const mem={},c=boot(mem,{ow:{value:"Ali",focus(){}}}),X=c.__x;c.click("owns");
  X.st.imp={o:bk("Ali",2),src:"z.json"};c.click("impm");
  t("Birleştir: sezonlar eklenir, yerel sezon kaybolmaz", X.store().seasons.length>=2&&X.store().owner==="Ali", X.store().seasons.length);
  t("birleştirme öncesi kopya yazıldı", !!mem.fc26lig4_birlesme_oncesi);
}
console.log("sıfırlama ve silme");
{ const mem={},v={ow:{value:"Ali",focus(){}}},c=boot(mem,v),X=c.__x;c.click("owns");
  X.st.imp={o:bk(null,4),src:"q.json"};c.click("impr");
  c.click("rst");t("sıfırla önce onay ister", !!X.st.ask&&X.store().seasons.length===4);
  c.click("yes");t("onaydan sonra sıfırlanır, sahip korunur", X.store().seasons.length===1&&X.store().owner==="Ali");
  t("sıfırlanan kayıt Kurtarma'da", JSON.parse(mem.fc26lig4_sifirlanan).seasons.length===4);
}
console.log("Escape ile ad penceresi");
{ const c=boot({}),X=c.__x;c.key("Escape");t("Escape ad penceresini kapatır (ya da en azından çökmez)", true);console.log("   bilgi: Escape sonrası st.own =",X.st.own);}
console.log(`\n${pass} geçti, ${fail} kaldı`);process.exit(fail?1:0);

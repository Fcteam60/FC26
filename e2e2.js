const fs=require("fs");let s=fs.readFileSync(__dirname+"/e2e.js","utf8");
s=s.slice(0,s.indexOf('console.log("ilk açılış ve sahip adı")'));
const L=new Function("require","__dirname",s+";return {boot,t,get pass(){return pass},get fail(){return fail}}")(require,__dirname);const {boot,t}=L;
const src2=fs.readFileSync(__dirname+"/../index.html","utf8");
const mem={},v={ow:{value:"Ali",focus(){}}},c=boot(mem,v),X=c.__x;c.click("owns");
const sn=X.store().seasons[0];sn.my=0;sn.P=[0,1,2,3];sn.G=[[0,1,2,3]];sn.lk=true;
console.log("maç kaydet / sil / geri al");
X.st.mop=1;X.st.mrd="Grup";X.st.mg=3;X.st.mo=1;X.st.qs=true;
let err=null;try{c.click("msave")}catch(e){err=e}
const S=()=>X.store().seasons[0];
t("maç kaydı hata vermez",!err,err&&err.message);
t("maç eklendi, G=1, gol 3-1",S().mt.length===1&&S().ts.w===1&&S().ts.gf===3&&S().ts.ga===1,S().ts);
t("depolamaya yazıldı",JSON.parse(mem.fc26lig4).seasons[0].mt.length===1);
t("tahmin (pr) maça yazıldı",Array.isArray(S().mt[0].pr));
const id=S().mt[0].id;
c.click("mdel",{id:String(id)});t("maç silinir, toplamlar sıfırlanır",S().mt.length===0&&S().ts.gf===0,S().ts);
c.click("undo");t("geri al maçı döndürür",S().mt.length===1&&S().ts.gf===3,S().mt.length);
// beraberlik/penaltı
X.st.mop=2;X.st.mrd="Çeyrek Final";X.st.mg=1;X.st.mo=1;X.st.mu=1;X.st.mp=1;X.st.mpf=4;X.st.mpa=5;X.st.qs=true;c.click("msave");
const pm=S().mt[1];t("penaltı yenilgisi: skor 1-1, penaltı 4-5, sonuç mağlubiyet",pm&&pm.pf===4&&pm.pa===5&&pm.pf<pm.pa,pm&&[pm.pf,pm.pa]);
console.log("tüm eylemleri sırayla çalıştır (çökme avı)");
const used=[...new Set([...src2.matchAll(/data-a=\\?"([A-Za-z0-9_]+)\\?"/g)].map(m=>m[1]))].filter(a=>!["rst","yes","impr","impm","trse","delall"].includes(a));
const bad=[];const sid=String(S().id),mid=String(S().mt[0].id);
for(const a of used){const mm=boot({},{ow:{value:"Ali",focus(){}},pn:{value:"Test Oyuncu"},trinp:{value:"Test"},rn:{value:"Yeni"}}),Y=mm.__x;mm.click("owns");const q=Y.store().seasons[0];q.my=0;q.P=[0,1,2,3];q.G=[[0,1,2,3]];q.lk=true;q.mt=JSON.parse(JSON.stringify(S().mt));Y.st.mop=1;Y.st.mrd="Grup";
  for(const ds of [{id:String(q.id),i:"0",v:"1",k:"sc",g:"0",d:"1"},{id:mid,i:"0",v:"0",k:"g",g:"0",d:"-1"}]){try{mm.click(a,ds)}catch(e){bad.push(a+": "+e.message.slice(0,90));break}}}
console.log("denenen eylem:",used.length,"| hata veren:",bad.length);bad.forEach(b=>console.log("  ·",b));
console.log(`\n${L.pass} geçti, ${L.fail} kaldı`);process.exit(L.fail?1:0);

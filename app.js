const $=s=>document.querySelector(s),app=$('#app');
const usd=n=>'$'+n.toLocaleString('en-US'),jl=n=>n>=999?'Seumur Hidup':n===0?'—':n+' '+UNIT;
const TP={F:'Felony',M:'Misdemeanor',I:'Infraction'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const BASE={moto:325,car:650,com:487.5,sport:812.5},VT={moto:'Motorcycles',car:'Cars',com:'Commercial',sport:'Sport'};
let kit='P',q='',kat='',tip='',saved=[],hist=[],calc={},kq='',dyn={vt:'car',lv:1};
try{saved=JSON.parse(localStorage.getItem('pr_saved')||'[]').filter(k=>ALL.some(e=>e.id===k));hist=JSON.parse(localStorage.getItem('pr_hist')||'[]')}catch(e){}
const persist=()=>{try{localStorage.setItem('pr_saved',JSON.stringify(saved));localStorage.setItem('pr_hist',JSON.stringify(hist))}catch(e){}};
const get=id=>ALL.find(e=>e.id===id),catName=e=>KIT[e.kit].cats[e.cat],pre=e=>KIT[e.kit].pre+' '+e.k;
const dynFine=()=>Math.round(BASE[dyn.vt]*Math.ceil(Math.max(1,Math.min(50,dyn.lv||1))/5));
const fineOf=e=>e.dyn?dynFine():e.fine,pts=e=>{const m=/\+(\d) Poin SIM/.exec(e.note);return m?+m[1]:0};
function go(v){location.hash=v}
function addHist(t){t=t.trim();if(!t)return;hist=[t,...hist.filter(x=>x!==t)].slice(0,30);persist()}
function toggle(k){saved=saved.includes(k)?saved.filter(x=>x!==k):[...saved,k];persist();render()}
function filt(){const s=q.toLowerCase();return ALL.filter(e=>(kit==='A'||e.kit===kit)&&(!kat||e.cat===kat)&&(!tip||e.tipe===tip)&&(!s||(pre(e)+' '+e.nama+' '+e.desc+' '+e.note+' '+catName(e)+' '+TP[e.tipe]+' '+e.fine).toLowerCase().includes(s)))}
function rows(list){
 if(!list.length)return '<div class="empty">Tidak ada pasal yang cocok.</div>';
 return '<div class="tbl"><table><tr><th>PASAL</th><th>PELANGGARAN</th><th>TIPE</th><th>PENJARA</th><th>DENDA</th><th></th></tr>'+list.map(e=>`<tr><td class="kode">${pre(e)}</td><td><b>${esc(e.nama)}</b><br><span class="mut sm">${esc(e.desc)}</span>${e.note?`<br><span class="nt">${esc(e.note)}</span>`:''}<br><span class="mut sm">${KIT[e.kit].nama} · ${catName(e)}</span></td><td><span class="bd ${e.tipe}">${TP[e.tipe]}</span></td><td>${jl(e.jail)}</td><td>${e.dyn?'Dinamis':usd(e.fine)}</td><td><button class="star ${saved.includes(e.id)?'on':''}" onclick="toggle('${e.id}')" aria-label="Simpan">★</button></td></tr>`).join('')+'</table></div>'}

function dash(){
 const hrg=k=>FORMS[k].harga?' · '+FORMS[k].harga.map(h=>usd(h[1])).join(' / '):'';
 const cards=[['pasal','Browse Pasal','Penal Code ('+DATA.length+') dan Vehicle Code ('+VDATA.length+')'],['senjata','Lisensi Senjata','CCW license untuk Pistol atau Shotgun'+hrg('senjata')],['trucker','Lisensi Trucker','Lisensi Low atau Heavy Trucker'+hrg('trucker')],['event','Event Registration','Daftarkan event dan minta bantuan LSPD'],['kalkulator','Kalkulator Pasal','Hitung denda, penjara, dan poin SIM']];
 const cc=(k,n,c)=>`<div class="card cat" onclick="kit='${k}';kat='${c}';q='';tip='';go('pasal');render()"><span class="n">${KIT[k].nama.toUpperCase()} ${c}</span><b>${n}</b><span class="mut sm">${ALL.filter(e=>e.kit===k&&e.cat===c).length} pasal</span></div>`;
 return `<h1>Selamat datang, LSPD Rebelions</h1><p class="mut">Database pasal, pengajuan lisensi dan event, serta kalkulator sanksi.</p>
 <div class="stats"><div class="card"><span class="mut">Penal Code</span><b>${DATA.length}</b></div><div class="card"><span class="mut">Vehicle Code</span><b>${VDATA.length}</b></div><div class="card"><span class="mut">Felony</span><b>${ALL.filter(e=>e.tipe==='F').length}</b></div><div class="card"><span class="mut">Disimpan</span><b>${saved.length}</b></div></div>
 <div class="cats">${cards.map(([k,n,s],i)=>`<a class="card cat" href="#${k}"><span class="n">${i+1}</span><b>${n}</b><span class="mut sm">${s}</span></a>`).join('')}</div>
 <div class="card"><h2>Cari pasal</h2><input type="search" id="qd" placeholder="Kode, nama pelanggaran, kata kunci… (Ctrl+K)" value="${esc(q)}">
 <div class="row"><button onclick="doSearch($('#qd').value)">Cari</button><span class="mut sm">Sering dicari:</span>${['Murder','Narcotics','DUI','Speeding','License'].map(t=>`<button class="chip" onclick="doSearch('${t}')">${t}</button>`).join('')}</div></div>
 <h2>Penal Code</h2><div class="cats">${Object.entries(CATS).map(([c,n])=>cc('P',n,c)).join('')}</div>
 <h2>Vehicle Code</h2><div class="cats">${Object.entries(CATS_V).map(([c,n])=>cc('V',n,c)).join('')}</div>`}

function formPage(k){
 const f=FORMS[k];
 const steps=['Siapkan data yang diminta di format surat.','Klik Salin format di bawah.','Klik Buka channel Discord, lalu tempel format di channel tersebut.','Isi semua bagian, kirim, lalu tunggu persetujuan LSPD.'];
 return `<h1>${f.judul}</h1><p class="mut">${f.sub}</p>
 <div class="kgrid"><div class="card"><h2>Tentang pengajuan ini</h2><ul class="ul">${f.info.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>
 ${f.harga?`<h2 style="margin-top:14px">Biaya lisensi</h2>${f.harga.map(([a,p])=>`<div class="lic"><span>${a}</span><b>${usd(p)}</b></div>`).join('')}`:''}</div>
 <div class="card"><h2>Ketentuan</h2><ul class="ul">${f.ket.map(i=>`<li>${esc(i)}</li>`).join('')}</ul><h2 style="margin-top:14px">Cara mengajukan</h2><ol class="ul">${steps.map(i=>`<li>${i}</li>`).join('')}</ol></div></div>
 <div class="card"><h2>Format surat pengajuan</h2><div class="row" style="margin:0 0 12px"><button id="cp" onclick="copyTpl('${k}',this)">Salin format</button><a class="btn ghost" href="${f.url}" target="_blank" rel="noopener">Buka channel Discord ↗</a></div><pre class="tpl">${esc(f.tpl)}</pre></div>`}
function copyTpl(k,b){
 const t=FORMS[k].tpl,done=()=>{b.textContent='Tersalin ✓';setTimeout(()=>b.textContent='Salin format',2000)};
 const fb=()=>{const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove();done()};
 try{navigator.clipboard.writeText(t).then(done,fb)}catch(e){fb()}}

function koleksi(){
 const tabs=[['P','Penal Code ('+DATA.length+')'],['V','Vehicle Code ('+VDATA.length+')'],['A','Semua ('+ALL.length+')']];
 const cats=kit==='A'?'':`<div class="row"><button class="chip ${!kat?'on':''}" onclick="kat='';render()">Semua kategori</button>${Object.entries(KIT[kit].cats).map(([k,n])=>`<button class="chip ${kat===k?'on':''}" onclick="kat='${k}';render()">${k}. ${n}</button>`).join('')}</div>`;
 return `<h1>Browse Pasal</h1><div class="card"><div class="row" style="margin:0 0 12px">${tabs.map(([k,n])=>`<button class="chip ${kit===k?'on':''}" onclick="kit='${k}';kat='';tip='';render()">${n}</button>`).join('')}</div>
 <input type="search" id="qk" placeholder="Cari kode, nama, kata kunci, atau denda…" value="${esc(q)}">${cats}
 <div class="row"><button class="chip ${!tip?'on':''}" onclick="tip='';render()">Semua tipe</button>${Object.entries(TP).map(([k,n])=>`<button class="chip ${tip===k?'on':''}" onclick="tip='${k}';render()">${n}</button>`).join('')}</div></div>
 <div class="card" id="list">${rows(filt())}</div>`}

function kalkulator(){return `<h1>Kalkulator pasal</h1><p class="mut">Klik pasal yang dilanggar (Penal Code atau Vehicle Code), atur jumlahnya, total dihitung otomatis.</p><div class="kgrid"><div class="card"><h2>Pilih pasal</h2><input type="search" id="kq" placeholder="Cari pasal…" value="${esc(kq)}"><div id="kres" style="margin-top:10px"></div></div><div class="card"><h2>Perhitungan</h2><div id="kcart"></div></div></div>`}
function totals(){let den=0,tm=0,life=false,f=0,p=0;Object.keys(calc).forEach(k=>{const e=get(k),n=calc[k];den+=fineOf(e)*n;if(e.jail>=999)life=true;else tm+=e.jail*n;if(e.tipe==='F')f+=n;p+=pts(e)*n});return{den,life,tm,f,p}}
function kfill(){
 const s=kq.toLowerCase();
 const r=ALL.filter(e=>!s||(pre(e)+' '+e.nama+' '+e.desc).toLowerCase().includes(s));
 $('#kres').innerHTML=r.length?r.map(e=>`<div class="pick" onclick="qty('${e.id}',1)"><span class="kode">${pre(e)}</span> <b>${esc(e.nama)}</b> <span class="bd ${e.tipe}">${TP[e.tipe]}</span><br><span class="mut sm">${e.dyn?'Dinamis':usd(e.fine)} · ${jl(e.jail)}</span></div>`).join(''):'<div class="empty">Tidak ada pasal.</div>';
 const it=Object.keys(calc).map(k=>{const e=get(k),n=calc[k];return `<div class="citem"><div class="top"><div><span class="kode">${pre(e)}</span> ${esc(e.nama)}<br><span class="mut sm">${usd(fineOf(e))} · ${jl(e.jail)}${pts(e)?' · +'+pts(e)+' Poin SIM':''}</span></div><div class="qty"><button class="ghost" onclick="qty('${k}',-1)">−</button><b>${n}</b><button class="ghost" onclick="qty('${k}',1)">+</button></div></div>${e.dyn?`<div class="dynbox"><select onchange="dyn.vt=this.value;kfill()">${Object.entries(VT).map(([a,b])=>`<option value="${a}" ${dyn.vt===a?'selected':''}>${b}</option>`).join('')}</select><input type="number" min="1" max="50" value="${dyn.lv}" onchange="dyn.lv=+this.value;kfill()" aria-label="Level kendaraan"></div><span class="mut sm">Pilih jenis kendaraan dan level (1-50)</span>`:''}</div>`}).join('');
 const t=totals();
 $('#kcart').innerHTML=(it||'<div class="empty">Belum ada pasal dipilih.</div>')+`<div class="tot"><div><span class="mut">Total denda</span><b>${usd(t.den)}</b></div><div><span class="mut">Total penjara</span><b>${t.life?'Seumur Hidup':t.tm+' '+UNIT}</b></div><div><span class="mut">Felony</span><b>${t.f}</b></div>${t.p?`<div><span class="mut">Poin SIM</span><b>+${t.p}</b></div>`:''}</div><div class="row"><button onclick="copyK()">Salin ringkasan</button><button class="ghost" onclick="calc={};kfill()">Reset</button></div>`}
function qty(k,n){calc[k]=(calc[k]||0)+n;if(calc[k]<=0)delete calc[k];kfill()}
function copyK(){const t=totals();let s='Perhitungan pasal:\n';Object.keys(calc).forEach(k=>{const e=get(k);s+='- '+pre(e)+' '+e.nama+' x'+calc[k]+(e.dyn?' ('+VT[dyn.vt]+' Lvl '+dyn.lv+')':'')+'\n'});s+='Total denda: '+usd(t.den)+'\nTotal penjara: '+(t.life?'Seumur Hidup':t.tm+' '+UNIT);if(t.p)s+='\nPoin SIM: +'+t.p;const a=document.createElement('textarea');a.value=s;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove()}
function disimpan(){return `<h1>Disimpan</h1><div class="card">${saved.length?rows(ALL.filter(e=>saved.includes(e.id))):'<div class="empty">Belum ada pasal tersimpan. Tekan ★ pada pasal untuk menyimpan.</div>'}</div>`}
function riwayat(){return `<h1>Riwayat pencarian</h1><div class="card">${hist.length?hist.map(h=>`<button class="chip" style="margin:3px" onclick="doSearch(this.textContent)">${esc(h)}</button>`).join('')+'<div class="row"><button class="ghost" onclick="hist=[];persist();render()">Hapus riwayat</button></div>':'<div class="empty">Belum ada riwayat pencarian.</div>'}</div>`}
function doSearch(t){q=t;kit='A';kat='';tip='';addHist(t);if(location.hash==='#pasal')render();else go('pasal')}

const NAV=[['dashboard','Dashboard'],['pasal','Browse Pasal'],['senjata','Lisensi Senjata'],['trucker','Lisensi Trucker'],['event','Event Registration'],['kalkulator','Kalkulator'],['disimpan','Disimpan'],['riwayat','Riwayat']];
function render(){
 const v=(location.hash||'#dashboard').slice(1);
 const V={dashboard:dash,pasal:koleksi,senjata:()=>formPage('senjata'),trucker:()=>formPage('trucker'),event:()=>formPage('event'),kalkulator:kalkulator,disimpan:disimpan,riwayat:riwayat};
 const cur=V[v]?v:'dashboard';
 $('#nav').innerHTML=NAV.map(([k,n])=>`<a href="#${k}" class="${k===cur?'on':''}">${n}</a>`).join('');
 app.innerHTML=V[cur]();
 const qk=$('#qk');if(qk){qk.oninput=e=>{q=e.target.value;$('#list').innerHTML=rows(filt())};qk.onchange=e=>addHist(e.target.value)}
 if(cur==='kalkulator'){kfill();$('#kq').oninput=e=>{kq=e.target.value;kfill()}}
 const qd=$('#qd');if(qd)qd.onkeydown=e=>{if(e.key==='Enter')doSearch(qd.value)};
}
addEventListener('hashchange',()=>{render();scrollTo(0,0)});
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();go('dashboard');setTimeout(()=>{const i=$('#qd');if(i)i.focus()},50)}});
render();

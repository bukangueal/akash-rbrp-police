const $=s=>document.querySelector(s),app=$('#app');
const usd=n=>'$'+n.toLocaleString('en-US'),jl=n=>n>=999?'Seumur Hidup':n+' '+UNIT,tp=t=>t==='F'?'Felony':'Misdemeanor';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cat=d=>d[0].split('.')[0];
let q='',kat='',tip='',saved=[],hist=[],calc={},kq='';
try{saved=JSON.parse(localStorage.getItem('pr_saved')||'[]').filter(k=>DATA.some(d=>d[0]===k));hist=JSON.parse(localStorage.getItem('pr_hist')||'[]')}catch(e){}
const persist=()=>{try{localStorage.setItem('pr_saved',JSON.stringify(saved));localStorage.setItem('pr_hist',JSON.stringify(hist))}catch(e){}};
function go(v){location.hash=v}
function addHist(t){t=t.trim();if(!t)return;hist=[t,...hist.filter(x=>x!==t)].slice(0,30);persist()}
function toggle(k){saved=saved.includes(k)?saved.filter(x=>x!==k):[...saved,k];persist();render()}
function filt(){const s=q.toLowerCase();return DATA.filter(d=>(!kat||cat(d)===kat)&&(!tip||d[3]===tip)&&(!s||(d[0]+' '+d[1]+' '+d[2]+' '+CATS[cat(d)]+' '+tp(d[3])+' '+d[5]).toLowerCase().includes(s)))}
function rows(list){
 if(!list.length)return '<div class="empty">Tidak ada pasal yang cocok.</div>';
 return '<div class="tbl"><table><tr><th>PASAL</th><th>PELANGGARAN</th><th>TIPE</th><th>PENJARA</th><th>DENDA</th><th></th></tr>'+list.map(d=>`<tr><td class="kode">§ ${d[0]}</td><td><b>${esc(d[1])}</b><br><span class="mut sm">${esc(d[2])}</span><br><span class="mut sm">${CATS[cat(d)]}</span></td><td><span class="bd ${d[3]}">${tp(d[3])}</span></td><td>${jl(d[4])}</td><td>${usd(d[5])}</td><td><button class="star ${saved.includes(d[0])?'on':''}" onclick="toggle('${d[0]}')" aria-label="Simpan">★</button></td></tr>`).join('')+'</table></div>'}
function dash(){
 const top=[...DATA].sort((a,b)=>b[4]-a[4]).slice(0,5);
 return `<h1>Selamat datang, LSPD Rebelions</h1><p class="mut">Database pasal, kalkulator sanksi, dan daftar harga lisensi.</p>
 <div class="stats"><div class="card"><span class="mut">Total pasal</span><b>${DATA.length}</b></div><div class="card"><span class="mut">Felony</span><b>${DATA.filter(d=>d[3]==='F').length}</b></div><div class="card"><span class="mut">Misdemeanor</span><b>${DATA.filter(d=>d[3]==='M').length}</b></div><div class="card"><span class="mut">Disimpan</span><b>${saved.length}</b></div></div>
 <div class="card" style="margin-top:14px"><h2>Pasal apa yang sedang kamu cari?</h2><p class="mut sm" style="margin:0 0 10px">Ketik kode, nama pelanggaran, kata kunci, kategori, atau nominal denda. (Ctrl+K)</p>
 <input type="search" id="qd" placeholder="Cari pasal…" value="${esc(q)}">
 <div class="row"><button onclick="doSearch($('#qd').value)">Cari pasal</button><span class="mut sm">Sering dicari:</span>${['Murder','Narcotics','DUI','Theft','Firearm'].map(t=>`<button class="chip" onclick="doSearch('${t}')">${t}</button>`).join('')}</div></div>
 <div class="row" style="margin:0 0 14px"><a class="btn" href="#kalkulator">Buka kalkulator sanksi</a><a class="btn ghost" style="border:1px solid var(--bd);color:var(--ac);background:transparent" href="#lisensi">Harga lisensi</a></div>
 <h2>Kategori pasal</h2><div class="cats">${Object.entries(CATS).map(([k,n])=>`<div class="card cat" onclick="kat='${k}';q='';tip='';go('pasal');render()"><span class="n">KATEGORI ${k}</span><b>${n}</b><span class="mut sm">${DATA.filter(d=>cat(d)===k).length} pasal</span></div>`).join('')}</div>
 <div class="card"><h2>Hukuman terberat</h2>${rows(top)}</div>`}
function koleksi(){
 return `<h1>Koleksi pasal</h1><div class="card"><input type="search" id="qk" placeholder="Cari kode, nama, kata kunci, atau denda…" value="${esc(q)}">
 <div class="row"><button class="chip ${!kat?'on':''}" onclick="kat='';render()">Semua kategori</button>${Object.entries(CATS).map(([k,n])=>`<button class="chip ${kat===k?'on':''}" onclick="kat='${k}';render()">${k}. ${n}</button>`).join('')}</div>
 <div class="row"><button class="chip ${!tip?'on':''}" onclick="tip='';render()">Semua tipe</button><button class="chip ${tip==='F'?'on':''}" onclick="tip='F';render()">Felony</button><button class="chip ${tip==='M'?'on':''}" onclick="tip='M';render()">Misdemeanor</button></div></div>
 <div class="card" id="list">${rows(filt())}</div>`}
function kalkulator(){return `<h1>Kalkulator denda &amp; penjara</h1><p class="mut">Klik pasal yang dilanggar, atur jumlahnya, total dihitung otomatis.</p><div class="kgrid"><div class="card"><h2>Pilih pasal</h2><input type="search" id="kq" placeholder="Cari pasal…" value="${esc(kq)}"><div id="kres" style="margin-top:10px"></div></div><div class="card"><h2>Perhitungan</h2><div id="kcart"></div></div></div>`}
function totals(){let den=0,tm=0,life=false,f=0;Object.keys(calc).forEach(k=>{const d=DATA.find(x=>x[0]===k),n=calc[k];den+=d[5]*n;if(d[4]>=999)life=true;else tm+=d[4]*n;if(d[3]==='F')f+=n});return{den,life,tm,f}}
function kfill(){
 const s=kq.toLowerCase();
 const r=DATA.filter(d=>!s||(d[0]+' '+d[1]+' '+d[2]).toLowerCase().includes(s));
 $('#kres').innerHTML=r.length?r.map(d=>`<div class="pick" onclick="qty('${d[0]}',1)"><span class="kode">${d[0]}</span> <b>${esc(d[1])}</b> <span class="bd ${d[3]}">${tp(d[3])}</span><br><span class="mut sm">${usd(d[5])} · ${jl(d[4])}</span></div>`).join(''):'<div class="empty">Tidak ada pasal.</div>';
 const it=Object.keys(calc).map(k=>{const d=DATA.find(x=>x[0]===k),n=calc[k];return `<div class="citem"><div><span class="kode">${k}</span> ${esc(d[1])}<br><span class="mut sm">${usd(d[5])} · ${jl(d[4])}</span></div><div class="qty"><button class="ghost" onclick="qty('${k}',-1)">−</button><b>${n}</b><button class="ghost" onclick="qty('${k}',1)">+</button></div></div>`}).join('');
 const t=totals();
 $('#kcart').innerHTML=(it||'<div class="empty">Belum ada pasal dipilih.</div>')+`<div class="tot"><div><span class="mut">Total denda</span><b>${usd(t.den)}</b></div><div><span class="mut">Total penjara</span><b>${t.life?'Seumur Hidup':t.tm+' '+UNIT}</b></div><div><span class="mut">Felony</span><b>${t.f}</b></div></div><div class="row"><button onclick="copyK()">Salin ringkasan</button><button class="ghost" onclick="calc={};kfill()">Reset</button></div>`}
function qty(k,n){calc[k]=(calc[k]||0)+n;if(calc[k]<=0)delete calc[k];kfill()}
function copyK(){const t=totals();let s='Perhitungan pasal:\n';Object.keys(calc).forEach(k=>{const d=DATA.find(x=>x[0]===k);s+='- '+k+' '+d[1]+' x'+calc[k]+'\n'});s+='Total denda: '+usd(t.den)+'\nTotal penjara: '+(t.life?'Seumur Hidup':t.tm+' '+UNIT);const a=document.createElement('textarea');a.value=s;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove()}
function lisensi(){return `<h1>Harga lisensi</h1><p class="mul mut">Los Santos Police Department · Licensing Division</p><div class="kgrid">${LIC.map(([n,l])=>`<div class="card"><h2>${n}</h2>${l.map(([a,p])=>`<div class="lic"><span>${a}</span><b>${usd(p)}</b></div>`).join('')}</div>`).join('')}</div><div class="card"><h2>Ketentuan lisensi</h2>${REG.map(r=>`<p style="margin:6px 0">• ${r}</p>`).join('')}<p class="mut sm">To Protect and To Serve</p></div>`}
function disimpan(){return `<h1>Disimpan</h1><div class="card">${saved.length?rows(DATA.filter(d=>saved.includes(d[0]))):'<div class="empty">Belum ada pasal tersimpan. Tekan ★ pada pasal untuk menyimpan.</div>'}</div>`}
function riwayat(){return `<h1>Riwayat pencarian</h1><div class="card">${hist.length?hist.map(h=>`<button class="chip" style="margin:3px" onclick="doSearch(this.textContent)">${esc(h)}</button>`).join('')+'<div class="row"><button class="ghost" onclick="hist=[];persist();render()">Hapus riwayat</button></div>':'<div class="empty">Belum ada riwayat pencarian.</div>'}</div>`}
function doSearch(t){q=t;kat='';tip='';addHist(t);if(location.hash==='#pasal')render();else go('pasal')}
function render(){
 const v=(location.hash||'#dashboard').slice(1);
 const V={dashboard:dash,pasal:koleksi,kalkulator:kalkulator,lisensi:lisensi,disimpan:disimpan,riwayat:riwayat};
 const cur=V[v]?v:'dashboard';
 $('#nav').innerHTML=[['dashboard','Dashboard'],['pasal','Pasal ('+DATA.length+')'],['kalkulator','Kalkulator'],['lisensi','Lisensi'],['disimpan','Disimpan'],['riwayat','Riwayat']].map(([k,n])=>`<a href="#${k}" class="${k===cur?'on':''}">${n}</a>`).join('');
 app.innerHTML=V[cur]();
 const qk=$('#qk');if(qk){qk.oninput=e=>{q=e.target.value;$('#list').innerHTML=rows(filt())};qk.onchange=e=>addHist(e.target.value)}
 if(cur==='kalkulator'){kfill();$('#kq').oninput=e=>{kq=e.target.value;kfill()}}
 const qd=$('#qd');if(qd)qd.onkeydown=e=>{if(e.key==='Enter')doSearch(qd.value)};
}
addEventListener('hashchange',render);
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();go('dashboard');setTimeout(()=>{const i=$('#qd');if(i)i.focus()},50)}});
render();

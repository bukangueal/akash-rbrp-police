// DATA PASAL & LISENSI. Edit file ini untuk menambah/mengubah pasal.
const UNIT='menit';
const CATS={1:'Crimes Against Person',2:'Sexual Assault & Public Decency',3:'Public Health & Safety',4:'Public Peace',5:'Crimes Against Property',6:'Public Justice',7:'Crimes With A Vehicle',8:'Weapon & Firearm Violations'};
// [kode, nama, deskripsi, tipe (M/F), penjara, denda]
const DATA=[
['1.1','Criminal Threats','Mengancam melukai atau membunuh orang lain/kerabatnya.','M',30,500],
['1.2','Assault & Battery Biasa','Mencoba atau berhasil melukai fisik warga sipil.','M',25,600],
['1.3','Assault on State Employee','Melukai penegak hukum atau pegawai negeri.','M',40,700],
['1.4','Aggravated Assault','Melukai menggunakan senjata mematikan/menyebabkan luka berat.','F',48,1150],
['1.5','Manslaughter','Membunuh tanpa rencana (akibat emosi spontan atau kelalaian).','F',72,1000],
['1.6','Murder (1st Degree)','Pembunuhan terencana, bom, atau terhadap aparat.','F',132,1500],
['1.7','Murder (2nd Degree)','Pembunuhan tanpa rencana matang namun dengan niat jahat.','F',120,1250],
['1.8','Attempted Murder','Percobaan pembunuhan terencana.','F',56,950],
['1.9','Kidnapping & False Imprisonment','Menyekap atau menculik seseorang tanpa izin.','F',56,660],
['1.10','Robbery & Carjacking','Merampas harta/kendaraan menggunakan kekerasan/ancaman.','F',30,650],
['1.11','Stalking & Human Trafficking','Menguntit, atau memperdagangkan manusia.','F',36,750],
['2.1','Rape & Sexual Assault','Memaksa kontak seksual tanpa persetujuan.','F',56,540],
['2.2','Public Indecency','Memperlihatkan alat vital atau perilaku seksual di ruang publik.','M',14,300],
['2.3','Child Endangerment (Indecency)','Aktivitas seksual di depan anak di bawah umur.','F',18,350],
['3.1','Possession of Narcotics','Memiliki zat ilegal selain ganja medis.','M',4,100],
['3.2','Sale & Distribution of Narcotics','Mengedarkan atau memproduksi narkoba.','F',48,550],
['3.3','Illegal Marijuana Possession','Ganja melebihi 5 gram atau di bawah umur.','M',6,50],
['3.4','Public Intoxication','Mabuk alkohol/narkoba di ruang publik.','M',5,50],
['3.5','Terrorism & Treason','Terorisme atau pengkhianatan negara. (999 = Seumur Hidup)','F',999,9999],
['4.1','Riot & Unlawful Assembly','Berkerumun untuk tindakan anarkis/kerusuhan.','F',24,500],
['4.2','Disturbing the Peace','Berkelahi di tempat umum atau memprovokasi kekerasan.','M',3,20],
['4.3','Emergency Site Trespassing','Memasuki zona bahaya/evakuasi resmi.','M',10,250],
['5.1','Burglary & Trespassing','Memasuki properti/bangunan orang lain untuk mencuri.','F',30,250],
['5.2','Petty Theft','Mencuri barang bernilai di bawah $950.','M',8,50],
['5.3','Grand Theft','Mencuri barang di atas $950 atau kendaraan bermotor.','F',15,250],
['5.4','Fraud & Forgery','Memalsukan dokumen atau menipu untuk keuntungan finansial.','F',32,560],
['5.5','Vandalism','Merusak properti milik orang lain.','M',8,80],
['6.1','Bribery & Corruption','Menyuap pejabat publik, atau penyalahgunaan wewenang.','F',64,645],
['6.2','Obstruction & Resisting','Menghalangi tugas pegawai negara atau melawan penangkapan.','M',10,100],
['6.3','Perjury & False Reports','Kesaksian palsu di pengadilan atau laporan darurat palsu.','F',28,272],
['6.4','Evidence Tampering & Contraband','Menghancurkan bukti atau menyelundupkan barang ke penjara.','F',36,850],
['6.5','State Impersonation','Menyamar sebagai penegak hukum atau pegawai pemerintah.','F',20,520],
['7.1','Reckless Driving (Basic)','Mengemudi ugal-ugalan mengabaikan keselamatan publik.','M',20,350],
['7.2','Reckless Driving (Aggravated)','Mengemudi ugal-ugalan yang menyebabkan korban luka.','F',28,540],
['7.3','Driving Under the Influence (DUI)','Mengemudi saat mabuk alkohol atau narkoba.','F',24,246],
['7.4','Evading a Peace Officer','Melarikan diri dari kejaran aparat pakai kendaraan.','M',16,156],
['7.5','Reckless Evading','Melarikan diri dari kejaran polisi secara berbahaya.','F',36,365],
['7.6','Hit and Run (Property)','Tabrak lari yang hanya menyebabkan kerusakan benda.','M',10,154],
['7.7','Hit and Run (Injury/Death)','Tabrak lari dengan korban jiwa atau luka fisik.','F',35,464],
['8.1','Unlicensed Weapon','Membawa senjata mematikan tanpa lisensi.','M',25,850],
['8.2','Illegal/Stolen Firearm','Memiliki senjata ilegal, tidak terdaftar, atau curian.','F',40,900],
['8.3','Brandishing a Weapon','Menodongkan atau memamerkan senjata untuk mengancam.','F',120,1500],
['8.4','Unlawful Discharge','Menembak sembarangan atau Drive-By di tempat umum.','F',36,550],
['8.5','Illegal Mod & Distribution','Modifikasi senjata ilegal atau menjual senjata tanpa izin.','F',90,2500],
['8.6','CCW License Violation','Membawa senjata di area terlarang atau melanggar aturan lisensi.','M',50,500],
['8.7','Firearm Theft','Mencuri senjata api atau gagal lapor kehilangan dalam 48 jam.','F',50,930],
['8.8','Negligent Storage','Menyimpan senjata sembarangan hingga dapat diakses publik.','M',30,750]
];
const CATS_V={1:'Registration of Vehicle and Certificates Title',2:'Driver License',3:'Financial Responsibility Laws',4:'Rules of the Road',5:'Equipment of Vehicle',6:'Safety Regulation'};
// VEHICLE CODE: [kode, nama, deskripsi, tipe (I/M/F), penjara, denda, catatan, dinamis(1=denda sesuai level kendaraan)]
const VDATA=[
['1.1','Vehicle Registration Violation','Mengemudikan atau meninggalkan kendaraan yang belum terdaftar, atau tanpa plat nomor valid.','I',0,0,'Kendaraan disita. Denda dinamis sesuai level: Motorcycles $325, Cars $650, Commercial $488, Sport $813 per 5 level (sampai Lvl 46-50).',1],
['2.1','Driving without Valid License','Mengemudi tanpa memiliki SIM, atau dengan SIM yang telah dicabut.','M',4,0,'Kendaraan ditahan.'],
['2.2','No Physical License in Possession','Mengemudi tanpa membawa fisik SIM saat diperiksa.','M',5,450],
['2.3','Expired License','Mengemudi dengan status SIM yang sudah kedaluwarsa.','I',0,500],
['2.4','Suspended License','Mengemudi saat SIM sedang dalam masa penyitaan/penangguhan.','M',4,550,'Kendaraan ditahan.'],
['2.5','Learner’s Permit (No Ed)','Pengemudi (16-18 thn) mengemudi tanpa menyelesaikan kursus.','I',0,200,'Izin dicabut.'],
['2.6','Learner’s Permit (No Adult)','Pengemudi (16-18 thn) mengemudi tanpa didampingi orang dewasa ber-SIM.','I',0,300,'Izin dicabut.'],
['3.1','Driving without Insurance','Mengemudi tanpa asuransi kendaraan yang valid.','I',0,200,'Kendaraan ditahan.'],
['4.1','Speeding (>40 MPH)','Ngebut di atas 40 MPH di area bisnis/pemukiman.','I',0,200,'+1 Poin SIM'],
['4.2','Speeding (>65 MPH)','Ngebut di atas 65 MPH di luar area bisnis/pemukiman.','I',0,500,'+1 Poin SIM'],
['4.3','Speeding (>90 MPH)','Ngebut di atas 90 MPH di jalan raya (Highway).','I',0,750,'+2 Poin SIM'],
['4.4','Unsafe Speeding','Berkendara dengan kecepatan tidak wajar/berbahaya saat cuaca buruk.','I',0,200,'+2 Poin SIM'],
['4.5','Failure to Yield','Tidak memberikan hak jalan kepada pengemudi lain di persimpangan.','I',0,350],
['4.6','Yield to Emergency','Tidak menepi untuk memberi jalan pada kendaraan darurat (sirene/lampu menyala).','I',0,400],
['4.7','Traffic Control Device','Melanggar rambu lalu lintas, lampu merah, atau arahan petugas.','I',0,200],
['4.8','Illegal Parking','Parkir sembarangan (menghalangi jalan, hidran, jalur damkar, rel kereta, dll).','I',0,950,'Kendaraan disita.'],
['4.9','Vehicular Noise','Modifikasi bising, atau klakson/sirene berlebihan.','I',0,500],
['4.10','Illegal Hydraulics','Menggunakan sistem hidrolik saat kendaraan sedang berjalan di jalan umum.','I',0,450],
['4.11','Unsafe Bicycle Usage','Menggunakan sepeda hingga menghalangi lalu lintas atau memicu bahaya.','I',0,500],
['4.12','Jaywalking','Menyeberang jalan sembarangan tidak pada tempat penyeberangan (crosswalk).','I',0,250],
['4.13','Speed Contests','Terlibat balapan liar di jalan umum.','I',0,500],
['4.14','Illegal Truck Route','Mengemudikan truk/kendaraan berat di luar rute truk atau masuk kota tanpa izin.','I',0,1500,'Kendaraan disita.'],
['4.15','Invalid Commercial License','Mengemudikan kendaraan komersial tanpa lisensi kelas khusus yang sah.','M',0,870,'Denda +$500 jika memicu bahaya.'],
['5.1','Tinted Windows','Menggunakan kaca film yang menghalangi visibilitas.','I',0,195],
['5.2','No Headlights','Tidak menyalakan lampu utama saat gelap atau cuaca buruk.','I',0,230],
['5.3','Unsafe Vehicle','Mengemudi dengan ban pecah, lampu rusak, atau pintu/kap terbuka.','I',0,640],
['5.4','Unauthorized Red/Blue Lights','Menggunakan lampu strobo darurat tanpa izin.','M',10,350,'Kendaraan disita hingga lampu dilepas.'],
['6.1','No Helmet','Mengendarai atau menumpang sepeda motor tanpa helm keselamatan.','I',0,500],
['6.2','Unlawful Towing','Menarik kendaraan lain dengan cara berbahaya atau membiarkan orang naik di atas trailer.','I',0,400],
['6.3','Reckless Machinery','Mengemudikan alat berat (Bulldozer, Forklift, Tractor, dll) di jalan umum secara sembarangan.','I',0,250],
['6.4','Reckless Off-Road','Membawa kendaraan Off-Road ke jalan raya umum secara sembarangan.','I',0,4100,'Kendaraan ditahan.'],
['6.5','Unlawful Passenger Riding','Membiarkan penumpang duduk di bagasi, kap, atau bagian luar kendaraan.','I',0,250]
];
const KIT={P:{nama:'Penal Code',pre:'PC',cats:CATS},V:{nama:'Vehicle Code',pre:'VC',cats:CATS_V}};
const mk=(kit,d)=>({id:kit+d[0],kit,k:d[0],nama:d[1],desc:d[2],tipe:d[3],jail:d[4],fine:d[5],note:d[6]||'',dyn:d[7]||0,cat:d[0].split('.')[0]});
const ALL=[...DATA.map(d=>mk('P',d)),...VDATA.map(d=>mk('V',d))];

const REG=['Semua pemohon wajib melengkapi formulir pengajuan.','Semua lisensi harus disetujui LSPD.','Pemohon wajib membayar biaya lisensi yang berlaku.','Pelanggaran dapat berujung pada pencabutan lisensi.'];

// HALAMAN PENGAJUAN. Tiap item = satu halaman (judul, penjelasan, format surat, tombol Discord).
const FORMS={
senjata:{
 judul:'Lisensi Senjata (CCW)',
 sub:'Application for Concealed Carry Weapon (CCW) License',
 url:'https://discord.com/channels/1559901799081836656/1561350988496117770',
 info:['Dipakai untuk mengajukan lisensi membawa senjata api (CCW) kepada LSPD.','Pilih jenis senjata: Pistol atau Shotgun.','Nomor seri senjata diisi jika kamu sudah mendapatkan senjatanya dari Gunshop.','Pemohon menjawab pertanyaan kelayakan: apakah punya State Identification yang valid dan apakah pernah dihukum karena kejahatan kekerasan.','Pemohon wajib menulis alasan mengajukan lisensi.'],
 harga:[['Pistol License',7500],['Shotgun (SG) License',10000]],
 ket:[...REG,'Penyalahgunaan senjata atau pelanggaran Penal Code Los Santos berujung pada pencabutan lisensi segera dan potensi tuntutan pidana.','Dengan mengirim berkas, pemohon mengizinkan LSPD melakukan pemeriksaan kesehatan mental dan latar belakang kriminal secara menyeluruh.'],
 tpl:`**LOS SANTOS POLICE DEPARTMENT**
**CHIEF OF POLICE Joshua Houle**
__**APPLICATION FOR CONCEALED CARRY WEAPON (CCW) LICENSE**__

__**I. APPLICANT IDENTIFICATION**__
> Full Name:
> Date of Birth:
> Current Address:
> Phone Number:
> Occupation:

__**II. FIREARM SPECIFICATION**__
> Weapon Type: (Pistol /Shotgun)
> Serial Number: (Jika sudah mendapatkan senjatanya dari Gunshop)

__**III. ELIGIBILITY & BACKGROUND CHECK**__
> Do you have a valid State Identification? (Yes / No)
> Have you ever been convicted of a violent crime? (Yes / No)

__**IV. STATEMENT OF INTENT**__
Please state your reason for requesting a CCW License:
> (Jawaban di sini...)

__**V. AUTHORIZATION & AGREEMENT**__
I understand that any misuse of the firearm or violation of the Los Santos Penal Code will result in the immediate revocation of this license and potential criminal charges. I hereby authorize the LSPD to perform a full mental health and criminal background screening.`
},
event:{
 judul:'Event Registration',
 sub:'LSPD Event Registration: surat perizinan event',
 url:'https://discord.com/channels/1559901799081836656/1562665325386801213',
 info:['Dipakai untuk mendaftarkan event kepada LSPD sebagai surat perizinan.','Isi data penyelenggara: nama, faksi/organisasi, dan nomor kontak.','Isi data event: nama, tanggal dan jam, lokasi, dan deskripsi.','Pilih bantuan yang dibutuhkan dari LSPD: Police Department (PD), Traffic Control, Crowd Control, Security, atau lainnya, lalu jelaskan detailnya.','Cantumkan perkiraan jumlah peserta dan catatan tambahan.'],
 harga:null,
 ket:['Bagian LSPD REVIEW (Status, Reviewed By, Remarks) diisi oleh LSPD, bukan pemohon.','Status pengajuan bisa PENDING, APPROVED, atau DENIED.'],
 tpl:`━━━━━━━━━━━━━━━━━━━━
# 📋 LSPD — EVENT REGISTRATION
*Los Santos Police Department*
━━━━━━━━━━━━━━━━━━━━

**I. ORGANIZER INFORMATION**
> Organizer Name:
> Faction / Organization:
> Contact Number:

**II. EVENT INFORMATION**
> Event Name:
> Event Date & Time:
> Event Location:
> Event Description:
> (Explain what the event is about)

**III. ASSISTANCE REQUEST**
> Assistance Required:
> [ ] Police Department (PD)
> [ ] Traffic Control
> [ ] Crowd Control
> [ ] Security
> [ ] Other:
>
> Details of Assistance:
> (Explain what support is needed from LSPD)

**IV. ADDITIONAL INFORMATION**
> Estimated Participants:
> Additional Notes:

━━━━━━━━━━━━━━━━━━━━
**LSPD REVIEW**
> Status: PENDING / APPROVED / DENIED
> Reviewed By:
> Remarks:

━━━━━━━━━━━━━━━━━━━━
*Los Santos Police Department*
*To Protect and To Serve*`
},
trucker:{
 judul:'Lisensi Trucker',
 sub:'Truck Driver License Application',
 url:'https://discord.com/channels/1559901799081836656/1561352523124838410',
 info:['Dipakai untuk mengajukan lisensi pengemudi truk kepada LSPD.','Pilih jenis lisensi: Low Trucker atau Heavy Trucker.','Pemohon menyatakan bahwa data yang diberikan benar dan bersedia mematuhi semua aturan lalu lintas yang berlaku.'],
 harga:[['Low Trucker License',2500],['Heavy Trucker License',5000]],
 ket:[...REG],
 tpl:`**LOS SANTOS POLICE DEPARTMENT**
**CHIEF OF POLICE Joshua Houle**

__**TRUCK DRIVER LICENSE APPLICATION**__

**I. APPLICANT INFORMATION**
> Full Name:
> Date of Birth:
> Phone Number:

**II. LICENSE TYPE**
> License Type: Low Trucker / Heavy Trucker

**III. DECLARATION**
> I confirm that the information provided is accurate and agree to follow all applicable traffic laws and regulations.`
}
};

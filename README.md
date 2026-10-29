# Pasal RP — Rebelions Roleplay

Website statis untuk kepolisian (LSPD) Rebelions Roleplay: browse pasal, kalkulator denda dan penjara, dan daftar harga lisensi. Tanpa framework, tanpa build, tanpa dependensi.

## Fitur

- Browse 52 pasal dalam 8 kategori, dengan pencarian, filter kategori, dan filter tipe (Felony / Misdemeanor)
- Kalkulator: pilih pasal, atur jumlah, total denda dan penjara dihitung otomatis, bisa disalin
- Harga lisensi LSPD (Firearm dan Truck Driver)
- Simpan pasal favorit dan riwayat pencarian (disimpan di localStorage browser)
- Mode terang/gelap otomatis, responsif di HP
- Pintasan Ctrl+K untuk pencarian cepat

## Struktur

```
index.html   kerangka halaman
style.css    tampilan
data.js      data pasal, kategori, lisensi (file yang paling sering diedit)
app.js       logika aplikasi
```

## Menjalankan lokal

Buka `index.html` langsung di browser, atau:

```
python3 -m http.server 8000
```

lalu buka http://localhost:8000

## Mengedit data

Semua data ada di `data.js`.

Format pasal:

```js
// [kode, nama, deskripsi, tipe, penjara, denda]
['1.1', 'Criminal Threats', 'Mengancam melukai...', 'M', 30, 500],
```

- Tipe: `'M'` = Misdemeanor, `'F'` = Felony
- Penjara bernilai 999 akan tampil sebagai "Seumur Hidup"
- Kategori ditentukan dari angka sebelum titik pada kode (kode `3.2` masuk kategori `3`), nama kategori ada di objek `CATS`
- Satuan penjara diatur di konstanta `UNIT` (sekarang `'menit'`)
- Harga lisensi ada di array `LIC`, ketentuan di array `REG`

## Deploy

GitHub Pages: Settings > Pages > Source: branch `main`, folder `/ (root)`.

Vercel / Netlify: import repo ini, tanpa build command, output directory root.

## Catatan

Navigasi memakai hash (`#pasal`, `#kalkulator`, `#lisensi`), jadi berjalan di hosting statis tanpa konfigurasi tambahan.

# Radio Ibnul Qoyyim Desktop

Aplikasi desktop untuk mendengarkan **Radio Ibnul Qoyyim Balikpapan** secara online.

Aplikasi ini dibuat menggunakan **Tauri + HTML + CSS + JavaScript**.  
Frontend bersifat static, ringan, dan tidak membutuhkan backend lokal.
---

## Screenshot
Tambahkan screenshot aplikasi di sini jika sudah ada.
Contoh:

![Radio Ibnul Qoyyim Desktop](src/assets/screenshot.png)

## Fitur
* Streaming Radio Ibnul Qoyyim secara online.
* Menampilkan status radio:
  * Hijau: live / sedang diputar.
  * Kuning: pause.
  * Biru: connecting / buffering.
  * Merah: error.
  * Abu-abu: standby.
* Menampilkan judul audio/kajian yang sedang diputar.
* Menampilkan jumlah pendengar online.
* Refresh informasi now playing setiap 15 detik.
* Ringan karena menggunakan Tauri, bukan Electron.
* Build tersedia untuk Linux, Windows, dan macOS melalui GitHub Actions.

## Stream dan API
Aplikasi ini memakai stream AzuraCast:
-https://azuracast.iqbpn.com/radio/8000/radio.mp3
API now playing:
-https://azuracast.iqbpn.com/api/nowplaying/1
-Jika aplikasi tidak menampilkan judul atau jumlah pendengar, pastikan API AzuraCast di atas masih aktif dan bisa diakses dari browser.

## Struktur Project
.
├── .github
│   └── workflows
│       └── release.yml
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── assets
│   ├── index.html
│   ├── main.js
│   └── styles.css
└── src-tauri
    ├── build.rs
    ├── capabilities
    │   └── default.json
    ├── Cargo.lock
    ├── Cargo.toml
    ├── icons
    ├── src
    │   ├── lib.rs
    │   └── main.rs
    └── tauri.conf.json
```

## Teknologi
* [Tauri](https://tauri.app/)
* HTML
* CSS
* JavaScript
* Rust
* AzuraCast Streaming API

## Requirement Development
Untuk build di Linux/Pop!_OS/Ubuntu/Debian, install dependency berikut.
sudo apt update
sudo apt install -y \
  libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev

Install Node.js dan Rust jika belum ada.
### Node.js
Disarankan menggunakan Node.js versi 20 atau 22.
Cek versi:
node -v
npm -v

### Rust
Install Rust:
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
Cek versi:
rustc -V
cargo -V
---

## Install Dependency Project
npm install

## Menjalankan Mode Development
npm run dev
Atau:
npm run tauri dev

## Build Lokal
npm run build
Atau:
npm run tauri build

Hasil build ada di:
src-tauri/target/release/bundle/

## Catatan untuk Linux AppImage
Untuk aplikasi ini, **AppImage tidak direkomendasikan**.
Alasannya: Tauri di Linux memakai WebKitGTK dan GStreamer untuk audio. Pada beberapa sistem seperti Pop!_OS/Ubuntu, AppImage bisa mengalami bentrok library GTK/GIO/GStreamer.
Contoh error yang mungkin muncul:
GStreamer element autoaudiosink not found
Failed to load module: libgvfsdbus.so
undefined symbol: g_task_set_static_name
Solusi terbaik untuk Linux adalah memakai paket `.deb`.
Jika tetap ingin mencoba AppImage, pastikan dependency audio berikut terpasang:
sudo apt install -y \
  gstreamer1.0-plugins-base \
  gstreamer1.0-plugins-good \
  gstreamer1.0-plugins-bad \
  gstreamer1.0-plugins-ugly \
  gstreamer1.0-libav \
  gstreamer1.0-pulseaudio \
  gstreamer1.0-pipewire
Namun untuk distribusi resmi, gunakan `.deb`.

## Instalasi di Windows
Download file `.msi` dari halaman **Releases**.
Catatan:
Karena aplikasi belum menggunakan code signing certificate, Windows SmartScreen mungkin menampilkan peringatan. Untuk penggunaan internal, ini masih normal.
---
## Instalasi di macOS
Download file `.dmg` dari halaman **Releases**.
Contoh file:
Radio_Ibnul_Qoyyim_0.1.0_aarch64.dmg
Radio_Ibnul_Qoyyim_0.1.0_x64.dmg
Catatan:
Jika aplikasi belum ditandatangani dan belum di-notarize dengan Apple Developer Account, macOS Gatekeeper mungkin menampilkan peringatan.
Untuk penggunaan publik yang luas, sebaiknya lakukan:
* Code signing.
* Apple notarization.
* Distribusi `.dmg` resmi.
---

## Troubleshooting
### 1. Aplikasi terbuka tapi audio tidak jalan
Cek koneksi internet dan pastikan stream bisa dibuka di browser:
https://azuracast.iqbpn.com/radio/8000/radio.mp3
Jika di browser tidak jalan, masalah ada pada stream/AzuraCast.
### 2. Judul audio tidak muncul
Cek API:
https://azuracast.iqbpn.com/api/nowplaying/1
Jika API tidak menampilkan JSON, aplikasi tidak bisa mengambil judul audio dan jumlah pendengar.

## Keamanan
Aplikasi ini hanya melakukan:
* Memutar stream audio dari AzuraCast.
* Mengambil data now playing dari API AzuraCast.
* Menampilkan informasi ke user.

Aplikasi ini tidak membutuhkan:
* Database lokal.
* Login user.
* Permission file system.
* Permission shell.
* Permission kamera.
* Permission mikrofon.
* Backend lokal.

## Lisensi
Project ini dibuat untuk kebutuhan Radio Ibnul Qoyyim.
Atau gunakan lisensi internal/private jika aplikasi hanya untuk distribusi terbatas.


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

Aplikasi ini memakai stream AzuraCast: https://azuracast.iqbpn.com/radio/8000/radio.mp3

API now playing: https://azuracast.iqbpn.com/api/nowplaying/1


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


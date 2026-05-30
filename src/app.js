const radioPlayer = document.getElementById("radioPlayer");
const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const connectionStatus = document.getElementById("connectionStatus");
const nowPlayingTitle = document.getElementById("nowPlayingTitle");
const year = document.getElementById("year");

const AZURACAST_NOW_PLAYING_API = "https://azuracast.iqbpn.com/api/nowplaying";

year.textContent = new Date().getFullYear();

function setStatus(type, text, connectionText) {
  statusDot.classList.remove("playing", "paused", "error", "loading");

  if (type === "playing") {
    statusDot.classList.add("playing");
  }

  if (type === "paused") {
    statusDot.classList.add("paused");
  }

  if (type === "error") {
    statusDot.classList.add("error");
  }

  if (type === "loading") {
    statusDot.classList.add("loading");
  }

  statusText.textContent = text;
  connectionStatus.textContent = connectionText;
}

async function playRadio() {
  try {
    setStatus("loading", "Menghubungkan ke stream...", "Connecting");

    // Reload source agar browser mengambil stream terbaru
    radioPlayer.load();

    await radioPlayer.play();

    setStatus("playing", "Radio sedang diputar", "Live");
    fetchNowPlaying();
  } catch (error) {
    setStatus(
      "error",
      "Browser memblokir autoplay. Tekan tombol play di audio player.",
      "Blocked"
    );
  }
}

function stopRadio() {
  radioPlayer.pause();
  /*radioPlayer.currentTime = 0; */

  setStatus("paused", "Radio dijeda", "Paused");
}

function getTitleFromNowPlaying(data) {
  /*
    AzuraCast biasanya mengembalikan:
    1. Array station:
       [
         {
           now_playing: {
             song: {
               title: "...",
               artist: "...",
               text: "..."
             }
           }
         }
       ]

    2. Single object station:
       {
         now_playing: {
           song: {
             title: "...",
             artist: "...",
             text: "..."
           }
         }
       }
  */

  const station = Array.isArray(data) ? data[0] : data;

  if (!station || !station.now_playing || !station.now_playing.song) {
    return null;
  }

  const song = station.now_playing.song;

  if (song.artist && song.title) {
    return `${song.artist} - ${song.title}`;
  }

  if (song.title) {
    return song.title;
  }

  if (song.text) {
    return song.text;
  }

  return null;
}

async function fetchNowPlaying() {
  try {
    const response = await fetch(AZURACAST_NOW_PLAYING_API, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("AzuraCast API tidak merespons dengan baik");
    }

    const data = await response.json();
    const title = getTitleFromNowPlaying(data);

    nowPlayingTitle.textContent = title || "Informasi judul belum tersedia";
  } catch (error) {
    nowPlayingTitle.textContent = "Informasi judul belum tersedia";
  }
}

playBtn.addEventListener("click", playRadio);
stopBtn.addEventListener("click", stopRadio);

radioPlayer.addEventListener("playing", () => {
  setStatus("playing", "Radio sedang diputar", "Live");
  fetchNowPlaying();
});

radioPlayer.addEventListener("pause", () => {
  if (!radioPlayer.ended) {
    setStatus("paused", "Radio dijeda", "Paused");
  }
});

radioPlayer.addEventListener("waiting", () => {
  setStatus("loading", "Buffering stream...", "Buffering");
});

radioPlayer.addEventListener("error", () => {
  setStatus(
    "error",
    "Stream belum bisa dimuat. Cek koneksi atau server AzuraCast.",
    "Error"
  );
});

// Ambil judul saat halaman pertama kali dibuka
fetchNowPlaying();

// Refresh judul tiap 20 detik
setInterval(fetchNowPlaying, 20000);
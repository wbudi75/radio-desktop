const STREAM_URL = "https://azuracast.iqbpn.com/radio/8000/radio.mp3";
const API_URL = "https://azuracast.iqbpn.com/api/nowplaying/1";

const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const songTitle = document.getElementById("songTitle");
const listenersTotal = document.getElementById("listenersTotal");
const lastUpdate = document.getElementById("lastUpdate");
const year = document.getElementById("year");

const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const stopButton = document.getElementById("stopButton");

let audio = null;
let refreshTimer = null;

year.textContent = new Date().getFullYear();

function setStatus(status, message) {
  statusDot.className = `status-dot ${status}`;
  statusText.textContent = message;
}

function setLastUpdate() {
  const now = new Date();
  lastUpdate.textContent = `Update terakhir: ${now.toLocaleTimeString("id-ID")}`;
}

function createAudioPlayer() {
  if (audio) {
    return audio;
  }

  audio = new Audio();
  audio.src = STREAM_URL;
  audio.preload = "none";
  audio.crossOrigin = "anonymous";

  audio.addEventListener("loadstart", () => {
    setStatus("loading", "Menghubungkan ke stream...");
  });

  audio.addEventListener("playing", () => {
    setStatus("live", "Sedang mengudara...");
  });

  audio.addEventListener("pause", () => {
    setStatus("pause", "Radio dijeda.");
  });

  audio.addEventListener("waiting", () => {
    setStatus("loading", "Buffering stream...");
  });

  audio.addEventListener("stalled", () => {
    setStatus("loading", "Koneksi stream tertahan...");
  });

  audio.addEventListener("error", () => {
    setStatus("error", "Stream gagal diputar. Cek koneksi.");
  });

  return audio;
}

async function getNowPlaying() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    const title =
      data?.now_playing?.song?.text ||
      data?.now_playing?.song?.title ||
      "Info kajian belum tersedia";

    const listeners =
      data?.listeners?.total ??
      data?.listeners?.current ??
      0;

    songTitle.textContent = title;
    listenersTotal.textContent = listeners;
    setLastUpdate();
  } catch (error) {
    songTitle.textContent = "Gagal memuat info kajian...";
    listenersTotal.textContent = "0";
    setLastUpdate();
  }
}

async function playRadio() {
  const player = createAudioPlayer();

  try {
    setStatus("loading", "Memulai Radio Ibnul Qoyyim...");
    await getNowPlaying();

    /*
      Penting untuk Tauri:
      reload src sebelum play agar WebView mengambil stream baru.
    */
    player.src = STREAM_URL;
    player.load();

    await player.play();

    setStatus("live", "Sedang mengudara...");
    startInfoRefresh();
  } catch (error) {
    setStatus(
      "error",
      "Radio belum bisa diputar. Coba tekan Play sekali lagi atau cek koneksi internet."
    );
  }
}

function pauseRadio() {
  if (!audio) {
    setStatus("pause", "Radio belum diputar.");
    return;
  }

  audio.pause();
  setStatus("pause", "Radio dijeda.");
}

function stopRadio() {
  if (!audio) {
    setStatus("standby", "Radio belum diputar.");
    return;
  }

  audio.pause();
  audio.src = "";
  audio.load();
  audio = null;

  setStatus("standby", "Radio berhenti.");
  stopInfoRefresh();
}

function startInfoRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }

  refreshTimer = setInterval(getNowPlaying, 15000);
}

function stopInfoRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
}

playButton.addEventListener("click", playRadio);
pauseButton.addEventListener("click", pauseRadio);
stopButton.addEventListener("click", stopRadio);

window.addEventListener("beforeunload", () => {
  stopRadio();
});

getNowPlaying();
setStatus("standby", "Siap memutar radio");
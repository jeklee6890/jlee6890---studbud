// constants for dark and light mode 
const darkButton = document.getElementById("dark");
const lightButton = document.getElementById("light");

const darkMode = () => {
  document.body.classList.toggle("dark");
}

darkButton.addEventListener("click", () => {
  setDarkMode = localStorage.getItem("dark");

  // using localStorage to store the SCSS style of the page i.e. if the page is on darkMode or lightMode
  if(setDarkMode !== "on") {
    darkMode();
    setDarkMode = localStorage.setItem("dark", "on");
    darkButton.style.fontWeight = "bold";
    lightButton.style.fontWeight = "normal";
  } else {
    darkMode();
    setDarkMode = localStorage.setItem("dark", "null");
    darkButton.style.fontWeight = "normal";
    lightButton.style.fontWeight = "bold";
  } 
});

// checking if darkMode is on when the page is refreshed based on localStorage
let setDarkMode = localStorage.getItem("dark");
if(setDarkMode === "on") {
  darkMode();
}




// constants for music player 
const musicContainer = document.querySelector(".music-container");
const previousBtn = document.querySelector("#previous");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress.container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// song titles 
const songs = ["music"];

let songIndex = 0;

// initially load song
loadSong(songs(songIndex));


function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `assets/${song}.jpeg`; 
}


// event listener for music player
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if(isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
})

// event listener for previous and next song
previousBtn.addEventListener("click", previousSong);
nextBtn.addEventListener("click", nextSong);

// event listeners for progress bar
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

// event listener for loading next song in the music player 
audio.addEventListener('ended', nextSong);


// custom functions 
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  
  audio.pause();
}

function previousSong() {
  songIndex--;

  if(songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;

  if(songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
// constants for dark and light mode 
const modeButton = document.getElementById("mode-switch");

const darkMode = () => {
  document.body.classList.toggle("dark");
  modeButton.classList.add("dark-button");
}

const lightMode = () => {
  document.body.classList.toggle("light");
  modeButton.classList.add("light-button");
}

modeButton.addEventListener("click", () => {
  setDarkMode = localStorage.getItem("dark");

  // using localStorage to store the SCSS style of the page i.e. if the page is on darkMode or lightMode
  if(setDarkMode !== "on") {
    darkMode();
    setDarkMode = localStorage.setItem("dark", "on");
  } else {
    lightMode();
    setDarkMode = localStorage.setItem("dark", "null");
  } 
});

// checking if darkMode is on when the page is refreshed based on localStorage
let setDarkMode = localStorage.getItem("dark");
if(setDarkMode === "on") {
  darkMode();
} else {
  lightMode;
}




// constants for music player 
const musicContainer = document.querySelector(".music-container");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");


// song titles 
const songs = ['music', 'ukelele'];

let songIndex = 1;

// initially load song
loadSong(songs[songIndex]);




// event listener for music player
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if(isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// event listener for previous and next song
prevBtn.addEventListener("click", previousSong);
nextBtn.addEventListener("click", nextSong);

// event listeners for progress bar
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

// event listener for loading next song in the music player 
audio.addEventListener('ended', nextSong);






// custom functions 
function loadSong(song) {
  title.innerText = song;

  audio.src = "music.mp3";
  cover.src = `assets/${cover}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

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

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

const timeElement = document.querySelector('.watch .time');
const buttonStart = document.getElementById('start');
const buttonStop = document.getElementById('stop');
const buttonReset = document.getElementById('reset');

let seconds = 0;
let interval = null;


buttonStart.addEventListener('click', startTimer);
buttonStop.addEventListener('click', stopTimer);
buttonReset.addEventListener('click', resetTimer);


// here i am creating the pop-up modal when the user clicks the 'add-task' button
var modal = document.querySelector(".acronym-modal");
var btn = document.getElementsByClassName("add-acronym");

// retrieving the <span> element which will close the modal
var span = document.getElementsByClassName("close");




// this function will open the modal and allow the user to make a new task 
// when they click on the 'add-task' button
for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
      modal.style.display = "block";
    });
}
  
// the modal when they click on the 'x' button
  for (var i = 0; i < span.length; i++) {
    span[i].addEventListener("click", function () {
      modal.style.display = "none";
    });
  }
  
  let submit = document.querySelector(".submit");
  
  submit.onclick = function(){
      modal.style.display = "none";
  }

  function timer() {
    seconds++;

    let hours = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hours * 3600)) / 60);
    let secs = seconds % 60;
    
    if(secs < 10) {
        secs = "0" + secs;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }

    timeElement.innerText = `${hours}:${mins}:${secs}` ;
}



function startTimer() {
    if(interval) {
        return;
    }
    interval = setInterval(timer, 1000);
}



function stopTimer() {
    clearInterval(interval);
    interval = null;
}


function resetTimer() {
    stop();
    seconds = 0;
    timeElement.innerText = "00:00:00";
}

function show() {
    document.getElementById("sidebar").style.marginLeft = "500px";
}

function hide() {
    document.getElementById("sidebar").style.marginLeft = "0px";
}

const timeElement = document.querySelector('.watch .time');
const buttonStart = document.getElementById('start');
const buttonStop = document.getElementById('stop');
const buttonReset = document.getElementById('reset');

let seconds = 0;
let interval = null;


buttonStart.addEventListener('click', startTimer);
buttonStop.addEventListener('click', stopTimer);
buttonReset.addEventListener('click', resetTimer);


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
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
  
  submit.onclick = function() {
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

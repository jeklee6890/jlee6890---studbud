var lightImage = [
  "../light-assets/bird.svg",
  "../light-assets/cloud.png",
  "../light-assets/droplet.png",
  "../light-assets/flower.png",
  "../light-assets/leaf.png",
  "../light-assets/trees.png",
  "../light-assets/wave.png"
]

var darkImage = [
  "../dark-assets/bird.png",
  "../dark-assets/cloud.png",
  "../dark-assets/droplet.png",
  "../dark-assets/flower.png",
  "../dark-assets/leaf.png",
  "../dark-assets/trees.png",
  "../dark-assets/wave.png"
]

var acronymArray = [];

const timeElement = document.querySelector('.time');
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




// similar to the kanban board's javascript code, i have used a modal that will appear
// to create the acronyms, which requires the following variables 
var modal = document.querySelector(".acronym-modal");
var btn = document.getElementsByClassName("add-acronym");

// retrieving the <span> element which will close the modal
var span = document.getElementsByClassName("toggle-close");

function show() {
  document.getElementById("sidebar").style.marginLeft = "500px";
}

function hide() {
  document.getElementById("sidebar").style.marginLeft = "0px";
}




// this function will open the modal and allow the user to make a new acronym 
// when they click on the 'add-acronym' button
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

let subButton = document.getElementById("submit");


// rendering the items from local storage
renderAcronyms();


subButton.addEventListener("click", function() {

  // this section is to make sure the acronym values are being loaded properly
    let acronymLetter = document.getElementsByClassName("first").value;
    let acronymWords = document.getElementsByClassName("remaining").value; 
    console.log(acronymLetter);
    console.log(acronymWords);


  // by using an object, i am able to store multiple values here, specifically the 
  // acronym letters and their meaning based on the user's input 
    let acronymObj = {
      'acronymLetter': acronymLetter,
      'acronymWords': acronymWords
    };


    let existingAcronyms = getAcronyms();

  // adding the new item onto the end of the list
    existingAcronyms.push(acronymObj);

    existingAcronyms = JSON.stringify(existingAcronyms);

  // here is where i am writing the JSON string into local storage
    localStorage.setItem('acronyms', existingAcronyms);

    acronymArray.push(acronymObj);
    renderAcronyms();
});


// below are the functions for the acronym board to function properly, many of which are 
// the same to the kanban board but slightly tweaked in name and functionality 

function getAcronyms() {
  // checking if any items are in in local storage already
    let acronymItems = localStorage.getItem('acronyms');

  if (acronymItems == null) {
    return [];
  }

  acronymItems = JSON.parse(acronymItems);

  // return the list of items back to the code that ran this function.
    return acronymItems;
}


function renderAcronyms() {
  let acronymItems = getAcronyms();

  // once again, the empty <ul> tag is where the acronym will be appearing onto the user's screen
  let itemUl = document.querySelector('.empty ul');

  acronymItems.forEach(function(acronym) {

    // creating a <li> element to hold each item
      let acronymLi = document.createElement('p'); 

    // these variables will print the values from the acronym modal 
      let completionCard = document.createElement("div");
      completionCard.setAttribute("class", "completionCard");

      let acronymName = document.createElement('span');
      acronymName.innerText = acronym.acronymLetter; 

      let acronymMeaning = document.createElement('span');
      acronymMeaning.innerText = acronym.acronymWords; 

      let space = document.createElement("br");

    // element to represent the remove button
      let itemRemove = document.createElement('button');
      itemRemove.setAttribute('class', 'remove');
      itemRemove.innerText = 'x'; 

    // this event listener makes sure to remove the correct acronym from local storage
    // by checking its id and array number 
      itemRemove.addEventListener("click", function() {
        let id = event.target.parentElement.getAttribute('data-id');
        let index = acronymArray.findIndex(acronym => acronym.id === Number(id));
        removeItemFromArray(acronymArray, index)

        acronymLi.remove();

        removeItem(acronym.acronymLetter);
        updateEmpty();
    });

    var imgGenerator = Math.floor(Math.random() * lightImage.length);
    let newImage = new Image(100, 100);
    newImage.src = lightImage[imgGenerator];

    
    acronymLi.appendChild(completionCard);
    completionCard.appendChild(newImage);
    acronymLi.appendChild(completionCard);
    completionCard.appendChild(itemRemove);
    completionCard.appendChild(acronymName);
    completionCard.appendChild(space);
    completionCard.appendChild(acronymMeaning);
    completionCard.appendChild(space);

    itemUl.appendChild(acronymLi);
  });
}

function removeItem(acronymName) {
  let acronymItems = renderAcronyms();

  let itemIndex = acronymItems.findIndex(function(item) {
    return item.acronymName == acronymName;
  });

  acronymItems.splice(itemIndex, 1);

  acronymItems = JSON.stringify(acronymItems);
  localStorage.setItem('acronym', acronymItems);
}


// function to hide the 'you haven't added any tasks' text
  function updateEmpty() {
      if (acronymArray.length > 0) {
          document.getElementsByClassName('emptyAcronym').style.display = 'none';
      } else {
          document.getElementsByClassName('emptyAcronym').style.display = 'block';
      }
  } 

function removeItemFromArray(arr, index) {
    if (index > -1) {
        arr.splice(index, 1)
    }
    return arr;
}






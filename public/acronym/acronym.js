var acronymArray = [];

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
var span = document.getElementsByClassName("toggle-close");




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


// Bind an event to the submit button to capture information from the form and store it into localStorage.
let subButton = document.getElementById("submit");


// Render the items from local storage so the page appears correct when it loads.
renderAcronyms();

// The event listener gets bound to the submit button and the contents of the internal function are run when the button is clicked.
subButton.addEventListener("click", function() {

  // Start by getting the form values.
  let acronymLetter = document.getElementsByClassName("first").value;
  let acronymWords = document.getElementsByClassName("remaining").value; 
  console.log(acronymLetter);
  console.log(acronymWords);

//   if(acronymLetter == "") { document.getElementById("taskInput").classList.add("error");
//     return;
//   }

  // Make a JS object to contain the data we want to write into local storage for each item. This is nice because we can have one key:value pair as we do here, or 50.
  let acronymObj = {
    'acronymLetter': acronymLetter,
    'acronymWords': acronymWords
  };

  // Get the item list from localStorage. This uses a custom function, since we need to do this action in a few different places. See that function for deets of how it works.
  let existingAcronyms = getAcronyms();

  // Add the new item onto the end of the list.
  existingAcronyms.push(acronymObj);

  // Local storage can only store strings, while we want to store an array. To get around this, we use JSON.stringify (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).
  existingAcronyms = JSON.stringify(existingAcronyms);

  // And finally we write the JSON string into local storage.
  localStorage.setItem('acronyms', existingAcronyms);

  // Render the items using our custom function.
  acronymArray.push(acronymObj);
  renderAcronyms();
});




////////////////////////////////////////
// Now we have some custom functions to handle tasks we have to do in order to make all this work.
////////////////////////////////////////

// getItems should be fairly self explanatory. It gets items from local storage!
function getAcronyms() {
  // Check to see if we have any item items in local storage already
  let items = localStorage.getItem('acronyms');

  // If the value of the items variable is `null` then we have not created or used localStorage yet. If this is true, we create an empty array and return that to the code that ran getItems(). 
  if (items == null) {
    return [];
  }

  // If we are still here, then we do have items in the list, or the list is empty.
  // Either way, we convert that information back into an array using JSON.parse (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse), this is the opposite action to JSON.stringify.
  items = JSON.parse(items);

  // Return the list of items back to the code that ran this function.
  return items;
}

// Render the items to the screen using the DOM manipulation methods.
function renderAcronyms() {
  // Use our custom getItems() function to retrieve info from local storage.
  let items = getAcronyms();

  // Find the UL element within the #itemlist DIV.
  let itemUl = document.querySelector('.empty ul');

  // Clear the contents of the UL to rebuild it fresh.
  itemUl.innerHTML = ""; // <-- this is the one time I'm okay with you using innerHTML. Otherwise build the DOM elements properly and don't concatenate strings :)

  // forEach is like a shorthand for() loop. It runs the internal function once per item in the array.
  items.forEach(function(item) {

    // Create a li DOM element to hold each item
    let acronymLi = document.createElement('p'); 

    // Create a span element to hold the name of the item.
    let completionCard = document.createElement("div");
    completionCard.setAttribute("class", "completionCard");

    let acronymName = document.createElement('span');
    acronymName.innerText = item.acronymLetter; // And we just put the text into this span, and nothing else.

    // let priority = document.createElement("span");
    // completion.innerText = 

    let space = document.createElement("br");
    

    // Add an element to represent the remove button
    let itemRemove = document.createElement('button');
    itemRemove.setAttribute('class', 'remove');
    itemRemove.innerText = 'x'; // You can CSS this later to be pretty

    // Add an event handler to the remove button. To make this work properly we need to do two things. Remove the DOM element from the document _AND_ remove the correct item from the local storage list.
    itemRemove.addEventListener("click", function() {
      // This allows us to remove the list li element directly which takes care of the visual removal.
      let id = event.target.parentElement.getAttribute('data-id');
      let index = acronymArray.findIndex(task => task.id === Number(id));
      removeItemFromArray(acronymArray, index)

      acronymLi.remove();

      // And the custom removeItem function helps us to remove it from local storage.
      removeItem(item.acronymLetter);
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
    // completionCard.appendChild(completion);
    completionCard.appendChild(space);

    

    // Add the li to the ul.
    itemUl.appendChild(acronymLi);
  });
}

// Removes a specific item, by name from local storage.
function removeItem(itemName) {
  // Use our custom getItems() function to retrieve info from local storage. Since we need to do this in a few places, see how the custom function is more efficient?
  let items = renderAcronyms();

  // This helps us to find the array index for the item that we want to remove. It compares the information we pass in (via the itemName variable) to the information in the objects within the array. If it matches, we get a number back - i.e. items[3].
  let itemIndex = items.findIndex(function(item) {
    return item.itemName == itemName;
  });

  // We've talked about splice() in class before (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), it removes a specific item out of the array 
  items.splice(itemIndex, 1);

  // Now we do the same process of writing information back into local storage that we did earlier.
  items = JSON.stringify(items);
  localStorage.setItem('acronym', items);
}


// Function to hide the 'you haven't added any tasks' text
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

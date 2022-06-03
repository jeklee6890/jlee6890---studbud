

// here i am creating the pop-up modal when the user clicks the 'add-task' button
var modal = document.querySelector(".task-modal");
var btn = document.getElementsByClassName("add-task");

// retrieving the <span> element which will close the modal
var span = document.getElementsByClassName("close");


var taskListArray = [];

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
    modal.style.display = "block";
  });
}


// Bind an event to the submit button to capture information from the form and store it into localStorage.
let subButton = document.getElementById("submit");

// Render the items from local storage so the page appears correct when it loads.
renderItems();

// The event listener gets bound to the submit button and the contents of the internal function are run when the button is clicked.
subButton.addEventListener("click", function() {

  // Start by getting the form values.
  let itemName = document.getElementById("taskInput").value;
  let completion = document.getElementById("estimatedTimeInput").value; 

  if(itemName == "") { document.getElementById("taskInput").classList.add("error");
    return;
  }

  // Make a JS object to contain the data we want to write into local storage for each item. This is nice because we can have one key:value pair as we do here, or 50.
  let itemObj = {
    'itemName': itemName,
    'completion': completion
  };

  // Get the item list from localStorage. This uses a custom function, since we need to do this action in a few different places. See that function for deets of how it works.
  let existingItems = getItems();

  // Add the new item onto the end of the list.
  existingItems.push(itemObj);

  // Local storage can only store strings, while we want to store an array. To get around this, we use JSON.stringify (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).
  existingItems = JSON.stringify(existingItems);

  // And finally we write the JSON string into local storage.
  localStorage.setItem('items', existingItems);

  // Render the items using our custom function.
  taskListArray.push(itemObj);
  renderItems();
});


// here i am creating the pop-up modal when the user clicks the 'add-task' button
var modal = document.querySelector(".task-modal");
var btn = document.querySelector(".add-task");

// retrieving the <span> element which will close the modal
var span = document.getElementsByClassName("close")[0];

// this function will open the modal and allow the user to make a new task 
// when they click on the 'add-task' button
btn.onclick = function() {
  modal.style.display = "block";
}

// this function will close the modal when they click on the 'x' button
span.onclick = function() {
  modal.style.display = "none";
}

let submit = document.querySelector(".submit");

submit.onclick = function() {
    modal.style.display = "none";
}


// code for drag-and-drop feature 
const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".column");
let draggableTodo = null;

todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});





////////////////////////////////////////
// Now we have some custom functions to handle tasks we have to do in order to make all this work.
////////////////////////////////////////

// getItems should be fairly self explanatory. It gets items from local storage!
function getItems() {
  // Check to see if we have any item items in local storage already
  let items = localStorage.getItem('items');

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
function renderItems() {
  // Use our custom getItems() function to retrieve info from local storage.
  let items = getItems();

  // Find the UL element within the #itemlist DIV.
  let itemUl = document.querySelector('.empty ul');

  // Clear the contents of the UL to rebuild it fresh.
  itemUl.innerHTML = ""; // <-- this is the one time I'm okay with you using innerHTML. Otherwise build the DOM elements properly and don't concatenate strings :)

  // forEach is like a shorthand for() loop. It runs the internal function once per item in the array.
  items.forEach(function(item) {

    // Create a li DOM element to hold each item
    let itemLi = document.createElement('p');

    // Now we could just set innerText or innerHTML to hold the item name, but if we want to have more than one variable displayed, this gets messy fast. Don't do this, it's poor practice and the code ends up clumsy and hard to maintain.
    // itemLi.innerHTML = "<strong>" + item.itemName + "</strong>";

    // Instead we create more elements to separate things using proper markup.

    // Create a span element to hold the name of the item.
    let completionCard = document.createElement("div");
    completionCard.setAttribute("class", "completionCard");

    let itemName = document.createElement('span');
    itemName.innerText = item.itemName; // And we just put the text into this span, and nothing else.

    let completion = document.createElement("span");

    let file = document.createElement("br");
    

    // Add an element to represent the remove button
    let itemRemove = document.createElement('button');
    itemRemove.setAttribute('class', 'remove');
    itemRemove.innerText = 'x'; // You can CSS this later to be pretty

    // Add an event handler to the remove button. To make this work properly we need to do two things. Remove the DOM element from the document _AND_ remove the correct item from the local storage list.
    itemRemove.addEventListener("click", function() {
      // This allows us to remove the list li element directly which takes care of the visual removal.
      let id = event.target.parentElement.getAttribute('data-id');
      let index = taskListArray.findIndex(task => task.id === Number(id));
      removeItemFromArray(taskListArray, index)

      itemLi.remove();

      // And the custom removeItem function helps us to remove it from local storage.
      removeItem(item.itemName);
      updateEmpty();

    });

    // Add the name and remove button to the li

    itemLi.appendChild(completionCard);
    completionCard.appendChild(itemRemove);
    completionCard.appendChild(itemName);
    completionCard.appendChild(completion);
    completionCard.appendChild(file);

    // Add the li to the ul.
    itemUl.appendChild(itemLi);
  });
}

// Removes a specific item, by name from local storage.
function removeItem(itemName) {
  // Use our custom getItems() function to retrieve info from local storage. Since we need to do this in a few places, see how the custom function is more efficient?
  let items = getItems();

  // This helps us to find the array index for the item that we want to remove. It compares the information we pass in (via the itemName variable) to the information in the objects within the array. If it matches, we get a number back - i.e. items[3].
  let itemIndex = items.findIndex(function(item) {
    return item.itemName == itemName;
  });

  // We've talked about splice() in class before (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), it removes a specific item out of the array 
  items.splice(itemIndex, 1);

  // Now we do the same process of writing information back into local storage that we did earlier.
  items = JSON.stringify(items);
  localStorage.setItem('items', items);
}


// Function to hide the 'you haven't added any tasks' text
function updateEmpty() {
    if (taskListArray.length > 0) {
        document.getElementsByClassName('emptyList').style.display = 'none';
    } else {
        document.getElementsByClassName('emptyList').style.display = 'block';
    }
}

function removeItemFromArray(arr, index) {
    if (index > -1) {
        arr.splice(index, 1)
    }
    return arr;
}




// functions for drag and drop feature 

function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
}

all_status.forEach((status) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", dragDrop);
});
  
function dragOver(e) {
    e.preventDefault();
}
  
function dragEnter() {
    this.style.border = "1px dashed #ccc";
}
  
function dragLeave() {
    this.style.border = "none";
}
  
function dragDrop() {
    this.style.border = "none";
    this.appendChild(draggableTodo);

}

function show() {
  document.getElementById("sidebar").style.marginLeft = "500px";
}

function hide() {
  document.getElementById("sidebar").style.marginLeft = "0px";
}




// this event listener is being added to the "add column" button
// document.getElementById("myBtn").addEventListener("click", addColumn); 

// here, i am creating the addColumn() function which creates a new column containing a heading and 
// "+ Add Task" button whenever the user clicks the "addColumn" button
// function addColumn() {
//     console.log("button clicked");
//     var newColumn = document.createElement("div");
//     var newHeading = document.createElement("h2");
//     var headingText = document.createTextNode("new column");
//     var kBoard = document.getElementById("k-board");

//     var newButton = document.createElement("button");
//     newButton.textContent = "+ Add Task";
//     newButton.className += "add-task";

//     newHeading.appendChild(headingText);
//     newColumn.appendChild(newHeading);
//     kBoard.appendChild(newColumn);
//     kBoard.appendChild(newButton);

// }
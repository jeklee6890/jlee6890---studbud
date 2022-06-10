var timerChange = document.getElementById("timer-select");
var greenTimer = document.getElementById("elapsed");

timerChange.onchange = function() {
  greenTimer.innerHTML = "Time elapsed since" + "<br>" + "getting 'green time':"
}


// these two arrays store the links to the drawings i have made in relation to the user's chosen theme. 
// if they use light-mode, then the images inside lightImage will be loaded, and the same if they  
// choose dark-mode with the images in darkImage
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

// this code is for the pop-up modal when the user clicks the 'add-task' button, initialising the variables first 
  var modal = document.querySelector(".task-modal");
  var btn = document.getElementsByClassName("add-task");

// retrieving the <span> element which will close the modal
  var span = document.getElementsByClassName("close");


// functions to make the sidebar appear based on the user's interactions
  function show() {
    document.getElementById("sidebar").style.marginLeft = "500px";
  }

  function hide() {
    document.getElementById("sidebar").style.marginLeft = "0px";
  }



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

// the 'submit' variable hides the tasklist modal once the user completes the input fields
  let submit = document.querySelector(".submit");

  submit.onclick = function() {
      modal.style.display = "none";
  }

// array for storing the tasklist inputs 
  var taskListArray = [];


// this subButton will get the information from the takslist form, which is later added to local storage
  let subButton = document.getElementById("submit");

// the renderItems function is called to get the task from local storage
  renderItems();

// this event listener is for when the user clicks on the submit button 
  subButton.addEventListener("click", function() {

    // Start by getting the form values.
    let itemName = document.getElementById("taskInput").value;
    let itemCompletion = document.getElementById("estimatedTimeInput").value; 
    let itemPriority = document.getElementById("priorityInput").value; 

    if(itemName == "") { document.getElementById("taskInput").classList.add("error");
      return;
  }

  // here i am making an object that will store the tasklist data 
    let itemObj = {
      'itemName': itemName,
      'itemCpmpletion': itemCompletion,
      'itemPriority': itemPriority
    };

    let existingItems = getItems();

  // by using the push function, a new task can be added and stored into local storage
    existingItems.push(itemObj);

  // this JSON.stringify function helps to convert the array into a string so it can be put into local storage
    existingItems = JSON.stringify(existingItems);

    localStorage.setItem('items', existingItems);

    taskListArray.push(itemObj);
    renderItems();
});




// code for drag-and-drop feature 
  const todos = document.querySelectorAll(".completionCard");
  const all_status = document.querySelectorAll(".column");
  let draggableTodo = null;

  todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
  });

// these functions help to execute the drag and drop feature by changing the features of the tasklist card 
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

  all_status.forEach((column) => {
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

// these variables are for the timer that is located in the sidebar
  const timeElement = document.querySelector('.time');
  const buttonStart = document.getElementById('start');
  const buttonStop = document.getElementById('stop');
  const buttonReset = document.getElementById('reset');
  
  let seconds = 0;
  let interval = null;
  
// by using event listeners, the timer will stop and start based on the user's interaction  
  buttonStart.addEventListener('click', startTimer);
  buttonStop.addEventListener('click', stopTimer);
  buttonReset.addEventListener('click', resetTimer);
  
  function timer() {
    seconds++;
  
    let hours = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hours * 3600)) / 60);
    let secs = seconds % 60;
    
    // these 'if' statements make sure the timer displays the correct time 
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
  
  
// here i am creating the custom functions to help the timer load which will be executed on their
// respective buttons i.e. startTimer will run when the 'start' button is clicked etc  
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
  
  




// these functions are for the tasklist and kanban board; getItems is for retrieving the tasks from local storage
  function getItems() {
    // checking if we have any item items in local storage already
    let items = localStorage.getItem('items');

    if (items == null) {
      return [];
    }

    // If we are still here, then we do have items in the list, or the list is empty.
    // Either way, we convert that information back into an array using JSON.parse (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse), this is the opposite action to JSON.stringify.
    items = JSON.parse(items);

    return items;
  }

// renderItems is a function to print the tasks onto the screen 
  function renderItems() {
    let items = getItems();

    // this variable allows the javascript code to print into the empty <ul> tag from the html code
    let itemUl = document.querySelector('.empty ul');

    items.forEach(function(item) {

      // itemLi will contain all of the tasklist input fields that will then be printed on the screen
      let itemLi = document.createElement('p'); 

      // completionCard is the div that will also hold the tasklist data and will be 
      // draggable so it can be moved between kanban columns 
      let completionCard = document.createElement("div");
      completionCard.setAttribute("class", "completionCard");
      completionCard.setAttribute("draggable", "true");

      let itemName = document.createElement('span');
      itemName.innerText = item.itemName;
      itemName.setAttribute("class", "itemName");

      let space = document.createElement("br");

      let itemPriority = document.createElement('span');
      itemPriority.innerText = "Priority: " + item.itemPriority;

      let itemCompletion = document.createElement('span');
      itemCompletion.innerText = "Completion Status: " + item.itemCompletion;
      

      // this button will remove the task card from the kanban baord 
      let itemRemove = document.createElement('button');
      itemRemove.setAttribute('class', 'remove');
      itemRemove.innerText = 'x';


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

      // these variables and code will allow the illustrations i have created for each 
      // css mode (light and dark) to be loaded onto the screen randomly with each task card, 
      // adding an element of dynamacy and visual interest for the user. 
      var imgGenerator = Math.floor(Math.random() * lightImage.length);
      let newImage = new Image(100, 100);
      newImage.src = lightImage[imgGenerator];

      // finally, all of the new elements are appended to the completionCard and itemLi 
      // elements, which will then be added to the kanban columns 
      itemLi.appendChild(completionCard);
      completionCard.appendChild(newImage);
      completionCard.appendChild(itemRemove);
      completionCard.appendChild(itemName);
      completionCard.appendChild(space);
      completionCard.appendChild(itemPriority);
      completionCard.appendChild(space);
      completionCard.appendChild(itemCompletion);
      completionCard.appendChild(space);

    
      // adding the li to the empty <ul>
      itemUl.appendChild(itemLi);
    });
  }

// the removeItem function will run when the user clicks the remove button in order to remove the task from local storage
  function removeItem(itemName) {
    let items = getItems();

    // this code makes sure i am removing the correct task using the array index 
    let itemIndex = items.findIndex(function(item) {
      return item.itemName == itemName;
    });

    // splice helps to remove the task once the array indexes match
    items.splice(itemIndex, 1);

    items = JSON.stringify(items);
    localStorage.setItem('items', items);
  }


// function to hide the 'you haven't added any tasks' text
  function updateEmpty() {
      if (taskListArray.length > 0) {
          document.getElementsByClassName('emptyList').style.display = 'none';
      } else {
          document.getElementsByClassName('emptyList').style.display = 'block';
      }
  }

// function to remove the task from the taskListArray  
  function removeItemFromArray(arr, index) {
      if (index > -1) {
          arr.splice(index, 1)
      }
      return arr;
  }




  
// the code below is for an addColumn button which i was unable to implement in time. for future 
// development, this feature is something i would like to execute 




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
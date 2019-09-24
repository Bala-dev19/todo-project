/* To-Do list js programming */

//Global declaration of array of tasks.
var taskList = [];

//Adding onclick event to menu button to toogle.
var menuButton = document.getElementById("menuButton");
menuButton.addEventListener("click", toogleMenu);

//Adding onclick event to close button to close steps div.
var closeStepsButton = document.getElementById("closeStepsButton");
closeStepsButton.onclick = function(e) {closeSteps()};

/**
 * ToogleMenu is to open and close the menu sidebar div,
 * As per the existing size of div , this will reduce or increase width.
 */
function toogleMenu() {
  var listName = document.getElementsByClassName("listName");
  if(document.getElementById("menuBar").style.width != "20%") {
    document.getElementById("menuBar").style.width = "20%";
    document.getElementById("list").style.width = "100%";
    document.getElementById("tasks").style.width = "80%";  
    document.getElementById("newList").style.display = "block";
    
    //Displaying list names one by one.
    for(var i = 0; i < listName.length; i++) {
      listName[i].style.display = "inline-block";
    }
  } else {
  
    //If already open, closing it.
    document.getElementById("menuBar").style.width = "3.5%";
    document.getElementById("tasks").style.width = "100%";
    document.getElementById("newList").style.display = "none";
    
    //Making list names none one by one to hide.
    for(var i = 0; i < listName.length; i++) {
      listName[i].style.display = "none";
    }
  }
}

/**
 * Event listner is added to add task input box, 
 * which is used to get values while enter is pressed.
 * A taskDetails object is formed and parameters are setted,
 * and pushed into array taskList.
 */
document.getElementById("newList").addEventListener("keyup", function(event) {
  event.preventDefault();
  var listTabel = document.getElementById("listTabel");
  var newList = document.getElementById("newList").value;
  if(event.keyCode === 13 && newList != "") {
    let taskDetails = {};
    let subTasks = [];
    let id = Date.now();
    taskDetails.id = id;
    taskDetails.taskName = newList;
  
    //Empty subTasks array is added to this.
    taskDetails["subTasks"] = subTasks;
    taskList.push(taskDetails);
    document.getElementById("heading").innerHTML = newList ;
    document.getElementById("newList").value = "";
    
    //Created list will be shown using displayList method.
    displayList();
  }
});

/**
 * First listTabel div is made null, Then all taskList array are displayed
 * by iterating and creating div and adding styles and attributes to it.
 *
 */
function displayList() {
  var listTabel = document.getElementById("listTabel");
  listTabel.innerHTML = "";
  for(let i = 0; i < taskList.length; i++) {
    let newList = taskList[i].taskName;
    let index = taskList.indexOf(taskList[i]);
    var newRow = document.createElement("div");
    newRow.setAttribute("display", "flex");
    newRow.style.width = "100%";
    newRow.style.height = "2.5em";
    var icon = document.createElement("img");
    icon.setAttribute("src", "list.png");
    icon.setAttribute("height", "20em");
    icon.setAttribute("width", "25em");
    icon.style.marginLeft = "0.1em";
    newRow.appendChild(icon);
    var listName = document.createElement("div");
    listName.onclick = function(e) {getTasks(index)};
    listName.className += "listName";
    listName.innerHTML = newList;
    newRow.appendChild(listName);
    listTabel.appendChild(newRow);
  }
  getTasks(taskList.length - 1);
}

/**
 * Display all lists.
 */
function getTasks(index) {
  document.getElementById("heading").innerHTML = taskList[index].taskName;
  document.getElementById("taskIndex").value = index;
  document.getElementById("taskTabel").innerHTML = "";
  let subTasks = taskList[index].subTasks;
  for(let i = 0; i < subTasks.length; i++) {
    displaySubTasks(subTasks[i].taskName, i);
  }
}

/**
 * EventListner which adds new task to list when enter is pressed.
 *
 */
document.getElementById("newTask").addEventListener("keyup", function(event) {
  event.preventDefault();
  var taskIndex = document.getElementById("taskIndex").value;
  var newTask = document.getElementById("newTask").value;
  var taskTabel = document.getElementById("taskTabel");
  var subTask = {};
  var steps = [];
  if (event.keyCode === 13 && newTask != "") {
    subTask.taskName = newTask;
    subTask["steps"] = steps;
    subTask.comments = "";
    taskList[taskIndex].subTasks.push(subTask);
    let index = taskList[taskIndex].subTasks.indexOf(subTask);
    displaySubTasks(newTask, index);
  }
});

/**
 * Display all tasks created for a list.
 */
function displaySubTasks(newTask, index) {
  let task = document.createElement("div");
  task.className += "task";
  let icon = document.createElement("img");
  icon.setAttribute("src", "img/addList.png");
  icon.setAttribute("height", "20em");
  icon.setAttribute("width", "25em");
  icon.style.marginLeft = "0.1em";
  task.appendChild(icon);
  let taskName = document.createElement("div");
  taskName.onclick = function(e) {getSteps(index)};
  taskName.className += "taskName";
  taskName.innerHTML = newTask;
  task.appendChild(taskName);
  taskTabel.appendChild(task);
  document.getElementById("newTask").value = "";
}

/**
 * Used to display steps assigned to each task in new div.
 *
 */
function getSteps(index) {
  if(document.getElementById("tasks").style.width != "50%") {
    document.getElementById("tasks").style.width = "50%";
    document.getElementById("taskDetail").style.width = "30%";
    document.getElementById("taskDetail").style.display = "block";
  }
  var taskIndex = document.getElementById("taskIndex").value;
  document.getElementById("stepsHeading").innerHTML = taskList[taskIndex].subTasks[index].taskName;
  let steps = taskList[taskIndex].subTasks[index].steps;
  document.getElementById("steps").innerHTML = "";
  document.getElementById("subTaskIndex").value = index;
  for(let i = 0; i < steps.length; i++) {
    displaySteps(steps[i].stepName, i);   
  }
  document.getElementById("comments").value = taskList[taskIndex].subTasks[index].comments; 
}

function closeSteps() {
  document.getElementById("tasks").style.width = "80%";
  document.getElementById("taskDetail").style.width = "0%";
  document.getElementById("stepsHeading").innerHTML = "";
  document.getElementById("taskDetail").style.display = "none";
}

document.getElementById("newStep").addEventListener("keyup", function(event) {
  event.preventDefault();
  var newStep = document.getElementById("newStep").value;
  var taskIndex = document.getElementById("taskIndex").value;
  var subTaskIndex = document.getElementById("subTaskIndex").value;
  var subTask = taskList[taskIndex].subTasks[subTaskIndex];
  var step = {};
  var steps = [];
  if (event.keyCode === 13 && newStep != "") {
    step.stepName = newStep;
    steps = subTask.steps;
    steps.push(step);
    var index = steps.indexOf(step);
    displaySteps(newStep, index);
  }
});

function displaySteps(stepName, index) {
  let step = document.createElement("div");
  step.className += "step";
  let icon = document.createElement("img");
  icon.setAttribute("src", "img/addList.png");
  icon.setAttribute("height", "20em");
  icon.setAttribute("width", "25em");
  icon.style.marginLeft = "0.1em";
  step.appendChild(icon);
  let stepNameDiv = document.createElement("div");
  stepNameDiv.className += "stepName";
  stepNameDiv.innerHTML = stepName;
  step.appendChild(stepNameDiv);
  let removeButton = document.createElement("button");
  removeButton.className += "removeStep";
  removeButton.innerHTML = "X";
  removeButton.onclick = function(e) {removeStep(index)}
  step.appendChild(removeButton);
  steps.appendChild(step);
  newStep.value = "";
}

document.getElementById("comments").addEventListener("keyup", function(event) {
  event.preventDefault();
  var comments = document.getElementById("comments").value;
  var taskIndex = document.getElementById("taskIndex").value;
  var subTaskIndex = document.getElementById("subTaskIndex").value;
  var subTask = taskList[taskIndex].subTasks[subTaskIndex];
  if (event.keyCode === 13 && comments != "") {
    subTask.comments = comments;
    getSteps(subTaskIndex);
  }
});

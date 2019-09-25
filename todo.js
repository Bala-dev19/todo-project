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
  var sidemenu = document.getElementsByClassName("sideMenu");
  if(document.getElementById("menuBar").style.width != "20%") {
    document.getElementById("menuBar").style.width = "20%";
    document.getElementById("list").style.width = "100%";
    document.getElementById("tasks").style.width = "80%";  
    document.getElementById("newList").style.display = "block";
    sidemenu[0].style.height = "19.19px";
    //Displaying list names one by one.
    for(var i = 0; i < listName.length; i++) {
      listName[i].style.display = "inline-block";
    }
  } else {
  
    //If already open, closing it.
    document.getElementById("menuBar").style.width = "3.5%";
    document.getElementById("tasks").style.width = "100%";
    document.getElementById("newList").style.display = "none";
    sidemenu[0].style.height = "19.19px";
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
    icon.className += "icons";
    newRow.appendChild(icon);
    let listName = document.createElement("div");
    listName.onclick = function(e) {getTasks(index)};
    listName.className += "listName";
    listName.innerHTML = newList;
    newRow.appendChild(listName);
    let count = taskList.filter(getActiveTasks);
    let countNode = document.createTextNode("");
    listTabel.appendChild(newRow);
  }
  getTasks(taskList.length - 1);
}

function getActiveTasks() {

}

/**
 * Display all lists.
 */
function getTasks(index) {
  document.getElementById("heading").innerHTML = taskList[index].taskName + "...";
  document.getElementById("taskIndex").value = index;
  document.getElementById("taskTabel").innerHTML = "";
  let subTasks = taskList[index].subTasks;
  for(let i = 0; i < subTasks.length; i++) {
    displaySubTasks(subTasks[i]);
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
    subTask.isActive = true;
    subTask["steps"] = steps;
    subTask.comments = "";
    taskList[taskIndex].subTasks.push(subTask);
    displaySubTasks(subTask);
  }
});

/**
 * Display all tasks created for a list.
 */
function displaySubTasks(subTask) {
  let taskIndex = document.getElementById("taskIndex").value;
  let index = taskList[taskIndex].subTasks.indexOf(subTask);
  let task = document.createElement("div");
  task.className += "task";
  let icon = document.createElement("img");
  icon.setAttribute("src", "img/circle.svg");
  icon.onclick = function(e) {strikeOut(index)};
  icon.className += "icons";
  task.appendChild(icon);
  let taskNameDiv = document.createElement("div");
  taskNameDiv.onclick = function(e) {getSteps(index)};
  taskNameDiv.className += "taskName";
  if(!subTask.isActive) {
    icon.setAttribute("src", "img/check-circle-solid.svg");
    taskNameDiv.style.textDecoration= "line-through";
  }
  taskNameDiv.innerHTML = subTask.taskName;
  task.appendChild(taskNameDiv);
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
  let taskIndex = document.getElementById("taskIndex").value;
  let subTask = taskList[taskIndex].subTasks[index];
  document.getElementById("stepIcon").onclick = function(e) {strikeOut(index)};
  document.getElementById("stepsHeading").value = subTask.taskName;
  if(!subTask.isActive) {
    document.getElementById("stepsHeading").style.textDecoration = "line-through";
    document.getElementById("stepIcon").setAttribute("src", "img/check-circle-solid.svg");
  } else {
    document.getElementById("stepsHeading").style.textDecoration = "none";
    document.getElementById("stepIcon").setAttribute("src", "img/circle.svg");
  }
  let steps = taskList[taskIndex].subTasks[index].steps;
  document.getElementById("steps").innerHTML = "";
  document.getElementById("subTaskIndex").value = index;
  for(let i = 0; i < steps.length; i++) {
    displaySteps(steps[i],taskIndex,index);   
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
    step.isActive = true;
    steps = subTask.steps;
    steps.push(step);
    displaySteps(step,taskIndex,subTaskIndex);
  }
});

function displaySteps(step,taskIndex,subTaskIndex) {
  let steps = taskList[taskIndex].subTasks[subTaskIndex].steps;
  let index = steps.indexOf(step);
  let stepDiv = document.createElement("div");
  stepDiv.className += "step";
  let icon = document.createElement("img");
  icon.setAttribute("src", "img/circle.svg");
  icon.onclick = function(e) {strikeOutStep(index)};
  icon.className += "icons";
  stepDiv.appendChild(icon);
  let stepNameDiv = document.createElement("div");
  stepNameDiv.className += "stepName";
  if(!step.isActive) {
    icon.setAttribute("src", "img/check-circle-solid.svg");
    stepNameDiv.style.textDecoration= "line-through";
  }
  stepNameDiv.innerHTML = step.stepName;
  stepDiv.appendChild(stepNameDiv);
  let removeButton = document.createElement("button");
  removeButton.className += "removeStep";
  removeButton.innerHTML = "X";
  removeButton.onclick = function(e) {removeStep(index)}
  stepDiv.appendChild(removeButton);
  document.getElementById("steps").appendChild(stepDiv);
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

function strikeOut(index) {
  var taskIndex = document.getElementById("taskIndex").value;
  let subTask = taskList[taskIndex].subTasks[index];
  if(subTask.isActive) {
    subTask.isActive = false;
  } else {
    subTask.isActive = true;
  }
  getTasks(taskIndex);
  getSteps(index);
}

document.getElementById("stepsHeading").addEventListener("keyup", function(event) {
  event.preventDefault();
  var updatedTaskName = document.getElementById("stepsHeading").value;
  var taskIndex = document.getElementById("taskIndex").value;
  var subTaskIndex = document.getElementById("subTaskIndex").value;
  var subTask = taskList[taskIndex].subTasks[subTaskIndex];
  if (event.keyCode === 13 && comments != "") {
    subTask.taskName = updatedTaskName;
    getTasks(taskIndex);
    getSteps(subTaskIndex);
  }
});

function strikeOutStep(index) {
  let taskIndex = document.getElementById("taskIndex").value;
  let subTaskIndex = document.getElementById("subTaskIndex").value;
  let step = taskList[taskIndex].subTasks[subTaskIndex].steps[index];
  if(step.isActive) {
    step.isActive = false;
  } else {
    step.isActive = true;
  }
  getSteps(subTaskIndex);
}

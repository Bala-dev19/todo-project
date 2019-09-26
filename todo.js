/* To-Do list js programming */

//Global declaration of array of tasks.
var taskList = [];

function getCreatedElement(element) {
  return document.createElement(element);
}

function getDocumentElement(documentId) {
  return document.getElementById(documentId);
}

//Adding onclick event to menu button to toogle.
var menuButton = getDocumentElement("menuButton");
menuButton.addEventListener("click", toogleMenu);

//Adding onclick event to close button to close steps div.
var closeStepsButton = getDocumentElement("closeStepsButton");
closeStepsButton.onclick = function(e) {closeSteps()};

/**
 * ToogleMenu is to open and close the menu sidebar div,
 * As per the existing size of div , this will reduce or increase width.
 */
function toogleMenu() {
  var listName = document.getElementsByClassName("listName");
  var sidemenu = document.getElementsByClassName("sideMenu");
  if(getDocumentElement("menuBar").style.width != "20%") {
    getDocumentElement("menuBar").style.width = "20%";
    getDocumentElement("list").style.width = "100%";
    getDocumentElement("tasks").style.width = "80%";  
    getDocumentElement("newList").style.display = "block";
    sidemenu[0].style.height = "19.19px";
    //Displaying list names one by one.
    for(var i = 0; i < listName.length; i++) {
      listName[i].style.display = "inline-block";
      sidemenu[i].a.style.display = "inline";
    }
  } else {
  
    //If already open, closing it.
    getDocumentElement("menuBar").style.width = "3.5%";
    getDocumentElement("tasks").style.width = "100%";
    getDocumentElement("newList").style.display = "none";
    sidemenu[0].style.height = "19.19px";
    //Making list names none one by one to hide.
    for(var i = 0; i < listName.length; i++) {
      listName[i].style.display = "none";
      sidemenu[i].a.style.display = "none";
    }
  }
}

/**
 * Event listner is added to add task input box, 
 * which is used to get values while enter is pressed.
 * A taskDetails object is formed and parameters are setted,
 * and pushed into array taskList.
 */
getDocumentElement("newList").addEventListener("keyup", function(event) {
  event.preventDefault();
  var listTabel = getDocumentElement("listTabel");
  var newList = getDocumentElement("newList").value;
  if(event.keyCode === 13 && newList != "") {
    let taskDetails = {};
    let subTasks = [];
    let id = Date.now();
    taskDetails.id = id;
    taskDetails.taskName = newList;
  
    //Empty subTasks array is added to this.
    taskDetails["subTasks"] = subTasks;
    taskList.push(taskDetails);
    getDocumentElement("heading").innerHTML = newList ;
    getDocumentElement("newList").value = "";
    
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
  var listTabel = getDocumentElement("listTabel");
  listTabel.innerHTML = "";
  for(let i = 0; i < taskList.length; i++) {
    let newList = taskList[i].taskName;
    let index = taskList.indexOf(taskList[i]);
    var newRow = getCreatedElement("div");
    newRow.setAttribute("display", "flex");
    newRow.style.width = "100%";
    newRow.style.height = "2.5em";
    var icon = getCreatedElement("img");
    icon.setAttribute("src", "list.png");
    icon.className += "icons";
    newRow.appendChild(icon);
    let listName = getCreatedElement("div");
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
  getDocumentElement("heading").innerHTML = taskList[index].taskName + "...";
  getDocumentElement("taskIndex").value = index;
  getDocumentElement("taskTabel").innerHTML = "";
  let subTasks = taskList[index].subTasks;
  for(let i = 0; i < subTasks.length; i++) {
    displaySubTasks(subTasks[i]);
  }
}

/**
 * EventListner which adds new task to list when enter is pressed.
 *
 */
getDocumentElement("newTask").addEventListener("keyup", function(event) {
  event.preventDefault();
  var taskIndex = getDocumentElement("taskIndex").value;
  var newTask = getDocumentElement("newTask").value;
  var taskTabel = getDocumentElement("taskTabel");
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
  let taskIndex = getDocumentElement("taskIndex").value;
  let index = taskList[taskIndex].subTasks.indexOf(subTask);
  let task = getCreatedElement("div");
  task.className += "task";
  let icon = getCreatedElement("img");
  icon.setAttribute("src", "img/circle.svg");
  icon.onclick = function(e) {strikeOut(index)};
  icon.className += "icons";
  task.appendChild(icon);
  let taskNameDiv = getCreatedElement("div");
  taskNameDiv.onclick = function(e) {getSteps(index)};
  taskNameDiv.className += "taskName";
  if(!subTask.isActive) {
    icon.setAttribute("src", "img/check-circle-solid.png");
    taskNameDiv.style.textDecoration= "line-through";
  }
  taskNameDiv.innerHTML = subTask.taskName;
  task.appendChild(taskNameDiv);
  taskTabel.appendChild(task);
  getDocumentElement("newTask").value = "";
}

/**
 * Used to display steps assigned to each task in new div.
 *
 */
function getSteps(index) {
  if(getDocumentElement("tasks").style.width != "50%") {
    getDocumentElement("tasks").style.width = "50%";
    getDocumentElement("taskDetail").style.width = "30%";
    getDocumentElement("taskDetail").style.display = "block";
  }
  let taskIndex = getDocumentElement("taskIndex").value;
  let subTask = taskList[taskIndex].subTasks[index];
  getDocumentElement("stepIcon").onclick = function(e) {strikeOut(index)};
  getDocumentElement("stepsHeading").value = subTask.taskName;
  if(!subTask.isActive) {
    getDocumentElement("stepsHeading").style.textDecoration = "line-through";
    getDocumentElement("stepIcon").setAttribute("src", "img/check-circle-solid.png");
  } else {
    getDocumentElement("stepsHeading").style.textDecoration = "none";
    getDocumentElement("stepIcon").setAttribute("src", "img/circle.svg");
  }
  let steps = taskList[taskIndex].subTasks[index].steps;
  getDocumentElement("steps").innerHTML = "";
  getDocumentElement("subTaskIndex").value = index;
  for(let i = 0; i < steps.length; i++) {
    displaySteps(steps[i],taskIndex,index);   
  }
  getDocumentElement("comments").value = taskList[taskIndex].subTasks[index].comments; 
}

function closeSteps() {
  getDocumentElement("tasks").style.width = "80%";
  getDocumentElement("taskDetail").style.width = "0%";
  getDocumentElement("stepsHeading").innerHTML = "";
  getDocumentElement("taskDetail").style.display = "none";
}

getDocumentElement("newStep").addEventListener("keyup", function(event) {
  event.preventDefault();
  var newStep = getDocumentElement("newStep").value;
  var taskIndex = getDocumentElement("taskIndex").value;
  var subTaskIndex = getDocumentElement("subTaskIndex").value;
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
  let stepDiv = getCreatedElement("div");
  stepDiv.className += "step";
  let icon = getCreatedElement("img");
  icon.setAttribute("src", "img/circle.svg");
  icon.onclick = function(e) {strikeOutStep(index)};
  icon.className += "icons";
  stepDiv.appendChild(icon);
  let stepNameDiv = getCreatedElement("div");
  stepNameDiv.className += "stepName";
  if(!step.isActive) {
    icon.setAttribute("src", "img/check-circle-solid.png");
    stepNameDiv.style.textDecoration= "line-through";
  }
  stepNameDiv.innerHTML = step.stepName;
  stepDiv.appendChild(stepNameDiv);
  let removeButton = getCreatedElement("button");
  removeButton.className += "removeStep";
  removeButton.innerHTML = "X";
  removeButton.onclick = function(e) {removeStep(index)}
  stepDiv.appendChild(removeButton);
  getDocumentElement("steps").appendChild(stepDiv);
  newStep.value = "";
}

getDocumentElement("comments").addEventListener("keyup", function(event) {
  event.preventDefault();
  var comments = getDocumentElement("comments").value;
  var taskIndex = getDocumentElement("taskIndex").value;
  var subTaskIndex = getDocumentElement("subTaskIndex").value;
  var subTask = taskList[taskIndex].subTasks[subTaskIndex];
  if (event.keyCode === 13 && comments != "") {
    subTask.comments = comments;
    getSteps(subTaskIndex);
  }
});

function strikeOut(index) {
  var taskIndex = getDocumentElement("taskIndex").value;
  let subTask = taskList[taskIndex].subTasks[index];
  if(subTask.isActive) {
    subTask.isActive = false;
  } else {
    subTask.isActive = true;
  }
  getTasks(taskIndex);
  getSteps(index);
}

getDocumentElement("stepsHeading").addEventListener("keyup", function(event) {
  event.preventDefault();
  var updatedTaskName = getDocumentElement("stepsHeading").value;
  var taskIndex = getDocumentElement("taskIndex").value;
  var subTaskIndex = getDocumentElement("subTaskIndex").value;
  var subTask = taskList[taskIndex].subTasks[subTaskIndex];
  if (event.keyCode === 13 && updatedTaskName != "") {
    subTask.taskName = updatedTaskName;
    getTasks(taskIndex);
    getSteps(subTaskIndex);
  }
});

function strikeOutStep(index) {
  let taskIndex = getDocumentElement("taskIndex").value;
  let subTaskIndex = getDocumentElement("subTaskIndex").value;
  let step = taskList[taskIndex].subTasks[subTaskIndex].steps[index];
  if(step.isActive) {
    step.isActive = false;
  } else {
    step.isActive = true;
  }
  getSteps(subTaskIndex);
}
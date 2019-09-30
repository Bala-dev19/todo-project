/* To-Do list js programming */

//Global declaration of array of tasks.
var taskList = [];

function getCreatedElement(element) {
  return $(document.createElement(element));
}

function getDocumentElement(documentId) {
  return $(documentId);
}

//Adding onclick event to menu button to toogle.
var menuButton = getDocumentElement("#menuButton");
menuButton.on("click", toogleMenu);

//Adding onclick event to close button to close steps div.
var closeStepsButton = getDocumentElement("#closeStepsButton");
closeStepsButton.onclick = function(e) {closeSteps()};

/**
 * ToogleMenu is to open and close the menu sidebar div,
 * As per the existing size of div , this will reduce or increase width.
 */
function toogleMenu() {
  var listName = $(".listName");
  var sidemenu = $(".sideMenu");
  if(getDocumentElement("#menuBar").css("width") != "20%") {
    getDocumentElement("#menuBar").css("width" ,"20%");
    getDocumentElement("#list").css("width" ,"100%");
    getDocumentElement("#tasks").css("width","80%");  
    getDocumentElement("#newList").css("display", "block");
    sidemenu.css("height", "19.19px");
    //Displaying list names one by one.
    for(var i = 0; i < listName.length; i++) {
      listName[i].css("display" ,"inline-block");
      sidemenu[i].a.css("display","inline");
    }
  } else {
    //If already open, closing it.
    getDocumentElement("#menuBar").css("width","3.5%");
    getDocumentElement("#tasks").css(width, "100%");
    getDocumentElement("#newList").css("display" ,"none");
    sidemenu.css("height", "19.19px");
    //Making list names none one by one to hide.
    for(var i = 0; i < listName.length; i++) {
      listName[i].css("display", "none");
      sidemenu[i].a.css("display", "none");
    }
  }
}

/**
 * Event listner is added to add task input box, 
 * which is used to get values while enter is pressed.
 * A taskDetails object is formed and parameters are setted,
 * and pushed into array taskList.
 */
getDocumentElement("#newList").on("keyup", function(event) {
  event.preventDefault();
  var listTabel = getDocumentElement("#listTabel");
  var newList = getDocumentElement("#newList").val();
  if(event.keyCode === 13 && newList != "") {
    let taskDetails = {};
    let subTasks = [];
    let id = Date.now();
    taskDetails.id = id;
    taskDetails.taskName = newList;
  
    //Empty subTasks array is added to this.
    taskDetails["subTasks"] = subTasks;
    taskList.push(taskDetails);
    getDocumentElement("#heading").html(newList);
    getDocumentElement("#newList").val("");
    
    //Created list will be shown using displayList method.
    displayList();
  }
});

/**
 * First listTabel div is made null, Then all taskList array are displayed
 * by iterating and creating div and adding styles and attributes to it.
 */
function displayList() {
  var listTabel = getDocumentElement("#listTabel");
  listTabel.empty();
  for(let i = 0; i < taskList.length; i++) {
    let newList = taskList[i].taskName;
    let index = taskList.indexOf(taskList[i]);
    var newRow = getCreatedElement("div");
    newRow.attr("display", "flex");
    newRow.attr("width", "100%");
    newRow.attr("height", "2.5em");
    var icon = getCreatedElement("img");
    icon.attr("src", "list.png");
    icon.addClass("icons");
    newRow.appendChild(icon);
    let listName = getCreatedElement("div");
    listName.onclick = function(e) {getTasks(index)};
    listName.addClass("listName");
    listName.html(newList);
    newRow.appendChild(listName);
    listTabel.appendChild(newRow);
  }
  getTasks(taskList.length - 1);
}

/**
 * Display all lists.
 */
function getTasks(index) {
  getDocumentElement("#heading").html(taskList[index].taskName + "...");
  getDocumentElement("#taskIndex").val(index);
  $("#taskTabel").empty();
  let subTasks = taskList[index].subTasks;
  for(let i = 0; i < subTasks.length; i++) {
    displaySubTasks(subTasks[i]);
  }
}

/**
 * EventListner which adds new task to list when enter is pressed.
 *
 */
getDocumentElement("#newTask").on("keyup", function(event) {
  event.preventDefault();
  var taskIndex = getDocumentElement("#taskIndex").val();
  var newTask = getDocumentElement("#newTask").val();
  var taskTabel = getDocumentElement("#taskTabel");
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
  let taskIndex = getDocumentElement("#taskIndex").val();
  let index = taskList[taskIndex].subTasks.indexOf(subTask);
  let task = getCreatedElement("div");
  task.addClass("task");
  let icon = getCreatedElement("img");
  icon.attr("src", "img/circle.svg");
  icon.onclick = function(e) {strikeOut(index)};
  icon.addClass("icons");
  task.appendChild(icon);
  let taskNameDiv = getCreatedElement("div");
  taskNameDiv.onclick = function(e) {getSteps(index)};
  taskNameDiv.addClass("taskName");
  if(!subTask.isActive) {
    icon.attr("src", "img/check-circle-solid.png");
    taskNameDiv.css("textDecoration" ,"line-through");
  }
  taskNameDiv.html(subTask.taskName);
  task.appendChild(taskNameDiv);
  taskTabel.appendChild(task);
  getDocumentElement("#newTask").val("");
}

/**
 * Used to display steps assigned to each task in new div.
 *
 */
function getSteps(index) {
  if(getDocumentElement("#tasks").css("width") != "50%") {
    getDocumentElement("#tasks").css("width" ,"50%");
    getDocumentElement("#taskDetail").css("width" ,"30%");
    getDocumentElement("#taskDetail").css("display" ,"block");
  }
  let taskIndex = getDocumentElement("#taskIndex").val();
  let subTask = taskList[taskIndex].subTasks[index];
  getDocumentElement("#stepIcon").onclick = function(e) {strikeOut(index)};
  getDocumentElement("#stepsHeading").val(subTask.taskName);
  if(!subTask.isActive) {
    getDocumentElement("#stepsHeading").css("textDecoration" ,"line-through");
    getDocumentElement("#stepIcon").attr("src", "img/check-circle-solid.png");
  } else {
    getDocumentElement("#stepsHeading").css("textDecoration" ,"none");
    getDocumentElement("#stepIcon").attr("src", "img/circle.svg");
  }
  let steps = taskList[taskIndex].subTasks[index].steps;
  $("#steps").empty();
  getDocumentElement("#subTaskIndex").val(index);
  for(let i = 0; i < steps.length; i++) {
    displaySteps(steps[i],taskIndex,index);   
  }
  getDocumentElement("#comments").val(taskList[taskIndex].subTasks[index].comments); 
}

function closeSteps() {
  getDocumentElement("#tasks").css("width", "80%");
  getDocumentElement("#taskDetail").css("width","0%");
  getDocumentElement("#stepsHeading").empty();
  getDocumentElement("#taskDetail").css("display" ,"none");
}

getDocumentElement("#newStep").on("keyup", function(event) {
  event.preventDefault();
  var newStep = getDocumentElement("#newStep").val();
  var taskIndex = getDocumentElement("#taskIndex").val();
  var subTaskIndex = getDocumentElement("#subTaskIndex").val();
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
  stepDiv.addClass("step");
  let icon = getCreatedElement("img");
  icon.attr("src", "img/circle.svg");
  icon.onclick = function(e) {strikeOutStep(index)};
  icon.addClass("icons");
  stepDiv.appendChild(icon);
  let stepNameDiv = getCreatedElement("div");
  stepNameDiv.addClass("stepName");
  if(!step.isActive) {
    icon.attr("src", "img/check-circle-solid.png");
    stepNameDiv.css("textDecoration" ,"line-through");
  }
  stepNameDiv.html(step.stepName);
  stepDiv.appendChild(stepNameDiv);
  let removeButton = getCreatedElement("button");
  removeButton.addClass("removeStep");
  removeButton.html("X");
  removeButton.onclick = function(e) {removeStep(index)}
  stepDiv.appendChild(removeButton);
  getDocumentElement("#steps").appendChild(stepDiv);
  newStep.val("");
}

function removeStep(index){
  
}

getDocumentElement("#comments").on("keyup", function(event) {
  event.preventDefault();
  var comments = getDocumentElement("#comments").val();
  var taskIndex = getDocumentElement("#taskIndex").val();
  var subTaskIndex = getDocumentElement("#subTaskIndex").val();
  var subTask = taskList[taskIndex].subTasks[subTaskIndex];
  if (event.keyCode === 13 && comments != "") {
    subTask.comments = comments;
    getSteps(subTaskIndex);
  }
});

function strikeOut(index) {
  var taskIndex = getDocumentElement("#taskIndex").val();
  let subTask = taskList[taskIndex].subTasks[index];
  if(subTask.isActive) {
    subTask.isActive = false;
  } else {
    subTask.isActive = true;
  }
  getTasks(taskIndex);
  getSteps(index);
}

getDocumentElement("#stepsHeading").on("keyup", function(event) {
  event.preventDefault();
  var updatedTaskName = getDocumentElement("#stepsHeading").val();
  var taskIndex = getDocumentElement("#taskIndex").val();
  var subTaskIndex = getDocumentElement("#subTaskIndex").val();
  var subTask = taskList[taskIndex].subTasks[subTaskIndex];
  if (event.keyCode === 13 && updatedTaskName != "") {
    subTask.taskName = updatedTaskName;
    getTasks(taskIndex);
    getSteps(subTaskIndex);
  }
});

function strikeOutStep(index) {
  let taskIndex = getDocumentElement("#taskIndex").val();
  let subTaskIndex = getDocumentElement("#subTaskIndex").val();
  let step = taskList[taskIndex].subTasks[subTaskIndex].steps[index];
  if(step.isActive) {
    step.isActive = false;
  } else {
    step.isActive = true;
  }
  getSteps(subTaskIndex);
}
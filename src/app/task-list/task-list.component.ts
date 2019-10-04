import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  currentTask = {};
  subTasks = [];
  constructor() { }

  ngOnInit() {
  }
  
  displayTask(task):void {
    this.currentTask = task;
    this.subTasks = task.subTasks;
    var heading = document.querySelector("#heading");
    heading.innerHTML = task.taskName;
  }
  
  addSubTask(input):void {
    console.log("hii");
    let subtaskName = input.value;
    let subTask = {subTaskName:subtaskName, isActive:true,comments:"", steps:[]};
    this.subTasks.push(subTask);
    input.value = "";
  }

}
import { Component, OnInit } from '@angular/core';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  currentTask = {taskName: null, status: true, subTasks:[]};
  taskDetail = new TaskDetailComponent;
  constructor() { }

  ngOnInit() {
  }
  
  displayTask(task):void {
    this.currentTask = task;
    var heading = document.querySelector("#heading");
    heading.innerHTML = task.taskName;
  }
  
  addSubTask(input):void {
    let subtaskName = input.value;
    let subTask = {subTaskName:subtaskName, isActive:false,comments:"", steps:[]};
    this.currentTask.subTasks.push(subTask);
    input.value = "";
  }

  strickOut(subTask):void {
    subTask.isActive = !subTask.isActive;
  }
  
  selectStep(item):void {
    this.taskDetail.displaySubtask(item);
  }
}
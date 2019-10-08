import { Component, OnInit } from '@angular/core';
import {tasks} from '../tasks';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  tasks = tasks;
  status:boolean = false;
  taskList = new TaskListComponent();
  constructor() { }

  ngOnInit() {
    
  }

  toggleMenu():void {
    this.status = !this.status;
  }

  addTask(input):void {
    let taskname = input.value;
    if("" !=  taskname) {
      let task = {taskName:taskname, status:true,subTasks:[]};
      tasks.push(task);
      input.value = "";
    }
  }
  selectTask(task):void {
    console.log("came");
    this.taskList.displayTask(task);
  }
}

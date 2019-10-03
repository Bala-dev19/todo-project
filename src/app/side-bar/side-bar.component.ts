import { Component, OnInit } from '@angular/core';
import {tasks} from '../tasks';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  tasks = tasks;
  status:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleMenu():void {
    this.status = !this.status;
  }

  addTask(input):void {
    let taskname =input.value;
    let task = [{taskName:taskname, status:true}];
    tasks.push(task[0]);
    console.log(tasks); 
  }

}

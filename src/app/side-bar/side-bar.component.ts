import { Component, OnInit, Input } from '@angular/core';
import {tasks} from '../tasks';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() taskListInfo;

  tasks = tasks;
  status:boolean = false;
  constructor() { }

  ngOnInit() {
    
  }

  /**
   * Changes the state of status which indicates menu bar is open or closed.
   */
  toggleMenu():void {
    this.status = !this.status;
  }

  /**
   * Whenever the new list input box is focused and enter key is pressed,
   * the value of input will be checked for null and proceed to create a new task 
   * and pushed into array of tasks.
   * 
   * @param input - the input element used to get value for new task.
   */
  addTask(input):void {
    let taskname = input.value;
    if("" !=  taskname) {
      let task = {taskName:taskname, status:true,subTasks:[]};
      tasks.push(task);
      input.value = "";
    }
  }

  /**
   * Selected task will be passed to task-list component.
   * 
   * @param task - selected task from which subTasks to be displayed.
   */
  selectTask(task):void {
    this.taskListInfo.displayTask(task);
  }
}

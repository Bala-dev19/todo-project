import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() taskDetailInfo;

  currentTask = {};
  constructor() { }

  ngOnInit() {
  }
  
  /**
   * Selected task will be assigned to the currentTask in this component.
   * 
   * @param task - selected task from list of tasks shown in side bar componenet
   */
  displayTask(task) {
    this.currentTask = task;
  }
  
  /**
   * Whenever the add task input box is focused and enter key is pressed,
   * the value of input will be checked for null and proceed to create a new subTask 
   * and pushed into array of subtasks.
   * 
   * @param input - the input element used to get value for new subTask.
   */
  addSubTask(input):void {
    let subtaskName = input.value;
    if("" != subtaskName) {
      let subTask = {subTaskName:subtaskName, isActive:false,comments:"", steps:[]};
      (this.currentTask as any).subTasks.push(subTask);
      input.value = "";
    }
  }

  /**
   * Selected subTask will be stricked by changing the boolean state of isStricked.
   * 
   * @param subTask - The selected subTask to be stricked.
   */
  strickOut(subTask):void {
    subTask.isStricked = !subTask.isStricked;
  }
  
  /**
   * Selected subTask will be passed to task-detail component.
   * 
   * @param subTask - selected subtask from which steps to be displayed.
   */
  selectStep(subTask):void {
    this.taskDetailInfo.displaySubtask(subTask);
  }
}
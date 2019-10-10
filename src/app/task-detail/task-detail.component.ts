import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  @Input() taskListInfo;

  currentSubTask = {};
  constructor() { }

  ngOnInit() {
  }

  /**
   * Selected subTask will be assigned to the currentSubTask in this component.
   * 
   * @param subTask - selected subTask from list of subTask shown in task-list componenet
   */
  displaySubtask(subTask){
    this.currentSubTask = subTask;
  }
  
  /**
   * Whenever the add step input box is focused and enter key is pressed,
   * the value of input will be checked for null and proceed to create a new step 
   * and pushed into array of steps.
   * 
   * @param newStep - the input element used to get value for new step.
   */
  addStep(newStep):void {
    let stepName = newStep.value;
    if("" != stepName) {
      let step = {stepName: stepName, isStricked: false};
      (this.currentSubTask as any).steps.push(step);
      newStep.value = "";
    }
  }
  
  /**
   * Whenever the comments textarea box is focused and enter key is pressed,
   * the input comments value is saved into object.
   * 
   * @param comments - the input element used to get value for comments.
   */
  addComment(comments):void {
    (this.currentSubTask as any).comments = comments.value; 
  }
  
  /**
   * Selected step will be stricked by changing the boolean state of isStricked.
   * 
   * @param subTask - The selected step to be stricked.
   */
  strickOut(step) {
    step.isStricked = !step.isStricked;
  }

  /**
   * The selected step object will be hard deleted using splice function.
   * 
   * @param step - step object to be deleted.
   */
  removeStep(step) {
    let index = (this.currentSubTask as any).steps.indexOf(step);
    (this.currentSubTask as any).steps.splice(index, 1);
  }
  
  /**
   * The subTask heading will be stricked by changing the state of subTask isStricked.
   */
  subTaskStrick() {
    (this.currentSubTask as any).isStricked = !(this.currentSubTask as any).isStricked; 
  }
  
  /**
   * The current subTask object will be hard deleted using splice function.
   */
  deleteSubTask() {
    this.taskListInfo.currentTask.subTasks.splice(this.taskListInfo.currentTask.subTasks.indexOf(this.currentSubTask),1);
  }
}

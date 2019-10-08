import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  currentSubTask = {subTaskName:null,isActive:false, comments:null, steps:[]};
  constructor() { }

  ngOnInit() {
  }

  displaySubtask(subTask){
    this.currentSubTask = subTask;
    let name = this.currentSubTask.subTaskName;
    console.log(this.currentSubTask.subTaskName);
    var stepsHeading = document.querySelector("#stepsHeading");
    stepsHeading.innerHTML = name;
  }
  
  addStep(newStep):void {
    let stepName = newStep.value;
    let step = {stepName: stepName, isStricked: false};
    this.currentSubTask.steps.push(step);
    newStep.value = "";
  }

  addComment(comments):void {
    this.currentSubTask.comments = comments; 
  }

  strickOut(step) {
    step.isStricked = !step.isStricked;
  }

  removeStep(step) {
    let index = this.currentSubTask.steps.indexOf(step);
    this.currentSubTask.steps.splice(index, 1);
  }
  
  subTaskStrick() {
    this.currentSubTask.isActive = !this.currentSubTask.isActive; 
  }
}

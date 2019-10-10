export type task = {taskName:string, status:boolean, subTasks:[]};
export type subTask = {subTaskName: string, isActive:boolean, comments: string, steps: []};
export type step = {stepName:string, isStricked:boolean};
export const tasks = [];
export type task = {taskName:string, status:boolean, subTasks: Array<subTask>};
export type subTask = {subTaskName: string, isActive:boolean, comments: string, steps: Array<step>};
export type step = {stepName:string, isStricked:boolean};
export const tasks:Array<task> = [];
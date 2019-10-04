type task = {taskName:string, status:boolean, subTasks: Array<subTask>};
type subTask = {subTaskName: string, isActive:boolean, comments: string, steps: Array<step>};
type step = {stepName:string, isActive:boolean};
export const tasks:Array<task> = [];

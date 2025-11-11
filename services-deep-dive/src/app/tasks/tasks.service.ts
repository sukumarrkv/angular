import { Injectable, signal } from "@angular/core";
import { Task } from "./task.model";

@Injectable({
  providedIn: 'root' //this means we can inject it in anywhere in the project
})
export class TasksService {
  tasks = signal<Task[]>([]); 

  addTask(addTaskData: Task) {
    this.tasks().push(addTaskData);
    console.log(this.tasks());
  }
}
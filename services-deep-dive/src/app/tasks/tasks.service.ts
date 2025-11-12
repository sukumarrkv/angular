import { Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";

@Injectable({
  providedIn: 'root' //this means we can inject it in anywhere in the project
})
export class TasksService {
  private tasks = signal<Task[]>([]); 

  allTasks = this.tasks.asReadonly();

  addTask(addTaskData: Task) {
    //this.tasks().push(addTaskData);
    //Instead of above we can write below
    this.tasks.update((oldTasks) => [...oldTasks, addTaskData]);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) => oldTasks.map((task) => task.id === taskId ? {...task, status: newStatus} : task));
  }
}
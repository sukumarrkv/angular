import { Component, Input } from "@angular/core";
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { NewtaskData } from "./task/task.model";
import { TasksService } from "./tasks.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, NewTaskComponent]
})
export class TasksComponent {
  @Input({required: true}) name!: string;
  @Input({required: true}) userId!: string;
  isAddingNewTask = false;

  constructor(private tasksService: TasksService) {

  }

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
   //return this.tasks.filter(task => task.userId==this.userId);
  }

  //This method is not used currently. It was used before introducing services
  onCompleteTask(id: string) {
    this.tasksService.removeTask(id);
    //this.tasks = this.tasks.filter(task => task.id != id);
  }

  onStartingAddTask() {
    this.isAddingNewTask = true;
  }

  onCancelAddTask() {
    this.isAddingNewTask = false;
  }

  //This method is not used currently. It was used before introducing services
  onAddNewTask(newTaskData: NewtaskData) {
    this.tasksService.addNewTask(newTaskData, this.userId);
    // this.tasks.push({
    //   id: new Date().getDate().toString(),
    //   userId: this.userId,
    //   title: newTaskData.title,
    //   summary: newTaskData.summary,
    //   dueDate: newTaskData.dueDate
    // });

    this.isAddingNewTask=false;
  }
}
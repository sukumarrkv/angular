import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { Task, TASK_STATUS_OPTIONS, TaskStatusOptions } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [
    {
      provide: TASK_STATUS_OPTIONS,
      useValue: TaskStatusOptions
    }
  ]
})
export class TasksListComponent {
  private tasksService = inject(TasksService);
  selectedFilter = signal<string>('all');
  //The below code does work when we use the filter
  //tasks = this.tasksService.allTasks;

  //To use filter we need to compute the value of tasks based on the selected filter and tasks available
  //this computed method gets called whenver the signals inside that method changes. So in below method
  //if selectedFilter signal or allTasks signal changes the tasks will be recalculated.
  tasks = computed(() => {
    switch(this.selectedFilter()) {
      case 'open':
        return this.tasksService.allTasks().filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService.allTasks().filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService.allTasks().filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  })

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}

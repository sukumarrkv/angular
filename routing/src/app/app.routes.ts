import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";

export const routes : Routes = [
  {
    path: '',
    component: NoTaskComponent
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent, 
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'prefix'
      },
      {
        path: 'tasks',
        component: TasksComponent
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent
      }
    ],
    //Adding static data to routes. We can get this data same as getting userId above using input function
    data: {
      message: "Hello"
    },
    //For dynamic data we can use resolve provided by angular router
    resolve: {
      userName: resolveUserName
    },
    title: resolveTitle
  }
]
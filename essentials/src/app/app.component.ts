import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TaskComponent } from './tasks/tasks.component';
import { DUMMY_USERS } from './dummy-users';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUsername!: string;

  onSelectUser(id: string) {
    //console.log("The selected user is: "+ id);
    this.users.forEach(user => {
      if(user.id === id) {
        this.selectedUsername = user.name;
      }
    })
  }
}

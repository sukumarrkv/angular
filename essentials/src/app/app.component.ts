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
  //Another way of writng above code is to use ?. By using ? we telling typescript that we are aware that this can produce undefined
  //selectedUsername?: string;
  //One more is to use pipes
  //selectedUsername: string | undefined;

  onSelectUser(id: string) {
    //console.log("The selected user is: "+ id);
    this.users.forEach(user => {
      if(user.id === id) {
        this.selectedUsername = user.name;
      }
    })
  }
}

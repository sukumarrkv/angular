import { Component } from "@angular/core";
import { DUMMY_USERS } from "../dummy-users";

const randomNumber = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  selectedUser = DUMMY_USERS[randomNumber];

  //This is called getter which gives an result which we can use in othe rplaces for eg in html.
  get imagePath() {
    return 'assets/users/'+ this.selectedUser.avatar;
  }

  onSelectUser() {
    const randomNumber = Math.floor(Math.random() * DUMMY_USERS.length);
    this.selectedUser = DUMMY_USERS[randomNumber];
  }
}
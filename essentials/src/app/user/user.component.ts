import { Component, computed, input, Input } from "@angular/core";
import { DUMMY_USERS } from "../dummy-users";

const randomNumber = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  //Below code is added for practice on how we display user name, image and handle events in Angular
  /*
  selectedUser = DUMMY_USERS[randomNumber];

  //This is called getter which gives an result which we can use in othe rplaces for eg in html.
  get imagePath() {
    return 'assets/users/'+ this.selectedUser.avatar;
  }

  onSelectUser() {
    const randomNumber = Math.floor(Math.random() * DUMMY_USERS.length);
    this.selectedUser = DUMMY_USERS[randomNumber];
  }
    */

  //We are trying to get this value for avatar from another component hence @Input is used, Also ! is speicific to typescript
  //where in we are telling that the value of avatar is not empty and will be populated with value

  //Below is how we take inputs using Input Decorator
  @Input({required: true}) avatar!: String;
  @Input({required: true}) name!: String;

  get imagePath() {
    return 'assets/users/' + this.avatar;
  }

  //Using signal to take inputs
  /*
  avatar = input.required<string>();
  name = input.required<string>();

  imagePath = computed(() => {
    return  'assets/users/' + this.avatar();
  })
  */


  onSelectUser() {}
}
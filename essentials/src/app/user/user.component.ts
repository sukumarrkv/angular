import { Component, computed, EventEmitter, input, Input, Output } from "@angular/core";
import { DUMMY_USERS } from "../dummy-users";
import { User } from "./user.model";

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
  // @Input({required: true}) id!: string;
  // @Input({required: true}) avatar!: string;
  // @Input({required: true}) name!: string;

  //Below is the way of using objects as inputs
  // @Input({required: true}) user!: {
  //   id: string,
  //   avatar: string,
  //   name: string
  // }

  //We can use interface to create User obejct
  @Input({required: true}) user!: User;
  @Input({required: true}) selected!: boolean; //this will be used to highlight the user selected
  //<stirng> specifies that we are emiting data of tyep string
  @Output() select = new EventEmitter<string>();

  //Below is another way of using output function (not a signal) to emit data
  //select = output<string>();

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  //Using signal to take inputs
  /*
  avatar = input.required<string>();
  name = input.required<string>();

  imagePath = computed(() => {
    return  'assets/users/' + this.avatar();
  })
  */


  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
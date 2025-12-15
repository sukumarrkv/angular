import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

//creating custom validator
function mustContainQuestionMark(control: AbstractControl) {
  if(control.value.includes('?')) {
    return null; //valid case
  }

  return {doestNotContainQuestionMark: true} //validation fails return this custom object
}

//Async Validator: We can use this to check if email is unique

function isEmailUnique(control: AbstractControl) {
  if(control.value !== "test@gmail.com") { //In ideal world we send a http request here to check for unique
    return of(null); 
    //we must written observable from async validator. of is such method from rxjs we can use which quickly subscribes and return value.

  }

  return of({isEmailUnique: false});
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [isEmailUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
    })
  });

  get isEmailInvalid() {
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid;
  }

  get isPasswordInvalid() {
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid;
  }

  onSubmit() {
    console.log(this.form);
  }
}
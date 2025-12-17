import { Component } from '@angular/core';
import { FormControl, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators, FormArray, AbstractControl } from '@angular/forms';

function doesPasswordMatch(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if(password === confirmPassword) {
    return null;
  }

  return {valuesAreEqual: false};
}

//Let write a factory function for above function which can take control name and return a function

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const value1 = control.get(controlName1)?.value;
    const value2 = control.get(controlName2)?.value;

    if(value1 === value2) {
      return null;
    }

    return {valuesMatch: false};
  }
}
@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
})
export class SignupComponent {
  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators:[Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl('', {
        validators:[Validators.required, Validators.minLength(6)]
      })
    }, {validators: [equalValues('password', 'confirmPassword')]}),
    firstName: new FormControl('', {validators: [Validators.required]}),
    lastName: new FormControl('', {validators: [Validators.required]}),
    address: new FormGroup({
      street: new FormControl('', {validators: [Validators.required]}),
      number: new FormControl('', {validators: [Validators.required]}),
      postalCode: new FormControl('', {validators: [Validators.required]}),
      city: new FormControl('', {validators: [Validators.required]}),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {validators: [Validators.required]}),
    findUs: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]),
    agree: new FormControl(false, {validators: [Validators.required]})
  });

  onSubmit() {
    if(this.signupForm.invalid) {
      return;
    }

    console.log(this.signupForm.value);
  }

  onReset() {
    this.signupForm.reset();
  }

  getDoesPasswordsMatch() {
    return this.signupForm.controls.passwords.touched 
           && this.signupForm.controls.passwords.dirty
           && this.signupForm.controls.passwords.invalid;
  }
}

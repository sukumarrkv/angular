import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent {
  private form = viewChild<NgForm>('form');
  private destroyRef = inject(DestroyRef);

constructor() {
  const savedFormData = window.localStorage.getItem('email');

  if(savedFormData) {
    const savedEmailData = JSON.parse(savedFormData);
    const email = savedEmailData.email;

    //without setTimeout we get null for .controls method below
    //So we use setTimeout method. this is disadvantage of using template driven forms, reative forms performs better in this case
    setTimeout(() => {
      this.form()?.controls['email'].setValue(email);
    }, 1)
  }
   
  afterNextRender(() => {
    const subscription = this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem('email', JSON.stringify({email: value.email}))
      }
    })

    this.destroyRef.onDestroy(() => {
      subscription?.unsubscribe();
    })
  });
}

  onSubmit(formData: NgForm) {
    if(formData.form.invalid) {
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;
    console.log(enteredEmail, enteredPassword);

    formData.form.reset();
    //We have many other methods in form object which can be helpful
  }
}

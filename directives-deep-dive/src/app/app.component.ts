import { Component, computed } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
import { LearningResourcesComponent } from './learning-resources/learning-resources.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [AuthComponent, LearningResourcesComponent],
})
export class AppComponent {

  constructor(private authService: AuthService) {

  }

  //isAdmin = this.authService.activePermission() === 'admin';
  isAdmin = computed(() => this.authService.activePermission() === 'admin');
}

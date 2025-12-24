import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { RouterOutlet, RouterLink, ResolveFn, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>(); //This userId comes from URI using router
  message = input.required<string>();
  private userService = inject(UsersService);

  userName = computed(() => this.userService.users.find(user => user.id === this.userId())?.name || '');

  ngOnInit(): void {
    console.log(this.message());
  }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot 
) => {
  const userService = inject(UsersService);
  return userService.users.find(user => user.id === activatedRoute.paramMap.get('userId'))?.name || '';
}

export const resolveTitle: ResolveFn<string> = (activatedRoute, routerState) => {
  return resolveUserName(activatedRoute, routerState) + '\'s tasks';
}
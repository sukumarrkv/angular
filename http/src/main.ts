import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';

function loggingInterceptors(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  //we can modify the request by using clone method and pass it to next method.
  // const req = request.clone({
  //   headers: request.headers.set('X_DEBUG', 'TESTING');
  // })
  console.log('[Outgoing request]');
  console.log(request);
  //return next(request);
  return next(request).pipe(
    tap({
      next: event => {
        if(event.type === HttpEventType.Response) {
          console.log('[Incoming response]');
          console.log(event.status);
          console.log(event.body);
        }
      }
    })
  )
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(
    withInterceptors([loggingInterceptors])
  )]
}).catch((err) => console.error(err));

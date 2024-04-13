import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../auth-service.service';

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const userToken = authService.getToken();
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${userToken}`),
  });

  return next(modifiedReq).pipe(
    catchError((err) => {
      console.log(err);
      if (err.status === 401) {
        console.log('authInterceptor 401');
        authService.logOut();
      }
      return throwError(() => new Error('Unauthorized Exception'));
    }),
  );
};

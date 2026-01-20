import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Processa a requisição e captura erros
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Se o backend retornar 401 (Unauthorized) ou 403 (Forbidden)
      if (error.status === 401 || error.status === 403) {
        console.error('Sessão expirada ou não autorizada. Redirecionando...');
        authService.logout(); // Limpa localStorage e manda para /login
      }
      
      return throwError(() => error);
    })
  );
};
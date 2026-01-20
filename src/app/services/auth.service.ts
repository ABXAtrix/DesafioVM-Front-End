import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginDTO } from '../core/models/login.model';
import { Usuario } from '../core/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // URL API Spring Boot
  private readonly API = 'http://localhost:8080/desafio/api/auth';

  /**
   * Realiza o login consumindo o AuthenticationController do Java.
   */
  login(credentials: LoginDTO): Observable<any> {
    return this.http.post(`${this.API}/login`, credentials).pipe(
      tap((res: any) => {
        // Armazena o token JWT e o e-mail no localStorage do navegador
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_email', res.email);
        localStorage.setItem('user_id', res.userId);
      }),
    );
  }

  registrar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.API}/registrar`, usuario);
  }

  /**
   * Limpa os dados de autenticação e redireciona para a tela de login.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  
  /**
   * Recupera o token salvo para uso no Interceptor.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Verifica se existe um token para proteger as rotas.
   */
  estaLogado(): boolean {
    return !!this.getToken();
  }
}

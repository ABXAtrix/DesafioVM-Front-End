import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginDTO } from '../core/models/login.model';
import { Usuario } from '../core/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly API = `${environment.apiUrl}/auth`;

  /**
   * Realiza o login consumindo o AuthenticationController.
   */
  login(credentials: LoginDTO): Observable<any> {
    return this.http.post<any>(`${this.API}/obterToken`, credentials).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        if (res.email) localStorage.setItem('user_email', res.email);
        if (res.userId) localStorage.setItem('user_id', res.userId.toString());
        if (res.cargo) localStorage.setItem('user_cargo', res.cargo);
      }),
    );
  }

  decodeToken(token: string) {
  const decoded: any = jwtDecode(token);
  console.log(decoded.cargo);
  return decoded;
}

  /**
   * Retorna o cargo do usuário para verificações de permissão.
   */
  getRole(): string | null {
    return localStorage.getItem('user_cargo');
  }

  // Método utilitário para verificar se é Admin
  isAdmin(): boolean {
  return this.getRole() === 'ADMIN';
}

  /**
   * Registra um novo usuário no sistema.
   */
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
   * Verifica se existe um token para proteger as rotas do Angular 19.
   */
  estaLogado(): boolean {
    return !!this.getToken();
  }
}

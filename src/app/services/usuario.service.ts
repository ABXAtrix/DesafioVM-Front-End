import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../core/models/usuario.model';

export interface ApiResponse<T> {
  dados: T;
  codeMessage: string;
  code: number;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/desafio/api/usuarios`;

  /**
   * Lista todos os usuários (Visão Admin).
   */
  listarTodos(): Observable<ApiResponse<Usuario[]>> {
    return this.http.get<ApiResponse<Usuario[]>>(this.API);
  }

  /**
   * Busca um usuário por ID.
   */
  buscarPorId(id: number): Observable<ApiResponse<Usuario>> {
    return this.http.get<ApiResponse<Usuario>>(`${this.API}/${id}`);
  }

  /**
   * Atualiza os próprios dados do usuário logado.
   */
  atualizarPerfil(usuario: Usuario): Observable<ApiResponse<Usuario>> {
    return this.http.put<ApiResponse<Usuario>>(`${this.API}/me`, usuario);
  }

  /**
   * Remove um usuário do sistema.
   */
  excluir(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API}/${id}`);
  }

  /**
   * Filtra usuários com base em critérios.
   */
  filtrar(filtro: Partial<Usuario>): Observable<ApiResponse<Usuario[]>> {
    return this.http.post<ApiResponse<Usuario[]>>(`${this.API}/filtro`, filtro);
  }
}
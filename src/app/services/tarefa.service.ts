import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tarefa } from '../core/models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/tarefas`;

  /**
   * De acordo com o cargo do usuário, retorna a lista de tarefas de todos usuarios ou apenas do proprio.
   */
  listar(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.API);
  }
}

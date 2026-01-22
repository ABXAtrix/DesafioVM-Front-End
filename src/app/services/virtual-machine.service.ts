import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VirtualMachine } from '../core/models/virtual-machine.model';
import { Tarefa } from '../core/models/tarefa.model';
import { TarefaService } from './tarefa.service';

export interface ApiResponse<T> {
  dados: T;
  codeMessage: string;
  code: number;
}

@Injectable({
  providedIn: 'root',
})
export class VmService {
  private http = inject(HttpClient);
  private tarefaService = inject(TarefaService);

  private readonly API = `${environment.apiUrl}/vms`;

  /**
   * Lista TODAS as máquinas de TODOS os usuários (Visão Admin).
   */
  listarTodasDoSistema(): Observable<ApiResponse<VirtualMachine[]>> {
    return this.http.get<ApiResponse<VirtualMachine[]>>(`${this.API}/all`);
  }

  /**
   * Retorna a lista de todas as VMs cadastradas.
   */
  listar(): Observable<ApiResponse<VirtualMachine[]>> {
    return this.http.get<ApiResponse<VirtualMachine[]>>(this.API);
  }

  /**
   * Busca os detalhes de uma VM específica pelo ID.
   */
  buscarPorId(id: number): Observable<ApiResponse<VirtualMachine>> {
    return this.http.get<ApiResponse<VirtualMachine>>(`${this.API}/${id}`);
  }

  /**
   * Envia uma nova VM para o backend (Cadastro).
   */
  salvar(vm: VirtualMachine): Observable<ApiResponse<VirtualMachine>> {
    return this.http.post<ApiResponse<VirtualMachine>>(this.API, vm);
  }

  /**
   * Atualiza os dados de uma VM existente.
   */
  atualizar(id: number, vm: VirtualMachine): Observable<ApiResponse<VirtualMachine>> {
    return this.http.put<ApiResponse<VirtualMachine>>(`${this.API}/${id}`, vm);
  }

  /**
   * Altera o estado (status) de uma máquina virtual.
   */
  alterarStatus(id: number, novoStatus: string): Observable<ApiResponse<VirtualMachine>> {
    return this.http.patch<ApiResponse<VirtualMachine>>(`${this.API}/${id}/status`, { status: novoStatus });
  }

  /**
   * Remove uma máquina virtual.
   */
  excluir(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API}/${id}`);
  }

  /**
   * Consulta o histórico de ações (Loggings).
   * Este método utiliza o TarefaService injetado para centralizar o acesso aos logs.
   */
  consultarLogs(): Observable<Tarefa[]> {
    return this.tarefaService.listar();
  }
}
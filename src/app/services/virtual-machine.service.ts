import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VirtualMachine } from '../core/models/virtual-machine.model';

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
  private readonly API = 'http://localhost:8080/desafio/api/vms';

  // Retorna o envelope contendo a lista de VMs
  listar(): Observable<ApiResponse<VirtualMachine[]>> {
    return this.http.get<ApiResponse<VirtualMachine[]>>(this.API);
  }

  // Retorna o envelope contendo uma única VM para edição
  buscarPorId(id: number): Observable<ApiResponse<VirtualMachine>> {
    return this.http.get<ApiResponse<VirtualMachine>>(`${this.API}/${id}`);
  }

  // Envia a nova VM e recebe o objeto criado dentro do envelope
  salvar(vm: VirtualMachine): Observable<ApiResponse<VirtualMachine>> {
    return this.http.post<ApiResponse<VirtualMachine>>(this.API, vm);
  }

  // Atualiza a VM inteira. O backend geralmente retorna o objeto atualizado
  atualizar(id: number, vm: VirtualMachine): Observable<ApiResponse<VirtualMachine>> {
    return this.http.put<ApiResponse<VirtualMachine>>(`${this.API}/${id}`, vm);
  }

  // Método de patch para alteração rápida de status
  alterarStatus(id: number, novoStatus: string): Observable<ApiResponse<VirtualMachine>> {
    return this.http.patch<ApiResponse<VirtualMachine>>(`${this.API}/${id}/status`, { status: novoStatus });
  }

  // Exclusão costuma retornar void ou uma mensagem de sucesso no envelope
  excluir(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API}/${id}`);
  }
}
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VmService } from '../../../services/virtual-machine.service';
import { VirtualMachine } from '../../../core/models/virtual-machine.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vm-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './vm-list.component.html',
  styleUrls: ['./vm-list.component.css'],
})
export class VmListComponent implements OnInit {
  private vmService = inject(VmService);
  private router = inject(Router);

  vms: VirtualMachine[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.carregarVms();
  }

  carregarVms(): void {
    this.isLoading = true;
    this.vmService.listar().subscribe({
      next: (res: any) => {
        // Ordenação por ID para evitar que a VM pule para o final da lista após update
        this.vms = res.dados.sort((a: any, b: any) => a.id - b.id); 
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar VMs', err);
        this.isLoading = false;
      }
    });
  }

  // Função que estava faltando e causava o erro NG9
  logout(): void {
    // Limpa os dados de sessão para segurança [cite: 78]
    localStorage.clear();
    sessionStorage.clear();
    // Redireciona para a tela inicial/login
    this.router.navigate(['/login']);
  }

  novaVm(): void {
    this.router.navigate(['/vms/novo']);
  }

  editar(id: number): void {
    // Redireciona para a tela de edição conforme requisito [cite: 58]
    this.router.navigate(['/vms/editar', id]);
  }

  alterarStatus(vm: VirtualMachine, novoStatus: string): void {
    if (vm.status === novoStatus) return;

    this.isLoading = true;
    // O status deve seguir rigorosamente os valores: start, stop ou suspend [cite: 21, 22, 23, 24]
    const vmAtualizada = { ...vm, status: novoStatus as any };

    this.vmService.atualizar(vm.id!, vmAtualizada).subscribe({
      next: () => {
        this.carregarVms();
      },
      error: (err) => {
        alert('Erro ao alterar status: ' + (err.error?.message || 'Erro interno'));
        this.isLoading = false;
      }
    });
  }

  excluir(id: number): void {
    // Implementação da funcionalidade de excluir conforme requisito [cite: 25, 60]
    if (confirm('Tem certeza que deseja excluir esta máquina?')) {
      this.vmService.excluir(id).subscribe({
        next: () => {
          this.carregarVms();
        },
        error: (err) =>
          alert(
            'Erro ao excluir: ' + (err.error?.message || 'Erro desconhecido'),
          ),
      });
    }
  }
}
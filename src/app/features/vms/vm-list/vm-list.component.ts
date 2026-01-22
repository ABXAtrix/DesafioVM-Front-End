import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VmService } from '../../../services/virtual-machine.service';
import { AuthService } from '../../../services/auth.service';
import { VirtualMachine } from '../../../core/models/virtual-machine.model';
import { Tarefa } from '../../../core/models/tarefa.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vm-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './vm-list.component.html',
  styleUrls: ['./vm-list.component.css'],
})
export class VmListComponent implements OnInit {
  private readonly vmService = inject(VmService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  vms: VirtualMachine[] = [];
  logs: Tarefa[] = [];
  isLoading = true;
  readonly LIMITE_VMS = 5;

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  private carregarDadosIniciais(): void {
    this.carregarVms();
    this.carregarLogs();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  carregarVms(): void {
    this.isLoading = true;
    this.vmService.listar().subscribe({
      next: (res: any) => {
        this.vms = res.dados ? res.dados.sort((a: any, b: any) => a.id - b.id) : [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar VMs', err);
        this.isLoading = false;
      }
    });
  }

carregarLogs(): void {
  this.vmService.consultarLogs().subscribe({
    next: (res: any) => {
      const logsRecebidos = res.dados || res; 
      this.logs = logsRecebidos.sort((a: any, b: any) => 
        new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
      );
    },
    error: (err) => console.error('Erro ao carregar logs', err)
  });
}

  novaVm(): void {
    if (this.vms.length >= this.LIMITE_VMS) {
      alert('Limite de 5 máquinas virtuais atingido.');
      return;
    }
    this.router.navigate(['/vms/novo']);
  }

  editar(id: number): void {
    this.router.navigate(['/vms/editar', id]);
  }

  alterarStatus(vm: VirtualMachine, novoStatus: string): void {
    if (vm.status === novoStatus) return;
    
    this.isLoading = true;
    const vmAtualizada = { ...vm, status: novoStatus as any };

    this.vmService.atualizar(vm.id!, vmAtualizada).subscribe({
      next: () => {
        this.carregarVms();
        this.carregarLogs();
      },
      error: (err) => {
        alert('Erro: ' + (err.error?.message || 'Falha na conexão'));
        this.isLoading = false;
      }
    });
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta máquina?')) {
      this.vmService.excluir(id).subscribe({
        next: () => {
          this.carregarVms();
          this.carregarLogs();
        },
        error: (err) => alert('Erro ao excluir: ' + (err.error?.message))
      });
    }
  }
}
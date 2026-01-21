import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VmService } from '../../../services/virtual-machine.service';
import { VirtualMachine } from '../../../core/models/virtual-machine.model';
import { StatusVm } from '../../../core/models/status-vm.enum';

@Component({
  selector: 'app-vm-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vm-form.component.html',
  styleUrls: ['./vm-form.component.css']
})
export class VmFormComponent implements OnInit {
  private vmService = inject(VmService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  vm: VirtualMachine = {
    nome: '',
    cpu: null as any,     
    memoria: null as any, 
    disco: null as any,   
    status: StatusVm.START 
  };

  isEdit = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.carregarDados(id);
    }
  }

  carregarDados(id: number) {
    this.vmService.buscarPorId(id).subscribe({
      next: (res) => {
        // res.dados vem da interface ApiResponse que criamos no Service
        this.vm = res.dados;
      },
      error: () => this.errorMessage = "Erro ao carregar dados da VM."
    });
  }

  salvar(): void {
    if (!this.vm.nome || !this.vm.cpu) {
      this.errorMessage = "Por favor, preencha todos os campos obrigatórios.";
      return;
    }

    const acao = this.isEdit && this.vm.id
      ? this.vmService.atualizar(this.vm.id, this.vm) 
      : this.vmService.salvar(this.vm);

    acao.subscribe({
      next: () => this.router.navigate(['/vms']),
      error: (err) => {
        this.errorMessage = err.error?.message || "Erro ao processar requisição.";
      }
    });
  }

  cancelar() {
    this.router.navigate(['/vms']);
  }
}
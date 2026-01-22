import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { VmService } from '../../../services/virtual-machine.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private vmService = inject(VmService);

  usuarios: any[] = [];
  logs: any[] = [];

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.usuarioService.listarTodos().subscribe({
      next: (res: any) => {
        this.usuarios = res.dados || [];
      },
      error: (err) => console.error('Erro ao buscar usuários', err)
    });

    this.vmService.consultarLogs().subscribe({
      next: (res: any) => {
        const logsRecebidos = res.dados || res;
        
        if (Array.isArray(logsRecebidos)) {
          this.logs = logsRecebidos.sort((a: any, b: any) => 
            new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
          );
        }
      },
      error: (err) => console.error('Erro ao carregar logs no Admin', err)
    });
  }
}
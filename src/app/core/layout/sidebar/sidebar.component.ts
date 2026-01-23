import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  usuarioLogado: any = null;

  ngOnInit(): void {
    this.carregarDadosPerfil();
  }

  carregarDadosPerfil(): void {
    this.authService.getUsuarioAtual().subscribe({
      next: (dados) => {
        this.usuarioLogado = dados;
      },
      error: (err) => {
        console.error('Erro ao buscar perfil na sidebar', err);
      }
    });
  }

  get inicialNome(): string {
    return this.usuarioLogado?.nome ? this.usuarioLogado.nome.charAt(0).toUpperCase() : '?';
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

irParaPerfil(): void {
  this.router.navigate(['/perfil']);
}

  logout(): void {
    this.authService.logout();
  }
}
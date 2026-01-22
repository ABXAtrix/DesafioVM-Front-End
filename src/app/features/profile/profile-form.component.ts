import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../core/models/usuario.model';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthService);
  private router = inject(Router);

  profileForm: FormGroup;
  loading = false;
  mensagem: { texto: string; tipo: 'sucesso' | 'erro' } | null = null;

  constructor() {
    this.profileForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.authService.getUsuarioAtual().subscribe({
      next: (usuario) => {
        if (usuario) {
          this.profileForm.patchValue({
            nome: usuario.nome,
            email: usuario.email
          });
        }
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.loading = true;
      const dados: Usuario = { ...this.profileForm.value };
      
      if (!dados.senha) {
        delete dados.senha;
      }

      this.usuarioService.atualizarPerfil(dados).subscribe({
        next: () => {
          this.loading = false;
          // 1. Exibe a mensagem de sucesso
          this.exibirMensagem('Perfil atualizado! Redirecionando para o login...', 'sucesso');
          
          // 2. Aguarda um curto período para o usuário ler a mensagem e então desloga
          setTimeout(() => {
            this.authService.logout();
            this.router.navigate(['/login']);
          }, 2500);
        },
        error: (err: any) => {
          this.loading = false;
          console.error('Erro ao atualizar', err);
          this.exibirMensagem('Erro ao atualizar perfil. Verifique os dados.', 'erro');
        }
      });
    }
  }

  exibirMensagem(texto: string, tipo: 'sucesso' | 'erro') {
    this.mensagem = { texto, tipo };
    setTimeout(() => this.mensagem = null, 3000);
  }

  voltar(): void {
    this.router.navigate(['/vms']);
  }
}
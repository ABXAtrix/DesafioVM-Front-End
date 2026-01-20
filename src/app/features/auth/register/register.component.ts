import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  usuario: Usuario = { nome: '', email: '', senha: '' };
  isLoading = false;
  errorMessage = '';

  onRegister() {
    this.isLoading = true;
    this.authService.registrar(this.usuario).subscribe({
      next: (res) => {
        console.log('Sucesso:', res);
        alert('Conta criada com sucesso! Agora você pode fazer login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.error?.message || 'Erro ao criar conta. Tente novamente.';
      },
    });
  }
}

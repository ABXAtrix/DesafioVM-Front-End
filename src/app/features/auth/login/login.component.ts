import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginDTO } from '../../../core/models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials: LoginDTO = {
    email: '',
    senha: '',
  };

  errorMessage: string | null = null;
  isLoading = false;

  onLogin(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('Login realizado com sucesso!', res);
        this.router.navigate(['/vms']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.error?.message || 'Erro ao realizar login. Tente novamente.';
      },
    });
  }
}
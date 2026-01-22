import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; // Ajuste o caminho conforme seu projeto

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
  }
}
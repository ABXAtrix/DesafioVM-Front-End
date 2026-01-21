import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  template: `
    <div class="app-layout">
      <app-sidebar></app-sidebar>

      <main class="content-area">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .app-layout {
        display: flex;
        min-height: 100vh;
      }

      .content-area {
        flex: 1;
        margin-left: 260px; /* Largura da sidebar */
        background-color: #f7fafc;
        padding: 30px;
        transition: margin-left 0.3s ease;
      }

      /* Responsividade para telas menores */
      @media (max-width: 768px) {
        .content-area {
          margin-left: 0;
          padding: 15px;
        }
      }
    `,
  ],
})
export class MainLayoutComponent {}

import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

export const routes: Routes = [
  // Rotas Públicas (Sem Sidebar)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rotas Privadas (Dentro do MainLayout com Sidebar)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'vms',
        loadComponent: () => import('./features/vms/vm-list/vm-list.component').then(m => m.VmListComponent)
      },
      {
        path: 'vms/novo',
        loadComponent: () => import('./features/vms/vm-form/vm-form.component').then(m => m.VmFormComponent)
      },
      {
        path: 'vms/editar/:id',
        loadComponent: () => import('./features/vms/vm-form/vm-form.component').then(m => m.VmFormComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)
      },
      {
        path: 'admin',
        loadComponent: () => import('./features/dashboard/admin/admin.component').then(m => m.AdminComponent),
        canMatch: [() => {
          const isAdmin = inject(AuthService).isAdmin();
          if (!isAdmin) {
            inject(Router).navigate(['/vms']);
            return false;
          }
          return true;
        }]
      },
      { path: '', redirectTo: 'vms', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
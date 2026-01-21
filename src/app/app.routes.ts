import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
{ 
    path: 'vms', 
    canActivate: [authGuard], 
    loadComponent: () => import('./features/vms/vm-list/vm-list.component').then(m => m.VmListComponent) 
  },
  
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
    path: 'vms/:id', 
    loadComponent: () => import('./features/vms/vm-form/vm-form.component').then(m => m.VmFormComponent) 
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
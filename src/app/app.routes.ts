import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/common/layout/layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth-routing.module').then((m) => m.authRouting),
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'admin', pathMatch: 'full'},
      {
        path: 'admin',
        loadChildren: () => import('./pages/roles/admin/admin-routing.module').then((m) => m.adminRouting),
      },
    ],
  },
];

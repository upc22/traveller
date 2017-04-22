
import { Routes } from '@angular/router';
import { LoginComponent } from "app/login/login.component";

export const AppRoutes: Routes = [{
  path: '',
  component: LoginComponent,
  children: [{
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  }]
}];
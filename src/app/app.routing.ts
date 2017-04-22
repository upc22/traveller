
import { Routes } from '@angular/router';

export const AppRoutes: Routes = [{
  path: '',
  children: [{
    path: '',
    redirectTo: 'maps',
    pathMatch: 'full'
  }, {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule'
  }]
}];

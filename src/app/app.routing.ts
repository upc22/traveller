
import { Routes } from '@angular/router';
import { AppRoutingGuardsService } from './app-routing-guards.service';

export const AppRoutes: Routes = [{
  path: 'login',
  loadChildren: './login/login.module#LoginModule'
}, {
  path: '',
  canActivate: [ AppRoutingGuardsService ],
  canActivateChild: [ AppRoutingGuardsService ],
  children: [{
    path: '',
    redirectTo: 'maps',
    pathMatch: 'full'
  }, {
    path: ':user',
    loadChildren: './user/user.module#UserModule'
  }]
}];

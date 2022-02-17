import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './pages/guard/authGuard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../app/pages/home/home-routing.module').then(m => m.HomeRoutingModule),    
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    loadChildren: () => import('../app/pages/login/login-routing.module').then(m => m.LoginRoutingModule),    
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

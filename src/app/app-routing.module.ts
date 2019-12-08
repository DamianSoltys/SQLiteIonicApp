import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard} from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./main/main.module').then( m => m.MainModule),canActivate:[AuthGuard]},
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginModule)},
  { path: 'register', loadChildren: () => import('./register/register.module').then( m => m.RegisterModule)},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

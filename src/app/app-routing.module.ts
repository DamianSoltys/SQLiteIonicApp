import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./main/main.module').then( m => m.MainModule)},
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

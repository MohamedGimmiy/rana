import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanEnterLoginPageGuard } from './can-enter-login-page.guard';

const routes: Routes = [
  { // lazy loading syntax
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { 
    path: 'login', 
    loadChildren: () => import ('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [CanEnterLoginPageGuard] // adding our guard :D
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/authentication/login/login.component';

const routes: Routes = [ 
  {
    path: 'login', 
    component: LoginComponent
  } ,
  {
    path: 'person', 
    loadChildren: () => import('./modules/person/person.module').then(m => m.PersonModule)
  },
  {
    path: 'request', 
    loadChildren: () => import('./modules/request/request.module').then(m => m.RequestModule)
  },
  {
    path: 'status', 
    loadChildren: () => import('./modules/status/status.module').then(m => m.StatusModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full'},  
  { path: '**', redirectTo: 'request' } 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

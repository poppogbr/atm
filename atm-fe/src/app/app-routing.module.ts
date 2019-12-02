import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthenticationComponent } from './core/authentication/authentication.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        scrollPositionRestoration: 'enabled'
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtmSearchComponent } from './atm-search.component';

const routes: Routes = [
  {
    path: '',
    component: AtmSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtmSearchRoutingModule {}

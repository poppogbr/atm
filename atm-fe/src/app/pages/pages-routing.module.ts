import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PagesComponent } from './pages.component';
import { PagesRoutePath } from '../core/models/routing.model';

const routes: Routes = [
  { path: PagesRoutePath.PAGES,   redirectTo: PagesRoutePath.LOGIN, pathMatch: 'full' },
  { path: PagesRoutePath.PAGES,
    component: PagesComponent,
    children: [
      {
        path: PagesRoutePath.ATM_SEARCH,
        loadChildren: './atm-search/atm-search.module#AtmSearchModule'
      }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
  declarations: []
})
export class PagesRoutingModule {
}


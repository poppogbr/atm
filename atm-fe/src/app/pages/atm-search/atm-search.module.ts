import { NgModule } from '@angular/core';
import { AtmSearchComponent } from './atm-search.component';
import { AtmSearchRoutingModule } from './atm-search-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AtmSearchComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AtmSearchRoutingModule,
    CommonModule,
    NgbModule
  ]
})
export class AtmSearchModule { }

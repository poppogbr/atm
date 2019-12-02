import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Atm } from './atm.model';
import { AtmSearchService } from './atm-search.service';
import { distinctUntilChanged, tap, mergeMap, delay } from 'rxjs/operators';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-atm-search',
  templateUrl: './atm-search.component.html',
  styleUrls: ['./atm-search.component.scss'],
  providers: [
    AtmSearchService
  ]
})
export class AtmSearchComponent implements OnInit {

  searchForm: FormGroup;
  atms$: Observable<Atm[]>;

  visible: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private atmSearchService: AtmSearchService,
    public loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      filter: new FormControl(null)
    });
  }

  search() {
      this.atms$ = (this.filter) ?
        of(this.filter).pipe(
          delay(1000),
          distinctUntilChanged(),
          tap(() => this.loadingService.announceAsVisible()),
          mergeMap(filter => this.atmSearchService.search(filter)),
          tap(() => this.loadingService.announceAsNotVisible())
        ) : of([]);
  }

  get filter(): string {
    return this.searchForm.get('filter').value;
  }
}

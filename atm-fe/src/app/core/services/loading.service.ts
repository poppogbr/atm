import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loaderStatusSource = new Subject<boolean>();
  readonly loaderStatus$: Observable<boolean>;

  constructor() {
    this.loaderStatus$ = this.loaderStatusSource.asObservable();
  }

  announceAsVisible() {
    this.announce(true);
  }

  announceAsNotVisible() {
    this.announce(false);
  }

  private announce(visible: boolean): void {
    this.loaderStatusSource.next(visible);
  }
}

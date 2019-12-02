import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

  get loading() {
    return this.loadingService.loaderStatus$;
  }
}

import { Component, OnDestroy, HostListener } from '@angular/core';
import { AuthenticationService } from '@core/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    AuthenticationService
  ]
})
export class AppComponent {
  title = 'atm';

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    this.authenticationService.logout();
  }
}

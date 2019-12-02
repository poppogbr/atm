import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Credentials } from '../models/login.model';
import { Router } from '@angular/router';
import { PagesRoutePath } from '../models/routing.model';
import { LoadingService } from '../services/loading.service';
import { of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const credential: Credentials = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };

    of(credential).pipe(
      tap(() => this.loadingService.announceAsVisible()),
      mergeMap(param => this.authenticationService.login(param)),
      tap(() => this.loadingService.announceAsNotVisible())
    ).subscribe(
        () => this.router.navigate([PagesRoutePath.PAGES + '/' + PagesRoutePath.ATM_SEARCH]),
        (e) => {
          console.log(e);
          this.loadingService.announceAsNotVisible();
        }
      );
  }
}

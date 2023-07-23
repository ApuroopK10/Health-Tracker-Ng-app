import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading$!: Observable<boolean>;

  constructor(
    public authService: AuthService,
    private store: Store<{ ui: fromRoot.State }>
  ) {}

  ngOnInit() {
    // makes use of selecctors created with createSelector
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.loginForm = new FormGroup({
      username: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit(form: FormGroup) {
    this.authService.login({
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    });
  }
  ngOnDestroy() {
    // this.loadingSub?.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  maxDate = new Date();
  isLoading$!: Observable<boolean>;

  constructor(
    public authSer: AuthService,
    private store: Store<{ ui: fromRoot.State }>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.maxDate.setFullYear(new Date().getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authSer.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}

import { Injectable, inject } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as AuthAction from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoading = false;
  private auth: Auth = inject(Auth);
  constructor(
    private router: Router,
    private trainingSer: TrainingService,
    private uiSer: UiService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.auth.onAuthStateChanged((data) => {
      if (data) {
        this.store.dispatch(new AuthAction.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingSer.cancelSubs();
        this.store.dispatch(new AuthAction.SetUnathenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());

        this.uiSer.showSnackbar(error.message, 'OK', 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    signInWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        this.uiSer.showSnackbar(error.message, 'OK', 3000);
      });
  }

  logout() {
    signOut(this.auth);
  }
}

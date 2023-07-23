import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() sidenavClicked = new EventEmitter<void>();
  isAuth$!: Observable<boolean>;
  authSub!: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private authSer: AuthService
  ) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onLogout() {
    this.authSer.logout();
  }

  onToggleSidenav() {
    this.sidenavClicked.emit();
  }
}

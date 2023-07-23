import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent {
  @Output() sidenavClicked = new EventEmitter<void>();
  isAuth$!: Observable<boolean>;

  constructor(
    private authSer: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  onToggleSidenav() {
    this.sidenavClicked.emit();
  }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onLogout() {
    this.onToggleSidenav();
    this.authSer.logout();
  }
}

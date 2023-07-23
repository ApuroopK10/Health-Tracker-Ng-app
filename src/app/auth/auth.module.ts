import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRouteModule } from './auth-route.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    AuthRouteModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    provideAuth(() => getAuth()),
  ],
})
export class AuthModule {}

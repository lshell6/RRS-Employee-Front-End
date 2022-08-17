import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/auth/login/login/login.component';
import { SignUpComponent } from './component/auth/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './component/auth/reset-password/reset-password/reset-password.component';
import { UsernameVerifyComponent } from './component/auth/username-verify/username-verify/username-verify.component';
import { DashboardComponent } from './component/dashboard/dashboard/dashboard.component';
import { LogoutComponent } from './component/auth/logout/logout/logout.component';
import { ProfileComponent } from './component/profile/profile/profile.component';
import { EditProfileComponent } from './component/auth/edit-profile/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ResetPasswordComponent,
    UsernameVerifyComponent,
    DashboardComponent,
    LogoutComponent,
    ProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

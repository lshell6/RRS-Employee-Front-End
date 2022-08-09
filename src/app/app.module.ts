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

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ResetPasswordComponent,
    UsernameVerifyComponent,
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

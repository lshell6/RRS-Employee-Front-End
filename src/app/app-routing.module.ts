import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/auth/login/login/login.component';
import { ResetPasswordComponent } from './component/auth/reset-password/reset-password/reset-password.component';
import { SignUpComponent } from './component/auth/sign-up/sign-up.component';
import { UsernameVerifyComponent } from './component/auth/username-verify/username-verify/username-verify.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path:'login' ,component: LoginComponent},
  {path:'sign-up' ,component: SignUpComponent},
  {path: 'password-reset', component: ResetPasswordComponent},
  {path: 'verify-username', component: UsernameVerifyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

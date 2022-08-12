import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditProfileComponent } from './component/auth/edit-profile/edit-profile/edit-profile.component';
import { LoginComponent } from './component/auth/login/login/login.component';
import { LogoutComponent } from './component/auth/logout/logout/logout.component';
import { ResetPasswordComponent } from './component/auth/reset-password/reset-password/reset-password.component';
import { AuthguardService } from './component/auth/service/authguard.service';
import { SignUpComponent } from './component/auth/sign-up/sign-up.component';
import { UsernameVerifyComponent } from './component/auth/username-verify/username-verify/username-verify.component';
import { DashboardComponent } from './component/dashboard/dashboard/dashboard.component';
import { ProfileComponent } from './component/profile/profile/profile.component';

const routes: Routes = [
  {path:'' ,component: LoginComponent},
  {path:'sign-up' ,component: SignUpComponent},
  {path: 'password-reset', component: ResetPasswordComponent},
  {path: 'verify-username', component: UsernameVerifyComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'edit', component: EditProfileComponent,
                canActivate:[AuthguardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

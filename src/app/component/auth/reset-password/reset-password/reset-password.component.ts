import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: string;
  repassword: string;
  username: string;
  msg: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.msg = "";
    this.authService.user$.subscribe(data=>{
      this.username=data;
    })
  }
  onReset(){
    if(this.password === this.repassword){
      this.authService.resetPassword(this.username, this.password).subscribe({
        next: (data)=>{
          this.authService.message$.next('Password reset successful, please login!');
          this.router.navigateByUrl("/login");
        },
        error: (e)=>{
          this.msg = "Reset unsuccessful, please try again later!";
        }
      });
    }
  }
  toLogin(): void{
    this.router.navigateByUrl("/login");
  }
  toSignUp(): void{
    this.router.navigateByUrl("/sign-up");
  }
}

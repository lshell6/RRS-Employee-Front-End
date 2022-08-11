import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  passResetForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.msg = "";
    this.authService.user$.subscribe(data=>{
      this.username=data;
    })
    this.passResetForm = new FormGroup({
      password: new FormControl('', [Validators.required,Validators.minLength(8),
        Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      repassword: new FormControl('', [Validators.required,Validators.minLength(8),
          Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)])
    })
  }
  onReset(){
    if(this.password === this.repassword){
      this.authService.resetPassword(this.username, this.password).subscribe({
        next: (data)=>{
          this.authService.message$.next('Password reset successful, please login!');
          this.router.navigateByUrl("");
        },
        error: (e)=>{
          this.msg = "Reset unsuccessful, please try again later!";
        }
      });
    }
    else{
      this.msg = "Passwords do not match, please try again"
    }
  }
  onCancel():void{
    this.router.navigateByUrl("");
  }
}

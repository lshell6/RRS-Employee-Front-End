import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDto } from '../../model/employee.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  employeeDto: EmployeeDto;
  message: string;
  
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.message='';
    this.signUpForm = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      verifyPassword: new FormControl(''),
      securityQuestion: new FormControl(''),
      securityAnswer: new FormControl('')
    });
  }
  onFormSubmit(){

    this.employeeDto={
      name: this.signUpForm.value.name,
      securityAnswer: this.signUpForm.value.securityAnswer,
      securityQuestion: this.signUpForm.value.securityQuestion,
      encodedCredentials: btoa(this.signUpForm.value.username
        + '@%' + this.signUpForm.value.password)
    }
    //aGFycnkrPStwb3R0ZXI=
    console.log(this.employeeDto);
    this.authService.signUp(this.employeeDto).subscribe({
      next: (data)=> {
          this.authService.message$.next('SignUp Success, Please Login')
          this.router.navigateByUrl('/login');
      },
      error: (e)=>{
        this.message = "SignUp Unsuccessful, Try Again Later";
      }

    });

  }
  toLogin(): void{
    this.router.navigateByUrl("/login");
  }
  toSignUp(): void{
    this.router.navigateByUrl("/sign-up");
  }
}

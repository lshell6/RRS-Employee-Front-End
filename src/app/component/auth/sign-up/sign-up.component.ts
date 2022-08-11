import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  verify: boolean;
  securityQuestions: any =[];
  
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.verify = false;
    this.message='';
    this.securityQuestions = [
      "Where were you born?",
      "What was your first pet's name?",
      "What was the make and model of your first car?",
      "What was your favorite subject?",
      "How many times did you take the SAT?"
  ];
    this.signUpForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]),
      username: new FormControl('',[Validators.required,Validators.minLength(10), Validators.pattern(/^[0-9]+$/)]),
      password: new FormControl('', [Validators.required,Validators.minLength(8),
        Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      verifyPassword: new FormControl('', [Validators.required,Validators.minLength(8),
        Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      //securityQuestion: new FormControl(''),
      securityAnswer: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)])
    });
  }
  onFormSubmit(){
    if(this.signUpForm.value.password === this.signUpForm.value.verifyPassword)
      this.verify = true;
    if(this.verify){
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
            this.authService.message$.next('Sign-Up success, please login')
            this.router.navigateByUrl('/login');
        },
        error: (e)=>{
          this.message = "Sign-Up unsuccessful, please try again.";
        }
  
      });
    }
    else{
      this.message="Passwords do not match, please try again."
    }

  }
  toLogin(): void{
    this.router.navigateByUrl("");
  }
  toSignUp(): void{
    this.router.navigateByUrl("/sign-up");
  }
}

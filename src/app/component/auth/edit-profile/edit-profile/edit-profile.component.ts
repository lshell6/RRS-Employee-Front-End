import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeEditDto } from 'src/app/component/model/employee.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  dto: EmployeeEditDto;
  message: string;
  securityQuestions: any =[];
  changeSecurityQuestion: boolean;
  changePassword: boolean;
  answer: string;
  name: string;
  credentials: string;
  username: string;

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.changeSecurityQuestion = false;
    this.answer=this.dto.securityAnswer;
    this.name=localStorage.getItem('name');
    this.username = localStorage.getItem('username');
    this.changePassword=false;
    this.message='';
    this.securityQuestions = [
      "Where were you born?",
      "What was your first pet's name?",
      "What was the make and model of your first car?",
      "What was your favorite subject?",
      "How many times did you take the SAT?"
  ];
    this.editProfileForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]),
      username: new FormControl({value: this.username, disabled: true}),
      password: new FormControl('', [Validators.required,Validators.minLength(8),
        Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      verifyPassword: new FormControl('', [Validators.required,Validators.minLength(8),
        Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      //securityQuestion: new FormControl(''),
      securityAnswer: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)])
    });

    this.credentials = localStorage.getItem('credentials');
      this.authService.getUserByUsername(this.credentials)
      .subscribe({
        next: (data)=>{ this.dto = data;
        console.log(this.dto);
        console.log(this.editProfileForm);
        this.editProfileForm.controls['name'].setValue(this.dto.name);
        this.editProfileForm.controls['securityQuestion'].setValue(this.dto.securityQuestion);
        this.editProfileForm.controls['securityAnswer'].setValue(this.dto.securityAnswer);

        },
        error: (e)=>{  }
      });
  }

  showChangePassword():void{
    this.changePassword=true;
    console.log('clicked on show change password');
  }

  changeSecurityQ():void{
    this.changeSecurityQuestion=true;
    console.log('clicked on show change security q');
  }

  toDashboard(): void{
    this.router.navigateByUrl('/dashboard');
  }

  logout(): void{
    this.router.navigateByUrl('/logout');
  }

  toProfile():void{
    this.router.navigateByUrl('/profile');
  }

  onCancel():void{
    this.router.navigateByUrl('/profile');
  }

  onFormSubmit(): void{
    this.dto ={
      name: this.editProfileForm.value.name,
      securityQuestion: this.editProfileForm.value.securityQuestion,
      securityAnswer: this.editProfileForm.value.securityAnswer,
      username: this.username
    };

    this.authService.editProfile(this.dto).subscribe({
      next: (data)=>{
        this.message='Profile Updated!!';
        this.editProfileForm.controls['name'].setValue(this.dto.name);
        this.editProfileForm.controls['securityQuestion'].setValue(this.dto.securityQuestion);
        this.editProfileForm.controls['securityAnswer'].setValue(this.dto.securityAnswer);
      },
      error: (e)=>{
        this.message='Update Operation Failed';
      }
    });
    this.router.navigateByUrl('/profile');
  }

  onQuestionSubmit(){
    // this.authService.validateSecurityAnswer(this.username, this.answer)
    // .subscribe({
    //   next: (data=>{
    //     if(data===true){
    //       this.authService.user$.next(this.username);
    //       this.authService.user$.next(this.securityAnswer);
    //     }
    //     else{
    //       this.authService.message$.next('Could not be verified');
    //       this.router.navigateByUrl('/profile');
    //     }
    //   }),
    // error: (e)=>{ }
    // });
    console.log("submit answer clicked");
  }

}

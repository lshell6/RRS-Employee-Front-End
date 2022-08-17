import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeSecurityDto } from 'src/app/component/model/employee.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-username-verify',
  templateUrl: './username-verify.component.html',
  styleUrls: ['./username-verify.component.css']
})
export class UsernameVerifyComponent implements OnInit {
  username: string;
  msg: string;
  dto: EmployeeSecurityDto;
  status: boolean;
  answer: string;
  showSecurityBox: boolean;
  showPasswordBoxes: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.msg = '';
    this.status = true;
    this.showSecurityBox=false;
    this.showPasswordBoxes=false;
  }

  onSubmit(): void{
    // this.authService.getUserSecurityDetailsByUsername(this.username).subscribe({
    //   next: (data)=>{
    //     this.dto=data;
    //     this.status=false;
    //     console.log(this.dto);
    //     this.showSecurityBox=true;
    //   },
    //   error: (e)=>{
    //     this.msg = "invalid username";
    //   }
    // });
    this.showSecurityBox=true;
  }
  onQuestionSubmit(){
    // this.authService.validateSecurityAnswer(this.username, this.answer)
    // .subscribe({
    //   next: (data=>{
    //     if(data===true){
    //       this.authService.user$.next(this.username);
    //       this.showPasswordBoxes=true;
    //     }
    //     else{
    //       this.authService.message$.next('Could not be verified');
    //       this.router.navigateByUrl('');
    //     }
    //   }),
    // error: (e)=>{ }
    // });
    this.showPasswordBoxes=true;
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './component/auth/service/auth.service';
import { Employee } from './component/model/employee.model';
import { EmployeeService } from './component/service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  employees: Employee[];
  
  username: string;

  constructor(private employeeService: EmployeeService, 
    private authService: AuthService,
    private router: Router) {
    this.username='';
  }
  

  ngOnInit(): void {
    this.employees = this.employeeService.fetchEmployees();
    this.authService.username$.subscribe((data)=>{
    this.username = data;
    })

  }

  toLogin(): void{
    this.router.navigateByUrl("/login");
  }
  toSignUp(): void{
    this.router.navigateByUrl("/sign-up");
  }
}

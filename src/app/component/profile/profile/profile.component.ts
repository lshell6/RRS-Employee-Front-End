import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  employee: Employee;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toDashboard(): void {
    this.router.navigateByUrl("/dashboard");
  }
  logout(): void{
    this.router.navigateByUrl('/logout');
  }
  editProfile():void{
    this.router.navigateByUrl('/edit');
  }
}

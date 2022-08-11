import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
employee:Employee;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logout(): void{
    this.router.navigateByUrl('/logout');
  }
  toProfile():void{
    this.router.navigateByUrl('/profile');
  }
}

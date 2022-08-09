import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { employeeData } from "src/app/data";
import { Employee } from "../model/employee.model";

@Injectable({
    providedIn: 'root'
  })
  export class EmployeeService{
    employees: Employee[];

    getAllEmployeesApi='http://localhost:1739/employee';
  constructor(private http: HttpClient){
    this.employees = employeeData;
  }

  fetchEmployees(): Employee[] {
       return this.employees;
  }
}
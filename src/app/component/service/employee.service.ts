import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "../model/employee.model";

@Injectable({
    providedIn: 'root'
  })
  export class EmployeeService{

    getAllEmployeesApi:string;
    getEmployeeByIdApi:string;
    getEmployeeByUsernameApi: string;
    updateEmployeeApi: string;
    loginApi:string;
    validateSecurityAnswerApi:string;
    postApi: string;
    resetPasswordApi: string;
    

  constructor(private http: HttpClient){
    this.getAllEmployeesApi='http://localhost:8282/employee';
    this.getEmployeeByIdApi='http://localhost:8282/employee/';
    this.getEmployeeByUsernameApi='http://localhost:8282/employee/'
    this.postApi = 'http://localhost:8282/employee';
    this.updateEmployeeApi='http://localhost:8282/employee/';
    this.validateSecurityAnswerApi='http://localhost:8282/validate-security-answer/';
    this.resetPasswordApi='http://localhost:8282/reset-password/';
    this.loginApi = 'http://localhost:8282/'
  }

  fetchEmployees(): Observable<Employee[]> {
      return this.http.get<Employee[]>(this.getAllEmployeesApi);
  }

  fetchEmployeeById(eid: number): Observable<Employee>{
    return this.http.get<Employee>(this.getEmployeeByIdApi + eid);
  } 

  fetchEmployeeByUsername(username: string): Observable<Employee>{
    return this.http.get<Employee>(this.getEmployeeByUsernameApi + username)
  }
  
  postEmployee(employee: Employee): Observable<any>{
    return this.http.post(this.postApi, employee);
  }

  updateEmployee(eid: number, employee: Employee): Observable<any>{
    return this.http.put(this.updateEmployeeApi + eid, employee);
  }

  validateSecurityAnswer(encodedText: string): Observable<any>{
    return this.http.get(this.validateSecurityAnswerApi + encodedText);
  }

  resetPassword(encodedText: string): Observable<any>{
    return this.http.get(this.resetPasswordApi + encodedText);
  }

  login(encodedCredentials: string): Observable<any>{
    return this.http.get(this.loginApi + encodedCredentials);
  }

}
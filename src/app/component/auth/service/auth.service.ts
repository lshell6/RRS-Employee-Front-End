import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee, EmployeeDto, EmployeeEditDto, EmployeeSecurityDto } from '../../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username: string;
  
  username$ = new BehaviorSubject<string>('');
  user$ = new BehaviorSubject<string>('');
  message$ = new BehaviorSubject<string>('');

  loginApi: string;
  signUpApi: string;
  employeeAPi: string;
  profileEditAPi: string;
  usernameVerifyApi: string;
  passwordResetApi: string;
  securityAnswerValidationApi: string;

  constructor(private http: HttpClient) {
    this.username='';
    this.loginApi = 'http://localhost:8282/login';
    this.signUpApi='http://localhost:8282/employee';
    this.employeeAPi = 'http://localhost:8282/employee/username';
    this.profileEditAPi='http://localhost:8282/employee/profile';
    this.usernameVerifyApi='http://localhost:8282/employee/username-verify';
    this.passwordResetApi='http://localhost:8282/employee/password-reset';
    this.securityAnswerValidationApi='http://localhost:8282/validate-security-answer'
  }

  isLoggedIn(): boolean{
    //check if the user is logged in or not.
    this.username = localStorage.getItem('username');
    if(this.username == null)
        return false;
    return true;
  }

  login(username: string, password: string): Observable<Employee> {
    let encodedCredentials = btoa(username + ':' + password); //aGFycnk6cG90dGVyMTIz
    let httpOptions={
      headers : new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : 'basic ' + encodedCredentials
      })
    };

     return this.http.get<Employee>(this.loginApi, httpOptions);
  }

  signUp(userDto: EmployeeDto):Observable<any> {
    return this.http.post(this.signUpApi, userDto);
  }

  getUserByUsername(credentials: string) : Observable<EmployeeEditDto>{
    let httpOptions={
      headers : new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : 'basic ' + credentials
      })
    };
    return this.http.get<EmployeeEditDto>(this.employeeAPi,httpOptions);
  }

  editProfile(userEditDto: EmployeeEditDto) :Observable<EmployeeEditDto>{
    let httpOptions={
      headers : new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization' : 'basic ' + localStorage.getItem('credentials')
      })
    };
     return this.http.put<EmployeeEditDto>(this.profileEditAPi,userEditDto,httpOptions);
  }

  getUserSecurityDetailsByUsername(username: string): Observable<EmployeeSecurityDto> {
    return this.http.get<EmployeeSecurityDto>(this.usernameVerifyApi + username);
  }

  validateSecurityAnswer(username: string, answer: string): Observable<boolean>{
    let encodedText = btoa(username + '|' + answer);
    return this.http.get<boolean>(this.securityAnswerValidationApi + encodedText);
  }

  resetPassword(username: string, password: string): Observable<any> {
    let encodedText = btoa(username + '|' + password);
    return this.http.put(this.passwordResetApi + encodedText, {});
  }
}

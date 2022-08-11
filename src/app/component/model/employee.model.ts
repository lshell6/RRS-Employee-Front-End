export class Employee{
    id: number;
    name: string;
    username: string;
    password?: string;
    current_points?: number;
    total_points?: number;
  }
  
  export class EmployeeDto{
    name: string;
    encodedCredentials: string;
    securityQuestion: string;
    securityAnswer: string;
  }
  
  
  export class EmployeeEditDto{
    id?: number;
    name: string;
    securityQuestion: string;
    securityAnswer: string;
    username: string;
  }
  
  export class EmployeeSecurityDto{
    id?: number;
    name: string;
    securityQuestion: string;
    username?: string;
  }
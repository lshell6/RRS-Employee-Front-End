import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    //logic for authentication goes here...
    let status= this.authService.isLoggedIn();
    if(status == false){
      //redirect to logincomponent
       this.authService.message$.next('please login to continue..');
       this.router.navigateByUrl('/');
    }

     return status;
  }
}

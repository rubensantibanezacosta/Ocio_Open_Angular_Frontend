import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { getDataFromToken } from '../utils/jwtparser';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(activatedRoute: ActivatedRouteSnapshot) {
    const scopes = getDataFromToken().scopes;
    const expireDate =  getDataFromToken().tokenExpiresIn;

    if(moment().isAfter(moment(expireDate))){
      console.error('Token Expired');
      localStorage.removeItem("OcioToken");
      this.router.navigate(['/login']);
      return false;
    }

    if (scopes.includes(activatedRoute.url[0].path)) {
      
      return true;
    } else {
      
      console.error('Unauthorized');
      localStorage.removeItem("OcioToken");
      this.router.navigate(['/login']);
      return false;
    }
  }
}




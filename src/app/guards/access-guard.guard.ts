import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { getDataFromToken } from '../utils/jwtparser';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardGuard implements CanActivate {

  constructor(private router: Router, public _matSnackBar:MatSnackBar) { }
  canActivate(activatedRoute: ActivatedRouteSnapshot) {
    const scopes = getDataFromToken().scopes;
    const expireDate =  getDataFromToken().tokenExpiresIn;

    if(moment().isAfter(moment(expireDate))){
      this._matSnackBar.open("La sesión ha expirado","Aceptar",{
        duration:3000,
        verticalPosition:"top",
        horizontalPosition:"center"
      })
      localStorage.removeItem("ocioToken");
      this.router.navigate(['/login']);
      return false;
    }

    if (scopes.includes(activatedRoute.url[0].path)) {
      
      return true;
    } else {
      this._matSnackBar.open("No tiene autorización para el recurso","Cerrar",{
        duration:3000,
        verticalPosition:"top",
        horizontalPosition:"center"
      })
      window.history.back();
      return false;
    }
  }
}




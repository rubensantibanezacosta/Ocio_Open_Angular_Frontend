import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { BehaviorSubject, Subscription } from 'rxjs';
import { Token } from 'src/app/models/token';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { getDataFromToken } from 'src/app/utils/jwtparser';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { slideInAnimationModals } from 'src/app/animations/animations';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[
    slideInAnimationModals
  ]
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;

  googleIcon = ("../../../assets/icons/google-icon-white.png");
  openCanariasLogo = ("../../../assets/icons/open-canarias-logo.png")

  constructor(
    private authService: SocialAuthService,
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.tokenExists();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  tokenExists() {
    if (localStorage.getItem("ocioToken").length>0) {
      const expireDate = getDataFromToken().tokenExpireDate;
      if (moment().isBefore(moment(expireDate))) {
        this.router.navigateByUrl("/menu/home");
      }
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (data) => {
        if (data.email) {
          const user: User = new User();
          user.email = data.email;
          user.image_url = data.photoUrl;
          user.name = data.firstName;
          user.surname = data.lastName;

          this.loginService.login(user, data.idToken).subscribe((data) => {
            if (data.token) {
              this._snackBar.open(`¡Bienvenido ${user.name}!`, "Cerrar", {
                duration: 5000,
                
              })
              const token: Token = data;
              localStorage.setItem("ocioToken", token.token);
              this.router.navigateByUrl("/");
            }
          },
            (error) => {
              if (error.status == 401) {
                this._snackBar.open(`¡No se ha podido iniciar sesión!`, "Cerrar", {
                  duration: 5000,
                  horizontalPosition: "center",
                  verticalPosition: "top"
                })
              }
            })
        }
      }
    );
  }

  /* 
  email: "rubensantibanezacosta902@gmail.com"
  firstName: "Ruben"
  lastName: "Santibanez"
  name: "Ruben Santibanez"
  photoUrl: "https://lh3.googleusercontent.com/a/AATXAJwcvFaX_gz372p_URZppF-xJyJ2-AeOcW7t_poz=s96-c" */

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

}

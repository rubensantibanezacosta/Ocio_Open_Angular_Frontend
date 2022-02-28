import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { BehaviorSubject, Subscription } from 'rxjs';
import { Token } from 'src/app/models/token';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { getDataFromToken } from 'src/app/utils/jwtparser';
import * as moment from 'moment';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  public isChecked$ = new BehaviorSubject(false);
  public rememberMe: boolean = false;
  apiKeyToken: string = "";
  adminFormVisibility: boolean = false;

  ErrorMessage: string;


  googleIcon = ("../../../assets/icons/google-icon-white.png");
  openCanariasLogo = ("../../../assets/icons/open-canarias-logo.png")

  constructor(
    private authService: SocialAuthService,
    private loginService: LoginService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.tokenExists();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  setApiKeyValue(apiKeyToken: string) {
    this.apiKeyToken = apiKeyToken;

  }
  toggleChecked() {
    this.isChecked$.next(!this.isChecked$.value)
    this.rememberMe = this.isChecked$.value;
  }

  tokenExists() {
    if (localStorage.getItem("ocioToken")) {
      const expireDate = getDataFromToken().tokenExpireDate;
      if (moment().isBefore(moment(expireDate))) {
        this.router.navigateByUrl("/home");
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

          /*  const loginData: any = {
             user: user,
             rememberMe: this.rememberMe,
             apiKeyToken: this.apiKeyToken,
           }  */

          this.loginService.login(user, data.idToken).subscribe((data) => {
            if (data.token) {
              const token: Token = data;
              localStorage.setItem("ocioToken", token.token);

              this.router.navigateByUrl("/home");
            }
          },
            (error) => {

              this.ErrorMessage = error.error.message;
              this.createModal();

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

  adminFormVisibilityToggle() {
    if (this.adminFormVisibility) {
      this.adminFormVisibility = false;
      this.apiKeyToken = "";
    } else {
      this.adminFormVisibility = true;
    }
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }



  //Error handler modals
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;


  createModal() {
    this.sub = this.errorHandlerService
      .openModal(this.entry, 'ERROR', this.ErrorMessage)
      .subscribe((v) => {
        //your logic
      });
  }
}

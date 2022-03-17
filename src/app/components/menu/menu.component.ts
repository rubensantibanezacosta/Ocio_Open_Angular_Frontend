import { animate, state, style, transition, trigger } from '@angular/animations';
import {  Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { slideInAnimationModals } from 'src/app/animations/animations';
import { DarkmodeService } from 'src/app/services/darkmode.service';
import { LoginService } from 'src/app/services/login.service';
import { getDataFromToken } from 'src/app/utils/jwtparser';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('darkActivateSlider', [
      state('inactive', style({
        background: "green",
      })),
      state('active', style({
        background: "black",
      })),
      transition("inactive <=> active", animate('0.3s')),
    ]),
    slideInAnimationModals
  ]
})

export class MenuComponent implements OnInit {
  openLogo = "../../../assets/icons/open-canarias-logo.png";
  title: string = "Eventos disponibles";
  showFiller = false;

  darkActivateSliderState: string = "inactive";
  darkActivateButtonContainerState: string = "inactive";
  darkModeActive: boolean = false;

  menu = [
    {
      displayName: 'Eventos',
      iconName: 'celebration',
      route: 'home',
    },
    {
      displayName: 'Calendario',
      iconName: 'calendar_month',
      route: 'calendar',
    },
    {
      displayName: 'Ranking',
      iconName: 'star',
      route: 'ranking',
    },
    /*   {
        displayName: 'Cerrar sesión',
        iconName: 'ballot',
        route: 'entradasGADE',
      }, */
    {
      displayName: 'Administración',
      iconName: 'admin_panel_settings',
      route: 'administration',
    },

  ];
  constructor(private router: Router, private authService: SocialAuthService,
    private loginService: LoginService, private darkmodeService: DarkmodeService) {
  }


  adminSectionAllowed = false;

  ngOnInit(): void {
    this.setTitle();
    this.darkModeActive = this.darkmodeService.getDarkmode();
    this.darkModeUpdate();
    this.validateAdminScopes();
  }

  validateAdminScopes() {
    const scopes = getDataFromToken().scopes;
    if (scopes.includes("administration")) {
      this.adminSectionAllowed = true;
    }
  }

  darkModeUpdate() {
    this.darkModeActive = this.darkmodeService.getDarkmode();
    if (this.darkModeActive) {
      this.darkActivateSliderState = "active";
      this.darkActivateButtonContainerState = "active";
    } else {
      this.darkActivateSliderState = "inactive";
      this.darkActivateButtonContainerState = "inactive";
    }
  };

  darkmodeToogleButton() {
    this.darkmodeService.toogleDarkmode();
    this.darkModeUpdate();
  }

  capitalize(value: string): string {
    let first = value.substr(0, 1).toUpperCase();
    return first + value.substr(1);
  }

  setTitle() {
    setTimeout(() => {
      let path: string = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];
      this.menu.forEach((page) => {
        if(page.route==path){
          this.title = this.capitalize(page.displayName);
        } 
      })
      
    }, 200)

  }
  signOut(): void {
    localStorage.removeItem("ocioToken");
    this.router.navigateByUrl("/login");
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}


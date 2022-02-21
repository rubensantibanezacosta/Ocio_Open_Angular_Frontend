import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { DarkmodeService } from 'src/app/services/darkmode.service';
import { LoginService } from 'src/app/services/login.service';
import { getDataFromToken } from 'src/app/utils/jwtparser';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('darkActivateSlider', [
      state('inactive', style({})),
      state('active', style({
        transform:  "translateX(-15px)",
      })),
      transition("inactive <=> active", animate('0.3s')),
    ]),
    trigger('darkActivateButtonContainer', [
      state('inactive', style({})),
      state('active', style({
        background:  "black",
      })),
      transition("inactive <=> active", animate('0.1s')),
    ])
  ]
})

export class MenuComponent implements OnInit {
  darkActivateSliderState:string="inactive";
  darkActivateButtonContainerState:string="inactive";
  darkModeActive:boolean=false;
  constructor(private router: Router, private authService: SocialAuthService,
    private loginService: LoginService, private darkmodeService:DarkmodeService) { }
  menuIcon = "../../../assets/icons/menu-icon.png";
  viewIcon = "../../../assets/icons/view-icon.png";
  plusIcon = "../../../assets/icons/plus-icon.png";
  profileIcon = "../../../assets/icons/user-icon.png";
  logoutIcon = "../../../assets/icons/logout-icon.png";
  collapseIcon = "../../../assets/icons/collapse-icon.png";
  eventsIcon = "../../../assets/icons/events-icon.png";
  calendarIconMenu = "../../../assets/icons/calendarIcon-menu.png";
  rankingIconMenu = "../../../assets/icons/ranking-icon.png";
  myEventIcon = "../../../assets/icons/my-event-icon.png";
  calendarIconMenuOk = "../../../assets/icons/calendar-ok-icon.png";
  dataBaseIcon = "../../../assets/icons/data-icon.png";

  menuShown: boolean = false;
  url:string=window.location.pathname;
  adminSectionAllowed=false;
  
  ngOnInit(): void {
    this.darkModeActive=this.darkmodeService.getDarkmode();
    this.darkModeUpdate();
    this.validateAdminScopes();
  }

  validateAdminScopes(){
    const scopes= getDataFromToken().scopes;
    if(scopes.includes("administration")){
      this.adminSectionAllowed=true;
    }
  }

  darkModeUpdate(){
    this.darkModeActive=this.darkmodeService.getDarkmode();
    if(this.darkModeActive){
        this.darkActivateSliderState="active";
        this.darkActivateButtonContainerState="active";
    }else{
      this.darkActivateSliderState="inactive";
        this.darkActivateButtonContainerState="inactive";
    }
  };

  darkmodeToogleButton(){
    this.darkmodeService.toogleDarkmode();
    this.darkModeUpdate();
  }

  //Animations
  showMenu() {
    const menuIcon: HTMLElement = document.querySelector("#menuIcon");
    menuIcon.style.animationPlayState = "running";
    setTimeout((() => {
      menuIcon.style.animationPlayState = "paused";
    }
    ), 800);
    if (!this.menuShown) {
      document.querySelector("#slider").classList.toggle("sliderShow");
      setTimeout((() => {
        this.menuShown = true;
        document.querySelector("#menu").classList.add("showMenu");
        document.querySelector("#collapse-icon").classList.add("collapse-icon-show");
      }), 300);
    } else {
      document.querySelector("#menu").classList.remove("showMenu");
      document.querySelector("#collapse-icon").classList.remove("collapse-icon-show");
      setTimeout((() => {
        document.querySelector("#slider").classList.remove("sliderShow");
        this.menuShown = false;
      }), 1000);
    }
  }

  signOut(): void {
    
      localStorage.removeItem("ocioToken");
      this.router.navigateByUrl("/");
   
  }

}
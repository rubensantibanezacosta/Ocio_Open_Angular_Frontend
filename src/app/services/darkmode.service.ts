import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {


  constructor() {
    this.getDarkmode();
  }

  getDarkmode() {
    if (localStorage.getItem("darkmode") == "true") {
      document.querySelector("body").classList.add("dark");
      return true;
    }
    document.querySelector("body").classList.remove("dark");
    return false;
  }
  toogleDarkmode() {
    if (localStorage.getItem("darkmode") == "true") {
      localStorage.setItem("darkmode", "false");
      this.getDarkmode();
    } else {
      localStorage.setItem("darkmode", "true");
      this.getDarkmode();
    }
  }
}

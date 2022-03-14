import { LoadingService } from './services/loading.service';
import { DarkmodeService } from './services/darkmode.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimationRoutes } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimationRoutes,
    // animation triggers go here
  ]
})


export class AppComponent {
  constructor(private darkmodeService:DarkmodeService, public loadingService:LoadingService){
  
  }
  title = 'frontend';


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}

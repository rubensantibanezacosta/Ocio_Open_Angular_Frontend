import { LoadingService } from './services/loading.service';
import { DarkmodeService } from './services/darkmode.service';
import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})


export class AppComponent {
  

  constructor(private darkmodeService:DarkmodeService, public loadingService:LoadingService){
    
  }
  title = 'frontend';
  
}

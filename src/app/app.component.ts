import { DarkmodeService } from './services/darkmode.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  constructor(private darkmodeService:DarkmodeService){
  
  }
  title = 'frontend';
}

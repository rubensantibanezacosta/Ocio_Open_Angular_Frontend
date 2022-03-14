import { LoadingService } from './../../services/loading.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loading-logo',
  templateUrl: './loading-logo.component.html',
  styleUrls: ['./loading-logo.component.scss']
})
export class LoadingLogoComponent {
  $progress:Subject<number> = this.loadingService.$progress;
  $isLoading:Subject<boolean> = this.loadingService.$isLoading;

logo="./../../../assets/icons/open-canarias-logo.png";

  constructor(private loadingService:LoadingService) { 

  
  }

}

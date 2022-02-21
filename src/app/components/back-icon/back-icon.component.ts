import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-icon',
  templateUrl: './back-icon.component.html',
  styleUrls: ['./back-icon.component.scss']
})
export class BackIconComponent implements OnInit {
  collapseIcon = "../../../assets/icons/collapse-icon.png";
  constructor() { }

  ngOnInit(): void {
  }

  back(){
    
    window.history.back();
  }
}

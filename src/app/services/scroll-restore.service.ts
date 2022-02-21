import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollRestoreService {
  anchor:number=0;
  constructor() { }

  getAnchor():number{
    return this.anchor;
  }

  setAnchor(value:number){
    this.anchor=value;
  }
}

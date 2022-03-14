import { LoadingLogoComponent } from './../components/loading-logo/loading-logo.component';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService  {
$isLoading:Subject<boolean> = new Subject<boolean>();
$progress:Subject<number> = new Subject<number>();


show(){
  this.$isLoading.next(true);
}

hide(){
  this.$isLoading.next(false);
}

updateProgress(progress){
  return this.$progress.next(progress);
}
}
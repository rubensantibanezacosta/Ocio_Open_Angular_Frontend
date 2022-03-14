import { LoadingService } from './../services/loading.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators'
import { error } from 'console';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private countRequestadd:number = 0;
  private countRequestdiscount:number = 0;
  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.countRequestadd==0 || (this.countRequestadd>this.countRequestdiscount)) {
      this.loadingService.show();
      this.loadingService.updateProgress(0);
    }
    this.countRequestadd++;
    return next.handle(request).pipe(
      
      finalize(() => {
        this.countRequestdiscount++;
        let progressPercent=Math.round(this.countRequestdiscount*100/this.countRequestadd);
        this.loadingService.updateProgress(progressPercent);
        if ( (this.countRequestadd<=this.countRequestdiscount)) {
          this.loadingService.hide();
          this.countRequestadd=0;
          this.countRequestdiscount=0;
        }
      }),
    );
  }
}



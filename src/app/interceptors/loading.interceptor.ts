import { LoadingService } from './../services/loading.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators'
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private countRequestadd: number = 0;
  private countRequestdiscount: number = 0;

  errorMessages = [
    {
      code: 204,
      message: "Respuesta sin contenido"
    },
    {
      code: 400,
      message: "Petición incorrecta"
    },
    {
      code: 401,
      message: "No tiene autorización"
    },
    {
      code: 403,
      message: "No tiene acceso"
    },
    {
      code: 404,
      message: "Recurso no encontrado"
    },
    {
      code: 415,
      message: "Formato no soportado"
    },
    {
      code: 500,
      message: "Error interno del servidor"
    },
    {
      code: 0,
      message: "No tiene conexión, intentelo más tarde"
    }
  ]
  constructor(private loadingService: LoadingService, private _snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.countRequestadd == 0 || (this.countRequestadd > this.countRequestdiscount)) {
      this.loadingService.show();
      this.loadingService.updateProgress(0);
    }
    this.countRequestadd++;
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          
          this.errorHandler(error.status);
        } else {
          // server-side error
          
          this.errorHandler(error.status)
          if (error.status === 0) {
            this.errorHandler(error.status)
          }
        }
        this.errorHandler(error.status)
        return throwError(errorMessage);
      }),
      finalize(() => {
        this.countRequestdiscount++;
        let progressPercent = Math.round(this.countRequestdiscount * 100 / this.countRequestadd);
        this.loadingService.updateProgress(progressPercent);
        if ((this.countRequestadd <= this.countRequestdiscount)) {
          this.loadingService.hide();
          this.countRequestadd = 0;
          this.countRequestdiscount = 0;
        }
      }),
    );
  }

  errorHandler(code){
    const messages=this.errorMessages.filter((message)=>{
      return message.code==code;
    })
    if(messages.length==0){
      return this._snackBar.open("Error desconocido","Cerrar",{
        duration:5000
      })
    }
    return this._snackBar.open(messages[0].message,"Cerrar",{
      duration:5000
    })
  }
}



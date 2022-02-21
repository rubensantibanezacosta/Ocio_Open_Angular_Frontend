import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../models/token';


@Injectable({
  providedIn: 'root'
})


export class LoginService {

  endpoint = 'http://localhost:4000/api/auth/sign-in/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) { }

  login(body: any, idToken:string): Observable<Token> {
    const basic:string=btoa(body.email+":"+idToken);
    const httpOptionsBasic = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
      "Authorization":"Basic "+basic})
    };
    return this.httpClient.post<Token>(this.endpoint, JSON.stringify(body), httpOptionsBasic);
  }

}

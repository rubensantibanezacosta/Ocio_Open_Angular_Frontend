import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  endpoint = process.env.BACKEND_HOST + '/api/user';
  bearerToken = localStorage.getItem("ocioToken");
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
    }
    )
  };
  constructor(private httpClient:HttpClient) { }

  createOrUpdateUser(user:User):Observable<any>{
    
    return this.httpClient.post<any>(this.endpoint, JSON.stringify(user), this.httpOptions)
  }

  getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.endpoint, this.httpOptions)
  }

  getUserByEmail(email:string):Observable<User>{
    return this.httpClient.get<User>(this.endpoint+"/"+email, this.httpOptions)
  }

  getUserPosition(email:string):Observable<number>{
    return this.httpClient.get<number>(this.endpoint+"/position/"+email, this.httpOptions)
  }


  deleteUserByEmail(email:string):Observable<string>{
    return this.httpClient.delete<string>(this.endpoint+"/"+encodeURI(email), this.httpOptions)
  }

  getAllUsersReport(){
    return this.httpClient.get(this.endpoint+"/admin/report", { ...this.httpOptions, responseType: 'blob' })
  }
  sendUsersReportEmail(email:string){
    return this.httpClient.post(this.endpoint+"/admin/report", {email:email}, this.httpOptions);
  }

  updateUsersPermissions(permissions:string, email:string):Observable<any>{
    return this.httpClient.put<any>(this.endpoint+"/"+email, permissions, this.httpOptions);
  }

}

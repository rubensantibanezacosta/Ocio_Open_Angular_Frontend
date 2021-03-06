import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Permissions } from '../models/permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  endpoint = environment.host + '/api/roles/admin';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }
    )
  };
  constructor(private httpClient:HttpClient) { }


  getAllPermissions():Observable<Permissions>{
    return this.httpClient.get<Permissions>(this.endpoint, this.httpOptions);
  }
}

import { Observable } from 'rxjs';
import { VariablesService } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Permissions } from '../models/permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  variables = this.variablesService.getVariables();
  endpoint = this.variablesService.variables.host + '/api/roles/admin';
  bearerToken = localStorage.getItem("ocioToken");

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`,
    }
    )
  };
  constructor(private variablesService:VariablesService, private httpClient:HttpClient) { }


  getAllPermissions():Observable<Permissions>{
    return this.httpClient.get<Permissions>(this.endpoint, this.httpOptions);
  }
}

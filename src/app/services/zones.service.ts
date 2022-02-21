import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VariablesService } from 'src/config/config';
import { Zones } from '../models/zone';


@Injectable({
  providedIn: 'root'
})
export class ZonesService {
  variables= this.variablesService.getVariables();
  endpoint = this.variablesService.variables.host + '/api/zones';
  bearerToken = localStorage.getItem("ocioToken");
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.bearerToken}` }
    )
  };
  constructor(private httpClient:HttpClient, private variablesService:VariablesService) { }

  getAllZones():Observable<Zones[]>{
    return this.httpClient.get<Zones[]>(this.endpoint, this.httpOptions)
  }

  
}

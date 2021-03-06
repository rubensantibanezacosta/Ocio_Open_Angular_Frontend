import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Zones } from '../models/zone';


@Injectable({
  providedIn: 'root'
})
export class ZonesService {
  endpoint =environment.host+ '/api/zones';
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json' }
    )
  };
  constructor(private httpClient:HttpClient) { }

  getAllZones():Observable<Zones[]>{
    return this.httpClient.get<Zones[]>(this.endpoint, this.httpOptions)
  }

  
}

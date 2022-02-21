import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';
import { VariablesService } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  variables= this.variablesService.getVariables();
  endpoint = this.variablesService.variables.host + '/api/events';
  bearerToken = localStorage.getItem("ocioToken");
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.bearerToken}` }
    )
  };
  constructor(private httpClient:HttpClient, private variablesService:VariablesService) { }

  createEvent(event:Event):Observable<Event>{
    return this.httpClient.post<Event>(this.endpoint, JSON.stringify(event), this.httpOptions)
  }

  getAllEventsASC():Observable<Event[]>{
    return this.httpClient.get<Event[]>(this.endpoint+"/ASC", this.httpOptions)
  }

  getAllEventsDESC():Observable<Event[]>{
    return this.httpClient.get<Event[]>(this.endpoint+"/DESC", this.httpOptions)
  }

  getEventsByDate(date:Date):Observable<Event[]>{
    return this.httpClient.get<Event[]>(this.endpoint+"/bydate/"+date, this.httpOptions)
  }

  getEventsByOrganizerASC(organizer:string):Observable<Event[]>{
    return this.httpClient.get<Event[]>(this.endpoint+"/byorganizer/ASC/"+ encodeURI(organizer), this.httpOptions)
  }

  getEventsByOrganizerDESC(organizer:string):Observable<Event[]>{
    return this.httpClient.get<Event[]>(this.endpoint+"/byorganizer/DESC/"+ encodeURI(organizer), this.httpOptions)
  }

  getEventById(event_id:number):Observable<Event>{
    return this.httpClient.get<Event>(this.endpoint+"/byid/"+event_id, this.httpOptions)
  }

  updateEvent(event:Event):Observable<string>{
    return this.httpClient.put<string>(this.endpoint, JSON.stringify(event), this.httpOptions)
  }

  updateEventAdmin(event:Event):Observable<string>{
    return this.httpClient.put<string>(this.endpoint+"/admin", JSON.stringify(event), this.httpOptions)
  }
  
  deleteEventById(event_id:number):Observable<string>{
    return this.httpClient.delete<string>(this.endpoint+"/"+event_id, this.httpOptions)
  }

  deleteEventByIdAdmin(event_id:number):Observable<string>{
    return this.httpClient.delete<string>(this.endpoint+"/admin/"+event_id, this.httpOptions)
  }
}

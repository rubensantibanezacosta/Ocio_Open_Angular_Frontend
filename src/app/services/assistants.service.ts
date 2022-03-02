
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asisstant } from '../models/assistant';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AssistantsService {
  
  endpoint = environment.host + '/api/assistant';
  bearerToken = localStorage.getItem("ocioToken");
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.bearerToken}` }
    )
  };
  constructor(private httpClient:HttpClient) { }

  createOrUpdateAssistant(assistant:Asisstant):Observable<string>{
    return this.httpClient.post<string>(this.endpoint, JSON.stringify(assistant), this.httpOptions)
  }

  getAssistantByPk(event_id:number, assistant:string):Observable<Asisstant>{
    return this.httpClient.get<Asisstant>(this.endpoint + "/bypk/" + event_id + "/" + encodeURI(assistant), this.httpOptions)
  }

  getAssistantsByEvent(event_id:number):Observable<Asisstant[]>{
    return this.httpClient.get<Asisstant[]>(this.endpoint+"/byevent/"+event_id, this.httpOptions)
  }

  getAssistantsByEventNot(event_id:number):Observable<Asisstant[]>{
    return this.httpClient.get<Asisstant[]>(this.endpoint+"/byeventnot/"+event_id, this.httpOptions)
  }

  getAllAssistants():Observable<Asisstant[]>{
    return this.httpClient.get<Asisstant[]>(this.endpoint,this.httpOptions)
  }

  countAttendance(assistant:string):Observable<number>{
    return this.httpClient.get<number>(this.endpoint+"/count/"+assistant,this.httpOptions)
  }
  updateAssistant(assistant:Asisstant):Observable<string>{
    return this.httpClient.put<string>(this.endpoint,JSON.stringify(assistant) ,this.httpOptions)
  }

  deleteAssistantById(event_id:string, assistant:string):Observable<string>{
    return this.httpClient.delete<string>(this.endpoint,this.httpOptions)
  }

  
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Punctuation } from '../models/punctuation';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PunctuationsService {
  endpoint = environment.host + '/api/punctuations';

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json' }
    )
  };
  constructor(private httpClient:HttpClient) { }

  createOrUpdatePunctuation(punctuation:Punctuation):Observable<any>{
    return this.httpClient.post<any>(this.endpoint, JSON.stringify(punctuation), this.httpOptions)
  }

  getAllPunctuations():Observable<Punctuation[]>{
    return this.httpClient.get<Punctuation[]>(this.endpoint, this.httpOptions)
  }

  getPunctuationsByEvent(event_id:number):Observable<Punctuation[]>{
    return this.httpClient.get<Punctuation[]>(this.endpoint+"/"+event_id, this.httpOptions)
  }

  getPunctuationsByOrganizer(organizer:string):Observable<Punctuation[]>{
    return this.httpClient.get<Punctuation[]>(this.endpoint+"/"+encodeURI(organizer), this.httpOptions)
  }

  getPunctuationByPk(event_id:number, assistant:string):Observable<Punctuation>{
    return this.httpClient.get<Punctuation>(this.endpoint+"/bypk/"+event_id+"/"+encodeURI(assistant), this.httpOptions)
  }

}

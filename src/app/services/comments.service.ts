import { WebSocketService } from './web-socket.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VariablesService } from 'src/config/config';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  variables = this.variablesService.getVariables();
  endpoint = this.variablesService.variables.host + '/api/comments';
  bearerToken = localStorage.getItem("ocioToken");
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
    }
    )
  };
  constructor(private httpClient: HttpClient, private variablesService: VariablesService, private webSocket:WebSocketService) { }

  getCommentsByEvent(event_id: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.endpoint + "/byevent/" + event_id, this.httpOptions);
  }

  createComment(comment: Comment): Observable<string> {
    return this.httpClient.post<string>(this.endpoint, JSON.stringify(comment), this.httpOptions);
  }


  deleteComment(comment_id: number, index): Observable<string> {
    return this.httpClient.delete<string>(this.endpoint + "/" + comment_id + "/"+index, this.httpOptions);
  }

}

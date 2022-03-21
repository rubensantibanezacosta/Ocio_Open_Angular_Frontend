import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
//import { io } from 'socket.io-client';

import { Client, StompConfig, StompHeaders, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  endpoint = environment.host;

  sockJS = new SockJS( this.endpoint + "/chat-websocket");
  client = Stomp.over(this.sockJS);


  constructor() {
    
    this.client.connect({},(info)=>{
      console.log("Connected to broker: " + this.client.connected + " :: " + info)
    })
  }

  //SOCKET.IO CLIENT CONNECTION UNABLE WITH SPRING JAVA
  /*   io = io(this.variablesService.variables.socket,{
      transports: ['websocket','polling'],
      upgrade:false,
      withCredentials:true, 
      autoConnect: true,
    })
    constructor(private variablesService:VariablesService) {
      this.io.on("connection",(socket)=>console.log(socket.id))
    
    } */


}

import { VariablesService } from './../../config/config';
import { Injectable } from '@angular/core';
//import { io } from 'socket.io-client';

import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  variables= this.variablesService.getVariables();
  endpoint = this.variablesService.variables.host + '/api/punctuations';
  bearerToken = localStorage.getItem("ocioToken");


  client: Client = new Client({connectHeaders:{
    Authorization: `Bearer ${this.bearerToken}`
  }});
  sockJS = new SockJS(this.variablesService.getVariables().host + "/chat-websocket");

  constructor(private variablesService: VariablesService) {
    this.client.webSocketFactory = () => {
      return this.sockJS;
    }
    
    this.client.onConnect = (info) => {
      console.log("Connected to broker: " + this.client.connected + " :: " + info)
    }

    
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

import { Component, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from '../../models/event';
import * as moment from 'moment';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  tittle = "Eventos disponibles";
  image = "../../../assets/icons/events-icon.png";

  ErrorMessage:string;

  constructor(private eventsService: EventsService,  private errorHandlerService:ErrorHandlerService) { }

  ngOnInit(): void {
    window.history.pushState({ prevUrl: window.location.href },null);
  }

    //Error handler modals
    @ViewChild('modal', { read: ViewContainerRef })
    entry!: ViewContainerRef;
    sub!: Subscription;
  
  
    createModal(){
        this.sub = this.errorHandlerService
          .openModal(this.entry, 'ERROR', this.ErrorMessage)
          .subscribe((v) => {
            //your logic
          });
    }
}

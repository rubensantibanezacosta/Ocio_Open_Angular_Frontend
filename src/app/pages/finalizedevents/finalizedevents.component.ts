import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-finalizedevents',
  templateUrl: './finalizedevents.component.html',
  styleUrls: ['./finalizedevents.component.scss']
})
export class FinalizedeventsComponent implements OnInit {
tittle:string="Eventos Terminados";
image="../../../assets/icons/calendar-ok-icon.png";

ErrorMessage:string;
  constructor( private errorHandlerService:ErrorHandlerService) { }

  ngOnInit(): void {
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

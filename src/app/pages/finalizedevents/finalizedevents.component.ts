import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-finalizedevents',
  templateUrl: './finalizedevents.component.html',
  styleUrls: ['./finalizedevents.component.scss']
})
export class FinalizedeventsComponent implements AfterViewInit {
tittle:string="Eventos Terminados";
image="../../../assets/icons/calendar-ok-icon.png";
modalShown=true;

ErrorMessage:string;
  constructor( private errorHandlerService:ErrorHandlerService) { }


  ngAfterViewInit(): void {

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

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssistantsService } from 'src/app/services/assistants.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Asisstant } from '../../models/assistant'

@Component({
  selector: 'app-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.scss']
})
export class AssistantsComponent implements OnInit {
  event_id: number = this.activatedRoute.snapshot.params.event_id;
  tittle: string = "Asistentes"
  image = "../../../assets/icons/assistants_icon.png";
  miniStar = "../../../assets/icons/mini-star.png";

  ErrorMessage: string;

  assistants: Asisstant[] = [];
  constructor(private activatedRoute: ActivatedRoute, private assistantsService: AssistantsService, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getAssistantsByEvent();
    
  }

  getAssistantsByEvent() {
    return this.assistantsService.getAssistantsByEvent(this.event_id).subscribe((assistants) => {
      this.assistants = assistants;
    },
      (error) => {
        this.ErrorMessage = error.error;
        this.createModal();

      })
  }

  //Error handler modals
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;


  createModal() {
    this.sub = this.errorHandlerService
      .openModal(this.entry, 'ERROR', this.ErrorMessage)
      .subscribe((v) => {
        //your logic
      });
  }


}

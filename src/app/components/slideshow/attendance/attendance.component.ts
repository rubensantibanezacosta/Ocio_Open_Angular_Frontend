import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Asisstant } from 'src/app/models/assistant';
import { AssistantsService } from 'src/app/services/assistants.service';
import { getDataFromToken } from 'src/app/utils/jwtparser';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  animations: [
    trigger('yesButton', [
      state('inactive', style({})),
      state('active', style({
        background: "linear-gradient(180deg, #52FF00, #1C5600)",
        border: "solid 2px green"
      })),
      transition("inactive <=> active", animate('0.3s')),
    ]),
    trigger('noButton', [
      state('inactive', style({})),
      state('active', style({
        background: "linear-gradient(180deg, #FF0000, #450000)",
        border: "solid 2px red"
      })),
      transition("inactive <=> active", animate('0.3s')),
    ])
  ]
})
export class AttendanceComponent implements OnInit {
  userEmail: string = getDataFromToken().username;
  @Input() event_id: number;
  assistantState: boolean = undefined;

  yesButtonState: string = "inactive";
  noButtonState: string = "inactive";

  ErrorMessage: string;

  constructor(private assistantsService: AssistantsService) { }

  ngOnInit(): void {
    this.refreshAssistantState();
  }

  refreshAssistantState() {
    this.assistantsService.getAssistantByPk(this.event_id, this.userEmail)
      .subscribe((assistant) => {
        if (assistant[0]) {
          if (assistant[0].attendance == true) {
            this.yesButtonState = "active";
            this.noButtonState = "inactive";
            this.assistantState = true;
          }
          if (assistant[0].attendance == false) {
            this.yesButtonState = "inactive";
            this.noButtonState = "active";
            this.assistantState = false;
          }
        }
      })
  }

  suscribeToEvent() {
    const assistant = new Asisstant();
    assistant.assistant = this.userEmail;
    assistant.event_id = this.event_id;
    assistant.attendance = true;
    this.assistantsService.createOrUpdateAssistant(assistant).subscribe(
      (response) => {
        this.refreshAssistantState();
      });
  }

  unSuscribeToEvent() {
    const assistant = new Asisstant();
    assistant.assistant = this.userEmail;
    assistant.event_id = this.event_id;
    assistant.attendance = false;
    this.assistantsService.createOrUpdateAssistant(assistant)
      .subscribe(
        (response) => {
          this.refreshAssistantState();
        });
  }

}

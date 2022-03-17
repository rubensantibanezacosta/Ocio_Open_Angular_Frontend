import { LoadingService } from './../../../../services/loading.service';
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AssistantsService } from 'src/app/services/assistants.service';
import { Asisstant } from 'src/app/models/assistant';
import { getDataFromToken } from 'src/app/utils/jwtparser';
import { Subscription } from 'rxjs';
import { state, style, trigger } from '@angular/animations';

@Component({
  selector: 'app-day-event',
  templateUrl: './day-event.component.html',
  styleUrls: ['./day-event.component.scss'],
  animations: [
    trigger('eventColor', [
      state('grey', style({})),
      state('green', style({
        background: "green"
      })),
      state('red', style({
        background: "red"
      })),
    ]),
  ]
})
export class DayEventComponent implements OnInit {

  @Input() event_id: number;
  @Input() eventName: string;
  assistant: Asisstant;
  attendanceState = "grey";

  ErrorMessage: string;
  constructor(private assistantService: AssistantsService) { }
  userEmail: string = getDataFromToken().username;
  ngOnInit(): void {
    this.getAttendance();
  }

  getAttendance() {
    this.assistantService.getAssistantByPk(this.event_id, this.userEmail).subscribe((assistant) => {

      if (!assistant[0]) {
        return undefined;
      }
      if (assistant[0].attendance == true) {
        return this.attendanceState = "green";
      } else {
        return this.attendanceState = "red";
      }
    },
    )
  }

}

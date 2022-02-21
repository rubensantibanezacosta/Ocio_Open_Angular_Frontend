import { Component, Input, OnInit } from '@angular/core';
import { Event } from "../../../models/event";
import * as moment from 'moment';
import { AssistantsService } from 'src/app/services/assistants.service';

@Component({
  selector: 'app-day-events',
  templateUrl: './day-events.component.html',
  styleUrls: ['./day-events.component.scss']
})
export class DayEventsComponent implements OnInit {

  @Input() events: Event[] = [];
  @Input() date: string;
  @Input() dayValue: number;

  eventsFiltered: Event[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getfromLocalEvents();
  }

  getfromLocalEvents() {
    let eventsFiltered = [];
    this.events.filter((event) => {
      if (moment(event.date).format("YY-M-D") == this.date) {
        return eventsFiltered.push(event);
      } else {
        return null;
      }
    })
    return this.eventsFiltered = eventsFiltered;
  }

  getAttendanceOfEvent(){
    this.getAttendanceOfEvent
  }
}

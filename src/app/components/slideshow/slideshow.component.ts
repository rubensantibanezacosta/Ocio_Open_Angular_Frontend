import { style, state } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from '../../models/event';
import * as moment from 'moment';
import { Asisstant } from 'src/app/models/assistant';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})


export class SlideshowComponent implements OnInit {
  @Input() future: boolean;
  @Input() userEmailOutput: string;
  @Input() dateToFilter: Date;


  events: Event[] = undefined;
  lazyEvents: Event[] = [];
  scrollObserver;

  formatDate = (date) => { return moment(date).locale("es").format("D [de] MMMM") };
  formatTime = (date) => { return moment(date).format("HH:mm") }

  constructor(private eventsService: EventsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadEvents();
  }


  scrollPositionlistener(target) {
    if (target.scrollHeight - target.scrollTop < 1000) {
      if (document.querySelector(".loadMore")) {
        document.querySelector(".loadMore").classList.remove("hidden");
      }
    } else {
      if (document.querySelector(".loadMore")) {
        document.querySelector(".loadMore").classList.add("hidden");
      }
    }
  }


  loadMore() {
    if (document.querySelector(".loadMore")) {
      document.querySelector(".loadMore").classList.add("hidden");
    }
    if (this.events.length - this.lazyEvents.length > 5) {
      for (let i = 0; i < 5; i++) {
        this.lazyEvents.push(this.events[this.lazyEvents.length])
      }
    } else {
      const rest = this.events.length - this.lazyEvents.length;
      for (let i = 0; i < rest; i++) {
        this.lazyEvents.push(this.events[this.lazyEvents.length])
      }
    }
    if (document.querySelector(".loadMore")) {
      document.querySelector(".loadMore").classList.remove("hidden");
    }
  }


  async loadEvents() {
    if (this.dateToFilter) {
      return this.eventsService.getEventsByDate(this.dateToFilter).subscribe((res) => {
        this.events = res;
        this.loadMore();

      })
    }
    if (this.future) {
      return this.eventsService.getAllEventsASC().subscribe(async data => {
        this.events = await data.filter((event => {

          return moment(event.date).isAfter(moment()) == this.future;
        }));
        this.loadMore();
      })
    } else {
      return this.eventsService.getAllEventsDESC().subscribe(async data => {
        this.events = await data.filter((event => {
          return moment(event.date).isAfter(moment()) == this.future;
        }));
        this.loadMore();
      })
    }
  }

  windowToEvent(url: string) {
    window.open(url);
  }

  filterByAttendance(assistants: Asisstant[]) {
    return assistants.filter((assistant) => {
      return assistant.attendance == true;
    }).length
  }

  datePastOrFuture(date: Date) {
    return moment(date).isAfter(moment());
  }


}

import { style, state } from '@angular/animations';
import { AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from '../../models/event';
import * as moment from 'moment';
import { Asisstant } from 'src/app/models/assistant';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Subscription } from 'rxjs';
import { ScrollRestoreService } from 'src/app/services/scroll-restore.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})


export class SlideshowComponent implements OnInit, OnDestroy {
  @Input() future: boolean;
  @Input() userEmailOutput: string;
  @Input() dateToFilter: Date;



  ErrorMessage: string;

  events: Event[] = undefined;
  lazyEvents: Event[] = [];
  scrollObserver;
  loading=false;



  formatDate = (date) => { return moment(date).locale("es").format("D [de] MMMM") };
  formatTime = (date) => { return moment(date).format("HH:mm") }

  constructor(private eventsService: EventsService, private errorHandlerService: ErrorHandlerService, private scrollRestoreService: ScrollRestoreService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
    this.loading=true;
    if (this.dateToFilter) {
      return this.eventsService.getEventsByDate(this.dateToFilter).subscribe((res) => {
        this.loading=false;
        this.events = res;
        this.loadMore();

      },
        (error) => {
          this.loading=false;
          this.ErrorMessage = error.error.message;
          this.createModal();

        })
    }
    if (this.future) {
      return this.eventsService.getAllEventsASC().subscribe(async data => {
        this.loading=false;
        this.events = await data.filter((event => {

          return moment(event.date).isAfter(moment()) == this.future;
        }));
        this.loadMore();

      },
        (error) => {
          this.loading=false;
          this.ErrorMessage = error.error.message;
          this.createModal();

        })
    } else {
      return this.eventsService.getAllEventsDESC().subscribe(async data => {
        this.loading=false;
        this.events = await data.filter((event => {
          return moment(event.date).isAfter(moment()) == this.future;
        }));
        this.loadMore();

      },
        (error) => {
          this.loading=false;
          this.ErrorMessage = error.error.message;
          this.createModal();

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


  saveScroll(value: number) {
    this.scrollRestoreService.setAnchor(value);
  }

  scrollRestore() {
    if (this.scrollRestoreService.getAnchor() != 0) {
      window.location.hash = "anchor" + 0;
      window.location.hash = "anchor" + this.scrollRestoreService.getAnchor(), false;
    }
  }

  ngOnDestroy() {

  }

}

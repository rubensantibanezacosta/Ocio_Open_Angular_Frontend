import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Event } from 'src/app/models/event';
import { UsersService } from 'src/app/services/users.service';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { AssistantsService } from 'src/app/services/assistants.service';
import { Subject, Subscription } from 'rxjs';
import { slideInAnimationModals } from 'src/app/animations/animations';
@Component({
  selector: 'app-profile-administration',
  templateUrl: './profile-administration.component.html',
  styleUrls: ['./profile-administration.component.scss'],
  animations:[
    slideInAnimationModals,
  ]
})
export class ProfileAdministrationComponent implements OnInit {
  userEmail: string = this.activatedRoute.snapshot.params.email;
  userPosition: number = 0;
  user: User = new User();
  events: Event[] = [];
  attendanceCounter: number = 0;
  eventsSubject: Subject<Event[]> = new Subject<Event[]>();

  constructor(private userService: UsersService, private activatedRoute: ActivatedRoute, private eventsService: EventsService, private assistantsService: AssistantsService) { }

  ngOnInit(): void {
    this.getUser();
    this.getUserPosition();
    this.getEventsByUser();
    this.countAttendance();
  }

  back() {
    window.history.back();
  }

  getUser() {
    this.userService.getUserByEmail(this.userEmail).subscribe((res) => {
      this.user = res;
    })
  }

  getUserPosition() {
    this.userService.getUserPosition(this.userEmail).subscribe((position) => {
      this.userPosition = position;
    })
  }

  getEventsByUser() {
    this.eventsService.getEventsByOrganizerDESC(this.userEmail).subscribe((events) => {
      this.events = events;
      this.eventsSubject.next(this.events)
    })
  }

  countAttendance() {
    this.assistantsService.countAttendance(this.userEmail).subscribe((res) => {

      this.attendanceCounter = res;
    })
  }

  formatDateString(date: string) {
    return moment(date).format("DD-MM-YY");
  }

  formatDate(date: Date) {
    return moment(date).format("DD-MM-YY");
  }

  formatDateTime(dateTime: string) {
    return moment(dateTime).format("DD-MM-YY HH:mm");
  }

}

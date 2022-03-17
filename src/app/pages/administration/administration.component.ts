import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Event } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { getDataFromToken } from 'src/app/utils/jwtparser';
import { Subject, Subscription } from 'rxjs';
import { FileSaverService } from 'ngx-filesaver';
import { slideInAnimationModals } from 'src/app/animations/animations';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
  animations: [
    trigger('userClip', [
      state('active', style({ display: "inherit" })),
      state('inactive', style({
        display: "none",
      })),
      transition("inactive <=> active", animate('0.3s')),
    ]),
    trigger('eventClip', [
      state('inactive', style({ display: "none" })),
      state('active', style({
        display: "inherit",
      })),
      transition("inactive <=> active", animate('0.3s')),
    ]),
    trigger('userTittle', [
      state('active', style({
        border: "1px solid white",
        borderBottom: "0"
      })),
      state('inactive', style({ borderBottom: "1px white solid" })),
      transition("inactive <=> active", animate('0s')),
    ]),
    trigger('eventTittle', [
      state('inactive', style({
        borderBottom: "1px white solid",
      })),
      state('active', style({
        border: "1px solid white",
        borderBottom: "0"
      })),
      transition("inactive <=> active", animate('0s')),
    ]),
    slideInAnimationModals
  ]
})

export class AdministrationComponent implements OnInit {

  image = "../../../assets/icons/data-icon.png";
  openCanariasLogo = ("../../../assets/icons/open-canarias-logo.png")


  userEmail: string = getDataFromToken().username;
  userData: User = new User();
  usersState: string = "active";
  eventsState: string = "inactive";
  users: User[] = [];
  events: Event[] = [];
  wordUsers: string = "";
  wordEvent: string = "";
  sendEmail: string = "";
  usersSubject: Subject<User[]> = new Subject<User[]>();
  eventsSubject: Subject<Event[]> = new Subject<Event[]>();



  constructor(private usersService: UsersService, private eventsService: EventsService, private fileSaverService: FileSaverService) { }

  ngOnInit(): void {
    this.loadInfoUsers();
    this.loadInfoEvents();
    this.getUser();
  }

  async loadInfoUsers() {

    return this.eventsService.getAllEventsDESC().subscribe((res) => {
      this.events = res;
      this.eventsSubject.next(this.events);
    })
  }

  async loadInfoEvents() {
    return this.usersService.getAllUsers().subscribe((res) => {
      this.users = res;
      this.usersSubject.next(this.users);
    },
    )
  }



  formatDate(date: Date) {
    return moment(date).format("DD-MM-YY");
  }

  formatDateTime(dateTime: string) {
    return moment(dateTime).format("DD-MM-YY HH:mm");
  }

  getUser() {
    this.usersService.getUserByEmail(this.userEmail).subscribe((res) => {
      this.userData = res;
    });
  }


  filterUsersByWord(event) {
    if (event.code == 'NumpadEnter' || event.code == 'Enter') {
      if (this.wordUsers != "") {
        this.usersSubject.next(this.users.filter((user) => {
          return user.surname.toLowerCase().includes(this.wordUsers.toLowerCase())
        }));
      }
    }
    if (event.code == 'Backspace' || this.wordUsers == "") {
      this.ngOnInit();
    }
  }


  filterEventsByWord(event) {
    if (event.code == 'NumpadEnter' || event.code == 'Enter') {
      if (this.wordEvent != "") {
        this.eventsSubject.next(this.events.filter((event) => {
          return event.tittle.toLowerCase().includes(this.wordEvent.toLowerCase())
        }))
      }
    }
    if (event.code == 'Backspace' || this.wordEvent == "") {
      this.ngOnInit();
    }
  }

  getUsersPDF(event) {
    event.preventDefault();
    this.usersService.getAllUsersReport().subscribe(async (data) => {
      const file = new File([data], "document.pdf", { type: 'application/pdf' });
      window.open(URL.createObjectURL(file), "blank");
    },
    )
  }

  sendUsersReport() {
    this.usersService.sendUsersReportEmail(this.sendEmail).subscribe((res) => {
      this.sendEmail = "";
    }
    )
  }

}

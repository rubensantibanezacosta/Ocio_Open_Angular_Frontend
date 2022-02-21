import { Component, NgZone, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Event } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { getDataFromToken } from 'src/app/utils/jwtparser';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Subscription } from 'rxjs';
import { FileSaverService } from 'ngx-filesaver';

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
    ])
  ]
})

export class AdministrationComponent implements OnInit {
  tittle = "Administración";
  image = "../../../assets/icons/data-icon.png";
  openCanariasLogo = ("../../../assets/icons/open-canarias-logo.png")
  searchIcon = "../../../assets/icons/search-icon.png";
  orderByIcon = "../../../assets/icons/order-by.png";

  userEmail: string = getDataFromToken().username;
  userData: User = new User();
  usersState: string = "active";
  eventsState: string = "inactive";
  users: User[] = [];
  events: Event[] = [];
  wordUsers: string = "";
  wordEvent: string = "";
  sendEmail: string = "";

  ErrorMessage: string;

  constructor(private usersService: UsersService, private eventsService: EventsService, private errorHandlerService: ErrorHandlerService, private zone: NgZone, private fileSaverService: FileSaverService) { }

  ngOnInit(): void {
    this.loadInfoUsers();
    this.loadInfoEvents();
    this.getUser();
  }

  async loadInfoUsers() {

    return this.eventsService.getAllEventsDESC().subscribe((res) => {
      return (this.events = res);
    },
      (error) => {
        this.ErrorMessage=error.error.message;
        this.createModal();

      })
  }
  async loadInfoEvents() {

    return this.usersService.getAllUsers().subscribe((res) => {
      return (this.users = res);
    },
      (error) => {
        this.ErrorMessage=error.error.message;
        this.createModal();

      })
  }

  showEvents() {
    this.usersState = "inactive";
    this.eventsState = "active";
  }

  showUsers() {
    this.usersState = "active";
    this.eventsState = "inactive";
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

  filterUsersByWord(event) {
    if (event.code == 'NumpadEnter' || event.code == 'Enter') {
      if (this.wordUsers != "") {
        this.users = this.users.filter((user) => {
          return user.surname.toLowerCase().includes(this.wordUsers.toLowerCase())
        })
      }
    }
    if (event.code == 'Backspace' || this.wordUsers == "") {
      this.ngOnInit();
    }
  }


  filterEventsByWord(event) {
    if (event.code == 'NumpadEnter' || event.code == 'Enter') {
      if (this.wordEvent != "") {
        this.events = this.events.filter((event) => {
          return event.tittle.toLowerCase().includes(this.wordEvent.toLowerCase())
        })
      }
    }
    if (event.code == 'Backspace' || this.wordEvent == "") {
      this.ngOnInit();
    }
  }

  getUsersPDF() {
    console.log("reveiving pdf")
    this.usersService.getAllUsersReport().subscribe(async (data) => {
      const file = new Blob([data], { type: 'x-google-chrome-pdf' });
      this.fileSaverService.save(<any>file, "document.pdf");
    },
      (error) => {
        this.ErrorMessage=error.error.message;
        this.createModal();

      })
  }

  sendUsersReport() {
    this.usersService.sendUsersReportEmail(this.sendEmail).subscribe((res) => {
      this.sendEmail = "";
    },
      (error) => {
        this.ErrorMessage=error.error.message;
        this.createModal();

      }
    )
  }

  /*   keyDownFunction(event, text:string){
      if(event.code==='Enter'){
        this.createComment(text);
      }
    } */
}

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Event } from 'src/app/models/event';
import { UsersService } from 'src/app/services/users.service';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { AssistantsService } from 'src/app/services/assistants.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-profile-administration',
  templateUrl: './profile-administration.component.html',
  styleUrls: ['./profile-administration.component.scss']
})
export class ProfileAdministrationComponent implements OnInit {
  tittle = "Administración";
  image = "../../../assets/icons/data-icon.png";
  star = "../../../assets/icons/big-star.png";
  profileAvatar="../../../assets/images/avatar.jpg";
  userEmail: string = this.activatedRoute.snapshot.params.email;
  userPosition: number = 0;
  user: User = new User();
  events: Event[] = [];
  attendanceCounter:number=0;

  ErrorMessage:string;
  constructor(private userService: UsersService, private activatedRoute: ActivatedRoute, private eventsService: EventsService, private assistantsService:AssistantsService,  private errorHandlerService:ErrorHandlerService) { }

  ngOnInit(): void {
    this.getUser();
    this.getUserPosition();
    this.getEventsByUser();
    this.countAttendance();
  }

  getUser() {
    this.userService.getUserByEmail(this.userEmail).subscribe((res) => {
      this.user = res;
      console.log(res);
    },
    (error) => {
      
      this.ErrorMessage=error.error;
      this.createModal();

    })
  }

  getUserPosition() {
    this.userService.getUserPosition(this.userEmail).subscribe((position) => {
      this.userPosition = position;
    },
    (error) => {
      
      this.ErrorMessage=error.error;
      this.createModal();

    })
  }

  getEventsByUser() {
    this.eventsService.getEventsByOrganizerDESC(this.userEmail).subscribe((events) => {
      this.events = events;
    },
    (error) => {
      
      this.ErrorMessage=error.error;
      this.createModal();

    })
  }

  countAttendance(){
    this.assistantsService.countAttendance(this.userEmail).subscribe((res)=>{
      
      this.attendanceCounter = res;
    },
    (error) => {
      
      this.ErrorMessage=error.error;
      this.createModal();

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

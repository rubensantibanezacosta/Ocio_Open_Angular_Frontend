import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { EventsService } from 'src/app/services/events.service';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';


import { getDataFromToken } from '../../utils/jwtparser';
import { Event } from 'src/app/models/event';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.scss']
})
export class MyeventsComponent implements OnInit {

  tittle = "Mis Eventos";
  image = "../../../assets/icons/my-event-icon.png";
  star = "../../../assets/icons/big-star.png";
  trash = "../../../assets/icons/trash-icon.png";
  editIcon = "../../../assets/icons/pencil-icon.png";
  plus = "../../../assets/icons/plus-icon-empty.png";
  miniStar = "../../../assets/icons/mini-star.png";
  

  userEmail: string = getDataFromToken().username;
  userPosition: number = 0;
  user: User = new User();
  pastEvents: Event[] = [];
  futureEvents: Event[] = [];

  ErrorMessage:string;

  constructor(private userService: UsersService, private eventService: EventsService,  private errorHandlerService:ErrorHandlerService) { }

  ngOnInit(): void {
    this.getUserByEmail();
    this.getUserPosition();
    this.getPastEventsByUser();
    this.getFutureEventsByUser();
  }

  getUserByEmail() {
    this.userService.getUserByEmail(this.userEmail).subscribe((user) => {
      this.user = user;
    },
    (error) => {
      
      this.ErrorMessage=error.error.message;
      this.createModal();

    })
  }

  getUserPosition() {
    this.userService.getUserPosition(this.userEmail).subscribe((position) => {
      this.userPosition = position;
    },
    (error) => {
      
      this.ErrorMessage=error.error.message;
      this.createModal();

    })
  }

  getFutureEventsByUser() {
    this.eventService.getEventsByOrganizerASC(this.userEmail).subscribe((events) => {
      return this.futureEvents = events.filter((event) => {
        return moment(event.date).isAfter(moment());
      })

    },
    (error) => {
      
      this.ErrorMessage=error.error.message;
      this.createModal();

    });
  }

  getPastEventsByUser() {
    this.eventService.getEventsByOrganizerDESC(this.userEmail).subscribe((events) => {
      return this.pastEvents = events.filter((event) => {
        return moment(event.date).isBefore(moment());
      });
    },
    (error) => {
      
      this.ErrorMessage=error.error.message;
      this.createModal();

    });
  }
//
  deleteEventById(id:number){
    this.eventService.deleteEventById(id).subscribe(
      res=>{return this.getFutureEventsByUser(); },
    (error) => {
      
      this.ErrorMessage=error.error.message;
      this.createModal();

    });
  }
    
  formatDate(date:Date){
    return moment(date).format("DD-MM-YYYY");
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

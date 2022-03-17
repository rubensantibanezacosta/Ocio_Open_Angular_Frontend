import { ConfirmDialogComponent } from './../../components/confirm-dialog/confirm-dialog.component';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { EventsService } from 'src/app/services/events.service';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import { getDataFromToken } from '../../utils/jwtparser';
import { Event } from 'src/app/models/event';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.scss']
})
export class MyeventsComponent implements OnInit {

  userEmail: string = getDataFromToken().username;
  userPosition: number = 0;
  user: User = new User();
  pastEvents: Event[] = [];
  futureEvents: Event[];


  constructor(private userService: UsersService, private eventService: EventsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserByEmail();
    this.getUserPosition();
    this.getPastEventsByUser();
    this.getFutureEventsByUser();
  }

  getUserByEmail() {
    this.userService.getUserByEmail(this.userEmail).subscribe((user) => {
      this.user = user;
    })
  }

  getUserPosition() {
    this.userService.getUserPosition(this.userEmail).subscribe((position) => {
      this.userPosition = position;
    })
  }

  getFutureEventsByUser() {
    this.eventService.getEventsByOrganizerASC(this.userEmail).subscribe((events) => {
      return this.futureEvents = events.filter((event) => {
        return moment(event.date).isAfter(moment());
      })
    });
  }

  getPastEventsByUser() {
    this.eventService.getEventsByOrganizerDESC(this.userEmail).subscribe((events) => {
      return this.pastEvents = events.filter((event) => {
        return moment(event.date).isBefore(moment());
      });
    });
  }
  

  deleteEventById(id: number, title: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      height: '300px',
      data: { title: "Eliminar evento", message: "¿Desea eliminar el evento " + title + "?" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.deleteEventById(id).subscribe(
          res => {
            return this.getFutureEventsByUser();
          });
      }
    })
}

formatDate(date: Date){
  return moment(date).format("DD-MM-YYYY");
}

}

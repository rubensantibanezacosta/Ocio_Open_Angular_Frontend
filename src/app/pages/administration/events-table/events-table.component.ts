import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss']
})

export class EventsTableComponent implements AfterViewInit {
  @Input() refreshEvents: Subject<Event[]> = new Subject<Event[]>();
  @Input() events: Event[];
  displayedColumns: string[] = ['tittle', 'date', 'zone', 'surname'];
  dataSource: MatTableDataSource<Event>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.refreshEvents.subscribe((events) => {
      console.log("suscribed");
      this.events = events;
      this.dataSource = new MatTableDataSource(this.events);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  formatDate(date: Date) {
    return moment(date).format("DD-MM-YY");
  }

  formatDateTime(dateTime: string) {
    return moment(dateTime).format("DD-MM-YY HH:mm");
  }

}


import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import * as moment from 'moment';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements AfterViewInit {
  @Input() refreshUsers: Subject<User[]> = new Subject<User[]>();
  @Input() users: User[];
  displayedColumns: string[] = ['name', 'surname', 'lastconnection', 'createdAt'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.refreshUsers.subscribe((users) => {
      console.log("suscribed");
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
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

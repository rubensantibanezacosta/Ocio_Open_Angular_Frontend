import { AfterViewInit, Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-permissions-table',
  templateUrl: './permissions-table.component.html',
  styleUrls: ['./permissions-table.component.scss']
})
export class PermissionsTableComponent implements AfterViewInit {
  @Input() refreshPermissions: Subject<string> = new Subject<string>();
  @Input() permissions: string[];
  @Input() refreshUserPermissions: Subject<string> = new Subject<string>();
  @Input() userPermissions: string[];
  @Output() editedUserPermissions = new EventEmitter();
  displayedColumns: string[] = ['name', 'exist'];
  dataSource: MatTableDataSource<string>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.refreshPermissions.subscribe((permissions) => {
      this.permissions = permissions.split(',');
      this.dataSource = new MatTableDataSource(this.permissions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    this.refreshUserPermissions.subscribe((userPermissions) => {
      this.userPermissions = userPermissions.split(',');
      this.dataSource = new MatTableDataSource(this.permissions);
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

  checkPermission = (permissionName) => {
    if(this.userPermissions){
    return this.userPermissions.includes(permissionName);
    }
    return false;
  }

  permissionToggle(permissionsName) {
    if (this.userPermissions.includes(permissionsName)) {
      this.userPermissions = this.userPermissions.filter((userPermission) => {
        return userPermission != permissionsName;
      })
      
      this.emitPermissions();
    }
    else {
      this.userPermissions.push(permissionsName);
      
      this.emitPermissions();
    }
  }

  emitPermissions() {
    this.editedUserPermissions.emit(this.userPermissions.toString()
      .replace('{', '').replace('}', ''))
  }

}

import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { PermissionsService } from './../../../services/permissions.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { slideInAnimationModals } from 'src/app/animations/animations';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  animations:[
    slideInAnimationModals,
  ]
})
export class PermissionsComponent implements OnInit {
  permissions: string[];
  userEmail: string = this.activatedRoute.snapshot.params.email;
  user: User;
  permissionsSubject: Subject<string> = new Subject<string>();
  userPermissionsSubject: Subject<string> = new Subject<string>();
  ErrorMessage: string;

  constructor(private permissionsService: PermissionsService, private usersService: UsersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.user) {
      this.getUser();
      this.getListPermissions();
    }
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

  getUser() {
    this.usersService.getUserByEmail(this.userEmail).subscribe((user) => {
      this.user = user;
      this.userPermissionsSubject.next(user.permissions);
    })
  }

  updateUser(event) {
    this.usersService.updateUsersPermissions(event, this.userEmail);
  }

  getListPermissions() {
    this.permissionsService.getAllPermissions().subscribe((res) => {
      this.permissionsSubject.next(res.permissions);
    })
  }

  back() {
    window.history.back();
  }

}
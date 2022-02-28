import { UsersService } from 'src/app/services/users.service';
import { PermissionsService } from './../../../services/permissions.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import * as moment from 'moment';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
checkPermission= (permissionName)=> {
  let checkbox:HTMLInputElement=<HTMLInputElement>document.getElementById(permissionName);
  checkbox.checked=this.user.permissions.split(",").includes(permissionName);
}
  tittle = "Permisos";
  image = "../../../assets/icons/data-icon.png";
  star = "../../../assets/icons/big-star.png";
  profileAvatar = "../../../assets/images/avatar.jpg";
  collapseIcon = "../../../assets/icons/collapse-icon.png";
  permissions: string[];
  @Input() userPosition: number = 0;
  @Input() user: User = new User();
  @Input() attendanceCounter: number = 0;
  @Output() closePermissions = new EventEmitter<boolean>();
  ErrorMessage: string;
  constructor(private permissionsService: PermissionsService, private usersService:UsersService) { }

  ngOnInit(): void {
    this.getListPermissions();
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

  closeModal() {
    this.usersService.updateUsersPermissions(this.user.permissions, this.user.email).subscribe(
      res=>this.closePermissions.emit(false),
      error=>this.closePermissions.emit(false));
  }

  getListPermissions() {
    this.permissionsService.getAllPermissions().subscribe((res) => {
      this.permissions = res.permissions.split(",");

    }),
      error => console.error(error);
  }



  tooglePermission(name, target) {
    console.log(this.user.permissions)
    if (target.checked == true) {
      this.user.permissions += "," + name;
      if (this.user.permissions[0] == ",") {
        this.user.permissions = this.user.permissions.substring(1);
      }
    } else {
      this.user.permissions =
        this.user.permissions.split(",").filter((line) => {
          return line != name
        })
          .toString()
          .replace("{", "").replace("}", "")
    }
  }
}
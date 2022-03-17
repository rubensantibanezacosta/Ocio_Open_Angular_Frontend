import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { getDataFromToken } from 'src/app/utils/jwtparser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() userEmail: string = getDataFromToken().username;
  userPosition: number = 0;
  user: User = new User();

  profileAvatar = "../../../assets/images/avatar.jpg";


  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getUserByEmail();
    this.getUserPosition();
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

}

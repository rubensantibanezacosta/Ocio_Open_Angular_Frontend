import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UsersService } from 'src/app/services/users.service';
import { getDataFromToken } from 'src/app/utils/jwtparser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userEmail: string = getDataFromToken().username;
  userPosition: number = 0;
  user: User = new User();

  star = "../../../assets/icons/big-star.png";
  trash = "../../../assets/icons/trash-icon.png";
  editIcon = "../../../assets/icons/pencil-icon.png";
  plus = "../../../assets/icons/plus-icon-empty.png";
  miniStar = "../../../assets/icons/mini-star.png";
  profileAvatar = "../../../assets/images/avatar.jpg";

  ErrorMessage:string;
  
  constructor(private userService: UsersService, private errorHandlerService:ErrorHandlerService) { }

  ngOnInit(): void {
    this.getUserByEmail();
    this.getUserPosition();
  }
  getUserByEmail() {
    this.userService.getUserByEmail(this.userEmail).subscribe((user) => {
      this.user = user;
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

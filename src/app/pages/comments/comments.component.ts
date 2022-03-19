import { Client, IFrame } from '@stomp/stompjs';
import { WebSocketService } from './../../services/web-socket.service';
import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { getDataFromToken } from 'src/app/utils/jwtparser';
import { Comment } from '../../models/comment';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { slideInAnimationModals } from 'src/app/animations/animations';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations:[
    slideInAnimationModals,
  ]
})
export class CommentsComponent implements OnInit, OnDestroy {
  event_id: number = this.activatedRoute.snapshot.params.event_id;
  userEmail: string = getDataFromToken().username;
  image = '../../../assets/icons/comments-icon.png';
  tittle: string = "Comentarios";
  xIcon = "../../../assets/icons/x-icon.png";
  checkIcon = "../../../assets/icons/check-icon.png";
  textComment: string = "";


  comments: Comment[] = [];

  constructor(private activatedRoute: ActivatedRoute, private commentsService: CommentsService, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.client.connect({}, () => { });
    if (!this.comments[0]) {
      /* this.webSocketService */
      this.getCommentsByEvent().then(() => {


      });
      if (this.webSocketService.client.connected) {

        this.webSocketService.client.subscribe(`/comments-chat/${this.event_id}`, (frame) => {
          let comment: Comment = JSON.parse(frame.body) as Comment;
          comment ? this.comments.push(comment) : null;
          setTimeout(() => {
            let mainContainer = document.querySelector(".main-comments");
            mainContainer.scrollTop = mainContainer.scrollHeight + 300000000;
          }, 200);
        })

        this.webSocketService.client.subscribe(`/comments-chat/delete_${this.event_id}`, (frame) => {
          let deleteindex: number = JSON.parse(frame.body) as number;
          deleteindex ? this.comments.splice(deleteindex, 1) : null;
          deleteindex == 0 ? this.comments = [] : null;

        })
      } else {
        this.webSocketService.client.onConnect = ((frame: IFrame) => {
          this.webSocketService.client.subscribe(`/comments-chat/${this.event_id}`, (frame) => {
            let comment: Comment = JSON.parse(frame.body) as Comment;
            comment ? this.comments.push(comment) : null;
            setTimeout(() => {
              let mainContainer = document.querySelector(".main-comments");
              mainContainer.scrollTop = mainContainer.scrollHeight + 300000000;
            }, 200);
          })

          this.webSocketService.client.subscribe(`/comments-chat/delete_${this.event_id}`, (frame) => {
            let deleteindex: number = JSON.parse(frame.body) as number;
            deleteindex ? this.comments.splice(deleteindex, 1) : null;
            deleteindex == 0 ? this.comments = [] : null;
          })
        })
      }
    }
  }

  ngOnDestroy() {
    this.webSocketService.client.unsubscribe(`/comments-chat/delete_${this.event_id}`);
    this.webSocketService.client.unsubscribe(`/comments-chat/${this.event_id}`);
  }

  back() {
    window.history.back();
  }

  async getCommentsByEvent() {
    return this.commentsService.getCommentsByEvent(this.event_id).subscribe((comments) => {
      this.comments = comments;
      setTimeout(() => {
        let mainContainer = document.querySelector(".main-comments");
        mainContainer.scrollTop = mainContainer.scrollHeight + 300000000;
      }, 200);
    })
  }

  createComment(text: string) {
    let comment: Comment = new Comment()
    comment.assistant = this.userEmail;
    comment.event_id = this.event_id;
    comment.comment = text;
    this.webSocketService.client.publish({ destination: "/app/message", body: JSON.stringify(comment) })
    this.textComment = "";
    this.ngOnInit();
  }

  keyDownFunction(event, text: string) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.createComment(text);
    }
  }

  deleteComment(comment_id: number, index) {
    const commentToDelete = {
      id: comment_id,
      index: index
    }
    this.webSocketService.client.publish({ destination: "/app/message_delete", body: JSON.stringify(commentToDelete) })
  }

  formatTime = (date: Date) => { return moment(date).format("DD.MM.YY HH:mm") }

}

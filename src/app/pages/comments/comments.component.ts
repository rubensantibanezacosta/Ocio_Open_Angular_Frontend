import { Client, IFrame } from '@stomp/stompjs';
import { WebSocketService } from './../../services/web-socket.service';
import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { getDataFromToken } from 'src/app/utils/jwtparser';
import { Comment } from '../../models/comment';
import * as moment from 'moment';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  event_id: number = this.activatedRoute.snapshot.params.event_id;
  userEmail: string = getDataFromToken().username;
  image = '../../../assets/icons/comments-icon.png';
  tittle: string = "Comentarios";
  xIcon = "../../../assets/icons/x-icon.png";
  checkIcon = "../../../assets/icons/check-icon.png";
  textComment: string = "";

  ErrorMessage: string;

  comments: Comment[] = [];

  constructor(private activatedRoute: ActivatedRoute, private commentsService: CommentsService, private errorHandlerService: ErrorHandlerService, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.client.activate();
    if (!this.comments[0]) {
      /* this.webSocketService */
      this.getCommentsByEvent().then(() => {

        setTimeout(() => {
          let mainContainer = document.querySelector(".main");
          mainContainer.scrollTop = mainContainer.scrollHeight;
        }, 500);
      });
      if (this.webSocketService.client.connected) {

        this.webSocketService.client.subscribe(`/comments-chat/${this.event_id}`, (frame) => {
          let comment: Comment = JSON.parse(frame.body) as Comment;
          comment ? this.comments.push(comment) : null;
          setTimeout(() => {
            let mainContainer = document.querySelector(".main");
            mainContainer.scrollTop = mainContainer.scrollHeight;
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
              let mainContainer = document.querySelector(".main");
              mainContainer.scrollTop = mainContainer.scrollHeight;
            }, 200);
          })

          this.webSocketService.client.subscribe(`/comments-chat/delete_${this.event_id}`, (frame) => {
            let deleteindex: number = JSON.parse(frame.body) as number;
            deleteindex ? this.comments.splice(deleteindex, 1) : null;
            deleteindex == 0 ? this.comments = [] : null;
          })
        })
      }







      /* this.webSocketService.io.on(this.event_id.toString(), (comment) => {
         console.log(comment)
         comment?this.comments.unshift(comment):null;
       })
       this.webSocketService.io.on(this.event_id.toString()+"_delete", (deleteindex) => {
         deleteindex?this.comments.splice(deleteindex, 1):null;
       })*/
    }
  }


  ngOnDestroy() {
    this.webSocketService.client.unsubscribe(`/comments-chat/delete_${this.event_id}`);
  }

  async getCommentsByEvent() {
    return this.commentsService.getCommentsByEvent(this.event_id).subscribe((comments) => {
      this.comments = comments;


      /* this.connectSocket(this.event_id);   */
    },
      (error) => {
        this.ErrorMessage = error.error;
        this.createModal();

      })
  }

  createComment(text: string) {
    let comment: Comment = new Comment()
    comment.assistant = this.userEmail;
    comment.event_id = this.event_id;
    comment.comment = text;
    this.webSocketService.client.publish({ destination: "/app/message", body: JSON.stringify(comment) })
    this.textComment = "";
    this.ngOnInit()


  }
  keyDownFunction(event, text: string) {
    if (event.code === 'Enter') {
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

  formatTime = (date: Date) => { return moment(date).format("DD.MM.YY HH:mm:ss") }

  //Error handler modals
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;


  createModal() {
    this.sub = this.errorHandlerService
      .openModal(this.entry, 'ERROR', this.ErrorMessage)
      .subscribe((v) => {
        //your logic
      });
  }

}

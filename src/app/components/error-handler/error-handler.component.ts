import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss']
})
export class ErrorHandlerComponent implements OnInit, OnDestroy {

  @Input() message;
  visibility:boolean=false;

  errorIcon="../../../assets/icons/error-icon.png";
  closeIcon="../../../assets/icons/x-square.png";
  constructor() { }
 
  title: string = 'Error';
  @Input() body: string = '';
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  ngOnInit(): void {
  }

  closeMe() {
    this.closeMeEvent.emit();
  }
  confirm() {
    this.confirmEvent.emit();
  } 

 ngOnDestroy(): void {
  }
}

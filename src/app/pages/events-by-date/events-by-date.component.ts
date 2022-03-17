import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { slideInAnimationModals } from 'src/app/animations/animations';

@Component({
  selector: 'app-events-by-date',
  templateUrl: './events-by-date.component.html',
  styleUrls: ['./events-by-date.component.scss'],
  animations:[
    slideInAnimationModals
  ]
})
export class EventsByDateComponent {
date:Date=new Date(moment("20"+this.activatedRoute.snapshot.params.date).format());

  constructor(private activatedRoute:ActivatedRoute) { }

  back(){
    window.history.back();
  }

  formatDate = (date) => { return moment(date).locale("es").format("D [de] MMMM") };
  formatTime = (date) => { return moment(date).format("HH:mm") }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-events-by-date',
  templateUrl: './events-by-date.component.html',
  styleUrls: ['./events-by-date.component.scss']
})
export class EventsByDateComponent implements OnInit {
date:Date=new Date(moment("20"+this.activatedRoute.snapshot.params.date).format());
tittle:string=""+(moment(this.date).locale("es").format("D [de] MMMM [del] YYYY"));
image="../../../assets/icons/calendarIcon-menu.png";


  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

}

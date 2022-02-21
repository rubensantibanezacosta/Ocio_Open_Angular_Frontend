import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import {Event} from "../../models/event";
import * as moment from 'moment';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  tittle: string = "Calendario";
  image = "../../../assets/icons/calendarIcon-menu.png";
  previousIcon="../../../assets/icons/previous-icon.png";
  nextIcon="../../../assets/icons/next-icon.png";

  week: any = [
    "Lun",
    "Mar",
    "Mié",
    "Jué",
    "Vié",
    "Sab",
    "Dom"
  ]

  monthSelected: any[];
  dateSelected: any;


  events:Event[];


  ErrorMessage: string;

  constructor(private errorHandlerService: ErrorHandlerService, private eventsService:EventsService) { }

  ngOnInit(): void {
    this.getAllEvents().then(()=>{
      this.getDaysFromDate(moment().format("M"), moment().format("YYYY"));
    });
    
    
  }

  async getAllEvents(){
    this.eventsService.getAllEventsASC().subscribe((events)=>{
      this.events=events;
    },
    (error) => {

      this.ErrorMessage=error.error;
      this.createModal();

    })
    
  }



getDaysFromDate(month, year) {

    const startDay = moment.utc(`${year}/${month}/01`);
    const endDay = startDay.clone().endOf('month');
    this.dateSelected = startDay;
    const diffDays = endDay.diff(startDay, 'days', true);
    const numberDays = Math.round(diffDays);

    let arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.locale("ES").format('dddd'),
        value: a,
        indexWeek: dayObject.isoWeekday(),
      };
    })
    this.monthSelected = arrayDays;
  }


  dateSelectedFormatLocale() {
    return moment(this.dateSelected).locale("es").format("MMMM [del] yyyy")
  }

  changueMonth(flag) {
    if (flag < 0) {
      const nextDate = this.dateSelected.clone().subtract(1, 'month');
      this.getDaysFromDate(moment(nextDate).locale("es").format("MM"), moment(nextDate).locale("es").format("YYYY"))
    } else {
      const nextDate = this.dateSelected.clone().add(1, 'month');
      this.getDaysFromDate(moment(nextDate).locale("es").format("MM"), moment(nextDate).locale("es").format("YYYY"))
    }
  }
  
  selectDay(day){
    const dateSelected = moment(moment(this.dateSelected).format("YYYY-M")+"-"+day.value).format()
    
  }

formatDate(day){
  return moment(moment(this.dateSelected).format("YYYY-M")+"-"+day.value).format("YY-M-D");
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

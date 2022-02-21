import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as MyEvent from 'src/app/models/event';
import { getDataFromToken } from 'src/app/utils/jwtparser';
import * as moment from 'moment';
import { ImagesService } from 'src/app/services/images.service';
import { EventsService } from 'src/app/services/events.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  image = "../../../assets/icons/my-event-icon.png";

  userEmail: string = getDataFromToken().username;
  event_id: number = this.activatedRoute.snapshot.params.event_id;
  type: string = this.activatedRoute.snapshot.params.type;
  tittle = this.type == "new" ? "Nuevo evento" : "Editar evento";
  minDate: string = moment().add(2, "hour").locale("es").format("YYYY-MM-DD[T]hh:mm");


  galeryIcon = "../../../assets/icons/galery-icon.png";
  fileIcon = "../../../assets/icons/file-icon.png";

  myEvent: MyEvent.Event = new MyEvent.Event();
  imageSrc: string | ArrayBuffer;
  file: File;

  imageFormVisible: boolean = false;
  galleryVisible: boolean = false;
  dateinputVisible: boolean = false;

  ErrorMessage:string;


  constructor(private activatedRoute: ActivatedRoute, private imagesService: ImagesService, private eventsService: EventsService, private router: Router,  private errorHandlerService:ErrorHandlerService) { }

  ngOnInit(): void {
    this.myEvent.zone = "GC";
    this.getEventToEdit();
    this.validateDate();
  }

  validateDate() {
    this.type != "new" ? this.dateinputVisible = false : this.dateinputVisible = true;
  }

  submit() {
    
    if(this.type == "new"){
    this.eventsService.createEvent(this.myEvent).subscribe(
      (res) => {window.history.back()},
    (error) => {
      
      this.ErrorMessage=error.error;
      this.createModal();

    })
  }else{
      this.eventsService.updateEvent(this.myEvent).subscribe(
        res => {
        window.history.back()
      },
      (error) => {
        
        this.ErrorMessage=error.error;
        this.createModal();
  
      });
    }
  }

  async getEventToEdit() {
    if (this.type != "new") {
      this.eventsService.getEventById(this.event_id).subscribe(res => {
        return this.myEvent = res
      },
      (error) => {
        
        this.ErrorMessage=error.error;
        this.createModal();
  
      })
    }
  }
  onPhotoSelected(event: any): void {

    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.file);
    }
  }
  uploadImage(): boolean {
    this.imagesService.createImage(this.file).subscribe((res) => {
      this.hideImageForm();
      this.myEvent.image_id = res[0].id;
    },
    (error) => {
      
      this.ErrorMessage=error.error;
      this.createModal();

    })

    return false;
  }

  showImageForm() {
    this.imageFormVisible = true;
  }

  hideImageForm() {
    this.file = undefined;
    this.imageSrc = undefined;
    this.imageFormVisible = false;
  }

  showGallery() {
    this.galleryVisible = true;
  }

  hideGallery() {
    this.myEvent.image_id;
    this.galleryVisible = false;
  }

  getId(e) {
    this.myEvent.image_id = e;
    this.hideGallery();
  }

  zoneSelected() {
    switch (this.myEvent.zone) {
      case "TNF":
        return "Tenerife";
        break;
      case "GC":
        return "Gran Canaria";
        break;
      case "VIRTUAL":
        return "Virtual";
        break;
      default:
        return "";
        break;
    }
  }

  setVisibleDate() {
    return this.dateinputVisible = true;
  }

  formatDate(date: Date) {
    return moment(date).format("DD-MM-YYYY hh:mm")
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

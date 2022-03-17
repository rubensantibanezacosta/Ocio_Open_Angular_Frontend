import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as MyEvent from 'src/app/models/event';
import { getDataFromToken } from 'src/app/utils/jwtparser';
import * as moment from 'moment';
import { ImagesService } from 'src/app/services/images.service';
import { EventsService } from 'src/app/services/events.service';
import { Subject, Subscription } from 'rxjs';
import { GalleryComponent } from 'src/app/components/gallery/gallery.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { slideInAnimationModals } from 'src/app/animations/animations';

@Component({
  selector: 'app-events-administration',
  templateUrl: './events-administration.component.html',
  styleUrls: ['./events-administration.component.scss'],
  animations:[
    slideInAnimationModals
  ]
})
export class EventsAdministrationComponent implements OnInit {
  image = "../../../assets/icons/data-icon.png";
  tittle = "Administration";

  userEmail: string = getDataFromToken().username;
  event_id: number = this.activatedRoute.snapshot.params.event_id;

  minDate: string = moment().add(2, "hour").locale("es").format("YYYY-MM-DD[T]hh:mm");

  galeryIcon = "../../../assets/icons/galery-icon.png";
  fileIcon = "../../../assets/icons/file-icon.png";

  myEvent: MyEvent.Event = new MyEvent.Event();
  imageSrc: string | ArrayBuffer;
  file: File;

  imageFormVisible: boolean = false;
  galleryVisible: boolean = false;
  dateinputVisible: boolean = false;
  subjectImage = new Subject<number>();
  ErrorMessage: string;

  constructor(private activatedRoute: ActivatedRoute, private imagesService: ImagesService, private eventsService: EventsService, private router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getEventToEdit();
  }

  validateDate() {
    this.dateinputVisible = true;
  }

  submit() {
    this.eventsService.updateEventAdmin(this.myEvent).subscribe(res => {
      this._snackBar.open(`Has creado el evento ${this.myEvent.tittle}`, `Cerrar`, {
        duration: 5000,
        
      })
      window.history.back()
    },
    )
  }

  deleteEventAdmin(event_id: number) {
    this.eventsService.deleteEventByIdAdmin(this.event_id).subscribe(res => {
      window.history.back();
    })
  }

  async getEventToEdit() {
    this.eventsService.getEventById(this.event_id).subscribe((res) => {
      this.myEvent = res;
      this.subjectImage.next(this.myEvent.event_id);
    }
    )
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
      this._snackBar.open(`Imagen cargada con éxito ${this.myEvent.tittle}`, `Cerrar`,{
        duration: 5000,
         
      })
      this.hideImageForm();
      this.myEvent.image_id = res.id;
      this.subjectImage.next(this.myEvent.event_id);
    }
    )
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
    const dialogRef = this.dialog.open(GalleryComponent, {
      height: '80vh',
      width: '100vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.myEvent.image_id = result;
      }
    });
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

  back() {
    window.history.back();
  }
}

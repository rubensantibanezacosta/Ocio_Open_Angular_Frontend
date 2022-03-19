import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as MyEvent from 'src/app/models/event';
import { getDataFromToken } from 'src/app/utils/jwtparser';
import * as moment from 'moment';
import { ImagesService } from 'src/app/services/images.service';
import { EventsService } from 'src/app/services/events.service';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GalleryComponent } from 'src/app/components/gallery/gallery.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { slideInAnimationModals } from 'src/app/animations/animations';




@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  animations: [
    slideInAnimationModals
  ]
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

  subjectImage = new Subject<number>();
  ErrorMessage: string;


  constructor(private activatedRoute: ActivatedRoute, private imagesService: ImagesService, private eventsService: EventsService, private router: Router,
    public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    /* this.myEvent.zone = "GC"; */
    this.getEventToEdit();
    this.validateDate();

  }

  validateDate() {
    this.type != "new" ? this.dateinputVisible = false : this.dateinputVisible = true;
  }

  submit() {
    if (this.type == "new") {
      this.eventsService.createEvent(this.myEvent).subscribe(
        (res) => {
          this._snackBar.open(`Has creado el evento ${this.myEvent.tittle}`, `Cerrar`, {
            duration: 5000,

          })
          window.history.back()
        },
      )
    } else {
      this.eventsService.updateEvent(this.myEvent).subscribe(
        res => {
          this._snackBar.open(`Has modificado el evento ${this.myEvent.tittle}`, `Cerrar`, {
            duration: 3000,
            horizontalPosition: "center",
            verticalPosition: "top",
          })
          window.history.back()
        },
      );
    }
  }

  async getEventToEdit() {
    if (this.type != "new") {
      if (this.myEvent.image_id == null) {
        this.eventsService.getEventById(this.event_id).subscribe(res => {
          this.myEvent = res;
          this.subjectImage.next(this.myEvent.event_id);
        })
      }
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

  uploadImage() {
    this.imagesService.createImage(this.file).subscribe((res) => {
      this.hideImageForm();
      this.myEvent.image_id = res.id;
      this.ngOnInit();
      this.subjectImage.next(this.myEvent.image_id);
    },
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

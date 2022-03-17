
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { Image } from 'src/app/models/image';
import { ImagesService } from 'src/app/services/images.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('filter', [
      state("inactive", style({
        display: "none"
      })),
      state("active", style({ display: "block" })),
    ])

  ]
})
export class GalleryComponent implements OnInit {

  tittle = "Galeria";
  images: Image[] = [];
  bearerToken = localStorage.getItem("ocioToken");
  @Output() imageSelected = new EventEmitter<number>();
  subjectImage = new Subject<number>();


  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.getAllUrls();
  }

  getAllUrls() {
    this.imagesService.getAllImages().subscribe((data) => {
      this.images = data;
    });
  }

  selectImage(id: number) {
    this.imageSelected.emit(id);
  }

}


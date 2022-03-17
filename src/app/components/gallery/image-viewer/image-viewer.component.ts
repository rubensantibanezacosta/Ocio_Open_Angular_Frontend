import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  @Input() resetFormSubject: Subject<number> = new Subject<number>();
  @Input() imageId:number;
  downloaded: File;
  src: string | ArrayBuffer = "";
  bearerToken = localStorage.getItem("ocioToken");


  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.getImage();
    this.resetFormSubject.subscribe((id)=>{
      this.imageId=id;
      this.getImage();
    })
  }

  getImage() {
    return this.imagesService.getImageById(this.imageId).subscribe((data) => {
      this.downloaded = new File([data], "filename", { type: "image/jpg" });
      return this.createImageFromBlob(this.downloaded);
    })
  }

  createImageFromBlob(image: any) {
    let reader = new FileReader();
    reader.addEventListener("load", async () => {
      this.src = reader.result;
    },false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

}

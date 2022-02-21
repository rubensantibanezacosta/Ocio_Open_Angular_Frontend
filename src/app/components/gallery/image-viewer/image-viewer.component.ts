import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  @Input() imageId:number;
  downloaded: File;
  src: string | ArrayBuffer = "";
  bearerToken = localStorage.getItem("ocioToken");
  spinner="../../../../assets/loaders/Spinner.gif";
  loaded=false;

  ErrorMessage:string;
  constructor(private imagesService: ImagesService,  private errorHandlerService:ErrorHandlerService) { }

  ngOnInit(): void {
    this.getImage();
  }


  getImage() {
    return this.imagesService.getImageById(this.imageId).subscribe((data) => {
      this.downloaded = new File([data], "filename", { type: "image/jpg" });
      return this.createImageFromBlob(this.downloaded);
    },
    (error) => {
      this.ErrorMessage=error.error.message;
      this.createModal();

    })
  }


  createImageFromBlob(image: any) {
    let reader = new FileReader();
    reader.addEventListener("load", async () => {
      this.src = reader.result;
      this.loaded=true;
    },false);
    if (image) {
      reader.readAsDataURL(image);
    }
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

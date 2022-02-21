import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VariablesService } from 'src/config/config';
import { Image } from '../models/image';



@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  variables = this.variablesService.getVariables();
  endpoint = this.variablesService.variables.host + '/api/images';
  bearerToken = localStorage.getItem("ocioToken");

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`,
    }
    )
  };

  httpOptionsImage = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
    }
    ),
  };

  httpOptionsPostImage = {
    headers: new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Authorization': `Bearer ${this.bearerToken}`,
    }
    ),
  };


  constructor(private httpClient: HttpClient, private variablesService: VariablesService) { }

  getAllImages(): Observable<Image[]> {
    return this.httpClient.get<Image[]>(this.endpoint, this.httpOptions)
  }

  getImageById(id: number) {
    return this.httpClient.get(this.endpoint + "/" + id, { ...this.httpOptionsImage, responseType: 'blob' })
  }

  deleteImageById(id: number): Observable<string> {
    return this.httpClient.delete<string>(this.endpoint + "/" + id, this.httpOptions)
  }

  createImage(image: File) {
    const fd = new FormData();
    fd.append('uploadedImage', image);
    return this.httpClient.post(this.endpoint, fd, this.httpOptionsPostImage);
  }
}

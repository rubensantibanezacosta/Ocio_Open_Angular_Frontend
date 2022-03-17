import { Component } from '@angular/core';
import { slideInAnimationModals } from 'src/app/animations/animations';


@Component({
  selector: 'app-finalizedevents',
  templateUrl: './finalizedevents.component.html',
  styleUrls: ['./finalizedevents.component.scss'],
  animations:[
    slideInAnimationModals
  ]
})
export class FinalizedeventsComponent {
}

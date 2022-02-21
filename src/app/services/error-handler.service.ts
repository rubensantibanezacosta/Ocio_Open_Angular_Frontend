import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorHandlerComponent } from '../components/error-handler/error-handler.component';

@Injectable({
  providedIn: 'root'
})


export class ErrorHandlerService {
  private componentRef!: ComponentRef<ErrorHandlerComponent>;
  private componentSubscriber!: Subject<string>;
  constructor(private resolver: ComponentFactoryResolver) { }

  openModal(entry: ViewContainerRef, modalTitle: string, modalBody: string) {
    let factory = this.resolver.resolveComponentFactory(ErrorHandlerComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.title = modalTitle;
    this.componentRef.instance.body = modalBody;
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe(() => this.confirm());
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeModal();
  }
}

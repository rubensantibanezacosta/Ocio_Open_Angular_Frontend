import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAdministrationComponent } from './events-administration.component';

describe('EventsAdministrationComponent', () => {
  let component: EventsAdministrationComponent;
  let fixture: ComponentFixture<EventsAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsAdministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

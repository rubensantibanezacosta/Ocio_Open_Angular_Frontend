import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsByDateComponent } from './events-by-date.component';

describe('EventsByDateComponent', () => {
  let component: EventsByDateComponent;
  let fixture: ComponentFixture<EventsByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

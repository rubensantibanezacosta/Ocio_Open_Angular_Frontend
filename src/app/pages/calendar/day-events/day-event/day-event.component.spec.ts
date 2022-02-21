import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayEventComponent } from './day-event.component';

describe('DayEventComponent', () => {
  let component: DayEventComponent;
  let fixture: ComponentFixture<DayEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

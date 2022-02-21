import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizedeventsComponent } from './finalizedevents.component';

describe('FinalizedeventsComponent', () => {
  let component: FinalizedeventsComponent;
  let fixture: ComponentFixture<FinalizedeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizedeventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizedeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcuseDialogComponent } from './excuse-dialog.component';

describe('ExcuseDialogComponent', () => {
  let component: ExcuseDialogComponent;
  let fixture: ComponentFixture<ExcuseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcuseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcuseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

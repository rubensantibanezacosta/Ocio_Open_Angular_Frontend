import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdministrationComponent } from './profile-administration.component';

describe('ProfileAdministrationComponent', () => {
  let component: ProfileAdministrationComponent;
  let fixture: ComponentFixture<ProfileAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAdministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

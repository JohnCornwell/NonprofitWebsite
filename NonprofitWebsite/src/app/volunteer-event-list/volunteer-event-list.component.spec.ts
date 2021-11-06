import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerEventListComponent } from './volunteer-event-list.component';

describe('VolunteerEventListComponent', () => {
  let component: VolunteerEventListComponent;
  let fixture: ComponentFixture<VolunteerEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerEventListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

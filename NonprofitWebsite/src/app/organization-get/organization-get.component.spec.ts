import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationGetComponent } from './organization-get.component';

describe('OrganizationGetComponent', () => {
  let component: OrganizationGetComponent;
  let fixture: ComponentFixture<OrganizationGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

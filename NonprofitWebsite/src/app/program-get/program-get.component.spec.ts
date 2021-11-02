import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramGetComponent } from './program-get.component';

describe('ProgramGetComponent', () => {
  let component: ProgramGetComponent;
  let fixture: ComponentFixture<ProgramGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

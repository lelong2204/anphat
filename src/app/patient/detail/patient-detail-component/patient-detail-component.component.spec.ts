import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailComponentComponent } from './patient-detail-component.component';

describe('PatientDetailComponentComponent', () => {
  let component: PatientDetailComponentComponent;
  let fixture: ComponentFixture<PatientDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDetailComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

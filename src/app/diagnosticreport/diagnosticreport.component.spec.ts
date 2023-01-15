import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticreportComponent } from './diagnosticreport.component';

describe('DiagnosticreportComponent', () => {
  let component: DiagnosticreportComponent;
  let fixture: ComponentFixture<DiagnosticreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

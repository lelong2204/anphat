import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagingStudyComponent } from './imaging-study.component';

describe('ImagingStudyComponent', () => {
  let component: ImagingStudyComponent;
  let fixture: ComponentFixture<ImagingStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagingStudyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagingStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

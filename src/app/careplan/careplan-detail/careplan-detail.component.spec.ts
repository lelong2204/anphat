import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareplanDetailComponent } from './careplan-detail.component';

describe('CareplanDetailComponent', () => {
  let component: CareplanDetailComponent;
  let fixture: ComponentFixture<CareplanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareplanDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareplanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareplanComponent } from './careplan.component';

describe('CareplanComponent', () => {
  let component: CareplanComponent;
  let fixture: ComponentFixture<CareplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

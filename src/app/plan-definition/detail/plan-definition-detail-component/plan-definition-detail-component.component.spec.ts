import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDefinitionDetailComponentComponent } from './plan-definition-detail-component.component';

describe('PlanDefinitionDetailComponentComponent', () => {
  let component: PlanDefinitionDetailComponentComponent;
  let fixture: ComponentFixture<PlanDefinitionDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanDefinitionDetailComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDefinitionDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

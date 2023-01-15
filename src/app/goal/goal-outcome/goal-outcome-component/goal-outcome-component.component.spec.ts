import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalOutcomeComponentComponent } from './goal-outcome-component.component';

describe('GoalOutcomeComponentComponent', () => {
  let component: GoalOutcomeComponentComponent;
  let fixture: ComponentFixture<GoalOutcomeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalOutcomeComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalOutcomeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

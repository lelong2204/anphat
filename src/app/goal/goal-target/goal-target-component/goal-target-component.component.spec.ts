import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalTargetComponentComponent } from './goal-target-component.component';

describe('GoalTargetComponentComponent', () => {
  let component: GoalTargetComponentComponent;
  let fixture: ComponentFixture<GoalTargetComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalTargetComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalTargetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

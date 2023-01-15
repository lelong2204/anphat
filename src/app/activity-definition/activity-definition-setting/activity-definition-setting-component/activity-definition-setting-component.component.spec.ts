/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActivityDefinitionSettingComponentComponent } from './activity-definition-setting-component.component';

describe('ActivityDefinitionSettingComponentComponent', () => {
  let component: ActivityDefinitionSettingComponentComponent;
  let fixture: ComponentFixture<ActivityDefinitionSettingComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDefinitionSettingComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDefinitionSettingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

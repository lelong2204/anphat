/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TelecomElementComponent } from './telecom-element.component';

describe('TelecomElementComponent', () => {
  let component: TelecomElementComponent;
  let fixture: ComponentFixture<TelecomElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelecomElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelecomElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

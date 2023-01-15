/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContactElementComponent } from './contact-element.component';

describe('ContactElementComponent', () => {
  let component: ContactElementComponent;
  let fixture: ComponentFixture<ContactElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

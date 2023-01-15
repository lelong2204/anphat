/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DesignationElementComponent } from './designation-element.component';

describe('DesignationElementComponent', () => {
  let component: DesignationElementComponent;
  let fixture: ComponentFixture<DesignationElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

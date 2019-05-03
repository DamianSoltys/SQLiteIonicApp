import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTelComponent } from './edit-tel.component';

describe('EditTelComponent', () => {
  let component: EditTelComponent;
  let fixture: ComponentFixture<EditTelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTelComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

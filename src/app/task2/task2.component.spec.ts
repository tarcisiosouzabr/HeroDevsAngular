import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Task2Component } from './task2.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Task2Component', () => {
  let component: Task2Component;
  let fixture: ComponentFixture<Task2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Task2Component, RouterTestingModule]
    });
    fixture = TestBed.createComponent(Task2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require a valid text', () => {
    component.myForm.setValue({
      id: 1,
      text: '',
      completed:false,
      category:{}
    });
    expect(component.myForm.valid).toEqual(false);
  });

  it('should require a text longer than 2', () => {
    component.myForm.setValue({
      id: 1,
      text: 'a',
      completed:false,
      category:{}
    });
    expect(component.myForm.valid).toEqual(false);
  });

  it('should be valid', () => {
    component.myForm.setValue({
      id: 1,
      text: 'Task One',
      completed:false,
      category:{}
    });
    expect(component.myForm.valid).toEqual(true);
  });
});

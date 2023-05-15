import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Task3Component } from './task3.component';

describe('Task3Component', () => {
  let component: Task3Component;
  let fixture: ComponentFixture<Task3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Task3Component]
    });
    fixture = TestBed.createComponent(Task3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require a valid text', () => {
    component.myForm.setValue({
      id: 1,
      name: ''
    });
    expect(component.myForm.valid).toEqual(false);
  });

  it('should be valid', () => {
    component.myForm.setValue({
      id: 1,
      name: 'Category Name'
    });
    expect(component.myForm.valid).toEqual(true);
  });
});

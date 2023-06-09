import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Task1Component } from './task1.component';

describe('Task1Component', () => {
  let component: Task1Component;
  let fixture: ComponentFixture<Task1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Task1Component],
    });
    fixture = TestBed.createComponent(Task1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require a valid text', () => {
    component.myForm.setValue({
      text: '',
      category : {}
    });
    expect(component.myForm.valid).toEqual(false);
  });

  it('should require a text longer than 2', () => {
    component.myForm.setValue({
      text: 'a',
      category : {}
    });
    expect(component.myForm.valid).toEqual(false);
  });

  it('should be valid', () => {
    component.myForm.setValue({
      text: 'Simple Task',
      category : {}
    });
    expect(component.myForm.valid).toEqual(true);
  });

  it('should add to dataService', (done) => {
    component.myForm.setValue({
      text: 'Simple Task',
      category : {}
    });
    component.onSubmit();

    component.data.subscribe((value) => {
      expect(value?.length).toBe(1);
      done();
    });
  });
});

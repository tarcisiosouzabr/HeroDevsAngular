import { TestBed } from '@angular/core/testing';
import { DataService, Todo } from './data.service';
import { Category, CategoryService } from './category.service';

describe('DataService', () => {
  let service: DataService;
  let categoryService : CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, CategoryService],
    });
    service = TestBed.inject(DataService);
    categoryService = TestBed.inject(CategoryService);
    service.resetData();
    categoryService.resetData();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should add', (done) => {
    service.add({text: 'Task One', completed: false });

    service.getData().subscribe((values) =>{
      expect(values.length).toBe(1);
      done();
    });    
  });

  it('should update', (done) => {
    service.add({text: 'Task One', completed: false });
    let updatedTask : Todo = {
      id : 1,
      category : undefined,
      completed : true,
      text : "Task One Updated"
    };
    service.update(updatedTask);

    service.getDataById(1).subscribe((task) =>{
      expect(task?.text).toEqual(updatedTask.text);
      expect(task?.completed).toEqual(updatedTask.completed);
      done();
    });    
  });

  it('should delete', (done) => {
    service.add({text: 'Task For Delete', completed: false });
    service.remove(1);
    service.getData().subscribe((values) =>{
      expect(values.length).toBe(0);
      done();
    });
  });

  it('should delete the last category as well', (done) => {
    let category : Category = {
      id : 1,
      name : "Category One"
    };
    categoryService.add(category);
    service.add({text: 'Task For Delete', completed: false, category : category });
    service.remove(1);
    service.getData().subscribe((values) =>{
      expect(values.length).toBe(0);
    });
    categoryService.getData().subscribe((values) =>{
      expect(values.length).toBe(0);
    });
    done();
  });

  it('should not delete the category if it is not the last', (done) => {
    let category : Category = {
      id : 1,
      name : "Category One"
    };
    categoryService.add(category);
    service.add({text: 'Task For Delete', completed: false, category : category });
    service.add({text: 'Task One', completed: false, category : category });

    service.remove(1);

    service.getData().subscribe((values) =>{
      expect(values.length).toBe(1);
    });
    categoryService.getData().subscribe((values) =>{
      expect(values.length).toBe(1);
    });
    done();
  });

  it('should get Tasks by category', (done) => {
    let category : Category = {
      id : 1,
      name : "Category One"
    };
    let categoryTwo : Category = {
      id : 2,
      name : "Category Two"
    };
    categoryService.add(category);
    categoryService.add(categoryTwo);
    service.add({text: 'Task For Delete', completed: false, category : category });
    service.add({text: 'Task One', completed: false, category : categoryTwo });
    
    service.getDataByCategoryId(1).subscribe((values) =>{
      expect(values?.length).toBe(1);
      done();
    });
  });
});

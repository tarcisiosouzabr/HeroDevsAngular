import { TestBed } from '@angular/core/testing';
import { DataService, Todo } from './data.service';
import { Category, CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, CategoryService],
    });
    service = TestBed.inject(CategoryService);
    service.resetData();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should add', (done) => {
    service.add({name: "Category Test"});

    service.getData().subscribe((values) =>{
      expect(values.length).toBe(1);
      done();
    });    
  });

  it('should update', (done) => {
    service.add({name: "Category Test" });
    let updatedTask : Category = {
      id : 1,
      name : "Category Test Updated"
    };
    service.update(updatedTask);

    service.getById(1).subscribe((task) =>{
      expect(task?.name).toEqual(updatedTask.name);
      done();
    });    
  });

  it('should delete', (done) => {
    service.add({name: 'Task For Delete'});
    service.remove(1);
    service.getData().subscribe((values) =>{
      expect(values.length).toBe(0);
      done();
    });
  });

  it('should get', (done) => {
    service.add({name: "Category Test" });
    service.add({name: "Category Test 2" });

    service.getData().subscribe((task) =>{
      expect(task.length).toEqual(2);
      done();
    });    
  });

  it('should get by id', (done) => {
    service.add({name: "Category Test" });
    service.add({name: "Category Test 2" });

    service.getById(1).subscribe((task) =>{
      expect(task).toBeTruthy();
      done();
    });    
  });
  
});

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, map } from 'rxjs';
import { CategoryService } from './category.service';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  category: Category | undefined;
};

export type Category = {
  id: number;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #initialData: Todo[] = [];
  #data = new BehaviorSubject<Todo[]>([]);
  #nextId = 1;
  readonly #defaultTodo: Todo = {
    id: -1,
    text: '',
    completed: false,
    category : undefined
  };


  constructor(private categoryService : CategoryService) {
    this.initialize();
  }

  public resetData(): void {
    this.initialize();
  }

  public getData(): Observable<Todo[]> {
    return this.#data.asObservable();
  }

  public getDataById(taskId:number): Observable<Todo | undefined> {
    return this.#data.asObservable().pipe(map(tasks => tasks.find(task => task.id == taskId)));
  }

  public getDataByCategoryId(categoryId:number | undefined): Observable<Todo[] | undefined> {
    return this.#data.pipe(map(tasks => tasks.filter(task => task.category?.id == categoryId)));
  }

  public add(todo: Partial<Todo>): Observable<Todo> {
    const newTodo = { ...this.#defaultTodo, ...todo, id: this.#nextId++ };
    this.#data.next([...this.#data.value, newTodo]);
    return of(newTodo);
  }

  public remove(id: number): Observable<void> {
    this.getDataById(id).subscribe((task) => {
      this.getDataByCategoryId(task?.category?.id).subscribe((tasks) => {
        if(tasks && tasks.length == 0)
        {
          this.categoryService.remove(task?.category?.id as number);
        }
      });

      this.#data.next(this.#data.value.filter((t) => t.id !== id));
    });

    return of();
  }

  public update(updatedTask : Todo): Observable<Todo>{
    this.#data.next(this.#data.value.map((task : Todo) => task.id == updatedTask.id ? updatedTask : task));
    return of(updatedTask);
  }

  private initialize() {
    this.#nextId = this.#initialData.length + 1;
    this.#data.next(this.#initialData);
  }
}

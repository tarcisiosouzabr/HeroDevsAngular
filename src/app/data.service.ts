import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, map } from 'rxjs';

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
  #initialCategoryData: Category[] = [];
  #data = new BehaviorSubject<Todo[]>([]);
  #categoriesData = new BehaviorSubject<Category[]>([]);
  #nextId = 1;
  #nextCategoryId = 1;
  readonly #defaultTodo: Todo = {
    id: -1,
    text: '',
    completed: false,
    category : undefined
  };
  readonly #defaultCategory : Category = {
    id: -1,
    name : ''
  };

  constructor() {
    this.initialize();
  }

  public resetData(): void {
    this.initialize();
  }

  public getData(): Observable<Todo[]> {
    return this.#data.asObservable();
  }

  public getCategoryData(): Observable<Category[]> {
    return this.#categoriesData.asObservable();
  }

  public getDataById(taskId:number): Observable<Todo | undefined> {
    return this.#data.asObservable().pipe(map(tasks => tasks.find(task => task.id == taskId)));
  }

  public getDataByCategoryId(categoryId:number | undefined): Observable<Todo[] | undefined> {
    return this.#data.pipe(map(tasks => tasks.filter(task => task.category?.id == categoryId)));
  }

  public getCategoryById(id:number): Observable<Category | undefined> {
    return this.#categoriesData.asObservable().pipe(map(categories => categories.find(category => category.id == id)));
  }

  public add(todo: Partial<Todo>): Observable<Todo> {
    const newTodo = { ...this.#defaultTodo, ...todo, id: this.#nextId++ };
    this.#data.next([...this.#data.value, newTodo]);
    return of(newTodo);
  }

  public addCategory(category: Partial<Category>): Observable<Category> {
    const newCategory = { ...this.#defaultCategory, ...category, id: this.#nextCategoryId++ };
    this.#categoriesData.next([...this.#categoriesData.value, newCategory]);
    return of(newCategory);
  }

  public remove(id: number): Observable<void> {
    this.getDataById(id).subscribe((task) => {
      this.getDataByCategoryId(task?.category?.id).subscribe((tasks) => {
        if(tasks && tasks.length == 0)
        {
          this.removeCategory(task?.category?.id as number);
        }
      });

      this.#data.next(this.#data.value.filter((t) => t.id !== id));
    });
    console.log(this.#categoriesData.value);

    return of();
  }

  public removeCategory(id: number): Observable<void> {
    this.#categoriesData.next(this.#categoriesData.value.filter((t) => t.id !== id));
    return of();
  }

  public update(updatedTask : Todo): Observable<Todo>{
    this.#data.next(this.#data.value.map((task : Todo) => task.id == updatedTask.id ? updatedTask : task));
    return of(updatedTask);
  }

  public updateCategory(updatedCategory : Category): Observable<Category>{
    this.#categoriesData.next(this.#categoriesData.value.map((task : Category) => task.id == updatedCategory.id ? updatedCategory : task));
    return of(updatedCategory);
  }

  private initialize() {
    this.#nextId = this.#initialData.length + 1;
    this.#data.next(this.#initialData);

    this.#nextCategoryId = this.#initialCategoryData.length + 1;
    this.#categoriesData.next(this.#initialCategoryData);
  }
}

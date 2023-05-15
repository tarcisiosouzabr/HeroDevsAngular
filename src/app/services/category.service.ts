import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, of } from "rxjs";

export type Category = {
    id: number;
    name: string;
  };

@Injectable({
    providedIn: 'root',
  })
  export class CategoryService {
    #initialData: Category[] = [];
    #data = new BehaviorSubject<Category[]>([]);
    #nextId = 1;

    readonly #defaultCategory : Category = {
        id: -1,
        name : ''
    };

    constructor() {
        this.initialize();
    }

    private initialize() {
        this.#nextId = this.#initialData.length + 1;
        this.#data.next(this.#initialData);
    }

    public resetData(): void {
        this.initialize();
    }

    public getData(): Observable<Category[]> {
        return this.#data.asObservable();
    }

    public getById(id:number): Observable<Category | undefined> {
        return this.#data.asObservable().pipe(map(categories => categories.find(category => category.id == id)));
    }

    public add(category: Partial<Category>): Observable<Category> {
        const newCategory = { ...this.#defaultCategory, ...category, id: this.#nextId++ };
        this.#data.next([...this.#data.value, newCategory]);
        return of(newCategory);
    }

    public remove(id: number): Observable<void> {
        if(this.#data && this.#data.value){
            this.#data.next(this.#data.value.filter((t) => t.id !== id));
        }
        return of();
    }

    public update(updatedCategory : Category): Observable<Category>{
        this.#data.next(this.#data.value.map((task : Category) => task.id == updatedCategory.id ? updatedCategory : task));
        return of(updatedCategory);
    }
  }
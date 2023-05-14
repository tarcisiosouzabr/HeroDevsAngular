import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Category, DataService, Todo } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hd-task1',
  standalone: true,
  imports: [CommonModule,  ReactiveFormsModule, FormsModule],
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.scss']
})
export class Task1Component implements OnInit {
  
  get text() { return this.myForm.get('text'); }
  get category() { return this.myForm.get('category'); }

  get data() { 
    if(this.categoryId > 0)
    {
      return this.dataService.getDataByCategoryId(this.categoryId);
    }
    else
    {
      return this.dataService.getData();
    }
   }
  get categories() { return this.dataService.getCategoryData(); }

  categoryId : number = 0;

  myForm = new FormGroup({
    text: new FormControl('',[Validators.required, Validators.minLength(2), ]),
    category: new FormControl({})
  });

  constructor(private dataService: DataService, private router: Router)
  {
    
  }

  ngOnInit(): void {
  }


  onSubmit() {
    this.dataService.add(this.myForm.value as Todo);
  }

  deleteTask(taskId : number, task : Todo){
    if(confirm(`Are you sure they want to delete ${task.category?.name} ${task.text}?`)){
      this.dataService.remove(taskId);
    }
  }

  editTask(taskId: number)
  {
    this.router.navigate(["task2", taskId]);
  }

  goToCategory(){
    this.router.navigate(["task3"]);
  }

  filter(){
    if(this.categoryId > 0)
    {

    }else{
      this.categories
    }
  }

}

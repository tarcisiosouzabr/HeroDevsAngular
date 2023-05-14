import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService, Todo } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'hd-task2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss']
})
export class Task2Component {

  myForm : FormGroup = new FormGroup({
    id: new FormControl(''),
    text: new FormControl('', [Validators.required, Validators.minLength(2), ]),
    completed: new FormControl(''),
    category: new FormControl('')
  });
  get todoText() { return this.myForm.get('todoText'); }
  get categories() { return this.dataService.getCategoryData(); }
  

  constructor(private dataService : DataService,
              private route : ActivatedRoute,
              private router : Router){
                this.route.params.pipe(map(p => p['taskId'])).subscribe(value => this.getTask(value));
  }
  getTask(taskId : number)
  {
    this.dataService.getDataById(taskId).subscribe(task => this.createForm(task));
  }

  createForm(task : Todo | undefined){
    if(task){
      this.myForm = new FormGroup({
        id: new FormControl(task.id),
        text: new FormControl(task.text,[Validators.required, Validators.minLength(2), ]),
        completed: new FormControl(task.completed),
        category: new FormControl(task.category)
      });
      this.myForm.controls['id'].disable();
    }
  }

  onSubmit() {
    this.dataService.update(this.myForm.getRawValue());
    this.router.navigateByUrl('task1');
  }



}

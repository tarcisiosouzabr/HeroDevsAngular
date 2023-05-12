import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DataService, Todo } from '../data.service';

@Component({
  selector: 'hd-task1',
  standalone: true,
  imports: [CommonModule,  ReactiveFormsModule],
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.scss']
})
export class Task1Component implements OnInit {
  
  get todoText() { return this.myForm.get('todoText'); }

  get data() { return this.dataService.getData(); }

  myForm = new FormGroup({
    todoText: new FormControl('',[Validators.required, Validators.minLength(2), ])
  });

  currentTaskId : number = 1;

  constructor(private dataService: DataService)
  {
    
  }

  ngOnInit(): void {
  }


  onSubmit() {
    this.dataService.add({ id: this.currentTaskId, text: this.todoText?.value?.toString(),  completed: false});
    this.currentTaskId++;
  }

  deleteTask(taskId : number){
    this.dataService.remove(taskId);
  }

}

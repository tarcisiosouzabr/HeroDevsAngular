import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DataService, Todo } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hd-task1',
  standalone: true,
  imports: [CommonModule,  ReactiveFormsModule],
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.scss']
})
export class Task1Component implements OnInit {
  
  get todoText() { return this.myForm.get('text'); }

  get data() { return this.dataService.getData(); }

  myForm = new FormGroup({
    text: new FormControl('',[Validators.required, Validators.minLength(2), ])
  });

  constructor(private dataService: DataService, private router: Router)
  {
    
  }

  ngOnInit(): void {
  }


  onSubmit() {
    this.dataService.add({ text: this.todoText?.value?.toString(),  completed: false});
  }

  deleteTask(taskId : number){
    this.dataService.remove(taskId);
  }

  editTask(taskId: number)
  {
    this.router.navigate(["task2", taskId]);
  }

}

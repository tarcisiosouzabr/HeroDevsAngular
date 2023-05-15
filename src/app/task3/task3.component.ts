import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'hd-task3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task3.component.html',
  styleUrls: ['./task3.component.scss']
})
export class Task3Component {
  myForm : FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required])
  });

  constructor(private categoryService : CategoryService, private router : Router)
  {

  }

  onSubmit(){
    this.categoryService.add({...this.myForm.value});
    this.router.navigate(['/task1']);
  }
}

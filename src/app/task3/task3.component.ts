import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

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
    name: new FormControl('')
  });

  constructor(private dataService : DataService, private router : Router)
  {

  }

  onSubmit(){
    this.dataService.addCategory({...this.myForm.value});
    this.router.navigate(['/task1']);
  }
}

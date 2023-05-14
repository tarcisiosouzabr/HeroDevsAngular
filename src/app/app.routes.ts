import { Routes } from '@angular/router';
import { Task1Component } from './task1/task1.component';
import { Task5Component } from './task5/task5.component';
import { Task4Component } from './task4/task4.component';
import { Task3Component } from './task3/task3.component';
import { Task2Component } from './task2/task2.component';

export const routes: Routes = [
    { path: 'task1', component: Task1Component },
    { path: 'task2/:taskId', component: Task2Component },
    { path: 'task3', component: Task3Component },
    { path: 'task4', component: Task4Component },
    { path: 'task5', component: Task5Component },
    { path: '',   redirectTo: '/task1', pathMatch: 'full' },
    { path: '**', component: Task1Component }
];

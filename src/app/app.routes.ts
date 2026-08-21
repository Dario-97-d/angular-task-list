import { Routes } from '@angular/router';
import { TaskDetail } from './task-detail/task-detail';

export const routes: Routes = [
    { path: 'tasks/:id', component: TaskDetail },
];

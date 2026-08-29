import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from './task.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  constructor(public taskService: TaskService) {}

  onAddTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const title = this.taskForm.value.title!.trim();
    this.taskService.addTask(title);
    this.taskForm.reset();
  }
}

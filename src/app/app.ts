import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from './task.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  newTaskTitle = '';

  constructor(public taskService: TaskService) {}

  onAddTask() {
    const title = this.newTaskTitle.trim();
    if (!title) return;
    this.taskService.addTask(title);
    this.newTaskTitle = '';
  }
}

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  tasks = signal<Task[]>([]);

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe((data) => {
      this.tasks.set(data);
    });
  }

  addTask(title: string) {
    const newTask = { title, done: false };
    this.http.post<Task>(this.apiUrl, newTask).subscribe((created) => {
      this.tasks.update((current) => [...current, created]);
    });
  }

  toggleDone(task: Task) {
    const updatedTask = { ...task, done: !task.done };
    this.http.put<Task>(`${this.apiUrl}/${task.id}`, updatedTask).subscribe((saved) => {
      this.tasks.update((current) =>
        current.map((t) => (t.id === task.id ? saved : t))
      );
    });
  }

  deleteTask(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.tasks.update((current) => current.filter((t) => t.id !== id));
    });
  }
}

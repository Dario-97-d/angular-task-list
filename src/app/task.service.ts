import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  error = signal<string | null>(null);
  tasks = signal<Task[]>([]);

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<Task[]>(this.apiUrl).pipe(
      catchError((error) => {
        this.error.set('Failed to load tasks');
        return of([]);
      })
    ).subscribe((data) => {
      this.tasks.set(data);
    });
  }

  addTask(title: string) {
    const newTask = { title, done: false };
    this.http.post<Task>(this.apiUrl, newTask).pipe(
      catchError((error) => {
        this.error.set('Failed to add task');
        return of(null);
      })
    ).subscribe((created) => {
      if (created) {
        this.tasks.update((current) => [...current, created]);
      }
    });
  }

  toggleDone(task: Task) {
    const updatedTask = { ...task, done: !task.done };
    this.http.put<Task>(`${this.apiUrl}/${task.id}`, updatedTask).pipe(
      catchError((error) => {
        this.error.set('Failed to update task');
        return of(null);
      })
    ).subscribe((saved) => {
      if (saved) {
        this.tasks.update((current) =>
          current.map((t) => (t.id === task.id ? saved : t))
        );
      }
    });
  }

  deleteTask(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        this.error.set('Failed to delete task');
        return of(null);
      })
    ).subscribe(() => {
      this.tasks.update((current) => current.filter((t) => t.id !== id));
    });
  }

  clearCompleted() {
    const completedTasks = this.tasks().filter((t) => t.done);
    completedTasks.forEach((task) => {
      this.deleteTask(task.id);
    });
  }
}

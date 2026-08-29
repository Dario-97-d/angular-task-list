import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Task } from './task.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  error = signal<string | null>(null);
  tasks = signal<Task[]>([]);
  filter = signal<'all' | 'active' | 'completed'>('all');

  filteredTasks = computed(() => {
    const currentFilter = this.filter();
    const allTasks = this.tasks();

    if (currentFilter === 'active') return allTasks.filter((task) => !task.done);
    if (currentFilter === 'completed') return allTasks.filter((task) => task.done);
    return allTasks;
  });

  activeCount = computed(() => this.tasks().filter((task) => !task.done).length);
  completedCount = computed(() => this.tasks().filter((task) => task.done).length);

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<Task[]>(this.apiUrl).pipe(
      catchError((error) => {
        this.error.set('Failed to load tasks');
        console.log('Error loading tasks:', error.message);
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
    this.http.put<Task>(`${this.apiUrl}/${task._id}`, updatedTask).pipe(
      catchError((error) => {
        this.error.set('Failed to update task');
        return of(null);
      })
    ).subscribe((saved) => {
      if (saved) {
        this.tasks.update((current) =>
          current.map((t) => (t._id === task._id ? saved : t))
        );
      }
    });
  }

  deleteTask(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        this.error.set('Failed to delete task');
        return of(null);
      })
    ).subscribe(() => {
      this.tasks.update((current) => current.filter((t) => t._id !== id));
    });
  }

  clearCompleted() {
    const completedTasks = this.tasks().filter((t) => t.done);
    completedTasks.forEach((task) => {
      this.deleteTask(task._id);
    });
  }
}

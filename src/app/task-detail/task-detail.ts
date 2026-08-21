import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  taskId = this.route.snapshot.paramMap.get('id')!;
  task = this.taskService.tasks().find((t) => t.id === this.taskId);
}

import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v7 as uuid } from 'uuid';
import { CreatTaskDto } from './dto/create-task.dto';
import { error } from 'console';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getalltasks(): Task[] {
    return this.tasks;
  }
  createtask(CreatTaskDto: CreatTaskDto): Task {
    const { title, description } = CreatTaskDto;
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  getTaskById(id: string): Task | undefined {
    return this.tasks.find((data) => data.id === id);
  }
  deleteTaskById(id: string): string {
    const filteredtask: Task[] = this.tasks.filter((data) => data.id !== id);
    this.tasks = filteredtask;
    return 'Task has been deleted';
  }
  updateTask(id: string, status: string): string {
    const taskUpdation: Task | undefined = this.tasks.find(
      (data) => data.id === id,
    );
    if (taskUpdation) {
      if (status.includes('open')) {
        taskUpdation.status = TaskStatus.OPEN;
      } else if (status.includes('inprogress')) {
        taskUpdation.status = TaskStatus.IN_PROGRESS;
      } else if (status.includes('done')) {
        taskUpdation.status = TaskStatus.DONE;
      } else {
        throw new error('This status does not exist');
      }
    } else {
      throw new error('Task does not exist');
    }
    return 'Task updated successfully.';
  }
}

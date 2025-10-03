import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getalltasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async createtask(createTaskDto: CreatTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
    });
    return await this.tasksRepository.save(task);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async deleteTaskById(id: string): Promise<string> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return 'Task has been deleted';
  }

  async updateTask(
    id: string,
    updateDto: UpdateTaskStatusDto,
  ): Promise<string> {
    const task = await this.getTaskById(id);
    task.status = updateDto.status;
    await this.tasksRepository.save(task);
    return 'Task updated successfully.';
  }
}

// @Injectable()
// export class TasksService {
// getalltasks(): Task[] {
//   return this.tasks;
// }
// createtask(CreatTaskDto: CreatTaskDto): Task {
//   const { title, description } = CreatTaskDto;
//   const task: Task = {
//     id: uuid(),
//     title: title,
//     description: description,
//     status: TaskStatus.OPEN,
//   };
//   this.tasks.push(task);
//   return task;
// }
// getTaskById(id: string): Task | undefined {
//   const task: Task | undefined = this.tasks.find((data) => data.id === id);
//   if (!task) {
//     throw new NotFoundException(); // I can add custom error message too in ('...')...
//   }
//   return task;
// }
// deleteTaskById(id: string): string {
//   const filteredtask: Task[] = this.tasks.filter((data) => data.id !== id);
//   this.tasks = filteredtask;
//   return 'Task has been deleted';
// }
// // updateTask(id: string, status: string): string {
// //   const taskUpdation = this.getTaskById(id);
// //   if (taskUpdation) {
// //     if (status.includes('open')) {
// //       taskUpdation.status = TaskStatus.OPEN;
// //     } else if (status.includes('inprogress')) {
// //       taskUpdation.status = TaskStatus.IN_PROGRESS;
// //     } else if (status.includes('done')) {
// //       taskUpdation.status = TaskStatus.DONE;
// //     } else {
// //       throw new error('This status does not exist');
// //     }
// //   } else {
// //     throw new error('Task does not exist');
// //   }
// //   return 'Task updated successfully.';
// // }
// updateTask(id: string, status: UpdateTaskStatusDto): string {
//   const task: Task | undefined = this.getTaskById(id);
//   if (task) {
//     task.status = status.status;
//   }
//   return 'Task updated successfully.';
// }
// }

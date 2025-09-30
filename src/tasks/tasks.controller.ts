import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreatTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getalltasks(): Task[] {
    return this.tasksService.getalltasks();
  }
  @Post()
  createtask(@Body() CreatTaskDto: CreatTaskDto): Task {
    return this.tasksService.createtask(CreatTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task | undefined {
    return this.tasksService.getTaskById(id);
  }
  @Delete('/:id')
  deleteTaskByIdI(@Param('id') id: string): string {
    return this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id/:status')
  updateTask(@Param('id') id: string, @Param('status') status: string): string {
    return this.tasksService.updateTask(id, status);
  }
}

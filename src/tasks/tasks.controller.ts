import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreatTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getalltasks(): Promise<Task[]> {
    return this.tasksService.getalltasks();
  }
  @Post()
  createtask(@Body() CreatTaskDto: CreatTaskDto): Promise<Task> {
    return this.tasksService.createtask(CreatTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task | undefined> {
    return this.tasksService.getTaskById(id);
  }
  @Delete('/:id')
  deleteTaskByIdI(@Param('id') id: string): Promise<string> {
    return this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() status: UpdateTaskStatusDto,
  ): Promise<string> {
    return this.tasksService.updateTask(id, status);
  }
}

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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/auth.entity';

@Controller('task')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getalltasks(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getalltasks(user);
  }
  @Post()
  createtask(
    @Body() CreatTaskDto: CreatTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createtask(CreatTaskDto, user);
  }
  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task | undefined> {
    return this.tasksService.getTaskById(id, user);
  }
  @Delete('/:id')
  deleteTaskByIdI(@Param('id') id: string): Promise<string> {
    return this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() status: UpdateTaskStatusDto,
  ): Promise<string> {
    return this.tasksService.updateTask(id, user, status);
  }
}

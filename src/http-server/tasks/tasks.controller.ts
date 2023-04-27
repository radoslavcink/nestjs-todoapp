import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Get,
  NotFoundException as HttpNotFoundException,
  Put,
} from '@nestjs/common';
import { CreateTaskRequestDto } from './dto/create-task-request.dto';
import { TaskService } from '../../model/task/task.service';
import { UpdateTaskRequestDto } from './dto/update-task-request.dto';
import { NotFoundException } from '../../storage/shared/exception/not-found-exception';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskRequestDto) {
    // Note: validated by ClassValidator
    const authorId = 'johndoe'; // TODO: Auth guard...
    const task = { ...createTaskDto, created: new Date(), authorId };

    await this.tasksService.createTask(task);
  }

  @Get()
  async findAll() {
    // Note: we are missing some kind of mapper layer between service layer and transport layer.
    // Either simply using serialization and decorators to e.g. hide some properties or by introducing mapper classes.
    return this.tasksService.findAllTasks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findTaskById(id);

    if (task === null) {
      throw new HttpNotFoundException();
    }

    return task;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskRequestDto,
  ) {
    // TODO: Auth guard + authorization / ACL...
    try {
      await this.tasksService.updateTask(id, updateTaskDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpNotFoundException();
      }

      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.tasksService.deleteTask(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpNotFoundException();
      }

      throw error;
    }
  }
}

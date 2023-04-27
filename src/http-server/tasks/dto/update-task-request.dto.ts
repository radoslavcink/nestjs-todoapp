import { Task } from '../entities/task.entity';
import { PickType } from '@nestjs/swagger';

export class UpdateTaskRequestDto extends PickType(Task, [
  'title',
  'due',
  'done',
  'priority',
] as const) {}

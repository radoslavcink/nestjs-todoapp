import { Injectable } from '@nestjs/common';
import { ITaskRepository } from '../../shared/i-task-repository';
import { ITask } from '../../shared/type/i-task.interface';
import { ITaskId } from '../../shared/type/types';
import { Task } from '../entity/task.entity';
import { NotFoundException } from '../../shared/exception/not-found-exception';
import { AlreadyExistsException } from '../../shared/exception/already-exists-exception';
import { RandomIdGeneratorService } from '../../../model/utils/random/random-id-generator.service';

@Injectable()
/**
 * Alternative TaskRepository just for testing DI configuration, not intended for any real world usage.
 */
export class TaskRepositoryInMemory implements ITaskRepository {
  private data: Map<ITaskId, Task>; // optimized just for quick lookup, yep, does not make much sense for tasks

  constructor(private idGenerator: RandomIdGeneratorService) {
    this.data = new Map();
  }

  async delete(taskId: ITaskId): Promise<void> {
    if (!this.data.has(taskId)) {
      throw new NotFoundException(taskId);
    }

    this.data.delete(taskId);
  }

  async findAll(): Promise<ITask[]> {
    // yeah, that's super lame
    return Array.from(this.data.values());
  }

  async findOneById(id: ITaskId): Promise<ITask | null> {
    return this.data.get(id) ?? null;
  }

  async insert(task: Omit<ITask, 'id'>): Promise<void> {
    const taskWithId = { ...task, id: this.idGenerator.generateId() };

    if (this.data.has(taskWithId.id)) {
      // yeah, should not happen
      throw new AlreadyExistsException(taskWithId.id);
    }

    this.data.set(taskWithId.id, taskWithId);
  }

  async update(
    id: ITaskId,
    changes: Omit<ITask, 'id' | 'created' | 'authorId'>,
  ): Promise<void> {
    const storedTask = this.data.get(id);

    if (storedTask === undefined) {
      throw new NotFoundException(id);
    }

    // let's be defensive, update namely only whitelisted properties
    storedTask.due = changes.due;
    storedTask.done = changes.done;
    storedTask.priority = changes.priority;
    storedTask.title = changes.title;
  }
}

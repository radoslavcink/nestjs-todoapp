import { Inject, Injectable } from '@nestjs/common';
import { ITaskRepository } from './shared/i-task-repository';
import { ITaskId } from './shared/type/types';
import { ITask } from './shared/type/i-task.interface';

@Injectable()
export class StorageService {
  constructor(
    @Inject('TASKS_REPOSITORY') private tasksRepository: ITaskRepository,
  ) {}

  async findAllTasks(): Promise<ITask[]> {
    return this.tasksRepository.findAll();
  }

  async findTaskById(id: ITaskId): Promise<ITask | null> {
    return this.tasksRepository.findOneById(id);
  }

  async insertTask(task: Omit<ITask, 'id'>): Promise<void> {
    return this.tasksRepository.insert(task);
  }

  async updateTask(
    id: ITaskId,
    changes: Omit<ITask, 'id' | 'created' | 'authorId'>,
  ): Promise<void> {
    return this.tasksRepository.update(id, changes);
  }

  async deleteTask(taskId: ITaskId): Promise<void> {
    return this.tasksRepository.delete(taskId);
  }
}

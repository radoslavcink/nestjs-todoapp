import { Injectable } from '@nestjs/common';
import { StorageService } from '../../storage/storage.service';
import { ITask } from './boundary/i-task.interface';
import { ITaskId } from '../../storage/shared/type/types';

@Injectable()
export class TaskService {
  constructor(private storageService: StorageService) {}

  async findAllTasks(): Promise<ITask[]> {
    return this.storageService.findAllTasks();
  }

  async findTaskById(id: ITaskId): Promise<ITask | null> {
    return this.storageService.findTaskById(id);
  }

  /**
   * @throws AlreadyExistsException
   */
  async createTask(task: Omit<ITask, 'id'>): Promise<void> {
    return this.storageService.insertTask(task);
  }

  /**
   * @throws NotFoundException
   */
  async updateTask(
    id: ITaskId,
    changes: Omit<ITask, 'id' | 'created' | 'authorId'>,
  ): Promise<void> {
    return this.storageService.updateTask(id, changes);
  }

  /**
   * @throws NotFoundException
   */
  async deleteTask(taskId: ITaskId): Promise<void> {
    return this.storageService.deleteTask(taskId);
  }
}

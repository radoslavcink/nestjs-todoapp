import { Injectable } from '@nestjs/common';
import { ITaskRepository } from '../../shared/i-task-repository';
import { ITask } from '../../shared/type/i-task.interface';
import { ITaskId } from '../../shared/type/types';
import { NotImplementedException } from '../../shared/exception/not-implemented-exception';

@Injectable()
export class TaskRepositoryPersistent implements ITaskRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(taskId: ITaskId): Promise<void> {
    throw new NotImplementedException();
  }

  async findAll(): Promise<ITask[]> {
    throw new NotImplementedException();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findOneById(id: ITaskId): Promise<ITask | null> {
    throw new NotImplementedException();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async insert(task: Omit<ITask, 'id'>): Promise<void> {
    throw new NotImplementedException();
  }

  async update(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: ITaskId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changes: Omit<ITask, 'id' | 'created' | 'authorId'>,
  ): Promise<void> {
    throw new NotImplementedException();
  }
}

import { ITask } from './type/i-task.interface';
import { ITaskId } from './type/types';

export interface ITaskRepository {
  findAll(): Promise<ITask[]>;
  findOneById(id: ITaskId): Promise<ITask | null>;
  /**
   * @throws AlreadyExistsException
   */
  insert(task: Omit<ITask, 'id'>): Promise<void>;
  /**
   * @throws NotFoundException
   */
  update(
    id: ITaskId,
    changes: Omit<ITask, 'id' | 'created' | 'authorId'>,
  ): Promise<void>;
  /**
   * @throws NotFoundException
   */
  delete(taskId: ITaskId): Promise<void>;
}

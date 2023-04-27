import { ITaskId } from './types';

export interface ITask {
  id: ITaskId;
  title: string;
  created: Date;
  due: Date | null;
  done: boolean;
  priority: number;
  authorId: string;
}

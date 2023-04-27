import { ITask } from '../../shared/type/i-task.interface';

export class Task implements ITask {
  constructor(
    public id: string,
    public title: string,
    public created: Date,
    public due: Date | null,
    public done: boolean,
    public priority: number,
    public authorId: string,
  ) {}
}

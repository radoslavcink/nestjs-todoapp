import { ITask as ITaskFromStorage } from '../../../storage/shared/type/i-task.interface';

export type ITask = ITaskFromStorage; // for now, reuse type from storage layer. It would be split later.

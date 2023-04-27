import { Module } from '@nestjs/common';
import { StorageModule } from '../../storage/storage.module';
import { TaskService } from './task.service';

/**
 * TaskModule is intended as a domain module for operations related to task.
 * Currently it is just wrapper around StorageModule, but in real application would
 * handle also e.g. authorization, caching, concurrency etc.
 */
@Module({
  imports: [StorageModule],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}

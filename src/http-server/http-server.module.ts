import { Module } from '@nestjs/common';
import { TaskModule } from '../model/task/task.module';
import { TasksController } from './tasks/tasks.controller';

/**
 * This module handles REST/HTTP transport layer.
 * Protocol specific operations (like retrieval of auth. credentials) or serialization to http should be done only
 * in this module.
 * As the application is simple, no separate handlers layer is presented and therefore controllers might contain
 * some highest level orchestration.
 */
@Module({
  imports: [TaskModule],
  controllers: [TasksController],
})
export class HttpServerModule {}

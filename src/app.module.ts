import { Module } from '@nestjs/common';
import { UtilsModule } from './model/utils/utils.module';
import { TaskModule } from './model/task/task.module';
import { ConfigModule } from './model/config/config.module';
import { StorageModule } from './storage/storage.module';
import { HttpServerModule } from './http-server/http-server.module';

@Module({
  imports: [
    UtilsModule,
    ConfigModule,
    StorageModule,
    TaskModule,
    HttpServerModule,
  ],
})
export class AppModule {}

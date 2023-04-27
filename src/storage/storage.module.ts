import { Module } from '@nestjs/common';
import { ConfigModule } from '../model/config/config.module';
import { ConfigService } from '../model/config/config.service';
import { TaskRepositoryInMemory } from './storage-in-memory/repository/task-repository-in-memory';
import { TaskRepositoryPersistent } from './storage-persistent/repository/task-repository-persistent';
import { StorageService } from './storage.service';
import { UtilsModule } from '../model/utils/utils.module';
import { RandomIdGeneratorService } from '../model/utils/random/random-id-generator.service';

/**
 * StorageModule is intended to cover persistence layer of the application.
 * In real world application, it might be separated to external library and used by more application parts (like in CQRS
 * for writes done by some workers, while in API used for reads).
 */
@Module({
  imports: [ConfigModule, UtilsModule],
  providers: [
    StorageService,
    {
      provide: 'TASKS_REPOSITORY',
      useFactory: (
        configService: ConfigService,
        randomIdGenerator: RandomIdGeneratorService,
      ) => {
        return configService.config.isInMemoryStorageRequested()
          ? new TaskRepositoryInMemory(randomIdGenerator)
          : new TaskRepositoryPersistent();
      },
      inject: [ConfigService, RandomIdGeneratorService],
    },
  ],
  exports: [StorageService],
})
export class StorageModule {
  // Note: dynamic modules way, does not require to manually handle dependencies to instantiate
  //       providers as in useFactory approach.
  //
  // static forRoot(options: { storageType: StorageTypeEnum }): DynamicModule {
  //   return {
  //     module: StorageModule,
  //     providers: [
  //       {
  //         provide: 'TASKS_REPOSITORY',
  //         useClass:
  //           options.storageType === StorageTypeEnum.Memory
  //             ? TaskRepositoryInMemory
  //             : TaskRepositoryPersistent,
  //       },
  //       StorageService,
  //     ],
  //     exports: [StorageService],
  //     global: true, // does not work in Tasks module otherwise, not sure how to fix it
  //   };
  // }
}

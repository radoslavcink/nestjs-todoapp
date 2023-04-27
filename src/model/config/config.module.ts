import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, registerAs } from '@nestjs/config';
import { createAppConfig, validateAppConfig } from './factory/app-config';
import { ConfigService } from './config.service';

/**
 * ConfigModule is intended as a wrapper for strongly typed configuration object
 * with possible utility methods, to avoid accessing configuration with
 * get(magical_string) approach.
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      load: [registerAs('app', createAppConfig)],
      validate: validateAppConfig,
      envFilePath: ['./src/config/.env'],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

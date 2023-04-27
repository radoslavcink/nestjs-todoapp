import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EnvironmentEnum } from '../boundary/environment.enum';
import { AppConfigDto } from '../boundary/app-config.dto';
import {
  EnvironmentVariables,
  IEnvironmentVariables,
} from './do/environment-variables';
import { StorageTypeEnum } from '../boundary/storage-type.enum';

/**
 * Factory and validation create strongly typed wrapper for ENV variables.
 * This is handed to std. Nest Configuration module.
 * Validation of ENV variables is handled by validateAppConfig.
 */
export function createAppConfig(): AppConfigDto {
  // Although validation is handled by validateAppConfig,
  // we still need to convert the string values where other types are desired.

  const config = new AppConfigDto();
  const env = process.env as IEnvironmentVariables; // just to avoid env. name typos
  config.environment = env.NODE_ENV as EnvironmentEnum;
  config.appPort = parseInt(env.APP_PORT || '', 10) || 3000;
  config.storageType = env.STORAGE_TYPE as StorageTypeEnum;
  config.database = {
    host: env.DB_HOST || '',
    port: parseInt(env.DB_PORT || '', 10) || 3306,
  };

  return config;
}

/**
 * Validation of ENV variables.
 * This method is used during Nest std. ConfigModule initialization.
 */
export function validateAppConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    forbidUnknownValues: false,
  });

  if (errors.length > 0) {
    throw new Error('Invalid application config.\n' + errors.toString());
  }

  return config as any as AppConfigDto;
}

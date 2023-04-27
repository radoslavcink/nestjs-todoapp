import { IsEnum, IsNumber } from 'class-validator';
import { EnvironmentEnum } from '../../boundary/environment.enum';
import { StorageTypeEnum } from '../../boundary/storage-type.enum';

/**
 * Describes ENV variables used by this application together with validation rules.
 */
export class EnvironmentVariables {
  @IsEnum(EnvironmentEnum)
  NODE_ENV!: EnvironmentEnum;

  @IsNumber()
  APP_PORT!: number;

  @IsNumber()
  DB_PORT!: number;
  DB_HOST!: string;

  @IsEnum(StorageTypeEnum)
  STORAGE_TYPE!: StorageTypeEnum;
}

export type IEnvironmentVariables = Record<keyof EnvironmentVariables, any>;

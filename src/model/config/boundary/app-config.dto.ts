import { EnvironmentEnum } from './environment.enum';

export class AppConfigDto {
  environment!: EnvironmentEnum;
  appPort!: number;
  database!: {
    host: string;
    port: number;
  };
  storageType!: 'memory' | 'database'; // what to use for storage
  isProduction(): boolean {
    return this.environment === EnvironmentEnum.Production;
  }
  isInMemoryStorageRequested(): boolean {
    return this.storageType === 'memory';
  }
}

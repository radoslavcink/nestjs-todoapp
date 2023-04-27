import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { AppConfigDto } from './boundary/app-config.dto';

@Injectable()
export class ConfigService {
  public readonly config: AppConfigDto;

  constructor(nestConfigService: NestConfigService) {
    const appConfig = nestConfigService.get<AppConfigDto>('app');
    if (appConfig == null) {
      throw new Error('Cannot get app configuration');
    }
    this.config = appConfig;
  }
}

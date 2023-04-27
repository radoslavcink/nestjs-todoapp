import { Module } from '@nestjs/common';
import { RandomIdGeneratorService } from './random/random-id-generator.service';

@Module({
  providers: [RandomIdGeneratorService],
  exports: [RandomIdGeneratorService],
})
export class UtilsModule {}

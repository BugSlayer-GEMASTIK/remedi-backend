import { Module } from '@nestjs/common';
import { LabResultsService } from './lab-results.service';
import { LabResultsController } from './lab-results.controller';

@Module({
  controllers: [LabResultsController],
  providers: [LabResultsService]
})
export class LabResultsModule {}

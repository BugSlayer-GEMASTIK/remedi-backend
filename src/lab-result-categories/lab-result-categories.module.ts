import { Module } from '@nestjs/common';
import { LabResultCategoriesService } from './lab-result-categories.service';
import { LabResultCategoriesController } from './lab-result-categories.controller';

@Module({
  controllers: [LabResultCategoriesController],
  providers: [LabResultCategoriesService]
})
export class LabResultCategoriesModule {}

import { Module } from '@nestjs/common';
import { TreatmentCategoriesService } from './treatment-categories.service';
import { TreatmentCategoriesController } from './treatment-categories.controller';

@Module({
  controllers: [TreatmentCategoriesController],
  providers: [TreatmentCategoriesService],
})
export class TreatmentCategoriesModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { LabResultCategoriesController } from './lab-result-categories.controller';
import { LabResultCategoriesService } from './lab-result-categories.service';

describe('LabResultCategoriesController', () => {
  let controller: LabResultCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabResultCategoriesController],
      providers: [LabResultCategoriesService],
    }).compile();

    controller = module.get<LabResultCategoriesController>(
      LabResultCategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { LabResultCategoriesService } from './lab-result-categories.service';

describe('LabResultCategoriesService', () => {
  let service: LabResultCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabResultCategoriesService],
    }).compile();

    service = module.get<LabResultCategoriesService>(
      LabResultCategoriesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

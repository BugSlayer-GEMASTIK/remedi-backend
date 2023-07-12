import { PartialType } from '@nestjs/swagger';
import { CreateLabResultCategoryDto } from './create-lab-result-category.dto';

export class UpdateLabResultCategoryDto extends PartialType(
  CreateLabResultCategoryDto,
) {}

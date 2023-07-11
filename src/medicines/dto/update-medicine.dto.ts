import { PartialType } from '@nestjs/swagger';
import { CreateMedicineDto } from './create-medicine.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {
  @IsString()
  @IsNotEmpty()
  name?: string;
}

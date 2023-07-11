import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMedicineRecordDto {
  @IsNumber()
  @IsNotEmpty()
  readonly recordId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly medicineId: number;

  @IsString()
  @IsNotEmpty()
  readonly dose: string;
}

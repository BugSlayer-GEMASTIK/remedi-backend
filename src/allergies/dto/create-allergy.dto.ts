import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAllergyDto {
  @IsString()
  @IsNotEmpty()
  readonly patientEmail: string;

  @IsNumber()
  @IsNotEmpty()
  readonly medicineId: number;
}

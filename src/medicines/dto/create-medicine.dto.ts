import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicineDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

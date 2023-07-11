import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiseaseDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly category: string;
}

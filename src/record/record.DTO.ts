import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecordDTO {
  @IsString()
  @IsNotEmpty()
  doctorEmail: string;

  @IsString()
  @IsNotEmpty()
  patientEmail: string;

  @IsString()
  description: string;

  @IsString()
  diagnoseName: string;
}

export class UpdateRecordDTO {
  @IsString()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  doctorEmail: string;

  @IsString()
  @IsNotEmpty()
  patientEmail: string;

  @IsString()
  description: string;

  @IsString()
  diagnoseName: string;

  @IsString()
  medicineName: string;
}

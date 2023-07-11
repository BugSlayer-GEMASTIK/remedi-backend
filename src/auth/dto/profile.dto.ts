import { IsNotEmpty, IsString } from 'class-validator';

export class ProfileDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  readonly birthDate: string;

  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly provinsi: string;

  @IsString()
  @IsNotEmpty()
  readonly kota: string;

  @IsString()
  @IsNotEmpty()
  readonly kecamatan: string;

  @IsString()
  @IsNotEmpty()
  readonly kelurahan: string;
}

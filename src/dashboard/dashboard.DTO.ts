import { IsString } from 'class-validator';

export class GetDashboardDTO {
  @IsString()
  provinsi: string;

  @IsString()
  kota: string;

  @IsString()
  kecamatan: string;

  @IsString()
  kelurahan: string;
}

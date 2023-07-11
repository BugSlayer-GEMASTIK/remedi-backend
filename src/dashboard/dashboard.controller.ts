import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async findAll() {
    return await this.dashboardService.findAll();
  }

  @Get('provinsi/:provinsi')
  async findByProvinsi(@Param('provinsi') provinsi: string) {
    return await this.dashboardService.findByProvinsi(provinsi);
  }

  @Get('kota/:kota')
  async findByKota(@Param('kota') kota: string) {
    return await this.dashboardService.findByKota(kota);
  }

  @Get('kecamatan/:kecamatan')
  async findByKecamatan(@Param('kecamatan') kecamatan: string) {
    return await this.dashboardService.findByKecamatan(kecamatan);
  }
  
  @Get('kelurahan/:kelurahan')
  async findByKelurahan(@Param('kelurahan') kelurahan: string) {
    return await this.dashboardService.findByKelurahan(kelurahan);
  }
}

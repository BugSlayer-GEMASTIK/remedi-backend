import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CreateMedicineRecordDto } from './dto/create-medicine-record.dto';

@Controller('medicine')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicinesService.create(createMedicineDto);
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.medicinesService.findAll();
  }

  @Roles('DOCTOR', 'PATIENT')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  findAllBasedOnRecord(@Param('id') id: number) {
    return this.medicinesService.findAllBasedOnRecord(id);
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicinesService.update(id, updateMedicineDto);
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.medicinesService.remove(id);
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  createMedicineRecord(createMedicineRecordDto: CreateMedicineRecordDto) {
    return this.medicinesService.createMedicineRecord(createMedicineRecordDto);
  }
}

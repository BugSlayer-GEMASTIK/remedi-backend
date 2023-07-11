import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CreateMedicineRecordDto } from './dto/create-medicine-record.dto';
import { ResponseUtil } from 'src/common/utils/response.util';

@Controller('medicine')
export class MedicinesController {
  constructor(
    private readonly medicinesService: MedicinesService,
    private responseUtil: ResponseUtil,
  ) {}

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMedicineDto: CreateMedicineDto) {
    const medicine = await this.medicinesService.create(createMedicineDto);
    return this.responseUtil.response(
      {
        responseMessage: 'Successfully created medicine',
        responseCode: HttpStatus.CREATED,
      },
      { medicine },
    );
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const medicines = await this.medicinesService.findAll();
    return this.responseUtil.response({}, { medicines });
  }

  @Roles('DOCTOR', 'PATIENT')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findAllBasedOnRecord(@Param('id') id: number) {
    const medicine = await this.medicinesService.findAllBasedOnRecord(id);
    return this.responseUtil.response({}, { medicine });
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    const updatedMedicine = await this.medicinesService.update(
      id,
      updateMedicineDto,
    );
    return this.responseUtil.response(
      { responseMessage: 'Successfully updated medicine' },
      { updatedMedicine },
    );
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number) {
    await this.medicinesService.remove(id);
    return this.responseUtil.response({
      responseMessage: 'Successfully deleted medicine',
    });
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/record')
  @HttpCode(HttpStatus.CREATED)
  async createMedicineRecord(
    @Body() createMedicineRecordDto: CreateMedicineRecordDto,
  ) {
    const medicineRecord = await this.medicinesService.createMedicineRecord(
      createMedicineRecordDto,
    );
    return this.responseUtil.response(
      {
        responseMessage: 'Successfully created medicine record',
        responseCode: HttpStatus.CREATED,
      },
      { medicineRecord },
    );
  }
}

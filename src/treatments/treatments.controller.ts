import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, HttpException, HttpStatus } from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('treatment')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Req() req, @Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentsService.create(createTreatmentDto, req.user.email);
  }

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get("/doctor")
  findTreatmentsByDoctor(@Req() req) {
    return this.treatmentsService.findTreatmentsByDoctor(req.user.email);
  }

  @Roles("DOCTOR", "PATIENT")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('pasien?')
  findByPatient(@Req() req, @Query('email') email: string) {
    if (req.user.role == "PATIENT" && req.user.email != email) {
      throw new HttpException('You are not allowed to see another person\'s treatment history', 
                                HttpStatus.FORBIDDEN)
    } 
    return this.treatmentsService.findByPatient(email);
  }

  @Roles("DOCTOR", "PATIENT")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('query?')
  findByCategoryAndPatient(@Req() req, @Query('category') treatmentCategory: number,
                                       @Query('email') email: string) {
    if (req.user.role == "PATIENT" && req.user.email != email) {
      throw new HttpException('You are not allowed to see another person\'s treatment history', 
                                HttpStatus.FORBIDDEN)
    } 
    return this.treatmentsService.findByCategoryAndPatient(treatmentCategory, email);
  }

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  async update(@Req() req, @Param('id') id: number, @Body() updateTreatmentDto: UpdateTreatmentDto) {
    const doctorInChargeForTreatment = await this.treatmentsService.findDoctorByTreatmentId(id);
    if (req.user.email != doctorInChargeForTreatment.doctorEmail) {
      throw new HttpException('You are not allowed to change treatment details.', 
                                HttpStatus.FORBIDDEN)
    }
    return this.treatmentsService.update(id, updateTreatmentDto);
  }

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number) {
    const doctorInChargeForTreatment = await this.treatmentsService.findDoctorByTreatmentId(id);
    if (req.user.email != doctorInChargeForTreatment.doctorEmail) {
      throw new HttpException('You are not allowed to delete treatment history.', 
                                HttpStatus.FORBIDDEN)
    }
    return this.treatmentsService.remove(id);
  }
}

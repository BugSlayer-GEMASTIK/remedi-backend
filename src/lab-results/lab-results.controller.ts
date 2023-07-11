import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, HttpException, HttpStatus } from '@nestjs/common';
import { LabResultsService } from './lab-results.service';
import { CreateLabResultDto } from './dto/create-lab-result.dto';
import { UpdateLabResultDto } from './dto/update-lab-result.dto';
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('lab')
export class LabResultsController {
  constructor(private readonly labResultsService: LabResultsService) {}

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Req() req, @Body() createLabResultDto: CreateLabResultDto) {
    return this.labResultsService.create(createLabResultDto, req.user.email);
  }

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get("/doctor")
  findLabResultsByDoctor(@Req() req) {
    return this.labResultsService.findLabResultsByDoctor(req.user.email);
  }

  @Roles("DOCTOR", "PATIENT")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('pasien?')
  findByPatient(@Req() req, @Query('email') email: string) {
    if (req.user.role == "PATIENT" && req.user.email != email) {
      throw new HttpException('You are not allowed to see another person\'s lab results.', 
                                HttpStatus.FORBIDDEN)
    }
    return this.labResultsService.findByPatient(email);
  }

  @Roles("DOCTOR", "PATIENT")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('query?')
  findByCategoryAndPatient(@Req() req, @Query('category') labResultCategory: number,
                                       @Query('email') email: string) {
    if (req.user.role == "PATIENT" && req.user.email != email) {
      throw new HttpException('You are not allowed to see another person\'s lab results.', 
                                HttpStatus.FORBIDDEN)
    } 
    return this.labResultsService.findByCategoryAndPatient(labResultCategory, email);
  }

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  async update(@Req() req, @Param('id') id: number, @Body() updateLabResultDto: UpdateLabResultDto) {
    const doctorInChargeForExamination = await this.labResultsService.findDoctorByLabResultId(id);
    if (req.user.email != doctorInChargeForExamination.doctorEmail) {
      throw new HttpException('You are not allowed to change lab result details.', 
                                HttpStatus.FORBIDDEN)
    }
    return this.labResultsService.update(id, updateLabResultDto);
  }

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number) {
    const doctorInChargeForExamination = await this.labResultsService.findDoctorByLabResultId(id);
    if (req.user.email != doctorInChargeForExamination.doctorEmail) {
      throw new HttpException('You are not allowed to delete lab result.', 
                                HttpStatus.FORBIDDEN)
    }
    return this.labResultsService.remove(id);
  }
}

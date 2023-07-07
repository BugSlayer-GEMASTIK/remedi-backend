import { Controller, Get, Post, Body, Query, Param, Delete, Req, HttpException, HttpStatus } from '@nestjs/common';
import { AllergiesService } from './allergies.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('medicine/allergy')
export class AllergiesController {
  constructor(private readonly allergiesService: AllergiesService) {}

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createAllergyDto: CreateAllergyDto) {
    return this.allergiesService.create(createAllergyDto);
  }

  @Roles("DOCTOR", "PATIENT")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':email')
  findByEmail(@Req() req, @Param('email') email: string) {
    if (req.user.role == "PATIENT" && req.user.email != email){
      throw new HttpException('You are not allowed to see another person\'s allergies', 
                                HttpStatus.FORBIDDEN)
    }
    return this.allergiesService.findByEmail(email);
  }

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('query?')
  remove(@Query('email') email: string,
         @Query('medicine') medicineId: number) {
    return this.allergiesService.remove(email, medicineId);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TreatmentCategoriesService } from './treatment-categories.service';
import { CreateTreatmentCategoryDto } from './dto/create-treatment-category.dto';
import { UpdateTreatmentCategoryDto } from './dto/update-treatment-category.dto';
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('treatment/category')
export class TreatmentCategoriesController {
  constructor(private readonly treatmentCategoriesService: TreatmentCategoriesService) {}

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createTreatmentCategoryDto: CreateTreatmentCategoryDto) {
    return this.treatmentCategoriesService.create(createTreatmentCategoryDto);
  }

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.treatmentCategoriesService.findAll();
  }

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTreatmentCategoryDto: UpdateTreatmentCategoryDto) {
    return this.treatmentCategoriesService.update(id, updateTreatmentCategoryDto);
  }

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.treatmentCategoriesService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LabResultCategoriesService } from './lab-result-categories.service';
import { CreateLabResultCategoryDto } from './dto/create-lab-result-category.dto';
import { UpdateLabResultCategoryDto } from './dto/update-lab-result-category.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('lab-result-categories')
export class LabResultCategoriesController {
  constructor(
    private readonly labResultCategoriesService: LabResultCategoriesService,
  ) {}

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createLabResultCategoryDto: CreateLabResultCategoryDto) {
    return this.labResultCategoriesService.create(createLabResultCategoryDto);
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.labResultCategoriesService.findAll();
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateLabResultCategoryDto: UpdateLabResultCategoryDto,
  ) {
    return this.labResultCategoriesService.update(
      id,
      updateLabResultCategoryDto,
    );
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.labResultCategoriesService.remove(id);
  }
}

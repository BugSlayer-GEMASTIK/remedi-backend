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

@Controller('lab/result')
export class LabResultCategoriesController {
  constructor(
    private readonly labResultCategoriesService: LabResultCategoriesService,
  ) {}

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() createLabResultCategoryDto: CreateLabResultCategoryDto) {
    return await this.labResultCategoriesService.create(createLabResultCategoryDto);
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAll() {
    return await this.labResultCategoriesService.findAll();
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLabResultCategoryDto: UpdateLabResultCategoryDto,
  ) {
    return await this.labResultCategoriesService.update(
      id,
      updateLabResultCategoryDto,
    );
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.labResultCategoriesService.remove(id);
  }
}

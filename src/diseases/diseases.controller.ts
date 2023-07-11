import { Controller, Get, Post, Body, Patch, Query, Param, Delete } from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('disease')
export class DiseasesController {
  constructor(private readonly diseasesService: DiseasesService) {}

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createDiseaseDto: CreateDiseaseDto) {
    return this.diseasesService.create(createDiseaseDto);
  }

  @Get()
  findAll() {
    return this.diseasesService.findAll();
  }

  @Get("query?")
  findByCategory(@Query('category') category: string) {
    return this.diseasesService.findByCategory(category);
  }

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDiseaseDto: UpdateDiseaseDto) {
    return this.diseasesService.update(id, updateDiseaseDto);
  }

  @Roles("DOCTOR")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.diseasesService.remove(id);
  }
}

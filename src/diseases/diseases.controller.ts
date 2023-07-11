import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ResponseUtil } from 'src/common/utils/response.util';

@Controller('disease')
export class DiseasesController {
  constructor(
    private readonly diseasesService: DiseasesService,
    private responseUtil: ResponseUtil,
  ) {}

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() createDiseaseDto: CreateDiseaseDto) {
    const disease = await this.diseasesService.create(createDiseaseDto);
    return this.responseUtil.response(
      { responseMessage: 'Disease created successfully' },
      { disease },
    );
  }

  @Get()
  async findAll() {
    const diseases = await this.diseasesService.findAll();
    return this.responseUtil.response({}, { diseases });
  }

  @Get('query?')
  async findByCategory(@Query('category') category: string) {
    const diseases = await this.diseasesService.findByCategory(category);
    return this.responseUtil.response({}, { diseases });
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDiseaseDto: UpdateDiseaseDto,
  ) {
    const updatedDisease = await this.diseasesService.update(
      id,
      updateDiseaseDto,
    );
    return this.responseUtil.response(
      { responseMessage: 'Disease updated successfully' },
      { updatedDisease },
    );
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.diseasesService.remove(id);
    return this.responseUtil.response({
      responseMessage: 'Disease deleted successfully',
    });
  }
}

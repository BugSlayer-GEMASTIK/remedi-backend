import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AllergiesService } from './allergies.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ResponseUtil } from 'src/common/utils/response.util';

@Controller('medicine/allergy')
export class AllergiesController {
  constructor(
    private readonly allergiesService: AllergiesService,
    private responseUtil: ResponseUtil,
  ) {}

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() createAllergyDto: CreateAllergyDto) {
    const allergy = await this.allergiesService.create(createAllergyDto);
    return this.responseUtil.response(
      {
        responseMessage: 'Successfully created allergy',
        responseCode: HttpStatus.CREATED,
      },
      { allergy },
    );
  }

  @Roles('DOCTOR', 'PATIENT')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':email')
  async findByEmail(@Req() req, @Param('email') email: string) {
    if (req.user.role == 'PATIENT' && req.user.email != email) {
      throw new HttpException(
        "You are not allowed to see another person's allergies",
        HttpStatus.FORBIDDEN,
      );
    }
    const allergies = await this.allergiesService.findByEmail(email);
    return this.responseUtil.response({}, { allergies });
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('query?')
  async remove(
    @Query('email') email: string,
    @Query('medicine') medicineId: number,
  ) {
    await this.allergiesService.remove(email, medicineId);
    return this.responseUtil.response({
      responseMessage: 'Successfully deleted allergy',
    });
  }
}

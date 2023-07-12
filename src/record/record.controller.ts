import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecordService } from './record.service';
import {
  CreateRecordDTO,
  GetAllRecordsQuery,
  UpdateRecordDTO,
} from './record.DTO';
import { ResponseUtil } from 'src/common/utils/response.util';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('record')
export class RecordController {
  constructor(
    private recordService: RecordService,
    private responseUtil: ResponseUtil,
  ) {}

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createRecord(@Body() createRecordDTO: CreateRecordDTO) {
    const createdRecord = await this.recordService.createRecord(
      createRecordDTO,
    );
    return this.responseUtil.response(
      {
        responseMessage: 'Successfully created record',
        responseCode: HttpStatus.CREATED,
      },
      { createdRecord },
    );
  }

  @Roles('DOCTOR', 'PATIENT')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllRecords(@Query() query: GetAllRecordsQuery, @Req() req) {
    const email = req.user.email;
    const role = req.user.role;
    const records = await this.recordService.getAllRecords(query, email, role);
    return this.responseUtil.response({}, { records });
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('/')
  @HttpCode(HttpStatus.OK)
  async updateRecord(@Body() updateRecordDTO: UpdateRecordDTO, @Req() req) {
    const currenDoctorEmail = req.user.email;
    const updatedRecord = await this.recordService.updateRecord(
      updateRecordDTO,
      currenDoctorEmail,
    );
    return this.responseUtil.response(
      {
        responseMessage: 'Successfully updated record',
      },
      { updatedRecord },
    );
  }

  @Roles('DOCTOR', 'PATIENT')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/patient')
  @HttpCode(HttpStatus.OK)
  async getAllPatientRecords(@Query('email') email: string) {
    const records = await this.recordService.getAllPatientRecords(email);
    return this.responseUtil.response({}, { records });
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/doctor')
  @HttpCode(HttpStatus.OK)
  async getAllDoctorRecords(@Req() req) {
    const records = await this.recordService.getAllDoctorRecords(
      req.user.email,
    );
    return this.responseUtil.response({}, { records });
  }

  @Roles('DOCTOR', 'PATIENT')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getRecordById(@Param('id') id: number) {
    const record = await this.recordService.getRecordById(id);
    return this.responseUtil.response({}, { record });
  }

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteRecordById(@Param('id') id: number, @Req() req) {
    const doctorEmail = req.user.email;
    await this.recordService.deleteRecordById(id, doctorEmail);
    return this.responseUtil.response({
      responseMessage: 'Successfully deleted record',
    });
  }
}

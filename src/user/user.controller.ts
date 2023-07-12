import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseUtil } from 'src/common/utils/response.util';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private responseUtil: ResponseUtil,
  ) {}

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/patient')
  @HttpCode(HttpStatus.OK)
  async getAllPatients() {
    const patients = await this.userService.getAllPatients();
    return this.responseUtil.response({}, { patients });
  }
}

import {
  HttpStatus,
  Controller,
  Res,
  Body,
  Post,
  Req,
  Get,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { ProfileDto } from './dto/profile.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';
import { RoleGuard } from './role/role.guard';
import { Roles } from './roles/roles.decorator';
import { ResponseUtil } from 'src/common/utils/response.util';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private responseUitl: ResponseUtil,
  ) {}

  @Roles('DOCTOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async profile(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(req.user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
    try {
      const response = await this.authService.authenticate(authenticateDto);
      return this.responseUitl.response(
        { responseMessage: 'Successfully logged in' },
        { ...response },
      );
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res() res, @Body() profileDto: ProfileDto) {
    try {
      await this.authService.register(profileDto);
      return this.responseUitl.response({
        responseCode: HttpStatus.CREATED,
        responseMessage: `Email ${profileDto.email} is successfully registered`,
      });
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }
}

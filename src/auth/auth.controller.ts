import { HttpStatus, Controller, Res, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { ProfileDto } from './dto/profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
    try {
      const response = await this.authService.authenticate(authenticateDto);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  @Post('register')
  async register(@Res() res, @Body() profileDto: ProfileDto) {
    try {
      await this.authService.register(profileDto);
      return res.status(HttpStatus.OK).json({
        message: `Email ${profileDto.email} is successfully registered`,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status).json(error.response);
    }
  }
}

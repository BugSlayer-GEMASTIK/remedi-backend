import { HttpStatus, Controller, Res, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { ProfileDto } from './dto/profile.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
        try {
            const response = this.authService.authenticate(authenticateDto);
            return res.status(HttpStatus.OK).json({ response });
        } catch (error) {
            return res.status(error.status).json(error.response);
        }
    } 

    @Post('register')
    register(@Res() res, @Body() profileDto: ProfileDto) {
        try {
            this.authService.register(profileDto);
            return res.status(HttpStatus.OK).json({ 'message': `Email ${profileDto.email} is successfully registered` });
        } catch (error) {
            return res.status(error.status).json(error.response);
        }
    }
}

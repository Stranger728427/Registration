import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { access_token, user } = await this.authService.login(loginUserDto);

    // Set the JWT token as a cookie
    res.cookie('jwt', access_token, { httpOnly: true, secure: false }); // Set secure to true in production

    return res.status(HttpStatus.OK).json({
      message: 'Login successful',
      user: user,
    });
  }
}

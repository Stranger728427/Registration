// src/users/users.controller.ts

import { Body, Controller, Post, BadRequestException, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { LoginUserDto } from '../users/dto/login.dto';
// import { MailgunService } from 'src/mailgun/mailgun.service';
import { response } from 'express';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    // private readonly mailgunService: MailgunService,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      
      const user = await this.usersService.createUser(createUserDto);

     
      if (!user) {
        throw new Error('User registration failed');
      }

      // Generate the verification link
      // const verificationLink = `http://localhost:4000/verify?token=${user.verificationToken}`;

      // Send the verification email
      // await this.mailgunService.sendEmail(
      //   user.email,
      //   'Verify your email',
      //   `Please click the link to verify your email: ${verificationLink}`,
      //   `<p>Please click the link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`
      // );

      return {
        message: 'Registration successful. Please check your email for verification link.',
        userId: user.id,
        email: user.email
      };
    } catch (error) {
      throw new BadRequestException(error.message); // Throw a BadRequestException with the error message
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
     
      const user = await this.usersService.validateUser(loginUserDto.email, loginUserDto.password);

      if (!user) {
        throw new Error('Invalid credentials');
      }

       // Generate JWT token
       const token = await this.authService.generateJwtToken(user.id, user.email);

       // Set cookie with JWT token
       response.cookie('jwt', token, {
         httpOnly: true,
         sameSite: 'strict',
         
       });
 

    
      return {
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          token:token
        }
      };
    } catch (error) {
      throw new BadRequestException(error.message); 
    }
  }
}

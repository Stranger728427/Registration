import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
 // Adjust path as per your project structure

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService, // Inject UsersService for user validation
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // Implement additional logic to validate user based on the payload
    const { userId, email } = payload;
    
    // Example: Check if the user exists in the database
    const user = await this.usersService.findById(userId); // Example method in UsersService

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    // You can return additional user information if needed
    return { userId: user.id, email: user.email };
  }
}

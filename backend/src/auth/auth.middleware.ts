// import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { UsersService } from '../users/users.service';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private readonly usersService: UsersService) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     const userId = req.user['userId']; // Assuming userId is set by JwtStrategy

//     // Fetch user from DB
//     const user = await this.usersService.findById(userId);

//     if (!user) {
//       throw new UnauthorizedException('Unauthorized access');
//     }

//     // Attach user object to request for downstream use
//     req['user'] = user;
//     next();
//   }
// }

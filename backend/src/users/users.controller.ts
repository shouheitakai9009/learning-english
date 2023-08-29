import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { Public } from 'src/factory/public';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('get')
  @UseGuards(AuthGuard)
  async get(@Req() req) {
    return this.userService.findUniqueByWhenUnAuthorized(req.user.username);
  }

  @Post('create')
  @Public()
  async create(
    @Res() res: Response,
    @Body('email') email: User['email'],
    @Body('password') password: User['password'],
    @Body('nickname') nickname: User['nickname'],
  ) {
    const user = await this.userService.create(email, password, nickname);
    if (!user) {
      return res.status(409).json({ message: `${email} already exists` });
    }
    return res.status(200).json(user);
  }
}

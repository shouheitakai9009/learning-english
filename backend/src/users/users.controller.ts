import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('get')
  @UseGuards(AuthGuard)
  async get() {
    return this.userService.findUniqueByWhenUnAuthorized('nana7.yu@gmail.com');
  }
}

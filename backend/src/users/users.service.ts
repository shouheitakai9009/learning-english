import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUniqueByWhenUnAuthorized(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUniqueByWhenAuthorized(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}

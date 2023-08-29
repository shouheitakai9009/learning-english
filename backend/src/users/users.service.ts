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

  async create(email: string, password: string, nickname: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      const newUser = await this.prisma.user.create({
        data: {
          email,
          password,
          nickname,
        },
      });
      return newUser;
    }
    return null;
  }
}

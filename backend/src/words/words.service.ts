import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WordsService {
  constructor(private prisma: PrismaService) {}

  async findWords(params: { where: Prisma.WordWhereInput }) {
    return this.prisma.word.findMany({
      where: params.where,
      take: 100,
      include: { partOfSpeech: true },
    });
  }
}

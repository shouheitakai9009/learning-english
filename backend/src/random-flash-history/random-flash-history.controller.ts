import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RandomFlashHistory, Word } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma.service';

export type HistoryWithWord = RandomFlashHistory & {
  word: Word;
};

@Controller('random-flash-history')
export class RandomFlashHistoryController {
  constructor(private prismaService: PrismaService) {}

  @UseGuards(AuthGuard)
  @Get('histories')
  async histories(@Request() req) {
    return await this.prismaService.randomFlashHistory.findMany({
      where: { userId: req.user.sub },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { word: true },
    });
  }

  @UseGuards(AuthGuard)
  @Post('answer')
  async answer(
    @Request() req,
    @Body('wordId') wordId: RandomFlashHistory['wordId'],
    @Body('success') success: RandomFlashHistory['success'],
    @Body('text') text?: RandomFlashHistory['text'],
  ) {
    const existHistories = await this.prismaService.randomFlashHistory.findMany(
      {
        where: { wordId, userId: req.user.sub },
      },
    );
    if (existHistories.length > 0) {
      await existHistories.forEach(async (history) => {
        await this.prismaService.randomFlashHistory.deleteMany({
          where: { id: history.id },
        });
      });
    }
    return await this.prismaService.randomFlashHistory.create({
      data: {
        wordId,
        userId: req.user.sub,
        success,
        text,
      },
    });
  }
}

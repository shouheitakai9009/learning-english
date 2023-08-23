import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PartOfSpeech } from '@prisma/client';
import { Public } from '../factory/public';

@Controller('part-of-speeches')
export class PartOfSpeechesController {
  constructor(private prismaService: PrismaService) {}

  @Public()
  @Get()
  async all(): Promise<PartOfSpeech[]> {
    return this.prismaService.partOfSpeech.findMany();
  }
}

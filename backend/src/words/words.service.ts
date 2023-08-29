import { Injectable } from '@nestjs/common';
import { PrismaArgsType, PrismaService } from '../prisma.service';
import {
  Definition,
  PartOfSpeech,
  RandomFlashHistory,
  Synonym,
  Word,
} from '@prisma/client';

export type WordWithRandomFlash = Word & {
  definitions: Definition[];
  partOfSpeech: PartOfSpeech;
  synonyms: Synonym[];
  randomFlashHistories: RandomFlashHistory[];
};

@Injectable()
export class WordsService {
  constructor(private prisma: PrismaService) {}

  async findWords(args: PrismaArgsType): Promise<WordWithRandomFlash[]> {
    return await this.prisma.word.findMany({
      take: 100,
      include: {
        partOfSpeech: true,
        definitions: true,
        synonyms: true,
        randomFlashHistories: true,
      },
      ...args,
    });
  }
}

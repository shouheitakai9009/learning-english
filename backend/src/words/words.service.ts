import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Definition, PartOfSpeech, Prisma, Word } from '@prisma/client';

export type WordWithDefinitionAndPartOfSpeechType = Word & {
  definitions: Definition[];
  partOfSpeech: PartOfSpeech;
};

@Injectable()
export class WordsService {
  constructor(private prisma: PrismaService) {}

  async findWords(params: {
    where: Prisma.WordWhereInput;
  }): Promise<WordWithDefinitionAndPartOfSpeechType[]> {
    return await this.prisma.word.findMany({
      where: params.where,
      take: 100,
      include: { partOfSpeech: true, definitions: true },
    });
  }
}

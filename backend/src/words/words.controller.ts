import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { WordWithRandomFlash, WordsService } from './words.service';
import { PartOfSpeech } from '@prisma/client';
import { Public } from '../factory/public';
import { AuthGuard } from 'src/auth/auth.guard';

export interface IFindWordRequestParams {
  japaneseWord?: string;
  englishWord?: string;
  partOfSpeechIds?: PartOfSpeech['id'][];
}

@Controller('words')
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Public()
  @Get('search')
  public async search(
    @Query('englishWord') englishWord?: IFindWordRequestParams['englishWord'],
    @Query('japaneseWord')
    japaneseWord?: IFindWordRequestParams['japaneseWord'],
    @Query('partOfSpeechIds')
    partOfSpeechIds?: IFindWordRequestParams['partOfSpeechIds'],
  ): Promise<WordWithRandomFlash[]> {
    return this.wordsService.findWords({
      where: {
        word: { contains: englishWord },
        partOfSpeechId: { in: partOfSpeechIds },
        definitions: { some: { definitionJp: { startsWith: japaneseWord } } },
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get('random-flash')
  public async randomFlash(@Req() req): Promise<WordWithRandomFlash[]> {
    return this.wordsService.findWords({
      take: 10,
      where: {
        OR: [
          {
            randomFlashHistories: {
              none: {
                id: undefined,
              },
            },
          },
          {
            randomFlashHistories: {
              some: {
                success: false,
                userId: req.user.sub,
              },
            },
          },
        ],
        AND: [
          {
            definitions: {
              some: {},
            },
          },
        ],
      },
    });
  }
}

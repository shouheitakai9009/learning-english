import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  WordWithDefinitionAndPartOfSpeechType,
  WordsService,
} from './words.service';
import { PartOfSpeech } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

export interface IFindWordRequestParams {
  japaneseWord?: string;
  englishWord?: string;
  partOfSpeechIds?: PartOfSpeech['id'][];
}

@Controller('words')
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @UseGuards(AuthGuard)
  @Get()
  public async find(
    @Query('englishWord') englishWord?: IFindWordRequestParams['englishWord'],
    @Query('japaneseWord')
    japaneseWord?: IFindWordRequestParams['japaneseWord'],
    @Query('partOfSpeechIds')
    partOfSpeechIds?: IFindWordRequestParams['partOfSpeechIds'],
  ): Promise<WordWithDefinitionAndPartOfSpeechType[]> {
    return this.wordsService.findWords({
      where: {
        word: { contains: englishWord },
        partOfSpeechId: { in: partOfSpeechIds },
        definitions: { some: { definitionJp: { startsWith: japaneseWord } } },
      },
    });
  }
}

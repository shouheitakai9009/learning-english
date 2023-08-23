import { Test, TestingModule } from '@nestjs/testing';
import { PartOfSpeechesController } from './part-of-speeches.controller';

describe('PartOfSpeechesController', () => {
  let controller: PartOfSpeechesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartOfSpeechesController],
    }).compile();

    controller = module.get<PartOfSpeechesController>(PartOfSpeechesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

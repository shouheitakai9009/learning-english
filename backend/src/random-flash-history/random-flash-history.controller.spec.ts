import { Test, TestingModule } from '@nestjs/testing';
import { RandomFlashHistoryController } from './random-flash-history.controller';

describe('RandomFlashHistoryController', () => {
  let controller: RandomFlashHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RandomFlashHistoryController],
    }).compile();

    controller = module.get<RandomFlashHistoryController>(RandomFlashHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

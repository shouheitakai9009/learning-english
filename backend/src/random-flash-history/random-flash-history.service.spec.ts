import { Test, TestingModule } from '@nestjs/testing';
import { RandomFlashHistoryService } from './random-flash-history.service';

describe('RandomFlashHistoryService', () => {
  let service: RandomFlashHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomFlashHistoryService],
    }).compile();

    service = module.get<RandomFlashHistoryService>(RandomFlashHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

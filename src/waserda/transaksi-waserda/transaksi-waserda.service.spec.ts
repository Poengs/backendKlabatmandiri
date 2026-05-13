import { Test, TestingModule } from '@nestjs/testing';
import { TransaksiWaserdaService } from './transaksi-waserda.service';

describe('TransaksiWaserdaService', () => {
  let service: TransaksiWaserdaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransaksiWaserdaService],
    }).compile();

    service = module.get<TransaksiWaserdaService>(TransaksiWaserdaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

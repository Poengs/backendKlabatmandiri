import { Test, TestingModule } from '@nestjs/testing';
import { TransaksiKoperasiService } from './transaksi-koperasi.service';

describe('TransaksiKoperasiService', () => {
  let service: TransaksiKoperasiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransaksiKoperasiService],
    }).compile();

    service = module.get<TransaksiKoperasiService>(TransaksiKoperasiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

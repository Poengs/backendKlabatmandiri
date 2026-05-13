import { Test, TestingModule } from '@nestjs/testing';
import { DetailTransaksiWaserdaService } from './detail-transaksi-waserda.service';

describe('DetailTransaksiWaserdaService', () => {
  let service: DetailTransaksiWaserdaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailTransaksiWaserdaService],
    }).compile();

    service = module.get<DetailTransaksiWaserdaService>(DetailTransaksiWaserdaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

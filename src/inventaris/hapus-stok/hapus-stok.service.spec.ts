import { Test, TestingModule } from '@nestjs/testing';
import { HapusStokService } from './hapus-stok.service';

describe('HapusStokService', () => {
  let service: HapusStokService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HapusStokService],
    }).compile();

    service = module.get<HapusStokService>(HapusStokService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

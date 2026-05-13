import { Test, TestingModule } from '@nestjs/testing';
import { TambahStokService } from './tambah-stok.service';

describe('TambahStokService', () => {
  let service: TambahStokService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TambahStokService],
    }).compile();

    service = module.get<TambahStokService>(TambahStokService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

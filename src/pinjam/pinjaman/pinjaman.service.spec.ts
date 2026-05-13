import { Test, TestingModule } from '@nestjs/testing';
import { PinjamanService } from './pinjaman.service';

describe('PinjamanService', () => {
  let service: PinjamanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinjamanService],
    }).compile();

    service = module.get<PinjamanService>(PinjamanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

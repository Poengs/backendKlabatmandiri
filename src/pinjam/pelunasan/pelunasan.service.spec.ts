import { Test, TestingModule } from '@nestjs/testing';
import { PelunasanService } from './pelunasan.service';

describe('PelunasanService', () => {
  let service: PelunasanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PelunasanService],
    }).compile();

    service = module.get<PelunasanService>(PelunasanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

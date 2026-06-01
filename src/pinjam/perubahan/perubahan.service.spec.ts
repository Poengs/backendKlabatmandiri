import { Test, TestingModule } from '@nestjs/testing';
import { PerubahanService } from './perubahan.service';

describe('PerubahanService', () => {
  let service: PerubahanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerubahanService],
    }).compile();

    service = module.get<PerubahanService>(PerubahanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PermohonanService } from './permohonan.service';

describe('PermohonanService', () => {
  let service: PermohonanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermohonanService],
    }).compile();

    service = module.get<PermohonanService>(PermohonanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

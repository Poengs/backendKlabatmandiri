import { Test, TestingModule } from '@nestjs/testing';
import { PermohonanController } from './permohonan.controller';
import { PermohonanService } from './permohonan.service';

describe('PermohonanController', () => {
  let controller: PermohonanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermohonanController],
      providers: [PermohonanService],
    }).compile();

    controller = module.get<PermohonanController>(PermohonanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

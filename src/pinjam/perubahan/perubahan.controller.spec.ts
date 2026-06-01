import { Test, TestingModule } from '@nestjs/testing';
import { PerubahanController } from './perubahan.controller';
import { PerubahanService } from './perubahan.service';

describe('PerubahanController', () => {
  let controller: PerubahanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerubahanController],
      providers: [PerubahanService],
    }).compile();

    controller = module.get<PerubahanController>(PerubahanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PelunasanController } from './pelunasan.controller';
import { PelunasanService } from './pelunasan.service';

describe('PelunasanController', () => {
  let controller: PelunasanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PelunasanController],
      providers: [PelunasanService],
    }).compile();

    controller = module.get<PelunasanController>(PelunasanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

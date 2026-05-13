import { Test, TestingModule } from '@nestjs/testing';
import { PinjamanController } from './pinjaman.controller';
import { PinjamanService } from './pinjaman.service';

describe('PinjamanController', () => {
  let controller: PinjamanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PinjamanController],
      providers: [PinjamanService],
    }).compile();

    controller = module.get<PinjamanController>(PinjamanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

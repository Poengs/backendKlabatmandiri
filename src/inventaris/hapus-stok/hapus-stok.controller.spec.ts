import { Test, TestingModule } from '@nestjs/testing';
import { HapusStokController } from './hapus-stok.controller';
import { HapusStokService } from './hapus-stok.service';

describe('HapusStokController', () => {
  let controller: HapusStokController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HapusStokController],
      providers: [HapusStokService],
    }).compile();

    controller = module.get<HapusStokController>(HapusStokController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TambahStokController } from './tambah-stok.controller';
import { TambahStokService } from './tambah-stok.service';

describe('TambahStokController', () => {
  let controller: TambahStokController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TambahStokController],
      providers: [TambahStokService],
    }).compile();

    controller = module.get<TambahStokController>(TambahStokController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

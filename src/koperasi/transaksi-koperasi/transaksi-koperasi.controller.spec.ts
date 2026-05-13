import { Test, TestingModule } from '@nestjs/testing';
import { TransaksiKoperasiController } from './transaksi-koperasi.controller';
import { TransaksiKoperasiService } from './transaksi-koperasi.service';

describe('TransaksiKoperasiController', () => {
  let controller: TransaksiKoperasiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransaksiKoperasiController],
      providers: [TransaksiKoperasiService],
    }).compile();

    controller = module.get<TransaksiKoperasiController>(TransaksiKoperasiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

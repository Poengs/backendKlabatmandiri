import { Test, TestingModule } from '@nestjs/testing';
import { DetailTransaksiWaserdaController } from './detail-transaksi-waserda.controller';
import { DetailTransaksiWaserdaService } from './detail-transaksi-waserda.service';

describe('DetailTransaksiWaserdaController', () => {
  let controller: DetailTransaksiWaserdaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailTransaksiWaserdaController],
      providers: [DetailTransaksiWaserdaService],
    }).compile();

    controller = module.get<DetailTransaksiWaserdaController>(DetailTransaksiWaserdaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

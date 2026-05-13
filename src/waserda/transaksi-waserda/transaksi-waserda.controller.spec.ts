import { Test, TestingModule } from '@nestjs/testing';
import { TransaksiWaserdaController } from './transaksi-waserda.controller';
import { TransaksiWaserdaService } from './transaksi-waserda.service';

describe('TransaksiWaserdaController', () => {
  let controller: TransaksiWaserdaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransaksiWaserdaController],
      providers: [TransaksiWaserdaService],
    }).compile();

    controller = module.get<TransaksiWaserdaController>(TransaksiWaserdaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

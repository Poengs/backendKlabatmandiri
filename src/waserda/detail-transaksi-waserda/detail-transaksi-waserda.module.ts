import { Module } from '@nestjs/common';
import { DetailTransaksiWaserdaService } from './detail-transaksi-waserda.service';
import { DetailTransaksiWaserdaController } from './detail-transaksi-waserda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailTransaksiWaserda } from './entities/detail-transaksi-waserda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailTransaksiWaserda])],
  controllers: [DetailTransaksiWaserdaController],
  providers: [DetailTransaksiWaserdaService],
  exports: [DetailTransaksiWaserdaService]
})

export class DetailTransaksiWaserdaModule {}


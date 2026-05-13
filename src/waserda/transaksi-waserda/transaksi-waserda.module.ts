import { Module } from '@nestjs/common';
import { TransaksiWaserdaService } from './transaksi-waserda.service';
import { TransaksiWaserdaController } from './transaksi-waserda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaksiWaserda } from './entities/transaksi-waserda.entity';
import { StokModule } from 'src/inventaris/stok/stok.module';
import { DetailTransaksiWaserdaModule } from '../detail-transaksi-waserda/detail-transaksi-waserda.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransaksiWaserda]),
    StokModule,
    DetailTransaksiWaserdaModule
  ],
  controllers: [TransaksiWaserdaController],
  providers: [TransaksiWaserdaService],
})
export class TransaksiWaserdaModule {}

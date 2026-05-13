import { Module } from '@nestjs/common';
import { TokoService } from './toko.service';
import { TokoController } from './toko.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Toko } from './entities/toko.entity';
import { Stok } from 'src/inventaris/stok/entities/stok.entity';
import { Karyawan } from 'src/koperasi/karyawan/entities/karyawan.entity';
import { TransaksiWaserda } from 'src/waserda/transaksi-waserda/entities/transaksi-waserda.entity';
import { TambahStok } from 'src/inventaris/tambah-stok/entities/tambah-stok.entity';


@Module({
  imports: [TypeOrmModule.forFeature([
    Toko,
    Stok,
    Karyawan,
    TransaksiWaserda,
    TambahStok
  ])],
  controllers: [TokoController],
  providers: [TokoService],
  exports: [TokoService]
})
export class TokoModule {}


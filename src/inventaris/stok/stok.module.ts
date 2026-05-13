import { Module } from '@nestjs/common';
import { StokService } from './stok.service';
import { StokController } from './stok.controller';
import { Stok } from './entities/stok.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produk } from 'src/inventaris/produk/entities/produk.entity';
import { Toko } from 'src/koperasi/toko/entities/toko.entity';
import { DetailTransaksiWaserda } from 'src/waserda/detail-transaksi-waserda/entities/detail-transaksi-waserda.entity';
import { HapusStok } from 'src/inventaris/hapus-stok/entities/hapus-stok.entity';
import { TambahStok } from 'src/inventaris/tambah-stok/entities/tambah-stok.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Stok,
    HapusStok,
    Produk,
    Toko,
    DetailTransaksiWaserda,
    TambahStok
  ])],
  controllers: [StokController],
  providers: [StokService],
  exports: [StokService]
})
export class StokModule {}

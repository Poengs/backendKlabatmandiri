import { Module } from '@nestjs/common';
import { TransaksiKoperasiService } from './transaksi-koperasi.service';
import { TransaksiKoperasiController } from './transaksi-koperasi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaksiKoperasi } from './entities/transaksi-koperasi.entity';
import { TambahStok } from 'src/inventaris/tambah-stok/entities/tambah-stok.entity';
import { Karyawan } from 'src/koperasi/karyawan/entities/karyawan.entity';
import { TokoModule } from '../toko/toko.module';
import { ProdukModule } from 'src/inventaris/produk/produk.module';
import { StokModule } from 'src/inventaris/stok/stok.module';
import { TambahStokModule } from 'src/inventaris/tambah-stok/tambah-stok.module';


@Module({
    imports: [TypeOrmModule.forFeature([
      TransaksiKoperasi,
      TambahStok,
      Karyawan
    ]),
    TokoModule,
    ProdukModule,
    StokModule,
    TambahStokModule
  ],
  controllers: [TransaksiKoperasiController],
  providers: [TransaksiKoperasiService],
})
export class TransaksiKoperasiModule {}

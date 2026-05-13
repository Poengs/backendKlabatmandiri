import { Module } from '@nestjs/common';
import { TambahStokService } from './tambah-stok.service';
import { TambahStokController } from './tambah-stok.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TambahStok } from './entities/tambah-stok.entity';
import { Stok } from 'src/inventaris/stok/entities/stok.entity';
import { TransaksiKoperasi } from 'src/koperasi/transaksi-koperasi/entities/transaksi-koperasi.entity';
import { Toko } from 'src/koperasi/toko/entities/toko.entity';
import { Karyawan } from 'src/koperasi/karyawan/entities/karyawan.entity';
import { TokoModule } from 'src/koperasi/toko/toko.module';

@Module({
  imports: [
    // Tambahkan semua entity yang terlibat dalam relasi di sini
    TypeOrmModule.forFeature([
      TambahStok, 
      Stok, 
      TransaksiKoperasi, 
      Toko, 
      Karyawan
    ]),
    TokoModule
  ],
  controllers: [TambahStokController],
  providers: [TambahStokService],
  exports: [TambahStokService]
})
export class TambahStokModule {}
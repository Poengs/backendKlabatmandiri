import { Module } from '@nestjs/common';
import { KaryawanService } from './karyawan.service';
import { KaryawanController } from './karyawan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Karyawan } from './entities/karyawan.entity';
import { Toko } from 'src/koperasi/toko/entities/toko.entity';
import { TransaksiWaserda } from 'src/waserda/transaksi-waserda/entities/transaksi-waserda.entity';
import { HapusStok } from 'src/inventaris/hapus-stok/entities/hapus-stok.entity';
import { TambahStok } from 'src/inventaris/tambah-stok/entities/tambah-stok.entity';
import { TransaksiKoperasi } from 'src/koperasi/transaksi-koperasi/entities/transaksi-koperasi.entity';
import { Permohonan } from 'src/pinjam/permohonan/entities/permohonan.entity';
import { Auth } from 'src/auth/entities/auth.entity';


@Module({
    imports: [TypeOrmModule.forFeature([
      Karyawan,
      Toko,
      TransaksiKoperasi,
      TransaksiWaserda,
      HapusStok,
      TambahStok,
      Permohonan,
      Auth
    ])],
  controllers: [KaryawanController],
  providers: [KaryawanService],
  exports: [KaryawanService]
})
export class KaryawanModule {}

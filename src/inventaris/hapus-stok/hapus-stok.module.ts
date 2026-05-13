import { Module } from '@nestjs/common';
import { HapusStokService } from './hapus-stok.service';
import { HapusStokController } from './hapus-stok.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HapusStok } from 'src/inventaris/hapus-stok/entities/hapus-stok.entity';
import { Stok } from 'src/inventaris/stok/entities/stok.entity';
import { Karyawan } from 'src/koperasi/karyawan/entities/karyawan.entity';
import { StokModule } from '../stok/stok.module';

@Module({
    imports: [TypeOrmModule.forFeature([
      HapusStok,
      Karyawan,
      Stok
    ]),
    StokModule
  ],
  controllers: [HapusStokController],
  providers: [HapusStokService],
})
export class HapusStokModule {}

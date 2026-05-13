import { Module } from '@nestjs/common';
import { PermohonanService } from './permohonan.service';
import { PermohonanController } from './permohonan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permohonan } from './entities/permohonan.entity';
import { Karyawan } from 'src/koperasi/karyawan/entities/karyawan.entity';
import { Pinjaman } from 'src/pinjam/pinjaman/entities/pinjaman.entity';
import { PinjamanModule } from '../pinjaman/pinjaman.module';


@Module({
    imports: [TypeOrmModule.forFeature([
        Permohonan,
        Karyawan,
        Pinjaman
      ]), 
      PinjamanModule  
    ],
    controllers: [PermohonanController],
    providers: [PermohonanService],
})
export class PermohonanModule {}

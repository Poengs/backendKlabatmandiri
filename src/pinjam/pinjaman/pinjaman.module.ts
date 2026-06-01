import { Module } from '@nestjs/common';
import { PinjamanService } from './pinjaman.service';
import { PinjamanController } from './pinjaman.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pinjaman } from './entities/pinjaman.entity';
import { Pelunasan } from 'src/pinjam/perubahan/entities/perubahan.entity';
import { Permohonan } from 'src/pinjam/permohonan/entities/permohonan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pinjaman, Permohonan, Pelunasan]),
  ],
  controllers: [PinjamanController],
  providers: [PinjamanService],
  exports: [PinjamanService]
})
export class PinjamanModule {}

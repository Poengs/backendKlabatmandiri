import { Module } from '@nestjs/common';
import { PelunasanService } from './pelunasan.service';
import { PelunasanController } from './pelunasan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelunasan } from './entities/pelunasan.entity';
import { Pinjaman } from 'src/pinjam/pinjaman/entities/pinjaman.entity';
import { PinjamanModule } from '../pinjaman/pinjaman.module';


@Module({
    imports: [TypeOrmModule.forFeature([
      Pelunasan,
      Pinjaman
    ]),
    PinjamanModule
  ],
  controllers: [PelunasanController],
  providers: [PelunasanService],
})
export class PelunasanModule {}

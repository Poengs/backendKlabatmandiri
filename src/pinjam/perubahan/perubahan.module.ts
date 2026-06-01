import { Module } from '@nestjs/common';
import { PerubahanService } from './perubahan.service';
import { PerubahanController } from './perubahan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perubahan } from './entities/perubahan.entity';
import { PinjamanModule } from '../pinjaman/pinjaman.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Perubahan]),
    PinjamanModule
  ],
  controllers: [PerubahanController],
  providers: [PerubahanService],
})
export class PerubahanModule {}

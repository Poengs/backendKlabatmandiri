import { Module } from '@nestjs/common';
import { PinjamanService } from './pinjaman.service';
import { PinjamanController } from './pinjaman.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pinjaman } from './entities/pinjaman.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pinjaman]),
  ],
  controllers: [PinjamanController],
  providers: [PinjamanService],
  exports: [PinjamanService]
})
export class PinjamanModule {}

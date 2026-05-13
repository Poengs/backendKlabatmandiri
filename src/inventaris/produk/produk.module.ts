import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdukService } from './produk.service';
import { ProdukController } from './produk.controller';
import { Produk } from './entities/produk.entity';
import { Stok } from '../stok/entities/stok.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Produk,
    Stok
  ])],
  controllers: [ProdukController],
  providers: [ProdukService],
  exports: [ProdukService],
})
export class ProdukModule {}

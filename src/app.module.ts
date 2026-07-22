import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdukModule } from './inventaris/produk/produk.module';
import { TokoModule } from './koperasi/toko/toko.module';
import { StokModule } from './inventaris/stok/stok.module';
import { KaryawanModule } from './koperasi/karyawan/karyawan.module';
import { TransaksiWaserdaModule } from './waserda/transaksi-waserda/transaksi-waserda.module';
import { DetailTransaksiWaserdaModule } from './waserda/detail-transaksi-waserda/detail-transaksi-waserda.module';
import { HapusStokModule } from './inventaris/hapus-stok/hapus-stok.module';
import { TransaksiKoperasiModule } from './koperasi/transaksi-koperasi/transaksi-koperasi.module';
import { TambahStokModule } from './inventaris/tambah-stok/tambah-stok.module';
import { AuthModule } from './auth/auth.module';
import { PermohonanModule } from './pinjam/permohonan/permohonan.module';
import { PinjamanModule } from './pinjam/pinjaman/pinjaman.module';
import { PerubahanModule } from './pinjam/perubahan/perubahan.module';

@Module({
  imports: [
    // 1. Load file .env
    ConfigModule.forRoot({ isGlobal: true }),
    // 2. Hubungkan ke PostgreSQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Gunakan migrations untuk production-safe
      logging: process.env.DB_LOGGING === 'true', // Enable untuk debug
    }),
    ProdukModule,
    TokoModule,
    StokModule,
    KaryawanModule,
    TransaksiWaserdaModule,
    DetailTransaksiWaserdaModule,
    HapusStokModule,
    TransaksiKoperasiModule,
    TambahStokModule,
    AuthModule,
    PermohonanModule,
    PinjamanModule,
    PerubahanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

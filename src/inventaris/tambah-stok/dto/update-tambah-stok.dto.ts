import { PartialType } from '@nestjs/mapped-types';
import { CreateTambahStokDto } from './create-tambah-stok.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { UpdateItemTambahStokDto } from 'src/koperasi/transaksi-koperasi/dto/create-transaksi-tambahStok.dto';

export class UpdateTambahStokDto extends UpdateItemTambahStokDto {
}

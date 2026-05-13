import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, Min, IsInt, MaxDate } from 'class-validator';
import { Type } from 'class-transformer';

// 1. Ini adalah Sub-DTO untuk item di dalam array
export class ItemTransaksiDto {
  @IsOptional()
  @IsNumber()
  idProduk: number;

  @IsString()
  @IsNotEmpty()
  namaProduk: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsString()
  keterangan?: string;

  @IsNumber()
  @Min(0)
  hargaJual: number;

  @IsString()
  @IsNotEmpty()
  satuan: string;

  @IsInt()
  @Min(1)
  jumlah: number;

  @IsNumber()
  @Min(0)
  hargaBeli: number;

  @IsNumber()
  idToko: number;
}

// 2. Ini adalah DTO Utama yang digunakan di Controller
export class CreateTransaksiTambahStokDto {
  @IsDateString()
  @MaxDate(new Date(), { message: 'tanggal tidak boleh melebih hari ini'})
  tanggalTransaksi: string;

  @IsString()
  keterangan: string;

  @IsOptional()
  @IsString()
  bukti?: string;

  @IsNumber()
  idKaryawan: string;

  @IsArray()
  @ValidateNested({ each: true }) // Validasi setiap objek di dalam array
  @Type(() => ItemTransaksiDto)    // Beritahu class-transformer untuk menggunakan Sub-DTO
  items: ItemTransaksiDto[];
}

export class UpdateItemTambahStokDto {
  @IsInt()
  @IsOptional()
  jumlah?: number;

  @IsInt()
  @IsOptional()
  hargaBeli?: number;

  @IsInt()
  @IsOptional()
  keterangan?: string;

  
  @IsInt()
  @IsNotEmpty()
  idTambahStok?: number;

  @IsInt()
  @IsNotEmpty()
  idTransaksiKoperasi?: number;
}


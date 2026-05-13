import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateTambahStokDto {
  
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  jumlah: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  hargaBeli: number;

  @IsOptional()
  @IsString()
  keterangan?: string;

  // Kita hanya butuh ID untuk menghubungkan relasi di TypeORM
  @IsNotEmpty()
  @IsInt()
  idStok: number;

  @IsNotEmpty()
  @IsString()
  idKaryawan: string;

  @IsOptional()
  @IsInt()
  idTransaksiKoperasi?: number;
}
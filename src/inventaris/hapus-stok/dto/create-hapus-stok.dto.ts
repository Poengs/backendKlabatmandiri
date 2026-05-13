import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateHapusStokDto {
  @IsNotEmpty()
  @IsString()
  tanggal: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  jumlah: number;

  @IsNotEmpty()
  @IsString()
  alasan: string;

  @IsNotEmpty()
  @IsString()
  keterangan: string;

  @IsNotEmpty()
  @IsInt()
  idStok: number;

  @IsNotEmpty()
  @IsString()
  idKaryawan: string;
}
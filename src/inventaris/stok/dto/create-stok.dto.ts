import { IsNumber, IsString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateStokDto {
  @IsNumber()
  @IsNotEmpty()
  jumlahStok: number;

  @IsString()
  @IsNotEmpty()
  satuan: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  hargaJual: number;

  @IsNumber()
  @IsNotEmpty()
  idProduk: number;

  @IsNumber()
  @IsNotEmpty()
  idToko: number;
}
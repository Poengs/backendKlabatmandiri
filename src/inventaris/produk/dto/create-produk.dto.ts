import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateProdukDto {
  @IsNotEmpty({ message: 'Nama produk tidak boleh kosong' })
  @IsString()
  namaProduk: string;

  @IsOptional()
  @IsString()
  barcode?: string;
}
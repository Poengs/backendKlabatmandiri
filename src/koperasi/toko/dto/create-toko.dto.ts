import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTokoDto {
  @IsString()
  @IsNotEmpty({ message: 'Nama toko tidak boleh kosong' })
  namaToko: string;

  @IsString()
  @IsOptional()
  alamat?: string;
}
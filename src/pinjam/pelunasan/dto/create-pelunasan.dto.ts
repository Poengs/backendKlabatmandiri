import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePelunasanDto {
  @IsNumber()
  @IsNotEmpty({ message: 'ID Pinjaman harus disertakan' })
  idPinjaman: number;
}
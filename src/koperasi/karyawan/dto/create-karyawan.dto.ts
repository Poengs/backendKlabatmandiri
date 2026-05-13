import { Transform } from 'class-transformer';
import { 
  IsString, 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  IsNumber, 
  IsDateString, 
  MinLength,
  Min
} from 'class-validator';

export class CreateKaryawanDto {
  @IsString()
  @IsNotEmpty()
  idKaryawan: string;

  @IsString()
  @IsOptional()
  jabatan?: string;

  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsOptional()
  email?: string;

  @IsNumber()
  @Min(0)
  limit: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;

  @IsString()
  @IsOptional()
  alamat?: string;

  @IsDateString()
  @IsNotEmpty()
  tanggalBergabung: string;

  @Transform(({ value }) => value.toLowerCase()) 
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsNumber()
  @IsOptional()
  tokoId?: number;
}
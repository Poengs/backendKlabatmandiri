import { PartialType } from '@nestjs/mapped-types';
import { CreatePermohonanDto } from './create-permohonan.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePermohonanDto extends PartialType(CreatePermohonanDto) {}

export class updatePermohonanByKaryawanDto {
    @IsNotEmpty()
    @IsNumber()
    idPermohonan: number;

    @IsOptional()
    @IsNumber()
    jumlahPeminjaman?: number;
    
    @IsOptional()
    @IsNumber()
    tenor?: number;

    @IsOptional()
    @IsString()
    keperluan?: string;

    
    @IsOptional()
    @IsString()
    saksi: string;

    @IsOptional()
    @IsString()
    kepalaBagian: string;
}
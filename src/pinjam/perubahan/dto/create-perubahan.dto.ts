import { IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { TenorOption } from '../jenisAksi.enum';

export class CreatePerubahanDto {
    @IsEnum(TenorOption)
    @IsNotEmpty()
    jenisAksi: TenorOption;

    @IsInt()
    @IsNotEmpty()
    idPinjaman: number;

    @IsObject()
    @IsNotEmpty()
    dataPengajuan: Record<string, any>;

    @IsOptional()
    @IsString()
    bukti?: string;
}
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePermohonanDto {
    @IsNotEmpty()
    @IsNumber()
    idPermohonan: number;

    @IsNotEmpty()
    @IsNumber()
    jumlahPinjaman: number;

    @IsNotEmpty()
    @IsNumber()
    Tenor: number;
    
    @IsNotEmpty()
    @IsString()
    keperluan: string;

    @IsNotEmpty()
    @IsString()
    saksi: string;

    @IsNotEmpty()
    @IsString()
    kepalaBagian: string;

    @IsNotEmpty()
    @IsString()
    idPemohon: string;
}

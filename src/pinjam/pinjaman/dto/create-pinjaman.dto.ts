import { IsNumber, IsString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePinjamanDto {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    sisaPokok: number;

    @IsNumber()
    @IsNotEmpty()
    bungaBerlaku: number; // Dalam persen

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    tagihanBulanIni: number;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsNumber()
    @IsNotEmpty()
    idPermohonan: number; 
    // Catatan: Jika ID Permohonan kamu sekarang sudah diubah menjadi string 
    // (mengikuti perubahan idKaryawan), ubah @IsNumber() jadi @IsString()
}
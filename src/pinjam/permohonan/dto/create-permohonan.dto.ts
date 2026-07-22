import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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

//DTO untuk mengisi pinjaman sekalian.
export class CreatePinjamanPermohonanDto {
    // --- Data untuk Permohonan ---

    @IsNotEmpty()
    @IsNumber()
    jumlahPinjaman: number;

    //nomor surat?


    @IsNotEmpty()
    @IsNumber()
    tenor: number; // Disarankan huruf kecil untuk konsistensi penamaan
    
    @IsNotEmpty()
    @IsString()
    keperluan: string;


    @IsNotEmpty()
    @IsDateString()
    tanggalPengajuan: string;

    @IsNotEmpty()
    @IsString()
    persetujuan: string;
    
    @IsNotEmpty()
    @IsDateString()
    tanggalKeputusan: string;

    @IsNotEmpty()
    @IsDateString()
    tanggalPenerimaan: string;

    //bisa saja tidak foto tapi nanti taru keterangannya disini
    @IsNotEmpty()
    @IsString()
    buktiPenerimaan: string;

    @IsNotEmpty()
    @IsString()
    saksi: string;

    @IsNotEmpty()
    @IsString()
    kepalaBagian: string;

    @IsNotEmpty()
    @IsString()
    idPemohon: string;

    @IsNotEmpty()
    @IsString()
    idPenyetuju: string;
    
    @IsNotEmpty()
    @IsString()
    idPemberi: string;
    

    @IsNotEmpty()
    @IsString()
    NomorSurat: string;
    // --- Data Awal untuk Pinjaman ---
    // Beberapa field mungkin di-set default di level service (seperti status 'aktif')
    
    
    @IsNotEmpty()
    @IsNumber()
    sisaPokok: number;

        
    @IsNotEmpty()
    @IsNumber()
    sisaTenor: number;

    @IsNotEmpty()
    @IsNumber()
    bungaBerlaku: number;
    
    @IsOptional()
    @IsNumber()
    tagihanBulanIni: number; // Bisa dihitung di level service
}

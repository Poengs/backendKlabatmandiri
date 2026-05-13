import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class itemTransaksiWaserdaDto {
    @IsNotEmpty()
    @IsNumber()
    idStok: number;

    @IsNotEmpty()
    @IsNumber()
    jumlah: number;

    @IsNotEmpty()
    @IsNumber()
    hargaSatuan: number;
}

export class CreateTransaksiWaserdaDto {
    @IsNotEmpty()
    @IsNumber()
    idToko: number;

    @IsNotEmpty()
    @IsString()
    idKaryawan: string;

    @IsNotEmpty()
    @IsNumber()
    totalHarga: number;

    @IsNotEmpty()
    @IsNumber()
    totalBayar: number;

    @IsNotEmpty()
    @IsString()
    jenisPembayaran: string;

    
      @IsArray()
      @ValidateNested({ each: true }) // Validasi setiap objek di dalam array
      @Type(() => itemTransaksiWaserdaDto)    // Beritahu class-transformer untuk menggunakan Sub-DTO
      items: itemTransaksiWaserdaDto[];
}

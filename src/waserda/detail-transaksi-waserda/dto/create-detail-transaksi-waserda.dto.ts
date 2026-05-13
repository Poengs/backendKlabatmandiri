import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDetailTransaksiWaserdaDto {
    @IsNumber()
    @IsNotEmpty()
    idStok: number;

    @IsNumber()
    @IsNotEmpty()
    jumlah: number;

    @IsNumber()
    @IsNotEmpty()
    HargaSatuan: number;
}

import { IsNumber, IsOptional, IsString,  } from 'class-validator';

export class UpdatedataStokDto {
    @IsOptional()
    @IsNumber()
    harga_jual?: number;

    @IsOptional()
    @IsString()
    satuan?: string;       
}

export class UpdateStokDto {
    
    @IsOptional()
    @IsNumber()
    idProduk?: number;

    @IsOptional()
    @IsNumber()
    idToko?: number;
    
    @IsOptional()
    @IsNumber()
    idStok?: number;

    @IsOptional()
    @IsNumber()
    jumlahStok?: number;
}

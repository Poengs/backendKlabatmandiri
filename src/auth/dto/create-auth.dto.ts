import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()
    @IsString()
    idKaryawan: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

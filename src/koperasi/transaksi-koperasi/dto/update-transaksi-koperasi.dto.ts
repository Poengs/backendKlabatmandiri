import { PartialType } from '@nestjs/mapped-types';
import { CreateTransaksiKoperasiDto } from './create-transaksi-koperasi.dto';

export class UpdateTransaksiKoperasiDto extends PartialType(CreateTransaksiKoperasiDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateTransaksiWaserdaDto } from './create-transaksi-waserda.dto';

export class UpdateTransaksiWaserdaDto extends PartialType(CreateTransaksiWaserdaDto) {}

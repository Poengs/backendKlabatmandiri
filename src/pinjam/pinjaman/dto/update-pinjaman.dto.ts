import { PartialType } from '@nestjs/mapped-types';
import { CreatePinjamanDto } from './create-pinjaman.dto';

export class UpdatePinjamanDto extends PartialType(CreatePinjamanDto) {}

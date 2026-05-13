import { PartialType } from '@nestjs/mapped-types';
import { CreateHapusStokDto } from './create-hapus-stok.dto';

export class UpdateHapusStokDto extends PartialType(CreateHapusStokDto) {}

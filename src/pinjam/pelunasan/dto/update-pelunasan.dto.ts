import { PartialType } from '@nestjs/mapped-types';
import { CreatePelunasanDto } from './create-pelunasan.dto';

export class UpdatePelunasanDto extends PartialType(CreatePelunasanDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreatePerubahanDto } from './create-perubahan.dto';

export class UpdatePerubahanDto extends PartialType(CreatePerubahanDto) {}

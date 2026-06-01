import { Module } from '@nestjs/common';
import { PerubahanService } from './perubahan.service';
import { PerubahanController } from './perubahan.controller';

@Module({
  controllers: [PerubahanController],
  providers: [PerubahanService],
})
export class PerubahanModule {}

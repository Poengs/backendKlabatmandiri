import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerubahanService } from './perubahan.service';
import { CreatePerubahanDto } from './dto/create-perubahan.dto';
import { UpdatePerubahanDto } from './dto/update-perubahan.dto';

@Controller('perubahan')
export class PerubahanController {
  constructor(private readonly perubahanService: PerubahanService) {}

  // @Post()
  // // create(@Body() createPerubahanDto: CreatePerubahanDto) {
  // //   return this.perubahanService.create(createPerubahanDto);
  // // }

  @Get()
  findAll() {
    return this.perubahanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perubahanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerubahanDto: UpdatePerubahanDto) {
    return this.perubahanService.update(+id, updatePerubahanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perubahanService.remove(+id);
  }
}

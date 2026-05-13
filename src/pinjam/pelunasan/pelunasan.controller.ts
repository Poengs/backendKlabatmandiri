import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PelunasanService } from './pelunasan.service';
import { CreatePelunasanDto } from './dto/create-pelunasan.dto';
import { UpdatePelunasanDto } from './dto/update-pelunasan.dto';

@Controller('pelunasan')
export class PelunasanController {
  constructor(private readonly pelunasanService: PelunasanService) {}

  @Post()
  create(@Body() id: number) {
    return this.pelunasanService.create(+id);
  }

  @Get()
  findAll() {
    return this.pelunasanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pelunasanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePelunasanDto: UpdatePelunasanDto) {
    return this.pelunasanService.update(+id, updatePelunasanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pelunasanService.remove(+id);
  }
}

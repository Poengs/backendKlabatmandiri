import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HapusStokService } from './hapus-stok.service';
import { CreateHapusStokDto } from './dto/create-hapus-stok.dto';
import { UpdateHapusStokDto } from './dto/update-hapus-stok.dto';

@Controller('hapus-stok')
export class HapusStokController {
  constructor(private readonly hapusStokService: HapusStokService) {}

  @Post()
  create(@Body() createHapusStokDto: CreateHapusStokDto) {
    return this.hapusStokService.create(createHapusStokDto);
  }

  @Get()
  findAll() {
    return this.hapusStokService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hapusStokService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hapusStokService.remove(+id);
  }
}

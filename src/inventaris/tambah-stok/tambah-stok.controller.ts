import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TambahStokService } from './tambah-stok.service';
import { CreateTambahStokDto } from './dto/create-tambah-stok.dto';
import { UpdateTambahStokDto } from './dto/update-tambah-stok.dto';

@Controller('tambah-stok')
export class TambahStokController {
  constructor(private readonly tambahStokService: TambahStokService) {}

  @Post()
  create(@Body() createTambahStokDto: CreateTambahStokDto) {
    return this.tambahStokService.create(createTambahStokDto);
  }

  @Get()
  async findAll(
    @Query('produkId') produkId?: string,
    @Query('_limit') limit?: string
  ) {
    const idProduk = produkId ? Number(produkId) : undefined;
    const maxLimit = limit ? Number(limit) : undefined;
    return await this.tambahStokService.findAll(idProduk, maxLimit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.tambahStokService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTambahStokDto: UpdateTambahStokDto) {
    return this.tambahStokService.update(+id, updateTambahStokDto);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TransaksiKoperasiService } from './transaksi-koperasi.service';
import { CreateTransaksiKoperasiDto } from './dto/create-transaksi-koperasi.dto';
import { UpdateTransaksiKoperasiDto } from './dto/update-transaksi-koperasi.dto';
import { CreateTransaksiTambahStokDto, UpdateItemTambahStokDto } from './dto/create-transaksi-tambahStok.dto';

@Controller('transaksi-koperasi')
export class TransaksiKoperasiController {
  constructor(private readonly transaksiKoperasiService: TransaksiKoperasiService) {}

  @Post()
  createTransaksiTambahStokMajudengan(@Body() createTransaksiKoperasiDto: CreateTransaksiKoperasiDto) {
    return this.transaksiKoperasiService.create(createTransaksiKoperasiDto);
  }

  //tambah Stok Produk
  @Post('tambah-stok')
  createTambahStok(@Body() createTransaksiTambahStok: CreateTransaksiTambahStokDto) {
    return this.transaksiKoperasiService.createTambahStok(createTransaksiTambahStok);
  }

  //Update Tambah Stok (Per item) 
  @Patch('tambah-stok')
  async updateTambahStok(@Body() updateItemTambahStokDto: UpdateItemTambahStokDto){
    return await this.transaksiKoperasiService.updateItemTambahStok(updateItemTambahStokDto);
  }

  @Get()
  async findAll(@Query('kategori') kategori?: string) {
    return await this.transaksiKoperasiService.findAll(kategori);
  }

  // ambil data tambah Stok per transaksi
  @Get(':id/detail-stok')
  async getDetailTambahStok(@Param('id', ParseIntPipe) id: number){
    return await this.transaksiKoperasiService.findDetailTambahStok(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.transaksiKoperasiService.findOne(+id);
  }
  
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateTransaksiKoperasiDto: UpdateTransaksiKoperasiDto) {
    return this.transaksiKoperasiService.update(+id, updateTransaksiKoperasiDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.transaksiKoperasiService.remove(+id);
  }

  // delete item Tambah Stok
  @Delete(':id/detail-stok')
  removeTambahstok(@Param('id', ParseIntPipe) id: string) {
    return this.transaksiKoperasiService.deleteTambahStok(+id);
  }
}

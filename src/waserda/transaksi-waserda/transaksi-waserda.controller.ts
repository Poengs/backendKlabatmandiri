import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransaksiWaserdaService } from './transaksi-waserda.service';
import { CreateTransaksiWaserdaDto } from './dto/create-transaksi-waserda.dto';
import { UpdateTransaksiWaserdaDto } from './dto/update-transaksi-waserda.dto';

@Controller('transaksi-waserda')
export class TransaksiWaserdaController {
  constructor(private readonly transaksiWaserdaService: TransaksiWaserdaService) {}

  @Post()
  async create(@Body() createTransaksiWaserdaDto: CreateTransaksiWaserdaDto) {
    return await this.transaksiWaserdaService.createTransaksiWithManager(createTransaksiWaserdaDto);
  }

  @Get()
  findAll() {
    return this.transaksiWaserdaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transaksiWaserdaService.findOne(+id);
  } 
}

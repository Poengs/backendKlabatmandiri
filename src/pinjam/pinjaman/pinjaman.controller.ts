import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PinjamanService } from './pinjaman.service';
import { CreatePinjamanDto } from './dto/create-pinjaman.dto';
import { UpdatePinjamanDto } from './dto/update-pinjaman.dto';

@Controller('pinjaman')
export class PinjamanController {
  constructor(private readonly pinjamanService: PinjamanService) {}

  @Post()
  create(@Body() createPinjamanDto: CreatePinjamanDto) {
    return this.pinjamanService.create(createPinjamanDto);
  }

  @Get()
  findAll() {
    return this.pinjamanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pinjamanService.findOne(+id);
  }
}

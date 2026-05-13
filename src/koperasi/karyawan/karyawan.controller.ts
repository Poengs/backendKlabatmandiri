import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { KaryawanService } from './karyawan.service';
import { CreateKaryawanDto } from './dto/create-karyawan.dto';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Role, Roles } from 'src/auth/role.meta';

@Controller('karyawan')
export class KaryawanController {
  constructor(private readonly karyawanService: KaryawanService) {}

  @Post()
  create(@Body() createKaryawanDto: CreateKaryawanDto) {
    return this.karyawanService.create(createKaryawanDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.karyawanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.karyawanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKaryawanDto: UpdateKaryawanDto) {
    return this.karyawanService.update(id, updateKaryawanDto);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.karyawanService.deactivate(id);
  }
}

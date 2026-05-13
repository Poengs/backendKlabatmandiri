import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PermohonanService } from './permohonan.service';
import { CreatePermohonanDto } from './dto/create-permohonan.dto';
import { updatePermohonanByKaryawanDto, UpdatePermohonanDto } from './dto/update-permohonan.dto';
import { multerConfig, processUpload } from 'src/common/multer.uploadfoto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('permohonan')
export class PermohonanController {
  constructor(private readonly permohonanService: PermohonanService) {}

  @Post()
  create(@Body() createPermohonanDto: CreatePermohonanDto) {
    return this.permohonanService.create(createPermohonanDto);
  }

  @Patch(':id/upload-bukti')
  @UseInterceptors(FileInterceptor('file', multerConfig('bukti-penerimaan')))
  async uploadBuktiPenerimaan(@UploadedFile() file: Express.Multer.File, @Param('id') id: number, @Body('idPemberi') idPemberi: string) {
      const finalFileName = await processUpload(file);
      return this.permohonanService.uploadBuktiPenerimaan(id, idPemberi, finalFileName);
  }

  @Patch(':id/update-by-karyawan')
  updateByKaryawan(@Param('id') id: number, @Body() updatePermohonanByKaryawanDto: updatePermohonanByKaryawanDto) {
    return this.permohonanService.editByKaryawan(id, updatePermohonanByKaryawanDto);
  }

  @Patch(':id/approve')
  approve(@Param('id') id: number, @Body('idPenyetuju') idPenyetuju: string, @Body('keputusan') keputusan: boolean) {
    return this.permohonanService.approve(id, idPenyetuju, keputusan);
  }

  @Get('karyawan/:id')
  findByKaryawan(@Param('id') id: string) {
    return this.permohonanService.findByKaryawan(id);
  }

  @Get()
  findAll() {
    return this.permohonanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permohonanService.findOne(+id);
  }

  //update khusus dihalaman karyawan
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermohonanByKaryawanDto: updatePermohonanByKaryawanDto) {
    return this.permohonanService.editByKaryawan(+id, updatePermohonanByKaryawanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permohonanService.remove(+id);
  }
}

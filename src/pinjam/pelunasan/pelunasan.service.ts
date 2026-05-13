import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePelunasanDto } from './dto/create-pelunasan.dto';
import { UpdatePelunasanDto } from './dto/update-pelunasan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pelunasan } from './entities/pelunasan.entity';
import { Repository } from 'typeorm';
import { PinjamanService } from '../pinjaman/pinjaman.service';

@Injectable()
export class PelunasanService {
  constructor(
    @InjectRepository(Pelunasan)
    private readonly pelunasanRepo: Repository<Pelunasan>,
    private readonly pinjamanService: PinjamanService
  ) {}

  //permohonan pelunasan
  async create(idPinjaman: number) {
    const pinjaman = await this.pinjamanService.findOne(idPinjaman);
    if (!pinjaman) {
      throw new NotFoundException(`Data Pinjaman dengan ID: ${idPinjaman} tidak Ditemukan`);
    }

    const bunga = Math.round(0.01 * pinjaman.sisaPokok)
    return this.pelunasanRepo.save({
      nominal: pinjaman.sisaPokok,
      bunga: bunga,
      totalTagihan: pinjaman.sisaPokok + bunga,
      status: 'Menunggu persetujuan',
      tanggalBuat: new Date(),
      idPinjaman: idPinjaman
    });
  }

  //menyetujui atau menolak pelunasan
  async approve(id: number, keputusan: boolean) {
    const pelunasan = await this.pelunasanRepo.findOne({
      where: {idLunas: id}
    });
    if (!pelunasan) {
      throw new NotFoundException(`Data Pelunasan dengan ID: ${id} tidak Ditemukan`);
    }
    pelunasan.persetujuan = keputusan;
    pelunasan.tanggalkeputusan = new Date();
    if (keputusan== true) {
      pelunasan.status = 'Disetujui, menunggu pembayaran';
    } else {
      pelunasan.status = 'Ditolak';
    }
    return await this.pelunasanRepo.save(pelunasan);
  }

  async findAll() {
    return await this.pelunasanRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} pelunasan`;
  }

  update(id: number, updatePelunasanDto: UpdatePelunasanDto) {
    return `This action updates a #${id} pelunasan`;
  }

  remove(id: number) {
    return `This action removes a #${id} pelunasan`;
  }
}

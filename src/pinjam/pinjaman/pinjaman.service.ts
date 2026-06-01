import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePinjamanDto } from './dto/create-pinjaman.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pinjaman } from './entities/pinjaman.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PinjamanService {
  constructor(
    @InjectRepository(Pinjaman)
    private readonly pinjamanRepo: Repository<Pinjaman>
  ) {}

  async createWithManager(manager: EntityManager, createPinjamanDto: CreatePinjamanDto): Promise<Pinjaman> {
    const cekPinjamanExist = await manager.findOne(Pinjaman, {
      where: { idPermohonan: createPinjamanDto.idPermohonan }
    });
    if (cekPinjamanExist) {
      throw new BadRequestException(`Data Pinjaman dari Permohonan dengan ID: ${createPinjamanDto.idPermohonan} sudah ada`);
    }
    return await manager.save(Pinjaman, createPinjamanDto);
  }

  async findAll(): Promise<Pinjaman[]> {
    return await this.pinjamanRepo.find();
  }

  async findOne(id: number): Promise<Pinjaman> {
    const pinjaman = await this.pinjamanRepo.findOne({
      where: {idPinjaman: id}
    });
    if (!pinjaman) {
      throw new NotFoundException(`Data Pinjaman dengan ID: ${id} tidak Ditemukan`);
    }
    return pinjaman;
  }

  //update khusus untuk update sisa pokok dan tagihan setelah pelunasan
  async update(id: number, jumlah: number): Promise<Pinjaman> {
    const pinjaman = await this.pinjamanRepo.findOne({
      where: {idPinjaman: id}
    });
    if (!pinjaman) { 
      throw new NotFoundException(`Data Pinjaman dengan ID: ${id} tidak Ditemukan`);
    }
    pinjaman.sisaPokok -= jumlah;
    pinjaman.bungaBerlaku = Math.round(0.01 * pinjaman.sisaPokok);
    pinjaman.tagihan = pinjaman.sisaPokok + pinjaman.bungaBerlaku;
    return await this.pinjamanRepo.save(pinjaman);
  }

}

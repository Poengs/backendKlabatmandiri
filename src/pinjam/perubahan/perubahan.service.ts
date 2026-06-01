import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePerubahanDto } from './dto/create-perubahan.dto';
import { UpdatePerubahanDto } from './dto/update-perubahan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Perubahan } from './entities/perubahan.entity';
import { DataSource, Repository } from 'typeorm';
import { PinjamanService } from '../pinjaman/pinjaman.service';

@Injectable()
export class PerubahanService {
  constructor(
    @InjectRepository(Perubahan)
    private readonly perubahanRepo: Repository<Perubahan>,
    private readonly pinjamanService: PinjamanService,
    private readonly dataSource: DataSource
  ) {}

  async createPerubahan(createPerubahanDto: CreatePerubahanDto) {
    const cekPinjaman = await this.pinjamanService.findOne(createPerubahanDto.idPinjaman);
    if (!cekPinjaman) {
      throw new NotFoundException(`Data pinjaman dengan ID: ${createPerubahanDto.idPinjaman} tidak Ditemukan`);
    }
    const perubahan = await this.perubahanRepo.create({
      idPinjaman: createPerubahanDto.idPinjaman,
      jenisAksi: createPerubahanDto.jenisAksi,
      dataPengajuan: createPerubahanDto.dataPengajuan,
      dataSebelumnya: cekPinjaman
    })
    return await this.perubahanRepo.save(perubahan); 
  }

  async persetujuanLunas(id: number, idPenyetuju: string, persetujuan: boolean) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      const perubahan = await manager.findOne(Perubahan, { 
        where: { idPerubahan: id } 
      });
      if (!perubahan) {
      throw new NotFoundException(`Data perubahan dengan ID: ${id} tidak Ditemukan`);
      }
      perubahan.persetujuan = persetujuan;
      perubahan.tanggalKeputusan = new Date();
      perubahan.idpenyetuju = idPenyetuju;
      if (persetujuan==true && (perubahan.jenisAksi === 'pelunasan' || perubahan.jenisAksi === 'pembayaran_parsial')) {
        perubahan.status = 'disetujui menunggu pembayaran dan upload bukti';
      } else if (persetujuan== true && (perubahan.jenisAksi === 'penambahan_tenor' || perubahan.jenisAksi === 'pengurangan_tenor')) {
        await this.pinjamanService.updateTenorWithManager(manager, perubahan.idPinjaman, perubahan.dataPengajuan.perubahanTenor);
        perubahan.status = 'disetujui';
      }
      await manager.save(perubahan);
      return perubahan;    
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
    finally {
      await queryRunner.release();
    }
  }

  //Task tambahkan fungsi untuk upload file dan nantinya akan update pinjaman khusus untuk pelunasan

  async findAll() {
    return await this.perubahanRepo.find();
  }

  async findOne(id: number) { 
    const perubahan = await this.perubahanRepo.findOne({ 
      where: { idPerubahan: id }
      });
    if (!perubahan) {
      throw new NotFoundException(`Data perubahan dengan ID: ${id} tidak Ditemukan`);
    }
    return perubahan;
  }


  update(id: number, updatePerubahanDto: UpdatePerubahanDto) {
    return `This action updates a #${id} perubahan`;
  }

  async remove(id: number) {
    const perubahan = await this.perubahanRepo.findOne({
      where: { idPerubahan: id }
    });
    if (!perubahan) {
      throw new NotFoundException(`Data perubahan dengan ID: ${id} tidak Ditemukan`);
    }
    if (perubahan.persetujuan) {
      throw new NotFoundException(`Data perubahan dengan ID: ${id} sudah disetujui, tidak dapat dihapus`);
    }
    return await this.perubahanRepo.delete(id);
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePerubahanDto } from './dto/create-perubahan.dto';
import { UpdatePerubahanDto } from './dto/update-perubahan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Perubahan } from './entities/perubahan.entity';
import { DataSource, Repository, Not } from 'typeorm';
import { PinjamanService } from '../pinjaman/pinjaman.service';

@Injectable()
export class PerubahanService {
  constructor(
    @InjectRepository(Perubahan)
    private readonly perubahanRepo: Repository<Perubahan>,
    private readonly pinjamanService: PinjamanService,
    private readonly dataSource: DataSource
  ) {}

  async createPerubahan(createPerubahanDto: CreatePerubahanDto): Promise<Perubahan> {
    const cekPinjaman = await this.pinjamanService.findOne(createPerubahanDto.idPinjaman);
    //CEK Kondisi
    if (!cekPinjaman) {
      throw new NotFoundException(`Data pinjaman dengan ID: ${createPerubahanDto.idPinjaman} tidak Ditemukan`);
    }
    if (cekPinjaman.status === 'lunas') {
      throw new BadRequestException(`Data pinjaman dengan ID: ${createPerubahanDto.idPinjaman} sudah lunas, tidak bisa diubah`);
    }
    const cekPerubahan = await this.perubahanRepo.findOne({
      where: { idPinjaman: createPerubahanDto.idPinjaman, status: Not("berhasil")}
    });
    if (cekPerubahan) {
      throw new BadRequestException(`Data perubahan dengan ID: ${createPerubahanDto.idPinjaman} sudah diajukan dan belum diproses`);
    }

    //Memuat Data Permohonan Perubahan
    const perubahan = await this.perubahanRepo.create({
      idPinjaman: createPerubahanDto.idPinjaman,
      jenisAksi: createPerubahanDto.jenisAksi,
      dataPengajuan: createPerubahanDto.dataPengajuan,
      dataSebelumnya: cekPinjaman
    })
    if (createPerubahanDto.jenisAksi === 'pelunasan') {
      perubahan.dataPengajuan.potongSisaPokok = cekPinjaman.sisaPokok;
      // untuk jenis aksi pebayaran parsial, dari frontend mengirimkan jumlah pembayaran yang diusulkan dengan nama field potongSisaPokok.
    }
    return await this.perubahanRepo.save(perubahan); 
  }

  async persetujuan(id: number, idPenyetuju: string, persetujuan: boolean): Promise<Perubahan> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      const perubahan = await manager.findOne(Perubahan, { 
        where: { idPerubahan: id } 
      });
      // cek apakah perubahan ada
      if (!perubahan) {
      throw new NotFoundException(`Data perubahan dengan ID: ${id} tidak Ditemukan`);
      }
    
      perubahan.persetujuan = persetujuan;
      perubahan.tanggalKeputusan = new Date();
      perubahan.idPenyetuju = idPenyetuju;
      //khusus untuk pembayaran lunas atau parsial, statusnya saja yang berubah
      if (persetujuan==true && (perubahan.jenisAksi === 'pelunasan' || perubahan.jenisAksi === 'pembayaran_parsial')) {
        perubahan.status = 'disetujui menunggu pembayaran dan upload bukti';
      } 
      //khusus untuk perubahan tenor, langsung update pinjaman
      else if (persetujuan== true && (perubahan.jenisAksi === 'penambahan_tenor' || perubahan.jenisAksi === 'pengurangan_tenor')) {
        await this.pinjamanService.updateTenorWithManager(manager, perubahan.idPinjaman, perubahan.dataPengajuan.perubahanTenor);
        perubahan.status = 'berhasil';
      }
      else if (persetujuan==false) {
        perubahan.status = 'ditolak';
      }
      await manager.save(perubahan);
      await queryRunner.commitTransaction();
      return perubahan;    
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error Proses Persetujuan:', error);
      throw error;
    }
    finally {
      await queryRunner.release();
    }
  }

  //Task tambahkan fungsi untuk upload file dan nantinya akan update pinjaman khusus untuk pelunasan
  async uploadBukti(id: number, bukti: string, idPengupload: string) {
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
      perubahan.bukti = bukti;
      perubahan.idPengupload = idPengupload;
      if (perubahan.jenisAksi === 'pelunasan' || perubahan.jenisAksi === 'pembayaran_parsial') {
        await this.pinjamanService.bayarcepatWithManager(manager, perubahan.idPinjaman, perubahan.dataPengajuan.potongSisaPokok);
        perubahan.status = 'berhasil';
        // pikirkan jika bunga juga dipotong kalau pembayaran parsial.
      }
      await manager.save(perubahan);
      await queryRunner.commitTransaction();
      return perubahan;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error saat upload bukti penerimaan:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

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


  async update(id: number, updatePerubahanDto: UpdatePerubahanDto): Promise<Perubahan> {
    const perubahan = await this.perubahanRepo.findOne({
      where: { idPerubahan: id }
    });
    if (!perubahan) {
      throw new NotFoundException(`Data perubahan dengan ID: ${id} tidak Ditemukan`);
    }
    if (perubahan.status === 'berhasil') {
      throw new BadRequestException(`Data perubahan dengan ID: ${id} sudah berhasil, tidak bisa diubah`);
    }
    Object.assign(perubahan, updatePerubahanDto);
    return await this.perubahanRepo.save(perubahan);
  }

  async remove(id: number) {
    const perubahan = await this.perubahanRepo.findOne({
      where: { idPerubahan: id }
    });
    if (!perubahan) {
      throw new NotFoundException(`Data perubahan dengan ID: ${id} tidak Ditemukan`);
    }
    if (perubahan.persetujuan) {
      throw new BadRequestException(`Data perubahan dengan ID: ${id} sudah disetujui, tidak dapat dihapus`);
    }
    return await this.perubahanRepo.delete(id);
  }
}

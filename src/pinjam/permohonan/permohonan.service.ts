import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermohonanDto } from './dto/create-permohonan.dto';
import { updatePermohonanByKaryawanDto, UpdatePermohonanDto } from './dto/update-permohonan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permohonan } from './entities/permohonan.entity';
import { Repository } from 'typeorm';
import { PinjamanService } from '../pinjaman/pinjaman.service';

@Injectable()
export class PermohonanService {
  constructor(
    @InjectRepository(Permohonan)
    private readonly permohonanRepo: Repository<Permohonan>,
    private readonly pinjamanService: PinjamanService
  ) {}

  async create(createPermohonanDto: CreatePermohonanDto): Promise<Permohonan> {
     const permohonan =await this.permohonanRepo.save(createPermohonanDto);
     permohonan.status = 'menunggu persetujuan';
     permohonan.tanggalPengajuan = new Date();
     permohonan.nomorSurat = `Pinjaman-${permohonan.idPermohonan.toString().padStart(5, '0')}`;
     return await this.permohonanRepo.save(permohonan);
  }

  //edit khusus dihalaman karyawan
  async editByKaryawan(id: number, updatePermohonanByKaryawanDto: updatePermohonanByKaryawanDto): Promise<any> {
    const permohonan = await this.permohonanRepo.findOne({
      where: {idPermohonan: id}
    });
    if (!permohonan) {
      throw new NotFoundException(`Data Permohonan dengan ID: ${id} tidak Ditemukan`);
    }

    if (permohonan.persetujuan) {
      throw new ConflictException(`Data Permohonan dengan ID: ${id} sudah disetujui dan tidak bisa diubah`);
    }
    Object.assign(permohonan, updatePermohonanByKaryawanDto);
    return await this.permohonanRepo.save(permohonan);
  }

  //buat fungsi untuk menyetujui
  async approve(id: number, idPenyetuju: string, keputusan: boolean): Promise<any> {
    const permohonan = await this.permohonanRepo.findOne({
      where: {idPermohonan: id}
    });
    if (!permohonan) {
      throw new NotFoundException(`Data Permohonan dengan ID: ${id} tidak Ditemukan`);
    }

    if (permohonan.buktiPenerimaan) {
      throw new ConflictException(`Data Permohonan dengan ID: ${id} sudah disetujui dan tidak bisa diubah`);
    }
    permohonan.persetujuan = keputusan;
    permohonan.idPenyetuju = idPenyetuju;
    if (keputusan == false) {
      permohonan.status = 'ditolak';
    } else if (keputusan == true) {
      permohonan.status = 'disetujui, menunggu upload bukti penerimaan';
    }
    permohonan.tanggalKeputusan = new Date();
    return await this.permohonanRepo.save(permohonan);
  }

  //buat fungsi untuk upload bukti penerimaan sekaligus membuat tabel pinjaman
  async uploadBuktiPenerimaan(id: number, idPemberi: string, buktiPenerimaan: string): Promise<Permohonan> {
    // cek apakah id permohonan dan cek apakah sudah diupload bukti penerimaan atau belum
    let permohonan = await this.permohonanRepo.findOne({
      where: {idPermohonan: id}
    });
    if (!permohonan) {
      throw new NotFoundException(`Data Permohonan dengan ID: ${id} tidak Ditemukan`);
    } 
    else if (permohonan.buktiPenerimaan) { 
      throw new ConflictException(`Data Permohonan dengan ID: ${id} sudah diupload bukti penerimaan dan tidak bisa diubah`);
    }

    // isi tabel permohonan
    permohonan.buktiPenerimaan = buktiPenerimaan;
    permohonan.idPemberi = idPemberi;
    permohonan.status = 'Permohonan telah dicairkan';

    // buat tabel pinjaman dengan bunga 1% menurun
    const bunga = Math.round(0.01 * permohonan.jumlahPinjaman);
    const tagihan = Math.round(permohonan.jumlahPinjaman/permohonan.tenor) + bunga;
    await this.pinjamanService.create({
      sisaPokok: permohonan.jumlahPinjaman,
      bungaBerlaku: bunga,
      tagihan: tagihan,
      status: 'berjalan',
      idPermohonan: permohonan.idPermohonan,
    });

    await this.permohonanRepo.update(id, {
      buktiPenerimaan,
      idPemberi,
      status: 'Pinjaman Berlangsung',
    });

    return await this.permohonanRepo.findOne({
      where: { idPermohonan: id },
    });
  }

  // mengambil semua data permohonan dengan urutan berdasarkan status persetujuan (yang belum disetujui muncul duluan)
  async findAll(): Promise<Permohonan[]> {
    return await this.permohonanRepo
    .createQueryBuilder('permohonan')
    .orderBy('permohonan.persetujuan', 'ASC', 'NULLS FIRST') 
    .getMany();
  }

  // mengambil data permohonan per karyawan berdasarkan idPemohon dengan urutan berdasarkan tanggal pengajuan (yang terbaru muncul duluan)
  async findByKaryawan(id: string): Promise<Permohonan[]> {
    return await this.permohonanRepo.find({
      where: {idPemohon: id},
      order: {tanggalPengajuan: 'DESC'}
    })
  }

  
  async findOne(id: number): Promise<Permohonan> {
    return await this.permohonanRepo.findOne({
      where: {idPermohonan: id}
    });
  }

  //hapus
  async remove(id: number): Promise<void> {
    const permohonan = await this.permohonanRepo.findOne({
      where: {idPermohonan: id}
    });
    if (!permohonan) {
      throw new NotFoundException(`Data Permohonan dengan ID: ${id} tidak Ditemukan`);
    }
    if (permohonan.persetujuan) {
      throw new ConflictException(`Data Permohonan dengan ID: ${id} sudah disetujui dan tidak bisa dihapus`);
    }
    await this.permohonanRepo.remove(permohonan);
  }
}

import { ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePermohonanDto, CreatePinjamanPermohonanDto } from './dto/create-permohonan.dto';
import { updatePermohonanByKaryawanDto, UpdatePermohonanDto } from './dto/update-permohonan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permohonan } from './entities/permohonan.entity';
import { DataSource ,Repository } from 'typeorm';
import { PinjamanService } from '../pinjaman/pinjaman.service';

@Injectable()
export class PermohonanService {
  constructor(
    @InjectRepository(Permohonan)
    private readonly permohonanRepo: Repository<Permohonan>,
    private readonly pinjamanService: PinjamanService,
    private readonly dataSource: DataSource
  ) {}

  async create(createPermohonanDto: CreatePermohonanDto): Promise<Permohonan> {
     const permohonan = await this.permohonanRepo.save({
    ...createPermohonanDto,
    status: 'menunggu persetujuan',
    tanggalPengajuan: new Date(),
    });
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      
      // cek apakah id permohonan dan cek apakah sudah diupload bukti penerimaan atau belum
      let permohonan = await manager.findOne(Permohonan,{
        where: {idPermohonan: id}
      });
      if (!permohonan) {
        throw new NotFoundException(`Data Permohonan dengan ID: ${id} tidak Ditemukan`);
      } 
      else if (permohonan.buktiPenerimaan) { 
        throw new ConflictException(`Data Permohonan dengan ID: ${id} sudah diupload bukti penerimaan dan tidak bisa diubah`);
      }
  
      // buat tabel pinjaman dengan bunga 1% menurun
      const bunga = Math.round(0.01 * permohonan.jumlahPinjaman);
      const tagihan = Math.round(permohonan.jumlahPinjaman/permohonan.tenor) + bunga;
      await this.pinjamanService.createWithManager(manager, {
        sisaPokok: permohonan.jumlahPinjaman,
        bungaBerlaku: bunga,
        tagihanBulanIni: tagihan,
        status: 'berjalan',
        idPermohonan: permohonan.idPermohonan,
      });

      //tabel Permohonan 
      await manager.update(Permohonan, id, {
        buktiPenerimaan,
        idPemberi,
        status: 'Pinjaman Berlangsung',
      });
      await queryRunner.commitTransaction();
      return await this.permohonanRepo.findOne({
        where: { idPermohonan: id },
      });
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error saat upload bukti penerimaan:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        error.message || 'Gagal memproses bukti penerimaan & pembuatan pinjaman',
      );
    }
    finally {
      await queryRunner.release();
    }
  }

  // mengambil semua data permohonan dengan urutan berdasarkan status persetujuan (yang belum disetujui muncul duluan)
  async findAll(): Promise<Permohonan[]> {
    return await this.permohonanRepo
    .createQueryBuilder('permohonan')
    .orderBy('permohonan.persetujuan', 'ASC') 
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

  // khusus untuk maintenance atau darurat


  // fungsi untuk mengisi data permohonan, pinjaman dalam 1 form

  async managerCreatePeromohonandanPinjaman(createPinjamanPermohonanDto: CreatePinjamanPermohonanDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      // buat data permohonan
      const permohonan = await manager.save(Permohonan, {
        idPemohon: createPinjamanPermohonanDto.idPemohon,
        idPenyetuju: createPinjamanPermohonanDto.idPenyetuju,
        jumlahPinjaman: createPinjamanPermohonanDto.jumlahPinjaman,
        nomorSurat: createPinjamanPermohonanDto.NomorSurat,
        tenor: createPinjamanPermohonanDto.tenor,
        keperluan: createPinjamanPermohonanDto.keperluan,
        tanggalPengajuan: createPinjamanPermohonanDto.tanggalPengajuan,
        persetujuan: true,
        tanggalKeputusan: createPinjamanPermohonanDto.tanggalKeputusan,
        buktiPenerimaan: createPinjamanPermohonanDto.buktiPenerimaan,
        status: 'berjalan',
        saksi: createPinjamanPermohonanDto.saksi,
        kepalaBagian: createPinjamanPermohonanDto.kepalaBagian,
        idPemberi: createPinjamanPermohonanDto.idPemberi,
        tanggalPenerimaan: createPinjamanPermohonanDto.tanggalPenerimaan,
      });
      // buat data pinjaman
      const bunga = Math.round(0.01 * createPinjamanPermohonanDto.sisaPokok);
      const tagihan = Math.round(createPinjamanPermohonanDto.sisaPokok/createPinjamanPermohonanDto.sisaTenor) + bunga;
      await this.pinjamanService.createWithManager(manager, {
        sisaPokok: createPinjamanPermohonanDto.sisaPokok,
        bungaBerlaku: bunga,
        tagihanBulanIni: tagihan,
        status: 'berjalan',
        idPermohonan: permohonan.idPermohonan,
      });
      await queryRunner.commitTransaction();
      return await this.permohonanRepo.findOne({
        where: { idPermohonan: permohonan.idPermohonan },
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error saat membuat permohonan dan pinjaman:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        error.message || 'Gagal membuat permohonan dan pinjaman',
      );
    } finally {
      await queryRunner.release();
    }
  };
}

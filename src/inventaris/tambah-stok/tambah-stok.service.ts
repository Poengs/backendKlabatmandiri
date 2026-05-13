import { Injectable } from '@nestjs/common';
import { CreateTambahStokDto } from './dto/create-tambah-stok.dto';
import { UpdateTambahStokDto } from './dto/update-tambah-stok.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TambahStok } from './entities/tambah-stok.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TambahStokService {
  constructor(
    @InjectRepository(TambahStok)
    private readonly tambahStokRepo: Repository<TambahStok>,
  ) {};

  
  create(createTambahStokDto: CreateTambahStokDto) {
    return 'This action adds a new tambahStok';
  }

  async createTambahStokWithManger (manager: EntityManager, createTambahStokDto): Promise<TambahStok> {
    const result = await manager.create(TambahStok, createTambahStokDto);
    return await manager.save(TambahStok, createTambahStokDto);
  }

  async findOneWithManager(manager:EntityManager, id: number): Promise<TambahStok> {
    return await manager.findOne(TambahStok, {
      where: {idTambahStok: id}
    })
  }

  async updateTambahStokWithManager(manager:EntityManager, updateTambahStokDto: UpdateTambahStokDto): Promise<any> {
    const tambahStok = await manager.update(TambahStok, updateTambahStokDto.idTambahStok, {
      jumlah: updateTambahStokDto.idTambahStok,
      hargaBeli: updateTambahStokDto.hargaBeli,
      keterangan: updateTambahStokDto.keterangan
    } );
    return tambahStok;
  }

  async findAll(produkId?: number, limit?: number): Promise<TambahStok[]> {
    const query = this.tambahStokRepo.createQueryBuilder('tambahStok')
      .leftJoinAndSelect('tambahStok.stok', 'stok')
      .leftJoinAndSelect('tambahStok.transaksiKoperasi', 'transaksiKoperasi')
      .leftJoinAndSelect('tambahStok.karyawan', 'karyawan')
      .orderBy('tambahStok.idTambahStok', 'DESC');

    if (produkId) {
      query.where('stok.idProduk = :produkId', { produkId });
    }

    if (limit) {
      query.limit(limit);
    }

    return await query.getMany();
  }

  async findByTransaksiId(idTransaksi: number): Promise<TambahStok[]> {
    return await this.tambahStokRepo.find({
      where: {idTransaksiKoperasi: idTransaksi}
    })
  }

  update(id: number, updateTambahStokDto: UpdateTambahStokDto) {
    return `This action updates a #${id} tambahStok`;
  }

  
  async removeWithManager(manager: EntityManager, id: number) {
    const tambahStok = await manager.delete(TambahStok, id);
  }
}

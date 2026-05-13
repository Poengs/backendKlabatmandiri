import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStokDto } from './dto/create-stok.dto';
import { UpdateStokDto } from './dto/update-stok.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stok } from './entities/stok.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class StokService {
  constructor(
    @InjectRepository(Stok)
    private readonly stokRepo: Repository<Stok>
  ) {}

  // Tambah Stok
  async createStokWithManager (manager: EntityManager, createStokDto: CreateStokDto): Promise<Stok> {
    const newStok = manager.create(Stok, createStokDto);
    return await manager.save(Stok, newStok);
  }

  // Saat Tambah Produk masuk, Stok diupdate
  async updateStokWithManager (manager: EntityManager, updateStokDto: UpdateStokDto){
    const result = await manager.increment(Stok, {
      idProduk: updateStokDto.idProduk, idToko: updateStokDto.idToko},
      'jumlahStok', updateStokDto.jumlahStok);
    return result;
  }

  async findAll(): Promise<Stok[]> {
    return await this.stokRepo.find();
  }

  async findOneWithManager(manager: EntityManager, id: number): Promise<Stok>{
    return await manager.findOne(Stok, {
      where: {idStok: id}
    });
  }

  async findOne(id: number): Promise<Stok> {
    const stok = await this.stokRepo.findOne({
      where: {idStok: id}
    });
    if(!stok) {
      throw new NotFoundException(`Stok dengan ID ${id} Tidak ditemukan`);
    }
    return stok;
  }

  // saat item tambah stok diubah atau dihapus, stok diupdate
  async updateSelisihStokWithManager(manager: EntityManager, id: number, jumlah: number) {
    const stok = await manager.increment(Stok, {idStok: id}, 'jumlahStok', jumlah );
    if(stok.affected === 0) {
      throw new InternalServerErrorException(`Stok dengan ID ${id} Tidak ditemukan`)
    }
    return stok;
  }

  // merubah harga stok
  async updateHargaStok(id: number, hargaJual: number): Promise<Stok> {
    const stok = await this.findOne(id);
    if(!stok) {
      throw new NotFoundException(`Stok dengan ID ${id} Tidak ditemukan`);
    }
    stok.hargaJual = hargaJual;
    return await this.stokRepo.save(stok);
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { Produk } from './entities/produk.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { promises } from 'dns';

@Injectable()
export class ProdukService {
  constructor(
    @InjectRepository(Produk)
    private readonly produkRepo: Repository<Produk>


  ) {}

  async create(createProdukDto: CreateProdukDto): Promise<Produk> {
    return await this.produkRepo.save(createProdukDto);
  }

  async createProdukWithManager(manager: EntityManager, createProdukDto: CreateProdukDto): Promise<Produk> {
    const newProduk = manager.create(Produk, createProdukDto);
    return await manager.save(Produk, newProduk);
  }

  async findAll(): Promise<Produk[]> {
    return await this.produkRepo.find();
  }

  async findOne(id: number): Promise<Produk> {
    return await this.produkRepo.findOne({
      where: {idProduk: id}
    });
  }

  async update(id: number, updateProdukDto: UpdateProdukDto): Promise<Produk> {
    const produk = await this.produkRepo.findOne({
      where: {idProduk: id}
    });
    if(!produk) {
      throw new NotFoundException(`Produk dengan ID ${id} Tidak ditemukan`);
    }
    Object.assign(produk, updateProdukDto);
    return await this.produkRepo.save(produk);
  }

}

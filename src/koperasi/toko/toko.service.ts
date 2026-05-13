import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTokoDto } from './dto/create-toko.dto';
import { UpdateTokoDto } from './dto/update-toko.dto';
import { Toko } from './entities/toko.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TokoService {
  constructor(
    @InjectRepository(Toko)
    private readonly tokoRepo: Repository<Toko>,
  ) {}
  
  async create(createTokoDto: CreateTokoDto): Promise<Toko> {
    return this.tokoRepo.save(createTokoDto);
  }

  async findAll(): Promise<Toko[]> {
    return await this.tokoRepo.find();
  }
  
  async findOne(id: number): Promise<Toko> {
  const toko = await this.tokoRepo.findOne({
    where: { idToko: id },
  });
    if (!toko) {
      throw new NotFoundException(`Toko dengan ID ${id} tidak ditemukan`);
    }
    return toko;
  }

  async findAllIdToko(): Promise<{idToko: number}[]> {
    return await this.tokoRepo.find({
      select: ['idToko'],
    });     
  }

  async update(id: number, updateTokoDto: UpdateTokoDto): Promise<Toko> {
    const toko = await this.tokoRepo.findOne({
      where: { idToko: id },
    });
    if (!toko) {
      throw new NotFoundException(`Toko dengan ID ${id} tidak ditemukan`);
    }
    Object.assign(toko, updateTokoDto);
    return await this.tokoRepo.save(toko);
  }

}

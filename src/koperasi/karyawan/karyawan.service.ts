import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKaryawanDto } from './dto/create-karyawan.dto';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Karyawan } from './entities/karyawan.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class KaryawanService {
  constructor(
    @InjectRepository(Karyawan)
    private readonly karyawanRepo: Repository<Karyawan>,
  ) {}

  async create(createKaryawanDto: CreateKaryawanDto): Promise<Karyawan> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(createKaryawanDto.password, saltRounds);
  const newKaryawan = this.karyawanRepo.create({
    ...createKaryawanDto, 
    password: hashedPassword,
  });
  // kirim ke email untuk buat akun dan bawa dto passwordnya.
  return this.karyawanRepo.save(newKaryawan);
}

  async findAll(): Promise<Karyawan[]> {
    return await this.karyawanRepo.find();
  }

  async findOne(id: string): Promise<Karyawan> {
    const karyawan = await this.karyawanRepo.findOne({
      where: {idKaryawan: id}
    });

    if(!karyawan) {
      throw new NotFoundException(`Karyawan dengan ID: ${id} tidak ditemukan`)
    }
    return karyawan;
  }

  async update(id: string, updateKaryawanDto: UpdateKaryawanDto): Promise<Karyawan> {
    const karyawan = await this.karyawanRepo.findOne({
      where: { idKaryawan: id },
    });
    if (!karyawan) {
      throw new NotFoundException(`Karyawan dengan ID: ${id} tidak ada`);
    }
    if (updateKaryawanDto.password) {
      const saltRounds = 10;
      updateKaryawanDto.password = await bcrypt.hash(updateKaryawanDto.password, saltRounds);
    }
    Object.assign(karyawan, updateKaryawanDto);

    return await this.karyawanRepo.save(karyawan);
  }

  async deactivate(id: string): Promise<Karyawan> {
    const karyawan = await this.karyawanRepo.findOne({
      where: {idKaryawan: id},
    });

    if(!karyawan){
      throw new NotFoundException(`Karyawan dengan ID: ${id} tidak ada`)
    }
    karyawan.status = 'Tidak Aktif';
    return await this.karyawanRepo.save(karyawan)
  }

}

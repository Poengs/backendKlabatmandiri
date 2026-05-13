import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateHapusStokDto } from './dto/create-hapus-stok.dto';
import { UpdateHapusStokDto } from './dto/update-hapus-stok.dto';
import { HapusStok } from './entities/hapus-stok.entity';
import { Stok } from 'src/inventaris/stok/entities/stok.entity';
import { StokService } from '../stok/stok.service';

@Injectable()
export class HapusStokService {
  constructor(
    @InjectRepository(HapusStok)
    private readonly hapusStokRepo: Repository<HapusStok>,

    private readonly stokService: StokService,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateHapusStokDto): Promise<HapusStok> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      
      const stok = await manager.findOne(Stok, { where: { idStok: dto.idStok } });
      if (!stok) {
        throw new NotFoundException(`Stok dengan ID ${dto.idStok} tidak ditemukan`);
      }
      const hapusStok = await manager.save(HapusStok, dto);
      const update = await this.stokService.updateSelisihStokWithManager(manager, dto.idStok, dto.jumlah);
      return hapusStok;
    }
    catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
    finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<HapusStok[]> {
    return await this.hapusStokRepo.find();
  }

  async findOne(id: number): Promise<HapusStok> {
    const item = await this.hapusStokRepo.findOne({ where: { idHapusStok: id } });
    if (!item) {
      throw new NotFoundException(`HapusStok dengan ID ${id} tidak ditemukan`);
    }
    return item;
  }

  async remove(id: number): Promise<HapusStok> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const manager = queryRunner.manager;
      
      const hapusStok = await manager.findOne(HapusStok,{
        where: { idHapusStok: id }
      });

      if (!hapusStok) {
        throw new NotFoundException('HapusStok dengan ID ${id} tidak ditemukan');
      }
      await this.stokService.updateHargaStok(hapusStok.idHapusStok, hapusStok.jumlah)
      return await manager.remove(hapusStok);
      }
      catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      }
      finally {
        await queryRunner.release();
      }
  }
}
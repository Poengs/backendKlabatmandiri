import { Injectable } from '@nestjs/common';
import { CreateDetailTransaksiWaserdaDto } from './dto/create-detail-transaksi-waserda.dto';
import {  EntityManager } from 'typeorm';
import { DetailTransaksiWaserda } from './entities/detail-transaksi-waserda.entity';

@Injectable()
export class DetailTransaksiWaserdaService {
  
  async createWithManager
  (manager: EntityManager, createDetailTransaksiWaserdaDto: CreateDetailTransaksiWaserdaDto)
  : Promise <DetailTransaksiWaserda> {
    const detailTransaksi = await manager.create(DetailTransaksiWaserda, createDetailTransaksiWaserdaDto);
    // ada hitungan total harganya
    return detailTransaksi;
  }
}

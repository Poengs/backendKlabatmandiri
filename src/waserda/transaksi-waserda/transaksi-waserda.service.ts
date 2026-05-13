import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTransaksiWaserdaDto } from './dto/create-transaksi-waserda.dto';
import { UpdateTransaksiWaserdaDto } from './dto/update-transaksi-waserda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransaksiWaserda } from './entities/transaksi-waserda.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { StokService } from 'src/inventaris/stok/stok.service';
import { DetailTransaksiWaserdaService } from '../detail-transaksi-waserda/detail-transaksi-waserda.service';
import { DetailTransaksiWaserda } from '../detail-transaksi-waserda/entities/detail-transaksi-waserda.entity';

@Injectable()
export class TransaksiWaserdaService {
  constructor(
    @InjectRepository(TransaksiWaserda)
    private readonly transaksiWaserdaRepo: Repository<TransaksiWaserda>,
    private dataSource: DataSource,
    private readonly stokService: StokService,
    private readonly detailTransaksiWaserdaService: DetailTransaksiWaserdaService
  ){}

  async findAll(): Promise<TransaksiWaserda[]> {
    return await this.transaksiWaserdaRepo.find();
  }

  async findOne(id: number): Promise<TransaksiWaserda> {
    const transaksi = await this.transaksiWaserdaRepo.findOne({
      where: {idTransaksiWaserda: id}
    });
    if (!transaksi) {
      throw new NotFoundException(`Transaksi dengan ID: ${id} Tidak ditemukan`)
    }
    return transaksi;
  }

  async createTransaksiWithManager
  (createTransaksiKoperasiDto: CreateTransaksiWaserdaDto)
  : Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const keranjangDetail = [];
  
    try {
      const manager = queryRunner.manager;
      let totalHarga = 0;
      // pengulangan untuk memuat data detail transaksi dan menghitung totalHarga
      for (const item of createTransaksiKoperasiDto.items) {
        const stok = await this.stokService.findOneWithManager(manager, item.idStok);
        const subTotal = stok.hargaJual*item.jumlah;
        totalHarga += subTotal;
        keranjangDetail.push({
          idStok: item.idStok,
          jumlah: item.jumlah,
          hargaSatuan: stok.hargaJual,
          totalHargaItem:  subTotal
        });
        await this.stokService.updateSelisihStokWithManager(manager, item.idStok, -item.jumlah);
      }
      const transaksiWaserda = await manager.save(TransaksiWaserda, {
        idToko: createTransaksiKoperasiDto.idToko,
        idKaryawan: createTransaksiKoperasiDto.idKaryawan,
        tanggal: new Date(),
        totalHarga:  totalHarga,
        totalBayar: createTransaksiKoperasiDto.totalBayar,
        jenisBayar: createTransaksiKoperasiDto.jenisPembayaran
      });
      // simpan data transaksi dan detail
      const simpanDetail = keranjangDetail.map((detail)=>({
        ...detail,
        idTransaksiWaserda: transaksiWaserda.idTransaksiWaserda
      }))
      await manager.save(DetailTransaksiWaserda, simpanDetail);
      await queryRunner.commitTransaction();
      return { 
        status: 'Sukses', 
        idTransaksi: transaksiWaserda.idTransaksiWaserda,
        idKaryawan: transaksiWaserda.idKaryawan,
        totalBelanja: totalHarga,
        itemBelanja: simpanDetail  
      };
    } catch(err) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      console.error(err);
      throw new InternalServerErrorException("Transaksi Gagal: " + err.message);
    } finally {
      await queryRunner.release();
    }
  }


}

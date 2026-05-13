import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTransaksiKoperasiDto } from './dto/create-transaksi-koperasi.dto';
import { UpdateTransaksiKoperasiDto } from './dto/update-transaksi-koperasi.dto';
import { CreateTransaksiTambahStokDto, UpdateItemTambahStokDto } from './dto/create-transaksi-tambahStok.dto';
import { TransaksiKoperasi } from './entities/transaksi-koperasi.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { TokoService } from '../toko/toko.service';
import { ProdukService } from 'src/inventaris/produk/produk.service';
import { StokService } from 'src/inventaris/stok/stok.service';
import { TambahStokService } from 'src/inventaris/tambah-stok/tambah-stok.service';
import { Stok } from 'src/inventaris/stok/entities/stok.entity';

@Injectable()
export class TransaksiKoperasiService {
  constructor(
    @InjectRepository(TransaksiKoperasi)
    private readonly transkopRepo: Repository<TransaksiKoperasi>,
    private dataSource: DataSource,
    private readonly produkService: ProdukService,
    private readonly tokoService: TokoService,
    private readonly stokService: StokService,
    private readonly tambahStokService: TambahStokService
  ) {}

  //membuat data transaksi koperasi baru
  //BELUM DIBUAT
  create(createTransaksiKoperasiDto: CreateTransaksiKoperasiDto) {
    return 'This action adds a new transaksiKoperasi';
  }

  // Mengambil data Transaksi Koperasi dan bisa juga hanya khusus kategori Tambah Stok/Asset
  async findAll(kategori?: string): Promise<TransaksiKoperasi[]> {
    const query = this.transkopRepo.createQueryBuilder('transaksi');
    // cek apakah url mengirimkan filter nilai kategori
    if (kategori) {
      query.where('transaksi.kategori = :kategori', { kategori });
    }
    query.orderBy('transaksi.tanggal', 'DESC'); //urutkan

    return await query.getMany();
  }

  // Mengambil data tambah_Stok untuk 1 transaksi
  async findDetailTambahStok(idTransaksi: number) {
    const nota = await this.transkopRepo.findOne({
      where: { idTransaksiKoperasi: idTransaksi },
    });
    if (!nota) {
      throw new NotFoundException(`Transaksi dengan ID ${idTransaksi} tidak ditemukan`);
    }
    if (nota.kategori !== 'Tambah Stok') {
      throw new BadRequestException('Transaksi ini bukan merupakan kategori Tambah Stok');
    }

    const items = await this.tambahStokService.findByTransaksiId(idTransaksi);

    return {
      nota: nota,
      items: items,
    };
  }

  // Input Stok produk lama/baru sekaligus membuat transaksi pengeluaran baru
  async createTambahStok(createTransaksiTambahStok: CreateTransaksiTambahStokDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let semuaToko;
    let totalNominal = 0;

    try {
      const manager = queryRunner.manager;
      let totalNominalPengeluaran = 0;
      semuaToko = await this.tokoService.findAllIdToko(); //ambil id semua toko
      
      //Menyimpan data transaksi dengan nominal 0
      const pengeluaran = manager.create(TransaksiKoperasi, { 
        nominal: 0, 
        keterangan: createTransaksiTambahStok.keterangan, 
        tanggalTransaksi: createTransaksiTambahStok.tanggalTransaksi,
        idKaryawan: createTransaksiTambahStok.idKaryawan,
        jenisTransaksi: 'Pengeluaran',
        kategori: 'Tambah Stok',
        bukti: createTransaksiTambahStok.bukti
        });
      const savedPengeluaran = await manager.save(pengeluaran);

      // Pengulangan untuk setiap produk dalam keranjang tambah stok
      for (const item of createTransaksiTambahStok.items) {
        let currentStokId: number;
        // Cek apakah produk baru atau produk lama
        let produk = item.idProduk ? await this.produkService.findOne(item.idProduk) : null;
        if(!produk) {
          // Mengisi data produk dan stok baru
          produk = await this.produkService.createProdukWithManager(manager, {
            namaProduk: item.namaProduk,
            barcode: item.barcode
          })
          // Mengisi data produk pada semua toko
          for (const toko of semuaToko ) {
            const dto = {
              idProduk: produk.idProduk,
              idToko: toko.idToko,
              hargaJual: item.hargaJual,
              satuan: item.satuan,
              jumlahStok: toko.idToko === item.idToko ? item.jumlah : 0
            }
            const newStok = await this.stokService.createStokWithManager(manager, dto);
            
            // Jika ini adalah toko yang sedang kita proses, ambil ID-nya
            if (toko.idToko === item.idToko) currentStokId = newStok.idStok;
          }
        } else {
          // update stok produk baru
            const stok = await this.stokService.updateStokWithManager(manager, {
            idProduk: item.idProduk,
            idToko: item.idToko,
            jumlahStok: item.jumlah
          });
          const stokData = await manager.findOne(Stok, { 
            where: { 
              produk: { idProduk: produk.idProduk }, 
              toko: { idToko: item.idToko } 
            } 
          });
          currentStokId = stokData?.idStok;
        }
        // simpan ditabel tambahStok
        if (!currentStokId) throw new NotFoundException(`Data stok tidak ditemukan untuk produk ini di toko ${item.idToko}`);
        const tambahStok = await this.tambahStokService.createTambahStokWithManger(manager, {
          jumlah: item.jumlah,
          hargaBeli: item.hargaBeli,
          keterangan: item.keterangan,
          idStok: currentStokId,
          idKaryawan: createTransaksiTambahStok.idKaryawan,
          idTransaksiKoperasi: savedPengeluaran.idTransaksiKoperasi
        });
        totalNominal = totalNominal+(item.hargaBeli*item.jumlah);
      }
      savedPengeluaran.nominal = totalNominal;
      await manager.save(savedPengeluaran);
      await queryRunner.commitTransaction();
      return {
        message: 'Transaksi tambah stok berhasil diproses',
        data: {
          idTransaksiKoperasi: savedPengeluaran.idTransaksiKoperasi,
          nominal: savedPengeluaran.nominal,
          jumlahItem: createTransaksiTambahStok.items.length,
          tanggal: savedPengeluaran.tanggalTransaksi
        }
      };
    }
    catch (err) {
      await queryRunner.rollbackTransaction();
      console.error("Detail Error:", err);
      if (err instanceof HttpException) {
        throw err;
      }
      //JIKA errornya karena database (syntax error, dll), ubah jadi 500
      throw new InternalServerErrorException("Gagal memproses hapus item : " + err.message);
    }
    finally {
      await queryRunner.release();
    }
  }

  // Ambil data Transaksi Koperasi berdasarkan ID
  async findOneWithManager(manager: EntityManager, id: number): Promise<TransaksiKoperasi>{
    return await manager.findOne(TransaksiKoperasi, {
      where: {idTransaksiKoperasi: id}
    })
  }

  //update Item Tambah Stok
  async updateItemTambahStok(updateItemTambahStokDto: UpdateItemTambahStokDto): Promise<any>{
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const manager = queryRunner.manager;
      const tambahStokLama = await this.tambahStokService.findOneWithManager(manager, updateItemTambahStokDto.idTambahStok);
      if(tambahStokLama) {
        // edit data Tambah Stok
        const tambahStokBaru = await this.tambahStokService.updateTambahStokWithManager(manager, updateItemTambahStokDto);
        // hitung selisih dan update stok
        const selisihStok = updateItemTambahStokDto.jumlah-tambahStokLama.jumlah;
        await this.stokService.updateSelisihStokWithManager(manager,tambahStokLama.idStok,selisihStok);
        // hitung selisih pengeluaran dan update pengeluaran
        const selisihPengeluaran= (updateItemTambahStokDto.jumlah*updateItemTambahStokDto.hargaBeli)-(tambahStokLama.jumlah*tambahStokLama.hargaBeli);
        await manager.increment(
          TransaksiKoperasi,
          {idTransaksiKoperasi: updateItemTambahStokDto.idTransaksiKoperasi},
          'nominal', selisihPengeluaran
        );
        await queryRunner.commitTransaction();
      } else {
        throw new NotFoundException('Data tambah stok tidak ditemukan');
      } 
    } catch(err) {
      await queryRunner.rollbackTransaction();
      console.error("Detail Error:", err);
      throw new InternalServerErrorException("Gagal memproses edit item : " + err.message);
    }
    finally {
      await queryRunner.release();
    }
  }

  // Hapus item Tambah Stok
  async deleteTambahStok(id: number): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
      const manager = queryRunner.manager;
      const cekTambahStok = await this.tambahStokService.findOneWithManager(manager, id);
      if(cekTambahStok) {
        // Kurangin stok
        await this.stokService.updateSelisihStokWithManager(manager,
          cekTambahStok.idStok,
          -(cekTambahStok.jumlah)
        );
        // kurangi pengeluaran
        await manager.increment(
          TransaksiKoperasi,
          {idTransaksiKoperasi: cekTambahStok.idTransaksiKoperasi},
          'nominal',
          -(cekTambahStok.jumlah*cekTambahStok.hargaBeli)
        );
        await this.tambahStokService.removeWithManager(manager, id);
        await queryRunner.commitTransaction();
      } else {
        throw new NotFoundException('Data tambah stok tidak ditemukan');
      } 
    } catch(err){
      await queryRunner.rollbackTransaction();
      console.error("Detail Error:", err);
      throw new InternalServerErrorException("Gagal memproses hapus item : " + err.message);      
    }
    finally {
      await queryRunner.release();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} transaksiKoperasi`;
  }

  update(id: number, updateTransaksiKoperasiDto: UpdateTransaksiKoperasiDto) {
    return `This action updates a #${id} transaksiKoperasi`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaksiKoperasi`;
  }
}

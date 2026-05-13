import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Stok } from 'src/inventaris/stok/entities/stok.entity';
import { Karyawan } from 'src/koperasi/karyawan/entities/karyawan.entity';
import { TransaksiWaserda } from 'src/waserda/transaksi-waserda/entities/transaksi-waserda.entity';

@Entity()
export class Toko {
  @PrimaryGeneratedColumn()
  idToko: number;

  @Column()
  namaToko: string;

  @Column({ nullable: true, type: 'text' })
  alamat: string;

  // Relasi: Satu Toko punya Banyak Produk
  @OneToMany(() => Stok, (stok) => stok.toko)
  stok: Stok[];

  @OneToMany(() => Karyawan, (karyawan) => karyawan.toko)
  karyawan : Karyawan[];

  @OneToMany(() => TransaksiWaserda, (tw) => tw.toko)
  transaksiWaserda: TransaksiWaserda[];

 }
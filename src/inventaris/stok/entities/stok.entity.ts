import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Produk } from 'src/inventaris/produk/entities/produk.entity';
import { Toko } from 'src/koperasi/toko/entities/toko.entity';
import { DetailTransaksiWaserda } from 'src/waserda/detail-transaksi-waserda/entities/detail-transaksi-waserda.entity';
import { TambahStok } from 'src/inventaris/tambah-stok/entities/tambah-stok.entity';
import { HapusStok } from 'src/inventaris/hapus-stok/entities/hapus-stok.entity';

@Entity()
export class Stok {
    @PrimaryGeneratedColumn()
    idStok: number;

    @Column()
    jumlahStok: number;

    @Column()
    satuan: string;

    @Column({ type: 'numeric', precision: 15, scale: 0 })
    hargaJual: number;
    
    @Column()
    idProduk: number;

    @Column()
    idToko: number; 

    @ManyToOne(() => Produk, (produk) => produk.stok, { eager: true })
    @JoinColumn({name: 'idProduk'})
    produk: Produk;

    @ManyToOne(() => Toko, (toko) => toko.stok, { eager: true })
    @JoinColumn({ name: 'idToko' })
    toko: Toko;

    @OneToMany(() => DetailTransaksiWaserda, (dtw) => dtw.stok)
    detailTransaksiWaserda: DetailTransaksiWaserda[];

    @OneToMany(() => HapusStok, (hapusstok)=> hapusstok.stok)
    hapusStok: HapusStok[];

    @OneToMany(() => TambahStok, (tambahstok) => tambahstok.stok)
    tambahStok: TambahStok[];
}

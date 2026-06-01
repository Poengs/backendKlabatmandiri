import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { TransaksiKoperasi } from 'src/koperasi/transaksi-koperasi/entities/transaksi-koperasi.entity';
import { Stok } from 'src/inventaris/stok/entities/stok.entity';
import { Toko } from 'src/koperasi/toko/entities/toko.entity';
import { Karyawan } from 'src/koperasi/karyawan/entities/karyawan.entity';

@Entity()
export class TambahStok {
    @PrimaryGeneratedColumn()
    idTambahStok: number;

    @Column()
    jumlah: number;

    @Column({type: 'text', nullable: true})
    keterangan: string;

    @Column({ type: 'numeric', precision: 15, scale: 0 })
    hargaBeli: number;

    @Column()
    idTransaksiKoperasi: number;

    @Column()
    idStok: number;

    @Column()
    idKaryawan: string;

    @ManyToOne(() => TransaksiKoperasi, (transkop) => transkop.tambahStok, { eager: true })
    @JoinColumn({name: 'idTransaksiKoperasi'})
    transaksiKoperasi: TransaksiKoperasi;

    @ManyToOne(() => Stok, (stok) => stok.tambahStok, { eager: true })
    @JoinColumn({ name: 'idStok' })
    stok: Stok;

    @ManyToOne (() => Karyawan, (karyawan) => karyawan.tambahStok, { eager: true })
    @JoinColumn({name: 'idKaryawan'})
    karyawan: Karyawan;
}

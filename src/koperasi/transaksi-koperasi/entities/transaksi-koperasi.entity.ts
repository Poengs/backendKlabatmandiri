import { TambahStok } from 'src/inventaris/tambah-stok/entities/tambah-stok.entity';
import { Karyawan } from 'src/koperasi/karyawan/entities/karyawan.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';

@Entity()
export class TransaksiKoperasi {
    @PrimaryGeneratedColumn()
    idTransaksiKoperasi: number;

    @Column({
    type: 'enum',
    enum: ['Pemasukan', 'Pengeluaran'],
    })
    jenisTransaksi: string;

    @Column({type: 'text'})
    keterangan: string;

    @Column({type: 'date'})
    tanggalTransaksi: string;

    @CreateDateColumn({type: 'timestamp'})
    tanggalCreate: Date;

    @Column({ type: 'numeric', precision: 15, scale: 0 })
    nominal: number;

    @Column()
    kategori: string;

    @Column({nullable: true, type: 'text'})
    bukti: string;

    @Column()
    idKaryawan: string;

    @OneToMany(() => TambahStok, (tambahstok) => tambahstok.transaksiKoperasi)
    tambahStok: TambahStok[];

    @ManyToOne(() => Karyawan, (karyawan) => karyawan.transaksiKoperasi, { eager: true })
    @JoinColumn({ name: 'idKaryawan' })
    karyawan: Karyawan;
}

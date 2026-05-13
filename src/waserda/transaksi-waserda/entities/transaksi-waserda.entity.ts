import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Toko } from '../../../koperasi/toko/entities/toko.entity';
import { Karyawan } from 'src/koperasi/karyawan/entities/karyawan.entity';
import { DetailTransaksiWaserda } from 'src/waserda/detail-transaksi-waserda/entities/detail-transaksi-waserda.entity';

@Entity()
export class TransaksiWaserda {
    @PrimaryGeneratedColumn()
    idTransaksiWaserda: number;

    @CreateDateColumn({ type: 'timestamp' })
    tanggal: Date;

    @Column({ type: 'numeric', precision: 15, scale: 0 })
    totalHarga: number;
    
    @Column()
    jenisBayar: string;

    @Column({ nullable: true, type: 'numeric', precision: 15, scale: 0  })
    totalBayar: number;

    @Column()
    idKaryawan: string;

    @Column()
    idToko: number;

    @ManyToOne(() => Karyawan, (karyawan) => karyawan.transaksiWaserda)
    @JoinColumn({name: 'idKaryawan'})
    karyawan: Karyawan;

    @ManyToOne (() => Toko, (toko) => toko.transaksiWaserda)
    @JoinColumn({name: 'idToko'})
    toko: Toko;

    @OneToMany (() => DetailTransaksiWaserda, (dtw) => dtw.transaksiWaserda)
    detailTransaksiWaserda: DetailTransaksiWaserda[];
}

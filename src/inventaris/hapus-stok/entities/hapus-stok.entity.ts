import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Stok } from 'src/inventaris/stok/entities/stok.entity';
import { Karyawan } from 'src/koperasi/karyawan/entities/karyawan.entity';

@Entity()
export class HapusStok {
    @PrimaryGeneratedColumn()
    idHapusStok: number;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    tanggal: Date;

    @Column()
    jumlah: number;

    @Column({type: 'text'})
    alasan: string;

    @Column()
    hargaSatuan: number;

    @Column()
    totalKerugian: number;

    @Column()
    keterangan: string;

    @Column()
    idStok: number;

    @Column() 
    idKaryawan: string;

    @ManyToOne(() => Stok, (stok) => stok.hapusStok)
    @JoinColumn({ name: 'idStok' })
    stok: Stok;

    @ManyToOne(() => Karyawan, (karyawan) => karyawan.hapusStok)
    @JoinColumn({ name: 'idKaryawan'})
    karyawan: Karyawan;
}

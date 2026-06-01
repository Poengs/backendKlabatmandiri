import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Stok } from 'src/inventaris/stok/entities/stok.entity';
import { TransaksiWaserda } from 'src/waserda/transaksi-waserda/entities/transaksi-waserda.entity';

@Entity()
export class DetailTransaksiWaserda {
    
    @PrimaryGeneratedColumn()
    idDetailTransaksiWaserda: number;

    @Column()
    jumlah: number;

    @Column({ type: 'numeric', precision: 15, scale: 0 })
    hargaSatuan: number;
    
    @Column({ type: 'numeric', precision: 15, scale: 0 })
    totalHargaItem: number;

    @Column()
    idStok: number;

    @Column()
    idTransaksiWaserda: number;

    @ManyToOne(() => Stok, (stok) => stok.detailTransaksiWaserda, { eager: true })
    @JoinColumn({name: 'idStok'})
    stok: Stok;

    @ManyToOne(() => TransaksiWaserda, (tw)=> tw.detailTransaksiWaserda, { eager: true })
    @JoinColumn({name: 'idTransaksiWaserda' })
    transaksiWaserda: TransaksiWaserda;
}

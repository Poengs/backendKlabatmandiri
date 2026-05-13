import { Pinjaman } from 'src/pinjam/pinjaman/entities/pinjaman.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Pelunasan {
    @PrimaryGeneratedColumn()
    idLunas: number;

    @Column({ type: 'numeric', precision: 15, scale: 0 })
    nominal: number;

    @Column({ type: 'numeric', precision: 15, scale: 0 })
    bungaBerlaku: number;

    @Column({ type: 'numeric', precision: 15, scale: 0 })
    totalTagihan: number;

    @Column()
    status: string;

    @CreateDateColumn({type: 'timestamp'})
    tanggalBuat: Date;

    @Column({nullable: true})
    persetujuan: boolean;

    @Column({type: 'date',nullable: true})
    tanggalkeputusan: Date;

    @Column({type: 'date',nullable: true})
    tanggalBayar: string;
    
    @Column({nullable: true})
    buktiBayar: string;

    @Column()
    idPinjaman: number;

    @OneToOne(() => Pinjaman, (pinjaman) => pinjaman.pelunasan)
    @JoinColumn({name: 'idPinjaman'})    
    pinjaman: Pinjaman;
}

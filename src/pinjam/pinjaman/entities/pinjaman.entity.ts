import {Perubahan } from 'src/pinjam/perubahan/entities/perubahan.entity';
import { Permohonan } from 'src/pinjam/permohonan/entities/permohonan.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Pinjaman {
    @PrimaryGeneratedColumn()
    idPinjaman: number;

    @Column({ type: 'numeric', precision: 15, scale: 0 })
    sisaPokok: number;

    @Column({ type: 'numeric', precision: 15, scale: 0 })
    bungaBerlaku: number; //bentuknya persen

    @Column({ type: 'numeric', precision: 15, scale: 0 })
    tagihan: number;

    @Column()
    sisaTenor: number;

    @Column()
    status: string;
    
    @Column()
    idPermohonan: number;

    @OneToOne(() => Permohonan, (permohonan) => permohonan.pinjaman)
    @JoinColumn({name: 'idPermohonan'})
    permohonan: Permohonan;

    @OneToMany(() => Perubahan, (perubahan) => perubahan.pinjaman)
    perubahan: Perubahan[];
}

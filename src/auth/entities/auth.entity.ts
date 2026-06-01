import { Karyawan } from 'src/koperasi/karyawan/entities/karyawan.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    idAuth: number;

    @Column()
    refreshToken: string;

    @Column()
    statusAktif: boolean;

    @CreateDateColumn({type: 'timestamp'})
    waktuBuat: Date;

    @Column({nullable: true})
    ip: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    expired_at: Date;

    @Column({nullable: true})
    userAgent: string;

    @Column()
    idKaryawan: string;

    @ManyToOne(() => Karyawan, (karyawan) => karyawan.auth, { eager: true })
    @JoinColumn({ name: 'idKaryawan' })
    karyawan: Karyawan;
}

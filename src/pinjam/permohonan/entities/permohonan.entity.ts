import { Karyawan } from 'src/koperasi/karyawan/entities/karyawan.entity';
import { Pinjaman } from 'src/pinjam/pinjaman/entities/pinjaman.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Permohonan {
    @PrimaryGeneratedColumn()
    idPermohonan: number;

    @Column({ type: 'numeric', precision: 15, scale: 0 })
    jumlahPinjaman: number;

    @Column()
    tenor: number;

    @Column({ nullable: true, unique: true })
    nomorSurat: String; // akan digenerate sendiri

    @Column({type: 'text'})
    keperluan: string;

    @CreateDateColumn({type: 'timestamp'})
    tanggalPengajuan: Date;

    @Column({nullable: true})
    persetujuan: boolean;

    @Column({type: 'timestamp', nullable: true})
    tanggalKeputusan: Date;

    @Column({nullable: true, type: 'text'})
    buktiPenerimaan: string;

    @Column({nullable: true, type: 'timestamp'})
    tanggalPenerimaan: Date;

    @Column({ default: 'Menunggu' })
    status: string;

    @Column()
    saksi: string;

    @Column()
    kepalaBagian: string;

    @Column()
    idPemohon: string;

    @Column({ nullable: true })
    idPenyetuju: string;
        
    @Column({ nullable: true })
    idPemberi: string;

    @ManyToOne(() => Karyawan, (peminjam)=> peminjam.daftarPemohon)
    @JoinColumn({name: 'idPemohon'})
    pemohon: Karyawan;

    @ManyToOne(() => Karyawan, (peminjam)=> peminjam.daftarPersetujuan)
    @JoinColumn({ name: 'idPenyetuju' })
    penyetuju: Karyawan;

    @ManyToOne(() => Karyawan, (peminjam)=> peminjam.daftarPemberian)
    @JoinColumn({ name: 'idPemberi' })
    pemberi: Karyawan;

    @OneToOne(() => Pinjaman, (pinjaman) => pinjaman.permohonan)
    pinjaman: Pinjaman;
}

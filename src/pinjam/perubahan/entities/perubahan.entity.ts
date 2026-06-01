import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TenorOption } from "../jenisAksi.enum";
import { Pinjaman } from "src/pinjam/pinjaman/entities/pinjaman.entity";
import { Karyawan } from "src/koperasi/karyawan/entities/karyawan.entity";

export class Perubahan {
    @PrimaryGeneratedColumn()
    idPerubahan: number;

    @Column({
        type: 'enum',
        enum: TenorOption,
        nullable: false
    })
    jenisAksi: TenorOption;

    @CreateDateColumn({ type: 'timestamp'})
    tanggalBuat: Date;

    
    @Column({nullable: true})
    persetujuan: boolean;

    @Column({type: 'timestamp', nullable: true})
    tanggalKeputusan: Date;

    @Column()
    status: string;

    @Column({ nullable: true})
    bukti: string;

    @Column({ nullable: true})
    tanggalUnggah: Date;

    @Column()
    idPinjaman: number;

    @Column()
    idPengupload: string;

    @Column()
    idpenyetuju: string;

    @Column({ type: 'json'})
    dataPengajuan: Record<string, any>;

    @Column({ type: 'json'})
    dataSebelumnya: Record<string, any>;

    @ManyToOne(() => Pinjaman, (pinjaman) => pinjaman.perubahan, { eager: true })
    pinjaman: Pinjaman;

    @ManyToOne(() => Karyawan, (karyawan) => karyawan.daftarPenyetujuPerubahanPinjaman, { eager: true })
    @JoinColumn({ name: 'idPenyetuju'})
    penyetuju: Karyawan;

    @ManyToOne(() => Karyawan, (karyawan) => karyawan.daftarPenguploadPerubahanPinjaman, { eager: true})
    @JoinColumn({ name: 'idPengupload'})
    pengupload: Karyawan;

}

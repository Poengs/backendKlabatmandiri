import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, JoinColumn, BeforeInsert, PrimaryColumn } from 'typeorm';
import { Toko } from 'src/koperasi/toko/entities/toko.entity';
import { TransaksiWaserda } from 'src/waserda/transaksi-waserda/entities/transaksi-waserda.entity';
import { HapusStok } from 'src/inventaris/hapus-stok/entities/hapus-stok.entity';
import { TambahStok } from 'src/inventaris/tambah-stok/entities/tambah-stok.entity';
import { TransaksiKoperasi } from 'src/koperasi/transaksi-koperasi/entities/transaksi-koperasi.entity';
import { Permohonan } from 'src/pinjam/permohonan/entities/permohonan.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Entity()
export class Karyawan {
    @PrimaryColumn()
    idKaryawan: string;

    // jika id karyawan tidak di isi.
    @BeforeInsert()
    generateId() {
        if (!this.idKaryawan) {
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        this.idKaryawan = (timestamp + random);
        }
    }

    @Column()
    nama: string;

    @Column({ nullable: true })
    jabatan: string;

    @Column()
    status: string;

    @Column({ nullable: true })
    email: string;

    @Column()
    limit: number;

    @Column({nullable: true})
    password: string;

    @Column({nullable: true})
    alamat: string;

    @CreateDateColumn({type: 'timestamp'})
    tanggalBuatAkun: Date;

    @Column({type: 'date'})
    tanggalBergabung: string;

    @Column({ default: 0 })
    nominalSimpananWajib: number;

    @Column({type: 'timestamp', nullable: true})
    loginTerakhir: Date;

    @Column()
    role: string;

    @Column()
    idToko: number;

    @ManyToOne(() => Toko, (toko) => toko.karyawan, {nullable: true})
    @JoinColumn({name: 'idToko'})
    toko: Toko;

    // Waserda
    @OneToMany(() => TransaksiWaserda, (tw) => tw.karyawan)
    transaksiWaserda: TransaksiWaserda[];

    @OneToMany(() => HapusStok, (hapusstok) => hapusstok.karyawan)
    hapusStok: HapusStok[];

    @OneToMany(() => TambahStok, (tambahstok) => tambahstok.karyawan)
    tambahStok: TambahStok[];

    @OneToMany(() => TransaksiKoperasi, (transkop) => transkop.karyawan)
    transaksiKoperasi: TransaksiKoperasi[]; 

    // Permohonan
    @OneToMany(() => Permohonan, (permohonan) => permohonan.pemohon)
    daftarPemohon: Permohonan[];

    @OneToMany(() => Permohonan, (permohonan) => permohonan.penyetuju)
    daftarPersetujuan: Permohonan[];

    @OneToMany(() => Permohonan, (permohonan) => permohonan.pemberi)
    daftarPemberian: Permohonan[];

    // login
    @OneToMany(() => Auth, (auth) => auth.karyawan)
    auth: Auth[];
}

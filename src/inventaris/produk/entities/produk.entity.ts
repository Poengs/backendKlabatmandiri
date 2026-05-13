import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Stok } from '../../stok/entities/stok.entity';

@Entity()
export class Produk {
    @PrimaryGeneratedColumn()
    idProduk: number;

    @Column()
    namaProduk: string;

    @Column({ nullable: true, unique: true })
    barcode: string;

    @OneToMany(() => Stok, (stok) => stok.produk)
    stok: Stok[];
}

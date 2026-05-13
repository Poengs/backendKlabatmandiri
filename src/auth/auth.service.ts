import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { KaryawanService } from 'src/koperasi/karyawan/karyawan.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
    private readonly karyawanService: KaryawanService,
    private jwtService: JwtService
    
  ) {}
  async login(dto: CreateAuthDto, ip: string, userAgent: string): Promise<any> {
    const user = await this.karyawanService.findOne(dto.idKaryawan);
    if (!user || !user.password) {
      throw new UnauthorizedException('ID/Password Salah');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('ID/Password Salah');
    }

    const payload = { sub: user.idKaryawan, role: user.role};
    const accessToken = this.jwtService.sign(payload);
    //Expired
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1); // Tambah 1 hari

    await this.authRepo.save({
      refreshToken: accessToken,
      idKaryawan: user.idKaryawan,
      statusAktif: true,
      expired_at: expirationDate,
      userAgent: userAgent,
      ip: ip
    })

    const { password, ...profile } = user;

    return {
      profile: profile,
      access_token: accessToken
    }
  }
}

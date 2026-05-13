import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Karyawan } from 'src/koperasi/karyawan/entities/karyawan.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { KaryawanModule } from 'src/koperasi/karyawan/karyawan.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([
    Auth,
    Karyawan
  ]),
  KaryawanModule,
  PassportModule,
  JwtModule.registerAsync({
    global: true,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { 
        // Tambahkan 'as any' di sini agar TypeScript berhenti protes
        expiresIn: (configService.get<string>('JWT_EXPIRATION') || '1d') as any 
      },
    }),
    inject: [ConfigService],
  }),
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

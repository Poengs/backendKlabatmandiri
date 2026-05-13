import { SetMetadata } from '@nestjs/common';

// Definisi Role (Enum)
export enum Role {
  ADMIN = 'admin',
  KARYAWAN = 'karyawan',
  KETUA = 'ketua',
  BENDAHARA = 'bendahara',
  PENGURUS = 'pengurus',
  PENGELOLA = 'pengelola',
}

// Definisi Decorator (Metadata)
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
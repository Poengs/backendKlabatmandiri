import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export const multerConfig = (folderName: string) => ({
  storage: diskStorage({
    destination: `./uploads/${folderName}`,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      // Tetap gunakan format nama unik agar tidak terjadi file overwrite
      cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
});

export const processUpload = async (file: Express.Multer.File) => {
  try {
    // Karena tidak ada proses kompresi, kita langsung mengembalikan nama file asli
    // yang sudah disimpan oleh diskStorage Multer ke folder tujuan.
    
    if (!file || !file.filename) {
      throw new Error('File tidak ditemukan');
    }

    return file.filename;
  } catch (error) {
    console.error('Gagal memproses file:', error);
    throw new BadRequestException('Gagal memproses file upload.');
  }
};
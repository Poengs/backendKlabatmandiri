// database/data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

// Membaca file .env yang ada di luar
dotenv.config();

console.log('=== ENV CHECK ===');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PASSWORD exists:', !!process.env.DB_PASSWORD);
console.log('=================');

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as any || 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // TypeORM CLI akan mencari entity di folder src
  entities: [
  'dist/**/*.entity{.ts,.js}', 
  'src/**/*.entity{.ts,.js}'
  ],
  // TypeORM CLI akan menyimpan hasil generate migrasi di folder database/migrations
  migrations: ['database/migrations/*{.ts,.js}'],
  
  // Wajib false agar data aman!
  synchronize: false, 
};


const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
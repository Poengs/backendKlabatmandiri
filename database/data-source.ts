// database/data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

// Membaca file .env yang ada di luar
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as any || 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // TypeORM CLI akan mencari entity di folder src
  entities: ['src/**/*.entity{.ts,.js}'],
  
  // TypeORM CLI akan menyimpan hasil generate migrasi di folder database/migrations
  migrations: ['database/migrations/*{.ts,.js}'],
  
  // Wajib false agar data aman!
  synchronize: false, 
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
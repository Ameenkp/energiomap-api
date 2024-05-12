import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();
const config: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '../models/entity/*.entity.{ts,js}')],
    synchronize: false,
    migrations: [join(__dirname, '../migrations/*.{ts,js}')],
    migrationsTableName: "migrations",
    logging: true,
    logNotifications: true,
    parseInt8: true,
    applicationName: "energiomap-api",
};

const AppDataSource:DataSource = new DataSource(config);

export { AppDataSource };

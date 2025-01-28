import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Define the interface for the DB config
interface DBConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}

// Parse the DB config from the environment variable
const dbDetails: DBConfig = {
    "host": `${process.env.DB_HOST}`,
    "user": `${process.env.DB_USER}`,
    "password": `${process.env.DB_PASSWORD}`,
    "database": `${process.env.DB_SCHEME}`,
}

// Sequelize ORM configuration
const sequelize = new Sequelize(dbDetails.database, dbDetails.user, dbDetails.password, {
    host: dbDetails.host,
    dialect: 'mysql',
    timezone: '+03:00',
});

export default sequelize;

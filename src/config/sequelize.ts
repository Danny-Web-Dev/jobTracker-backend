import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

interface DBConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}

const dbDetails: DBConfig = {
    "host": `${process.env.DB_HOST}`,
    "user": `${process.env.DB_USER}`,
    "password": `${process.env.DB_PASSWORD}`,
    "database": `${process.env.DB_SCHEME}`,
}

const sequelize = new Sequelize(dbDetails.database, dbDetails.user, dbDetails.password, {
    host: dbDetails.host,
    dialect: 'mysql',
    timezone: '+03:00',
});

export default sequelize;

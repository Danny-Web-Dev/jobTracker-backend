import express, {Application} from 'express';
import dotenv from 'dotenv';
import sequelize from './config/sequelize';
import userController from './controllers/user';
import shortCodeController from './controllers/shortCode'
import wrapResponse from "./middlewares/serverResponse";
import loginFilter from "./middlewares/loginFilter";

dotenv.config();

const app: Application = express();
const PORT: string | number = process.env.PORT || 3000;

// Middlewares
app.use(express.json());


// connect the DB
(async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.use(wrapResponse)

app.use(loginFilter)
// Routes
app.use('/user', userController);
app.use('/sc', shortCodeController);

app.listen(PORT, (): void => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

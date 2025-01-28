import express, { Application } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/sequelize';
import authRoutes from './routes/authRoutes';
import wrapResponse from "./middlewares/serverResponse";
// import applicationRoutes from './routes/applicationRoutes';

dotenv.config();

const app: Application = express();
const PORT: string | number = process.env.PORT || 3000;

// Middleware
app.use(express.json());


(async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.use(wrapResponse)

// Routes
app.use('/api', authRoutes);
// app.use('/applications', applicationRoutes);

// Start server
app.listen(PORT, (): void => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

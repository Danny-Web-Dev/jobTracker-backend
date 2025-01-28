import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ErrorTypes from "../errors/errorTypes";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Paths that don't require authentication
const EXCLUDED_PATHS: string[] = [
    '/user/login',
    '/user/register',
];

const loginFilter = (req: Request, res: Response, next: NextFunction): void => {
    if (EXCLUDED_PATHS.includes(req.path)) {
        next(); // Skip authentication for excluded paths
        return;
    }

    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
         res.json({message: ErrorTypes.UNAUTHORIZED.message, statusCode: ErrorTypes.UNAUTHORIZED.httpCode});
         return;
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the JWT token and add to request
        req.body.userToken = jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        res.json({message: ErrorTypes.UNAUTHORIZED.message, statusCode: ErrorTypes.UNAUTHORIZED.httpCode});
    }
};

export default loginFilter;
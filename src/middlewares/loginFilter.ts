import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ErrorTypes from "../errors/errorTypes";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Paths that don't require authentication
const EXCLUDED_PATHS: string[] = [
    '/user/login',
    '/user/register',
    '/sc/*'
];

const loginFilter = (req: Request, res: Response, next: NextFunction): void => {
    const isExcluded = EXCLUDED_PATHS.some(path =>
        path === req.path || (path.endsWith('/*') && req.path.startsWith(path.slice(0, -1)))
    );

    if (isExcluded) {
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
        res.locals.user = jwt.verify(token, JWT_SECRET);
        res.locals.user.data = jwt.decode(token);
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        res.json({message: ErrorTypes.UNAUTHORIZED.message, statusCode: ErrorTypes.UNAUTHORIZED.httpCode});
    }
};

export default loginFilter;
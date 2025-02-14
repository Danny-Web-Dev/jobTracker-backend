import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ErrorTypes from "../errors/errorTypes";
import {Jwt} from "../utils/jwt";


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

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
        next();
        return;
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.json({message: ErrorTypes.UNAUTHORIZED.message, statusCode: ErrorTypes.UNAUTHORIZED.errorCode});
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, JWT_SECRET);
        const data = jwt.decode(token, {json: true}) || {};
        Jwt.getInstance().setTokenData(data);
        Jwt.getInstance().setUserId(data.id);
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        res.json({message: ErrorTypes.UNAUTHORIZED.message, statusCode: ErrorTypes.UNAUTHORIZED.errorCode});
    }
};

export default loginFilter;
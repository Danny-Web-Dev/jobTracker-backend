import expressJwt from 'express-jwt';
import express from "express";

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateJwt = (req: express.Request, res: express.Response, next: express.NextFunction) => {

}
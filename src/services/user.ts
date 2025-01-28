import User from "../models/user";
import {Request} from "express";
import bcrypt from "bcrypt";
import ServerError from "../errors/serverError";
import jwt from "jsonwebtoken";
import ErrorType from "../errors/errorTypes";
import ErrorTypes from "../errors/errorTypes";

const register = async (data: Request): Promise<User> => {
    const { name, email, password } = data.body;

    if (!name || !email || !password) {
        throw new ServerError(ErrorType.MISSING_PARAMETERS.message, ErrorTypes.MISSING_PARAMETERS.httpCode);
    }

    const existingUser = await User.findOne({where: {email}});
    if (existingUser) {
        throw new ServerError(ErrorType.USER_ALREADY_EXIST.message, ErrorType.USER_ALREADY_EXIST.httpCode);
    }

    data.body.password = await bcrypt.hash(data.body.password, 10);
    return await User.create(data.body);
}

const login = async (email: string, password: string) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        console.error('No JWT secret found in the .env file');
        throw new ServerError(ErrorType.GENERAL_ERROR.message, ErrorType.GENERAL_ERROR.httpCode);
    }
    const user = await User.findOne({where: {email}});
    if (!user) {
        throw new ServerError(ErrorType.USER_DOES_NOT_EXIST.message, ErrorType.USER_DOES_NOT_EXIST.httpCode);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ServerError(ErrorType.UNAUTHORIZED.message, ErrorType.UNAUTHORIZED.httpCode);
    }

    return jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1h'});
}

export {
    register,
    login
}
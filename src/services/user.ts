import User from "../models/user";
import {Request} from "express";
import bcrypt from "bcrypt";
import ServerError from "../errors/serverError";
import jwt from "jsonwebtoken";
import ErrorType from "../errors/errorTypes";
import ShortCode from "../models/shortCode";
import dictionary from "../config/dictionary";
import {notifyDev} from "./notifier";

const register = async (data: Request): Promise<User> => {
    const { name, email, password } = data.body;

    if (!name || !email || !password) {
        throw new ServerError(ErrorType.BAD_REQUEST.message, ErrorType.BAD_REQUEST.errorCode);
    }

    const existingUser = await User.findOne({where: {email}});
    if (existingUser) {
        throw new ServerError(ErrorType.USER_ALREADY_EXIST.message, ErrorType.USER_ALREADY_EXIST.errorCode);
    }

    data.body.password = await bcrypt.hash(data.body.password, 10);
    return await User.create(data.body);
}

const login = async (email: string, password: string): Promise<string> => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        console.error('No JWT secret found in the .env file');
        throw new ServerError(ErrorType.GENERAL_ERROR.message, ErrorType.GENERAL_ERROR.errorCode);
    }

    const user = await User.findOne({where: {email}, raw: true});
    if (!user?.is_email_validated) {
        throw new ServerError(ErrorType.EMAIL_IS_NOT_VALIDATED.message, ErrorType.EMAIL_IS_NOT_VALIDATED.errorCode);
    }

    if (!user) {
        throw new ServerError(ErrorType.USER_DOES_NOT_EXIST.message, ErrorType.USER_DOES_NOT_EXIST.errorCode);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ServerError(ErrorType.UNAUTHORIZED.message, ErrorType.UNAUTHORIZED.errorCode);
    }

    return jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1h'});
}

const getById = async (id: number): Promise<object> => {
    const user: User | null = await User.findByPk(id);
    if (!user) {
        throw new ServerError(ErrorType.USER_DOES_NOT_EXIST.message, ErrorType.USER_DOES_NOT_EXIST.errorCode);
    }
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        active: user.active
    };
}

const validateEmail = async (shortCode: string): Promise<void> => {
    const shortCodeRow = await ShortCode.findOne({ where: { short_code: shortCode },  raw: true });
    const result = await User.update(
        {is_email_validated: true},
        {where: {id: shortCodeRow?.user_id}}
    );
    if (!result) {
        await notifyDev(dictionary.email.validation.error, dictionary.email.validation.subject);
        console.error(dictionary.email.validation.error);
    }

}

export {
    register,
    login,
    getById,
    validateEmail
}
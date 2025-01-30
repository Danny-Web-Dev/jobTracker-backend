import nodemailer, {SentMessageInfo} from 'nodemailer';
import dotenv from "dotenv";
import dictionary from "../config/dictionary";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import * as fs from 'fs';
import {createUrl} from "./url";
import ServerError from "../errors/serverError";
import ErrorTypes from "../errors/errorTypes";
import ErrorType from "../errors/errorTypes";

dotenv.config();

const init = (): nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options> => {
    try {
        const googlePassPath = process.env.EMAIL_PASS || '';
        const googlePassword = fs.readFileSync(googlePassPath, 'utf8');
        return nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: googlePassword,
            },
        });
    } catch (error: any) {
        console.error('Error reading file:', error);
        throw new ServerError(ErrorTypes.GOOGLE_MAIL_SERVICE_FAILURE.message, ErrorType.GOOGLE_MAIL_SERVICE_FAILURE.errorCode);
    }
}

const sendEmailValidation = async (emailAddress: string, userId: number): Promise<SentMessageInfo> => {
    try {
        const url = await createUrl(userId);
        const message = `${dictionary.email.validation.message} <br><br> <a href="${url}" style="color: blue; text-decoration: underline;">Validate!</a>`;
        const data = {
            from: process.env.EMAIL_USER,
            to: emailAddress,
            subject: dictionary.email.validation.subject,
            html: message,
        }
        await sendEmail(data);
    } catch (error: any) {
        console.error(error.message);
        throw new ServerError(ErrorTypes.GENERAL_ERROR.message, ErrorType.GENERAL_ERROR.errorCode);
    }

}

const sendEmail = async (data: object): Promise<SentMessageInfo> => {
    const transporter = init();
    return await transporter.sendMail(data);
}

export {
    sendEmailValidation,
}
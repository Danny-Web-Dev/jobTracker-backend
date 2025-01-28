import nodemailer, {SentMessageInfo} from 'nodemailer';
import dotenv from "dotenv";
import ServerError from "../errors/serverError";
import ErrorType from "../errors/errorTypes";
import ErrorTypes from "../errors/errorTypes";
import dictionary from "../config/dictionary";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Otp from "../models/otp";

dotenv.config();

const init = (): nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options> => {
    return nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
}

export const sendEmailOtp = async (emailAddress: string, userId: number): Promise<SentMessageInfo> => {
    try {
        const otpCode = getRandomOtp();
        const message = dictionary.email.otp.message + ` ${otpCode}`;
        const data = {
            from: process.env.EMAIL_USER,
            to: emailAddress,
            subject: dictionary.email.otp.subject,
            text: message,
        }
        await sendEmail(data);
        await saveAttempt(userId, otpCode)
    } catch (error: any) {
        console.error(error.message);
        throw new ServerError(ErrorType.FAILED_TO_SEND_EMAIL.message, ErrorTypes.FAILED_TO_SEND_EMAIL.httpCode, ` emailAddress: ${emailAddress}.`);
    }

}

const sendEmail = async (data: object): Promise<SentMessageInfo> => {
    const transporter = init();
    return await transporter.sendMail(data);
}

const getRandomOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const saveAttempt = async (userId: number, otpCode: string):Promise<Otp> => {
    return await Otp.create({user_id: userId, otp_code: otpCode});
}

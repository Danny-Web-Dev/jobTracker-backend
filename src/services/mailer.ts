import nodemailer, {SentMessageInfo} from 'nodemailer';
import dotenv from "dotenv";
import dictionary from "../config/dictionary";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Otp from "../models/otp";
import {createUrl} from "./url";

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

const sendEmailOtp = async (emailAddress: string, userId: number): Promise<SentMessageInfo> => {
    try {
        const url = await createUrl(userId);
        const message = `${dictionary.email.otp.message} <br><br> <a href="${url}" style="color: blue; text-decoration: underline;">Validate!</a>`;
        const data = {
            from: process.env.EMAIL_USER,
            to: emailAddress,
            subject: dictionary.email.otp.subject,
            html: message,
        }
        await sendEmail(data);
    } catch (error: any) {
        console.error(error.message);
    }

}

const sendEmail = async (data: object): Promise<SentMessageInfo> => {
    const transporter = init();
    return await transporter.sendMail(data);
}

export {
    sendEmailOtp,
}
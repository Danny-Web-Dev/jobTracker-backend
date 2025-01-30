import {sendEmail} from "./mailer";

const notifyDev = async (message: string, subject: string):Promise<void> => {
    const data = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: subject,
        html: message,
    }
    return await sendEmail(data);
}

export {
    notifyDev
}
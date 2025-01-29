import Otp from "../models/otp";

const saveAttempt = async (userId: number, otpCode: string):Promise<Otp> => {
    return await Otp.create({user_id: userId, otp_code: otpCode});
}

const getRandom = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
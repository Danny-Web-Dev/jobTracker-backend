import dotenv from "dotenv";
import ShortCode from "../models/shortCode";
import ServerError from "../errors/serverError";
import ErrorType from "../errors/errorTypes";
import User from "../models/user";
import shortCode from "../models/shortCode";
import ErrorTypes from "../errors/errorTypes";

dotenv.config();

const createUrl = async (userId: number):Promise<string> => {
    try {
        const shortCode = await generateUniqueShortCode()
        await saveShortCode(userId, shortCode);
        return process.env.HOST_ADDRESS + '/sc/' + shortCode;
    } catch (err) {
        console.error(err);
        throw new ServerError(ErrorType.FAILED_TO_CREATE_URL.message, ErrorType.FAILED_TO_CREATE_URL.errorCode);
    }
}

const saveShortCode = async (userId: number, shortCode: string): Promise<ShortCode> => {
   return await ShortCode.create({user_id: userId, short_code: shortCode});
}

const generateUniqueShortCode = async (): Promise<string> => {
    let randomString = '';
    let isUnique = false;

    while (!isUnique || !randomString.length) {
        randomString = generateRandomString();
        const existingCode = await ShortCode.findOne({ where: { short_code: randomString, is_active: true } });

        if (!existingCode) {
            isUnique = true;
        }
    }

    return randomString;
};

const generateRandomString = (length: number = 5): string => {
    const chars = [
        'abcdefghijklmnopqrstuvwxyz',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        '0123456789'
    ];

    let result = chars.map(set => set[Math.floor(Math.random() * set.length)]);
    while (result.length < length) {
        result.push([...chars.join('')][Math.floor(Math.random() * 62)]);
    }
    return result.sort(() => Math.random() - 0.5).join('');
};

const deactivate = async (shortCode: string): Promise<void> => {
    const isUrlActive = await isActive(shortCode);
    if (!isUrlActive) {
        throw new ServerError(ErrorTypes.LINK_IS_NOT_ACTIVE.message, ErrorType.LINK_IS_NOT_ACTIVE.errorCode);
    }
    const result = await ShortCode.update(
        {is_active: false},
        {where: {short_code: shortCode}}
    )

    if (!result) {
        console.error('unable to deactivate url. need to deactivate manually.');
    }
}

const isActive = async (shortCode: string): Promise<boolean> => {
    const result = await ShortCode.findOne({ where: { short_code: shortCode }, raw: true });
    return result?.is_active || false;
}

export {
    createUrl,
    deactivate,
    isActive
}
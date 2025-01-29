import Step from "../models/step";
import ServerError from "../errors/serverError";
import ErrorType from "../errors/errorTypes";

const create = async (title: string, userId: number): Promise<Step> => {
    try {
        if (!title || !userId) {
            throw new ServerError(ErrorType.BAD_REQUEST.message, ErrorType.BAD_REQUEST.errorCode);
        }
        return await Step.create({user_id: userId, title: title});
    } catch (error: any) {
        console.error(error);
        throw new ServerError(ErrorType.GENERAL_ERROR.message, ErrorType.GENERAL_ERROR.errorCode);
    }
}

const update = async (id: number, userId: number, updateData: object): Promise<any> => {
    try {
        const result = await Step.update(updateData, {where: {id: id, user_id: userId}});
        if (!result[0]) {
            throw new ServerError(ErrorType.FAILED_TO_UPDATE.message, ErrorType.FAILED_TO_UPDATE.errorCode);
        }
    } catch (error: any) {
        console.error(error);
        throw new ServerError(error.message, error.errorCode);
    }
}

export {
    create,
    update
}
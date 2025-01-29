import Step from "../models/step";
import ServerError from "../errors/serverError";
import ErrorType from "../errors/errorTypes";

const create = async (title: string, userId: number): Promise<Step> => {
    try {
        if (!title || !userId) {
            throw new ServerError(ErrorType.BAD_REQUEST.message, ErrorType.BAD_REQUEST.httpCode);
        }
        return await Step.create({user_id: userId, title: title});
    } catch (error: any) {
        console.error(error);
        throw new ServerError(ErrorType.GENERAL_ERROR.message, ErrorType.GENERAL_ERROR.httpCode);
    }
}

const update = async (id: number, userId: number, updateData: object): Promise<any> => {
    try {
        return await Step.update(updateData, {where: {id: id, user_id: userId}});
    } catch (error: any) {
        console.error(error);
    }
}

export {
    create,
    update
}
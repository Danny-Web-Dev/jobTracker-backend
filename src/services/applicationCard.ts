import ApplicationCard from "../models/applicationCard";
import ServerError from "../errors/serverError";
import ErrorType from "../errors/errorTypes";
import Sequelize from "../config/sequelize";

const create = async (description: object, userId: number): Promise<ApplicationCard> => {
    if (!description || !userId) {
        throw new ServerError(ErrorType.BAD_REQUEST.message, ErrorType.BAD_REQUEST.errorCode);
    }

    try {
        return await ApplicationCard.create({user_id: userId, description: description});
    } catch (error: any) {
        console.error(error);
        throw new ServerError(ErrorType.GENERAL_ERROR.message, ErrorType.GENERAL_ERROR.errorCode);
    }
}

const update = async (id: number, userId: number, updateData: object): Promise<any> => {
    const jsonData = await updateJsonFields(updateData);
    try {
        return await ApplicationCard.update(
            {description: Sequelize.literal(jsonData)},
            {where: {id: id, user_id: userId}}
        );
    } catch (error: any) {
        console.error(error);
        throw new ServerError(ErrorType.GENERAL_ERROR.message, ErrorType.GENERAL_ERROR.errorCode);
    }
}

const updateJsonFields = async (newData: object): Promise<string> => {
    return `JSON_SET(description, ${Object.entries(newData)
        .map(([key, value]) => `'$."${key}"', ${typeof value === 'string' ? `"${value}"` : `"${JSON.stringify(value)}"`}`)
        .join(', ')})`;
};

export {
    create,
    update
}
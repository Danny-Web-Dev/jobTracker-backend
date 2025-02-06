import {DataTypes, Optional} from 'sequelize';
import sequelize from '../config/sequelize';
import {DB_TABLES} from "../config/consts";
import {AbstractModel} from "./abstractModel";

interface ApplicationCardAttributes {
    id: number;
    creation_date: Date;
    user_id: number;
    description: object
    is_active: boolean;
}

interface ApplicationCardCreationAttributes extends Optional<ApplicationCardAttributes, 'id' | 'creation_date' | 'is_active'> {}

class ApplicationCard extends AbstractModel<ApplicationCardAttributes, ApplicationCardCreationAttributes> implements ApplicationCardAttributes {

    public user_id!: number;
    public description!: object
    public is_active!: boolean;
}

ApplicationCard.init(
    {
        ...AbstractModel.getCommonAttributes(),
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        description: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },
    {
        sequelize,
        modelName: DB_TABLES.APPLICATION_CARDS,
        timestamps: false,
    }
);

export default ApplicationCard;

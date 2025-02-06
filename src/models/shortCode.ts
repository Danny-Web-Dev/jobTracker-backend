import {DataTypes, Optional} from 'sequelize';
import sequelize from '../config/sequelize';
import {DB_TABLES} from "../config/consts";
import {AbstractModel} from "./abstractModel";

interface ShortCodeAttributes {
    id: number;
    creation_date: Date;
    short_code: string;
    is_active: boolean;
    user_id: number;
}

interface ShortCodeCreationAttributes extends Optional<ShortCodeAttributes, 'id' | 'creation_date' | 'is_active'> {}

class ShortCode extends AbstractModel<ShortCodeAttributes, ShortCodeCreationAttributes> implements ShortCodeAttributes {
    public short_code!: string;
    public is_active!: boolean;
    public user_id!: number;
}

ShortCode.init(
    {
        ...AbstractModel.getCommonAttributes(),
        short_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        sequelize,
        modelName: DB_TABLES.EMAIL_VALIDATION_SHORT_CODES,
        timestamps: false,
    }
);

export default ShortCode;
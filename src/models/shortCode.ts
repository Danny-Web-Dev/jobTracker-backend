import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/sequelize';

interface ShortCodeAttributes {
    id: number;
    creation_date: Date;
    short_code: string;
    is_active: boolean;
    user_id: number;
}

interface ShortCodeCreationAttributes extends Optional<ShortCodeAttributes, 'id' | 'creation_date' | 'is_active'> {
}

class ShortCode extends Model<ShortCodeAttributes, ShortCodeCreationAttributes> implements ShortCodeAttributes {
    public id!: number;
    public creation_date!: Date;
    public short_code!: string;
    public is_active!: boolean;
    public user_id!: number;
}

ShortCode.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        creation_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
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
        modelName: 'email_validation_short_codes',
        timestamps: false, // Disable automatic timestamps
    }
);

export default ShortCode;
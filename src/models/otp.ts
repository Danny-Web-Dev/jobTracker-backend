import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/sequelize';
import {format} from "date-fns";

interface OtpAttributes {
    id: number;
    user_id: number;
    otp_code: string;
    creation_date: Date;
}

interface OtpCreationAttributes extends Optional<OtpAttributes, 'id' | 'creation_date'> {
}

class Otp extends Model<OtpAttributes, OtpCreationAttributes> implements OtpAttributes {
    public id!: number;
    public user_id!: number;
    public otp_code!: string;
    public creation_date!: Date;
}

Otp.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        otp_code: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
        },
        creation_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
            get(): string | null {
                const rawValue = this.getDataValue('creation_date');
                return rawValue ? format(rawValue, 'yyyy-MM-dd HH:mm:ss') : null;
            }
        },
    },
    {
        sequelize,
        modelName: 'otp_attempts',
        timestamps: false,
    }
);

export default Otp;
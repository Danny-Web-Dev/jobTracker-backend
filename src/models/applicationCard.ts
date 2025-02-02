import {DataTypes, Model, Optional} from 'sequelize';
import { format } from 'date-fns';
import sequelize from '../config/sequelize';

interface ApplicationCardAttributes {
    id: number;
    creation_date: Date;
    user_id: number;
    description: object
    active: boolean;
}

interface ApplicationCardCreationAttributes extends Optional<ApplicationCardAttributes, 'id' | 'creation_date' | 'active'> {
}

class ApplicationCard extends Model<ApplicationCardAttributes, ApplicationCardCreationAttributes> implements ApplicationCardAttributes {
    public id!: number;
    public creation_date!: Date;
    public user_id!: number;
    public description!: object
    public active!: boolean;
}

ApplicationCard.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
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
        description: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    },
    {
        sequelize,
        modelName: 'application_cards',
        timestamps: false,
    }
);

export default ApplicationCard;

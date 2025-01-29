import {DataTypes, Model, Optional} from 'sequelize';
import { format } from 'date-fns';
import sequelize from '../config/sequelize';

interface StepAttributes {
    id: number;
    title: string;
    creation_date: Date;
    user_id: number;
    active: boolean;
}

interface StepCreationAttributes extends Optional<StepAttributes, 'id' | 'creation_date' | 'active'> {
}

class Step extends Model<StepAttributes, StepCreationAttributes> implements StepAttributes {
    public id!: number;
    public title!: string;
    public creation_date!: Date;
    public user_id!: number;
    public active!: boolean;
}

Step.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
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
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'steps',
        timestamps: false,
    }
);

export default Step;

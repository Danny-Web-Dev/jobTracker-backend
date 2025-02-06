import {DataTypes, Optional} from 'sequelize';
import sequelize from '../config/sequelize';
import {DB_TABLES} from "../config/consts";
import {AbstractModel} from "./abstractModel";

interface StepAttributes {
    id: number;
    title: string;
    creation_date: Date;
    user_id: number;
    active: boolean;
}

interface StepCreationAttributes extends Optional<StepAttributes, 'id' | 'creation_date' | 'active'> {}

class Step extends AbstractModel<StepAttributes, StepCreationAttributes> implements StepAttributes {
    public title!: string;
    public user_id!: number;
    public active!: boolean;
}

Step.init(
    {
        ...AbstractModel.getCommonAttributes(),
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: DB_TABLES.STEPS,
        timestamps: false,
    }
);

export default Step;

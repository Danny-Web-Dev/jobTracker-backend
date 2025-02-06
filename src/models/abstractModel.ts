import { Model, DataTypes } from "sequelize";
import { format } from "date-fns";
import {DATE_FORMATS, DB_COLUMNS} from "../config/consts";

export abstract class AbstractModel<TAttributes extends Record<string, any>, TCreationAttributes extends Partial<TAttributes>> extends Model<TAttributes, TCreationAttributes> {
    public id!: number;
    public creation_date!: Date;

    static getCommonAttributes() {
        return {
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
                get(this: Model) {
                    const rawValue = this.getDataValue(DB_COLUMNS.GENERAL.CREATION_DATE);
                    return rawValue ? format(rawValue, `${DATE_FORMATS.SQL_DATE} ${DATE_FORMATS.SQL_TIME}`) : null;
                },
            },
        };
    }
}

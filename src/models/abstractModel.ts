import { Model, DataTypes } from "sequelize";

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
            },
        };
    }
}

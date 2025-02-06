import { DataTypes, Optional } from "sequelize";
import sequelize from "../config/sequelize";
import { DB_TABLES } from "../config/consts";
import { AbstractModel } from "./abstractModel";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    creation_date: Date;
    is_active: boolean;
    is_email_validated: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "creation_date" | "is_active"> {}

class User extends AbstractModel<UserAttributes, UserCreationAttributes> implements UserAttributes
{
    public name!: string;
    public email!: string;
    public password!: string;
    public is_active!: boolean;
    public is_email_validated!: boolean;
}

User.init(
    {
        ...AbstractModel.getCommonAttributes(),
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        is_email_validated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: DB_TABLES.USERS,
        tableName: DB_TABLES.USERS,
        timestamps: false,
    }
);

export default User;

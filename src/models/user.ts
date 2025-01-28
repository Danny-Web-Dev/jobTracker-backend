import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/sequelize';

// Define the attributes of the User model
interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    creation_date: Date;
    active: boolean;
    is_email_validated: boolean;
}

// Define the attributes that are optional during model creation
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'creation_date' | 'active'> {
}

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public creation_date!: Date;
    public active!: boolean;
    public is_email_validated!: boolean;
}

// Initialize the User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
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
        creation_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        is_email_validated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: false, // Disable automatic timestamps
    }
);

export default User;

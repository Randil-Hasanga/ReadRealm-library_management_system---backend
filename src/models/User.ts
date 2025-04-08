import sequelize from '../../db';
import { DataTypes, Model } from 'sequelize';

export interface UserAttributes {
    user_id: number;
    fname: string;
    lname: string;
    address: string;
    NIC: string;
    email: string;
    password: string;
    contact_no: string;
    position: string;
    isActive: boolean
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes{}

const User = sequelize.define<UserInstance>('User', {
    //define columns
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    NIC: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact_no: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: 'users',
    timestamps: true
});

export default User;
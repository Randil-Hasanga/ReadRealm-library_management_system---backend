import sequelize from '../../db';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
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
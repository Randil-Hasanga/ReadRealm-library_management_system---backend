import sequelize from '../../db';
import { DataTypes } from 'sequelize';

const Author = sequelize.define('Author', {
    author_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'authors',
    timestamps: true
});

export default Author;
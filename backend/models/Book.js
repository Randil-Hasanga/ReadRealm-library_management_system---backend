const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const Author = require('../models/Author');

const Book = sequelize.define('Book', {
    book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    book_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {           // * foreign key for author table
            model: Author,
            key: 'author_id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    available_qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: 'books',
    timestamps: true,
});

Book.belongsTo(Author, { foreignKey: 'author_id', as: 'author' }); // * define association

module.exports = Book;
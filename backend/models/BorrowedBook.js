const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const Borrower = require('../models/Borrower');
const Book = require('../models/Book');

const BorrowedBook = sequelize.define('BorrowedBook', {
    bb_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    borrower_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Borrower,
            key: 'borrower_id'
        }
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book,
            key: 'book_id'
        }
    },
    borrowed_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    return_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isReturned:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    tableName: 'borrowed_books',
    timestamps: true
});

module.exports = BorrowedBook;
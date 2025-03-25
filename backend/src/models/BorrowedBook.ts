import sequelize from '../../db';
import { DataTypes } from 'sequelize';

const BorrowedBook = sequelize.define('BorrowedBook', {
    bb_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    borrower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "borrowers",
            key: 'borrower_id'
        }
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "books",
            key: 'book_id'
        }
    },
    borrowed_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    return_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    returned_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isReturned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'borrowed_books',
    timestamps: true
});

export default BorrowedBook;
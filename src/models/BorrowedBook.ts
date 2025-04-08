import { Model, DataTypes } from 'sequelize';
import sequelize from '../../db';

export interface BorrowedBookAttributes {
    bb_id: number;
    borrower_id: number;
    book_id: number;
    borrowed_date: Date;
    return_date: Date;
    returned_date?: Date | null;
    isReturned: boolean;
}

export interface BorrowedBookInstance extends Model<BorrowedBookAttributes>, BorrowedBookAttributes {}

const BorrowedBook = sequelize.define<BorrowedBookInstance>('BorrowedBook', {
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

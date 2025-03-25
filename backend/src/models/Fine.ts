import sequelize from '../../db';
import { DataTypes } from 'sequelize';

const Fine = sequelize.define('Fine', {
    fine_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bb_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "borrowed_books",
            key: 'bb_id'
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
    borrower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "borrowers",
            key: 'borrower_id'
        }
    },
    fine_amount: {
        type: DataTypes.DECIMAL,
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'fines',
    timestamps: false
});

export default Fine;
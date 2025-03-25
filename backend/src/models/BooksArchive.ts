import sequelize from '../../db';
import { DataTypes } from 'sequelize';

const BooksArchive = sequelize.define('BooksArchive', {
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
            model: "authors",
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
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'books_archive',
    timestamps: true
});

export default BooksArchive;
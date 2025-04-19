import { Injectable } from '@nestjs/common';
import Book from 'src/models/Book';
import BorrowedBook from 'src/models/BorrowedBook';
import Borrower from 'src/models/Borrower';
import Models from '../models/index';
import Fine from 'src/models/Fine';
const { Sequelize } = Models;

@Injectable()
export class FineService {
    async getFines() {
        await Sequelize.query('CALL sp_manage_overdue_fines();');
        const fines = await Fine.findAll({
            attributes: [
                'fine_id',
                'book_id',
                'fine_amount',
                [Sequelize.col('Book.book_name'), 'Book_Name'],
                'borrower_id',
                [Sequelize.fn('CONCAT', Sequelize.col('Borrower.fname'), ' ', Sequelize.col('Borrower.lname')), 'BorrowerFullName'],
                [Sequelize.col('Borrower.address'), 'BorrowerAddress'],
                [Sequelize.col('Borrower.email'), 'BorrowerEmail'],
                [Sequelize.col('Borrower.contact_no'), 'BorrowerContact'],
                ['bb_id', 'BorrowedBookID'],
                [Sequelize.col('BorrowedBook.borrowed_date'), 'BorrowedDate'],
                [Sequelize.col('BorrowedBook.return_date'), 'DueDate'],
            ],
            include: [
                {
                    model: Borrower,
                    as: 'borrower',
                    attributes: [] // Fetch only the required fields via Sequelize.col
                },
                {
                    model: Book,
                    as: 'book',
                    attributes: [] // Fetch only the required fields via Sequelize.col
                },
                {
                    model: BorrowedBook,
                    as: 'borrowedBook',
                    attributes: [] // Fetch only the required fields via Sequelize.col
                }
            ],
            where: { isPaid: false }
        });
        if (fines && fines.length != 0) {
            return fines;
        } else {
            console.error("Error in fines service");
        }
    }

    async getFineByBbId(bb_id) {
        const fines = await Fine.findAll({
            attributes: [
                'fine_id',
                'book_id',
                'fine_amount',
                [Sequelize.col('Book.book_name'), 'Book_Name'],
                'borrower_id',
                [Sequelize.fn('CONCAT', Sequelize.col('Borrower.fname'), ' ', Sequelize.col('Borrower.lname')), 'BorrowerFullName'],
                [Sequelize.col('Borrower.address'), 'BorrowerAddress'],
                [Sequelize.col('Borrower.email'), 'BorrowerEmail'],
                [Sequelize.col('Borrower.contact_no'), 'BorrowerContact'],
                ['bb_id', 'BorrowedBookID'],
                [Sequelize.col('BorrowedBook.borrowed_date'), 'BorrowedDate'],
                [Sequelize.col('BorrowedBook.return_date'), 'DueDate'],
                'isPaid'
            ],
            include: [
                {
                    model: Borrower,
                    as: 'borrower',
                    attributes: [] // Fetch only the required fields via Sequelize.col
                },
                {
                    model: Book,
                    as: 'book',
                    attributes: [] // Fetch only the required fields via Sequelize.col
                },
                {
                    model: BorrowedBook,
                    as: 'borrowedBook',
                    attributes: [] // Fetch only the required fields via Sequelize.col
                }
            ],
            where: { bb_id: bb_id }
        });
        if (fines && fines.length != 0) {
            return fines;
        } else {
            return "No fines yet";
        }
    }

    async getFineById(fine_id) {
        const fines = await Fine.findAll({
            attributes: [
                'fine_id',
                'book_id',
                [Sequelize.col('Book.book_name'), 'Book_Name'],
                'borrower_id',
                [Sequelize.fn('CONCAT', Sequelize.col('Borrower.fname'), ' ', Sequelize.col('Borrower.lname')), 'BorrowerFullName'],
                [Sequelize.col('Borrower.address'), 'BorrowerAddress'],
                [Sequelize.col('Borrower.email'), 'BorrowerEmail'],
                [Sequelize.col('Borrower.contact_no'), 'BorrowerContact'],
                ['bb_id', 'BorrowedBookID'],
                [Sequelize.col('BorrowedBook.borrowed_date'), 'BorrowedDate'],
                [Sequelize.col('BorrowedBook.return_date'), 'DueDate'],
            ],
            include: [
                {
                    model: Borrower,
                    as: 'borrower',
                    attributes: [] // Fetch only the required fields via Sequelize.col
                },
                {
                    model: Book,
                    as: 'book',
                    attributes: [] // Fetch only the required fields via Sequelize.col
                },
                {
                    model: BorrowedBook,
                    as: 'borrowedBook',
                    attributes: [] // Fetch only the required fields via Sequelize.col
                }
            ],
            where: { fine_id: fine_id }
        });
        if (fines && fines.length != 0) {
            return fines;
        } else {
            console.error("Error in fines service");
        }
    }

    async payFine(fine_id) {

        const fine = await Fine.findOne({ where: { fine_id: fine_id , isPaid: false} });
        if (!fine) {
            return('Fine not found');
        }

        const [effectedRows] = await Fine.update({ isPaid: true }, { where: { fine_id: fine_id } });
        if (effectedRows === 0) {
            console.error('Failed to update fine');
        }
        return await Fine.findOne({ where: { fine_id: fine_id } });
    }
}

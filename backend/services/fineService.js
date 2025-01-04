const { Fine, BorrowedBook, Borrower, Sequelize, Book } = require('../models/index');

const fineService = {
    getFines: async () => {
        const fines = await Fine.findAll({
            attributes: [
                'fine_id',
                'book_id',
                [Sequelize.col('Book.book_name'), 'Book Name'],
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
    },
    getFineById: async (fine_id) => {
        const fines = await Fine.findAll({
            attributes: [
                'fine_id',
                'book_id',
                [Sequelize.col('Book.book_name'), 'Book Name'],
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
            where: {fine_id: fine_id }
        });
        if (fines && fines.length != 0) {
            return fines;
        } else {
            console.error("Error in fines service");
        }
    },
    getFineByBbId: async (bb_id) => {
        const fines = await Fine.findAll({
            attributes: [
                'fine_id',
                'book_id',
                [Sequelize.col('Book.book_name'), 'Book Name'],
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
            where: {bb_id: bb_id }
        });
        if (fines && fines.length != 0) {
            return fines;
        } else {
            console.error("Error in fines service");
        }
    },
    payFine: async (bb_id) => {

        const fine = await Fine.findOne({ where: { bb_id: bb_id } });
        if (!fine) {
            console.error('Fine not found');
        }

        const [effectedRows] = await Fine.update({ isPaid: true }, { where: { bb_id: bb_id } });
        if (effectedRows === 0) {
            console.error('Failed to update fine');
        }
        return await Fine.findOne({ where: { bb_id: bb_id } });
    }
};

module.exports = fineService;

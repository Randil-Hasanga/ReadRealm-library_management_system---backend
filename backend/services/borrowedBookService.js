const { BorrowedBook,Borrower, Book,Sequelize } = require('../models/index');


const borrowedBookService = {
    getBorrowedBooks: async () => {
        try {
            const books = await BorrowedBook.findAll({
                attributes: [
                    ['bb_id', 'BorrowedBookID'],
                    'borrower_id',
                    [Sequelize.col('Borrower.fname'), 'BorrowerFirstName'],
                    [Sequelize.col('Borrower.lname'), 'BorrowerLastName'],
                    'book_id',
                    [Sequelize.col('Book.book_name'), 'BookName'],
                    'borrowed_date',
                    'return_date',
                    'isReturned'
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
                    }
                ],
                raw: true // Ensures plain JavaScript object results
            });

            if (!books || books.length === 0) {
                throw new Error('No borrowed books found');
            }

            return books;
        } catch (error) {
            console.error('Error fetching borrowed books:', error.message);
            throw error;
        }
    }
};

module.exports = borrowedBookService;
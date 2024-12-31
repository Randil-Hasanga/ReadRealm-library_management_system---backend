const { BorrowedBook, Borrower, Book, Sequelize } = require('../models/index');
const { Op } = require('sequelize');
const dayjs = require('dayjs');


const borrowedBookService = {
    getBorrowedBooks: async () => {
        try {
            const books = await BorrowedBook.findAll({
                attributes: [
                    ['bb_id', 'BorrowedBookID'],
                    'borrower_id',
                    [Sequelize.col('Borrower.fname'), 'BorrowerFirstName'],
                    [Sequelize.col('Borrower.lname'), 'BorrowerLastName'],
                    [Sequelize.col('Borrower.email'), 'email'],
                    [Sequelize.col('Borrower.contact_no'), 'contact_no'],
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
                console.error('No borrowed books found');
            }

            return books;
        } catch (error) {
            console.error('Error fetching borrowed books:', error.message);
            throw error;
        }
    },
    getBorrowedBookById: async (id) => {
        try {
            const books = await BorrowedBook.findAll({
                attributes: [
                    ['bb_id', 'BorrowedBookID'],
                    'borrower_id',
                    [Sequelize.col('Borrower.fname'), 'BorrowerFirstName'],
                    [Sequelize.col('Borrower.lname'), 'BorrowerLastName'],
                    [Sequelize.col('Borrower.email'), 'email'],
                    [Sequelize.col('Borrower.contact_no'), 'contact_no'],
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
                raw: true, // Ensures plain JavaScript object results
                where: { bb_id: id }
            });

            if (!books || books.length === 0) {
                console.error('No borrowed books found');
            }

            return books;
        } catch (error) {
            console.error('Error fetching borrowed books:', error.message);
            throw error;
        }
    },
    getBorrowedBooksByBorrowerId: async (borrower_id) => {
        try {
            const books = await BorrowedBook.findAll({
                attributes: [
                    ['bb_id', 'BorrowedBookID'],
                    'borrower_id',
                    [Sequelize.col('Borrower.fname'), 'BorrowerFirstName'],
                    [Sequelize.col('Borrower.lname'), 'BorrowerLastName'],
                    [Sequelize.col('Borrower.email'), 'email'],
                    [Sequelize.col('Borrower.contact_no'), 'contact_no'],
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
                raw: true, // Ensures plain JavaScript object results
                where: { borrower_id: borrower_id }
            });

            if (!books || books.length === 0) {
                console.error('No borrowed books found');
            }

            return books;
        } catch (error) {
            console.error('Error fetching borrowed books:', error.message);
            throw error;
        }
    },
    getBorrowedBooksByBookId: async (book_id) => {
        try {
            const books = await BorrowedBook.findAll({
                attributes: [
                    ['bb_id', 'BorrowedBookID'],
                    'borrower_id',
                    [Sequelize.col('Borrower.fname'), 'BorrowerFirstName'],
                    [Sequelize.col('Borrower.lname'), 'BorrowerLastName'],
                    [Sequelize.col('Borrower.email'), 'email'],
                    [Sequelize.col('Borrower.contact_no'), 'contact_no'],
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
                raw: true, // Ensures plain JavaScript object results
                where: { book_id: book_id }
            });

            if (!books || books.length === 0) {
                console.error('No borrowed books found');
            }

            return books;
        } catch (error) {
            console.error('Error fetching borrowed books:', error.message);
            throw error;
        }
    },
    getOverDueBooks: async () => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const books = await BorrowedBook.findAll({
                attributes: [
                    ['bb_id', 'BorrowedBookID'],
                    'borrower_id',
                    [Sequelize.col('Borrower.fname'), 'BorrowerFirstName'],
                    [Sequelize.col('Borrower.lname'), 'BorrowerLastName'],
                    [Sequelize.col('Borrower.email'), 'email'],
                    [Sequelize.col('Borrower.contact_no'), 'contact_no'],
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
                raw: true, // Ensures plain JavaScript object results
                where: {
                    isReturned: false,
                    return_date: {
                        [Op.lt]: today
                    }
                }
            });

            if (!books || books.length === 0) {
                console.error('No over due books found');
            }

            return books;
        } catch (error) {
            console.error('Error fetching borrowed books:', error.message);
            throw error;
        }
    },
    insertBorrowedBook: async (data) => {
        const { book_id } = data;

        const borrowed_date = new Date();
        borrowed_date.setHours(0, 0, 0, 0);

        // Format borrowed_date as 'YYYY-MM-DD'
        const formatted_borrowed_date = borrowed_date.toISOString().split('T')[0];

        // Set return_date to 14 days from borrowed_date
        const return_date = new Date(borrowed_date);
        return_date.setDate(borrowed_date.getDate() + 14);

        // Format return_date as 'YYYY-MM-DD'
        const formatted_return_date = return_date.toISOString().split('T')[0];

        // Add formatted dates to data object
        data.borrowed_date = formatted_borrowed_date;
        data.return_date = formatted_return_date;

        // Start a transaction for atomic operations
        const transaction = await Sequelize.transaction();

        try {
            // Check if the book is available
            const isBookAvailable = await Book.count({
                where: {
                    book_id: book_id,
                    available_qty: {
                        [Op.gt]: 0
                    }
                },
                transaction // Ensure the check is part of the transaction
            });

            if (isBookAvailable > 0) {
                const new_borrowed_book = await BorrowedBook.create(data, { transaction });

                await Book.update(
                    { available_qty: Sequelize.literal('available_qty - 1') }, // Decrement quantity
                    { where: { book_id: book_id }, transaction }
                );

                await transaction.commit();

                return new_borrowed_book; // Return the newly created borrowed book
            } else {
                await transaction.rollback();
                console.error('Book is not available for borrowing');
            }
        } catch (error) {
            await transaction.rollback();
            console.error('Error in insertBorrowedBook:', error.message);
            throw error;
        }
    },
    returnBook: async (bb_id) => {
        let transaction;
        try {
            transaction = await Sequelize.transaction();

            const borrowedBook = await BorrowedBook.findOne({
                where: { bb_id: bb_id },
                transaction, // Ensure part of the transaction
            });

            if (!borrowedBook) {
                console.error('Borrowed book not found');
            }

            if (borrowedBook.isReturned) {
                console.error('This book has already been returned');
            }

            const { book_id } = borrowedBook;
            const currentDate = dayjs().format('YYYY-MM-DD');

            await BorrowedBook.update(
                {
                    isReturned: true,
                    returned_date: currentDate
                },
                { where: { bb_id: bb_id }, transaction }
            );

            await Book.update(
                { available_qty: Sequelize.literal('available_qty + 1') },
                { where: { book_id: book_id }, transaction }
            );

            // Commit the transaction
            await transaction.commit();
        } catch (error) {
            if (transaction) await transaction.rollback();
            console.error('Error in returnBook:', error.message);
            throw error;
        }
    }
};

module.exports = borrowedBookService;
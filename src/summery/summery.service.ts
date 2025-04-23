import { Injectable } from '@nestjs/common';
import Book from 'src/models/Book';
import Borrower from 'src/models/Borrower';
import BorrowedBook from 'src/models/BorrowedBook';
import Fine from 'src/models/Fine';

@Injectable()
export class SummeryService {
    async getDashboardSummery() {
        try {
            // Get total book quantity
            const totalBooks = await Book.sum('quantity', {where: { isActive: true }});

            // Get total borrower count
            const totalBorrowers = await Borrower.count({where: { isActive: true }});

            // Get total borrowed books count (not returned)
            const borrowedBooksCount = await BorrowedBook.count({
                where: { isReturned: false },
            });

            // Get sum of unpaid fines
            const unpaidFinesSum = await Fine.sum('fine_amount', {
                where: { isPaid: false },
            });

            // Return the summary
            return {
                totalBooks,
                totalBorrowers,
                borrowedBooksCount,
                unpaidFinesSum,
            };
        } catch (error) {
            console.error('Error in getDashboardSummery:', error.message);
            throw error;
        }
    }
}

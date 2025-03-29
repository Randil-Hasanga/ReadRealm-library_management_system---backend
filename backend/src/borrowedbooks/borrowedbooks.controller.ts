import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { BorrowedbooksService } from './borrowedbooks.service';
import { BorrwedBookDTO } from './borrowedbooks.dto';

@Controller('borrowed-book')
export class BorrowedbooksController {

    constructor(private readonly borrowedBooksService: BorrowedbooksService) { }

    @Post()
    async insertBorrowedBook(@Res() res, @Body() borrowedBookData : BorrwedBookDTO)  {
        try {
            const newBorrowedBook = await this.borrowedBooksService.insertBorrowedBook(borrowedBookData);
            res.status(201).json({ message: 'Borrowed book inserted', data: newBorrowedBook });
        } catch (error) {
            res.status(501).json({ message: 'insertion failed', error: error.message });
        }
    }

    @Get()
    async getBorrowedBooks(@Res() res) {
        try {
            const books = await this.borrowedBooksService.getBorrowedBooks();
            res.status(201).json({ message: 'Borrowed books', data: books });
        } catch (error) {
            res.status(501).json({ message: 'retrieval failed', error: error.message });
        }
    }

    @Get(':id')
    async getBorrowedBookById(@Param('id') id, @Res() res) {
        try {
            const books = await this.borrowedBooksService.getBorrowedBookById(id);
            res.status(201).json({ message: 'Borrowed books', data: books });
        } catch (error) {
            res.status(501).json({ message: 'retrieval failed', error: error.message });
        }
    }
}

import { Body, Controller, Get, Param, Patch, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BorrowedbooksService } from './borrowedbooks.service';
import { BorrwedBookDTO } from './borrowedbooks.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('borrowed-books')
export class BorrowedbooksController {

    constructor(private readonly borrowedBooksService: BorrowedbooksService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async insertBorrowedBook(@Res() res, @Body() borrowedBookData: BorrwedBookDTO) {
        try {
            const newBorrowedBook = await this.borrowedBooksService.insertBorrowedBook(borrowedBookData);
            res.status(201).json({ message: 'Borrowed book inserted', data: newBorrowedBook });
        } catch (error) {
            res.status(501).json({ message: 'insertion failed', error: error.message });
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getBorrowedBooks(@Res() res) {
        try {
            const books = await this.borrowedBooksService.getBorrowedBooks();
            res.status(201).json({ message: 'Borrowed books', data: books });
        } catch (error) {
            res.status(501).json({ message: 'retrieval failed', error: error.message });
        }
    }

    @Get('over-due')
    @UseGuards(JwtAuthGuard)
    async getOverDueBooks(@Res() res) {
        try {
            const books = await this.borrowedBooksService.getOverDueBooks();
            res.status(201).json({ message: 'Over due books', data: books });
        } catch (error) {
            res.status(501).json({ message: 'retrieval failed', error: error.message });
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getBorrowedBookById(@Param('id') id, @Res() res) {
        try {
            const books = await this.borrowedBooksService.getBorrowedBookById(id);
            res.status(201).json({ message: 'Borrowed books by id', data: books });
        } catch (error) {
            res.status(501).json({ message: 'retrieval failed', error: error.message });
        }
    }

    @Get('books/:id')
    @UseGuards(JwtAuthGuard)
    async getBorrowedBooksByBookId(@Param('id') id, @Res() res) {
        try {
            const books = await this.borrowedBooksService.getBorrowedBooksByBookId(id);
            res.status(201).json({ message: 'Borrowed books by book id', data: books });
        } catch (error) {
            res.status(501).json({ message: 'retrieval failed', error: error.message });
        }
    }

    @Get('borrower/:id')
    @UseGuards(JwtAuthGuard)
    async getBorrowedBooksByBorrowerId(@Param('id') id, @Res() res) {
        try {
            const books = await this.borrowedBooksService.getBorrowedBooksByBorrowerId(id);
            res.status(201).json({ message: 'Borrowed books by borrower id', data: books });
        } catch (error) {
            res.status(501).json({ message: 'retrieval failed', error: error.message });
        }
    }

    @Patch('return/:id')
    @UseGuards(JwtAuthGuard)
    async returnBook(@Param('id') bb_id, @Res() res)  {
        try {
            const book = await this.borrowedBooksService.returnBook(bb_id);
            res.status(200).json({ message: 'Borrowed book returned', data: book});
        } catch (error) {
            console.error('Error in returnBook controller:', error.message);
            res.status(400).json({ message: 'Return failed', error: error.message });
        }
        
    }


}

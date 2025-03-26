import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './book.dto';

@Controller('books')
export class BookController {

    constructor(private readonly bookService: BookService) { }

    @Post()
    async createBook(@Body() bookData: BookDto, @Res() res) {
        try {
            const newBook = await this.bookService.createBook(bookData)
            res.status(201).json({ message: "Book inserted successfully", data: newBook });
        } catch (error) {
            res.status(501).json({ message: "Book insertion failed", error: error.message });
        }
    }

    @Get()
    async getBooks(@Res() res) {
        try {
            const books = await this.bookService.getBooks();
            res.status(201).json({ message: "Books retrieved successfully", data: books });
        } catch (error) {
            res.status(501).json({ message: "Books retrieval failed", error: error.message });
        }
    }

    async getBookById(@Param('id') book_id, @Res() res) {
        try {
            const book = await this.bookService.getBookById(book_id);
            res.status(201).json({ message: "Book retrieved successfully", data: book });
        } catch (error) {
            res.status(501).json({ message: "Book retrieval failed", error: error.message });
        }
    }
}

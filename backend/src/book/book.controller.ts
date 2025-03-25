import { Controller, Get, Res } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {

    constructor(private readonly bookService : BookService) {}

    @Get()
    async getBooks(@Res() res) {
        try {
            const books = await this.bookService.getBooks();
            res.status(201).json({ message: "Books retrieved successfully", data: books });
        } catch (error) {
            res.status(501).json({ message: "Books retrieval failed", error: error.message });
        }
    }
}

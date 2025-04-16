import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateBookResponseDto } from './dto/CreateBookResponseDto';
import { RetrieveBookResponseDto } from './dto/RetriveBookResponseDto';
import { UpdateBookResponseDto } from './dto/UpdateBookResponseDto';

@ApiTags('Books')
@Controller('books')
export class BookController {

    constructor(private readonly bookService: BookService) { }

    @Post()
    @ApiOperation({ summary: "Insert a new book" })
    @ApiCreatedResponse({ type: CreateBookResponseDto })
    @ApiBody({ type: BookDto })
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async createBook(@Body() bookData: BookDto, @Res() res) {
        try {
            const newBook = await this.bookService.createBook(bookData)
            res.status(201).json({ message: "Book inserted successfully", data: newBook });
        } catch (error) {
            res.status(501).json({ message: "Book insertion failed", error: error.message });
        }
    }

    @Get()
    @ApiOperation({ summary: "Get all books" })
    @ApiCreatedResponse({ type: RetrieveBookResponseDto })
    @UseGuards(JwtAuthGuard)
    async getBooks(@Res() res) {
        try {
            const books = await this.bookService.getBooks();
            res.status(201).json({ message: "Books retrieved successfully", data: books });
        } catch (error) {
            res.status(501).json({ message: "Books retrieval failed", error: error.message });
        }
    }

    @Get(':id')
    @ApiOperation({ summary: "Get book by id" })
    @ApiCreatedResponse({ type: RetrieveBookResponseDto })
    @ApiParam({ name: 'id', type: Number, description: "ID of the book to retrieve" })
    @UseGuards(JwtAuthGuard)
    async getBookById(@Param('id') book_id, @Res() res) {
        try {
            const book = await this.bookService.getBookById(book_id);
            res.status(201).json({ message: "Book retrieved successfully", data: book });
        } catch (error) {
            res.status(501).json({ message: "Book retrieval failed", error: error.message });
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: "Delete book by id" })
    @ApiCreatedResponse({
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: "Book deleted successfully"
                },
                effectedRows: {
                    type: 'number',
                    example: 1
                }
            }, required: ['message', 'effectedRows']
        }
    })
    @ApiParam({ name: 'id', type: Number, description: "ID of the book to delete" })
    @UseGuards(JwtAuthGuard)
    async deleteBook(@Param('id') book_id, @Res() res) {
        try {
            const effectedRows = await this.bookService.deleteBook(book_id);
            res.status(201).json({ message: "Book deleted successfully", effectedRows: effectedRows });
        } catch (error) {
            res.status(501).json({ message: "Book deletion failed", error: error.message });
        }
    }

    @Get('deleted/all')
    @ApiOperation({ summary: "Get all deleted books" })
    @ApiCreatedResponse({ type: RetrieveBookResponseDto })
    @UseGuards(JwtAuthGuard)
    async getDeletedBooks(@Res() res) {
        try {
            const deletedBooks = await this.bookService.getDeletedBooks();
            res.status(201).json({ message: "Deleted books retrieved successfully", data: deletedBooks });
        } catch (error) {
            res.status(501).json({ message: "Deleted books retrieval failed", error: error.message });
        }
    }

    @Patch(':id')
    @ApiBody({type: BookDto})
    @ApiOperation({ summary: "Update book by id" })
    @ApiParam({ name: 'id', type: Number, description: "ID of the book to update" })
    @ApiCreatedResponse({type: UpdateBookResponseDto})
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async updateBook(@Param('id') book_id, @Res() res, @Body() updatedBookData: BookDto) {
        try {
            const updatedBook = await this.bookService.updateBook(book_id, updatedBookData);
            res.status(201).json({ message: "Book updated successfully", effectedRows: updatedBook });
        } catch (error) {
            res.status(501).json({ message: "Book update failed", error: error.message });
        }
    }

    @Get('count/:author_id')
    async getBookCountByAuthorId(@Param('author_id') author_id, @Res() res){
        try {
            const count = await this.bookService.getBookCountByAuthorId(author_id);
            res.status(201).json({ message: "Book count retrieved", BookCount: count });
        } catch (error) {
            
        }
    }
}

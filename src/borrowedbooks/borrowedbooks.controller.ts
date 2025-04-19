import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BorrowedbooksService } from './borrowedbooks.service';
import { BorrowedBookDTO } from './dto/borrowedbooks.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateBorrowedBookResponseDto } from './dto/CreateBorrowedBookResponseDto';
import { BorrowerDTO } from 'src/borrower/dto/borrower.dto';
import { ReturnBorrowedBookResponseDto } from './dto/returnBorrowedBook.dto';
import { BorrowedBookInfoDto, BorrowedBooksByBookIdResponseDto, BorrowedBooksByBorrowerIdResponseDto, BorrowedBooksResponseDto, SingleBorrowedBooksResponseDto } from './dto/BorrowedBooksResponse.dto';
import { OverdueBooksResponseDto } from './dto/overDueBooksResponse.dto';

@ApiTags('Borrowed Books')
@Controller('borrowed-books')
export class BorrowedbooksController {

    constructor(private readonly borrowedBooksService: BorrowedbooksService) { }

    @Post()
    @ApiOperation({ summary: 'Borrow a book' })
    @ApiCreatedResponse({ type: CreateBorrowedBookResponseDto })
    @ApiNotFoundResponse({
        schema:
        {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 404,
                },
                message: {
                    type: 'string',
                    example: "Book is not available for borrowing"
                }
            }, required: ['statusCode', 'message']
        }
    })
    @ApiBody({ type: BorrowedBookDTO })
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async insertBorrowedBook(@Res() res, @Body() borrowedBookData: BorrowedBookDTO) {
        try {
            const newBorrowedBook = await this.borrowedBooksService.insertBorrowedBook(borrowedBookData);
            if (typeof (newBorrowedBook) == 'string') {
                res.status(HttpStatus.NOT_FOUND).json({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: newBorrowedBook,
                });
            } else { res.status(201).json({ message: 'Borrowed book inserted', data: newBorrowedBook }); }

        } catch (error) {
            res.status(501).json({ message: 'insertion failed', error: error.message });
        }
    }

    @Get()
    @ApiOperation({ summary: "Get all borrowed books" })
    @ApiCreatedResponse({type: BorrowedBooksResponseDto})
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
    @ApiOperation({ summary: "Get all over due books" })
    @ApiCreatedResponse({type: OverdueBooksResponseDto})
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
    @ApiParam({name: 'id', example: 1})
    @ApiOperation({summary: 'Get borrowed book by borrowed book id'})
    @ApiCreatedResponse({type: SingleBorrowedBooksResponseDto})
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
    @ApiParam({name: 'id', example: 1})
    @ApiOperation({summary: 'Get borrowed book by book id'})
    @ApiCreatedResponse({type: BorrowedBooksByBookIdResponseDto})
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
    @ApiParam({name: 'id', example: 1})
    @ApiOperation({summary: 'Get borrowed book by borrower id'})
    @ApiCreatedResponse({type: BorrowedBooksByBorrowerIdResponseDto})
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
    @ApiOperation({ summary: "Return Borrowed Book" })
    @ApiOkResponse({ type: ReturnBorrowedBookResponseDto })
    @ApiParam({name: 'id', example: 3})
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Return failed'
                },
                error: {
                    type: 'string',
                    example: 'This book has already been returned'
                }
            }, required: ['message', 'error']
        }
    })
    @UseGuards(JwtAuthGuard)
    async returnBook(@Param('id') bb_id, @Res() res) {
        try {
            const book = await this.borrowedBooksService.returnBook(bb_id);
            res.status(200).json({ message: 'Borrowed book returned', data: book });
        } catch (error) {
            console.error('Error in returnBook controller:', error.message);
            res.status(400).json({ message: 'Return failed', error: error.message });
        }

    }


}

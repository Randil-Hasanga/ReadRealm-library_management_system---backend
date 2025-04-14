import { Body, Controller, Get, Param, Patch, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthorDto } from './dto/author.dto';
import { AuthorService } from './author.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAuthorResponseDto } from './dto/CreateAuthorResponseDto';

@ApiTags('Authors')
@Controller('authors')
export class AuthorController {

    constructor(private readonly authorService: AuthorService) { }

    @ApiOperation({ description: 'Used for create authors' })
    @ApiCreatedResponse({ type: CreateAuthorResponseDto })
    @ApiBody({ schema: { type: 'object', properties: { author_name: { type: 'string', example: 'Martin Wickramasinghe', description: 'Author name you want to insert' }, }, required: ['author_name'], }, })
    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async createAuthor(@Body() authorData: AuthorDto, @Res() res) {
        try {
            const newAuthor = await this.authorService.createAuthor(authorData);
            res.status(201).json({ message: "Author created successfully", data: newAuthor });
        } catch (error) {
            res.status(501).json({ message: "Error creating author", data: error.message });
        }
    }

    @ApiOperation({ description: 'Get all users' })
    @ApiCreatedResponse({ type: [AuthorDto] })
    @Get()
    @UseGuards(JwtAuthGuard)
    async getAuthors(@Res() res) {
        try {
            const authors = await this.authorService.getAuthors();
            res.status(201).json({ message: "Authors retrieved successfully", data: authors });
        } catch (error) {
            res.status(501).json({ message: "Error retrieving authors", data: error.message });
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getAuthorById(@Param('id') author_id, @Res() res) {
        try {
            const author = await this.authorService.getAuthorById(author_id);
            res.status(201).json({ message: "Author retrieved successfully", data: author });
        } catch (error) {
            res.status(501).json({ message: "Error retrieving author", data: error.message });
        }
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async updateAuthor(@Param('id') id, @Body() updatedAuthor: AuthorDto, @Res() res) {
        const author_name = updatedAuthor.author_name;

        try {
            const updatedAuthor = await this.authorService.updateAuthor(id, { author_name });
            res.status(201).json({ message: "Author updated successfully", data: updatedAuthor });
        } catch (error) {
            res.status(501).json({ message: "Error updating author", data: error.message });
        }
    }

}

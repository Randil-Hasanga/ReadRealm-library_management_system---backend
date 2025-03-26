import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthorDto } from './author.dto';
import { AuthorService } from './author.service';

@Controller('authors')
export class AuthorController {

    constructor(private readonly authorService : AuthorService) {}

    @Post()
    async createAuthor(@Body() authorData : AuthorDto, @Res() res) {
        try {
            const newAuthor = await this.authorService.createAuthor(authorData);
            res.status(201).json({ message: "Author created successfully", data: newAuthor });
        } catch (error) {
            res.status(501).json({ message: "Error creating author", data: error.message });
        }
    }
}

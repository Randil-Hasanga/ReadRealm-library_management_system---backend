import { Injectable } from '@nestjs/common';
import Author from 'src/models/Author';

@Injectable()
export class AuthorService {

    async createAuthor(data) {
        const { author_name } = data;

        const existingAuthor = await Author.findOne({ where: { author_name } });

        if (existingAuthor) {
            console.error('Author is already exist');
        }

        const newAuthor = await Author.create(data);
        return newAuthor;
    }
}

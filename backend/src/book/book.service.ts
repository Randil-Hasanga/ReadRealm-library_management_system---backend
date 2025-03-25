import { Injectable } from '@nestjs/common';
import models from '../models/index';

const { Book, BorrowedBook, Author, Sequelize } = models;

@Injectable()
export class BookService {
    async getBooks() {
        const books = await Book.findAll({
            attributes: [
                'book_id',
                'book_name',
                'ISBN',
                'author_id',
                [Sequelize.col('Author.author_name'), 'author_name'],
                'quantity',
                'available_qty'
            ],
            include:[
                {
                    model: Author,
                    as: 'author',
                    attributes: []
                }
            ],
            where: {isActive: true}});
        if (!books) {
            console.error('No books found');
        }
        return books;
    }
}

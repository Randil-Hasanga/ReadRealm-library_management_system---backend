import { Injectable } from '@nestjs/common';
import models from '../models/index';
import Book from 'src/models/Book';
import Author from 'src/models/Author';

const { Sequelize } = models;

@Injectable()
export class BookService {

    async createBook(data) {
        const { book_name } = data;
        const existingBook = await Book.findOne({ where: { book_name: book_name } });
        if (existingBook) {
            console.error(`book ${book_name} already exist`);
        }
        const newBook = await Book.create(data);
        return newBook;
    }

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

    async getBookById(id) {
        const book = await Book.findOne({ where: { book_id: id } });
        if (!book) {
            console.error('No book found');
        }
        return book;
    }
}

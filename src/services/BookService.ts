import BookRepository from '../repositories/BookRepository';
import ApiError from '../utils/ApiError';
import { IBook } from '../models/Book';

interface GetAllBooksOptions {
    search?: string;
    category?: string;
    publishedYear?: number;
    page?: number;
    limit?: number;
    sort?: string;
}

class BookService {
    async createBook(data: IBook): Promise<IBook> {
        // Business Rule: Check Duplicate ISBN
        const existingBook = await BookRepository.findByIsbn(data.isbn);
        if (existingBook) {
            throw new ApiError(409, 'Book with this ISBN already exists');
        }
        return await BookRepository.create(data);
    }

    async getBookById(id: string): Promise<IBook> {
        const book = await BookRepository.findById(id);
        if (!book) {
            throw new ApiError(404, 'Book not found');
        }
        return book;
    }

    async updateBook(id: string, data: Partial<IBook>): Promise<IBook | null> {
        const book = await BookRepository.findById(id);
        if (!book) {
            throw new ApiError(404, 'Book not found');
        }
        // If updating ISBN, check for conflict
        if (data.isbn && data.isbn !== book.isbn) {
            const existingWithIsbn = await BookRepository.findByIsbn(data.isbn);
            if (existingWithIsbn) {
                throw new ApiError(409, 'Book with this ISBN already exists');
            }
        }
        return await BookRepository.update(id, data);
    }

    async deleteBook(id: string): Promise<IBook | null> {
        const book = await BookRepository.findById(id);
        if (!book) {
            throw new ApiError(404, 'Book not found');
        }
        return await BookRepository.delete(id);
    }

    async getAllBooks({ search, category, publishedYear, page, limit, sort }: GetAllBooksOptions) { // Use 'any' for loose query or strictly typed interface
        const query: any = {};

        // Filtering
        if (category) query.category = category;
        if (publishedYear) query.publishedYear = publishedYear;

        // Searching (by title or author)
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } }
            ];
        }

        return await BookRepository.findAll({ query, page, limit, sort });
    }
}

export default new BookService();

import Book, { IBook } from '../models/Book';
import PaginationHelper from '../utils/PaginationHelper';

interface FindAllOptions {
    query: any;
    page: any;
    limit: any;
    sort: any;
}

class BookRepository {
    async create(bookData: Partial<IBook>): Promise<IBook> {
        const book = new Book(bookData);
        return await book.save();
    }

    async findById(id: string): Promise<IBook | null> {
        return await Book.findById(id);
    }

    async findByIsbn(isbn: string): Promise<IBook | null> {
        return await Book.findOne({ isbn });
    }

    async update(id: string, updateData: Partial<IBook>): Promise<IBook | null> {
        return await Book.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    }

    async delete(id: string): Promise<IBook | null> {
        return await Book.findByIdAndDelete(id);
    }

    async findAll({ query, page, limit, sort }: FindAllOptions) {
        const { skip, limit: limitNumber, page: pageNumber } = PaginationHelper.getPagination({ page, limit });

        const mongooseQuery = Book.find(query);

        if (sort) {
            // sort format from query: 'field:asc' or 'field:desc' or just 'field'
            const [field, order] = (sort as string).split(':');
            const sortOrder = order === 'desc' ? -1 : 1;
            mongooseQuery.sort({ [field]: sortOrder });
        } else {
            mongooseQuery.sort({ createdAt: -1 }); // Default sort
        }

        mongooseQuery.skip(skip).limit(limitNumber);

        const data = await mongooseQuery;
        const totalDocs = await Book.countDocuments(query);

        return {
            data,
            meta: PaginationHelper.formatPaginationResponse(totalDocs, pageNumber, limitNumber)
        };
    }
}

export default new BookRepository();

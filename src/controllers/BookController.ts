import { Request, Response } from 'express';
import BookService from '../services/BookService';
import ApiResponse from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler';

class BookController {
    createBook = asyncHandler(async (req: Request, res: Response) => {
        const book = await BookService.createBook(req.body);
        res.status(201).json(new ApiResponse(201, book, 'Book created successfully'));
    });

    getBook = asyncHandler(async (req: Request, res: Response) => {
        const book = await BookService.getBookById(req.params.id as string);
        res.status(200).json(new ApiResponse(200, book, 'Book fetched successfully'));
    });

    getAllBooks = asyncHandler(async (req: Request, res: Response) => {
        const { search, category, publishedYear, page, limit, sort } = req.query;
        // Cast query params
        const options = {
            search: search as string,
            category: category as string,
            publishedYear: publishedYear ? parseInt(publishedYear as string) : undefined,
            page: page ? parseInt(page as string) : undefined,
            limit: limit ? parseInt(limit as string) : undefined,
            sort: sort as string
        };
        const result = await BookService.getAllBooks(options);
        res.status(200).json(new ApiResponse(200, result, 'Books fetched successfully'));
    });

    updateBook = asyncHandler(async (req: Request, res: Response) => {
        const book = await BookService.updateBook(req.params.id as string, req.body);
        res.status(200).json(new ApiResponse(200, book, 'Book updated successfully'));
    });

    deleteBook = asyncHandler(async (req: Request, res: Response) => {
        await BookService.deleteBook(req.params.id as string);
        res.status(200).json(new ApiResponse(200, null, 'Book deleted successfully'));
    });
}

export default new BookController();

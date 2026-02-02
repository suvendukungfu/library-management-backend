interface PaginationOptions {
    page?: any;
    limit?: any;
}

interface PaginationResult {
    page: number;
    limit: number;
    skip: number;
}

interface PaginationMeta {
    totalDocs: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

class PaginationHelper {
    static getPagination({ page = 1, limit = 10 }: PaginationOptions): PaginationResult {
        const pageNumber = parseInt(String(page), 10);
        const limitNumber = parseInt(String(limit), 10);
        const skip = (pageNumber - 1) * limitNumber;

        return {
            page: pageNumber,
            limit: limitNumber,
            skip
        };
    }

    static formatPaginationResponse(totalDocs: number, page: number, limit: number): PaginationMeta {
        return {
            totalDocs,
            totalPages: Math.ceil(totalDocs / limit),
            currentPage: page,
            hasNextPage: page * limit < totalDocs,
            hasPrevPage: page > 1
        };
    }
}

export default PaginationHelper;

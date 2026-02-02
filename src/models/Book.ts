import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    isbn: string;
    category: string;
    publishedYear: number;
    copies: number;
    createdAt: Date;
    updatedAt: Date;
}

const bookSchema: Schema<IBook> = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    author: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    copies: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);
export default Book;

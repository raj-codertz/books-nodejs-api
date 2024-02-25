import Book from '../Models/bookModel.js'
import { NotFoundError } from "../Errors/customErrors.js";
import {StatusCodes } from "http-status-codes";

export const getBooks = async (req, res ) => {
    const books = await Book.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ books })
}
export const createBook = async (req, res ) => {
    // console.log(req.user)
     req.body.createdBy = req.user.userId
     const book = await Book.create( req.body );
     res.status(StatusCodes.CREATED).json({ book })
}

export const updateBook = async (req, res ) => {
    const {id} = req.params
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
        new: true
    })

    // if (!updatedBook ) throw new NotFoundError(`no job with id: ${id}`);

    res.status(StatusCodes.OK).json({ updatedBook })
}

export const deleteBook = async (req, res ) => {
    const { id } = req.params
    const removedJob = await Book.findByIdAndDelete(id)

    // if (!removedJob) {
    //     return res.status(404).json({ msg: `no book with id: ${id}`})
    // }
    res.status(StatusCodes.OK).json({ removedJob })
}

export const getBook = async (req, res ) => {
    const { id } = req.params

    const book = await Book.findById(id);
    // if (!book) {
    //     return res.status(404).json({ msg: `no book with id: ${id} `})
    // }
    res.status(StatusCodes.OK).json({ book })

}
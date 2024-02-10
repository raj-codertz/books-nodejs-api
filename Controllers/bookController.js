import Book from '../Models/bookModel.js'
export const getBooks = async (req, res ) => {
    const books = await Book.find({})
    res.status(200).json({ books })
}
export const createBook = async (req, res ) => {
     const { title, author } = req.body

     const book = await Book.create({title,author});
     res.status(201).json({ book })
}

export const updateBook = async (req, res ) => {

}

export const deleteBook = async (req, res ) => {

}

export const getBook = async (req, res ) => {
    const { id } = req.params

    const book = await Book.findById(id);

}
import { Router } from "express";
const router = Router()

import {
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    createBook
} from '../Controllers/bookController'

router.route('/').get(getBooks).post(createBook)
router.route('/:id').patch(updateBook).get(getBook).delete(deleteBook)
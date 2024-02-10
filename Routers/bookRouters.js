import { Router } from "express"
const router = Router()
import {
    getBook,
    getBooks,
    createBook,
    updateBook,
    deleteBook
} from "../Controllers/bookController.js"

router.route('/').get(getBooks).post(createBook)
router.route('/:id').patch(updateBook).get(getBook).delete(deleteBook)

export default router
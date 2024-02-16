import { Router } from "express"
const router = Router()
import {
    getBook,
    getBooks,
    createBook,
    updateBook,
    deleteBook
} from "../Controllers/bookController.js"
import {validateBookInput} from "../Middleware/validationMiddleware.js";

router.route('/').get(getBooks).post(validateBookInput ,createBook)
router.route('/:id').patch(updateBook).get(getBook).delete(deleteBook)

export default router
import { Router } from "express"
const router = Router()
import {
    getBook,
    getBooks,
    createBook,
    updateBook,
    deleteBook
} from "../Controllers/bookController.js"
import {validateBookInput, validateIdParam} from "../Middleware/validationMiddleware.js";

router.route('/').get(getBooks).post(validateBookInput ,createBook)
router.route('/:id').patch(validateBookInput, validateIdParam, updateBook).get(validateIdParam,getBook).delete(validateIdParam,deleteBook)

export default router
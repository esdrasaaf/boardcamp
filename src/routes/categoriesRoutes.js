import { Router } from 'express'
import { postCategory, getCategory} from '../controllers/categoriesControllers.js';
import validateName from '../middlewares/categoriesMiddlewares.js';

const router = Router()

router.get("/categories", getCategory);

router.post("/categories", validateName, postCategory);

export default router
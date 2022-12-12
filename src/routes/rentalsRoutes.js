import { Router } from 'express'
import { deleteRentals, getRentals, postRentals, postReturnRentals } from '../controllers/rentalsControllers.js';
import { deleteValidation, postBusinessRules, returnValidation } from '../middlewares/rentalsMiddlewares.js';

const router = Router()

router.get('/rentals', getRentals);

router.post('/rentals', postBusinessRules, postRentals);

router.post('/rentals/:id/return', returnValidation, postReturnRentals)

router.delete('/rentals/:id', deleteValidation, deleteRentals);

export default router
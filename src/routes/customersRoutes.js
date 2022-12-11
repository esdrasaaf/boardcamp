import { Router } from 'express'
import { getCustomers, getCustomersById, postCustomers, putCustomers } from '../controllers/customersControllers.js';
import {postValidation, putValidation} from '../middlewares/customersMiddlewares.js';

const router = Router()

router.get("/customers", getCustomers);

router.get("/customers/:id", getCustomersById);

router.post("/customers", postValidation, postCustomers);

router.put("/customers/:id", putValidation, putCustomers);

export default router
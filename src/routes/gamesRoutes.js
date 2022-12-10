import { Router } from 'express'
import { getGames, postGames } from '../controllers/gamesControllers.js';
import postValidate from '../middlewares/gamesMiddlewares.js';

const router = Router()

router.get("/games", getGames);

router.post("/games", postValidate, postGames);

export default router
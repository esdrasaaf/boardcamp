import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

//Routers
import categoriesRouters from './routes/categoriesRoutes.js';
import gamesRouters from './routes/gamesRoutes.js';
import customersRouters from './routes/customersRoutes.js';
import rentalsRouters from './routes/rentalsRoutes.js'

//Configs
app.use(cors());
app.use(express.json());
app.use(categoriesRouters);
app.use(gamesRouters);
app.use(customersRouters);
app.use(rentalsRouters);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

//Routers
import categoriesRouters from './routes/categoriesRoutes.js'

//Configs
app.use(cors());
app.use(express.json());
app.use(categoriesRouters)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));
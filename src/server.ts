import express from 'express'
import { categoriesRoutes } from './routes/categories.routes';
import { specificationsRoutes } from './routes/specification.routes';

const app = express();

app.use(express.json());

app.use(categoriesRoutes)
app.use(specificationsRoutes)

app.listen(3333, () => console.log("Server is running! 3333"))
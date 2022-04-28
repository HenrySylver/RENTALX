import express from 'express';
import categoriesRoutes from './routes/categories.routes';

// localhost:3333
const app = express();
app.listen(3333, () => console.log('Server is Running'));

app.use(express.json());
app.use('/categories', categoriesRoutes);

import { Router } from 'express';
import Category from '../model/category';

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const category: Category = {
    name,
    description,
    created_at: sub(new Date(),3)
  };

  categories.push(category);

  return response.status(201).json({
    message: 'Category created sucessfully',
    category});
});

export default categoriesRoutes;

import { Category, Product } from '../interfaces/interfaces';
import db from '../db_mock/defaultDb.json';
import { v4 as uuid } from 'uuid';

export const newCategory = (name: string): Category => ({
  id: uuid(),
  name,
});

export const validateId = (id: string): boolean => id.length !== 36;

export const findCategory = (id: string): Category | undefined => db.catergories.find((category: Category) => category.id === id);

export const findCategoryIndex = (id: string): number => db.catergories.findIndex((category: Category) => category.id === id);

export const getCategories = (): Category[] => db.catergories;

export const getCategoryProducts = (id: string): Product[] => {
  const products: Product[] = [];
  db.products.forEach((product: Product) => product.categoryId === id && products.push(product));
  return products;
};

export const addCategory = (category: Category): number => db.catergories.push(category);

export const deleteCategory = (categoryIndex: number): Category[] => db.catergories.splice(categoryIndex, 1);

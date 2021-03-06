import { NextFunction, Request, Response } from 'express';
import { Category } from '../interfaces/Catergory';
import { Product } from '../interfaces/Product';
import db from '../db_mock/defaultDb.json';
import { v4 as uuid } from 'uuid';
import { NO_CATEGORY_FOUND } from '../constants/constants';

export const newCategory = (name: string): Category => ({
  id: uuid(),
  name,
});

/**
 * Id category structure validation middleware
 */
export const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const id: string = req.params.id;
  if (id.length !== 36) {
    next('Invalid Id');
  } else {
    next();
  }
};

export const findCategory = (id: string): Category | undefined => db.catergories.find((category: Category) => category.id === id);

export const findCategoryAsync = (id: string): Promise<Category | string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const category: Category | undefined = db.catergories.find((category: Category) => category.id === id);
      category ? resolve(category) : reject(NO_CATEGORY_FOUND);
    }, 2000);
  });

export const findCategoryIndex = (id: string): number => db.catergories.findIndex((category: Category) => category.id === id);

export const getCategories = (): Category[] => db.catergories;

export const getCategoryProducts = (id: string): Product[] => {
  const products: Product[] = [];
  db.products.forEach((product: Product) => product.categoryId === id && products.push(product));
  return products;
};

export const addCategory = (category: Category): number => db.catergories.push(category);

export const deleteCategory = (categoryIndex: number): Category[] => db.catergories.splice(categoryIndex, 1);

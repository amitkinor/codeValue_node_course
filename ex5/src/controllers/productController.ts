import { NextFunction, Request, Response } from 'express';
import { Product } from '../interfaces/product';
import db from '../db_mock/defaultDb.json';
import { v4 as uuid } from 'uuid';
import { INPUT_VALIDATION_ERROR } from '../constants/constants';

export const newProduct = (categoryId: string, name: string): Product => ({
  id: uuid(),
  categoryId,
  name,
  itemsInStock: 1,
});

/**
 * Id product structure validation middleware
 */
export const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const id: string = req.params.id;
  if (id.length !== 36) {
    next(INPUT_VALIDATION_ERROR);
  } else {
    next();
  }
};

export const validateName = (name: string): boolean => name.length < 3;

export const findProduct = (id: string): Product | undefined => db.products.find((product: Product) => product.id === id);

export const findProductIndex = (id: string): number => db.products.findIndex((product: Product) => product.id === id);

export const getProducts = (): Product[] => db.products;

export const addProduct = (product: Product): number => db.products.push(product);

export const deleteProduct = (productIndex: number): Product[] => db.products.splice(productIndex, 1);

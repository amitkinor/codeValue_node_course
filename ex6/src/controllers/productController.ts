import { NextFunction, Request, Response } from 'express';
import { Product } from '../interfaces/product';
import db from '../db_mock/defaultDb.json';
import { v4 as uuid } from 'uuid';
import { ID_VALIDATION_ERROR, NAME_VALIDATION_ERROR, NO_PRODUCT_FOUND } from '../constants/constants';
import { productIdSchema, productNameSchema } from '../schemas/productSchema';

export const newProduct = (categoryId: string, name: string): Product => ({
  id: uuid(),
  categoryId,
  name,
  itemsInStock: 1,
});

/**
 * Product ID structure validation middleware
 */
export const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const id: string = req.params.id;
  const { error, value } = productIdSchema.validate({ id });
  if (error === undefined) {
    next();
  } else {
    res.status(400).send(`ID_VALIDATION_ERROR, ID Is : ${value.id}`);
    next(`${ID_VALIDATION_ERROR} ID Is : ${value.id}`);
  }
};

/**
 * Product Name structure validation middleware
 */
export function validateName(req: Request, res: Response, next: NextFunction): void {
  const payload = req.body;
  if (payload) {
    const { error, value } = productNameSchema.validate({ name: payload.name });
    if (error === undefined) {
      next();
    } else {
      res.status(400).send(`${NAME_VALIDATION_ERROR}, Name is : ${value.name}`);
      next(`${NAME_VALIDATION_ERROR} Name Is : ${value.name}`);
    }
  }
}

export const findProduct = (id: string): Product | undefined => db.products.find((product: Product) => product.id === id);

export const findProductAsync = (id: string): Promise<Product | string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const product: Product | undefined = db.products.find((product: Product) => product.id === id);
      product ? resolve(product) : reject(NO_PRODUCT_FOUND);
    }, 2000);
  });

export const findProductIndex = (id: string): number => db.products.findIndex((product: Product) => product.id === id);

export const getProducts = (): Product[] => db.products;

export const addProduct = (product: Product): number => db.products.push(product);

export const deleteProduct = (productIndex: number): Product[] => db.products.splice(productIndex, 1);

import { NextFunction, Request, Response } from 'express';
import { DbProduct, DbProductType } from '../mongoSchemas/ProductSchema';
import { v4 as uuid } from 'uuid';
import { ID_VALIDATION_ERROR, NAME_VALIDATION_ERROR } from '../constants/constants';
import { productIdSchema, productNameSchema } from '../schemas/productSchema';
import mongodb from 'mongodb';

export const newProduct = (categoryId: string, name: string): DbProductType => {
  return new DbProduct({
    id: uuid(),
    categoryId,
    name,
    itemsInStock: 1,
  });
};

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

export const findProduct = async (id: mongodb.ObjectID): Promise<DbProductType | null> => await DbProduct.findById(id).exec();

export const getProducts = async (): Promise<DbProductType[]> => await DbProduct.find({}).exec();

export const addProduct = async (product: DbProductType): Promise<DbProductType> => await product.save();

export const deleteProduct = async (product: DbProductType): Promise<void> => product.remove();

export const updateProduct = async (product: DbProductType, name: string): Promise<DbProductType> =>
  await product.update({ $set: { name } });

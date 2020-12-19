import { NextFunction, Request, Response } from 'express';
import mongodb from 'mongodb';
import { DbProduct, DbProductType } from '../mongoSchemas/ProductSchema';
import { DbCategory, DbCategoryType } from '../mongoSchemas/CategorySchema';
import { v4 as uuid } from 'uuid';

export const newCategory = (name: string): DbCategoryType => {
  return new DbCategory({
    id: uuid(),
    name,
  });
};

// /**
//  * Id category structure validation middleware
//  */
export const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const id: string = req.params.id;
  if (id.length < 3) {
    next('Invalid Category Id');
  } else {
    next();
  }
};

export const findCategory = async (id: mongodb.ObjectID): Promise<DbCategoryType | null> => await DbCategory.findById(id).exec();

export const getCategories = async (): Promise<DbCategoryType[]> => await DbCategory.find({}).exec();

export const getCategoryProducts = async (category: DbCategoryType | null): Promise<DbProductType[] | null> => {
  if (category !== null) {
    return await DbProduct.find({ categoryId: category._id }).exec();
  } else {
    return null;
  }
};

export const addCategory = async (category: DbCategoryType): Promise<DbCategoryType> => await category.save();

export const deleteCategory = async (category: DbCategoryType): Promise<void> => category.remove();

export const updateCategory = async (category: DbCategoryType, name: string): Promise<DbCategoryType> =>
  await category.update({ $set: { name } });

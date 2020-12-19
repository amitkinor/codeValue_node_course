import { NextFunction, Request, Response, Router } from 'express';
import mongodb from 'mongodb';
import { DbCategoryType } from '../db/mongoSchemas/CategorySchema';
import { DbProductType } from '../db/mongoSchemas/ProductSchema';
import {
  addCategory,
  deleteCategory,
  findCategory,
  getCategories,
  newCategory,
  validateId,
  updateCategory,
  getCategoryProducts,
} from '../controllers/categoryController';
import { categoriesLogger } from '../loggers/loggers';

const router = Router();

/**
 * Returns all categories
 */
router.get('/', async (req, res) => res.status(200).send(await getCategories()));

/**
 * Returns a specific category
 */
router.get('/:id', validateId, async (req: Request, res: Response, next: NextFunction) => {
  const _id = new mongodb.ObjectID(req.params.id);
  try {
    categoriesLogger.info(`Fetching category with id: ${_id}`);
    const category: DbCategoryType | null = await findCategory(_id);
    res.send(category);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/products', validateId, async (req: Request, res: Response) => {
  const _id = new mongodb.ObjectID(req.params.id);
  const category: DbCategoryType | null = await findCategory(_id);
  const products: DbProductType[] | null = await getCategoryProducts(category);
  products !== null ? res.status(404).end('Empty Category') : res.status(200).send(products);
});

/**
 * Adds a category
 */
router.post('/', async (req: Request, res: Response) => {
  const payload = req.body;

  // Create & store a new category
  const category = newCategory(payload.name);
  await addCategory(category);
  res.status(201).send(category);
});

/**
 * Updates a category
 */
router.put('/:id', validateId, async (req: Request, res: Response) => {
  const payload = req.body;
  const _id = new mongodb.ObjectID(req.params.id);

  const findIt: DbCategoryType | null = await findCategory(_id);

  // Handling missing category
  if (findIt === null) {
    res.status(404).send('no category was found');
    return;
  }

  const updatedCategory: DbCategoryType = await updateCategory(findIt, payload.name);
  res.status(200).send(updatedCategory);
});

/**
 * Delete a category
 */
router.delete('/:id', validateId, async (req: Request, res: Response) => {
  const _id = new mongodb.ObjectID(req.params.id);

  const findIt: DbCategoryType | null = await findCategory(_id);

  // Handling missing category
  if (findIt === null) {
    res.status(404).send('no category was found');
    return;
  }

  await deleteCategory(findIt);
  res.status(204).end();
});

export { router };

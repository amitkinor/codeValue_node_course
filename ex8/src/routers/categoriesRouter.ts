import { NextFunction, Request, Response, Router } from 'express';
import { Category } from '../interfaces/Catergory';
import { Product } from '../interfaces/Product';
import {
  addCategory,
  deleteCategory,
  findCategory,
  findCategoryAsync,
  findCategoryIndex,
  getCategories,
  newCategory,
  validateId,
  getCategoryProducts,
} from '../controllers/categoryController';
import { categoriesLogger } from '../loggers/loggers';

const router = Router();

/**
 * Returns all categories
 */
router.get('/', (req, res) => res.send(getCategories()));

/**
 * Returns a specific category
 */
router.get('/:id', validateId, async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  try {
    categoriesLogger.info(`Fetching category with id: ${id}`);
    const category: Category | string = await findCategoryAsync(id);
    res.send(category);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/products', validateId, (req: Request, res: Response) => {
  const id: string = req.params.id;
  const products: Product[] = getCategoryProducts(id);
  products === [] ? res.status(404).end('Empty Category') : res.status(200).send(products);
});

/**
 * Adds a category
 */
router.post('/', (req: Request, res: Response) => {
  const payload = req.body;

  // Create & store a new category
  const category = newCategory(payload.name);
  addCategory(category);
  res.status(201).send(category);
});

/**
 * Updates a category
 */
router.put('/:id', validateId, (req: Request, res: Response) => {
  const payload = req.body;
  const id: string = req.params.id;

  const findIt: Category | undefined = findCategory(id);

  // Handling missing category
  if (findIt === undefined) {
    res.status(404).send('no category was found');
    return;
  }

  findIt.name = payload.name;
  res.status(200).send(findIt);
});

/**
 * Delete a category
 */
router.delete('/:id', validateId, (req: Request, res: Response) => {
  const id: string = req.params.id;

  const categoryIndex = findCategoryIndex(id);

  // Handling missing category
  if (categoryIndex === -1) {
    res.status(404).send('no category was found');
    return;
  }

  deleteCategory(categoryIndex);
  res.status(204).end();
});

export { router };

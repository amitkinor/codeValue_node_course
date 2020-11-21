import { Request, Response, Router } from 'express';
import { Category, Product } from '../interfaces/interfaces';
import {
  addCategory,
  deleteCategory,
  findCategory,
  findCategoryIndex,
  getCategories,
  newCategory,
  validateId,
  getCategoryProducts,
} from '../controllers/categoryController';

const router = Router();

/**
 * Returns all categories
 */
router.get('/', (req, res) => res.send(getCategories()));

/**
 * Returns a specific category
 */
router.get('/:id', (req: Request, res: Response) => {
  const id: string = req.params.id;

  //  Id structure validation
  if (validateId(id)) {
    res.status(400).end('Bad Request');
    return;
  }

  const findIt = findCategory(id);

  // Handling missing category
  if (findIt === undefined) {
    res.status(404).send('No category was found');
    return;
  }
  res.send(findIt);
});

router.get('/:id/products', (req: Request, res: Response) => {
  const id: string = req.params.id;

  //  Id structure validation
  if (validateId(id)) {
    res.status(400).end('Bad Request');
    return;
  }

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
router.put('/:id', (req: Request, res: Response) => {
  const payload = req.body;
  const id: string = req.params.id;

  //  Id structure validation
  if (validateId(id)) {
    res.status(400).end('Bad Request');
    return;
  }

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
router.delete('/:id', (req: Request, res: Response) => {
  const id: string = req.params.id;

  //  Id structure validation
  if (validateId(id)) {
    res.status(400).end('Bad Request');
    return;
  }

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

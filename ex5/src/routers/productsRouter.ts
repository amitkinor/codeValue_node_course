import { NextFunction, Request, Response, Router } from 'express';
import { Product } from '../interfaces/product';
import {
  newProduct,
  findProduct,
  findProductAsync,
  findProductIndex,
  validateId,
  validateName,
  getProducts,
  addProduct,
  deleteProduct,
} from '../controllers/productController';

const router = Router();

/**
 * Returns all products
 */
router.get('/', (req, res) => res.status(200).send(getProducts()));

/**
 * Returns a specific product
 */
router.get('/:id', validateId, async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  try {
    const product: Product | string = await findProductAsync(id);
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
});

/**
 * Adds a product
 */
router.post('/', validateName, (req: Request, res: Response) => {
  const payload = req.body;

  // Create & store a new product
  const product = newProduct('ec9714ea-abb0-499e-9042-d8292bbf45bc', payload.name);
  addProduct(product);
  res.status(201).send(product);
});

/**
 * Updates a product
 */
router.put('/:id', validateId, validateName, (req: Request, res: Response) => {
  const payload = req.body;
  const id: string = req.params.id;

  const findIt: Product | undefined = findProduct(id);

  // Handling missing product
  if (findIt === undefined) {
    res.status(404).send('no product was found');
    return;
  }

  findIt.name = payload.name;
  res.status(200).send(findIt);
});

/**
 * Delete a product
 */
router.delete('/:id', validateId, (req: Request, res: Response) => {
  const id: string = req.params.id;

  const productIndex = findProductIndex(id);

  // Handling missing product
  if (productIndex === -1) {
    res.status(404).send('no product was found');
    return;
  }

  deleteProduct(productIndex);
  res.status(204).end();
});

export { router };

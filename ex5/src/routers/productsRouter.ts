import { Request, Response, Router } from 'express';
import { Product } from '../interfaces/interfaces';
import {
  newProduct,
  findProduct,
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
router.get('/:id', validateId, (req: Request, res: Response) => {
  const id: string = req.params.id;

  const findIt = findProduct(id);

  // Handling missing product
  if (findIt === undefined) {
    res.status(404).send('no product was found');
    return;
  }
  res.send(findIt);
});

/**
 * Adds a product
 */
router.post('/', (req: Request, res: Response) => {
  const payload = req.body;

  // Name validation
  if (validateName(payload.name)) {
    res.status(409).send('Invalid Name');
    return;
  }

  // Create & store a new product
  const product = newProduct('ec9714ea-abb0-499e-9042-d8292bbf45bc', payload.name);
  addProduct(product);
  res.status(201).send(product);
});

/**
 * Updates a product
 */
router.put('/:id', validateId, (req: Request, res: Response) => {
  const payload = req.body;
  const id: string = req.params.id;

  // Name validation
  if (validateName(payload.name)) {
    res.status(409).send('Invalid Name');
    return;
  }

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

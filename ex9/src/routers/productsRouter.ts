import { NextFunction, Request, Response, Router } from 'express';
import { DbProductType } from '../mongoSchemas/ProductSchema';
import mongodb from 'mongodb';
import {
  newProduct,
  findProduct,
  validateId,
  validateName,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { productLogger } from '../loggers/loggers';

const router = Router();

/**
 * Returns all products
 */
router.get('/', async (req, res) => res.status(200).send(await getProducts()));

/**
 * Returns a specific product
 */
router.get('/:id', validateId, async (req: Request, res: Response, next: NextFunction) => {
  const _id = new mongodb.ObjectID(req.params.id);
  try {
    productLogger.info(`Fetching product with id: ${_id}`);
    const product: DbProductType | null = await findProduct(_id);
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
});

/**
 * Adds a product
 */
router.post('/', validateName, async (req: Request, res: Response) => {
  const payload = req.body;

  // Create & store a new product
  const product = newProduct('5fa3117a6cd4373d6046a15d', payload.name);
  await addProduct(product);
  res.status(201).send(product);
});

/**
 * Updates a product
 */
router.put('/:id', validateId, validateName, async (req: Request, res: Response) => {
  const payload = req.body;
  const _id = new mongodb.ObjectID(req.params.id);

  const findIt: DbProductType | null = await findProduct(_id);

  // Handling missing product
  if (findIt === null) {
    res.status(404).send('no product was found');
    return;
  }
  const updatedProduct: DbProductType = await updateProduct(findIt, payload.name);

  res.status(200).send(updatedProduct);
});

/**
 * Delete a product
 */
router.delete('/:id', validateId, async (req: Request, res: Response) => {
  const _id = new mongodb.ObjectID(req.params.id);

  const findIt: DbProductType | null = await findProduct(_id);

  // Handling missing product
  if (findIt === null) {
    res.status(404).send('no product was found');
    return;
  }

  await deleteProduct(findIt);
  res.status(204).end();
});

export { router };

import { Category } from './Catergory';
import { Product } from './Product';

export interface Idb {
  products: Product[];
  categories: Category[];
}

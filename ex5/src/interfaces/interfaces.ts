export interface Product {
  id: string;
  categoryId: string;
  name: string;
  itemsInStock: number;
}

export interface Category {
  id: string;
  name: string;
}

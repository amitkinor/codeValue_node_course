import mongoose from 'mongoose';
import { Product } from '../../interfaces/Product';
import mongodb from 'mongodb';

const schema = new mongoose.Schema({
  id: String,
  categoryId: mongodb.ObjectID,
  name: String,
  itemsInStock: Number,
});

export interface DbProductType extends Product, mongoose.Document {
  id: string;
}

export const DbProduct: mongoose.Model<DbProductType> = mongoose.model<DbProductType>('Product', schema);

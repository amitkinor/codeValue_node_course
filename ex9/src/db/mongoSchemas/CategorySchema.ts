import mongoose from 'mongoose';
import { Category } from '../../interfaces/Catergory';

const schema = new mongoose.Schema({
  id: String,
  name: String,
});

export interface DbCategoryType extends Category, mongoose.Document {
  id: string;
}

export const DbCategory: mongoose.Model<DbCategoryType> = mongoose.model<DbCategoryType>('Category', schema);

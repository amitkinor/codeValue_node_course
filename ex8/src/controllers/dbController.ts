import fetch from 'node-fetch';
import { Idb } from '../interfaces/db';
import mongoose from 'mongoose';
import { getDbAddress } from '../config/config';

// DB as Json
export async function initA(): Promise<Idb> {
  return await fetch('http://localhost:3001/static/defaultDb.json')
    .then((res) => res.json())
    .catch((err) => console.log('fetch Error : ', err));
}

// DB as Mongo + mongoose
export const mongoConnect = async (): Promise<void> =>
  await mongoose
    .connect(getDbAddress())
    .then(() => console.log('Connected to MongoDb'))
    .catch((err) => {
      throw new Error(err);
    });

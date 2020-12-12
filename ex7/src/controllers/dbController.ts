import fetch from 'node-fetch';
import { Idb } from '../interfaces/db';

export async function init(): Promise<Idb> {
  return await fetch('http://localhost:3001/static/defaultDb.json')
    .then((res) => res.json())
    .catch((err) => console.log('fetch Error : ', err));
}

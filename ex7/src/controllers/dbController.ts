import fetch from 'node-fetch';

export const init = (): void => {
  Db();
};

const Db = () => {
  fetch('http://localhost:3001/static/defaultDb.json')
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log('fetch Error : ', err));
};

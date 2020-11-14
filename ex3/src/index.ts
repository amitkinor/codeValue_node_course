import express from 'express';
import cors from 'cors';
import { router as productsRouter } from './routers/productsRouter';
import { router as categoriesRouter } from './routers/categoriesRouter';

const app = express();

app.use(express.json());
app.use(cors());

app.set('port', 8000);

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

app.listen(app.get('port'), () => {
  console.log('Server is up');
  console.log('port is', app.get('port'));
  console.log('env is', app.get('env'));
});

app.get('/', (req, res) => {
  res.send('in root');
});

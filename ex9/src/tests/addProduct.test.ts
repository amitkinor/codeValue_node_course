import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { app } from '../app';
import { addProduct } from '../controllers/productController';

chai.use(chaiHttp);
chai.should();

const mockedProducts = [
  {
    _id: '5fddb4e58653cd30fcdcf1cd',
    id: '2e086a0d-9b98-4f36-8e73-a80c88c74113',
    categoryId: '5fa3117a6cd4373d6046a15d',
    name: 'prod 1',
    itemsInStock: 1,
    __v: 0,
  },
  {
    _id: '5fddb5e9adab430c208bddf8',
    id: '39915c6e-c358-40ab-b06a-23f7f2b06f7b',
    categoryId: '5fa3117a6cd4373d6046a15d',
    name: 'prod 1',
    itemsInStock: 1,
    __v: 0,
  },
  {
    _id: '5fddb5ebadab430c208bddf9',
    id: '876f7555-f8c4-4766-b3da-ac66c0118cc6',
    categoryId: '5fa3117a6cd4373d6046a15d',
    name: 'prod 1',
    itemsInStock: 1,
    __v: 0,
  },
  {
    _id: '5fddc38ea8d68f5890ba3fba',
    id: 'c72075b0-092a-4ecf-9f31-e5902fda749a',
    categoryId: '5fa3117a6cd4373d6046a15d',
    name: 'prod 1',
    itemsInStock: 1,
    __v: 0,
  },
];

describe('Products', () => {
  it('should get all products', async () => {
    const res = await chai.request(app).get('/api/products');
    const products = res.body;

    products.should.be.a('array');
    products.should.have.lengthOf(mockedProducts.length);
    products.should.deep.equal(mockedProducts);
  });

  it('should call addProduct once', async () => {
    const spy = sinon.spy(addProduct);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let response: any;
    await chai
      .request(app)
      .post('/api/products')
      .send({ name: 'mytest' })
      .then((res) => {
        response = res;
      });
    spy.calledOnce;

    // clean DB from the newly added product
    await chai.request(app).delete(`/api/products/${response.body._id}`);
  });

  it('should get the right product', async () => {
    const res = await chai.request(app).get('/api/products/5fddc38ea8d68f5890ba3fba');
    const products = res.body;
    products.should.deep.equal(mockedProducts[3]);
  });
});

const request = require("supertest");
const app = require("../app");
jest.mock("../config/db");
const seq = require("../config/db");
const Product = require("../models/productModel");

const baseURL = "/api/v1/products";

describe("Products Router results", () => {
  let products = [];
  beforeEach(async () => {
    await seq.sync({ force: true });
    products.length = 0;
    products.push({
      title: "Product A",
      price: 29.99,
      description: "This is a description for Product A.",
    });
    products.push({
      title: "Product B",
      price: 14.44,
      description: "Product B is a high-quality item.",
    });
    await Product.create(products[0]);
    products[0].id = 1;
    await Product.create(products[1]);
    products[1].id = 2;
  });

  it("should return all products", async () => {
    const response = await request(app).get(baseURL);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(products);
  });

  it("should create a new product if the product is valid and return it with status code 201", async () => {
    const newProduct = {
      title: "Product C",
      price: 34.44,
      description: "Product C is a high-quality item.",
    };
    const response = await request(app).post(baseURL).send(newProduct);
    newProduct.id = 3;
    expect(response.status).toBe(201);
    expect(response.body).toEqual(newProduct);
    expect(await Product.findByPk(newProduct.id, { raw: true })).toEqual(
      newProduct
    );
  });

  it("should return a product by ID", async () => {
    const response = await request(app).get(`${baseURL}/2`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(products[1]);
  });

  it("should update a product by ID if id and product info are correct", async () => {
    const renewedProduct = {
      title: "Product C",
      price: 34.44,
      description: "Product C is a beestseller.",
    };
    const id = 2;
    const response = await request(app)
      .put(`${baseURL}/${id}`)
      .send(renewedProduct);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(renewedProduct);
    expect(await Product.findByPk(id, { raw: true })).toEqual({
      ...renewedProduct,
      id,
    });
  });

  it("should delete a product by ID if id is correct", async () => {
    const id = 1;
    const response = await request(app).delete(`${baseURL}/${id}`);
    expect(response.status).toBe(204);
    expect(await Product.findByPk(id, { raw: true })).toEqual(null);
  });
});

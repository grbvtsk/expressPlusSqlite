const productsController = require("../controllers/productsController.js");
jest.mock("../config/db");
const seq = require("../config/db");
const Product = require("../models/productModel");

describe("productsController", () => {
  const mockRequest = () => ({
    params: { id: 1 },
  });
  const mockResponse = () => {
    const res = {};
    res.locals = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockImplementation(() => res);
    return res;
  };
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

  it("checkId works correctly if id is invalid", async () => {
    const req = mockRequest();
    req.params.id = 100;
    const res = mockResponse();
    const next = jest.fn();
    await productsController.checkProductId(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1).toHaveBeenCalledWith(404);
    expect(res.json)
      .toHaveBeenCalledTimes(1)
      .toHaveBeenCalledWith({ status: "fail", message: "Invalid products id" });
    expect(next).toHaveBeenCalledTimes(0);
  });

  it("checkId works correctly if id is valid", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();
    await productsController.checkProductId(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(0);
    expect(res.json).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("checkProduct works correctly if product is invalid", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    const productWithoutTitle = {
      price: 29.99,
      description: "This is a description for Product A.",
    };
    req.body = productWithoutTitle;
    await productsController.checkProduct(req, res, next);

    expect(res.status).toHaveBeenCalledTimes(1).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(0);
  });

  it("checkProduct works correctly if prodect is valid", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    const validProduct = {
      title: "Product C",
      price: 29.99,
      description: "This is a description for Product C.",
    };
    req.body = validProduct;
    await productsController.checkProduct(req, res, next);
    console.log(process.env.NODE_ENV);

    expect(res.status).toHaveBeenCalledTimes(0);
    expect(res.json).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
  });
});

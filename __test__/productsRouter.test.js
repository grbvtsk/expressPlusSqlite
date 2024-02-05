const request = require("supertest");
const productsController = require("../controllers/productsController");
jest.mock("../controllers/productsController");
const app = require("../app");

const baseURL = "/api/v1/products";

describe("Products Router called methods", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("POST product calls checkProduct and then createProduct", async () => {
    const checkProductSpy = jest
      .spyOn(productsController, "checkProduct")
      .mockImplementationOnce((_, __, next) => next());
    const createProductSpy = jest
      .spyOn(productsController, "createProduct")
      .mockImplementationOnce((_, res) => res.sendStatus(200));

    const response = await request(app)
      .post(baseURL)
      .set("Accept", "application/json");

    expect(checkProductSpy).toHaveBeenCalledTimes(1);
    expect(createProductSpy).toHaveBeenCalledTimes(1);
  });

  it("PUT product calls checkProductId and checkProduct then updateProduct", async () => {
    const checkIdSpy = jest
      .spyOn(productsController, "checkProductId")
      .mockImplementationOnce((_, __, next) => next());
    const checkProductSpy = jest
      .spyOn(productsController, "checkProduct")
      .mockImplementationOnce((_, __, next) => next());
    const updateProductSpy = jest
      .spyOn(productsController, "updateProduct")
      .mockImplementationOnce((_, res) => res.sendStatus(200));

    await request(app).put(`${baseURL}/1`).set("Accept", "application/json");

    expect(checkIdSpy).toHaveBeenCalledTimes(1);
    expect(checkProductSpy).toHaveBeenCalledTimes(1);
    expect(updateProductSpy).toHaveBeenCalledTimes(1);
  });

  it("DELETE product calls checkProductId and then deleteProduct", async () => {
    const checkIdSpy = jest
      .spyOn(productsController, "checkProductId")
      .mockImplementationOnce((_, __, next) => next());
    const deleteProductSpy = jest
      .spyOn(productsController, "deleteProduct")
      .mockImplementationOnce((_, res) => res.sendStatus(200));

    await request(app).delete(`${baseURL}/1`).set("Accept", "application/json");

    expect(checkIdSpy).toHaveBeenCalledTimes(1);
    expect(deleteProductSpy).toHaveBeenCalledTimes(1);
  });

  it("GET product calls checkProductId and then getProductById", async () => {
    const checkIdSpy = jest
      .spyOn(productsController, "checkProductId")
      .mockImplementationOnce((_, __, next) => next());
    const getProductSpy = jest
      .spyOn(productsController, "getProductById")
      .mockImplementationOnce((_, res) => res.sendStatus(200));

    await request(app).get(`${baseURL}/1`).set("Accept", "application/json");

    expect(checkIdSpy).toHaveBeenCalledTimes(1);
    expect(getProductSpy).toHaveBeenCalledTimes(1);
  });
});

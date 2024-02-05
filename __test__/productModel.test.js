jest.mock("../config/db");
const seq = require("../config/db");

const Product = require("../models/productModel");

describe("Product", () => {
  it("has properties defined in requirement with autoincrement id", async () => {
    await seq.sync({ force: true });
    const product1 = {
      title: "Product A",
      price: 29.99,
      description: "This is a description for Product A.",
    };
    const product2 = {
      title: "Product B",
      price: 14.44,
      description: "Product B is a high-quality item.",
    };
    await Product.create(product1);
    product1.id = 1;
    await Product.create(product2);
    product2.id = 2;
    const savedProducts = await Product.findAll();

    expect(savedProducts).toHaveLength(2);
    expect;
    expect(savedProducts).toEqual(
      expect.arrayContaining([expect.objectContaining(product1)])
    );
    expect(savedProducts).toEqual(
      expect.arrayContaining([expect.objectContaining(product2)])
    );
  });

  it("title property is required", async () => {
    await seq.sync();
    const product1 = {
      price: "29.99",
      description: "This is a description for Product A.",
    };

    try {
      product = await Product.build(product1, { validate: true });
      await product.validate();
      throw Error("title must be required");
    } catch (error) {
      console.log(error);
      expect(error.errors[0].message).toContain("title");
      return;
    }
  });
  it("price property has DECIMAL type", async () => {
    expect(Product.tableAttributes.price.type.constructor.key).toBe("DECIMAL");
  });
});

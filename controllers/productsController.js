const { where } = require("sequelize");
const Product = require("../models/productModel");

exports.checkProductId = async (req, res, next) => {
  const products = await Product.findAll();
  const index = products.findIndex((product) => product.id === +req.params.id);
  if (index === -1) {
    res.status(404).json({
      status: "fail",
      message: "Invalid products id",
    });
    return;
  }
  res.locals.index = index;
  next();
  // if fails - 404 status code with response body { status: "fail", message: "Invalid products id" }
};

exports.checkProduct = async (req, res, next) => {
  try {
    const product = req.body;
    if (!product.title) {
      return res.status(400).json({
        status: "fail",
        message: "Title is required",
      });
    }
    next();
  } catch (error) {
    console.error("Error fetching products:", error);

    // Handle the error appropriately, e.g., return a 500 status code
    return {
      status: 500,
      body: { error: "Internal Server Error" },
    };
  }
};
// if fails - 400 status code with validation error message in response body

exports.getAllProducts = async (req, res) => {
  // 200 status code with array of products in response body
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
    // Assuming you are using Express, you can send the products in the response
    // return {
    //   status: 200,
    //   body: products,
    // };
  } catch (error) {
    console.error("Error fetching products:", error);

    // Handle the error appropriately, e.g., return a 500 status code
    return {
      status: 500,
      body: { error: "Internal Server Error" },
    };
  }
};

exports.getProductById = async (req, res) => {
  const products = await Product.findAll();
  res.status(200).json(products[res.locals.index]);
  // 200 status code with product in response body
};

exports.createProduct = async (req, res) => {
  const newProduct = Product.build({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    updatedAt: req.body.updatedAt,
    createdAt: req.body.createdAt,
  });
  await newProduct.save();
  res.status(201).json(newProduct);
  // 201 status code with created product in response body
};

exports.updateProduct = async (req, res) => {
  try {
    const products = await Product.findAll();
    const [rowCount] = await Product.update(
      {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
      },
      {
        where: {
          id: products[res.locals.index].id,
        },
      }
    );

    if (rowCount > 0) {
      // Якщо було оновлено принаймні один рядок
      const updatedProduct = await Product.findByPk(
        products[res.locals.index].id
      );
      res.status(200).json(updatedProduct);
    } else {
      // Якщо жоден рядок не був оновлений
      res.status(404).json({
        status: "fail",
        message: "Товар не знайдено або не був оновлений",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const products = await Product.findAll();
  await Product.destroy({
    where: {
      id: products[res.locals.index].id,
    },
  });
  return res.status(204).end();
  // 204 status code
};

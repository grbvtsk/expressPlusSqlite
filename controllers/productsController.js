const Product = require("../models/productModel");

exports.checkProductId = async () => {
  // if fails - 404 status code with response body { status: "fail", message: "Invalid products id" }
};

exports.checkProduct = async () => {
  // if fails - 400 status code with validation error message in response body 
};

exports.getAllProducts = async () => {
  // 200 status code with array of products in response body 
};

exports.getProductById = async () => {
  // 200 status code with product in response body
};

exports.createProduct = async () => {
  // 201 status code with created product in response body
};

exports.updateProduct = async () => {
  // 200 status code with updated product (without id) in response body 
};

exports.deleteProduct = async () => {
  // 204 status code
};

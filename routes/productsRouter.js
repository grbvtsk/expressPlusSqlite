const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();
router
  .route("/")
  .get(productsController.getAllProducts)
  .post(productsController.checkProduct, productsController.createProduct);
router
  .route("/:id")
  .all(productsController.checkProductId)
  .get(productsController.getProductById)
  .put(productsController.checkProduct, productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;

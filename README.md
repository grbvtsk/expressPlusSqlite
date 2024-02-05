## Node.js Practical
### Tasks for the topic "sequelize"
Create a web application that implements a RestAPI application based on the proposed pattern using Node.js, Express.js and Sequelize that allows users to create, read, update and delete items in the store. 

Place the database connection configuration file in the **config** directory and name it **db.js**  
#### _Note: do not delete `__mocks__` folder inside the config folder!_
The model for Products table should be placed in the **model** directory, file name and path:  **models/productModel.js**. 
This model must contain fields:
```
  `id` - primary key, integer, auto incremented,
  `title` - string, required, 
  `price` - choose data type suitable for money handling ,
  `description` - string 
```
Use **'/api/v1/products'** as root url for products. Then '/api/v1/products/:id' should be used for requests that require id of product.
Connect routers to application object app in app.js
Create products handlers in **productsController.js**, all the names of required handlers are specified there along with expected responses.
In  controllers create a next methods: 

- getAllProducts,
- createProduct,
- getProductById,
- updateProduct (PUT),
- deleteProduct,
- checkProductId,
- checkProduct.

Create middleware checkProductId in productsController  for checking correctness of **id** of product that is requested/updated/deleted. If entity with such id does not exist, the response should be provided with status 404 and body
```
  {
    status: 'fail',
    message: 'Invalid products id',
  }
```  
Create middleware checkProduct for checking correctness of body of request for creating/updating product. Non-empty title property must be present. If this property is not provided, or it is empty, the response should be provided with status 400 and body
```
  {
    status: 'fail',
    message: 'Title is required',
  }
```